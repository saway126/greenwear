# Heroku 배포 가이드

## 1. Heroku CLI 설치
```bash
# Windows
winget install Heroku.HerokuCLI

# 또는 공식 사이트에서 다운로드
# https://devcenter.heroku.com/articles/heroku-cli
```

## 2. Heroku 로그인
```bash
heroku login
```

## 3. Heroku 앱 생성
```bash
cd backend-spring/demo
heroku create greenwear-backend-spring
```

## 4. 환경변수 설정
```bash
heroku config:set SPRING_PROFILES_ACTIVE=heroku
heroku config:set PORT=8080
```

## 5. 배포
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 6. 로그 확인
```bash
heroku logs --tail
```

## 7. 앱 열기
```bash
heroku open
```
