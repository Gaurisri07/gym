import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { chatAPI } from "../services/api";

type Message = { role: "user" | "assistant"; content: string };

interface ChatInterfaceProps {
  systemPrompt: string;
  botName: string;
  placeholder?: string;
  welcomeMessage?: string;
}

export default function ChatInterface({
  systemPrompt,
  botName,
  placeholder = "Type your message...",
  welcomeMessage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    welcomeMessage ? [{ role: "assistant", content: welcomeMessage }] : []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

    try {
      const chatType = window.location.pathname.includes('dietician') ? 'dietician' : 'gym_buddy';
      let sessionId = sessionStorage.getItem(`${chatType}_session_id`);
      if (!sessionId) {
        sessionId = `${chatType}_${Date.now()}`;
        sessionStorage.setItem(`${chatType}_session_id`, sessionId);
      }
      
      const response = await chatAPI.sendMessage(userMsg.content, sessionId, chatType);
      setMessages((prev) => [...prev, { role: "assistant", content: response.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please make sure the backend server is running on port 5000." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="chat-bubble-ai flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">{botName} is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center gap-2 glass-panel p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}