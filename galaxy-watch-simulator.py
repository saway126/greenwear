#!/usr/bin/env python3
"""
Galaxy Watch 4 센서 데이터 시뮬레이터
실제 워치가 연결되기 전에 센서 데이터를 시뮬레이션하여 테스트
"""

import requests
import json
import time
import random
import math
from datetime import datetime

class GalaxyWatchSimulator:
    def __init__(self):
        self.server_url = "https://greenweariot-production.up.railway.app/api/wearable/data"
        self.device_id = "GALAXY_WATCH4_001"
        self.device_name = "Galaxy Watch4"
        
        # 시뮬레이션 데이터
        self.heart_rate = 75
        self.steps = 0
        self.battery_level = 100
        self.stress_level = 40
        self.acceleration = [0.0, 0.0, 9.8]  # 중력 가속도
        
    def simulate_heart_rate(self):
        """심박수 시뮬레이션 (60-100 BPM)"""
        # 운동 중일 때 심박수 증가
        if random.random() < 0.3:  # 30% 확률로 운동 시뮬레이션
            self.heart_rate = random.randint(80, 100)
        else:
            self.heart_rate = random.randint(60, 80)
        return self.heart_rate
    
    def simulate_steps(self):
        """걸음 수 시뮬레이션"""
        # 걸음 수는 계속 증가
        step_increment = random.randint(1, 5)
        self.steps += step_increment
        return self.steps
    
    def simulate_acceleration(self):
        """가속도 시뮬레이션"""
        # 실제 워치 움직임을 시뮬레이션
        self.acceleration[0] = random.uniform(-2.0, 2.0)  # X축
        self.acceleration[1] = random.uniform(-2.0, 2.0)  # Y축
        self.acceleration[2] = random.uniform(7.8, 11.8)  # Z축 (중력 + 움직임)
        return self.acceleration
    
    def simulate_battery(self):
        """배터리 레벨 시뮬레이션"""
        # 시간이 지날수록 배터리 감소
        if random.random() < 0.1:  # 10% 확률로 배터리 감소
            self.battery_level = max(0, self.battery_level - 1)
        return self.battery_level
    
    def calculate_stress_level(self, heart_rate):
        """심박수 기반 스트레스 레벨 계산"""
        if heart_rate < 60:
            return 20
        elif heart_rate < 80:
            return 40
        elif heart_rate < 100:
            return 60
        else:
            return 80
    
    def generate_health_data(self):
        """건강 데이터 생성"""
        heart_rate = self.simulate_heart_rate()
        steps = self.simulate_steps()
        acceleration = self.simulate_acceleration()
        battery = self.simulate_battery()
        stress = self.calculate_stress_level(heart_rate)
        
        # 칼로리 계산 (걸음 수 기반)
        calories = int(steps * 0.04)
        
        # 수면 시간 시뮬레이션 (6-8.5시간)
        sleep_hours = random.uniform(6.0, 8.5)
        
        # 혈중 산소 포화도 (95-100%)
        blood_oxygen = random.randint(95, 100)
        
        # 체온 (36.0-37.5도)
        temperature = random.uniform(36.0, 37.5)
        
        return {
            "deviceId": self.device_id,
            "deviceName": self.device_name,
            "deviceType": "galaxy_watch4",
            "heartRate": heart_rate,
            "steps": steps,
            "calories": calories,
            "sleep": round(sleep_hours, 1),
            "stress": stress,
            "bloodOxygen": blood_oxygen,
            "temperature": round(temperature, 1),
            "batteryLevel": battery,
            "acceleration": {
                "x": round(acceleration[0], 2),
                "y": round(acceleration[1], 2),
                "z": round(acceleration[2], 2)
            },
            "timestamp": int(time.time() * 1000)
        }
    
    def send_data_to_server(self, data):
        """서버로 데이터 전송"""
        try:
            response = requests.post(
                self.server_url,
                json=data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                print(f"✅ 데이터 전송 성공: {data['heartRate']} BPM, {data['steps']} 걸음")
                return True
            else:
                print(f"❌ 서버 응답 오류: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ 서버 연결 실패: {e}")
            return False
    
    def run_simulation(self, duration_minutes=10):
        """시뮬레이션 실행"""
        print(f"🚀 Galaxy Watch 4 시뮬레이션 시작")
        print(f"📱 디바이스: {self.device_name} ({self.device_id})")
        print(f"🌐 서버: {self.server_url}")
        print(f"⏱️  실행 시간: {duration_minutes}분")
        print("-" * 50)
        
        start_time = time.time()
        end_time = start_time + (duration_minutes * 60)
        
        while time.time() < end_time:
            # 건강 데이터 생성
            health_data = self.generate_health_data()
            
            # 현재 시간 표시
            current_time = datetime.now().strftime("%H:%M:%S")
            
            # 데이터 전송
            success = self.send_data_to_server(health_data)
            
            # 상태 출력
            status = "🟢" if success else "🔴"
            print(f"{status} [{current_time}] 심박수: {health_data['heartRate']} BPM, "
                  f"걸음: {health_data['steps']}, 배터리: {health_data['batteryLevel']}%")
            
            # 10초 대기
            time.sleep(10)
        
        print("\n🏁 시뮬레이션 완료!")

def main():
    print("🌱 GreenWear Galaxy Watch 4 시뮬레이터")
    print("=" * 50)
    
    # 시뮬레이터 생성
    simulator = GalaxyWatchSimulator()
    
    # 서버 연결 테스트
    print("🔍 서버 연결 테스트 중...")
    test_data = simulator.generate_health_data()
    if simulator.send_data_to_server(test_data):
        print("✅ 서버 연결 성공!")
        
        # 시뮬레이션 실행
        try:
            simulator.run_simulation(duration_minutes=5)  # 5분간 실행
        except KeyboardInterrupt:
            print("\n⏹️  시뮬레이션 중단됨")
    else:
        print("❌ 서버 연결 실패. 서버가 실행 중인지 확인하세요.")
        print("💡 서버 실행: cd greaenwear/backend && node server.js")

if __name__ == "__main__":
    main()
