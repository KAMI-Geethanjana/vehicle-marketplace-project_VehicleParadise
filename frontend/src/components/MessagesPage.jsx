import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, Video, MoreVertical, Search, Shield, Info } from 'lucide-react';
import { CHATS } from '../data/vehicles';

export default function MessagesPage() {
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState('c1');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { sender: 'me', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
      }
      return chat;
    }));
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-outfit font-black text-4xl text-slate-900 dark:text-white tracking-tight">
          Messages <span className="text-amber-500">.</span>
        </h1>
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search conversations..." className="bg-transparent border-none focus:outline-none text-sm text-slate-700 dark:text-slate-200 w-48" />
        </div>
      </div>

      <div className="bg-white/40 dark:bg-dark-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[75vh] min-h-[600px] relative">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>

        {/* Left Inbox Sidebar */}
        <aside className="lg:col-span-4 border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col bg-white/60 dark:bg-dark-950/60 z-10 relative">
          
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center">
            <h2 className="font-outfit font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" /> Inbox
            </h2>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">
              {chats.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 relative group ${
                  chat.id === activeChatId
                    ? 'bg-slate-900 dark:bg-slate-800 shadow-xl shadow-slate-900/20 transform scale-[1.02]'
                    : 'hover:bg-white/80 dark:hover:bg-dark-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                {chat.id === activeChatId && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-amber-500 rounded-r-full"></div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-outfit font-bold text-base truncate pr-2 ${chat.id === activeChatId ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400'}`}>
                    {chat.dealer}
                  </h3>
                  <span className={`text-[10px] font-medium whitespace-nowrap ${chat.id === activeChatId ? 'text-slate-400' : 'text-slate-400'}`}>
                    12:30 PM
                  </span>
                </div>
                <p className={`text-xs line-clamp-1 leading-relaxed ${chat.id === activeChatId ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {chat.snippet}
                </p>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Chat Thread Area */}
        <main className="lg:col-span-8 flex flex-col bg-slate-50/50 dark:bg-dark-900/50 z-10 relative">
          
          {/* Chat Header */}
          <div className="px-8 py-5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between bg-white/40 dark:bg-dark-950/40 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white font-outfit font-black text-xl shadow-lg">
                  {activeChat.dealer.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-dark-950 rounded-full"></div>
              </div>
              <div>
                <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                  {activeChat.dealer}
                  {activeChat.verified && (
                    <Shield className="w-4 h-4 text-emerald-500" fill="currentColor" />
                  )}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {activeChat.verified ? 'Verified Dealer • Typically replies in 5 mins' : 'Private Seller'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2.5 bg-white dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2.5 bg-white dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 custom-scrollbar">
            <div className="flex justify-center mb-8">
              <span className="px-4 py-1.5 bg-slate-200/50 dark:bg-dark-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-full backdrop-blur-md">
                Today, 10:42 AM
              </span>
            </div>
            
            {activeChat.messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed shadow-md ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-br-sm shadow-amber-500/20'
                      : 'bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-sm shadow-slate-200/10'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 font-medium px-2">
                  {msg.time || '10:42 AM'} {msg.sender === 'me' && '• Read'}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Composer */}
          <div className="p-6 bg-white/40 dark:bg-dark-950/40 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50">
            <form onSubmit={handleSendMessage} className="flex items-end gap-3 max-w-4xl mx-auto relative">
              <div className="flex-1 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500 transition-all flex items-center p-2">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-12 h-12 flex-shrink-0 bg-slate-900 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </div>

        </main>
      </div>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.3);
        }
      `}</style>
    </div>
  );
}
