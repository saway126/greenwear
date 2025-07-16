import google.generativeai as genai
import os

# API 키 설정 (환경변수에서 읽기)
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    genai.configure(api_key=api_key)
    print("✅ 환경변수에서 API 키를 읽었습니다.")
else:
    print("❌ GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
    print("다음 중 하나를 실행하세요:")
    print("1. PowerShell: [Environment]::SetEnvironmentVariable('GEMINI_API_KEY', '실제_API_키', 'User')")
    print("2. 또는 아래 줄의 주석을 해제하고 API 키를 직접 입력:")
    print("# genai.configure(api_key='실제_API_키_여기에')")
    exit()

# 모델 생성
model = genai.GenerativeModel('gemini-pro')

# 테스트 메시지
try:
    response = model.generate_content("안녕하세요! 간단한 인사말을 해주세요.")
    print("\n🤖 Gemini AI 응답:")
    print(response.text)
except Exception as e:
    print(f"❌ 오류 발생: {e}") 