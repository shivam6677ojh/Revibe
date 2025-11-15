import React, { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m ReVibe Assistant. Ask me about sustainability, events, or carbon reduction!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⚠️ Missing API Key. Add VITE_OPENAI_API_KEY to your .env file.'
        }]);
        setLoading(false);
        return;
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ReVibe'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are ReVibe Assistant, an eco-friendly sustainability helper. Provide short & positive answers about reducing carbon footprint, eco-friendly events, community sustainability, recycling, festival planning, and climate awareness.'
            },
            ...messages.slice(-6),
            { role: 'user', content: userInput }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponse = data?.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      console.error('Chatbot Error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Oops! Something went wrong. Check your API key or try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-emerald-600 to-teal-600 text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center text-3xl cursor-pointer"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 flex flex-col z-50 transition-all">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">🌿 ReVibe Assistant</h3>
            <p className="text-xs opacity-90">Powered by AI</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border-2 border-slate-200 dark:border-slate-600 rounded-full bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer"
              >
                ➤
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Tip: Ask about events, carbon footprint, or sustainability!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
