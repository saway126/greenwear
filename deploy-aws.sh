#!/bin/bash

# GreenWear AWS 배포 스크립트
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# 환경 변수 설정
STACK_NAME="greenwear-production"
REGION="ap-northeast-2"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPOSITORY="greenwear-backend"

log "GreenWear AWS 배포를 시작합니다..."
log "스택 이름: $STACK_NAME"
log "리전: $REGION"
log "계정 ID: $ACCOUNT_ID"

# 1. AWS CLI 및 Docker 확인
log "필수 도구 확인 중..."
command -v aws >/dev/null 2>&1 || error "AWS CLI가 설치되지 않았습니다."
command -v docker >/dev/null 2>&1 || error "Docker가 설치되지 않았습니다."
command -v jq >/dev/null 2>&1 || error "jq가 설치되지 않았습니다."

# 2. AWS 로그인 확인
log "AWS 로그인 상태 확인 중..."
aws sts get-caller-identity >/dev/null 2>&1 || error "AWS에 로그인되지 않았습니다."

# 3. ECR 리포지토리 생성
log "ECR 리포지토리 생성 중..."
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $REGION >/dev/null 2>&1 || {
    log "ECR 리포지토리를 생성합니다..."
    aws ecr create-repository --repository-name $ECR_REPOSITORY --region $REGION
}

# 4. ECR 로그인
log "ECR에 로그인 중..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# 5. Docker 이미지 빌드
log "Docker 이미지 빌드 중..."
docker build -f Dockerfile.aws -t $ECR_REPOSITORY:latest .

# 6. Docker 이미지 태그 및 푸시
log "Docker 이미지 푸시 중..."
docker tag $ECR_REPOSITORY:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPOSITORY:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPOSITORY:latest

# 7. CloudFormation 스택 배포
log "CloudFormation 스택 배포 중..."

# 데이터베이스 비밀번호 생성
DB_PASSWORD=$(openssl rand -base64 32)

# CloudFormation 스택 생성 또는 업데이트
if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION >/dev/null 2>&1; then
    log "기존 스택을 업데이트합니다..."
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://aws-deployment.yml \
        --parameters ParameterKey=Environment,ParameterValue=production \
                     ParameterKey=DatabasePassword,ParameterValue=$DB_PASSWORD \
        --capabilities CAPABILITY_IAM \
        --region $REGION
else
    log "새 스택을 생성합니다..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://aws-deployment.yml \
        --parameters ParameterKey=Environment,ParameterValue=production \
                     ParameterKey=DatabasePassword,ParameterValue=$DB_PASSWORD \
        --capabilities CAPABILITY_IAM \
        --region $REGION
fi

# 8. 스택 배포 완료 대기
log "스택 배포 완료를 기다리는 중..."
aws cloudformation wait stack-update-complete --stack-name $STACK_NAME --region $REGION || \
aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $REGION

# 9. 출력 정보 가져오기
log "배포 완료! 출력 정보를 가져오는 중..."
APPLICATION_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`ApplicationURL`].OutputValue' \
    --output text)

DATABASE_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`DatabaseEndpoint`].OutputValue' \
    --output text)

REDIS_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`RedisEndpoint`].OutputValue' \
    --output text)

# 10. 배포 완료 메시지
log "🎉 GreenWear AWS 배포가 완료되었습니다!"
echo ""
echo "📊 배포 정보:"
echo "  - 애플리케이션 URL: $APPLICATION_URL"
echo "  - 데이터베이스 엔드포인트: $DATABASE_ENDPOINT"
echo "  - Redis 엔드포인트: $REDIS_ENDPOINT"
echo "  - 데이터베이스 비밀번호: $DB_PASSWORD"
echo ""
echo "🔧 다음 단계:"
echo "  1. 도메인 DNS 설정을 CloudFront로 변경"
echo "  2. SSL 인증서 설정"
echo "  3. 데이터베이스 초기화 스크립트 실행"
echo "  4. 모니터링 및 알림 설정"
echo ""
echo "📚 유용한 명령어:"
echo "  - 스택 상태 확인: aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION"
echo "  - 로그 확인: aws logs describe-log-groups --log-group-name-prefix /aws/ecs/$STACK_NAME --region $REGION"
echo "  - ECS 서비스 상태: aws ecs describe-services --cluster $STACK_NAME-cluster --services $STACK_NAME-backend-service --region $REGION"
echo ""

log "배포 스크립트가 완료되었습니다!"
