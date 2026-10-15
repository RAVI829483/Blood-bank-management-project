import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Search,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  HelpCircle,
  ShieldCheck,
  Droplet,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Key,
  X,
} from "lucide-react";
import {
  BLOOD_COMPATIBILITY,
  KNOWLEDGE_ITEMS,
  SUGGESTED_QUERIES,
  CATEGORIES,
  searchKnowledgeBase,
} from "./bloodBankKnowledge";

export default function AIChatbotSection() {
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "compatibility" | "browse"
  const [inputQuery, setInputQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState("O-");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("bbms_gemini_key") || "");
  const [showSettings, setShowSettings] = useState(false);

  // Chat message history
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 **Hello! I am your Blood Bank AI Assistant.**\n\nI can answer any questions about **blood group compatibility**, **donor eligibility**, **donation procedures**, **emergency blood requests**, **blood components & shelf life**, and the **DSA algorithms** used in this portal.\n\n*What would you like to know today?*",
      timestamp: "Just now",
      suggestions: [
        "Can O- donate to everyone?",
        "What are the eligibility rules for blood donation?",
        "What DSA algorithms are used in this project?",
        "What is the shelf life of platelets?",
      ],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle SpeechSynthesis (TTS)
  const handleSpeak = (text, index) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanText = text.replace(/[*#`_>-]/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Copy
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Optional Gemini API Call if key is available
  const callGeminiAPI = async (prompt) => {
    if (!apiKey) return null;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert AI medical assistant for a Blood Bank Management System. Keep your answers clear, helpful, well-structured with markdown headings, bullet points, and accurate medical guidelines. Question: ${prompt}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch {
      return null;
    }
  };

  // Submit User Message
  const handleSend = async (queryText = inputQuery) => {
    const query = (typeof queryText === "string" ? queryText : inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Artificial slight delay for natural feeling
    setTimeout(async () => {
      let botResponseText = "";
      let botSuggestions = [];

      // If user has provided Gemini key, try it first
      if (apiKey) {
        const geminiReply = await callGeminiAPI(query);
        if (geminiReply) {
          botResponseText = geminiReply;
          botSuggestions = SUGGESTED_QUERIES.slice(0, 3);
        }
      }

      // If no key or Gemini didn't answer, use offline smart knowledge base
      if (!botResponseText) {
        const searchResult = searchKnowledgeBase(query);
        botResponseText = searchResult.message;
        botSuggestions = searchResult.suggestions || [];
      }

      const botMsg = {
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: botSuggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  // Voice Recognition (STT)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsVoiceActive(true);
    recognition.onend = () => setIsVoiceActive(false);
    recognition.onerror = () => setIsVoiceActive(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingIndex(null);
    setMessages([
      {
        sender: "bot",
        text: "🧹 *Conversation cleared.*\n\nAsk any question about blood compatibility, donor eligibility, DSA algorithms, or emergency requests!",
        timestamp: "Just now",
        suggestions: SUGGESTED_QUERIES.slice(0, 4),
      },
    ]);
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("bbms_gemini_key", key);
    setShowSettings(false);
  };

  const selectedCompatibility = BLOOD_COMPATIBILITY[selectedBloodType] || BLOOD_COMPATIBILITY["O-"];

  // Filtered knowledge cards for "browse" tab
  const filteredKnowledge =
    selectedCategory === "all"
      ? KNOWLEDGE_ITEMS
      : KNOWLEDGE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="chatbot" className="scroll-mt-24 py-20 bg-gradient-to-b from-white via-red-50/40 to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-red-600 animate-pulse" />
            AI-Powered Blood Bank Intelligence
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Search Any Information with <span className="text-red-600">AI Chatbot</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Instant guidance on blood group compatibility, donor eligibility criteria, emergency blood requests, component lifespans, and system DSA algorithms.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-slate-100/80 backdrop-blur rounded-2xl w-fit mx-auto border border-slate-200">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "chat"
                  ? "bg-red-600 text-white shadow-md shadow-red-500/25 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Bot className="w-4 h-4" />
              AI Assistant Chat
            </button>
            <button
              onClick={() => setActiveTab("compatibility")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "compatibility"
                  ? "bg-red-600 text-white shadow-md shadow-red-500/25 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Droplet className="w-4 h-4" />
              Compatibility Matrix
            </button>
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "browse"
                  ? "bg-red-600 text-white shadow-md shadow-red-500/25 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Search className="w-4 h-4" />
              Information Directory
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE AI CHATBOT */}
        {activeTab === "chat" && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col h-[700px] transition-all">
            {/* Chat Header Bar */}
            <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white px-6 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-red-700 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base md:text-lg">Blood Bank AI Assistant</h3>
                    <span className="text-[11px] bg-red-900/60 text-red-100 px-2 py-0.5 rounded-full font-medium">
                      {apiKey ? "Live Gemini AI" : "Offline Smart Knowledge"}
                    </span>
                  </div>
                  <p className="text-xs text-red-100/90">24/7 Instant Medical & Blood System Search</p>
                </div>
              </div>

              {/* Chat Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="Configure AI API Key (Optional)"
                  className="p-2 rounded-xl text-red-100 hover:text-white hover:bg-white/10 transition"
                >
                  <Key className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-red-100 hover:text-white hover:bg-white/10 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Gemini API Key Drawer / Modal */}
            {showSettings && (
              <div className="bg-amber-50 border-b border-amber-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-900">
                  <Key className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Optional:</strong> Enter a Google Gemini API Key to enable live generative AI responses, or leave empty to use our built-in comprehensive offline medical database.
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    defaultValue={apiKey}
                    id="geminiKeyInput"
                    className="px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white w-full sm:w-44 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("geminiKeyInput");
                      saveApiKey(input?.value || "");
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 whitespace-nowrap"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-slate-50/50">
              {messages.map((msg, index) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3.5 ${
                      isBot ? "justify-start" : "justify-end flex-row-reverse"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        isBot
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>

                    {/* Bubble */}
                    <div className="max-w-[85%] md:max-w-[75%] space-y-2">
                      <div
                        className={`rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                          isBot
                            ? "bg-white text-slate-800 border border-slate-200/80"
                            : "bg-red-600 text-white rounded-tr-sm"
                        }`}
                      >
                        {/* Message Content rendered safely with line breaks & formatting */}
                        <div className="space-y-2 prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-strong:text-slate-900 prose-ul:my-2 prose-li:my-0.5">
                          {msg.text.split("\n\n").map((paragraph, pIdx) => {
                            if (paragraph.startsWith("### ")) {
                              return (
                                <h4 key={pIdx} className="text-base font-bold text-red-900 mt-2 mb-1">
                                  {paragraph.replace("### ", "")}
                                </h4>
                              );
                            }
                            if (paragraph.startsWith("#### ")) {
                              return (
                                <h5 key={pIdx} className="text-sm font-semibold text-slate-800 mt-2 mb-1">
                                  {paragraph.replace("#### ", "")}
                                </h5>
                              );
                            }
                            if (paragraph.startsWith("- ")) {
                              const bulletItems = paragraph.split("\n");
                              return (
                                <ul key={pIdx} className="list-disc pl-5 space-y-1">
                                  {bulletItems.map((bItem, bIdx) => (
                                    <li key={bIdx}>
                                      {bItem.replace(/^[-*]\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            if (paragraph.match(/^\d+\.\s+/)) {
                              const numberedItems = paragraph.split("\n");
                              return (
                                <ol key={pIdx} className="list-decimal pl-5 space-y-1">
                                  {numberedItems.map((nItem, nIdx) => (
                                    <li key={nIdx}>
                                      {nItem.replace(/^\d+\.\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                                    </li>
                                  ))}
                                </ol>
                              );
                            }
                            return (
                              <p key={pIdx} className="whitespace-pre-line">
                                {paragraph.replace(/\*\*(.*?)\*\*/g, "$1")}
                              </p>
                            );
                          })}
                        </div>

                        {/* Bot Message Tools (TTS & Copy) */}
                        {isBot && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                            <span>{msg.timestamp}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSpeak(msg.text, index)}
                                title={speakingIndex === index ? "Stop speaking" : "Listen response"}
                                className={`p-1.5 rounded-lg transition ${
                                  speakingIndex === index
                                    ? "bg-red-100 text-red-600 animate-pulse"
                                    : "hover:bg-slate-100 hover:text-slate-700"
                                }`}
                              >
                                {speakingIndex === index ? (
                                  <VolumeX className="w-3.5 h-3.5" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleCopy(msg.text, index)}
                                title="Copy response"
                                className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition"
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick Follow-up Suggestion Chips */}
                      {isBot && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.suggestions.map((suggestion, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSend(suggestion)}
                              className="text-xs bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200/90 hover:border-red-300 px-3 py-1.5 rounded-full transition-all duration-150 shadow-2xs hover:shadow-sm"
                            >
                              💡 {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                    <span className="text-xs text-slate-400 ml-1.5 font-medium">Searching knowledge base...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Query Chips Bar */}
            <div className="bg-white border-t border-slate-100 px-4 py-2.5 overflow-x-auto whitespace-nowrap flex items-center gap-2 no-scrollbar">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">
                Popular:
              </span>
              {SUGGESTED_QUERIES.slice(0, 5).map((q, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 px-3 py-1 rounded-lg transition whitespace-nowrap font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Search any information (e.g. 'Can O- donate to B+?', 'Eligibility rules', 'Merge sort DSA')..."
                    className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition shadow-inner"
                  />
                  {inputQuery && (
                    <button
                      type="button"
                      onClick={() => setInputQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  title="Speak query"
                  className={`p-3.5 rounded-2xl transition-all shadow-sm ${
                    isVoiceActive
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-red-600/30 hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Search</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE COMPATIBILITY MATRIX */}
        {activeTab === "compatibility" && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8 space-y-8 animate-in fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Blood Group Compatibility Calculator</h3>
              <p className="text-sm text-slate-600">
                Select any donor blood type below to view exact red blood cell compatibility, universal donor/recipient statuses, and population share.
              </p>
            </div>

            {/* Blood Type Selector Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {Object.keys(BLOOD_COMPATIBILITY).map((type) => {
                const isSelected = selectedBloodType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    className={`w-14 h-14 rounded-2xl font-black text-lg transition-all duration-200 shadow-sm flex items-center justify-center ${
                      isSelected
                        ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-500/30 ring-4 ring-red-100"
                        : "bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Detail Card for selected type */}
            <div className="bg-gradient-to-br from-red-50/70 to-rose-50/40 rounded-2xl p-6 md:p-8 border border-red-100 shadow-inner">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-red-200/60 pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
                    <Droplet className="w-3.5 h-3.5 fill-red-600" />
                    Selected Type: {selectedBloodType}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">{selectedCompatibility.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{selectedCompatibility.description}</p>
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl border border-red-200 text-center shadow-xs flex-shrink-0">
                  <div className="text-xs text-slate-500 font-semibold">Population Frequency</div>
                  <div className="text-base font-bold text-red-600">{selectedCompatibility.frequency}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Can Donate To */}
                <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Can Donate Red Cells To:</h5>
                      <p className="text-xs text-slate-500">Recipients who can safely receive {selectedBloodType}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCompatibility.canDonateTo.map((target) => (
                      <span
                        key={target}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-extrabold shadow-2xs"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      ⬇
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Can Receive Red Cells From:</h5>
                      <p className="text-xs text-slate-500">Donors compatible with {selectedBloodType} patient</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCompatibility.canReceiveFrom.map((source) => (
                      <span
                        key={source}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-sm font-extrabold shadow-2xs"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button to Ask Chatbot */}
              <div className="mt-6 pt-4 border-t border-red-200/60 flex items-center justify-end">
                <button
                  onClick={() => {
                    setActiveTab("chat");
                    handleSend(`Can blood type ${selectedBloodType} donate to emergency patients?`);
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
                >
                  <Bot className="w-4 h-4" />
                  Ask AI more about {selectedBloodType} compatibility &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INFORMATION DIRECTORY / BROWSE */}
        {activeTab === "browse" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Knowledge Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredKnowledge.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                        {item.category}
                      </span>
                      {item.category === "dsa" && (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                          <Cpu className="w-3 h-3" /> DSA Concept
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.content.replace(/[*#`_>-]/g, " ")}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Instant AI Search Available</span>
                    <button
                      onClick={() => {
                        setActiveTab("chat");
                        handleSend(`Tell me all about: ${item.title}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      Ask AI this &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
