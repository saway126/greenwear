#!/bin/bash

echo "🌱 GreenWear IoT 시스템 통합 테스트"
echo "====================================="
echo

# Python 환경 확인
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3이 설치되지 않았습니다."
    echo "   Python 3.7 이상을 설치해주세요."
    exit 1
fi

# 필요한 Python 패키지 설치
echo "📦 필요한 패키지 설치 중..."
pip3 install requests > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ requests 패키지 설치 실패"
    exit 1
fi

echo "✅ Python 환경 준비 완료"
echo

# 백엔드 서버 상태 확인
echo "🔍 백엔드 서버 상태 확인 중..."
python3 -c "import requests; r = requests.get('https://greenwear-backend-node-production-1583.up.railway.app/api/health', timeout=10); print('✅ 백엔드 서버 연결 성공' if r.status_code == 200 else '❌ 백엔드 서버 연결 실패')" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ 백엔드 서버에 연결할 수 없습니다."
    echo "   인터넷 연결을 확인해주세요."
    exit 1
fi

echo
echo "🧪 IoT 연결 테스트 실행 중..."
echo "====================================="
python3 test-iot-connection.py

echo
echo "📋 테스트 완료 후 다음 단계:"
echo "1. ESP32에 esp32_test_simple.ino 업로드"
echo "2. WiFi 설정 수정 (ssid, password)"
echo "3. Arduino IDE 시리얼 모니터에서 테스트 실행"
echo "4. 웹 대시보드에서 데이터 확인"
echo "5. 모바일 앱에서 실시간 모니터링"
echo
