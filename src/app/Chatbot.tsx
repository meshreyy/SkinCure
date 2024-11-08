"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);
  const [userId, setUserId] = useState<string>(Math.random().toString(36).substring(7)); // Generate a random user ID for each session

  // Function to handle sending messages
  const handleSend = async () => {
    try {
      const userMessage = message.trim();
      if (!userMessage) return;

      const updatedHistory = [...chatHistory, { sender: "user", message: userMessage }];
      setChatHistory(updatedHistory);
      setMessage("");

      const response = await fetch(`http://127.0.0.1:8000/chat`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, user_id: userId }),
      });

      const data = await response.json();
      const botMessage = data.response;

      updatedHistory.push({ sender: "bot", message: botMessage });
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Welcome message when the page is loaded
  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      message: "Hi! I'm your skincare buddy. Let's get to know your skin better!",
    };
    setChatHistory([welcomeMessage]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-h-[400px] overflow-y-auto p-3 bg-gray- rounded-t-lg" id="chatbox">
      {chatHistory.map((entry, index) => (
        <div key={index} className="message-container">
          <div className={entry.sender === "user" ? "user-message" : "bot-message"}>
            <strong>{entry.sender === "user" ? "You:" : "Bot:"}</strong> {entry.message}
          </div>
        </div>
      ))}
      <div className="w-full flex mt-4 gap-2">
        <Textarea
          placeholder="Type your query here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <Button variant="destructive" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};
