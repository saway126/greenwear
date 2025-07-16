import os
from google import genai

# 환경변수 확인
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("❌ GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
    print("\n🔑 API 키 설정 방법:")
    print("1. Google AI Studio에서 API 키 받기: https://aistudio.google.com/apikey")
    print("2. PowerShell에서 환경변수 설정:")
    print('   [Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "실제_API_키", "User")')
    print("3. PowerShell 재시작 후 다시 실행")
    exit()

print("✅ 환경변수에서 API 키를 찾았습니다.")

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="Explain how AI works in a few words"
    )
    print("\n🤖 Gemini AI 응답:")
    print(response.text)
except Exception as e:
    print(f"❌ 오류 발생: {e}") 