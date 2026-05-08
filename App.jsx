import React, { useState } from 'react';
import { 
  MessageCircle, 
  Search, 
  MoreVertical, 
  Facebook,
  Phone,
  Video,
  Mic,
  Paperclip,
  Heart,
  Send,
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  Languages,
  Star
} from 'lucide-react';

// Main Application Component
const App = () => {
  const [lang, setLang] = useState('ur'); // Toggle between 'en' and 'ur'
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Translations Object
  const translations = {
    ur: {
      appName: "ابی-راج میسنجر",
      status: "آن لائن",
      admin: "ابیہہ راجپوت - ایڈمن",
      search: "فالوور تلاش کریں...",
      all: "سبھی",
      favs: "فیورٹ",
      age: "عمر",
      loc: "علاقہ",
      years: "سال",
      placeholder: "اپنا پیغام یہاں ٹائپ کریں...",
      sync: "فیس بک سے ڈیٹا حاصل کریں",
      welcome: "ابی-راج میسنجر میں خوش آمدید",
      tagline: "فالوورز کے ساتھ رابطے کا جدید طریقہ",
      callStart: "کال شروع کی جا رہی ہے...",
      followers: "فیس بک فالوورز",
      newMsgs: "نئے پیغامات",
      follower: "فالوور",
      friend: "دوست"
    },
    en: {
      appName: "Abi-Raj Messenger",
      status: "Online",
      admin: "Abiha Rajput - Admin",
      search: "Search followers...",
      all: "All",
      favs: "Favorites",
      age: "Age",
      loc: "Location",
      years: "Years",
      placeholder: "Type your message here...",
      sync: "Sync with Facebook",
      welcome: "Welcome to Abi-Raj Messenger",
      tagline: "Modern way to connect with followers",
      callStart: "Starting call...",
      followers: "FB Followers",
      newMsgs: "New Messages",
      follower: "Follower",
      friend: "Friend"
    }
  };

  const t = translations[lang];

  // Dummy Contacts Data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      age: 24,
      location: lang === 'ur' ? "لاہور" : "Lahore",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      lastMessage: lang === 'ur' ? "السلام وعلیکم ابیہہ جی" : "Hello Abiha!",
      status: "online",
      isFavorite: true,
      category: t.follower
    },
    {
      id: 2,
      name: "Sara Khan",
      age: 22,
      location: lang === 'ur' ? "اسلام آباد" : "Islamabad",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      lastMessage: lang === 'ur' ? "آپ کی نئی پوسٹ زبردست ہے" : "Loved your latest post!",
      status: "offline",
      isFavorite: false,
      category: t.friend
    }
  ]);

  const toggleFavorite = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'favorites') return matchesSearch && c.isFavorite;
    return matchesSearch;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedContact) return;

    const newMessage = {
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));
    setMessage('');
  };

  return (
    <div className={`flex h-screen bg-slate-100 font-sans ${lang === 'ur' ? 'text-right' : 'text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      {/* Sidebar Section */}
      <div className="w-1/3 bg-white border-x border-gray-200 flex flex-col shadow-xl">
        {/* Sidebar Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-600 text-white shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-inner">
                <span className="font-black text-xl tracking-tighter">AR</span>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">{t.appName}</h1>
                <p className="text-[10px] text-emerald-100 opacity-80">{t.admin}</p>
              </div>
            </div>
            <button 
              onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}
              className="p-2 hover:bg-white/20 rounded-xl transition-all flex items-center gap-2 text-[10px] border border-white/20 font-bold"
            >
              <Languages size={14} /> {lang === 'ur' ? 'ENGLISH' : 'اردو'}
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-black/10 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-white text-emerald-800 shadow-lg' : 'text-white'}`}
            >
              {t.all}
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'favorites' ? 'bg-white text-emerald-800 shadow-lg' : 'text-white'}`}
            >
              {t.favs}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t.search}
              className={`w-full p-3 ${lang === 'ur' ? 'pr-11' : 'pl-11'} rounded-2xl border-none bg-gray-200/50 focus:ring-2 focus:ring-emerald-500 text-xs transition-all outline-none`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className={`absolute ${lang === 'ur' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={16} />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`flex items-center p-4 cursor-pointer hover:bg-emerald-50/50 transition-all border-b border-gray-50 group ${selectedContact?.id === contact.id ? 'bg-emerald-50 border-r-4 border-emerald-600' : ''}`}
            >
              <div className="relative">
                <img src={contact.image} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${contact.status === "online" ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>
              <div className="mx-4 flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">{contact.name}</h3>
                  <span className="text-[9px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md uppercase font-bold">{contact.category}</span>
                </div>
                <p className="text-[11px] text-gray-500 truncate w-32">{contact.lastMessage}</p>
              </div>
              <Heart 
                size={16} 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(contact.id); }}
                className={`cursor-pointer transition-all ${contact.isFavorite ? 'text-red-500 fill-current' : 'text-gray-300 group-hover:text-gray-400'}`} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F0F2F5] relative">
        {selectedContact ? (
          <>
            {/* Chat Header with Profile Details */}
            <div className="px-6 py-3 bg-white shadow-sm flex justify-between items-center z-10 border-b">
              <div className="flex items-center gap-4">
                <img src={selectedContact.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                <div>
                  <h2 className="font-bold text-gray-800 text-base">{selectedContact.name}</h2>
                  <div className="flex gap-3 text-[10px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full"><Calendar size={12} className="text-blue-500"/> {t.age}: {selectedContact.age} {t.years}</span>
                    <span className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full"><MapPin size={12} className="text-orange-500"/> {t.loc}: {selectedContact.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert(t.callStart)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-emerald-600 hover:bg-emerald-50 shadow-sm border border-gray-100 transition-all"><Phone size={18} /></button>
                <button onClick={() => alert(t.callStart)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-emerald-600 hover:bg-emerald-50 shadow-sm border border-gray-100 transition-all"><Video size={20} /></button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded-xl"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-blend-soft-light opacity-95">
               <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tr-none shadow-sm max-w-xs border-l-4 border-emerald-500">
                  <p className="text-gray-800 text-sm leading-relaxed">{selectedContact.lastMessage}</p>
                  <p className="text-[9px] text-gray-400 mt-2 font-mono">10:30 AM</p>
                </div>
              </div>

              {(chatHistory[selectedContact.id] || []).map((msg, idx) => (
                <div key={idx} className="flex justify-end animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-emerald-600 p-4 rounded-3xl rounded-tl-none shadow-md max-w-xs transform hover:scale-[1.02] transition-transform">
                    <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-[9px] text-emerald-100 mt-2 text-left font-mono opacity-80">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Section */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-4 mb-3 px-2 text-gray-400">
                 <button className="hover:text-emerald-600 transition-all flex items-center gap-1 text-[10px]"><Paperclip size={14}/> FILE</button>
                 <button className="hover:text-emerald-600 transition-all flex items-center gap-1 text-[10px]"><ImageIcon size={14}/> IMAGE</button>
                 <button className="hover:text-emerald-600 transition-all flex items-center gap-1 text-[10px]"><Mic size={14}/> AUDIO</button>
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input 
                  type="text" 
                  placeholder={t.placeholder}
                  className="flex-1 p-4 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm transition-all outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 shadow-lg active:scale-90 transition-all">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Landing Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-10 bg-white">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
                <MessageCircle size={64} className="text-emerald-600" />
              </div>
              <Star className="absolute -top-2 -right-2 text-yellow-400 fill-current animate-bounce" size={32} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">{t.welcome}</h2>
            <p className="text-sm italic text-gray-400 mb-10 text-center max-w-sm">"{t.tagline}"</p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
              <div className="bg-emerald-50 p-6 rounded-3xl text-center border border-emerald-100 shadow-sm">
                <p className="text-xs text-emerald-600 mb-1 font-bold">{t.followers}</p>
                <p className="text-2xl font-black text-emerald-800 tracking-tight">1,248</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl text-center border border-blue-100 shadow-sm">
                <p className="text-xs text-blue-600 mb-1 font-bold">{t.newMsgs}</p>
                <p className="text-2xl font-black text-blue-800 tracking-tight">12</p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-2xl flex items-center gap-3 font-black hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95">
              <Facebook size={22} /> {t.sync}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;