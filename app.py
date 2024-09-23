import sys

def simple_ai_response(user_input):
    responses = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm just a computer program, but I'm functioning as expected!",
        "what's your name": "I am your AI assistant."
    }
    return responses.get(user_input.lower(), "I'm sorry, I didn't understand that.")

if __name__ == "__main__":
    user_input = sys.argv[1]
    response = simple_ai_response(user_input)
    print(response)
