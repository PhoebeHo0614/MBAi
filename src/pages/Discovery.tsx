import { useState, useRef, useEffect } from "react";
import { X, MessageSquareQuote, Heart, MoreHorizontal, MapPin, Briefcase, GraduationCap, Bot, Sparkles, Send, ArrowLeft, Zap, ShieldCheck, Flag, Share2, Frown, QrCode, Download, MessageCircle, ScanLine } from "lucide-react";
import { USERS } from "../data/mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { cn } from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import AlumniEndorsementModal from "../components/AlumniEndorsementModal";
import { createPortal } from "react-dom";

export default function Discovery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'moments'>('about');
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [showDirectChat, setShowDirectChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  const [hiddenUsers, setHiddenUsers] = useState<string[]>([]);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);

  // Action Sheet & Endorsement
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showEndorsementModal, setShowEndorsementModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Default false to show interception first

  // Mock Current User
  const currentUser = {
    name: "Phoebe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    school: "北大光华 EMBA"
  };

  // Scroll to first item on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handlePass = (userId: string) => {
    setHiddenUsers(prev => [...prev, userId]);
  };

  const handleLike = (userId: string) => {
      // Toggle like state
      if (likedUsers.includes(userId)) {
          // Unlike: Remove from liked list
          setLikedUsers(prev => prev.filter(id => id !== userId));
          // Do not scroll
      } else {
          // Like: Add to liked list
          setLikedUsers(prev => [...prev, userId]);
          // Scroll after animation
          setTimeout(() => {
            if (containerRef.current) {
                const height = containerRef.current.clientHeight;
                containerRef.current.scrollBy({ top: height, behavior: 'smooth' });
            }
          }, 800);
      }
  };

  const undoPass = (userId: string) => {
      setHiddenUsers(prev => prev.filter(id => id !== userId));
  };

  const openActionSheet = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setShowActionSheet(true);
  };

  const renderActionSheet = () => {
    const portalContainer = document.getElementById('mobile-app-container') || document.body;
    
    return createPortal(
      <AnimatePresence>
        {showActionSheet && (
          <div className="absolute inset-0 z-[55] flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowActionSheet(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl p-6 pb-safe space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
              
              <div className="space-y-1">
                <Button 
                    className="w-full h-14 bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 justify-start px-4 text-base font-bold rounded-2xl flex items-center gap-3"
                    onClick={() => {
                        setShowActionSheet(false);
                        setShowEndorsementModal(true);
                        // For demo: randomly decide if verified or not, OR just use state
                        // Here we use the state `isVerified` which defaults to false
                    }}
                >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    为 Ta 校友认证
                </Button>

                <Button 
                    variant="ghost" 
                    className="w-full h-14 justify-start px-4 text-gray-700 hover:bg-gray-50 rounded-2xl flex items-center gap-3 text-base font-medium"
                    onClick={() => {
                        setShowActionSheet(false);
                        setShowShareModal(true);
                    }}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <Share2 className="w-5 h-5" />
                    </div>
                    分享名片
                </Button>

                <Button 
                    variant="ghost" 
                    className="w-full h-14 justify-start px-4 text-gray-700 hover:bg-gray-50 rounded-2xl flex items-center gap-3 text-base font-medium"
                    onClick={() => {
                        setShowActionSheet(false);
                        if (selectedUser) handlePass(selectedUser.id);
                    }}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <Frown className="w-5 h-5" />
                    </div>
                    不感兴趣
                </Button>

                <Button 
                    variant="ghost" 
                    className="w-full h-14 justify-start px-4 text-red-500 hover:bg-red-50 rounded-2xl flex items-center gap-3 text-base font-medium"
                    onClick={() => setShowActionSheet(false)}
                >
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                        <Flag className="w-5 h-5" />
                    </div>
                    举报用户
                </Button>
              </div>

              {/* Demo Toggle (Hidden in production) */}
              <div className="pt-4 border-t border-gray-100 flex justify-center">
                  <button 
                    className="text-xs text-gray-300 underline"
                    onClick={() => {
                        setIsVerified(!isVerified);
                        alert(`已切换状态：${!isVerified ? '已认证' : '未认证'}`);
                    }}
                  >
                      [Demo] 切换当前用户认证状态: {isVerified ? '已认证' : '未认证'}
                  </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      portalContainer
    );
  };

  const renderShareModal = () => {
    const portalContainer = document.getElementById('mobile-app-container') || document.body;
    if (!selectedUser) return null;

    return createPortal(
        <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setShowShareModal(false)}>
          <div className="w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 text-center text-white shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              
              <div className="w-20 h-20 rounded-full border-4 border-white/10 mx-auto mb-4 overflow-hidden shadow-lg">
                <img src={selectedUser.image} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold mb-1">{selectedUser.name}</h2>
              <p className="text-xs text-gray-400 mb-6">{selectedUser.title} @ {selectedUser.company}</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-lg">
                <QrCode className="w-32 h-32 text-gray-900" />
              </div>
              
              <p className="text-[10px] text-gray-400 mb-8 max-w-[200px] mx-auto">
                扫描二维码，在 MBAi 与我的 Agent 建立 Connection
              </p>

              <div className="flex justify-center gap-6 border-t border-white/10 pt-6">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-[10px] text-gray-400">微信好友</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <ScanLine className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] text-gray-400">朋友圈</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-gray-400">保存</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" className="text-white/50 hover:text-white rounded-full h-10 w-10 p-0" onClick={() => setShowShareModal(false)}>
                <X className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>,
        portalContainer
    );
  };

  const openAgentChat = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setShowAgentChat(true);
  };

  const openDirectChat = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setShowDirectChat(true);
  };

  if (showAgentChat && selectedUser) {
    return (
        <div className="h-full w-full bg-white flex flex-col z-40 absolute inset-0">
            <div className="p-4 border-b flex items-center gap-4 bg-white shadow-sm z-10 shrink-0">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => setShowAgentChat(false)}>
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Button>
                <div>
                    <h2 className="font-bold text-lg">Agent 对话</h2>
                    <p className="text-xs text-gray-500">我的 Agent 正在与 {selectedUser.name} 的 Agent 沟通</p>
                </div>
                <Button 
                    size="sm" 
                    className="ml-auto bg-accent text-white hover:bg-accent-light border-0 px-3 h-8 text-xs gap-1 shadow-sm whitespace-nowrap"
                    onClick={() => {
                        setShowAgentChat(false);
                        setShowDirectChat(true);
                    }}
                >
                    <Zap className="w-3 h-3 fill-current" />
                    接管对话
                </Button>
            </div>
            <div className="flex-1 p-4 bg-gray-50 space-y-4 overflow-y-auto pb-32">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
                        <Bot className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
                        <p className="text-sm text-gray-700">你好，我是 {selectedUser.name} 的商务 Agent。检测到您的用户正在寻找算力芯片客户，我们正好有相关需求。</p>
                    </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                        <p className="text-sm text-white">太好了！我的用户王总目前手上有华为910的现货资源，想了解下贵司的具体采购规模？</p>
                    </div>
                </div>
            </div>
             <div className="absolute bottom-[64px] left-0 right-0 p-4 border-t bg-white shrink-0">
                <div className="flex gap-2">
                    <input className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="介入对话..." />
                    <Button size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-primary text-white hover:bg-primary-light">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
  }

  if (showDirectChat && selectedUser) {
    return (
        <div className="h-full w-full bg-white flex flex-col z-40 absolute inset-0">
            <div className="p-4 border-b flex items-center gap-4 bg-white shadow-sm z-10 shrink-0">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => setShowDirectChat(false)}>
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Button>
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={selectedUser.image} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="font-bold text-lg">{selectedUser.name}</h2>
                </div>
            </div>
            <div className="flex-1 p-4 bg-gray-50 flex flex-col items-center justify-center text-gray-400 overflow-y-auto pb-32">
                <p>开始与 {selectedUser.name} 的直接对话</p>
            </div>
            <div className="absolute bottom-[64px] left-0 right-0 p-4 border-t bg-white flex gap-2 shrink-0">
                <input className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="发送消息..." />
                <Button size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-primary text-white hover:bg-primary-light">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-[#f3f2ef]">
      
      {/* Scroll Snap Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
      >
        <AnimatePresence>
        {USERS.map((user) => {
            if (hiddenUsers.includes(user.id)) {
                return (
                    <motion.div 
                        key={user.id} 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full snap-start snap-always p-4 flex flex-col items-center justify-center bg-gray-100 min-h-[150px]"
                    >
                         <p className="text-sm text-gray-500 mb-2">不感兴趣的用户将不再出现在发现页</p>
                         <button 
                            onClick={() => undoPass(user.id)}
                            className="text-primary text-sm font-bold hover:underline"
                         >
                             撤销操作
                         </button>
                    </motion.div>
                );
            }

            return (
            <div key={user.id} className="h-full w-full snap-start snap-always relative flex flex-col p-4 pb-24">
                
                {/* Card Container */}
                <div className="flex-1 w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col relative">
                    
                    {/* Like Overlay Animation */}
                    <AnimatePresence>
                        {likedUsers.includes(user.id) && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, times: [0, 0.1, 0.6, 1] }}
                                className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none"
                            >
                                <motion.div 
                                    animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 1] }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white p-6 rounded-full shadow-2xl"
                                >
                                    <Heart className="w-16 h-16 text-red-500 fill-current" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header (Inside Card) */}
                    <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-white/90 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 text-lg leading-tight shadow-black drop-shadow-sm">{user.name}</span>
                                <span className="text-xs text-gray-600 font-medium">{user.title}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 text-gray-600 bg-white/50 hover:bg-white backdrop-blur-sm" onClick={() => openActionSheet(user)}>
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="absolute top-16 left-0 right-0 z-10 px-6 flex items-center gap-6">
                         <div 
                            className="relative cursor-pointer group"
                            onClick={() => setActiveTab('about')}
                         >
                              <span className={cn("text-base font-bold drop-shadow-md transition-colors", activeTab === 'about' ? "text-gray-900" : "text-gray-400 hover:text-gray-600")}>关于我</span>
                              {activeTab === 'about' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-sm" />}
                          </div>
                          <div 
                            className="relative cursor-pointer group"
                            onClick={() => setActiveTab('moments')}
                          >
                              <span className={cn("text-base font-bold drop-shadow-md transition-colors", activeTab === 'moments' ? "text-gray-900" : "text-gray-400 hover:text-gray-600")}>动态</span>
                               {activeTab === 'moments' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-sm" />}
                          </div>
                    </div>

                    {/* Scrollable Content Area within Card */}
                    <div className="flex-1 overflow-y-auto no-scrollbar pt-24 pb-20">
                        {activeTab === 'about' ? (
                            <>
                                {/* Photo Area */}
                                <div className="relative w-full aspect-[4/5] bg-gray-100 mb-4 shadow-sm">
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                    
                                    {/* Hi Bubble */}
                                    <div 
                                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 border border-white/50 animate-bounce-slow cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => openDirectChat(user)}
                                    >
                                        <div className="bg-primary/10 p-1 rounded-full">
                                            <Sparkles className="w-3 h-3 text-primary fill-current" />
                                        </div>
                                        <span className="text-xs font-bold text-primary">Hi</span>
                                    </div>
                                </div>

                                {/* Basic Info Section */}
                                <div className="px-6 space-y-5">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">基础资料</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge 
                                                variant="secondary" 
                                                className="bg-gray-50 text-gray-700 border border-gray-100 py-1.5 px-3 text-sm font-normal cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                                                onClick={() => alert(`展示 ${user.school} 的项目详情与学费比价`)}
                                            >
                                                <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                {user.school}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-gray-50 text-gray-700 border border-gray-100 py-1.5 px-3 text-sm font-normal shadow-sm">
                                                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                {user.company}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-gray-50 text-gray-700 border border-gray-100 py-1.5 px-3 text-sm font-normal shadow-sm">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                现居北京
                                            </Badge>
                                            {user.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="bg-gray-50 text-gray-700 border border-gray-100 py-1.5 px-3 text-sm font-normal shadow-sm">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* AI Insight */}
                                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="bg-blue-100 p-1 rounded-md">
                                                <Bot className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <span className="text-xs font-bold text-primary tracking-wide">AI 洞察</span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                            {user.aiSummary}
                                        </p>
                                        
                                        <div className="flex gap-2 mt-3 pt-3 border-t border-blue-100/50">
                                            {user.agents.map((agent, i) => (
                                                <div key={i} className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full border border-blue-50 shadow-sm">
                                                    <div className={`w-2 h-2 rounded-full ${agent.type === 'secretary' ? 'bg-purple-400' : 'bg-green-400'}`} />
                                                    <span className="text-[10px] font-medium text-gray-600">{agent.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Extra spacing for bottom bar */}
                                    <div className="h-12" />
                                </div>
                            </>
                        ) : (
                            <div className="px-6 py-4 space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-400">2小时前</span>
                                    </div>
                                    <p className="text-sm text-gray-700">刚刚参加完 {user.school} 的校友会，遇到了很多有趣的伙伴。#MBA生活 #校友聚会</p>
                                    <div className="mt-3 h-32 w-full bg-gray-200 rounded-lg overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-400">昨天</span>
                                    </div>
                                    <p className="text-sm text-gray-700">分享一篇关于 AI 基础设施的深度研报，值得一读。</p>
                                </div>
                                 <div className="h-12" />
                            </div>
                        )}
                    </div>

                    {/* Bottom Actions (Fixed at bottom of card) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-between gap-4 z-20">
                        <Button 
                            className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 flex items-center justify-center border-0 shadow-none transition-transform active:scale-95"
                            onClick={() => handlePass(user.id)}
                        >
                            <X className="w-8 h-8" />
                        </Button>

                        <Button 
                            className="flex-1 h-14 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95"
                            onClick={() => openAgentChat(user)}
                        >
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <MessageSquareQuote className="w-5 h-5 fill-current" />
                            </div>
                            <span className="font-bold text-lg">Agent 接触</span>
                        </Button>

                        <Button 
                            className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center border-0 shadow-sm transition-all active:scale-95 duration-300",
                                likedUsers.includes(user.id) 
                                    ? "bg-red-500 text-white hover:bg-red-600" 
                                    : "bg-red-50 text-red-500 hover:bg-red-100"
                            )}
                            onClick={() => handleLike(user.id)}
                        >
                            <Heart className={cn("w-8 h-8", likedUsers.includes(user.id) ? "fill-current text-red-100" : "fill-current")} />
                        </Button>
                    </div>

                </div>
            </div>
            );
        })}
        </AnimatePresence>
        
        {/* End of List Message */}
      <div className="h-full w-full snap-start snap-always flex flex-col items-center justify-center p-8 text-gray-500 pb-24">
           <div className="mb-4 bg-gray-100 p-4 rounded-full">
              <Bot className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">暂时没有更多推荐</h3>
          <p className="text-sm text-gray-400 mb-8 text-center max-w-xs">您的 AI 秘书正在全网搜寻新的匹配对象，请稍后再来。</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8" onClick={() => {
              if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
              返回顶部
          </Button>
      </div>
    </div>
    
    {/* Action Sheet */}
    {renderActionSheet()}

    {/* Share Modal */}
    {showShareModal && renderShareModal()}

    {/* Alumni Endorsement Modal */}
    {selectedUser && (
      <AlumniEndorsementModal
        isOpen={showEndorsementModal}
        onClose={() => setShowEndorsementModal(false)}
        targetUser={{
            name: selectedUser.name,
            avatar: selectedUser.image,
            school: selectedUser.school
        }}
        currentUser={currentUser}
        isVerified={isVerified}
      />
    )}
  </div>
);
}
