import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Key, Trash2, User, Copy, Check, Shield, Volume2, 
  Search, ThumbsUp, ThumbsDown, Download, Layers
} from 'lucide-react';

export default function AIChatbot({ t, lang, apiKey, openApiKeyModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'ar'
        ? "أهلاً بك! أنا مساعدك الذكي للاستشارات والمفاهيم الاستثمارية. يسعدني الإجابة على استفساراتك العامة حول مجالات الاستثمار، توزيع المحافظ، وتحليل المخاطر."
        : "Welcome! I am your AI Investment Advisor. I am here to help answer your general queries regarding investment strategies, asset allocation, and risk management.",
      sources: [
        lang === 'ar' ? 'المصدر: مساعد الاستثمار العام' : 'Source: General Investment Assistant'
      ],
      timestamp: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // محاكاة كتابة النص بشكل تدريجي (Streaming Effect)
  const streamTextIntoMessage = async (fullText, sources = [], isLiveGpt = true, confidence = null, groundedReference = null) => {
    const msgId = Date.now() + 1;
    const timeStr = new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      {
        id: msgId,
        sender: 'bot',
        text: '',
        isLiveGpt,
        sources,
        confidence,
        groundedReference,
        timestamp: timeStr
      }
    ]);

    const words = fullText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      const updatedText = currentText;

      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: updatedText } : m));
      await new Promise(r => setTimeout(r, 20));
    }
  };

  // إرسال الرسالة إلى الباك إند
  const handleSendMessage = async (textToSend = inputMsg) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(
        lang === 'ar' ? 'ar-SA' : 'en-US',
        { hour: '2-digit', minute: '2-digit' }
      )
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMsg('');
    setIsTyping(true);

    try {
      // تجهيز سجل المحادثة القصير للنموذج
      const history = messages
        .filter(m => m.text)
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      // استدعاء السيرفر (Express Backend)
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل الاتصال بالسيرفر');
      }

      const sourcesList = data.sources && data.sources.length > 0
        ? data.sources.map(s => s.name)
        : [lang === 'ar' ? 'المعرفة الاستثمارية العامة' : 'General Investment Knowledge'];

      setIsTyping(false);
      await streamTextIntoMessage(
        data.answer,
        sourcesList,
        true,
        data.confidence || 70,
        null
      );

    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);

      await streamTextIntoMessage(
        lang === 'ar' 
          ? 'عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى التأكد من تشغيل الباك إند وحاول مرة أخرى.' 
          : 'Sorry, an error occurred while connecting to the server.',
        [lang === 'ar' ? 'خطأ في الاتصال' : 'Connection Error'],
        false,
        0,
        null
      );
    }
  };

  const handlePromptChip = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleFeedback = (id, type) => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[#*|_]/g, ''));
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const exportTranscript = () => {
    const transcriptText = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Investment_Chat_Transcript_${Date.now()}.txt`;
    link.click();
  };

  const filteredPrompts = activeCategory === 'all'
    ? t?.chatbot?.quickPromptsList || []
    : (t?.chatbot?.quickPromptsList || []).filter(p => p.cat === activeCategory);

  return (
    <section id="ai-chatbot" className="py-20 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-makkah-navy-800 to-makkah-navy-600 rounded-full border border-makkah-navy-700 shadow-md">
            <Bot className="w-4 h-4 text-cyan-400" />
            {t?.chatbot?.badge || 'المساعد الذكي'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-makkah-navy-800">
            {t?.chatbot?.title || 'مساعد الاستثمار الذكي'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t?.chatbot?.subtitle || 'إجابات وتحليلات شاملة للمفاهيم والاستراتيجيات الاستثمارية'}
          </p>
        </div>

        {/* Chat Window Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[700px]">
          
          {/* Header Bar */}
          <div className="bg-makkah-navy-800 text-white p-4 sm:px-6 flex items-center justify-between border-b border-makkah-navy-700">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-makkah-navy-800 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-cyan-300" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-makkah-navy-800" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                  {t?.chatbot?.title || 'مساعد الاستثمار الذكي'}
                </h3>
                <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                  <Search className="w-3 h-3 animate-pulse text-cyan-400" />
                  {lang === 'ar' ? 'متصل بالسيرفر (General RAG Active)' : 'Connected to Server'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openApiKeyModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg text-slate-200 border border-white/15 transition-all"
                title="Configure Key"
              >
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Active</span>
              </button>

              <button
                onClick={exportTranscript}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title={t?.chatbot?.exportChat || "تصدير المحادثة"}
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMessages([messages[0]])}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title={t?.chatbot?.clearChat || "مسح"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Categories & Chips */}
          {t?.chatbot?.categories && (
            <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
                {Object.entries(t.chatbot.categories).map(([catKey, catLabel]) => (
                  <button
                    key={catKey}
                    onClick={() => setActiveCategory(catKey)}
                    className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                      activeCategory === catKey
                        ? 'bg-makkah-navy-800 text-white shadow-sm'
                        : 'bg-white text-slate-600 border hover:bg-slate-100'
                    }`}
                  >
                    {catLabel}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {filteredPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptChip(prompt.text)}
                    className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-makkah-emerald-50 hover:border-makkah-emerald-300 hover:text-makkah-emerald-700 transition-all shrink-0 shadow-xs"
                  >
                    💡 {prompt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[90%] sm:max-w-[82%] ${
                  msg.sender === 'user' ? (lang === 'ar' ? 'mr-auto flex-row-reverse' : 'ml-auto flex-row-reverse') : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-makkah-emerald-600'
                    : 'bg-gradient-to-br from-makkah-navy-800 to-makkah-navy-700'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-cyan-300" />}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 space-y-3 text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-makkah-emerald-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}>
                  <div className="space-y-2 whitespace-pre-line font-normal">
                    {msg.text || (isTyping && msg.sender === 'bot' ? '...' : '')}
                  </div>

                  {/* Confidence Badge */}
                  {msg.sender === 'bot' && msg.text && msg.confidence !== null && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <Shield className="w-3 h-3" />
                        {lang === 'ar' ? `مستوى الثقة: ${msg.confidence}%` : `Confidence: ${msg.confidence}%`}
                      </span>
                    </div>
                  )}

                  {/* Sources Tags */}
                  {msg.sources && msg.sources.length > 0 && msg.text && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span className="font-bold text-makkah-navy-800">{t?.chatbot?.sourcesTitle || 'المصادر:'}</span>
                      {msg.sources.map((src, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-semibold border border-slate-200">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Bar */}
                  {msg.sender === 'bot' && msg.text && (
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[10px]">{msg.timestamp}</span>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 border-r pr-2 border-slate-200">
                          <button
                            onClick={() => handleFeedback(msg.id, 'up')}
                            className={`p-1 hover:text-emerald-600 ${feedbackState[msg.id] === 'up' ? 'text-emerald-600 font-bold' : ''}`}
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'down')}
                            className={`p-1 hover:text-rose-600 ${feedbackState[msg.id] === 'down' ? 'text-rose-600 font-bold' : ''}`}
                            title="Unhelpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:text-slate-600 p-1"
                          title="Listen Speech"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:text-slate-600 p-1 flex items-center gap-1"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-xl bg-makkah-navy-800 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4 text-cyan-300 animate-bounce" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs font-semibold text-slate-500 shadow-sm">
                  <Search className="w-3.5 h-3.5 animate-spin text-makkah-emerald-500" />
                  <span>{lang === 'ar' ? 'جاري جلب الإجابة من نموذج الذكاء الاصطناعي...' : 'Generating AI response...'}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={t?.chatbot?.placeholder || "اكتب استفسارك عن الاستثمار هنا..."}
                className="flex-1 p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-makkah-emerald-500 focus:ring-2 focus:ring-makkah-emerald-200 text-sm font-medium text-slate-800 transition-all"
              />

              <button
                type="submit"
                disabled={!inputMsg.trim() || isTyping}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-xl shadow-md transition-all ${
                  !inputMsg.trim() || isTyping
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-makkah-navy-800 to-makkah-navy-600 hover:from-makkah-emerald-500 hover:to-makkah-emerald-600 shadow-emerald-glow'
                }`}
              >
                <span>{t?.chatbot?.sendBtn || "إرسال"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
