from groq import Groq
import os


class GroqApp:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_KEY"))
        self.models = [
            "groq/compound-mini",
            "groq/compound",
            "llama-3.1-8b-instant",
            "llama-3.3-70b-versatile",
            "meta-llama/llama-prompt-guard-2-22m",
            "meta-llama/llama-prompt-guard-2-86m",
            "meta-llama/llama-guard-4-12b",
            "meta-llama/llama-4-scout-17b-16e-instruct",
            "meta-llama/llama-4-maverick-17b-128e-instruct",
            "moonshotai/kimi-k2-instruct-0905",
            "moonshotai/kimi-k2-instruct",
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b",
            "allam-2-7b",
            "qwen/qwen3-32b",
        ]
        
    def generate_response(self, model, messages):
        completion = self.client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=1,
            max_completion_tokens=8192,
            top_p=1,
            reasoning_effort="medium",
            stream=False,
            stop=None
        )
        print(completion.choices[0].message.content)
        return completion
    
    def single_message_response(self, model, user_message):
        messages = [
            {
                "role": "user",
                "content": user_message
            }
        ]
        return self.generate_response(model, messages)