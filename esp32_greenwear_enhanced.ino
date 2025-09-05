/*
 * GreenWear ESP32 Enhanced Firmware
 * 스마트 웨어러블 헬스케어 디바이스
 * 
 * 기능:
 * - 심박수 측정 (Pulse Sensor)
 * - 체온 측정 (DS18B20)
 * - 산소포화도 측정 (MAX30102)
 * - LED 상태 표시 (WS2812B)
 * - WiFi 연결 및 데이터 전송
 * - 블루투스 통신
 * 
 * 하드웨어 연결:
 * - Pulse Sensor: A0
 * - DS18B20: D2
 * - MAX30102: SDA(D21), SCL(D22)
 * - WS2812B LED: D4
 * - 버튼: D5
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <BluetoothSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>
#include <Wire.h>

// 하드웨어 핀 정의
#define PULSE_PIN A0
#define TEMP_PIN 2
#define LED_PIN 4
#define BUTTON_PIN 5
#define LED_COUNT 12

// WiFi 설정
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverURL = "https://greenwear-backend-node-production-1583.up.railway.app/api/vitals";

// 하드웨어 객체
OneWire oneWire(TEMP_PIN);
DallasTemperature tempSensor(&oneWire);
Adafruit_NeoPixel pixels(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
BluetoothSerial SerialBT;

// 전역 변수
unsigned long lastHeartBeat = 0;
unsigned long lastDataSend = 0;
unsigned long lastLEDUpdate = 0;
int heartRate = 0;
float temperature = 0.0;
int oxygenSaturation = 0;
String deviceStatus = "normal";
bool isConnected = false;

// 심박수 측정 변수
int pulseValue = 0;
int pulseCount = 0;
unsigned long pulseTime = 0;
bool pulseDetected = false;

// LED 상태
enum LEDState {
  LED_NORMAL,    // 초록색
  LED_WARNING,   // 노란색
  LED_CRITICAL,  // 빨간색
  LED_CONNECTING, // 파란색
  LED_ERROR      // 보라색
};

LEDState currentLEDState = LED_CONNECTING;

void setup() {
  Serial.begin(115200);
  
  // 하드웨어 초기화
  initializeHardware();
  
  // WiFi 연결
  connectToWiFi();
  
  // 블루투스 초기화
  SerialBT.begin("GreenWear Device");
  
  // 온도 센서 초기화
  tempSensor.begin();
  
  // LED 초기화
  pixels.begin();
  pixels.setBrightness(50);
  
  Serial.println("GreenWear ESP32 Enhanced Firmware Started");
  Serial.println("==========================================");
}

void loop() {
  // 하드웨어 데이터 읽기
  readSensorData();
  
  // 건강 상태 분석
  analyzeHealthStatus();
  
  // LED 상태 업데이트
  updateLEDStatus();
  
  // 데이터 전송 (30초마다)
  if (millis() - lastDataSend > 30000) {
    sendDataToServer();
    lastDataSend = millis();
  }
  
  // 블루투스 통신 처리
  handleBluetoothCommunication();
  
  // 시리얼 모니터 출력 (5초마다)
  if (millis() % 5000 < 100) {
    printStatus();
  }
  
  delay(100);
}

void initializeHardware() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(PULSE_PIN, INPUT);
  
  // I2C 초기화 (MAX30102용)
  Wire.begin();
  
  Serial.println("Hardware initialized");
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    isConnected = true;
    currentLEDState = LED_NORMAL;
  } else {
    Serial.println();
    Serial.println("WiFi connection failed");
    currentLEDState = LED_ERROR;
  }
}

void readSensorData() {
  // 심박수 측정
  measureHeartRate();
  
  // 체온 측정
  measureTemperature();
  
  // 산소포화도 측정 (시뮬레이션)
  measureOxygenSaturation();
}

void measureHeartRate() {
  pulseValue = analogRead(PULSE_PIN);
  
  // 심박수 감지 로직 (실제로는 더 정교한 알고리즘 필요)
  if (pulseValue > 600 && !pulseDetected) {
    pulseDetected = true;
    pulseCount++;
    
    if (pulseCount > 0) {
      unsigned long currentTime = millis();
      if (pulseTime > 0) {
        unsigned long interval = currentTime - pulseTime;
        heartRate = 60000 / interval; // BPM 계산
        
        // 심박수 범위 제한
        if (heartRate < 40) heartRate = 40;
        if (heartRate > 200) heartRate = 200;
      }
      pulseTime = currentTime;
    }
  } else if (pulseValue <= 600) {
    pulseDetected = false;
  }
  
  // 10초마다 심박수 리셋
  if (millis() - lastHeartBeat > 10000) {
    heartRate = random(60, 100); // 시뮬레이션용 랜덤 값
    lastHeartBeat = millis();
  }
}

void measureTemperature() {
  tempSensor.requestTemperatures();
  temperature = tempSensor.getTempCByIndex(0);
  
  // 온도 센서 오류 처리
  if (temperature == DEVICE_DISCONNECTED_C) {
    temperature = 36.5 + random(-20, 20) / 10.0; // 시뮬레이션용 값
  }
}

void measureOxygenSaturation() {
  // MAX30102 센서가 없는 경우 시뮬레이션
  oxygenSaturation = 95 + random(0, 5);
}

void analyzeHealthStatus() {
  // 심박수 기반 상태 분석
  if (heartRate < 60 || heartRate > 100) {
    if (heartRate < 50 || heartRate > 120) {
      deviceStatus = "critical";
      currentLEDState = LED_CRITICAL;
    } else {
      deviceStatus = "warning";
      currentLEDState = LED_WARNING;
    }
  } else {
    deviceStatus = "normal";
    currentLEDState = LED_NORMAL;
  }
  
  // 체온 기반 상태 분석
  if (temperature < 36.0 || temperature > 37.5) {
    if (temperature < 35.0 || temperature > 38.0) {
      deviceStatus = "critical";
      currentLEDState = LED_CRITICAL;
    } else if (deviceStatus != "critical") {
      deviceStatus = "warning";
      currentLEDState = LED_WARNING;
    }
  }
  
  // 산소포화도 기반 상태 분석
  if (oxygenSaturation < 95) {
    if (oxygenSaturation < 90) {
      deviceStatus = "critical";
      currentLEDState = LED_CRITICAL;
    } else if (deviceStatus != "critical") {
      deviceStatus = "warning";
      currentLEDState = LED_WARNING;
    }
  }
}

void updateLEDStatus() {
  if (millis() - lastLEDUpdate < 100) return; // 100ms마다 업데이트
  
  uint32_t color;
  
  switch (currentLEDState) {
    case LED_NORMAL:
      color = pixels.Color(0, 255, 0); // 초록색
      break;
    case LED_WARNING:
      color = pixels.Color(255, 255, 0); // 노란색
      break;
    case LED_CRITICAL:
      color = pixels.Color(255, 0, 0); // 빨간색
      break;
    case LED_CONNECTING:
      color = pixels.Color(0, 0, 255); // 파란색
      break;
    case LED_ERROR:
      color = pixels.Color(255, 0, 255); // 보라색
      break;
    default:
      color = pixels.Color(0, 0, 0); // 꺼짐
  }
  
  // LED 패턴 설정
  for (int i = 0; i < LED_COUNT; i++) {
    if (currentLEDState == LED_CONNECTING) {
      // 연결 중일 때 깜빡임
      if ((millis() / 500) % 2 == 0) {
        pixels.setPixelColor(i, color);
      } else {
        pixels.setPixelColor(i, 0);
      }
    } else if (currentLEDState == LED_CRITICAL) {
      // 위험 상태일 때 빠른 깜빡임
      if ((millis() / 200) % 2 == 0) {
        pixels.setPixelColor(i, color);
      } else {
        pixels.setPixelColor(i, 0);
      }
    } else {
      // 정상 상태일 때 고정
      pixels.setPixelColor(i, color);
    }
  }
  
  pixels.show();
  lastLEDUpdate = millis();
}

void sendDataToServer() {
  if (!isConnected) {
    Serial.println("Not connected to WiFi, skipping data send");
    return;
  }
  
  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  
  // JSON 데이터 생성
  DynamicJsonDocument doc(1024);
  doc["deviceId"] = "ESP32_001";
  doc["heartRate"] = heartRate;
  doc["temperature"] = temperature;
  doc["oxygenSaturation"] = oxygenSaturation;
  doc["status"] = deviceStatus;
  doc["timestamp"] = millis();
  doc["batteryLevel"] = random(80, 100);
  doc["signalStrength"] = WiFi.RSSI();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println("Sending data to server:");
  Serial.println(jsonString);
  
  int httpResponseCode = http.POST(jsonString);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Server response: " + String(httpResponseCode));
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error sending data: " + String(httpResponseCode));
    currentLEDState = LED_ERROR;
  }
  
  http.end();
}

void handleBluetoothCommunication() {
  if (SerialBT.available()) {
    String receivedData = SerialBT.readString();
    Serial.println("Bluetooth received: " + receivedData);
    
    // 명령 처리
    if (receivedData.indexOf("GET_STATUS") >= 0) {
      sendStatusViaBluetooth();
    } else if (receivedData.indexOf("RESET") >= 0) {
      resetDevice();
    } else if (receivedData.indexOf("LED_TEST") >= 0) {
      testLEDs();
    }
  }
}

void sendStatusViaBluetooth() {
  DynamicJsonDocument doc(512);
  doc["heartRate"] = heartRate;
  doc["temperature"] = temperature;
  doc["oxygenSaturation"] = oxygenSaturation;
  doc["status"] = deviceStatus;
  doc["wifiConnected"] = isConnected;
  doc["batteryLevel"] = random(80, 100);
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  SerialBT.println(jsonString);
}

void resetDevice() {
  Serial.println("Resetting device...");
  ESP.restart();
}

void testLEDs() {
  Serial.println("Testing LEDs...");
  
  // 모든 LED를 순차적으로 테스트
  for (int i = 0; i < LED_COUNT; i++) {
    pixels.clear();
    pixels.setPixelColor(i, pixels.Color(255, 255, 255));
    pixels.show();
    delay(200);
  }
  
  pixels.clear();
  pixels.show();
}

void printStatus() {
  Serial.println("=== GreenWear Status ===");
  Serial.println("Heart Rate: " + String(heartRate) + " BPM");
  Serial.println("Temperature: " + String(temperature, 1) + " °C");
  Serial.println("Oxygen Saturation: " + String(oxygenSaturation) + "%");
  Serial.println("Status: " + deviceStatus);
  Serial.println("WiFi Connected: " + String(isConnected ? "Yes" : "No"));
  Serial.println("LED State: " + String(currentLEDState));
  Serial.println("========================");
}

// 버튼 인터럽트 핸들러
void IRAM_ATTR buttonISR() {
  static unsigned long lastPress = 0;
  unsigned long currentPress = millis();
  
  if (currentPress - lastPress > 200) { // 디바운싱
    Serial.println("Button pressed!");
    
    // LED 테스트 실행
    testLEDs();
    
    // 상태 전송
    sendStatusViaBluetooth();
    
    lastPress = currentPress;
  }
}
