"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from 'react';
import { RJTable, ResultTable } from "./data-table";
import { Button } from "@/components/ui/button";

const initialData = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false]
];

export default function Home() {
  const [tableData, setTableData] = useState(initialData);
  const [page, setPageNumber] = useState(1);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleNextClick = () => {
    setPageNumber(page + 1);
  };

  const handleBackClick = () => {
    if (page <= 1) {
      return;
    }
    setPageNumber(page - 1);
  };

  const handleSend = async () => {
    try {
      const userMessage = message.trim();
      if (!userMessage) return;

      const updatedHistory = [...chatHistory, { sender: "user", message: userMessage }];
      setChatHistory(updatedHistory);
      setMessage('');

      const response = await fetch(`http://127.0.0.1:8000/chat`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      updatedHistory.push({ sender: "bot", message: botMessage });
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Error sending message');
    }
  };

  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      message: "Hi! I'm your skincare buddy. Let's get to know your skin better!"
    };
    setChatHistory([welcomeMessage]);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8">
        {page === 1 && (
          <>
            <div className="flex flex-col items-center gap-4 w-[500px] bg-black p-6 rounded-xl shadow-md">
              <h1 className="text-center text-2xl font-semibold mb-4">Skin Care Chatbot</h1>
              <div className="flex flex-col w-full max-h-[400px] overflow-y-auto p-3 bg-gray rounded-t-lg" id="chatbox">
                {chatHistory.map((entry, index) => (
                  <div key={index} className="message-container">
                    <div className={entry.sender === 'user' ? "user-message" : "bot-message"}>
                      <strong>{entry.sender === 'user' ? 'You:' : 'Bot:'}</strong> {entry.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex mt-4 gap-2">
                <Textarea
                  placeholder="Type your query here."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button variant="destructive" onClick={handleSend}>Send</Button>
              </div>
            </div>
          </>
        )}
        {page === 2 && <RJTable tableData={tableData} setTableData={setTableData} />}
        {page === 3 && <ResultTable tableData={tableData} />}
        <Button onClick={handleNextClick}>Next</Button>
        <Button variant="secondary" onClick={handleBackClick}>Back</Button>
      </main>
    </div>
  );
}
//changed once