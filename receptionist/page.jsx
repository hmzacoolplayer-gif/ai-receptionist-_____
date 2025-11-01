"use client";
import { useState } from "react";

export default function Receptionist() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((p) => [...p, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const aiMessage = { role: "assistant", content: data.reply };
    setMessages((p) => [...p, aiMessage]);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Receptionist 🤖</h1>
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow">
        <div className="h-80 overflow-y-auto border-b mb-3 p-2">
          {messages.map((m, i) => (
            <div key={i} className={`my-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-2 rounded-xl ${
                  m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-1 border p-2 rounded-l-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say hi..."
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-xl" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
