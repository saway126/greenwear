/*
 * GreenWear ESP32 간단 테스트 펌웨어
 * 실제 하드웨어 없이도 테스트할 수 있는 시뮬레이션 버전
 * 
 * 테스트 목적:
 * - WiFi 연결
 * - 서버 통신
 * - 센서 데이터 시뮬레이션
 * - LED 상태 표시
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi 설정 (실제 환경에 맞게 수정)
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverURL = "https://greenwear-backend-node-production-1583.up.railway.app/api/wearable/data";

// 디바이스 설정
const char* deviceId = "ESP32_TEST_001";
const char* deviceName = "GreenWear Test Device";

// 전역 변수
unsigned long lastDataSend = 0;
bool isConnected = false;
int testCounter = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("🌱 GreenWear ESP32 테스트 시작");
  Serial.println("================================");
  
  // WiFi 연결
  connectToWiFi();
  
  Serial.println("테스트 준비 완료!");
  Serial.println("시리얼 모니터에서 't'를 입력하여 수동 테스트 실행");
  Serial.println("자동 전송은 30초마다 실행됩니다.");
}

void loop() {
  // 시리얼 입력 처리
  if (Serial.available()) {
    String command = Serial.readString();
    command.trim();
    
    if (command == "t" || command == "test") {
      Serial.println("🧪 수동 테스트 실행...");
      sendTestData();
    } else if (command == "w" || command == "wifi") {
      Serial.println("📶 WiFi 상태 확인...");
      checkWiFiStatus();
    } else if (command == "s" || command == "status") {
      Serial.println("📊 디바이스 상태 출력...");
      printDeviceStatus();
    } else if (command == "h" || command == "help") {
      printHelp();
    } else {
      Serial.println("알 수 없는 명령어입니다. 'h'를 입력하여 도움말을 확인하세요.");
    }
  }
  
  // 자동 데이터 전송 (30초마다)
  if (millis() - lastDataSend > 30000) {
    sendTestData();
    lastDataSend = millis();
  }
  
  delay(100);
}

void connectToWiFi() {
  Serial.print("📶 WiFi 연결 중");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("✅ WiFi 연결 성공!");
    Serial.print("IP 주소: ");
    Serial.println(WiFi.localIP());
    Serial.print("신호 강도: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    isConnected = true;
  } else {
    Serial.println();
    Serial.println("❌ WiFi 연결 실패");
    isConnected = false;
  }
}

void sendTestData() {
  if (!isConnected) {
    Serial.println("❌ WiFi가 연결되지 않았습니다.");
    return;
  }
  
  testCounter++;
  Serial.println("📡 테스트 데이터 전송 중... (테스트 #" + String(testCounter) + ")");
  
  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("User-Agent", "GreenWear-ESP32-Test/1.0");
  
  // 테스트 데이터 생성
  DynamicJsonDocument doc(1024);
  doc["deviceId"] = deviceId;
  doc["deviceName"] = deviceName;
  doc["firmwareVersion"] = "1.0.0-test";
  doc["heartRate"] = 70 + random(-10, 20);
  doc["temperature"] = 36.5 + random(-10, 15) / 10.0;
  doc["oxygenSaturation"] = 95 + random(0, 5);
  doc["stepCount"] = 1000 + random(0, 2000);
  doc["batteryLevel"] = 90 + random(-10, 10);
  doc["signalStrength"] = WiFi.RSSI();
  doc["wifiConnected"] = true;
  doc["status"] = "normal";
  doc["timestamp"] = millis();
  
  // 가속도계 데이터 (시뮬레이션)
  JsonObject acceleration = doc.createNestedObject("acceleration");
  acceleration["x"] = random(-20, 20) / 10.0;
  acceleration["y"] = random(-20, 20) / 10.0;
  acceleration["z"] = 9.8 + random(-10, 10) / 10.0;
  
  // 위치 데이터 (시뮬레이션)
  JsonObject location = doc.createNestedObject("location");
  location["latitude"] = 37.5665;
  location["longitude"] = 126.9780;
  location["altitude"] = 50.0;
  
  // 건강 지표 (시뮬레이션)
  JsonObject healthMetrics = doc.createNestedObject("healthMetrics");
  healthMetrics["stressLevel"] = 30 + random(0, 40);
  healthMetrics["activityLevel"] = 50 + random(0, 40);
  healthMetrics["sleepQuality"] = 70 + random(0, 25);
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println("전송 데이터:");
  Serial.println(jsonString);
  
  int httpResponseCode = http.POST(jsonString);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("✅ 서버 응답: " + String(httpResponseCode));
    Serial.println("응답 내용: " + response);
    
    // JSON 응답 파싱
    DynamicJsonDocument responseDoc(512);
    deserializeJson(responseDoc, response);
    
    if (responseDoc["success"]) {
      Serial.println("🎉 데이터 저장 성공!");
    } else {
      Serial.println("⚠️  서버에서 오류 응답");
    }
  } else {
    Serial.println("❌ 전송 실패: " + String(httpResponseCode));
    Serial.println("오류: " + http.errorToString(httpResponseCode));
  }
  
  http.end();
  Serial.println("================================");
}

void checkWiFiStatus() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("✅ WiFi 연결됨");
    Serial.println("SSID: " + String(WiFi.SSID()));
    Serial.println("IP: " + WiFi.localIP().toString());
    Serial.println("신호 강도: " + String(WiFi.RSSI()) + " dBm");
    Serial.println("MAC 주소: " + WiFi.macAddress());
  } else {
    Serial.println("❌ WiFi 연결 안됨");
    Serial.println("상태 코드: " + String(WiFi.status()));
  }
}

void printDeviceStatus() {
  Serial.println("📊 디바이스 상태");
  Serial.println("디바이스 ID: " + String(deviceId));
  Serial.println("디바이스 이름: " + String(deviceName));
  Serial.println("WiFi 연결: " + String(isConnected ? "연결됨" : "연결 안됨"));
  Serial.println("테스트 횟수: " + String(testCounter));
  Serial.println("업타임: " + String(millis() / 1000) + " 초");
  Serial.println("자유 메모리: " + String(ESP.getFreeHeap()) + " bytes");
}

void printHelp() {
  Serial.println("📖 사용 가능한 명령어:");
  Serial.println("  t, test  - 수동 데이터 전송 테스트");
  Serial.println("  w, wifi  - WiFi 상태 확인");
  Serial.println("  s, status - 디바이스 상태 출력");
  Serial.println("  h, help  - 이 도움말 표시");
  Serial.println("  r, reset - ESP32 재시작");
  Serial.println("");
  Serial.println("자동 전송은 30초마다 실행됩니다.");
}
