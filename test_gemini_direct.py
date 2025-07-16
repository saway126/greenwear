from google import genai

# 직접 API 키 설정 (실제 키로 교체하세요)
client = genai.Client(api_key="여기에_실제_API_키_입력")

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="Explain how AI works in a few words"
    )
    print("🤖 Gemini AI 응답:")
    print(response.text)
except Exception as e:
    print(f"❌ 오류 발생: {e}")
    print("💡 API 키가 올바른지 확인하세요!") 