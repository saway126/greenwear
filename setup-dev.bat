@echo off
echo ========================================
echo    GreenWear 개발 환경 설정 시작
echo ========================================

echo.
echo 1. Node.js 버전 확인...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js가 설치되지 않았습니다.
    echo https://nodejs.org 에서 Node.js 18.20.8을 설치해주세요.
    pause
    exit /b 1
)

echo.
echo 2. Git 상태 확인...
git status
if %errorlevel% neq 0 (
    echo [WARNING] Git이 초기화되지 않았습니다.
    echo git clone https://github.com/saway126/greenwear.git 으로 클론해주세요.
)

echo.
echo 3. 의존성 설치...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] 의존성 설치에 실패했습니다.
    echo npm cache clean --force 를 실행한 후 다시 시도해주세요.
    pause
    exit /b 1
)

echo.
echo 4. 환경 변수 파일 생성...
if not exist .env (
    copy env.example .env
    echo [SUCCESS] .env 파일이 생성되었습니다.
) else (
    echo [INFO] .env 파일이 이미 존재합니다.
)

echo.
echo 5. 빌드 테스트...
npm run build
if %errorlevel% neq 0 (
    echo [ERROR] 빌드에 실패했습니다.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    설정 완료! 개발 서버를 시작합니다.
echo ========================================
echo.
echo 브라우저에서 http://localhost:5173 을 열어주세요.
echo Ctrl+C를 눌러 서버를 중지할 수 있습니다.
echo.
pause
npm run dev
