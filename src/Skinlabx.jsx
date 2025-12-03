import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Truck, Upload, Heart, Search, ChevronLeft, Download, Plus, Box, Crown,
  ShieldCheck, Image as ImageIcon, Menu, X, Trash2, LogIn, MessageSquare, Send,
  Ban, User, Lock, Save, Wand2, Sparkles, Zap, Palette, Eraser, Youtube, Facebook,
  Instagram, Users, CreditCard, PlayCircle
} from 'lucide-react';

// --- CONFIGURACIÓN ---
const ADMIN_PASS = "admin123";
const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PREMIUM = 20;
const TUTORIAL_LINK = "https://youtube.com/watch?v=TU_VIDEO_AQUI";

// --- ICONOS SOCIALES ---
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.46 13.46 0 0 0-.585 1.205 17.576 17.576 0 0 0-5.534 0 13.565 13.565 0 0 0-.59-1.205.071.071 0 0 0-.078-.037 19.74 19.74 0 0 0-4.885 1.515.068.068 0 0 0-.033.025C1.656 8.765.49 13.065.94 17.33a.07.07 0 0 0 .028.055 20.015 20.015 0 0 0 6.07 3.03.076.076 0 0 0 .083-.026 14.15 14.15 0 0 0 1.238-1.996.073.073 0 0 0-.04-.102 10.985 10.985 0 0 1-1.722-.818.069.069 0 0 1-.006-.113 7.828 7.828 0 0 0 .323-.239.068.068 0 0 1 .072-.008 14.37 14.37 0 0 0 11.08 0 .068.068 0 0 1 .072.008c.106.08.214.16.323.24a.069.069 0 0 1-.005.112 11.055 11.055 0 0 1-1.723.818.073.073 0 0 0-.04.102 14.15 14.15 0 0 0 1.238 1.996.073.073 0 0 0 .083.025 20.015 20.015 0 0 0 6.07-3.03.071.071 0 0 0 .028-.055c.618-4.825-.86-9.143-2.617-12.935a.07.07 0 0 0-.033-.025zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.418 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.417-2.157 2.417zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.417-2.157 2.417z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const SOCIALS = [
  { name: 'YouTube', icon: <Youtube size={20} />, color: 'bg-red-600', url: 'https://youtube.com' },
  { name: 'TikTok', icon: <TikTokIcon />, color: 'bg-black border border-slate-700', url: 'https://tiktok.com' },
  { name: 'Instagram', icon: <Instagram size={20} />, color: 'bg-gradient-to-tr from-yellow-500 to-purple-600', url: 'https://instagram.com' },
  { name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-blue-600', url: 'https://facebook.com' },
  { name: 'Discord', icon: <DiscordIcon />, color: 'bg-[#5865F2]', url: 'https://discord.com' },
];

// --- DATOS ---
const INITIAL_GAMES = [
  { id: 'g1', name: 'Truck Simulator Big Rigs', img: 'https://images.unsplash.com/photo-1605218427306-633ba3036324?auto=format&fit=crop&q=80&w=800' },
  { id: 'g2', name: 'Truckers of Europe 3', img: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800' },
  { id: 'g3', name: 'Global Truck Simulator Online', img: 'https://images.unsplash.com/photo-1506306460320-b3eb2b03fb4d?auto=format&fit=crop&q=80&w=800' },
];
const INITIAL_MODELS = [
  { id: 'm1', gameId: 'g1', type: 'truck', name: 'Mack Anthem', image: 'https://images.unsplash.com/photo-1563608779836-7e3f6071853f?auto=format&fit=crop&q=80&w=600' },
  { id: 'm2', gameId: 'g1', type: 'cargo', name: 'Remolque Frigorífico', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' },
  { id: 'm3', gameId: 'g2', type: 'truck', name: 'Scania S730', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600' },
];
const INITIAL_SKINS = [
  { id: 1, title: 'DHL Official Fleet', modelId: 'm1', previewUrl: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800', textureUrl: 'https://via.placeholder.com/1024x1024.png', premium: false, allowEdit: true, source: 'official' },
  { id: 2, title: 'Black & Gold VIP', modelId: 'm1', previewUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800', textureUrl: 'https://via.placeholder.com/1024.png', premium: true, allowEdit: false, source: 'official' },
];
const INITIAL_MESSAGES = [
  { id: 1, text: "¡Bienvenidos a SkinLabX!", user: "Admin", role: 'admin' },
];

// --- COMPONENTES ---

const SkinEditor = ({ skin, onClose, isPremium }) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ff0000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [dailyUsage, setDailyUsage] = useState(0);
  const LIMIT = isPremium ? DAILY_LIMIT_PREMIUM : DAILY_LIMIT_FREE;

  useEffect(() => {
    if (!skin) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = skin.textureUrl || "https://via.placeholder.com/1024";
    img.onload = () => {
      // dimensionar canvas manteniendo limitaciones
      const maxSize = 1024;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [skin]);

  const handlePointerDown = (clientX, clientY) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
    if (clientX == null || clientY == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = Math.max(1, 5 * (canvas.width / rect.width));
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-slate-900 flex flex-col animate-in fade-in">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-white font-bold flex gap-2"><Palette className="text-purple-500" /> Skin Studio</h3>
        <button onClick={onClose}><X className="text-slate-400" /></button>
      </div>

      <div className="flex-1 bg-slate-800/50 flex items-center justify-center p-4 relative">
        <canvas
          ref={canvasRef}
          className="shadow-2xl border border-slate-600 bg-white max-w-full max-h-full"
          onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
          onMouseMove={handleDraw}
          onMouseUp={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={handleDraw}
          onTouchEnd={handlePointerUp}
        />
        {showAI && (
          <div className="absolute top-4 left-4 right-4 bg-slate-900 p-4 rounded-xl border border-purple-500">
            <div className="flex justify-between mb-2">
              <h4 className="text-white font-bold">AI Gen</h4>
              <button onClick={() => setShowAI(false)}><X /></button>
            </div>
            <p className="text-slate-400 text-xs mb-2">Usos: {dailyUsage}/{LIMIT}</p>
            <button
              onClick={() => {
                setDailyUsage(prev => prev + 1);
                alert("Generado!");
                setShowAI(false);
              }}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              Generar
            </button>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-4">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded border-none" />
        <button onClick={() => setShowAI(true)} className="p-2 bg-indigo-600 rounded text-white"><Sparkles /></button>
        <button className="flex-1 bg-green-600 text-white py-2 rounded font-bold">Guardar</button>
      </div>
    </div>
  );
};

const CommunityChat = ({ user, isAdmin }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [msg, setMsg] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, user: user?.displayName || "Invitado", role: isAdmin ? 'admin' : 'user' }]);
    setMsg("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900">
      <div className="p-4 bg-slate-800 border-b border-slate-700"><h2 className="text-white font-bold">Chat Global</h2></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'admin' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">{m.user?.[0] ?? "?"}</div>
            <div className="bg-slate-800 p-2 rounded text-sm text-slate-200">
              <span className="text-xs text-slate-400 block mb-1">{m.user}</span>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="p-3 bg-slate-800 flex gap-2">
        <input value={msg} onChange={e => setMsg(e.target.value)} className="flex-1 bg-slate-900 text-white rounded-full px-4" placeholder="Mensaje..." disabled={!user} />
        <button className="bg-indigo-600 text-white p-2 rounded-full"><Send size={18} /></button>
      </form>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [games, setGames] = useState(INITIAL_GAMES);
  const [models, setModels] = useState(INITIAL_MODELS);
  const [skins, setSkins] = useState(INITIAL_SKINS);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(120);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState("");
  const [newSkinTitle, setNewSkinTitle] = useState("");
  const [newSkinModelId, setNewSkinModelId] = useState("");
  const [newSkinPreview, setNewSkinPreview] = useState("");
  const [newSkinTexture, setNewSkinTexture] = useState("");
  const [newSkinPremium, setNewSkinPremium] = useState(false);
  const [userSkinTitle, setUserSkinTitle] = useState("");
  const [userSkinGame, setUserSkinGame] = useState("");
  const [userSkinModel, setUserSkinModel] = useState("");
  const [userSkinPreview, setUserSkinPreview] = useState("");
  const [userSkinTexture, setUserSkinTexture] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => Math.max(1, prev + Math.floor(Math.random() * 5) - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (newView) => { setHistory(prev => [...prev, newView]); setView(newView); };
  const goBack = () => {
    setHistory(prev => {
      if (prev.length <= 1) { setView('home'); return ['home']; }
      const copy = [...prev];
      copy.pop();
      setView(copy[copy.length - 1]);
      return copy;
    });
  };
  const handleLogin = () => { setUser({ displayName: "Usuario Demo", uid: "123" }); navigateTo('home'); };
  const handleAdminLogin = (e) => { e.preventDefault(); if (adminPassInput === ADMIN_PASS) { setIsAdmin(true); navigateTo('upload'); } else alert("Contraseña incorrecta"); };
  const handleUploadSkin = () => {
    if (!newSkinTitle || !newSkinPreview || !newSkinTexture) return alert("Completa título, preview y textura");
    setSkins(prev => [...prev, { id: Date.now(), title: newSkinTitle, modelId: newSkinModelId || 'm1', previewUrl: newSkinPreview, textureUrl: newSkinTexture, premium: newSkinPremium, allowEdit: true, source: 'official' }]);
    alert("Skin publicada!");
    // limpiar
    setNewSkinTitle(""); setNewSkinPreview(""); setNewSkinTexture(""); setNewSkinPremium(false);
  };
  const handleUserUpload = () => {
    if (!isAuthor) return alert("No eres autor verificado");
    if (!userSkinTitle || !userSkinModel || !userSkinPreview || !userSkinTexture) return alert("Completa los campos");
    setSkins(prev => [...prev, { id: Date.now(), title: userSkinTitle, modelId: userSkinModel, previewUrl: userSkinPreview, textureUrl: userSkinTexture, premium: false, allowEdit: true, source: 'community', author: user?.displayName }]);
    alert("Subida!");
    navigateTo('community-hub');
  };

  const handleDeleteSkin = (skinId) => {
    if (!window.confirm("¿Eliminar skin?")) return;
    setSkins(prev => prev.filter(s => s.id !== skinId));
  };

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-slate-200 select-none pb-safe">
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex justify-end">
          <div className="w-72 bg-slate-900 h-full p-6 border-l border-slate-800 overflow-y-auto">
            <div className="flex justify-between mb-8"><h2 className="text-xl font-bold text-white">MENÚ</h2><button onClick={() => setIsMenuOpen(false)}><X /></button></div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">ACCESOS</h3>
                <button onClick={() => { navigateTo('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-white">Inicio</button>
                <button onClick={() => { navigateTo('community-hub'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-white">Comunidad</button>
                <button onClick={() => { navigateTo('chat'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-white">Chat</button>
              </div>

              <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">JUEGOS</h3>
                {games.map(g => <button key={g.id} onClick={() => { setSelectedGame(g); navigateTo('game-menu'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-white">{g.name}</button>)}
              </div>

              <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">REDES</h3>
                <div className="flex gap-2 flex-wrap">
                  {SOCIALS.map(s => (
                    <button key={s.name} onClick={() => window.open(s.url)} className={`${s.color} p-2 rounded text-white`}>{s.icon}</button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                {isAdmin ? <button onClick={() => { navigateTo('upload'); setIsMenuOpen(false); }} className="text-red-400 font-bold">Panel Admin</button> : <button onClick={() => { navigateTo('admin-login'); setIsMenuOpen(false); }} className="text-slate-500 text-xs">Admin Access</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditorOpen && selectedSkin && <SkinEditor skin={selectedSkin} onClose={() => setIsEditorOpen(false)} isPremium={isPremium} />}

      {view === 'home' && (
        <div className="pb-24 p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black italic text-white">SKINLAB<span className="text-orange-500">X</span></h1>
            <div className="flex gap-2">
              {!user ? <button onClick={() => navigateTo('login')} className="bg-blue-600 text-xs px-3 py-1 rounded text-white">Login</button> : <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white">{user.displayName[0]}</div>}
              <button onClick={() => navigateTo('admin-login')}><Lock size={16} className="text-slate-500" /></button>
            </div>
          </div>

          <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>{onlineUsers} Online</div>

          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-2xl relative overflow-hidden">
            <h2 className="text-xl font-bold text-white relative z-10">Studio AI ⚡</h2>
            <button onClick={() => navigateTo('premium')} className="bg-white text-purple-900 px-4 py-2 rounded-full text-xs font-bold mt-2 relative z-10">{isPremium ? "Abrir" : "Desbloquear"}</button>
            <Sparkles className="absolute -right-4 -bottom-4 text-white/10" size={100} />
          </div>

          <div onClick={() => navigateTo('community-hub')} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700 cursor-pointer">
            <div className="flex items-center gap-3"><Users className="text-green-500" /><div><h3 className="text-white font-bold text-sm">Comunidad</h3><p className="text-xs text-slate-400">Sube tus skins</p></div></div>
            <ChevronLeft className="rotate-180 text-slate-500" />
          </div>

          <div className="grid gap-4">
            {games.map(g => (
              <div key={g.id} onClick={() => { setSelectedGame(g); navigateTo('game-menu'); }} className="h-32 bg-slate-800 rounded-xl relative overflow-hidden cursor-pointer">
                <img src={g.img} className="w-full h-full object-cover opacity-60" alt={g.name} />
                <p className="absolute bottom-4 left-4 font-bold text-white text-lg shadow-black drop-shadow-md">{g.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'game-menu' && selectedGame && (
        <div className="p-6 h-screen flex flex-col items-center justify-center text-center space-y-6">
          <button onClick={goBack} className="absolute top-6 left-6"><ChevronLeft /></button>
          <h2 className="text-2xl font-bold text-white">{selectedGame.name}</h2>
          <button onClick={() => { setSelectedType('truck'); navigateTo('model-list'); }} className="bg-slate-800 p-8 rounded-xl w-full border border-slate-700">
            <Truck size={40} className="mx-auto text-orange-500 mb-2" /><span className="text-white font-bold">Camiones</span>
          </button>
          <button onClick={() => { setSelectedType('cargo'); navigateTo('model-list'); }} className="bg-slate-800 p-8 rounded-xl w-full border border-slate-700">
            <Box size={40} className="mx-auto text-blue-500 mb-2" /><span className="text-white font-bold">Cargas</span>
          </button>
        </div>
      )}

      {view === 'model-list' && selectedGame && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4"><button onClick={goBack}><ChevronLeft /></button><h2 className="text-white font-bold">Modelos</h2></div>
          <div className="grid grid-cols-2 gap-4">
            {models.filter(m => m.gameId === selectedGame.id && m.type === selectedType).map(m => (
              <div key={m.id} onClick={() => { setSelectedModel(m); navigateTo('model-detail'); }} className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer">
                <img src={m.image} className="h-28 w-full object-cover" alt={m.name} />
                <p className="p-2 text-xs font-bold text-white">{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'model-detail' && selectedModel && (
        <div className="p-4">
          <button onClick={goBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full z-10"><ChevronLeft className="text-white" /></button>
          <img src={selectedModel.image} className="w-full h-40 object-cover rounded-xl mb-6" alt={selectedModel.name} />
          <div className="grid grid-cols-2 gap-4">
            {skins.filter(s => s.modelId === selectedModel.id && s.source === 'official').map(s => (
              <div key={s.id} onClick={() => { setSelectedSkin(s); navigateTo('skin-detail'); }} className="bg-slate-800 rounded-xl overflow-hidden relative cursor-pointer">
                <img src={s.previewUrl} className="h-28 w-full object-cover" alt={s.title} />
                {s.premium && <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[10px] px-2 font-bold">VIP</div>}
                <p className="p-2 text-xs font-bold text-white">{s.title}</p>
                {isAdmin && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteSkin(s.id); }}
                    className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 text-[10px] rounded"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'skin-detail' && selectedSkin && (
        <div className="p-4">
          <button onClick={goBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full z-10"><ChevronLeft className="text-white" /></button>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl">
              <img src={selectedSkin.previewUrl} className="w-full h-64 object-cover rounded" alt={selectedSkin.title} />
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setIsEditorOpen(true); }} className="flex-1 bg-indigo-600 py-2 rounded text-white">Editar</button>
                <button onClick={() => alert('Descarga simulada')} className="bg-green-600 px-4 py-2 rounded text-white">Descargar</button>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl">
              <h3 className="text-white font-bold">{selectedSkin.title}</h3>
              <p className="text-xs text-slate-400 mb-2">Fuente: {selectedSkin.source}</p>
              <p className="text-sm mb-4">Permite edición: {selectedSkin.allowEdit ? 'Sí' : 'No'}</p>
              {isAdmin && <button onClick={() => handleDeleteSkin(selectedSkin.id)} className="bg-red-600 text-white px-3 py-2 rounded">Eliminar Skin</button>}
            </div>
          </div>
        </div>
      )}

      {view === 'community-hub' && (
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Comunidad</h2>
            <button onClick={() => navigateTo('upload')} className="bg-indigo-600 text-white px-3 py-1 rounded">Subir Skin</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {skins.filter(s => s.source === 'community' || s.source === 'official').map(s => (
              <div key={s.id} className="bg-slate-800 rounded-xl overflow-hidden">
                <img src={s.previewUrl} className="w-full h-36 object-cover" alt={s.title} />
                <div className="p-2">
                  <p className="text-white font-bold text-sm">{s.title}</p>
                  <p className="text-xs text-slate-400">{s.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'chat' && <CommunityChat user={user} isAdmin={isAdmin} />}

      {view === 'upload' && isAdmin && (
        <div className="p-4">
          <h2 className="text-white font-bold mb-4">Subir nueva Skin (Admin)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input value={newSkinTitle} onChange={e => setNewSkinTitle(e.target.value)} placeholder="Título" className="p-2 rounded bg-slate-800" />
            <select value={newSkinModelId} onChange={e => setNewSkinModelId(e.target.value)} className="p-2 rounded bg-slate-800">
              <option value="">Selecciona modelo</option>
              {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <input value={newSkinPreview} onChange={e => setNewSkinPreview(e.target.value)} placeholder="URL preview" className="p-2 rounded bg-slate-800" />
            <input value={newSkinTexture} onChange={e => setNewSkinTexture(e.target.value)} placeholder="URL textura" className="p-2 rounded bg-slate-800" />
            <label className="flex items-center gap-2"><input type="checkbox" checked={newSkinPremium} onChange={e => setNewSkinPremium(e.target.checked)} /> Premium</label>
            <div />
            <button onClick={handleUploadSkin} className="bg-green-600 text-white px-4 py-2 rounded">Publicar</button>
          </div>
        </div>
      )}

      {view === 'admin-login' && (
        <div className="p-4">
          <h2 className="text-white font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleAdminLogin} className="grid gap-2">
            <input type="password" value={adminPassInput} onChange={e => setAdminPassInput(e.target.value)} placeholder="Contraseña admin" className="p-2 rounded bg-slate-800" />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Entrar</button>
          </form>
        </div>
      )}

      {/* Footer / Bottom nav */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 flex justify-center md:justify-end">
        <div className="bg-slate-900 p-3 rounded-xl flex gap-2 items-center border border-slate-800">
          <button onClick={() => navigateTo('home')} className="p-2"><Home /></button>
          <button onClick={() => navigateTo('community-hub')} className="p-2"><Users /></button>
          <button onClick={() => navigateTo('chat')} className="p-2"><MessageSquare /></button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2"><Menu /></button>
        </div>
      </div>
    </div>
  );
}
