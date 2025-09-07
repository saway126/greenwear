@echo off
echo ========================================
echo    GreenWear IoT 시스템 노트북 설정
echo ========================================
echo.

echo 1. Git 저장소 클론 중...
if not exist "greenwear" (
    git clone https://github.com/saway126/greenwear.git
    cd greenwear
) else (
    echo 이미 greenwear 폴더가 존재합니다.
    cd greenwear
    git pull origin main
)

echo.
echo 2. Python 가상환경 생성 중...
python -m venv venv

echo.
echo 3. 가상환경 활성화 중...
call venv\Scripts\activate

echo.
echo 4. 필요한 패키지 설치 중...
pip install requests

echo.
echo 5. API 테스트 실행 중...
python test-railway-api.py

echo.
echo ========================================
echo    설정 완료!
echo ========================================
echo.
echo 사용 가능한 명령어:
echo - Galaxy Watch 4 시뮬레이터: python galaxy-watch-simulator.py
echo - API 테스트: python test-railway-api.py
echo - 백엔드 서버 (로컬): cd backend && node server.js
echo.
echo 배포된 서비스:
echo - 백엔드 API: https://greenweariot-production.up.railway.app
echo - 프론트엔드: https://greenwear-demo.vercel.app
echo.
pause
