"use client";
import { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Append user message
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/get-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API.");
      }

      const data: { message: string } = await response.json();

      const botMessage: Message = { sender: "bot", text: formatResponse(data.message) };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { sender: "bot", text: "Error fetching response." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const formatResponse = (text: string): string => {
    // Format bullet points and line breaks for better readability
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
      .replace(/\n/g, "<br>") // Line breaks
      .replace(/- (.*?)(?=\n|$)/g, "• $1<br>"); // Convert dashes to bullet points
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-3xl my-4 font-bold text-center bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">HealthCare Bot</h1>
        <div className="bg-white shadow rounded-lg p-4 h-[60vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-200"
                }`}
            >
              {/* Conditionally render message with or without dangerouslySetInnerHTML */}
              {msg.sender === "bot" ? (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your symptoms..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
