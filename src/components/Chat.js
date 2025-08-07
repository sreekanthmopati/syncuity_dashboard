import { useState, useRef, useEffect, useCallback , useLayoutEffect} from 'react';
import { motion } from "framer-motion";

const API_BASE_URL = 'http://localhost:5000';
const NLQ_API_ENDPOINT = 'https://recruiter.app.n8n.cloud/webhook/natural-language-query';

const FloatingChatButton = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    x: window.innerWidth - 120,
    y: window.innerHeight - 80
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedAnswers, setExpandedAnswers] = useState({});

  // Refs
  const didUserSubmitNewQuestionRef = useRef(false);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const initialOpenRef = useRef(true);
  const messageRefs = useRef({});

  // Initialize session
  useEffect(() => {
    const createSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chat/session`, { method: 'POST' });
        const data = await res.json();
        setSessionId(data.sessionId);
      } catch (err) {
        console.error('Session creation failed', err);
      }
    };
    createSession();
  }, []);

  // Mouse handlers for draggable button
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setDragOffset({
      x: e.clientX - buttonPosition.x,
      y: e.clientY - buttonPosition.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    const buttonWidth = buttonRef.current?.offsetWidth || 0;
    const buttonHeight = buttonRef.current?.offsetHeight || 0;

    setButtonPosition({
      x: Math.max(0, Math.min(newX, window.innerWidth - buttonWidth)),
      y: Math.max(0, Math.min(newY, window.innerHeight - buttonHeight))
    });

    setHasDragged(true);
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleClick = () => {
    if (!hasDragged) {
      setIsOpen(true);
      loadPreviousMessages();
    }
  };

  // Message loading and scrolling
  const loadPreviousMessages = useCallback(async () => {
    if (!sessionId || isLoadingPrevious || !hasMore) return;
  
    setIsLoadingPrevious(true);
    scrollPositionRef.current = 
      (chatBoxRef.current?.scrollHeight || 0) - (chatBoxRef.current?.scrollTop || 0);
  
    try {
      const res = await fetch(`${API_BASE_URL}/chat/previous-messages?limit=10&offset=${offset}`);
      const data = await res.json();
  
      const orderedMessages = data.reverse();
      setMessages(prev => [...orderedMessages, ...prev]);
      setOffset(prev => prev + 10);
  
      if (data.length < 10) setHasMore(false);
    } catch (err) {
      console.error('Failed to load previous messages', err);
    } finally {
      setIsLoadingPrevious(false);
    }
  }, [sessionId, isLoadingPrevious, hasMore, offset, setMessages, setOffset, setHasMore]);
  

  useEffect(() => {
    if (!isLoadingPrevious && chatBoxRef.current && scrollPositionRef.current > 0) {
      const newScrollHeight = chatBoxRef.current.scrollHeight;
      chatBoxRef.current.scrollTop = newScrollHeight - scrollPositionRef.current;
      scrollPositionRef.current = 0;
    }
  }, [isLoadingPrevious]);

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior
      });
      
      if (behavior === 'smooth') {
        const timer = setTimeout(() => {
          setShowScrollButton(false);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setShowScrollButton(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && initialOpenRef.current) {
      initialOpenRef.current = false;
      scrollToBottom('auto');
    }

    if (!isOpen) {
      initialOpenRef.current = true;
    }
  }, [isOpen, scrollToBottom]);

  const handleScroll = useCallback(() => {
    if (!chatBoxRef.current) return;
  
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
  
    setShowScrollButton(scrollHeight - (scrollTop + clientHeight) > 100);
  
    Object.keys(expandedAnswers).forEach(key => {
      if (expandedAnswers[key]) {
        const messageElement = messageRefs.current[key];
        if (messageElement) {
          const rect = messageElement.getBoundingClientRect();
          const chatBoxRect = chatBoxRef.current.getBoundingClientRect();
  
          if (rect.bottom < chatBoxRect.top || rect.top > chatBoxRect.bottom) {
            setExpandedAnswers(prev => ({ ...prev, [key]: false }));
          }
        }
      }
    });
  
    if (scrollTop < 100 && hasMore && !isLoadingPrevious) {
      loadPreviousMessages();
    }
  }, [expandedAnswers, hasMore, isLoadingPrevious, loadPreviousMessages]);
  
  const markdownToHtml = (markdown) => {
    let html = markdown;
  
    // Bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
    // Italics (*text*)
    html = html.replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, "<em>$1</em>");
  
    // Bullet points
    html = html.replace(/^\* (.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
  
    // Line breaks
    html = html.replace(/\n/g, "<br />");
  
    return html;
  };
  
  
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
  
    if (didUserSubmitNewQuestionRef.current) {
      scrollToBottom('smooth');
      didUserSubmitNewQuestionRef.current = false;
    }
  }, [messages, isOpen, scrollToBottom]);

  // Toggle answer expansion
  const toggleExpand = (index) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Chat submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !sessionId) return;
    
    setIsLoading(true);
    const userQuestion = question;
   
    
    try {
      const nlqResponse = await fetch(NLQ_API_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ question: userQuestion })
      });

      if (!nlqResponse.ok) throw new Error(`NLQ API error! status: ${nlqResponse.status}`);

      const nlqData = await nlqResponse.json();
      if (!nlqData || !nlqData.response) throw new Error('Invalid NLQ API response structure');

      const formattedAnswer = nlqData.response.answer && 
        (Array.isArray(nlqData.response.answer) || typeof nlqData.response.answer === 'object')
        ? JSON.stringify(nlqData.response.answer, null, 2)
        : nlqData.response.answer || "No data available";

      const dbResponse = await fetch(`${API_BASE_URL}/chat/session/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: nlqData.response.question || userQuestion,
          answer: formattedAnswer,
          query: nlqData.response.sql || 'No SQL generated',
          createdAt: new Date().toISOString()
        })
      });

      if (!dbResponse.ok) throw new Error(`Database save failed! status: ${dbResponse.status}`);
      didUserSubmitNewQuestionRef.current = true;

      setMessages(prev => [...prev, {
        question: nlqData.response.question || userQuestion,
        sql: nlqData.response.sql || 'No SQL generated',
        answer: formattedAnswer,
        createdAt: new Date().toISOString()
      }]);
      setQuestion('');
      scrollToBottom();
      
    } catch (error) {
      setMessages(prev => [...prev, {
        question: userQuestion,
        sql: 'ERROR',
        answer: `Failed to get response. ${error.message || 'Please try again.'}`,
        createdAt: new Date().toISOString()
      }]);
      scrollToBottom();
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom('auto');
    }
  }, [isOpen, messages.length, scrollToBottom]);

  // Modal positioning
  const calculateModalPosition = () => {
    const modalWidth = 320;
    const modalHeight = 464;
    
    const left = Math.min(
      buttonPosition.x, 
      window.innerWidth - modalWidth - 10
    );

   
      
    
    const top = buttonPosition.y + 60 + modalHeight > window.innerHeight
      ? buttonPosition.y - modalHeight - 10
      : buttonPosition.y + 60;
    
    return { 
      left: `${Math.max(10, left)}px`, 
      top: `${Math.max(10, top)}px` 
    };
  };

  return (
    <>
      {/* Floating Button */}
      {/* {!isOpen && (
        <div
          ref={buttonRef}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          style={{
            position: 'fixed',
            left: buttonPosition.x,
            top: buttonPosition.y,
            zIndex: 50,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <button className="group flex items-center justify-center gap-2 w-auto px-4 pr-5 h-14 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 flex space-x-0.5">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="block h-1 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
            <span className="text-white font-medium text-sm tracking-wide">Ask AI</span>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </div>
          </button>
        </div>
      )} */}

{!isOpen && (
    <motion.div
  ref={buttonRef}
  onMouseDown={handleMouseDown}
  onClick={handleClick}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  style={{
    position: "fixed",
    left: buttonPosition.x,
    top: buttonPosition.y,
    zIndex: 50,
    cursor: isDragging ? "grabbing" : "grab",
  }}
>
  <button
    className="group flex items-center justify-center gap-3 w-auto px-5 pr-6 h-16 rounded-full transition-all duration-500 hover:scale-[1.08] relative overflow-hidden backdrop-blur-2xl"
    style={{
      background: "radial-gradient(ellipse at center, #1a1a3e 0%, #0f0f23 70%, #000 100%)",
      backgroundSize: "300% 300%",
      boxShadow: `
        0 12px 32px rgba(102, 126, 234, 0.4),
        0 4px 16px rgba(15, 15, 35, 0.6),
        inset 0 1px 0 rgba(255,255,255,0.1),
        inset 0 -1px 0 rgba(0,0,0,0.2),
        0 0 40px rgba(102, 126, 234, 0.2)
      `,
      border: "2px solid #4a5568",
      whiteSpace: "nowrap",
    }}
  >
    {/* Cosmic background animation - twinkling stars */}
    <div className="absolute inset-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>

    {/* Cosmic nebula background */}
    <motion.div
      className="absolute inset-0 opacity-30 pointer-events-none rounded-full"
      style={{
        background: `
          radial-gradient(circle at 30% 40%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
        `
      }}
      animate={{
        rotate: [0, 360]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    />

    {/* Enhanced Ask AI Text with Cosmic Typography */}
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-gray-200 font-semibold text-base tracking-wide drop-shadow-lg">
        Ask
      </span>
      
      <motion.div className="relative">
        <motion.span
          className="font-black text-2xl block relative"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2, #ff6b9d, #feca57)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 20px rgba(255, 107, 157, 0.5)",
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.15,
            filter: 'drop-shadow(0 0 25px rgba(255, 107, 157, 0.8))',
            transition: { duration: 0.3 }
          }}
        >
          AI
        </motion.span>
        
        {/* Cosmic energy rings around AI text */}
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-400 opacity-0 group-hover:opacity-60"
          whileHover={{
            scale: [1, 1.8],
            opacity: [0.6, 0]
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-pink-400 opacity-0 group-hover:opacity-60"
          whileHover={{
            scale: [1, 1.8],
            opacity: [0.6, 0]
          }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />

        {/* Enhanced Cosmic Particle Effects */}
        <motion.span
          className="absolute -top-2 -right-2 text-yellow-300 text-sm"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1.4, 0.6],
            rotate: [0, 180, 360],
            y: [0, -3, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0.5
          }}
        >
          ✨
        </motion.span>
        
        <motion.span
          className="absolute -bottom-2 -left-2 text-cyan-300 text-sm"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1.4, 0.6],
            rotate: [360, 180, 0],
            x: [0, -2, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1.2
          }}
        >
          ⚡
        </motion.span>

        <motion.span
          className="absolute top-1/2 -right-4 text-purple-300 text-xs"
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.4, 1.2, 0.4],
            rotate: [0, 360],
            x: [0, 4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2
          }}
        >
          🌟
        </motion.span>
      </motion.div>
    </motion.div>

    {/* Enhanced Cosmic Pulse Effect */}
    <motion.div 
      className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)"
      }}
      whileHover={{ 
        opacity: [0, 0.5, 0],
        scale: [0.95, 1.1, 0.95]
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* Cosmic Shimmer Effect */}
    <motion.div
      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
      initial={false}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ["-100%", "200%"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)",
          transform: "skew(-20deg)"
        }}
      />
    </motion.div>

    {/* Enhanced Cosmic Hover Overlay */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)"
        }}
      />
    </div>

    {/* Floating Cosmic Particles Around Button */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-70 pointer-events-none"
        style={{
          left: `${20 + i * 25}%`,
          top: `${30 + i * 15}%`,
          background: i % 2 === 0 ? '#9333ea' : '#ec4899'
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, Math.sin(i) * 15, 0],
          opacity: [0, 0.7, 0],
          scale: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 4 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.7,
          ease: "easeInOut"
        }}
      />
    ))}
  </button>
</motion.div>

)}

      {/* Chat Modal */}
      {isOpen && (
  <div
    className="fixed z-50 w-80 max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300"
    style={calculateModalPosition()}
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
      <h3 className="font-semibold text-base">💬 Data Assistant</h3>
      <button
        onClick={() => setIsOpen(false)}
        className="hover:text-indigo-200 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Messages */}
    <div
      ref={chatBoxRef}
      onScroll={handleScroll}
      className="h-64 p-4 overflow-y-auto bg-gray-50 space-y-4 custom-scrollbar"
    >
      {isLoadingPrevious && (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {messages.map((msg, idx) => {
        const showDate = idx === 0 || formatDate(messages[idx - 1].createdAt) !== formatDate(msg.createdAt);
        const isLongAnswer = msg.answer.split('\n').length > 3;
        const isExpanded = expandedAnswers[idx] || false;

        return (
          <div key={idx} ref={(el) => (messageRefs.current[idx] = el)}>
            {showDate && (
              <div className="flex justify-center my-2">
                <div className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {formatDate(msg.createdAt)}
                </div>
              </div>
            )}

            {/* Question */}
            <div className="flex justify-end mb-1">
              <div className="max-w-[85%] bg-blue-600 text-white rounded-2xl px-4 py-2 shadow-md rounded-br-none">
                <p className="text-sm">{msg.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div className="flex justify-start mb-5">
                    <div className="max-w-[85%] bg-white border border-gray-100 rounded-2xl px-4 py-3 rounded-bl-none shadow-sm">
                      <div className="flex items-center mb-1 space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium text-gray-500">AI Assistant</p>
                      </div>
                      {/* <pre className={`whitespace-pre-wrap text-sm font-sans text-gray-700 ${!isExpanded && isLongAnswer ? 'line-clamp-3' : ''}`}>
                        {msg.answer}
                      </pre> */}
                      <div
  className={`whitespace-pre-wrap text-sm font-sans text-gray-700 ${
    !isExpanded && isLongAnswer ? 'line-clamp-3' : ''
  }`}
  dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.answer) }}
/>
                      {isLongAnswer && (
                        <button 
                          onClick={() => toggleExpand(idx)}
                          className="text-blue-500 text-xs mt-1 hover:text-blue-600 focus:outline-none font-medium flex items-center"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show less</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Read more</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-800 rounded-2xl px-3 py-2 max-w-[85%] shadow-sm">
            <div className="flex space-x-1 items-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>

    {/* Scroll to bottom button */}
    {showScrollButton && (
            <button
              onClick={() => scrollToBottom('smooth')}
              className="absolute right-4 bottom-20 bg-white border border-gray-200 text-blue-600 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Scroll to bottom"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )}

    {/* Footer input */}
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your data..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400 transition-all min-w-[60px] shadow-sm text-sm"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          ) : (
            'Ask'
          )}
        </button>
      </div>
    </form>
  </div>
)}

    </>
  );
};

export default FloatingChatButton;