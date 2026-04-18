import requests
import os

# Tomar API Key desde variable de entorno
API_KEY = "AIzaSyB7PXjUh8zeScNgAA_9r2Qfh4kQKVPliZs"

if not API_KEY:
    raise ValueError("Falta GEMINI_API_KEY en variables de entorno")

URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"


def preguntar(prompt):
    """
    Envía un prompt a Gemini y devuelve el texto de respuesta
    """
    response = requests.post(
        URL,
        json={
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }
    )

    data = response.json()

    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return f"Error: {data}"


if __name__ == "__main__":
    # Ejemplo de uso
    while True:
        prompt = input("👉 Pregunta: ")

        if prompt.lower() in ["exit", "quit"]:
            break

        respuesta = preguntar(prompt)
        print("🤖 Gemini:", respuesta)