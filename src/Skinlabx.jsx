import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Truck, Upload, Heart, Search, ChevronLeft, Download, Plus, Box,
  Crown, ShieldCheck, Image as ImageIcon, Menu, X, Trash2, LogIn, MessageSquare,
  Send, Ban, User, Lock, Save, Wand2, Sparkles, Zap, Palette, Eraser, Youtube,
  Facebook, Instagram, CheckCircle, Users, AlertTriangle, CreditCard,
  Calendar, HelpCircle, PlayCircle, Gamepad2, Layers
} from 'lucide-react';

// ---------------- CONFIGURACIÓN ----------------
const ADMIN_PASS = "admin123";
const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PREMIUM = 20;
const TUTORIAL_LINK = "https://youtube.com/watch?v=TU_VIDEO_AQUI";

// ---------------- REDES SOCIALES ----------------
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515..." />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIALS = [
  { name: 'YouTube', icon: <Youtube size={20} />, color: 'bg-red-600', url: 'https://youtube.com/c/TU_CANAL' },
  { name: 'TikTok', icon: <TikTokIcon />, color: 'bg-black border border-slate-700', url: 'https://tiktok.com/@TU_USUARIO' },
  { name: 'Instagram', icon: <Instagram size={20} />, color: 'bg-gradient-to-tr from-yellow-500 to-purple-600', url: 'https://instagram.com/TU_USUARIO' },
  { name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-blue-600', url: 'https://facebook.com/TU_PAGINA' },
  { name: 'Discord', icon: <DiscordIcon />, color: 'bg-[#5865F2]', url: 'https://discord.gg/TU_SERVIDOR' },
];

// ---------------- DATOS INICIALES ----------------
const INITIAL_GAMES = [
  { id: 'g1', name: 'Truck Simulator Big Rigs', img: 'https://images.unsplash.com/photo-1605218427306-633ba3036324?auto=format&fit=crop&q=80&w=800' },
  { id: 'g2', name: 'Truckers of Europe 3', img: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800' }
];

const INITIAL_MODELS = [
  { id: 'm1', gameId: 'g1', type: 'truck', name: 'Mack Anthem', image: '...' },
  { id: 'm2', gameId: 'g1', type: 'cargo', name: 'Remolque Frigorífico', image: '...' },
  { id: 'm3', gameId: 'g2', type: 'truck', name: 'Scania S730', image: '...' },
];

const INITIAL_SKINS = [
  { id: '1', title: 'DHL Official Fleet', modelId: 'm1', previewUrl: '...', textureUrl: '...', premium: false, allowEdit: true, source: 'official' },
];

const INITIAL_MESSAGES = [
  { id: '1', text: "¡Bienvenidos a la comunidad SkinLabX!", user: "Admin", role: 'admin', timestamp: Date.now() },
];

// ---------------- COMPONENTE EDITOR ----------------
const SkinEditor = ({ skin, onClose }) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ff0000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !skin) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = skin.textureUrl || skin.previewUrl || '';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }, [skin]);

  const handleDraw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (!clientX || !clientY) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineWidth = 5 * ((scaleX + scaleY) / 2);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-[80] flex flex-col">
      <div className="p-4 bg-slate-800 flex justify-between">
        <h3 className="text-white font-bold">Studio</h3>
        <button onClick={onClose}><X className="text-white" /></button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-slate-800/50 relative">
        <canvas
          ref={canvasRef}
          className="bg-white shadow-xl max-w-full max-h-full"
          onMouseDown={() => { setIsDrawing(true); canvasRef.current.getContext('2d').beginPath(); }}
          onMouseMove={handleDraw}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}

          onTouchStart={() => { setIsDrawing(true); canvasRef.current.getContext('2d').beginPath(); }}
          onTouchMove={handleDraw}
          onTouchEnd={() => setIsDrawing(false)}
        />
      </div>

      <div className="p-4 bg-slate-800 flex gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10" />
        <button className="bg-indigo-600 text-white p-2 rounded"><Sparkles /></button>
        <button className="flex-1 bg-green-600 text-white font-bold rounded">Guardar</button>
      </div>
    </div>
  );
};

// ---------------- CHAT ----------------
const CommunityChat = ({ user, isAdmin }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [msg, setMsg] = useState("");
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: msg,
      user: user?.displayName || "Invitado",
      role: isAdmin ? 'admin' : 'user'
    }]);
    setMsg("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900">
      <div className="p-4 bg-slate-800 border-b border-slate-700 text-white font-bold">Chat</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-2 ${m.role === 'admin' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">{m.user[0]}</div>
            <div className="bg-slate-800 p-2 rounded text-sm text-slate-200">
              <span className="text-[10px] text-slate-400">{m.user}</span>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="p-3 bg-slate-800 flex gap-2">
        <input value={msg} onChange={(e) => setMsg(e.target.value)} className="flex-1 bg-slate-900 text-white rounded-full px-4" />
        <button className="bg-indigo-600 text-white p-2 rounded-full"><Send size={16} /></button>
      </form>
    </div>
  );
};

// ---------------- VISTAS FANTASMA PARA EVITAR ERRORES ----------------
const PremiumView = () => <div className="p-10 text-white">Premium View</div>;
const LoginView = () => <div className="p-10 text-white">Login</div>;
const GameMenu = () => <div className="p-10 text-white">Game Menu</div>;
const CommunityHub = () => <div className="p-10 text-white">Comunidad</div>;
const UploadPanel = () => <div className="p-10 text-white">Panel Upload</div>;
const AdminLoginView = () => <div className="p-10 text-white">Admin Login</div>;

// ---------------- APP PRINCIPAL ----------------
export default function App() {
  const [view, setView] = useState('home');
  const [history, setHistory] = useState(['home']);

  const [games, setGames] = useState(INITIAL_GAMES);
  const [skins, setSkins] = useState(INITIAL_SKINS);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(120);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (v) => { setHistory(prev => [...prev, v]); setView(v); };
  const goBack = () => {
    setHistory(prev => {
      if (prev.length > 1) {
        const h = [...prev];
        h.pop();
        setView(h[h.length - 1]);
        return h;
      }
      setView('home');
      return ['home'];
    });
  };

  const HomeView = () => (
    <div className="pb-24 p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black italic text-white">SKINLAB<span className="text-orange-500">X</span></h1>
        <div className="flex gap-2">
          {!user ? (
            <button onClick={() => navigateTo('login')} className="bg-blue-600 text-xs px-3 py-1 rounded text-white">Login</button>
          ) : (
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white">{user.displayName[0]}</div>
          )}

          <button onClick={() => navigateTo('admin-login')}><Lock size={16} className="text-slate-500" /></button>
        </div>
      </div>

      <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto flex gap-2 items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        {parseInt(onlineUsers)} Online
      </div>

      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white">Studio AI ⚡</h2>
        <button onClick={() => navigateTo('premium')} className="bg-white text-purple-900 px-4 py-2 rounded-full text-xs font-bold mt-2">
          Abrir
        </button>
      </div>

      <div onClick={() => navigateTo('community-hub')} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700 cursor-pointer">
        <div className="flex items-center gap-3">
          <Users className="text-green-500" />
          <div>
            <h3 className="text-white font-bold text-sm">Comunidad</h3>
            <p className="text-xs text-slate-400">Sube tus skins</p>
          </div>
        </div>
        <ChevronLeft className="rotate-180 text-slate-500" />
      </div>

      <div className="grid gap-4">
        {games.map(g => (
          <div
            key={g.id}
            onClick={() => navigateTo('game-menu')}
            className="h-32 bg-slate-800 rounded-xl relative overflow-hidden cursor-pointer group"
          >
            <img src={g.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />

            <p className="absolute bottom-4 left-4 font-bold text-white text-lg">
              {g.name}
            </p>

            {isAdmin && (
              <button
                onClick={(e) => { e.stopPropagation(); setGames(prev => prev.filter(x => x.id !== g.id)); }}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {view === 'home' && <HomeView />}
      {view === 'premium' && <PremiumView />}
      {view === 'login' && <LoginView />}
      {view === 'game-menu' && <GameMenu />}
      {view === 'community-hub' && <CommunityHub />}
      {view === 'upload' && <UploadPanel />}
      {view === 'admin-login' && <AdminLoginView />}
    </div>
  );
}
