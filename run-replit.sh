#!/bin/bash

echo "🚀 GreenWear Replit 배포 시작!"

# Java 버전 확인
echo "📋 Java 버전 확인..."
java -version

# Gradle 버전 확인
echo "📋 Gradle 버전 확인..."
./backend-spring/demo/gradlew --version

# 백엔드 빌드
echo "🔨 백엔드 빌드 중..."
cd backend-spring/demo
./gradlew clean build -x test

# 백엔드 실행 (백그라운드)
echo "🚀 백엔드 서버 시작..."
./gradlew bootRun --args='--spring.profiles.active=replit' &
BACKEND_PID=$!

# 백엔드 시작 대기
echo "⏳ 백엔드 서버 시작 대기 중..."
sleep 30

# 프론트엔드 의존성 설치
echo "📦 프론트엔드 의존성 설치..."
cd ../../frontend
npm install

# 프론트엔드 빌드
echo "🔨 프론트엔드 빌드 중..."
npm run build

# 프론트엔드 실행
echo "🚀 프론트엔드 서버 시작..."
npm run preview

# 정리
trap "echo '🛑 서버 종료 중...'; kill $BACKEND_PID; exit" INT TERM
wait
