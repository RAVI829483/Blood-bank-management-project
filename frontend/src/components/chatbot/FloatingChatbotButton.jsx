import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Bot,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  User,
} from "lucide-react";
import { searchKnowledgeBase, SUGGESTED_QUERIES } from "./bloodBankKnowledge";

export default function FloatingChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 **Hi! I am the Blood Bank AI Assistant.**\n\nAsk me anything about blood compatibility, donor eligibility, emergency requests, or DSA algorithms!",
      timestamp: "Just now",
      suggestions: [
        "Can O- donate to everyone?",
        "Who is eligible to donate?",
        "Emergency blood request",
      ],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  const handleSpeak = (text, index) => {
    if (!("speechSynthesis" in window)) return;
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_>-]/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = (textToSend = inputQuery) => {
    const query = (typeof textToSend === "string" ? textToSend : inputQuery).trim();
    if (!query) return;

    const userMsg = {
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const result = searchKnowledgeBase(query);
      const botMsg = {
        sender: "bot",
        text: result.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: result.suggestions || [],
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Modal Popup */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[400px] h-[550px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-5 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Blood Bank AI Assistant</h4>
                <p className="text-[11px] text-red-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Online 24/7
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const section = document.getElementById("chatbot");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                title="Scroll to full section on page"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map((msg, index) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    isBot ? "justify-start" : "justify-end flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs shadow-xs ${
                      isBot ? "bg-red-600 text-white" : "bg-slate-700 text-white"
                    }`}
                  >
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="max-w-[85%] space-y-1.5">
                    <div
                      className={`p-3 rounded-2xl shadow-xs leading-relaxed ${
                        isBot
                          ? "bg-white text-slate-800 border border-slate-200"
                          : "bg-red-600 text-white rounded-tr-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line space-y-1">
                        {msg.text.split("\n\n").map((chunk, cIdx) => (
                          <p key={cIdx}>{chunk.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                        ))}
                      </div>

                      {isBot && (
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSpeak(msg.text, index)}
                              className="p-1 hover:text-slate-700"
                              title="Listen"
                            >
                              {speakingIndex === index ? (
                                <VolumeX className="w-3 h-3 text-red-600" />
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                            </button>
                            <button
                              onClick={() => handleCopy(msg.text, index)}
                              className="p-1 hover:text-slate-700"
                              title="Copy"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {isBot && msg.suggestions && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {msg.suggestions.map((s, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSend(s)}
                            className="text-[11px] bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 rounded-full px-2.5 py-1 transition"
                          >
                            💡 {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-red-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-3 py-2 rounded-2xl border border-slate-200 text-slate-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask any blood bank question..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Prompt Bubble when closed */}
      {!isOpen && showTooltip && (
        <div
          onClick={() => setIsOpen(true)}
          className="mb-2 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-red-100 flex items-center gap-2 cursor-pointer hover:bg-red-50 transition animate-bounce [animation-duration:3s]"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-600 fill-red-100" />
          <span>Ask Blood Bank AI</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-xl shadow-red-600/35 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-white"
        aria-label="Open AI Blood Bank Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
