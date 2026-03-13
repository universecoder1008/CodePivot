import { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatBubble } from '../components/ChatBubble';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const defaultMessages = [
  
];

export const AIAssistantPage = () => {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(defaultMessages);
  const [history, setHistory] = useState([]);   // ⭐ NEW

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = input;

    // ⭐ Save question to history
    setHistory((prev) => [userMessage, ...prev]);

    setMessages((prev) => [
      ...prev,
      { role: "user", message: userMessage },
      { role: "assistant", message: "Typing..." }
    ]);

    setInput("");

    try {

      const res = await fetch("http://localhost:3000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", message: data.reply }
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", message: "Something went wrong." }
      ]);

    }

  };

  return (
    <section className="grid gap-4 lg:grid-cols-[280px_1fr]">

      {/* Conversation History */}
      <Card>
        <h3 className="font-bold">Conversation History</h3>

        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">

          {history.length === 0 && (
            <li className="text-slate-400">No conversations yet</li>
          )}

          {history.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setInput(item)}
            >
              {item}
            </li>
          ))}

        </ul>
      </Card>

      {/* Chat Area */}
      <Card className="space-y-4">

        <div className="space-y-3">
          {messages.map((msg, index) => (
            <ChatBubble key={`${msg.role}-${index}`} {...msg} />
          ))}
        </div>

        {/* Suggestion buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['Top 20 HR questions', 'OS revision list', 'Behavioral interview tips'].map((prompt) => (
            <button
              key={prompt}
              className="rounded-full border border-borderTone-light px-3 py-1 dark:border-borderTone-dark"
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="input"
            value={input}
            placeholder="Ask anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button onClick={sendMessage}>
            <Send size={16} />
          </Button>
        </div>

      </Card>

    </section>
  );
};