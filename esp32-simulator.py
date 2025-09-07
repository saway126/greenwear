#!/usr/bin/env python3
"""
ESP32 시뮬레이터 - 실제 ESP32 디바이스처럼 센서 데이터를 생성하고 서버로 전송
"""

import requests
import json
import time
import random
import math
from datetime import datetime

class ESP32Simulator:
    def __init__(self, server_url="http://localhost:5000"):
        self.server_url = server_url
        self.device_id = "ESP32_GREENWEAR_001"
        self.device_name = "GreenWear Smart Shirt"
        self.firmware_version = "2.0.0"
        
        # 센서 데이터 시뮬레이션 변수
        self.heart_rate = 75
        self.temperature = 36.5
        self.oxygen_saturation = 98
        self.step_count = 0
        self.battery_level = 100
        self.signal_strength = -45
        
        # 가속도계 데이터
        self.acceleration_x = 0.0
        self.acceleration_y = 0.0
        self.acceleration_z = 9.8
        
        # 위치 데이터 (서울시청)
        self.latitude = 37.5665
        self.longitude = 126.9780
        self.altitude = 50.0
        
        print(f"🌱 ESP32 시뮬레이터 시작")
        print(f"📱 디바이스 ID: {self.device_id}")
        print(f"🌐 서버 URL: {self.server_url}")
        print("=" * 50)
    
    def generate_realistic_sensor_data(self):
        """현실적인 센서 데이터 생성"""
        # 심박수 (60-100 BPM, 약간의 변동)
        self.heart_rate = max(60, min(100, self.heart_rate + random.uniform(-3, 3)))
        
        # 체온 (36.0-37.5°C, 천천히 변동)
        self.temperature = max(36.0, min(37.5, self.temperature + random.uniform(-0.1, 0.1)))
        
        # 산소포화도 (95-100%, 안정적)
        self.oxygen_saturation = max(95, min(100, self.oxygen_saturation + random.uniform(-1, 1)))
        
        # 걸음 수 (시간이 지날수록 증가)
        if random.random() < 0.3:  # 30% 확률로 걸음
            self.step_count += random.randint(1, 3)
        
        # 배터리 (시간이 지날수록 감소)
        if random.random() < 0.1:  # 10% 확률로 배터리 감소
            self.battery_level = max(0, self.battery_level - random.uniform(0.1, 0.5))
        
        # 가속도계 (걸음 패턴 시뮬레이션)
        if self.step_count > 0:
            self.acceleration_x = random.uniform(-2.0, 2.0)
            self.acceleration_y = random.uniform(-2.0, 2.0)
            self.acceleration_z = 9.8 + random.uniform(-1.0, 1.0)
        else:
            self.acceleration_x = random.uniform(-0.5, 0.5)
            self.acceleration_y = random.uniform(-0.5, 0.5)
            self.acceleration_z = 9.8 + random.uniform(-0.2, 0.2)
    
    def calculate_health_metrics(self):
        """건강 지표 계산"""
        # 스트레스 수준 (심박수 기반)
        stress_level = 30
        if self.heart_rate > 100:
            stress_level += (self.heart_rate - 100) * 2
        elif self.heart_rate < 60:
            stress_level += (60 - self.heart_rate) * 1.5
        
        # 활동 수준 (걸음 수와 가속도 기반)
        total_acceleration = math.sqrt(
            self.acceleration_x**2 + self.acceleration_y**2 + self.acceleration_z**2
        )
        activity_level = min(100, max(0, (total_acceleration - 9.8) * 10 + self.step_count / 10))
        
        # 수면 품질 (심박수와 체온 기반)
        sleep_quality = 100
        if self.heart_rate < 50 or self.heart_rate > 80:
            sleep_quality -= 20
        if self.temperature < 36.0 or self.temperature > 37.0:
            sleep_quality -= 15
        
        return {
            "stressLevel": int(stress_level),
            "activityLevel": int(activity_level),
            "sleepQuality": int(sleep_quality)
        }
    
    def determine_status(self):
        """디바이스 상태 결정"""
        if (self.heart_rate < 50 or self.heart_rate > 120 or 
            self.temperature < 35.5 or self.temperature > 38.0 or
            self.oxygen_saturation < 90):
            return "critical"
        elif (self.heart_rate < 60 or self.heart_rate > 100 or 
              self.temperature < 36.0 or self.temperature > 37.5 or
              self.oxygen_saturation < 95):
            return "warning"
        else:
            return "normal"
    
    def send_data_to_server(self):
        """서버로 데이터 전송"""
        try:
            # 센서 데이터 생성
            self.generate_realistic_sensor_data()
            
            # 건강 지표 계산
            health_metrics = self.calculate_health_metrics()
            
            # 상태 결정
            status = self.determine_status()
            
            # JSON 데이터 생성
            data = {
                "deviceId": self.device_id,
                "deviceName": self.device_name,
                "firmwareVersion": self.firmware_version,
                "heartRate": int(self.heart_rate),
                "temperature": round(self.temperature, 1),
                "oxygenSaturation": int(self.oxygen_saturation),
                "stepCount": self.step_count,
                "batteryLevel": int(self.battery_level),
                "signalStrength": self.signal_strength,
                "wifiConnected": True,
                "acceleration": {
                    "x": round(self.acceleration_x, 2),
                    "y": round(self.acceleration_y, 2),
                    "z": round(self.acceleration_z, 2)
                },
                "location": {
                    "latitude": self.latitude,
                    "longitude": self.longitude,
                    "altitude": self.altitude
                },
                "healthMetrics": health_metrics,
                "status": status,
                "timestamp": int(time.time() * 1000)
            }
            
            # 서버로 전송
            response = requests.post(
                f"{self.server_url}/api/wearable/data",
                json=data,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ 데이터 전송 성공 - 심박수: {self.heart_rate:.0f}, 체온: {self.temperature:.1f}°C, 상태: {status}")
                return True
            else:
                print(f"❌ 데이터 전송 실패: {response.status_code}")
                print(f"   응답: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ 연결 오류: {e}")
            return False
        except Exception as e:
            print(f"❌ 오류: {e}")
            return False
    
    def run_continuous_simulation(self, duration_minutes=5):
        """연속 시뮬레이션 실행"""
        print(f"🔄 {duration_minutes}분간 연속 시뮬레이션 시작...")
        print("   (Ctrl+C로 중지)")
        print()
        
        start_time = time.time()
        end_time = start_time + (duration_minutes * 60)
        success_count = 0
        total_count = 0
        
        try:
            while time.time() < end_time:
                total_count += 1
                
                if self.send_data_to_server():
                    success_count += 1
                
                # 5초마다 전송
                time.sleep(5)
                
                # 진행 상황 표시
                elapsed = int(time.time() - start_time)
                remaining = int(end_time - time.time())
                print(f"   진행: {elapsed}초 경과, {remaining}초 남음")
                
        except KeyboardInterrupt:
            print("\n⏹️  시뮬레이션 중지됨")
        
        # 결과 요약
        success_rate = (success_count / total_count) * 100 if total_count > 0 else 0
        print(f"\n📊 시뮬레이션 결과:")
        print(f"   총 전송 시도: {total_count}")
        print(f"   성공: {success_count}")
        print(f"   성공률: {success_rate:.1f}%")
    
    def test_single_transmission(self):
        """단일 전송 테스트"""
        print("🧪 단일 전송 테스트...")
        return self.send_data_to_server()
    
    def check_server_status(self):
        """서버 상태 확인"""
        try:
            response = requests.get(f"{self.server_url}/api/health", timeout=5)
            if response.status_code == 200:
                data = response.json()
                print(f"✅ 서버 연결 성공: {data.get('message', 'OK')}")
                return True
            else:
                print(f"❌ 서버 응답 오류: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"❌ 서버 연결 실패: {e}")
            return False

def main():
    print("🌱 GreenWear ESP32 시뮬레이터")
    print("=" * 50)
    
    # 시뮬레이터 생성
    simulator = ESP32Simulator()
    
    # 서버 상태 확인
    if not simulator.check_server_status():
        print("❌ 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.")
        return
    
    print("\n사용 가능한 명령어:")
    print("1. 단일 전송 테스트")
    print("2. 5분 연속 시뮬레이션")
    print("3. 10분 연속 시뮬레이션")
    print("4. 사용자 정의 시간")
    print("5. 종료")
    
    while True:
        try:
            choice = input("\n선택하세요 (1-5): ").strip()
            
            if choice == "1":
                simulator.test_single_transmission()
            elif choice == "2":
                simulator.run_continuous_simulation(5)
            elif choice == "3":
                simulator.run_continuous_simulation(10)
            elif choice == "4":
                minutes = int(input("시뮬레이션 시간(분): "))
                simulator.run_continuous_simulation(minutes)
            elif choice == "5":
                print("👋 시뮬레이터 종료")
                break
            else:
                print("❌ 잘못된 선택입니다.")
                
        except KeyboardInterrupt:
            print("\n👋 시뮬레이터 종료")
            break
        except ValueError:
            print("❌ 숫자를 입력하세요.")
        except Exception as e:
            print(f"❌ 오류: {e}")

if __name__ == "__main__":
    main()
