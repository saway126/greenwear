#!/bin/bash

echo "🚀 GreenWear Replit 배포 시작..."

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 프론트엔드 의존성 설치 및 빌드
echo "🎨 프론트엔드 빌드 중..."
cd frontend
npm install
npm run build
cd ..

# 백엔드 빌드 (선택사항)
if [ -d "backend-spring/demo" ]; then
    echo "🔧 백엔드 빌드 중..."
    cd backend-spring/demo
    chmod +x gradlew
    ./gradlew build -x test
    cd ../..
else
    echo "⚠️  백엔드 디렉토리를 찾을 수 없습니다. 프론트엔드만 실행합니다."
fi

# 통합 서버 시작
echo "🌐 GreenWear 통합 서버 시작..."
npm run start:replit
