import { useState } from "react";
import { 
  Settings, ScanLine, Edit3, Share2, Mic, 
  ShieldCheck, Activity, Users, ChevronRight, 
  Camera, Lock, ChevronLeft, LogOut, QrCode, 
  Download, MessageCircle, Bot, Send, Loader2, Sparkles, Clock
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { cn } from "../utils/cn";

import { createPortal } from "react-dom";

export default function Profile() {
  // View State: 'main' | 'edit' | 'settings'
  const [viewState, setViewState] = useState<'main' | 'edit' | 'settings'>('main');
  
  // Modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [showDirectChat, setShowDirectChat] = useState(false);
  const [showScanResult, setShowScanResult] = useState(false);

  // Voice Agent State
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [agentStep, setAgentStep] = useState<'listening' | 'processing' | 'replying' | 'completed'>('listening');

  // Mock User Data
  const [user, setUser] = useState({
    name: "Phoebe",
    id: "@phoebe_mba",
    title: "高级产品总监",
    company: "TechGiant Inc.",
    school: "北大光华 EMBA",
    intro: "探索 AI 与商业的无限可能。INTJ，长期主义者。",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    stats: {
      connectionWeight: 892,
      alumniAuth: 15,
      circles: 2
    },
    tags: ["产品经理", "INTJ", "AI 探索者"],
    gender: "女",
    location: "北京"
  });

  // Mock Posts
  const posts = [
    {
      id: 1,
      content: "参加了今天的「AI 商业化落地」研讨会，收获颇丰。特别是关于垂直领域大模型的应用场景，非常有启发。",
      time: "2小时前",
      likes: 45,
      comments: 12,
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2672&auto=format&fit=crop"
    },
    {
      id: 2,
      content: "周末的高尔夫局，感谢王总的指导。",
      time: "1天前",
      likes: 89,
      comments: 24,
      image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  const handleStartVoiceAgent = () => {
    setShowVoiceAgent(true);
    setAgentStep('listening');
    
    // Simulate flow
    setTimeout(() => {
        setAgentStep('processing');
        setTimeout(() => {
            setAgentStep('replying');
            // Add new tag after conversation
            setUser(prev => ({
                ...prev,
                tags: [...prev.tags, "高尔夫爱好者"],
                intro: "探索 AI 与商业的无限可能。INTJ，长期主义者。近期迷上高尔夫。"
            }));
        }, 2000);
    }, 3000);
  };

  // --- Render Functions ---

  const renderVoiceAgent = () => {
    const portalContainer = document.getElementById('mobile-app-container');
    if (!portalContainer) return null;

    return createPortal(
        <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300">
            <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-white/10"
                onClick={() => setShowVoiceAgent(false)}
            >
                <X className="w-8 h-8" />
            </Button>

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md space-y-8">
                {/* Visualizer */}
                <div className="relative">
                    <div className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                        agentStep === 'listening' ? "bg-primary/20 animate-pulse scale-110" : "bg-gray-800",
                        agentStep === 'processing' && "bg-purple-500/20"
                    )}>
                        {agentStep === 'listening' && <Mic className="w-12 h-12 text-primary animate-bounce" />}
                        {agentStep === 'processing' && <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />}
                        {agentStep === 'replying' && <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />}
                    </div>
                    {agentStep === 'listening' && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                    )}
                </div>

                {/* Status Text */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">
                        {agentStep === 'listening' && "正在聆听..."}
                        {agentStep === 'processing' && "正在分析语义..."}
                        {agentStep === 'replying' && "已更新资料"}
                    </h2>
                    <p className="text-white/60 text-sm">
                        {agentStep === 'listening' && "请告诉我您的近况或新兴趣"}
                        {agentStep === 'processing' && "正在提取关键词：兴趣、技能、经历"}
                        {agentStep === 'replying' && "已为您自动完善个人档案"}
                    </p>
                </div>

                {/* Dialogue Box */}
                {(agentStep === 'replying' || agentStep === 'completed') && (
                    <div className="w-full bg-white/10 rounded-2xl p-6 border border-white/10 space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-500/50 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold">我</span>
                            </div>
                            <p className="text-sm text-white/90 leading-relaxed">
                                最近迷上了打高尔夫，周末经常去练习。
                            </p>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-white/90 leading-relaxed">
                                    太棒了！高尔夫是很好的社交运动。已为您添加<span className="text-yellow-400 font-bold mx-1">#高尔夫爱好者</span>标签，并更新了您的简介。
                                </p>
                                <div className="bg-black/20 rounded-lg p-3 text-xs text-white/70 flex items-center gap-2">
                                    <Bot className="w-3 h-3" />
                                    <span>个人资料已同步更新</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {agentStep === 'replying' && (
                <Button 
                    className="w-full max-w-xs bg-white text-black hover:bg-gray-100 rounded-full font-bold h-12"
                    onClick={() => setShowVoiceAgent(false)}
                >
                    完成
                </Button>
            )}
        </div>,
        portalContainer
    );
  };

  const renderMainProfile = () => (
    <div className="animate-in fade-in duration-500 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:bg-gray-100"
          onClick={() => setShowScanResult(true)} // Simulate Scan
        >
          <ScanLine className="w-6 h-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:bg-gray-100"
          onClick={() => setViewState('settings')}
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Identity Card */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 relative overflow-hidden border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h1>
              <p className="text-xs text-gray-400 font-medium mb-2">{user.id}</p>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{user.intro}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] px-2 py-0.5 font-medium">
              {user.school}
            </Badge>
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-gray-100 text-[10px] px-2 py-0.5 font-normal">
              {user.gender}
            </Badge>
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-gray-100 text-[10px] px-2 py-0.5 font-normal">
              {user.tags[1]}
            </Badge>
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-gray-100 text-[10px] px-2 py-0.5 font-normal">
              {user.title}
            </Badge>
          </div>

          {/* Stats Board */}
          <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-50 rounded-2xl p-4">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">854</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Connection 权重</div>
            </div>
            <div className="text-center border-l border-gray-200">
              <div className="text-lg font-bold text-gray-900">12</div>
              <div className="text-[9px] text-gray-400 mt-0.5">校友认证</div>
            </div>
            <div className="text-center border-l border-gray-200">
              <div className="text-lg font-bold text-gray-900">{user.stats.circles}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">参与圈子</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-200 text-gray-700 h-10 text-xs hover:bg-gray-50 rounded-xl font-medium"
              onClick={() => setViewState('edit')}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" /> 编辑资料
            </Button>
            <Button 
              className="flex-1 bg-primary text-white h-10 text-xs hover:bg-primary-dark rounded-xl font-medium shadow-md shadow-primary/20"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> 分享名片
            </Button>
          </div>
        </div>
      </div>

      {/* My Agent Section */}
      <div className="px-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/10">
                <Bot className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">秘书 Agent</h3>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  全天候运行中
                </p>
              </div>
            </div>
          </div>

          <Button 
            className="w-full h-12 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-primary transition-all group shadow-none"
            onClick={handleStartVoiceAgent}
          >
            <Mic className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
            按住随时补充语料
          </Button>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            告诉秘书你的最新经历或需求，让它更懂你
          </p>
        </div>
      </div>

      {/* My Posts */}
      <div className="px-4 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          我的动态
          <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">12</span>
        </h2>
        
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex gap-3 mb-3">
              <span className="text-sm text-gray-700 leading-relaxed">{post.content}</span>
            </div>
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden h-32 w-full">
                <img src={post.image} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{post.time}</span>
              <div className="flex gap-4">
                <span>点赞 {post.likes}</span>
                <span>评论 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditProfile = () => (
    <div className="min-h-full bg-white animate-in slide-in-from-right duration-300 absolute inset-0 z-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setViewState('main')} className="-ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Button>
        <h1 className="text-base font-bold text-gray-900">编辑资料</h1>
        <Button variant="ghost" size="sm" className="text-primary font-bold text-sm">保存</Button>
      </div>

      <div className="p-6 pb-24">
        {/* Avatar Edit */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50">
              <img src={user.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white shadow-sm cursor-pointer">
              <Camera className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">基本信息</label>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <span className="text-sm font-medium text-gray-900">名字</span>
                <input type="text" defaultValue={user.name} className="text-right text-sm text-gray-600 focus:outline-none w-1/2" />
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <span className="text-sm font-medium text-gray-900">简介</span>
                <input type="text" defaultValue={user.intro} className="text-right text-sm text-gray-600 focus:outline-none w-2/3 truncate" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white">
                <span className="text-sm font-medium text-gray-900">性别</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {user.gender} <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">职业与标签</label>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <span className="text-sm font-medium text-gray-900">职业</span>
                <input type="text" defaultValue={user.title} className="text-right text-sm text-gray-600 focus:outline-none w-1/2" />
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <span className="text-sm font-medium text-gray-900">MBTI</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  INTJ <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
              <div className="p-4 bg-white">
                <span className="text-sm font-medium text-gray-900 block mb-3">个人标签</span>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">
                      {tag} <X className="w-3 h-3 ml-1 cursor-pointer" />
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-dashed border-gray-300 text-gray-400 cursor-pointer">
                    + 添加
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">认证信息</label>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between opacity-80">
              <div>
                <span className="text-sm font-medium text-gray-900 block">学校与项目</span>
                <span className="text-xs text-gray-500">{user.school}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                <Lock className="w-3 h-3" />
                已认证锁定
              </div>
            </div>
            <p className="text-[10px] text-gray-400 ml-1 mt-1">需通过校园卡硬认证方可修改院校信息</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShareModal = () => {
    const portalContainer = document.getElementById('mobile-app-container');
    if (!portalContainer) return null;

    return createPortal(
        <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setShowShareModal(false)}>
          <div className="w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 text-center text-white shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              
              <div className="w-20 h-20 rounded-full border-4 border-white/10 mx-auto mb-4 overflow-hidden shadow-lg">
                <img src={user.avatar} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-xs text-gray-400 mb-6">{user.title} @ {user.company}</p>
              
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

  const renderScanResult = () => {
    const portalContainer = document.getElementById('mobile-app-container');
    if (!portalContainer) return null;

    return createPortal(
        <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200" onClick={() => setShowScanResult(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-12 shadow-2xl animate-in slide-in-from-bottom-full duration-300" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Jason Wang</h3>
                <p className="text-sm text-gray-500">腾讯云副总裁</p>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 mt-1 text-[10px]">
                  北大光华 EMBA
                </Badge>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 leading-relaxed">
              "正在寻找能消化华为910算力芯片的政企大客户。"
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full bg-primary text-white h-12 rounded-xl shadow-lg shadow-primary/20" onClick={() => {
                  setShowAgentDialog(true);
              }}>
                <Bot className="w-4 h-4 mr-2" />
                交给我的秘书去打招呼
              </Button>
              <Button variant="outline" className="w-full border-gray-200 text-gray-700 h-12 rounded-xl hover:bg-gray-50" onClick={() => {
                  setShowDirectChat(true);
                  setShowScanResult(false);
              }}>
                <Send className="w-4 h-4 mr-2" />
                发送站内私信
              </Button>
            </div>
          </div>
        </div>,
        portalContainer
    );
  };

  const renderDirectChat = () => {
    const portalContainer = document.getElementById('mobile-app-container');
    if (!portalContainer) return null;

    // Direct Chat needs to manage its own input focus state to prevent keyboard issues
    // But for this mockup, we'll keep it simple
    return createPortal(
        <div className="absolute inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-right duration-300">
          <div className="bg-white/80 backdrop-blur-md z-10 border-b border-gray-100 px-4 h-14 flex items-center justify-between shadow-sm">
            <Button variant="ghost" size="sm" onClick={() => setShowDirectChat(false)} className="-ml-2">
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </Button>
            <div className="flex flex-col items-center">
                <h1 className="text-base font-bold text-gray-900">Jason Wang</h1>
                <span className="text-[10px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>在线
                </span>
            </div>
            <div className="w-8" />
          </div>

          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4" onClick={() => {
              // Click outside input to dismiss keyboard (optional logic)
          }}>
            <div className="flex justify-center">
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">今天 14:23</span>
            </div>
            
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100">
                    <p className="text-sm text-gray-800">你好 Phoebe，很高兴认识你。我在光华听说过你在 AI 领域的见解。</p>
                </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                </div>
                <div className="bg-primary p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] text-white">
                    <p className="text-sm">Jason 你好！我也一直在关注腾讯云在算力方面的布局，有机会希望能请教一下。</p>
                </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100 pb-safe mb-6">
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400">
                    <Mic className="w-5 h-5" />
                </Button>
                <input 
                    type="text" 
                    placeholder="发送消息..." 
                    className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                />
                <Button size="icon" className="rounded-full bg-primary text-white shadow-md w-10 h-10 p-0 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
          </div>
        </div>,
        portalContainer
    );
  };

  const renderAgentDialog = () => (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-xs rounded-2xl p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Agent 沟通中</h3>
            <p className="text-sm text-gray-500 mb-6">
                您的私人秘书正在根据您的背景与 Jason 的 Agent 进行破冰沟通，请稍候...
            </p>
            <Button 
                className="w-full bg-primary text-white rounded-xl h-12 font-medium"
                onClick={() => {
                    setShowAgentDialog(false);
                    setShowScanResult(false);
                }}
            >
                确定
            </Button>
        </div>
    </div>
  );

  const renderSettings = () => (
    <div className="min-h-full bg-[#f3f2ef] animate-in slide-in-from-right duration-300 absolute inset-0 z-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setViewState('main')} className="-ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Button>
        <h1 className="text-base font-bold text-gray-900">设置与隐私</h1>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">展示我的历史履历</h3>
              <p className="text-xs text-gray-400 mt-0.5">向所有 Connection 展示完整职业轨迹</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Agent 自动迎宾与代聊</h3>
              <p className="text-xs text-gray-400 mt-0.5">关闭后需本人亲自回复破冰消息</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">仅同等梯队院校可见</h3>
              <p className="text-xs text-gray-400 mt-0.5">清北复交等同级校友可见详细档案</p>
            </div>
            <Switch />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">隐藏总 Connection 权重</h3>
              <p className="text-xs text-gray-400 mt-0.5">不在个人主页展示权重分数</p>
            </div>
            <Switch />
          </div>
        </div>

        <Button variant="outline" className="w-full bg-white border-red-100 text-red-500 hover:bg-red-50 h-12 rounded-xl">
          <LogOut className="w-4 h-4 mr-2" /> 退出登录
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative h-full bg-[#f3f2ef] overflow-hidden">
      {viewState === 'main' && renderMainProfile()}
      {viewState === 'edit' && renderEditProfile()}
      {viewState === 'settings' && renderSettings()}

      {/* Share Modal */}
      {showShareModal && renderShareModal()}

      {/* Voice Agent Overlay */}
      {showVoiceAgent && renderVoiceAgent()}

      {/* Scan Result Modal */}
      {showScanResult && renderScanResult()}

      {/* Agent Dialog */}
      {showAgentDialog && renderAgentDialog()}

      {/* Direct Chat */}
      {showDirectChat && renderDirectChat()}
    </div>
  );
}

// Simple Switch Component for this page
function Switch({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div 
      className={cn(
        "w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out",
        checked ? "bg-primary" : "bg-gray-200"
      )}
      onClick={() => setChecked(!checked)}
    >
      <div 
        className={cn(
          "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </div>
  );
}

function X({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 18 18" />
        </svg>
    )
}
