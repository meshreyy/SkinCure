import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const columnNames = [
  "Acne", "Dryness", "Oiliness", "Itchiness", "Redness"
]
const imageSources = [
  "/acne.jpg",
  "/dryness.jpg",
  "/oiliness.jpg",
  "/itchiness.jpg",
  "/redness.jpg"
]

export function RJTable({ tableData, setTableData }) {
  const handleCheckboxChange = (rowIndex, colIndex) => {
      const newData = tableData.map((row, rIdx) => 
          row.map((col, cIdx) => 
              rIdx === rowIndex ? (cIdx === colIndex ? true : false) : col // Uncheck other boxes in the row
          )
      );
      console.log(rowIndex, colIndex);
      setTableData(newData); 
  };

  return (
      <Table>
          <TableCaption>&quot;Healthy skin is just a tap away!&quot;</TableCaption> {/* Escape double quotes */}
          <TableHeader>
              <TableRow>
                  <TableHead className="w-[150px]"></TableHead>
                  <TableHead className="w-[150px]">Mild</TableHead>
                  <TableHead className="w-[150px]">Moderate</TableHead>
                  <TableHead className="w-[150px]">Severe</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {
                  tableData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                          <TableCell>
                              {columnNames[rowIndex]}
                              <Image src={imageSources[rowIndex]} alt={columnNames[rowIndex]} width={50} height={50} />
                          </TableCell>
                          {
                              row.map((col, colIndex) => (
                                  <TableCell key={colIndex}>
                                      <Checkbox
                                          checked={col}
                                          onClick={() => handleCheckboxChange(rowIndex, colIndex)}
                                      ></Checkbox>
                                  </TableCell>
                              ))
                          }
                      </TableRow>
                  ))
              }
          </TableBody>
      </Table>
  )
}

export function ResultTable({ tableData }) {
  const severityLevels = ["Mild", "Moderate", "Severe"];

  // Filter the tableData to include only selected conditions
  const resultData = tableData.map((row, rowIndex) => {
      const severityIndex = row.findIndex(col => col === true);
      return severityIndex !== -1 ? { condition: columnNames[rowIndex], severity: severityLevels[severityIndex] } : null;
  }).filter(row => row !== null);

  return (
      <Table>
          <TableCaption>&quot;Your selected skin conditions&quot;</TableCaption> {/* Escape double quotes */}
          <TableHeader>
              <TableRow>
                  <TableHead className="w-[150px]">Condition</TableHead>
                  <TableHead className="w-[150px]">Severity</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {
                  resultData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                          <TableCell>
                              {row.condition}
                          </TableCell>
                          <TableCell>
                              {row.severity}
                          </TableCell>
                      </TableRow>
                  ))
              }
          </TableBody>
      </Table>
  );
}

export function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [responses, setResponses] = useState([]);

  const questions = [
      "What's your name?",
      "How old are you?",
      "What is your skin type? (e.g., oily, dry, combination, sensitive, normal)",
      "What are your main skin concerns? (e.g., acne, dryness, redness)",
      "How often do you experience these skin issues? (e.g., daily, weekly, monthly)",
      "What skincare products do you currently use?",
      "Do you have any known allergies to skincare ingredients? (yes/no)",
      "Do you eat something regularly that affects your skin? (yes/no)",
      "Do you have any other health conditions that might affect your skin? (yes/no)",
      "How much water do you drink daily? (e.g., less than 1 liter, 1-2 liters, more than 2 liters)",
  ];

  const generateSummary = (responses) => {
      return (
          `Name: ${responses[0]}\n` +
          `Age: ${responses[1]}\n` +
          `Skin Type: ${responses[2]}\n` +
          `Concerns: ${responses[3]}\n` +
          `Frequency: ${responses[4]}\n` +
          `Products: ${responses[5]}\n` +
          `Allergies: ${responses[6]}\n` +
          `Diet Impact: ${responses[7]}\n` +
          `Health Conditions: ${responses[8]}\n` +
          `Water Intake: ${responses[9]}\n` +
          "-------------------------------"
      );
  };

  useEffect(() => {
      const welcomeMessage = {
          sender: "bot",
          message: "Hi! I'm your skincare buddy. Let's get to know your skin better!",
      };
      setChatHistory([welcomeMessage]);
  }, []);

  const handleSend = (userMessage) => {
      const updatedHistory = [...chatHistory, { sender: "user", message: userMessage }];
      setChatHistory(updatedHistory);

      const updatedResponses = [...responses, userMessage];
      setResponses(updatedResponses);

      if (updatedResponses.length === questions.length) {
          const summary = generateSummary(updatedResponses);
          updatedHistory.push({ sender: "bot", message: `Here's a summary of your responses:\n\n${summary}` });
          setChatHistory(updatedHistory);
      } else {
          const nextQuestion = questions[updatedResponses.length];
          updatedHistory.push({ sender: "bot", message: nextQuestion });
          setChatHistory(updatedHistory);
      }
  };

  return (
      <div className="chatbot-container mt-6 p-4">
          <div className="flex flex-col gap-4">
              {chatHistory.map((entry, index) => (
                  <div key={index} className={entry.sender === "user" ? "user-message" : "bot-message"}>
                      <strong>{entry.sender === "user" ? "You:" : "Bot:"}</strong> {entry.message}
                  </div>
              ))}
          </div>
          <textarea
              placeholder="Type your answer here..."
              value={chatHistory[chatHistory.length - 1]?.message || ""}
              onChange={(e) => handleSend(e.target.value)}
              className="w-full p-2 border rounded-md"
          />
          <button
              onClick={() => handleSend(chatHistory[chatHistory.length - 1]?.message || "")}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          >
              Send
          </button>
      </div>
  );
}
