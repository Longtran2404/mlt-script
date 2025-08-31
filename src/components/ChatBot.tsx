import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: "text" | "typing" | "error" | "system";
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastActive: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>("default");
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "Chat mới",
      createdAt: new Date(),
      lastActive: new Date(),
      messages: [
        {
          id: "welcome",
          text: "Xin chào! Tôi là MLT AI Assistant Premium 🤖✨\n\nTôi có thể giúp bạn:\n• 📝 Tạo storyboard chuyên nghiệp\n• 🎨 Thiết kế kịch bản sáng tạo\n• 📊 Phân tích xu hướng content\n• 🎯 Tối ưu chiến lược marketing\n\nBạn muốn bắt đầu với công việc nào?",
          isBot: true,
          timestamp: new Date(),
          type: "system",
        },
      ],
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickReplies] = useState([
    "Tạo storyboard",
    "Phân tích content",
    "Gợi ý kịch bản",
    "Xu hướng marketing",
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSession =
    sessions.find((s) => s.id === currentSessionId) || sessions[0];
  const messages = useMemo(
    () => currentSession?.messages || [],
    [currentSession]
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${sessions.length + 1}`,
      createdAt: new Date(),
      lastActive: new Date(),
      messages: [
        {
          id: "welcome-" + Date.now(),
          text: "Chào mừng đến với session mới! Tôi có thể giúp gì cho bạn? 🎉",
          isBot: true,
          timestamp: new Date(),
          type: "system",
        },
      ],
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setShowSessions(false);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length <= 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remainingSessions = sessions.filter((s) => s.id !== sessionId);
      setCurrentSessionId(remainingSessions[0]?.id || "default");
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim() || isLoading) return;

    setShowQuickReplies(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date(),
      type: "text",
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: [...session.messages, userMessage],
              lastActive: new Date(),
            }
          : session
      )
    );

    if (!messageText) setInputText("");
    setIsLoading(true);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Cảm ơn bạn đã nhắn tin! Tôi sẽ trả lời sớm nhất có thể. 🤖",
        isBot: true,
        timestamp: new Date(),
        type: "text",
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? {
                ...session,
                messages: [...session.messages, botMessage],
                lastActive: new Date(),
              }
            : session
        )
      );

      setIsTyping(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-br from-red-600 via-red-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-6 z-40 w-96 h-96 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-br from-red-600 via-red-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">MLT AI Assistant Premium</h3>
                  <p className="text-xs text-white/90">Online • Hỗ trợ 24/7</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSessions(!showSessions)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Session selector */}
            <AnimatePresence>
              {showSessions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 border-b border-gray-200 overflow-hidden"
                >
                  <div className="p-3 max-h-32 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-xs text-gray-700">
                        Chat History
                      </h4>
                      <button
                        onClick={createNewSession}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        + New Chat
                      </button>
                    </div>
                    <div className="space-y-1">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className={`p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                            session.id === currentSessionId
                              ? "bg-red-600 text-white"
                              : "bg-white hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setCurrentSessionId(session.id);
                            setShowSessions(false);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">{session.title}</span>
                            {sessions.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSession(session.id);
                                }}
                                className="ml-2 opacity-60 hover:opacity-100 text-sm"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Container */}
            <AnimatePresence mode="wait">
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 overflow-y-auto p-3 space-y-3"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${
                        message.isBot ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] ${
                          message.isBot ? "flex gap-2" : ""
                        }`}
                      >
                        {message.isBot && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                            AI
                          </div>
                        )}

                        <div className="flex-1">
                          <div
                            className={`p-3 rounded-xl text-sm shadow-lg ${
                              message.isBot
                                ? message.type === "system"
                                  ? "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 border border-blue-200/50"
                                  : "bg-white text-gray-800 border border-gray-200/50"
                                : "bg-gradient-to-br from-red-600 to-red-500 text-white"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">
                              {message.text}
                            </div>
                            <div
                              className={`text-xs mt-2 ${
                                message.isBot
                                  ? "text-gray-500"
                                  : "text-white/70"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-start"
                      >
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                            AI
                          </div>
                          <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200/50">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-gradient-to-r from-red-600 to-pink-500 rounded-full"
                                  animate={{
                                    y: [0, -8, 0],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Reply Suggestions */}
                  <AnimatePresence>
                    {showQuickReplies && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-wrap gap-2 justify-center"
                      >
                        {quickReplies.map((reply, index) => (
                          <motion.button
                            key={reply}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleQuickReply(reply)}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Section */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-3 bg-white/80 backdrop-blur-sm border-t border-gray-200/50"
                >
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhắn tin với AI Assistant..."
                        disabled={isLoading}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed pr-10"
                      />
                    </div>

                    <motion.button
                      onClick={handleSendClick}
                      disabled={!inputText.trim() || isLoading}
                      className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 text-white rounded-xl hover:from-red-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      )}
                    </motion.button>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Powered by MLT AI</span>
                    <span>Webhook connected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
