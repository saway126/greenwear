#!/bin/bash
echo "GreenWear 개발 환경 설정을 시작합니다..."

echo ""
echo "1. Node.js 버전 확인..."
node --version

echo ""
echo "2. 의존성 설치..."
npm install

echo ""
echo "3. 환경 변수 파일 생성..."
if [ ! -f .env ]; then
    cp env.example .env
    echo ".env 파일이 생성되었습니다."
else
    echo ".env 파일이 이미 존재합니다."
fi

echo ""
echo "4. 개발 서버 시작..."
echo "브라우저에서 http://localhost:5173 을 열어주세요."
echo ""
npm run dev
