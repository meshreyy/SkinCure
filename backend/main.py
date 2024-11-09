#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
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # You can restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods, you can specify ["GET", "POST"] if you prefer
    allow_headers=["*"],  # Allow all headers, you can specify ["Content-Type"] if you prefer
)


class TableData(BaseModel):
    data: List[List[bool]]

@app.post("/process_table/")
async def process_table(table: TableData):
    print("data", table)

    if table.data[0][0] == False:
        print('FIRST ELEMENT IS FALSE')
        return {"response": "False is 0, 0"}
    else:
        print('FIRST ELEMENT IS TRUE')
        return {"response": "True is 0, 0"}

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chatbot(message: Message):
    print("message", message.message)
    
    response = get_chat_response(message.message)
    
    print("Chat completion response:", response)

    return {
        "response": response
    }


import requests
import json

def get_chat_response(user_message):
    # Define the API endpoint and the API key
    api_url = "https://api.vultrinference.com/v1/chat/completions"
    api_key = "THNEJKK3MXIE7YRZ75DIL5GRYHVNSMLNXRAA"
    
    # Define the headers
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Define the payload with the user message
    payload = {
        "messages": [
            {
                "role": "system",
                "content": "You are a skin consultant. Remember to keep the response within 30 words"
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        "model": "llama2-13b-chat-Q5_K_M",
        "max_tokens": 512,
        "stream": False
    }
    
    # Make the API request
    response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200:
        response_data = response.json()
        message_content = response_data['choices'][0]['message']['content']
        return message_content
    else:
        # Return error message if the request failed
        return {"error": "Failed to get a response from the API", "status_code": response.status_code}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    # res = get_chat_response('helo')
    # print(res)