#!/usr/bin/env python3
"""
GreenWear IoT 연결 테스트 스크립트
ESP32 디바이스와 백엔드 서버 간의 통신을 테스트합니다.
"""

import requests
import json
import time
import random
from datetime import datetime

# 설정
BACKEND_URL = "https://greenwear-backend-node-production-1583.up.railway.app"
API_ENDPOINT = f"{BACKEND_URL}/api/wearable/data"
REALTIME_ENDPOINT = f"{BACKEND_URL}/api/wearable/realtime"

def generate_test_data():
    """테스트용 센서 데이터 생성"""
    return {
        "deviceId": "ESP32_GREENWEAR_TEST_001",
        "deviceName": "GreenWear Test Device",
        "firmwareVersion": "2.0.0",
        "heartRate": random.randint(60, 100),
        "temperature": round(random.uniform(36.0, 37.5), 1),
        "oxygenSaturation": random.randint(95, 100),
        "stepCount": random.randint(1000, 5000),
        "batteryLevel": random.randint(80, 100),
        "signalStrength": random.randint(-80, -30),
        "wifiConnected": True,
        "acceleration": {
            "x": round(random.uniform(-2.0, 2.0), 2),
            "y": round(random.uniform(-2.0, 2.0), 2),
            "z": round(random.uniform(9.0, 11.0), 2)
        },
        "location": {
            "latitude": 37.5665,
            "longitude": 126.9780,
            "altitude": 50.0
        },
        "healthMetrics": {
            "stressLevel": random.randint(20, 80),
            "activityLevel": random.randint(30, 90),
            "sleepQuality": random.randint(60, 95)
        },
        "status": random.choice(["normal", "warning", "critical"]),
        "timestamp": int(time.time() * 1000)
    }

def test_api_connection():
    """API 연결 테스트"""
    print("🔍 API 연결 테스트 중...")
    
    try:
        # 헬스 체크
        health_response = requests.get(f"{BACKEND_URL}/api/health", timeout=10)
        if health_response.status_code == 200:
            print("✅ 백엔드 서버 연결 성공")
        else:
            print(f"❌ 백엔드 서버 연결 실패: {health_response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ 백엔드 서버 연결 실패: {e}")
        return False
    
    return True

def test_data_transmission():
    """데이터 전송 테스트"""
    print("\n📡 센서 데이터 전송 테스트 중...")
    
    test_data = generate_test_data()
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ 데이터 전송 성공")
            print(f"   응답: {result}")
            return True
        else:
            print(f"❌ 데이터 전송 실패: {response.status_code}")
            print(f"   응답: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ 데이터 전송 실패: {e}")
        return False

def test_realtime_data():
    """실시간 데이터 조회 테스트"""
    print("\n📊 실시간 데이터 조회 테스트 중...")
    
    try:
        response = requests.get(REALTIME_ENDPOINT, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ 실시간 데이터 조회 성공")
            print(f"   조회된 레코드 수: {len(data)}")
            
            if data:
                latest = data[0]
                print(f"   최신 데이터:")
                print(f"     디바이스: {latest.get('deviceName', 'N/A')}")
                print(f"     심박수: {latest.get('heartRate', 'N/A')} BPM")
                print(f"     체온: {latest.get('temperature', 'N/A')}°C")
                print(f"     상태: {latest.get('status', 'N/A')}")
            
            return True
        else:
            print(f"❌ 실시간 데이터 조회 실패: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ 실시간 데이터 조회 실패: {e}")
        return False

def simulate_continuous_data():
    """연속 데이터 전송 시뮬레이션"""
    print("\n🔄 연속 데이터 전송 시뮬레이션 (30초간)...")
    
    start_time = time.time()
    success_count = 0
    total_count = 0
    
    while time.time() - start_time < 30:
        test_data = generate_test_data()
        
        try:
            response = requests.post(
                API_ENDPOINT,
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            total_count += 1
            if response.status_code == 200:
                success_count += 1
                print(f"✅ 전송 #{total_count}: 성공")
            else:
                print(f"❌ 전송 #{total_count}: 실패 ({response.status_code})")
                
        except requests.exceptions.RequestException as e:
            total_count += 1
            print(f"❌ 전송 #{total_count}: 오류 ({e})")
        
        time.sleep(2)  # 2초 간격
    
    success_rate = (success_count / total_count) * 100 if total_count > 0 else 0
    print(f"\n📈 전송 결과: {success_count}/{total_count} ({success_rate:.1f}% 성공)")

def test_error_handling():
    """오류 처리 테스트"""
    print("\n🚨 오류 처리 테스트 중...")
    
    # 잘못된 데이터 전송
    invalid_data = {
        "deviceId": "INVALID_DEVICE",
        "heartRate": "invalid",  # 잘못된 타입
        "timestamp": "invalid"
    }
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=invalid_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 400:
            print("✅ 잘못된 데이터 처리 성공 (400 오류)")
        else:
            print(f"⚠️  예상과 다른 응답: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ 오류 처리 테스트 실패: {e}")

def main():
    """메인 테스트 함수"""
    print("🌱 GreenWear IoT 연결 테스트 시작")
    print("=" * 50)
    
    # 1. API 연결 테스트
    if not test_api_connection():
        print("\n❌ API 연결 실패로 테스트 중단")
        return
    
    # 2. 데이터 전송 테스트
    if not test_data_transmission():
        print("\n❌ 데이터 전송 실패")
        return
    
    # 3. 실시간 데이터 조회 테스트
    if not test_realtime_data():
        print("\n❌ 실시간 데이터 조회 실패")
        return
    
    # 4. 연속 데이터 전송 시뮬레이션
    simulate_continuous_data()
    
    # 5. 오류 처리 테스트
    test_error_handling()
    
    print("\n" + "=" * 50)
    print("🎉 모든 테스트 완료!")
    print("\n📋 다음 단계:")
    print("1. ESP32 디바이스에 펌웨어 업로드")
    print("2. 실제 센서 연결 및 테스트")
    print("3. 웹 대시보드에서 데이터 확인")
    print("4. 모바일 앱에서 실시간 모니터링")

if __name__ == "__main__":
    main()
