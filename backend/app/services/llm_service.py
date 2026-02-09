import httpx

from app.core.config import settings


class LLMService:
    async def translate(self, text: str, target_language: str) -> str:
        if not settings.groq_api_key:
            return text

        headers = {"Authorization": f"Bearer {settings.groq_api_key}"}
        payload = {
            "model": settings.groq_model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a financial assistant that translates text accurately.",
                },
                {
                    "role": "user",
                    "content": f"Translate the following to {target_language}:\n{text}",
                },
            ],
            "temperature": 0.2,
        }
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]


llm_service = LLMService()
