#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
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List


import os

from groq import Groq

client = Groq(
    api_key="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",
    )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "skin consultant",
#             "content": "message",
#         }
#     ],
#     model="llama3-8b-8192",
# )

# print(chat_completion.choices[0].message.content)


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
    
    chat_completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",  # Typically use 'system' for initial instructions
                "content": "You are a skin consultant. Remember to keep the response within 30 words",
            },
            {
                "role": "user",
                "content": message.message,
            }
        ]
    )
    print('chat', chat_completion)
    response = chat_completion.choices[0].message.content
    
    print("Chat completion response:", response)

    return {
        "response": response
    }

@app.post("/chat")
async def chat(message: dict):
    user_message = message['message']
    # Your logic to process the message and generate a response
    response = {"response": f"Echo: {user_message}"}
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)