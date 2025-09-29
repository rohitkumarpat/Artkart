"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function FullPageChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


 const sendMessage = async () => {
  if (!input.trim()) return;

 
  const newMessages: Message[] = [...messages, { role: "user", text: input }];
  setMessages(newMessages);
  setInput("");

  const res = await fetch("/api/chat-boat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  const data = await res.json();

  setMessages([...newMessages, { role: "bot", text: data.reply } as Message]);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white">ArtKart Chat Assistant 🤖</h1>

      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-lg flex flex-col p-6">
        <div className="flex-1 overflow-y-auto mb-4 max-h-[70vh]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded-lg max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white outline-none"
            placeholder="Ask me anything about ArtKart..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-r-lg font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
