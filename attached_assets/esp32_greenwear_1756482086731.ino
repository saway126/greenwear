/**
 * GreenWear ESP32 Firmware (Vitals → Color: green/yellow/red)
 * - Thresholds for HR/RR/SpO2/CoreTemp/SkinΔT
 * - LED control: WS2812B (NEOPIXEL) + PWM RGB (side-glow fiber)
 * - BLE: Advertises "GREENWEAR"; notifies current status JSON;
 *        optional CSV write to update vitals: "mode=rest;hr=90;rr=16;spo2=97;core=36.8;age=30;skinDelta=0.2;minutes=5"
 *
 * Libraries:
 *  - Adafruit NeoPixel (WS2812)
 *  - ESP32 BLE Arduino
 *
 * Hardware (default pins):
 *  - NEOPIXEL_PIN = 5, NUM_PIXELS = 30
 *  - PWM: R=25, G=26, B=27
 *  - 5V supply for LEDs must be adequate; add 330Ω on data and 1000µF cap at strip input.
 */

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// ------------------ Config ------------------
#define USE_NEOPIXEL   1
#define NEOPIXEL_PIN   5
#define NUM_PIXELS     30

#define PIN_R 25
#define PIN_G 26
#define PIN_B 27
#define PWM_FREQ 5000
#define PWM_RES_BITS 12
#define CH_R 0
#define CH_G 1
#define CH_B 2

// BLE UUIDs (random base)
static BLEUUID SERVICE_UUID("6b1d0001-2c6c-4b1f-9f1a-0e5a8a000001");
static BLEUUID CHAR_STATUS_UUID("6b1d0002-2c6c-4b1f-9f1a-0e5a8a000002");  // notify
static BLEUUID CHAR_CMD_UUID("6b1d0003-2c6c-4b1f-9f1a-0e5a8a000003");     // write CSV

// ------------------ LED ------------------
#if USE_NEOPIXEL
Adafruit_NeoPixel strip(NUM_PIXELS, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);
#endif

// ------------------ BLE ------------------
BLEServer* pServer = nullptr;
BLECharacteristic* pStatus = nullptr;
BLECharacteristic* pCmd = nullptr;
bool deviceConnected = false;

class ServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) override { deviceConnected = true; }
  void onDisconnect(BLEServer* pServer) override { deviceConnected = false; pServer->getAdvertising()->start(); }
};

// ------------------ Vitals & Classification ------------------
enum Color { GREEN, YELLOW, RED };
struct Vitals {
  String mode = "rest"; // "rest" or "exercise"
  int age = 30;
  int hr = 80;
  int rr = 16;
  int spo2 = 97;
  float core = 36.7;
  float skinDelta = 0.1;
  int skinMinutes = 5;
};

Vitals vitals;

Color classifyRestingHR(int hr){
  if (hr < 50 || hr > 120) return RED;
  if (hr < 60 || hr > 100) return YELLOW;
  return GREEN;
}
Color classifyRR(int rr){
  if (rr <= 11 || rr >= 25) return RED;
  if (rr >= 19 && rr <= 24) return YELLOW;
  return GREEN;
}
Color classifySpO2(int s){
  if (s <= 90) return RED;
  if (s <= 94) return YELLOW;
  return GREEN;
}
Color classifyCore(float t){
  if (t >= 38.0 || t <= 35.0) return RED;
  if (t >= 37.5 || t < 36.1) return YELLOW;
  return GREEN;
}
Color classifySkin(float d, int minutes){
  float a = fabs(d);
  if (a >= 1.5 && minutes >= 30) return RED;
  if (a >= 0.7) return YELLOW;
  return GREEN;
}
Color classifyHRExercise(int hr, int age){
  float hrMax = 220.0 - age;
  float pct = hr / hrMax;
  if (pct > 0.90) return RED;
  if (pct >= 0.77) return YELLOW;
  if (pct >= 0.50) return GREEN;
  return YELLOW;
}

String colorToHex(Color c){
  switch(c){
    case GREEN: return "#22c55e";
    case YELLOW: return "#fbbf24";
    case RED: return "#ef4444";
  }
  return "#000000";
}

int colorSeverity(Color c){ return (c==RED)?2:(c==YELLOW?1:0); }

struct Result {
  Color hrC, rrC, spo2C, coreC, skinC;
  Color finalC;
  String finalLabel;
};

Result evaluate(const Vitals& v){
  Result r;
  r.hrC = (v.mode=="exercise") ? classifyHRExercise(v.hr, v.age) : classifyRestingHR(v.hr);
  r.rrC = classifyRR(v.rr);
  r.spo2C = classifySpO2(v.spo2);
  r.coreC = classifyCore(v.core);
  r.skinC = classifySkin(v.skinDelta, v.skinMinutes);

  Color worst = r.hrC;
  if (colorSeverity(r.rrC)   > colorSeverity(worst)) worst = r.rrC;
  if (colorSeverity(r.spo2C) > colorSeverity(worst)) worst = r.spo2C;
  if (colorSeverity(r.coreC) > colorSeverity(worst)) worst = r.coreC;
  if (colorSeverity(r.skinC) > colorSeverity(worst)) worst = r.skinC;
  r.finalC = worst;
  r.finalLabel = (worst==GREEN)?"정상":(worst==YELLOW)?"주의":"경고";
  return r;
}

// ------------------ LED control ------------------
void setPWM(uint8_t r, uint8_t g, uint8_t b){
  // map 0..255 to 12-bit
  ledcWrite(CH_R, (int)map(r,0,255,0,(1<<PWM_RES_BITS)-1));
  ledcWrite(CH_G, (int)map(g,0,255,0,(1<<PWM_RES_BITS)-1));
  ledcWrite(CH_B, (int)map(b,0,255,0,(1<<PWM_RES_BITS)-1));
}

void setStrip(uint32_t color){
#if USE_NEOPIXEL
  for (int i=0;i<NUM_PIXELS;i++) strip.setPixelColor(i, color);
  strip.show();
#endif
}

uint32_t hexToColor(const String& hex){
  // expects "#rrggbb"
  long rgb = strtol(hex.substring(1).c_str(), nullptr, 16);
#if USE_NEOPIXEL
  uint8_t r = (rgb >> 16) & 0xFF;
  uint8_t g = (rgb >> 8) & 0xFF;
  uint8_t b = rgb & 0xFF;
  return strip.Color(r,g,b);
#else
  return (uint32_t)rgb;
#endif
}

void applyColor(Color c, bool alert=false){
  String hx = colorToHex(c);
  uint32_t col = hexToColor(hx);
#if USE_NEOPIXEL
  if (alert && c==RED){
    // pulse for alert
    for (int k=0;k<2;k++){
      setStrip(col);
      delay(120);
      setStrip(strip.Color(0,0,0));
      delay(80);
    }
  } else {
    setStrip(col);
  }
#endif
  // PWM mirror (approx)
  long rgb = strtol(hx.substring(1).c_str(), nullptr, 16);
  uint8_t r = (rgb >> 16) & 0xFF;
  uint8_t g = (rgb >> 8) & 0xFF;
  uint8_t b = rgb & 0xFF;
  setPWM(r,g,b);
}

// ------------------ Hysteresis ------------------
Color lastC = GREEN;
int stableCount = 0;
const int REQUIRED_STABLE = 2; // need 2 consecutive evaluations to change color

// ------------------ BLE CMD parse (very simple CSV) ------------------
class CmdCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* ch) override {
    std::string v = ch->getValue();
    if (v.empty()) return;
    String s = String(v.c_str());
    // format: key=value;key=value;...
    int start = 0;
    while (start < s.length()){
      int sep = s.indexOf(';', start);
      String tok = (sep==-1) ? s.substring(start) : s.substring(start, sep);
      int eq = tok.indexOf('=');
      if (eq>0){
        String key = tok.substring(0, eq);
        String val = tok.substring(eq+1);
        key.trim(); val.trim();
        if (key=="mode") vitals.mode = val;
        else if (key=="age") vitals.age = val.toInt();
        else if (key=="hr") vitals.hr = val.toInt();
        else if (key=="rr") vitals.rr = val.toInt();
        else if (key=="spo2") vitals.spo2 = val.toInt();
        else if (key=="core") vitals.core = val.toFloat();
        else if (key=="skinDelta") vitals.skinDelta = val.toFloat();
        else if (key=="minutes") vitals.skinMinutes = val.toInt();
      }
      if (sep==-1) break;
      start = sep+1;
    }
  }
};

// ------------------ Setup ------------------
void setup(){
  Serial.begin(115200);
  delay(100);

#if USE_NEOPIXEL
  strip.begin();
  strip.show();
#endif

  // PWM channels
  ledcSetup(CH_R, PWM_FREQ, PWM_RES_BITS);
  ledcSetup(CH_G, PWM_FREQ, PWM_RES_BITS);
  ledcSetup(CH_B, PWM_FREQ, PWM_RES_BITS);
  ledcAttachPin(PIN_R, CH_R);
  ledcAttachPin(PIN_G, CH_G);
  ledcAttachPin(PIN_B, CH_B);
  setPWM(0,0,0);

  // BLE
  BLEDevice::init("GREENWEAR");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());
  BLEService* svc = pServer->createService(SERVICE_UUID);

  pStatus = svc->createCharacteristic(CHAR_STATUS_UUID, BLECharacteristic::PROPERTY_NOTIFY);
  pCmd    = svc->createCharacteristic(CHAR_CMD_UUID, BLECharacteristic::PROPERTY_WRITE);
  pCmd->setCallbacks(new CmdCallbacks());

  // CCCD for notify
  pStatus->addDescriptor(new BLE2902());
  svc->start();
  pServer->getAdvertising()->addServiceUUID(SERVICE_UUID);
  pServer->getAdvertising()->setScanResponse(true);
  pServer->getAdvertising()->start();

  Serial.println("GREENWEAR ready. BLE advertising...");
}

// ------------------ Loop ------------------
unsigned long lastEvalMs = 0;
const unsigned long EVAL_INTERVAL = 1000;

void loop(){
  // (Optional) here you would read real sensors and update 'vitals'.
  // For now we keep current values or allow CSV writes over BLE/Serial.

  if (millis() - lastEvalMs >= EVAL_INTERVAL){
    lastEvalMs = millis();
    Result r = evaluate(vitals);

    // Hysteresis
    if (r.finalC == lastC){
      stableCount = min(stableCount+1, REQUIRED_STABLE);
    } else {
      stableCount = 0;
    }
    if (stableCount >= REQUIRED_STABLE || lastC == r.finalC){
      bool alert = (r.finalC==RED);
      applyColor(r.finalC, alert);
      lastC = r.finalC;
    }

    // Notify BLE subscribers
    if (deviceConnected){
      String payload = String("{\"mode\":\"")+vitals.mode+
        "\",\"hr\":"+String(vitals.hr)+
        ",\"rr\":"+String(vitals.rr)+
        ",\"spo2\":"+String(vitals.spo2)+
        ",\"core\":"+String(vitals.core,1)+
        ",\"skinDelta\":"+String(vitals.skinDelta,1)+
        ",\"minutes\":"+String(vitals.skinMinutes)+
        ",\"color\":\""+colorToHex(lastC)+"\""
        ",\"label\":\""+String((lastC==GREEN)?"정상":(lastC==YELLOW)?"주의":"경고")+"\"}";
      pStatus->setValue((uint8_t*)payload.c_str(), payload.length());
      pStatus->notify();
    }

    // Debug
    Serial.printf("[Vitals] mode=%s hr=%d rr=%d spo2=%d core=%.1f dT=%.1f/%d -> %s\n",
      vitals.mode.c_str(), vitals.hr, vitals.rr, vitals.spo2, vitals.core, vitals.skinDelta, vitals.skinMinutes,
      (lastC==GREEN)?"GREEN":(lastC==YELLOW)?"YELLOW":"RED");
  }

  // allow CSV input via Serial for quick testing
  if (Serial.available()){
    String line = Serial.readStringUntil('\n');
    line.trim();
    if (line.length()>0){
      // reuse same parser as BLE cmd
      std::string tmp = std::string(line.c_str());
      pCmd->setValue(tmp);
      ((CmdCallbacks*)pCmd->getCallbacks())->onWrite(pCmd);
      Serial.println("Updated vitals via Serial CSV.");
    }
  }
}
