"use client";

import { useState } from "react";
import { ChatWelcomeScreen } from "./chat-welcome-screen";
import { ChatConversationView } from "./chat-conversation-view";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function ChatMain() {
  const [message, setMessage] = useState("");
  const [selectedMode, setSelectedMode] = useState("fast");
  const [selectedModel, setSelectedModel] = useState("square-3");
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (!message.trim()) return;

    setIsConversationStarted(true);

    setMessages([
      {
        id: "1",
        content: message,
        sender: "user",
        timestamp: new Date(),
      },
      {
        id: "2",
        content:
          "Hello! I'm Square AI, your intelligent assistant. I'm here to help you with anything you need. How can I assist you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    setMessage("");
  };

  const handleReset = () => {
    setIsConversationStarted(false);
    setMessages([]);
    setMessage("");
  };

  const handleSendMessage = (content: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        content,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setMessage("");
  };

  if (isConversationStarted) {
    return (
      <ChatConversationView
        messages={messages}
        message={message}
        onMessageChange={setMessage}
        onSend={handleSendMessage}
        onReset={handleReset}
      />
    );
  }

  return (
    <ChatWelcomeScreen
      message={message}
      onMessageChange={setMessage}
      onSend={handleSend}
      selectedMode={selectedMode}
      onModeChange={setSelectedMode}
      selectedModel={selectedModel}
      onModelChange={setSelectedModel}
    />
  );
}
