import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle sending messages
  const handleSend = async () => {
    try {
      const userMessage = message.trim();
      if (!userMessage) return;

      // Append user message and bot response to chat history without mutating state
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "user", message: userMessage },
      ]);

      setMessage(""); // Clear input message

      const response = await fetch(`http://127.0.0.1:8000/chat`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      // Append bot message to chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "bot", message: botMessage },
      ]);
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
    setChatHistory([welcomeMessage]); // Add the welcome message to the chat history
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
