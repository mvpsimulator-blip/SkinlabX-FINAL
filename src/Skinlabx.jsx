import React, { useState, useEffect, useRef } from 'react';
import { Home, Truck, Upload, Heart, Search, ChevronLeft, Download, Plus, Box, Crown, ShieldCheck, Image as ImageIcon, Menu, X, Trash2, LogIn, MessageSquare, Send, Ban, User, Lock, Save, Wand2, Sparkles, Zap, Palette, Eraser, Youtube, Facebook, Instagram, Users, CreditCard, PlayCircle } from 'lucide-react';

// --- CONFIGURACIÓN ---
const ADMIN_PASS = "admin123"; 
const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PREMIUM = 20;
const TUTORIAL_LINK = "https://youtube.com/watch?v=TU_VIDEO_AQUI"; 

// --- ICONOS SOCIALES ---
const DiscordIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.46 13.46 0 0 0-.585 1.205 17.576 17.576 0 0 0-5.534 0 13.565 13.565 0 0 0-.59-1.205.071.071 0 0 0-.078-.037 19.74 19.74 0 0 0-4.885 1.515.068.068 0 0 0-.033.025C1.656 8.765.49 13.065.94 17.33a.07.07 0 0 0 .028.055 20.015 20.015 0 0 0 6.07 3.03.076.076 0 0 0 .083-.026 14.15 14.15 0 0 0 1.238-1.996.073.073 0 0 0-.04-.102 10.985 10.985 0 0 1-1.722-.818.069.069 0 0 1-.006-.113 7.828 7.828 0 0 0 .323-.239.068.068 0 0 1 .072-.008 14.37 14.37 0 0 0 11.08 0 .068.068 0 0 1 .072.008c.106.08.214.16.323.24a.069.069 0 0 1-.005.112 11.055 11.055 0 0 1-1.723.818.073.073 0 0 0-.04.102 14.15 14.15 0 0 0 1.238 1.996.073.073 0 0 0 .083.025 20.015 20.015 0 0 0 6.07-3.03.071.071 0 0 0 .028-.055c.618-4.825-.86-9.143-2.617-12.935a.07.07 0 0 0-.033-.025zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.418 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.417-2.157 2.417zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.417-2.157 2.417z"/></svg>;
const TikTokIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = skin.textureUrl; 
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [skin]);

  const handleDraw = (e) => {
    if(!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    ctx.lineWidth = 5 * scaleX;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-slate-900 flex flex-col animate-in fade-in">
       <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-white font-bold flex gap-2"><Palette className="text-purple-500"/> Skin Studio</h3>
          <button onClick={onClose}><X className="text-slate-400"/></button>
       </div>
       <div className="flex-1 bg-slate-800/50 flex items-center justify-center p-4">
          <canvas 
            ref={canvasRef}
            className="shadow-2xl border border-slate-600 bg-white max-w-full max-h-full"
            onMouseDown={(e)=>{setIsDrawing(true); const ctx=canvasRef.current.getContext('2d'); ctx.beginPath();}}
            onMouseMove={handleDraw}
            onMouseUp={()=>setIsDrawing(false)}
            onTouchStart={(e)=>{setIsDrawing(true); const ctx=canvasRef.current.getContext('2d'); ctx.beginPath();}}
            onTouchMove={handleDraw}
            onTouchEnd={()=>setIsDrawing(false)}
          />
          {showAI && (
            <div className="absolute top-4 left-4 right-4 bg-slate-900 p-4 rounded-xl border border-purple-500">
                <div className="flex justify-between mb-2"><h4 className="text-white font-bold">AI Gen</h4><button onClick={()=>setShowAI(false)}><X/></button></div>
                <p className="text-slate-400 text-xs mb-2">Usos: {dailyUsage}/{LIMIT}</p>
                <button onClick={()=>{setDailyUsage(dailyUsage+1); alert("Generado!"); setShowAI(false);}} className="w-full bg-purple-600 text-white py-2 rounded">Generar</button>
            </div>
          )}
       </div>
       <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-4">
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded border-none"/>
          <button onClick={()=>setShowAI(true)} className="p-2 bg-indigo-600 rounded text-white"><Sparkles/></button>
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
    if(!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, user: user?.displayName || "Invitado", role: isAdmin ? 'admin' : 'user' }]);
    setMsg("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900">
        <div className="p-4 bg-slate-800 border-b border-slate-700"><h2 className="text-white font-bold">Chat Global</h2></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
                <div key={m.id} className={flex gap-3 ${m.role === 'admin' ? 'flex-row-reverse' : ''}}>
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">{m.user[0]}</div>
                    <div className="bg-slate-800 p-2 rounded text-sm text-slate-200">
                        <span className="text-xs text-slate-400 block mb-1">{m.user}</span>
                        {m.text}
                    </div>
                </div>
            ))}
        </div>
        <form onSubmit={send} className="p-3 bg-slate-800 flex gap-2">
            <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 bg-slate-900 text-white rounded-full px-4" placeholder="Mensaje..." disabled={!user}/>
            <button className="bg-indigo-600 text-white p-2 rounded-full"><Send size={18}/></button>
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
        setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (newView) => { setHistory([...history, newView]); setView(newView); };
  const goBack = () => { if(history.length > 1) { const newH = [...history]; newH.pop(); setHistory(newH); setView(newH[newH.length-1]); } else setView('home'); };
  const handleLogin = () => { setUser({ displayName: "Usuario Demo", uid: "123" }); navigateTo('home'); };
  const handleAdminLogin = (e) => { e.preventDefault(); if(adminPassInput === ADMIN_PASS) { setIsAdmin(true); navigateTo('upload'); } else alert("Error"); };
  const handleUploadSkin = () => { setSkins([...skins, { id: Date.now(), title: newSkinTitle, modelId: newSkinModelId || 'm1', previewUrl: newSkinPreview, textureUrl: newSkinTexture, premium: newSkinPremium, allowEdit: true, source: 'official' }]); alert("Skin Publicada!"); };
  const handleUserUpload = () => { if(!isAuthor) return; setSkins([...skins, { id: Date.now(), title: userSkinTitle, modelId: userSkinModel, previewUrl: userSkinPreview, textureUrl: userSkinTexture, premium: false, allowEdit: true, source: 'community', author: user?.displayName }]); alert("Subida!"); navigateTo('community-hub'); };

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-slate-200 select-none pb-safe">
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex justify-end">
            <div className="w-72 bg-slate-900 h-full p-6 border-l border-slate-800 overflow-y-auto">
                <div className="flex justify-between mb-8"><h2 className="text-xl font-bold text-white">MENÚ</h2><button onClick={()=>setIsMenuOpen(false)}><X/></button></div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs text-slate-500 font-bold mb-2">ACCESOS</h3>
                        <button onClick={()=>{navigateTo('home'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Inicio</button>
                        <button onClick={()=>{navigateTo('community-hub'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Comunidad</button>
                        <button onClick={()=>{navigateTo('chat'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">Chat</button>
                    </div>
                    <div>
                        <h3 className="text-xs text-slate-500 font-bold mb-2">JUEGOS</h3>
                        {games.map(g=><button key={g.id} onClick={()=>{setSelectedGame(g); navigateTo('game-menu'); setIsMenuOpen(false);}} className="block w-full text-left py-2 hover:text-white">{g.name}</button>)}
                    </div>
                    <div>
                        <h3 className="text-xs text-slate-500 font-bold mb-2">REDES</h3>
                        <div className="flex gap-2 flex-wrap">{SOCIALS.map(s=><button key={s.name} onClick={()=>window.open(s.url)} className={${s.color} p-2 rounded text-white}>{s.icon}</button>)}</div>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                        {isAdmin ? <button onClick={()=>{navigateTo('upload'); setIsMenuOpen(false);}} className="text-red-400 font-bold">Panel Admin</button> : <button onClick={()=>{navigateTo('admin-login'); setIsMenuOpen(false);}} className="text-slate-500 text-xs">Admin Access</button>}
                    </div>
                </div>
            </div>
        </div>
      )}

      {isEditorOpen && selectedSkin && <SkinEditor skin={selectedSkin} onClose={()=>setIsEditorOpen(false)} isPremium={isPremium}/>}

      {view === 'home' && (
        <div className="pb-24 p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black italic text-white">SKINLAB<span className="text-orange-500">X</span></h1>
                <div className="flex gap-2">
                    {!user ? <button onClick={()=>navigateTo('login')} className="bg-blue-600 text-xs px-3 py-1 rounded text-white">Login</button> : <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white">{user.displayName[0]}</div>}
                    <button onClick={()=>navigateTo('admin-login')}><Lock size={16} className="text-slate-500"/></button>
                </div>
            </div>
            <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>{onlineUsers} Online</div>
            
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-2xl relative overflow-hidden">
                <h2 className="text-xl font-bold text-white relative z-10">Studio AI ⚡</h2>
                <button onClick={()=>navigateTo('premium')} className="bg-white text-purple-900 px-4 py-2 rounded-full text-xs font-bold mt-2 relative z-10">{isPremium ? "Abrir" : "Desbloquear"}</button>
                <Sparkles className="absolute -right-4 -bottom-4 text-white/10" size={100}/>
            </div>

            <div onClick={()=>navigateTo('community-hub')} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700">
                <div className="flex items-center gap-3"><Users className="text-green-500"/><div><h3 className="text-white font-bold text-sm">Comunidad</h3><p className="text-xs text-slate-400">Sube tus skins</p></div></div>
                <ChevronLeft className="rotate-180 text-slate-500"/>
            </div>

            <div className="grid gap-4">
                {games.map(g=>(
                    <div key={g.id} onClick={()=>{setSelectedGame(g); navigateTo('game-menu');}} className="h-32 bg-slate-800 rounded-xl relative overflow-hidden">
                        <img src={g.img} className="w-full h-full object-cover opacity-60"/>
                        <p className="absolute bottom-4 left-4 font-bold text-white text-lg shadow-black drop-shadow-md">{g.name}</p>
                    </div>
                ))}
            </div>
        </div>
      )}

      {view === 'game-menu' && (
        <div className="p-6 h-screen flex flex-col items-center justify-center text-center space-y-6">
            <button onClick={goBack} className="absolute top-6 left-6"><ChevronLeft/></button>
            <h2 className="text-2xl font-bold text-white">{selectedGame.name}</h2>
            <button onClick={()=>{setSelectedType('truck'); navigateTo('model-list');}} className="bg-slate-800 p-8 rounded-xl w-full border border-slate-700"><Truck size={40} className="mx-auto text-orange-500 mb-2"/><span className="text-white font-bold">Camiones</span></button>
            <button onClick={()=>{setSelectedType('cargo'); navigateTo('model-list');}} className="bg-slate-800 p-8 rounded-xl w-full border border-slate-700"><Box size={40} className="mx-auto text-blue-500 mb-2"/><span className="text-white font-bold">Cargas</span></button>
        </div>
      )}

      {view === 'model-list' && (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4"><button onClick={goBack}><ChevronLeft/></button><h2 className="text-white font-bold">Modelos</h2></div>
            <div className="grid grid-cols-2 gap-4">
                {models.filter(m=>m.gameId===selectedGame.id && m.type===selectedType).map(m=>(
                    <div key={m.id} onClick={()=>{setSelectedModel(m); navigateTo('model-detail');}} className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer">
                        <img src={m.image} className="h-28 w-full object-cover"/>
                        <p className="p-2 text-xs font-bold text-white">{m.name}</p>
                    </div>
                ))}
            </div>
        </div>
      )}

      {view === 'model-detail' && (
        <div className="p-4">
            <button onClick={goBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full z-10"><ChevronLeft className="text-white"/></button>
            <img src={selectedModel.image} className="w-full h-40 object-cover rounded-xl mb-6"/>
            <div className="grid grid-cols-2 gap-4">
                {skins.filter(s=>s.modelId===selectedModel.id && s.source==='official').map(s=>(
                    <div key={s.id} onClick={()=>{setSelectedSkin(s); navigateTo('skin-detail');}} className="bg-slate-800 rounded-xl overflow-hidden relative">
                        <img src={s.previewUrl} className="h-28 w-full object-cover"/>
                        {s.premium && <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[10px] px-2 font-bold">VIP</div>}
                        <p className="p-2 text-xs font-bold text-white">{s.title}</p>
                        {isAdmin && <button onClick={(e)=>{e.stopPropagation(); if(window.con
