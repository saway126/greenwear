#!/usr/bin/env python3
"""
Railway API 테스트 스크립트
"""

import requests
import json

def test_railway_api():
    base_url = "https://greenweariot-production.up.railway.app"
    
    print("🔍 Railway API 테스트 시작")
    print(f"🌐 서버 URL: {base_url}")
    print("-" * 50)
    
    # 1. Health Check 테스트
    print("1️⃣ Health Check 테스트...")
    try:
        response = requests.get(f"{base_url}/api/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health Check 성공!")
            print(f"   응답: {response.json()}")
        else:
            print(f"❌ Health Check 실패: {response.status_code}")
    except Exception as e:
        print(f"❌ Health Check 오류: {e}")
    
    print()
    
    # 2. Wearable Data POST 테스트
    print("2️⃣ Wearable Data POST 테스트...")
    test_data = {
        "deviceId": "TEST_001",
        "deviceName": "Test Galaxy Watch",
        "heartRate": 75,
        "temperature": 36.5,
        "stepCount": 1000,
        "batteryLevel": 85,
        "timestamp": 1703123456789
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/wearable/data",
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Wearable Data POST 성공!")
            print(f"   응답: {response.json()}")
        else:
            print(f"❌ Wearable Data POST 실패: {response.status_code}")
            print(f"   응답: {response.text}")
    except Exception as e:
        print(f"❌ Wearable Data POST 오류: {e}")
    
    print()
    
    # 3. Realtime Data GET 테스트
    print("3️⃣ Realtime Data GET 테스트...")
    try:
        response = requests.get(f"{base_url}/api/wearable/realtime", timeout=10)
        if response.status_code == 200:
            print("✅ Realtime Data GET 성공!")
            print(f"   응답: {response.json()}")
        else:
            print(f"❌ Realtime Data GET 실패: {response.status_code}")
    except Exception as e:
        print(f"❌ Realtime Data GET 오류: {e}")
    
    print()
    print("🏁 테스트 완료!")

if __name__ == "__main__":
    test_railway_api()
