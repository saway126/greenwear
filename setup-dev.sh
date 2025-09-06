#!/bin/bash
echo "========================================"
echo "   GreenWear 개발 환경 설정 시작"
echo "========================================"

echo ""
echo "1. Node.js 버전 확인..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js가 설치되지 않았습니다."
    echo "https://nodejs.org 에서 Node.js 18.20.8을 설치해주세요."
    exit 1
fi
node --version

echo ""
echo "2. Git 상태 확인..."
if ! command -v git &> /dev/null; then
    echo "[WARNING] Git이 설치되지 않았습니다."
    echo "Git을 설치한 후 git clone https://github.com/saway126/greenwear.git 으로 클론해주세요."
else
    git status
fi

echo ""
echo "3. 의존성 설치..."
if ! npm install; then
    echo "[ERROR] 의존성 설치에 실패했습니다."
    echo "npm cache clean --force 를 실행한 후 다시 시도해주세요."
    exit 1
fi

echo ""
echo "4. 환경 변수 파일 생성..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "[SUCCESS] .env 파일이 생성되었습니다."
else
    echo "[INFO] .env 파일이 이미 존재합니다."
fi

echo ""
echo "5. 빌드 테스트..."
if ! npm run build; then
    echo "[ERROR] 빌드에 실패했습니다."
    exit 1
fi

echo ""
echo "========================================"
echo "   설정 완료! 개발 서버를 시작합니다."
echo "========================================"
echo ""
echo "브라우저에서 http://localhost:5173 을 열어주세요."
echo "Ctrl+C를 눌러 서버를 중지할 수 있습니다."
echo ""
read -p "Enter 키를 눌러 계속하세요..."
npm run dev
