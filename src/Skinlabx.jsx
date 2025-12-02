import React, { useState, useEffect, useRef } from 'react';
import { Home, Truck, Upload, Heart, Search, ChevronLeft, Download, Plus, Box, Crown, ShieldCheck, Image as ImageIcon, Menu, X, Trash2, LogIn, MessageSquare, Send, Ban, User, Lock, Save, Wand2, Sparkles, Zap, Palette, Eraser, Youtube, Facebook, Instagram, CheckCircle, Users, AlertTriangle, CreditCard, Calendar, HelpCircle, PlayCircle, Gamepad2, Layers } from 'lucide-react';

// --- CONFIGURACIÓN ---
const ADMIN_PASS = "admin123"; 
const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PREMIUM = 20;
const TUTORIAL_LINK = "https://youtube.com/watch?v=TU_VIDEO_AQUI"; 

// --- REDES SOCIALES ---
const DiscordIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.46 13.46 0 0 0-.585 1.205 17.576 17.576 0 0 0-5.534 0 13.565 13.565 0 0 0-.59-1.205.071.071 0 0 0-.078-.037 19.74 19.74 0 0 0-4.885 1.515.068.068 0 0 0-.033.025C1.656 8.765.49 13.065.94 17.33a.07.07 0 0 0 .028.055 20.015 20.015 0 0 0 6.07 3.03.076.076 0 0 0 .083-.026 14.15 14.15 0 0 0 1.238-1.996.073.073 0 0 0-.04-.102 10.985 10.985 0 0 1-1.722-.818.069.069 0 0 1-.006-.113 7.828 7.828 0 0 0 .323-.239.068.068 0 0 1 .072-.008 14.37 14.37 0 0 0 11.08 0 .068.068 0 0 1 .072.008c.106.08.214.16.323.24a.069.069 0 0 1-.005.112 11.055 11.055 0 0 1-1.723.818.073.073 0 0 0-.04.102 14.15 14.15 0 0 0 1.238 1.996.073.073 0 0 0 .083.025 20.015 20.015 0 0 0 6.07-3.03.071.071 0 0 0 .028-.055c.618-4.825-.86-9.143-2.617-12.935a.07.07 0 0 0-.033-.025zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.418 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.417-2.157 2.417zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.417-2.157 2.417z"/></svg>;
const TikTokIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

const SOCIALS = [
  { name: 'YouTube', icon: <Youtube size={20} />, color: 'bg-red-600', url: 'https://youtube.com/c/TU_CANAL' }, 
  { name: 'TikTok', icon: <TikTokIcon />, color: 'bg-black border border-slate-700', url: 'https://tiktok.com/@TU_USUARIO' },
  { name: 'Instagram', icon: <Instagram size={20} />, color: 'bg-gradient-to-tr from-yellow-500 to-purple-600', url: 'https://instagram.com/TU_USUARIO' }, 
  { name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-blue-600', url: 'https://facebook.com/TU_PAGINA' }, 
  { name: 'Discord', icon: <DiscordIcon />, color: 'bg-[#5865F2]', url: 'https://discord.gg/TU_SERVIDOR' }, 
];

// --- DATOS INICIALES ---
const INITIAL_GAMES = [
  { id: 'g1', name: 'Truck Simulator Big Rigs', img: 'https://images.unsplash.com/photo-1605218427306-633ba3036324?auto=format&fit=crop&q=80&w=800' },
  { id: 'g2', name: 'Truckers of Europe 3', img: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800' },
];
const INITIAL_MODELS = [
  { id: 'm1', gameId: 'g1', type: 'truck', name: 'Mack Anthem', image: 'https://images.unsplash.com/photo-1563608779836-7e3f6071853f?auto=format&fit=crop&q=80&w=600' },
  { id: 'm2', gameId: 'g1', type: 'cargo', name: 'Remolque Frigorífico', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' },
  { id: 'm3', gameId: 'g2', type: 'truck', name: 'Scania S730', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600' },
];
const INITIAL_SKINS = [
  { id: '1', title: 'DHL Official Fleet', modelId: 'm1', previewUrl: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800', textureUrl: 'https://via.placeholder.com/1024x1024.png', premium: false, allowEdit: true, source: 'official' },
];
const INITIAL_MESSAGES = [
  { id: '1', text: "¡Bienvenidos a la comunidad SkinLabX!", user: "Admin", role: 'admin', timestamp: Date.now() },
];

// --- COMPONENTE EDITOR AI ---
const SkinEditor = ({ skin, onClose, isPremium }) => {
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
      // set canvas pixel size to image size
      canvas.width = img.width;
      canvas.height = img.height;
      // fit displayed size (css) handled by container
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.onerror = () => {
      // en caso de fallo, limpiar canvas
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [skin]);

  const handleDraw = (e) => {
    if(!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
    const clientY = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY);
    if (clientX == null || clientY == null) return;
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
    <div className="fixed inset-0 z-[80] bg-slate-900 flex flex-col animate-in fade-in">
       <div className="p-4 bg-slate-800 flex justify-between"><h3 className="text-white font-bold">Studio</h3><button onClick={onClose}><X className="text-white"/></button></div>
       <div className="flex-1 bg-slate-800/50 flex items-center justify-center p-4 relative">
          <canvas 
            ref={canvasRef}
            className="bg-white shadow-2xl max-w-full max-h-full"
            onMouseDown={(e)=>{setIsDrawing(true); const canvas = canvasRef.current; if (canvas) { const ctx=canvas.getContext('2d'); ctx.beginPath(); }}}
            onMouseMove={handleDraw}
            onMouseUp={()=>setIsDrawing(false)}
            onMouseLeave={()=>setIsDrawing(false)}
            onTouchStart={(e)=>{setIsDrawing(true); const canvas = canvasRef.current; if (canvas) { const ctx=canvas.getContext('2d'); ctx.beginPath(); } }}
            onTouchMove={handleDraw}
            onTouchEnd={()=>setIsDrawing(false)}
          />
          {showAI && <div className="absolute top-4 left-4 right-4 bg-slate-900 p-4 border border-purple-500 rounded-xl"><h4 className="text-white mb-2">AI Gen</h4><button onClick={()=>setShowAI(false)} className="bg-purple-600 text-white w-full py-2 rounded">Generar (Simulado)</button></div>}
       </div>
       <div className="p-4 bg-slate-800 flex gap-4">
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded border-none"/>
          <button onClick={()=>setShowAI(true)} className="bg-indigo-600 p-2 rounded text-white"><Sparkles/></button>
          <button className="flex-1 bg-green-600 text-white font-bold rounded">Guardar</button>
       </div>
    </div>
  );
};

// --- CHAT ---
const CommunityChat = ({ user, isAdmin }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [msg, setMsg] = useState("");
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);
  const send = (e) => {
    e.preventDefault(); if(!msg.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), text: msg, user: user?.displayName || "Invitado", role: isAdmin ? 'admin' : 'user' }]);
    setMsg("");
  };
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900">
        <div className="p-4 bg-slate-800 border-b border-slate-700"><h2 className="text-white font-bold">Chat</h2></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
                <div key={m.id} className={`flex gap-2 ${m.role === 'admin' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">{(m.user && m.user[0]) || '?'}</div>
                    <div className="bg-slate-800 p-2 rounded text-sm text-slate-200">
                        <span className="text-[10px] text-slate-400 block">{m.user}</span>
                        {m.text}
                    </div>
                </div>
            ))}
            <div ref={endRef}/>
        </div>
        <form onSubmit={send} className="p-3 bg-slate-800 flex gap-2"><input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 bg-slate-900 text-white rounded-full px-4" placeholder="..."/><button className="bg-indigo-600 text-white p-2 rounded-full"><Send size={16}/></button></form>
    </div>
  );
};

// --- APP PRINCIPAL ---
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
  const [adminTab, setAdminTab] = useState('skin'); // skin, model, game
  const [adminPassInput, setAdminPassInput] = useState("");

  // ADMIN STATE
  const [newSkinTitle, setNewSkinTitle] = useState("");
  const [newSkinModelId, setNewSkinModelId] = useState("");
  const [newSkinPreview, setNewSkinPreview] = useState("");
  const [newSkinTexture, setNewSkinTexture] = useState("");
  const [newSkinPremium, setNewSkinPremium] = useState(false);
  
  const [newGameName, setNewGameName] = useState("");
  const [newGameImg, setNewGameImg] = useState("");
  
  const [newModelName, setNewModelName] = useState("");
  const [newModelImg, setNewModelImg] = useState("");
  const [newModelGameId, setNewModelGameId] = useState("");
  const [newModelType, setNewModelType] = useState("truck");

  // COMMUNITY UPLOAD
  const [userSkinTitle, setUserSkinTitle] = useState("");
  const [userSkinGame, setUserSkinGame] = useState("");
  const [userSkinModel, setUserSkinModel] = useState("");
  const [userSkinPreview, setUserSkinPreview] = useState("");
  const [userSkinTexture, setUserSkinTexture] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        const hour = new Date().getHours();
        let target = 300;
        if(hour < 6) target = 100;
        if(hour > 18) target = 800;
        setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2 + (target - prev)*0.1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (v) => { setHistory(prev => [...prev, v]); setView(v); };
  const goBack = () => { setHistory(prev => { if(prev.length>1) { const h=[...prev]; h.pop(); setView(h[h.length-1]); return h; } setView('home'); return ['home']; }); };
  
  // ACTIONS
  const handleAdminLogin = () => { if(adminPassInput === ADMIN_PASS) { setIsAdmin(true); navigateTo('upload'); } else alert("Contraseña incorrecta"); };

  // Simple mock Google login to avoid undefined handle
  const handleLogin = () => {
    // Simula login (reemplaza con tu OAuth si lo deseas)
    const mockUser = { displayName: 'Usuario' };
    setUser(mockUser);
    navigateTo('home');
  };
  
  const addSkin = () => {
      const id = String(Date.now());
      setSkins(prev => [...prev, { id, title: newSkinTitle, modelId: String(newSkinModelId), previewUrl: newSkinPreview, textureUrl: newSkinTexture, premium: newSkinPremium, source: 'official', allowEdit: true }]);
      alert("Skin Agregada");
  };
  const addGame = () => {
      const id = String(Date.now());
      setGames(prev => [...prev, { id, name: newGameName, img: newGameImg }]);
      alert("Juego Agregado");
  };
  const addModel = () => {
      const id = String(Date.now());
      setModels(prev => [...prev, { id, name: newModelName, gameId: String(newModelGameId), type: newModelType, image: newModelImg }]);
      alert("Modelo Agregado");
  };
  
  const userUpload = () => {
      if(!isAuthor) { alert("Marca que eres autor para subir."); return; }
      const id = String(Date.now());
      setSkins(prev => [...prev, { id, title: userSkinTitle, modelId: String(userSkinModel), previewUrl: userSkinPreview, textureUrl: userSkinTexture, premium: false, source: 'community', author: user?.displayName || 'Invitado', allowEdit: true }]);
      alert("Subido a la comunidad"); navigateTo('community-hub');
  };

  const handleDelete = (id, type) => {
      if(!window.confirm("¿Eliminar?")) return;
      if(type==='game') setGames(prev => prev.filter(g=>String(g.id)!==String(id)));
      if(type==='skin') setSkins(prev => prev.filter(s=>String(s.id)!==String(id)));
  };

  // --- VISTAS ---

  const SideMenu = () => (
    <div className="fixed inset-0 z-[100] bg-black/90 flex justify-end">
        <div className="w-72 bg-slate-900 h-full p-6 border-l border-slate-800 overflow-y-auto space-y-8">
            <div className="flex justify-between"><h2 className="text-xl font-bold text-white">MENÚ</h2><button onClick={()=>setIsMenuOpen(false)}><X/></button></div>
            <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">NAVEGACIÓN</h3>
                <button onClick={()=>{navigateTo('home'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Inicio</button>
                <button onClick={()=>{navigateTo('community-hub'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Comunidad</button>
                <button onClick={()=>{navigateTo('chat'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Chat</button>
            </div>
            <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">JUEGOS</h3>
                {games.map(g=><button key={g.id} onClick={()=>{setSelectedGame(g); navigateTo('game-menu'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white text-sm">{g.name}</button>)}
            </div>
            <div>
                <h3 className="text-xs text-slate-500 font-bold mb-2">REDES</h3>
                <div className="flex gap-2 flex-wrap">{SOCIALS.map(s=><button key={s.name} onClick={()=>window.open(s.url, '_blank')} className={`${s.color} p-2 rounded text-white`}>{s.icon}</button>)}</div>
            </div>
            <div>
                {isAdmin ? <button onClick={()=>{navigateTo('upload'); setIsMenuOpen(false);}} className="text-red-400 font-bold w-full text-left">Panel Admin</button> : <button onClick={()=>{navigateTo('admin-login'); setIsMenuOpen(false);}} className="text-slate-500 text-xs w-full text-left">Admin Login</button>}
            </div>
        </div>
    </div>
  );

  const HomeView = () => (
    <div className="pb-24 p-4 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black italic text-white">SKINLAB<span className="text-orange-500">X</span></h1>
            <div className="flex gap-2">
                {!user ? <button onClick={()=>navigateTo('login')} className="bg-blue-600 text-xs px-3 py-1 rounded text-white">Login</button> : <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white">{user.displayName[0]}</div>}
                <button onClick={()=>navigateTo('admin-login')}><Lock size={16} className="text-slate-500"/></button>
            </div>
        </div>
        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#00ff00]"></div>{parseInt(onlineUsers)} Online</div>
        
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-2xl relative overflow-hidden">
            <h2 className="text-xl font-bold text-white relative z-10">Studio AI ⚡</h2>
            <button onClick={()=>navigateTo('premium')} className="bg-white text-purple-900 px-4 py-2 rounded-full text-xs font-bold mt-2 relative z-10">{isPremium ? "Abrir" : "Desbloquear"}</button>
            <Sparkles className="absolute -right-4 -bottom-4 text-white/10" size={100}/>
        </div>

        <div onClick={()=>navigateTo('community-hub')} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700 cursor-pointer">
            <div className="flex items-center gap-3"><Users className="text-green-500"/><div><h3 className="text-white font-bold text-sm">Comunidad</h3><p className="text-xs text-slate-400">Sube tus skins</p></div></div>
            <ChevronLeft className="rotate-180 text-slate-500"/>
        </div>

        <div className="grid gap-4">
            {games.map(g=>(
                <div key={g.id} onClick={()=>{setSelectedGame(g); navigateTo('game-menu');}} className="h-32 bg-slate-800 rounded-xl relative overflow-hidden cursor-pointer group">
                    <img src={g.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"/>
                    <p className="absolute bottom-4 left-4 font-bold text-white text-lg shadow-black drop-shadow-md">{g.name}</p>
                    {isAdmin && <button onClick={(e)=>{e.stopPropagation(); handleDelete(g.id, 'game');}} className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white"><Trash2 size={14}/></button>}
                </div>
            ))}
        </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="p-6 pb-24">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><ShieldCheck className="text-red-500"/> Admin Zone</h2>
        
        <div className="flex gap-2 mb-4 overflow-x-auto">
            <button onClick={()=>setAdminTab('skin')} className={`px-4 py-2 rounded font-bold text-xs ${adminTab==='skin'?'bg-red-600 text-white':'bg-slate-800 text-slate-400'}`}>Skin</button>
            <button onClick={()=>setAdminTab('model')} className={`px-4 py-2 rounded font-bold text-xs ${adminTab==='model'?'bg-red-600 text-white':'bg-slate-800 text-slate-400'}`}>Modelo</button>
            <button onClick={()=>setAdminTab('game')} className={`px-4 py-2 rounded font-bold text-xs ${adminTab==='game'?'bg-red-600 text-white':'bg-slate-800 text-slate-400'}`}>Juego</button>
        </div>

        {adminTab === 'skin' && (
            <div className="bg-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-white font-bold">Nueva Skin</h3>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="Título" value={newSkinTitle} onChange={e=>setNewSkinTitle(e.target.value)}/>
                <select className="w-full bg-slate-900 p-3 rounded text-white" onChange={e=>setNewSkinModelId(e.target.value)} value={newSkinModelId}><option value="">Modelo...</option>{models.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="URL Foto" value={newSkinPreview} onChange={e=>setNewSkinPreview(e.target.value)}/>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="URL Textura" value={newSkinTexture} onChange={e=>setNewSkinTexture(e.target.value)}/>
                <label className="flex gap-2 text-white"><input type="checkbox" checked={newSkinPremium} onChange={e=>setNewSkinPremium(e.target.checked)}/> Premium</label>
                <button onClick={addSkin} className="w-full bg-green-600 text-white py-3 rounded font-bold">Publicar</button>
            </div>
        )}

        {adminTab === 'game' && (
            <div className="bg-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-white font-bold">Nuevo Juego</h3>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="Nombre Juego" value={newGameName} onChange={e=>setNewGameName(e.target.value)}/>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="URL Portada" value={newGameImg} onChange={e=>setNewGameImg(e.target.value)}/>
                <button onClick={addGame} className="w-full bg-blue-600 text-white py-3 rounded font-bold">Crear Juego</button>
            </div>
        )}

        {adminTab === 'model' && (
            <div className="bg-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-white font-bold">Nuevo Modelo</h3>
                <select className="w-full bg-slate-900 p-3 rounded text-white" onChange={e=>setNewModelGameId(e.target.value)} value={newModelGameId}><option value="">Juego...</option>{games.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select>
                <select className="w-full bg-slate-900 p-3 rounded text-white" onChange={e=>setNewModelType(e.target.value)} value={newModelType}><option value="truck">Camión</option><option value="cargo">Carga</option></select>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="Nombre Modelo" value={newModelName} onChange={e=>setNewModelName(e.target.value)}/>
                <input className="w-full bg-slate-900 p-3 rounded text-white" placeholder="URL Foto" value={newModelImg} onChange={e=>setNewModelImg(e.target.value)}/>
                <button onClick={addModel} className="w-full bg-indigo-600 text-white py-3 rounded font-bold">Crear Modelo</button>
            </div>
        )}
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-slate-200 select-none pb-safe">
      {isMenuOpen && <SideMenu />}
      {isEditorOpen && selectedSkin && <SkinEditor skin={selectedSkin} onClose={()=>setIsEditorOpen(false)} isPremium={isPremium}/>}

      {view === 'home' && <HomeView />}
      {view === 'upload' && <AdminPanel />}
      {view === 'chat' && <CommunityChat user={user} isAdmin={isAdmin} />}

      {view === 'game-menu' && (
        <div className="p-6 h-screen flex flex-col justify-center text-center space-y-6">
            <button onClick={goBack} className="absolute top-6 left-6 text-white"><ChevronLeft/></button>
            <h2 className="text-2xl font-bold text-white">{selectedGame?.name || 'Juego'}</h2>
            <button onClick={()=>{setSelectedType('truck'); navigateTo('model-list');}} className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full"><Truck size={40} className="mx-auto text-orange-500 mb-2"/><span className="text-white font-bold">Camiones</span></button>
            <button onClick={()=>{setSelectedType('cargo'); navigateTo('model-list');}} className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full"><Box size={40} className="mx-auto text-blue-500 mb-2"/><span className="text-white font-bold">Cargas</span></button>
        </div>
      )}

      {view === 'model-list' && (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4"><button onClick={goBack}><ChevronLeft/></button><h2 className="text-white font-bold">{selectedType === 'truck' ? 'Camiones' : 'Cargas'}</h2></div>
            <div className="grid grid-cols-2 gap-4">{models.filter(m=>String(m.gameId)===String(selectedGame?.id) && m.type===selectedType).map(m=>(<div key={m.id} onClick={()=>{setSelectedModel(m); navigateTo('model-detail');}} className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer"><img src={m.image} className="h-28 w-full object-cover"/><p className="p-2 text-xs font-bold text-white">{m.name}</p></div>))}</div>
        </div>
      )}

      {view === 'model-detail' && (
        <div className="p-4">
            <button onClick={goBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full z-10"><ChevronLeft/></button>
            <img src={selectedModel?.image} className="w-full h-40 object-cover rounded-xl mb-6"/>
            <div className="grid grid-cols-2 gap-4">{skins.filter(s=>String(s.modelId)===String(selectedModel?.id) && s.source==='official').map(s=>(<div key={s.id} onClick={()=>{setSelectedSkin(s); navigateTo('skin-detail');}} className="bg-slate-800 rounded-xl overflow-hidden relative cursor-pointer"><img src={s.previewUrl} className="h-28 w-full object-cover"/>{s.premium && <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[10px] px-2 font-bold">VIP</div>}<p className="p-2 text-xs font-bold text-white">{s.title}</p>{isAdmin && <button onClick={(e)=>{e.stopPropagation(); handleDelete(s.id, 'skin');}} className="absolute bottom-2 right-2 text-red-500"><Trash2 size={14}/></button>}</div>))}</div>
        </div>
      )}

      {view === 'community-hub' && (
        <div className="p-4 pb-24">
            <div className="flex gap-2 mb-6 items-center"><button onClick={goBack}><ChevronLeft/></button><h2 className="text-xl font-bold text-white">Comunidad</h2></div>
            <button onClick={()=>window.open(TUTORIAL_LINK, '_blank')} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2 mb-4"><PlayCircle/> Ver Tutorial</button>
            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex justify-between items-center mb-6"><div><h3 className="text-white font-bold">¿Eres Editor?</h3></div><button onClick={()=>navigateTo('user-upload')} className="bg-green-600 text-white px-4 py-2 rounded text-xs font-bold flex gap-2"><Upload size={14}/> Subir</button></div>
            <div className="grid grid-cols-2 gap-4">{skins.filter(s=>s.source==='community').map(s=>(<div key={s.id} onClick={()=>{setSelectedSkin(s); navigateTo('skin-detail');}} className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer"><img src={s.previewUrl} className="h-28 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold text-white">{s.title}</p><p className="text-[10px] text-slate-500">{s.author}</p></div></div>))}</div>
        </div>
      )}

      {view === 'user-upload' && (
        <div className="p-6 pb-24"><h2 className="text-white font-bold mb-4">Subir Aporte</h2><input className="w-full bg-slate-800 p-3 rounded mb-2 text-white" placeholder="Título" value={userSkinTitle} onChange={e=>setUserSkinTitle(e.target.value)}/><select className="w-full bg-slate-800 p-3 rounded mb-2 text-white" onChange={e=>{setUserSkinGame(e.target.value); setUserSkinModel("");}} value={userSkinGame}><option value="">Juego...</option>{games.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select><select className="w-full bg-slate-800 p-3 rounded mb-2 text-white" onChange={e=>setUserSkinModel(e.target.value)} value={userSkinModel}><option value="">Modelo...</option>{models.filter(m=>String(m.gameId)===String(userSkinGame)).map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select><input className="w-full bg-slate-800 p-3 rounded mb-2 text-white" placeholder="URL Foto" value={userSkinPreview} onChange={e=>setUserSkinPreview(e.target.value)}/><input className="w-full bg-slate-800 p-3 rounded mb-2 text-white" placeholder="URL Textura" value={userSkinTexture} onChange={e=>setUserSkinTexture(e.target.value)}/><label className="flex gap-2 text-white mb-4 text-xs"><input type="checkbox" checked={isAuthor} onChange={e=>setIsAuthor(e.target.checked)}/> Soy el autor.</label><button disabled={!isAuthor} onClick={userUpload} className="w-full bg-green-600 disabled:bg-slate-600 text-white py-3 rounded font-bold">Enviar</button></div>
      )}

      {view === 'skin-detail' && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
            <div className="absolute top-4 left-4"><button onClick={goBack} className="bg-black/50 p-2 rounded-full text-white"><ChevronLeft/></button></div>
            <div className="flex-1 bg-black flex items-center justify-center"><img src={selectedSkin?.previewUrl} className="max-w-full max-h-full object-contain"/></div>
            <div className="bg-slate-900 p-6 rounded-t-3xl border-t border-slate-700">
                <div className="flex justify-between mb-4"><h2 className="text-xl font-bold text-white">{selectedSkin?.title || ''}</h2>{selectedSkin?.premium && <span className="text-yellow-500 font-bold text-xs">PREMIUM</span>}</div>
                {selectedSkin?.premium && !isPremium && !isAdmin ? (
                    <button onClick={()=>navigateTo('premium')} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold flex justify-center gap-2"><Lock/> Desbloquear</button>
                ) : (
                    <div className="space-y-2">
                        <button onClick={()=>selectedSkin?.textureUrl && window.open(selectedSkin.textureUrl, '_blank')} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2"><Download/> Descargar</button>
                        {selectedSkin?.allowEdit && <button onClick={()=>setIsEditorOpen(true)} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2"><Palette/> Editar</button>}
                    </div>
                )}
            </div>
        </div>
      )}

      {view === 'admin-login' && <div className="h-screen flex flex-col justify-center p-6"><h2 className="text-white font-bold text-xl mb-4 text-center">Admin</h2><input type="password" className="w-full bg-slate-800 p-3 rounded text-white mb-4" value={adminPassInput} onChange={e=>setAdminPassInput(e.target.value)}/><button onClick={handleAdminLogin} className="w-full bg-red-600 text-white py-3 rounded font-bold">Entrar</button><button onClick={()=>navigateTo('home')} className="w-full mt-4 text-slate-500 text-center">Cancelar</button></div>}
      
      {view === 'login' && <div className="h-screen flex flex-col justify-center items-center text-center"><LogIn size={48} className="text-blue-500 mb-4"/><h2 className="text-white font-bold text-2xl mb-4">Acceso</h2><button onClick={handleLogin} className="bg-white text-black px-6 py-3 rounded-full font-bold">Google</button><button onClick={goBack} className="mt-4 text-slate-500">Cancelar</button></div>}
      
      {view === 'premium' && <div className="h-screen flex flex-col justify-center items-center text-center p-6"><Crown size={64} className="text-yellow-500 mb-4"/><h2 className="text-white font-bold text-3xl mb-2">GOLD PASS</h2><p className="text-slate-400 mb-6">Desbloquea todo.</p><button onClick={()=>{setIsPremium(true); alert("Bienvenido!"); navigateTo('home');}} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold">Pagar $4.99</button><button onClick={goBack} className="mt-4 text-slate-500">Volver</button></div>}

      {view !== 'skin-detail' && (
        <nav className="fixed bottom-0 w-full bg-slate-900 border-t border-slate-700 p-2 flex justify-around pb-safe-offset z-40">
           <button onClick={()=>navigateTo('home')} className={`flex flex-col items-center ${view==='home'?'text-orange-500':'text-slate-400'}`}><Home size={22}/><span className="text-[10px]">Inicio</span></button>
           <button onClick={()=>navigateTo('chat')} className={`flex flex-col items-center ${view==='chat'?'text-indigo-500':'text-slate-400'}`}><MessageSquare size={22}/><span className="text-[10px]">Chat</span></button>
           <button onClick={()=>navigateTo('premium')} className="bg-gradient-to-tr from-yellow-500 to-orange-500 text-white p-3 rounded-full -mt-8 border-4 border-slate-900 shadow-lg"><Crown size={24}/></button>
           <button onClick={()=>setIsMenuOpen(true)} className="text-slate-400 flex flex-col items-center"><Menu size={22}/><span className="text-[10px]">Menú</span></button>
        </nav>
      )}
    </div>
  );
}
