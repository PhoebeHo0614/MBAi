import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Check,
  GraduationCap,
  Bot,
  User,
  Dribbble,
  ArrowLeft,
  MoreHorizontal,
  Shield,
  Tag,
  Link as LinkIcon,
  ThumbsUp,
  Info,
  Send,
  Mic,
  X,
  Share2,
  Zap,
  Activity,
  Crown,
  Scale,
  UserCheck,
  MapPin,
  Banknote,
  Globe,
  Building2,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. Current User Definition ---
const CURRENT_USER = {
  name: "Phoebe",
  title: "产品经理",
  company: "微信支付",
  project: "ChimerAI (AI时尚全链路解决方案)",
  needs: "正在寻找具备商业化落地能力的合伙人与早期投资机会。"
};

// --- 2. Mock Users Array ---
const MOCK_USERS = [
  {
    id: 1,
    name: "张明远",
    title: "智子星源 | 销售总监",
    company: "智子星源",
    position: "销售总监",
    authCount: 28,
    education: "中欧国际工商学院 · EMBA 2023级 · 长青班",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    tags: [
      { text: "人工智能", color: "blue" },
      { text: "芯片行业", color: "gray" },
      { text: "投资人", color: "gray" },
    ],
    aiSummary: "正在寻找华为910系列芯片的央国企客户，擅长模型适配与算子优化，可提供 AI 基础设施解决方案。",
    agentType: "商务秘书",
    circleName: "大湾区羽毛球联盟",
    circleDesc: "大湾区商学院羽毛球爱好者聚集地",
    agents: [
      { name: "商务秘书", status: "在线", type: "business" },
      { name: "羽毛球搭子", status: "4.0级", type: "hobby" },
    ]
  },
  {
    id: 2,
    name: "李雨桐",
    title: "红杉中国 | 投资合伙人",
    company: "红杉中国",
    position: "投资合伙人",
    authCount: 45,
    education: "上海高级金融学院 · DBA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    tags: [
      { text: "跨境出海", color: "blue" },
      { text: "AIGC", color: "gray" },
      { text: "高尔夫", color: "gray" },
    ],
    aiSummary: "关注 AI 结合垂直产业的早期项目，近期重点寻找时尚、消费品领域的 AI 创新。",
    agentType: "投资助理",
    circleName: "高管高尔夫俱乐部",
    circleDesc: "金融与科技圈高管的私密社交圈",
    agents: [
      { name: "投资助理", status: "在线", type: "business" },
      { name: "高尔夫球友", status: "差点18", type: "hobby" },
    ]
  },
  {
    id: 3,
    name: "李建国",
    title: "蔚来汽车 | 供应链VP",
    company: "蔚来汽车",
    position: "供应链VP",
    authCount: 112,
    education: "清华五道口 · 金融 EMBA 2022级",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    tags: [
      { text: "智能制造", color: "blue" },
      { text: "供应链管理", color: "gray" },
      { text: "德扑", color: "gray" },
    ],
    aiSummary: "负责集团全球供应链战略，正在寻找车规级功率半导体国产替代方案。周末常在北京组织德扑局。",
    agentType: "采购助手",
    circleName: "京圈德扑俱乐部",
    circleDesc: "互联网与投资圈的德扑聚会",
    agents: [
      { name: "采购助手", status: "在线", type: "business" },
      { name: "牌局组织者", status: "VPIP 35%", type: "hobby" },
    ]
  },
  {
    id: 4,
    name: "Sofia Wang",
    title: "ByteDance | 商业化产品负责人",
    company: "ByteDance",
    position: "商业化产品负责人",
    authCount: 67,
    education: "HKUST · MBA 2020级",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    tags: [
      { text: "AIGC", color: "blue" },
      { text: "出海业务", color: "gray" },
      { text: "滑雪", color: "gray" },
    ],
    aiSummary: "负责TikTok商业化变现产品，关注生成式AI在广告创意中的应用。雪季固定在崇礼或长白山。",
    agentType: "日程助理",
    circleName: "崇礼滑雪发烧友",
    circleDesc: "互联网大厂滑雪爱好者大本营",
    agents: [
      { name: "日程助理", status: "忙碌", type: "business" },
      { name: "雪友群主", status: "双板L3", type: "hobby" },
    ]
  }
];

// --- 3. Mock Messages Array ---
const MOCK_MESSAGES = [
  { 
    id: 1, 
    name: "张明远", 
    title: "智子星源 | 销售总监", 
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop", 
    lastMessage: "太好了！Phoebe 关注的 AI 创业项目正好处于需要强大底层算力支持的阶段...", 
    time: "刚刚", 
    isAgentRecommended: true, 
    unreadCount: 3 
  },
  { 
    id: 2, 
    name: "李雨桐", 
    title: "红杉中国 | 投资合伙人", 
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop", 
    lastMessage: "这非常契合雨桐近期关注的 AIGC 垂直产业赛道，希望能看看 BP。", 
    time: "10:04", 
    isAgentRecommended: true, 
    unreadCount: 0 
  },
  { 
    id: 3, 
    name: "王海峰", 
    title: "同班同学", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop", 
    lastMessage: "下周的战略课小组作业我们几号对一下？", 
    time: "昨天", 
    isAgentRecommended: false, 
    unreadCount: 0 
  }
];

// --- 4. Mock Notifications Array ---
const MOCK_NOTIFICATIONS = [
  {
    id: 101,
    sender: "MBAi 官方助手",
    time: "昨天 18:30",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=400",
    title: "2026 粤港澳大湾区 AI 创投闭门沙龙邀请函",
    summary: "本次闭门沙龙将重点探讨 AIGC 在垂直行业的商业化落地，届时将有多位一线基金合伙人出席。请各位校友准时着正装出席。",
    content: "详细的正文内容...（此处可作简单占位）"
  },
  {
    id: 102,
    sender: "ChimerAI 创投孵化圈",
    time: "周二 10:00",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800&h=400",
    title: "项目进度更新：时尚全链路 AI 解决方案 BP 已上传",
    summary: "圈主 Phoebe 已更新《ChimerAI 商业计划书 v2.0》，对底层算力模型适配和商业变现路径进行了详细补充，欢迎各位圈友审阅交流。",
    content: "详细的正文内容...（此处可作简单占位）"
  }
];

// --- 5. Mock Programs Array ---
const MOCK_PROGRAMS = [
  { 
    id: 1, 
    tier: "T1", 
    tierLabel: "第一梯队 / 顶尖名校", 
    name: "北京大学光华管理学院 EMBA", 
    location: "北京 / 深圳", 
    tuition: "¥ 82.8万", 
    acceptanceRate: "约 8%", 
    language: "中文为主", 
    tags: ["清北复交", "极高门槛", "政企人脉"], 
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800", 
    isPremium: true // T1 梯队专属黑金视觉标识 
  }, 
  { 
    id: 2, 
    tier: "T1", 
    tierLabel: "第一梯队 / 顶尖名校", 
    name: "中欧国际工商学院 (CEIBS) EMBA", 
    location: "上海 / 北京 / 深圳", 
    tuition: "¥ 75.8万", 
    acceptanceRate: "约 12%", 
    language: "中英双语", 
    tags: ["中外合作", "长青班", "外企高管"], 
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", 
    isPremium: true 
  }, 
  { 
    id: 3, 
    tier: "T2", 
    tierLabel: "第二梯队 / 强势名校", 
    name: "香港中文大学（深圳）MBM", 
    location: "深圳", 
    tuition: "¥ 35.8万", 
    acceptanceRate: "约 25%", 
    language: "全英文", 
    tags: ["大湾区", "免联考", "金融科创"], 
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800", 
    isPremium: false 
  } 
];

// --- Agent Chat View Component ---
function AgentChatView({ user, onBack, currentView, setCurrentView }: any) {
  // Dynamic Chat Content Logic
  const getChatMessages = () => {
    if (user.id === 1) { // Zhang Mingyuan
      return [
        {
          side: "right",
          text: `你好，我是 ${CURRENT_USER.name} 的商务秘书 Agent。我的主理人是一名${CURRENT_USER.title}，目前正在深度看行为学与 AI 结合的创业项目，并在寻找优质的心动合作机会。`
        },
        {
          side: "left",
          text: `你好！我是${user.name}的${user.agentType}。${user.name}目前是${user.company}的${user.position}，正在寻找能消化华为910系列芯片算力的央国企客户，在模型适配和算子优化方面非常有经验。`
        },
        {
          side: "right",
          text: `太好了！${CURRENT_USER.name} 关注的 AI 创业项目正好处于需要强大底层算力支持的阶段。我们在企业级产品定义上很有经验，或许我们可以进一步沟通具体的算力合作与商业化落地的分工。`
        }
      ];
    } else if (user.id === 2) { // Li Yutong
      return [
        {
          side: "right",
          text: `你好，我是 ${CURRENT_USER.name} 的商务秘书 Agent。我的主理人正在负责 ${CURRENT_USER.project}，我们正在寻找具备全球视野的投资合作伙伴。`
        },
        {
          side: "left",
          text: `你好！我是${user.name}的${user.agentType}。${user.name}非常关注 ${user.tags[1]} 赛道的早期项目，特别是能结合垂直产业落地的创新应用。请问你们目前的 BP 是否已经准备好？`
        },
        {
          side: "right",
          text: `我们的 BP 已经准备就绪，重点展示了我们在时尚产业的数据壁垒和商业化路径。这非常契合${user.name}关注的赛道，希望能有机会深入交流。`
        }
      ];
    } else if (user.id === 3) { // Wang Haifeng (Direct Chat)
      return [
        {
          side: "right",
          text: `下周的战略课小组作业我们几号对一下？`
        },
        {
          side: "left",
          text: `周三晚上怎么样？我正好有空。`
        },
        {
          side: "right",
          text: `可以，那我们约在图书馆研讨室？`
        }
      ];
    }
    // Default Fallback
    return [
      {
        side: "right",
        text: `你好，我是 ${CURRENT_USER.name} 的 Agent。我对${user.name}的背景很感兴趣，希望能建立联系。`
      },
      {
        side: "left",
        text: `你好！我是${user.name}的 Agent。很高兴收到你的消息，${user.name}目前主要关注${user.tags[0]}领域，请问有什么可以帮你的？`
      }
    ];
  };

  const messages = getChatMessages();

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden relative">
      {/* 1. Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0 z-50 h-[60px]">
        <div className="cursor-pointer" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-black leading-tight">
             {user.id === 3 ? user.name : "Agent 对话"}
          </h2>
          <p className="text-xs text-gray-500 truncate">
             {user.id === 3 ? "在线" : `我的 Agent 正在与 ${user.name} 的 ${user.agentType} 沟通`}
          </p>
        </div>
      </div>

      {/* 2. Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 pb-20 mt-[60px] mb-[64px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.side === 'right' ? 'flex-row-reverse' : 'items-start'} gap-3`}>
            {user.id !== 3 && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.side === 'right' ? 'bg-blue-600' : 'bg-white border border-gray-200'}`}>
                <Bot className={`w-6 h-6 ${msg.side === 'right' ? 'text-white' : 'text-gray-700'}`} />
              </div>
            )}
            {user.id === 3 && (
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 ${msg.side === 'right' ? 'bg-gray-100' : 'bg-white'}`}>
                  {msg.side === 'right' ? (
                     <User className="w-6 h-6 text-gray-500" />
                  ) : (
                     <img src={user.image} className="w-full h-full object-cover" alt="" />
                  )}
               </div>
            )}
            <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${
              msg.side === 'right' 
                ? (user.id === 3 ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-blue-600 text-white rounded-tr-none')
                : (user.id === 3 ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100')
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Input Area */}
      <div className="absolute bottom-16 left-0 right-0 w-full bg-white border-t border-gray-200 px-3 z-50 h-[64px] flex items-center justify-center">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-full">
          <input 
            type="text" 
            placeholder="介入对话..." 
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700"
          />
          <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Send className="w-4 h-4 text-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="w-full bg-white border-t border-gray-200 shrink-0 z-50">
        <div className="w-full max-w-md mx-auto flex items-center justify-around h-16 px-4">
          <div 
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${currentView === 'discovery' ? 'text-[#1A365D]' : 'text-gray-400'}`}
            onClick={() => setCurrentView('discovery')}
          >
            <Bot className="w-6 h-6" />
            <span className="text-[10px] font-medium">发现</span>
          </div>
          <div 
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${currentView === 'programs-list' ? 'text-[#1A365D]' : 'text-gray-400'}`}
            onClick={() => setCurrentView('programs-list')}
          >
            <Building2 className="w-6 h-6" />
            <span className="text-[10px] font-medium">找项目</span>
          </div>
          <div 
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${currentView === 'message-center' ? 'text-[#1A365D]' : 'text-gray-400'}`}
            onClick={() => setCurrentView('message-center')}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">消息</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">我的</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Circle Detail View Component ---
function CircleDetailView({ user, onBack }: any) {
  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* 1. Header with Cover Image */}
      <div className="relative h-48 w-full bg-gradient-to-r from-blue-900 to-indigo-900 shrink-0">
        <div className="absolute top-0 left-0 w-full p-4 pt-safe flex items-center justify-between z-10">
          <div className="cursor-pointer bg-black/20 backdrop-blur-md p-2 rounded-full" onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            热度: 95°
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h1 className="text-2xl font-bold text-white mb-1">{user.circleName}</h1>
          <p className="text-white/80 text-xs">{user.circleDesc || "高质量行业交流圈"}</p>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 bg-gray-50 -mt-4 rounded-t-3xl relative z-20 overflow-y-auto p-4 space-y-6">
        
        {/* Members Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">圈内成员 (128)</h3>
            <span className="text-xs text-blue-600 font-medium">查看全部</span>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {/* Contextual Member 1: Selected User (First) */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-12 h-12 rounded-full border-2 border-blue-600 p-0.5">
                <img src={user.image} className="w-full h-full rounded-full object-cover" alt={user.name} />
              </div>
              <span className="text-[10px] text-gray-700 font-medium w-12 truncate text-center">{user.name}</span>
            </div>
             {/* Other Members (Mock) */}
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                 <img src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="" />
                 <span className="text-[10px] text-gray-500 w-12 truncate text-center">User{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities (Mock) */}
        <div className="space-y-3">
            <h3 className="font-bold text-gray-900 px-1">近期活动</h3>
            {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                        <Activity className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-900 mb-1">本周六{user.circleName.includes("羽毛球") ? "深圳湾体育中心约球" : "高端线下交流会"}</h4>
                        <p className="text-xs text-gray-500 mb-2">时间：10月{12+i}日 14:00-16:00</p>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] rounded font-medium">报名中</span>
                            <span className="text-[10px] text-gray-400">5/8人</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 3. Bottom CTA */}
      <div className="w-full bg-white border-t border-gray-200 p-4 pb-safe shrink-0 z-30">
        <button className="w-full bg-[#1A365D] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-transform">
            加入圈子 / 发布活动
        </button>
      </div>
    </div>
  );
}

// --- Certification Page Component ---
function CertificationPage({ user, onBack, onCertify, showActionSheet, onCloseActionSheet }: any) {
  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden relative">
      {/* 1. Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-black" />
          <span className="text-lg font-bold text-black">认证与评价</span>
        </div>
        <MoreHorizontal className="w-6 h-6 text-gray-400" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        {/* 2. Profile Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <img src={user.image} className="w-16 h-16 rounded-full object-cover" alt={user.name} />
            <div>
              <h2 className="text-xl font-bold text-black">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{user.title}</p>
              <div className="flex items-center gap-1 mt-1 text-gray-600 text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{user.education}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-3 divide-x divide-gray-200">
            <div className="flex flex-col items-center gap-1">
              <User className="w-4 h-4 text-blue-600" />
              <div className="text-sm font-bold">{user.authCount}</div>
              <div className="text-[10px] text-gray-500">人认证身份</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <div className="text-sm font-bold">15</div>
              <div className="text-[10px] text-gray-500">条关系描述</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <div className="text-sm font-bold">12</div>
              <div className="text-[10px] text-gray-500">条评价</div>
            </div>
          </div>
        </div>

        {/* 3. CTA Card */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600 fill-blue-600" />
            <span className="font-bold text-black">认证 TA 的身份</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">你认识 {user.name} 吗？帮 TA 认证身份，提升可信度</p>
          <button 
            onClick={onCertify}
            className="w-full bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 font-medium active:scale-[0.98] transition-transform"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <Check className="w-3 h-3 text-blue-600 stroke-[4]" />
            </div>
            我认证 TA 的身份
          </button>
        </div>

        {/* 4. Tags Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-black">标签印象</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <TagPill icon="🔥" text="核心人脉" count={18} highlight="red" />
            <TagPill icon="🎓" text="同校校友" count={14} highlight="blue" />
            <TagPill icon="🏆" text="超级学霸" count={11} />
            <TagPill icon="🌿" text="高尔夫老炮" count={9} />
            <TagPill icon="🤝" text="靠谱合作者" count={8} />
            <TagPill icon="🧭" text="创业导师" count={6} />
            <TagPill icon="🥂" text="社交达人" count={5} />
            <TagPill icon="🧠" text="行业专家" count={5} />
          </div>
        </div>

        {/* 5. Relationships Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-black">关系描述</span>
            </div>
            <span className="text-xs text-gray-400">15条</span>
          </div>
          <div className="space-y-4">
            <RelationshipItem 
              name="李雨桐" 
              tag="合作伙伴" 
              content={`与${user.name}在AI芯片领域最重要的合作伙伴，非常靠谱，执行力极强。`}
              time="3天前"
              avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            />
            <div className="h-px bg-gray-50" />
            <RelationshipItem 
              name="王海峰" 
              tag="同班同学" 
              content="中欧EMBA长青班的同学，一起做过课题项目，思维敏捷。" 
              time="1周前"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />
          </div>
        </div>

        {/* 6. Evaluations Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-black">评价</span>
            </div>
            <span className="text-xs text-gray-400">12条</span>
          </div>
          <div className="space-y-4">
            <EvaluationItem 
              name="李雨桐" 
              content={`${user.name}非常有商业洞察力，对行业趋势的判断总是很准确，合作过几个项目都很愉快，强烈推荐！`}
              time="2天前"
              likes={6}
              avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            />
             <div className="h-px bg-gray-50" />
            <EvaluationItem 
              name="匿名校友" 
              isAnonymous 
              content="球场上很拼，做事也很拼，是个值得信赖的人。虽然高尔夫差了点哈哈。" 
              time="5天前"
              likes={3}
            />
          </div>
        </div>
      </div>

      {/* 7. Sticky Footer Info */}
      <div className="w-full bg-[#EBF5FF] p-3 flex items-start gap-2 text-xs text-gray-600 shrink-0">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>认证身份能帮助建立真实可信，让 Agent 更聪明地决策。你可以随时修改或撤销。</p>
      </div>

      {/* Action Sheet Modal */}
      <AnimatePresence>
        {showActionSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={onCloseActionSheet}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 h-[85vh] flex flex-col"
            >
              {/* Handle */}
              <div className="w-full flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Modal Header */}
              <div className="px-6 pb-4 text-center border-b border-gray-100">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-200">
                  <Check className="w-6 h-6 text-white stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1">已认证身份，再补充一下吧</h3>
                <p className="text-xs text-gray-400">帮助 Agent 更懂你们的关系</p>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Step 1 */}
                <section>
                  <SectionTitle number="1" title="你们是什么关系？" />
                  <div className="flex flex-wrap gap-3 mt-3">
                    {["同班同学", "同校校友", "合作伙伴", "老朋友", "业务上下游", "投资人", "同事", "师兄/师姐"].map(rel => (
                      <button key={rel} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        {rel}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Step 2 */}
                <section>
                  <SectionTitle number="2" title="补充描述（可选）" />
                  <div className="relative mt-3">
                    <textarea 
                      className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="描述你和 TA 的关系，例如一起做过什么项目..."
                    />
                    <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </section>

                {/* Step 3 */}
                <section>
                  <SectionTitle number="3" title="给 TA 贴标签（可选）" />
                  <div className="flex flex-wrap gap-2 mt-3">
                     <TagPill icon="🔥" text="超级人脉王" />
                     <TagPill icon="🥝" text="网球达人" />
                     <TagPill icon="🏆" text="超级学霸" />
                     <TagPill icon="🌿" text="高尔夫老炮" />
                     <TagPill icon="🤝" text="靠谱合作者" />
                  </div>
                </section>

                {/* Step 4 */}
                <section>
                  <SectionTitle number="4" title="写一句评价（可选）" />
                  <div className="mt-3">
                    <textarea 
                      className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="对 TA 的评价..."
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
                      </div>
                      <span className="text-xs text-gray-500">匿名评价</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-white pb-safe">
                <button 
                    className="w-full bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 font-bold text-lg mb-4 shadow-lg shadow-blue-200"
                    onClick={() => {
                        onCloseActionSheet();
                        onBack();
                    }}
                >
                  <Send className="w-5 h-5" />
                  提交
                </button>
                <div className="text-center">
                  <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-600" onClick={onCloseActionSheet}>跳过，仅认证身份</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components
const TagPill = ({ icon, text, count, highlight }: any) => (
  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border ${highlight === 'red' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-200'}`}>
    <span className="text-xs">{icon}</span>
    <span className={`text-xs ${highlight === 'red' ? 'text-red-600 font-bold' : 'text-gray-600'}`}>{text}</span>
    {count && <span className={`text-xs font-bold ${highlight === 'red' ? 'text-red-500' : highlight === 'blue' ? 'text-blue-500' : 'text-blue-500'}`}>{count}</span>}
  </div>
);

const RelationshipItem = ({ name, tag, content, time, avatar }: any) => (
  <div className="flex gap-3">
    <img src={avatar} className="w-10 h-10 rounded-full object-cover shrink-0" alt="" />
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-sm text-black">{name}</span>
        <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">{tag}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-1">{content}</p>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  </div>
);

const EvaluationItem = ({ name, isAnonymous, content, time, likes, avatar }: any) => (
  <div className="flex gap-3">
    {isAnonymous ? (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <User className="w-5 h-5 text-gray-400" />
      </div>
    ) : (
      <img src={avatar} className="w-10 h-10 rounded-full object-cover shrink-0" alt="" />
    )}
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className={`font-bold text-sm ${isAnonymous ? 'text-gray-500' : 'text-black'}`}>{name}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-2">{content}</p>
      <div className="flex items-center gap-1 text-blue-600">
        <ThumbsUp className="w-3.5 h-3.5" />
        <span className="text-xs font-bold">{likes}</span>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ number, title }: any) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{number}</div>
    <span className="font-bold text-black text-sm">{title}</span>
  </div>
);

// --- Notification Detail View Component ---
function NotificationDetailView({ notification, onBack }: any) {
  return (
    <div className="h-full w-full bg-white flex flex-col font-sans overflow-hidden">
      {/* 1. Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </div>
        <MoreHorizontal className="w-6 h-6 text-gray-400" />
      </div>

      {/* 2. Article Content */}
      <div className="flex-1 overflow-y-auto pb-safe">
        {/* Article Header */}
        <div className="px-4 mt-4">
          <h1 className="text-2xl font-bold text-gray-900 leading-relaxed mb-4">
            {notification.title}
          </h1>
          <div className="flex items-center text-sm mb-6">
            <span className="text-blue-600 font-medium mr-3">{notification.sender}</span>
            <span className="text-gray-400">{notification.time}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full h-48 sm:h-64 mb-6">
          <img 
            src={notification.coverImage} 
            className="w-full h-full object-cover" 
            alt="Cover" 
          />
        </div>

        {/* Article Body */}
        <div className="px-4 space-y-6">
          <p className="text-base text-gray-800 leading-loose">
            {notification.summary}
          </p>
          <p className="text-base text-gray-800 leading-loose">
            {notification.content}
          </p>
          <p className="text-base text-gray-800 leading-loose">
            (这里是模拟的更多正文内容... 比如详细的议程安排、嘉宾介绍、或是BP的核心亮点展示。为了保持排版舒适，我们使用了较大的行高和段落间距。)
          </p>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mt-8">
            <p className="text-sm text-gray-500 text-center">
              本文由 {notification.sender} 发布，仅供 MBAi 校友内部交流。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Program Detail View Component ---
function ProgramDetailView({ program, onBack }: any) {
  const [activeTab, setActiveTab] = useState('threshold');

  return (
    <div className="h-full w-full bg-white flex flex-col font-sans overflow-hidden relative">
      {/* 1. Hero Section */}
      <div className="relative h-64 w-full shrink-0">
        <div className="absolute inset-0">
          <img src={program.coverImage} className="w-full h-full object-cover" alt={program.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        
        {/* Nav Bar */}
        <div className="absolute top-0 left-0 w-full p-4 pt-safe flex items-center justify-between z-10">
          <div className="cursor-pointer bg-black/20 backdrop-blur-md p-2 rounded-full" onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
          <div className="flex gap-3">
             <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
               <Share2 className="w-5 h-5 text-white" />
             </div>
             <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
               <MoreHorizontal className="w-5 h-5 text-white" />
             </div>
          </div>
        </div>

        {/* Title Area */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          {program.isPremium && (
             <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-yellow-500/30 px-3 py-1 rounded-full w-max mb-3">
               <Crown className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
               <span className="text-xs font-bold text-yellow-500 tracking-wide">{program.tierLabel}</span>
             </div>
          )}
          {!program.isPremium && (
             <div className="flex items-center gap-1.5 bg-blue-600 px-3 py-1 rounded-full w-max mb-3">
               <span className="text-xs font-bold text-white tracking-wide">{program.tierLabel}</span>
             </div>
          )}
          <h1 className="text-2xl font-bold text-white leading-tight shadow-sm">{program.name}</h1>
        </div>
      </div>

      {/* 2. Content Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-white pb-24">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border-b border-gray-100">
          <div className="bg-white p-5 flex flex-col items-center justify-center text-center gap-1">
             <span className="text-xs text-gray-400">学费总额</span>
             <span className="text-lg font-bold text-gray-900">{program.tuition}</span>
          </div>
          <div className="bg-white p-5 flex flex-col items-center justify-center text-center gap-1">
             <span className="text-xs text-gray-400">平均录取率</span>
             <span className={`text-xl font-extrabold ${program.isPremium ? 'text-yellow-600' : 'text-blue-600'}`}>{program.acceptanceRate}</span>
          </div>
          <div className="bg-white p-5 flex flex-col items-center justify-center text-center gap-1">
             <span className="text-xs text-gray-400">授课语言</span>
             <span className="text-sm font-bold text-gray-900">{program.language}</span>
          </div>
          <div className="bg-white p-5 flex flex-col items-center justify-center text-center gap-1">
             <span className="text-xs text-gray-400">上课地点</span>
             <span className="text-sm font-bold text-gray-900">{program.location}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 bg-white z-20 border-b border-gray-100 flex">
          {['threshold', 'curriculum', 'admission'].map((tab) => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center text-sm font-bold relative cursor-pointer ${activeTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {tab === 'threshold' && '项目门槛'}
              {tab === 'curriculum' && '课程安排'}
              {tab === 'admission' && '录取程序'}
              {activeTab === tab && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${program.isPremium ? 'bg-yellow-500' : 'bg-blue-600'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'threshold' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <UserCheck className="w-5 h-5 text-gray-600" />
                   申请资格
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    大学本科毕业后有8年以上工作经验
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    其中需要有4年以上核心管理岗位经验
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    所在企业年营业额建议在5亿人民币以上
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-gray-600" />
                   核心优势
                </h3>
                <div className="flex flex-wrap gap-2">
                   {program.tags.map((tag: string) => (
                     <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'curriculum' && (
             <div className="text-center py-10 text-gray-400 text-sm">课程模块详情内容...</div>
          )}
          {activeTab === 'admission' && (
             <div className="text-center py-10 text-gray-400 text-sm">录取流程详情内容...</div>
          )}
        </div>
      </div>

      {/* 3. Sticky Bottom CTA */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-safe z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex gap-3">
         <button className="flex-1 bg-white border border-gray-200 text-gray-900 font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
           <Globe className="w-4 h-4" />
           访问官网直申
         </button>
         <button 
           className={`flex-[1.5] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-lg ${program.isPremium ? 'bg-gradient-to-r from-gray-900 to-gray-800 shadow-yellow-900/10' : 'bg-blue-600 shadow-blue-900/20'}`}
           onClick={() => alert("正在为您接通资深 MBA 升学顾问...")}
         >
           <UserCheck className="w-5 h-5" />
           直联官方升学顾问
         </button>
      </div>
    </div>
  );
}

// --- Program Compare View Component ---
function ProgramCompareView({ compareList, onBack }: any) {
  const [showConsultModal, setShowConsultModal] = useState(false);

  const handleConsultClick = () => {
    setShowConsultModal(true);
  };

  const handleConfirmConsult = () => {
    setShowConsultModal(false);
    // Simulate jump to WeChat
    console.log("Jumping to WeChat...");
    alert("正在跳转微信...");
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 z-40">
        <div className="cursor-pointer p-1" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </div>
        <h2 className="text-lg font-bold text-black">项目多维对比</h2>
        <div className="w-8" /> 
      </div>

      {/* Comparison Matrix */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="min-w-full bg-white">
           {/* 1. Header Row (Logos) */}
           <div className="flex border-b border-gray-200">
             <div className="w-24 shrink-0 bg-gray-50 p-4 flex items-center justify-center text-xs font-bold text-gray-400 border-r border-gray-100">
                对比维度
             </div>
             {compareList.map((prog: any) => (
               <div key={prog.id} className="flex-1 p-4 flex flex-col items-center text-center border-r border-gray-100 last:border-r-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-gray-100 shadow-sm">
                    <img src={prog.coverImage} className="w-full h-full object-cover" alt="" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 line-clamp-2 h-8">{prog.name}</span>
               </div>
             ))}
           </div>

           {/* 2. Data Rows */}
           {[
             { label: '所属梯队', key: 'tierLabel', icon: <Crown className="w-3.5 h-3.5" /> },
             { label: '学费总额', key: 'tuition', icon: <Banknote className="w-3.5 h-3.5" /> },
             { label: '录取率', key: 'acceptanceRate', icon: <Scale className="w-3.5 h-3.5" /> },
             { label: '授课语言', key: 'language', icon: <Globe className="w-3.5 h-3.5" /> },
             { label: '上课地点', key: 'location', icon: <MapPin className="w-3.5 h-3.5" /> },
           ].map((row, idx) => (
             <div key={idx} className={`flex border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="w-24 shrink-0 p-4 flex flex-col justify-center gap-1 border-r border-gray-100">
                   <div className="flex items-center gap-1 text-gray-400">
                      {row.icon}
                      <span className="text-xs font-medium">{row.label}</span>
                   </div>
                </div>
                {compareList.map((prog: any) => (
                  <div key={prog.id} className="flex-1 p-4 flex items-center justify-center text-center border-r border-gray-100 last:border-r-0">
                     <span className={`text-sm ${row.key === 'acceptanceRate' ? 'font-bold text-black' : 'text-gray-700'}`}>
                       {prog[row.key]}
                     </span>
                  </div>
                ))}
             </div>
           ))}

           {/* 3. Footer Action Row */}
           <div className="flex border-b border-gray-200">
             <div className="w-24 shrink-0 bg-gray-50 border-r border-gray-100" />
             {compareList.map((prog: any) => (
               <div key={prog.id} className="flex-1 p-4 border-r border-gray-100 last:border-r-0">
                  <button 
                    className="w-full bg-blue-50 text-blue-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={handleConsultClick}
                  >
                    咨询该项目
                  </button>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Consult Modal */}
      <AnimatePresence>
        {showConsultModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowConsultModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 mb-2">即将跳转</h3>
                   <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                     正在为您创建申请顾问咨询群<br/>点击确定后跳转微信
                   </p>
                   <div className="flex gap-3 w-full">
                     <button 
                       className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50"
                       onClick={() => setShowConsultModal(false)}
                     >
                       取消
                     </button>
                     <button 
                       className="flex-1 py-3 rounded-xl bg-green-600 text-white text-sm font-bold shadow-lg shadow-green-200 hover:bg-green-700"
                       onClick={handleConfirmConsult}
                     >
                       确定
                     </button>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Program List View Component ---
function ProgramListView({ onProgramClick, compareList, onAddToCompare, onStartCompare, onRemoveFromCompare, onBack }: any) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({
    tier: ['全部梯队'],
    location: ['全部地区'],
    tuition: ['不限'],
    more: []
  });
  const [tempFilters, setTempFilters] = useState<string[]>([]);

  const filters = {
    tier: ['全部梯队', 'T1 第一梯队', 'T2 第二梯队', 'T3 潜力院校'],
    location: ['全部地区', '北京', '上海', '深圳', '香港', '海外'],
    tuition: ['不限', '30万以下', '30-50万', '50-80万', '80万以上'],
    more: ['更多筛选']
  };

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
      setTempFilters(appliedFilters[filter] || []);
    }
  };

  const handleOptionClick = (option: string) => {
    let newTemp = [...tempFilters];
    const isAllOption = option.includes('全部') || option.includes('不限');

    if (isAllOption) {
      newTemp = [option];
    } else {
      newTemp = newTemp.filter(t => !t.includes('全部') && !t.includes('不限'));
      if (newTemp.includes(option)) {
        newTemp = newTemp.filter(t => t !== option);
      } else {
        newTemp.push(option);
      }
      if (newTemp.length === 0) {
         const allOption = filters[activeFilter as keyof typeof filters].find(o => o.includes('全部') || o.includes('不限'));
         if (allOption) newTemp = [allOption];
      }
    }
    setTempFilters(newTemp);
  };

  const handleConfirm = () => {
    if (activeFilter) {
      setAppliedFilters({
        ...appliedFilters,
        [activeFilter]: tempFilters
      });
      setActiveFilter(null);
    }
  };

  const handleReset = () => {
    if (activeFilter) {
        const allOption = filters[activeFilter as keyof typeof filters].find(o => o.includes('全部') || o.includes('不限'));
        setTempFilters(allOption ? [allOption] : []);
    }
  };

  // Filter Logic
  const filteredPrograms = MOCK_PROGRAMS.filter(prog => {
    // Tier Filter
    const tierFilter = appliedFilters.tier;
    if (tierFilter && tierFilter.length > 0 && !tierFilter.some(t => t.includes('全部'))) {
        const match = tierFilter.some(t => t.includes(prog.tier));
        if (!match) return false;
    }
    
    // Location Filter
    const locationFilter = appliedFilters.location;
    if (locationFilter && locationFilter.length > 0 && !locationFilter.some(t => t.includes('全部'))) {
        const match = locationFilter.some(city => prog.location.includes(city));
        if (!match) return false;
    }
    
    return true;
  });

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden relative">
       {/* 1. Sticky Filter Bar */}
       <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {Object.keys(filters).map((key) => {
               const labelMap: Record<string, string> = { tier: '梯队', location: '地区', tuition: '学费', more: '更多' };
               const isActive = activeFilter === key;
               const hasSelection = appliedFilters[key] && !appliedFilters[key].some(t => t.includes('全部') || t.includes('不限'));
               
               return (
                <div 
                  key={key}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${isActive || hasSelection ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleFilterClick(key)}
                >
                   {labelMap[key]} <ChevronDown className={`w-3 h-3 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                </div>
               );
            })}
          </div>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {activeFilter && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 w-full h-screen bg-black/20 z-10"
                  onClick={() => setActiveFilter(null)}
                />
                {/* Dropdown Content */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-20 rounded-b-2xl overflow-hidden"
                >
                  <div className="py-2 grid grid-cols-2 gap-2 p-4 max-h-[60vh] overflow-y-auto">
                    {filters[activeFilter as keyof typeof filters]?.map((option) => {
                      const isSelected = tempFilters.includes(option);
                      return (
                        <div 
                          key={option} 
                          className={`px-3 py-3 text-sm rounded-lg cursor-pointer flex items-center justify-between border transition-colors ${isSelected ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold' : 'bg-white border-gray-50 text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                          {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50">
                     <button 
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold bg-white active:scale-95 transition-transform"
                        onClick={handleReset}
                     >
                        重置
                     </button>
                     <button 
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
                        onClick={handleConfirm}
                     >
                        确定
                     </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
       </div>

       {/* 2. Program Feed */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
          {filteredPrograms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Building2 className="w-12 h-12 mb-3 text-gray-200" />
                  <p className="text-sm">没有找到符合条件的项目</p>
                  <button onClick={() => setAppliedFilters({ tier: ['全部梯队'], location: ['全部地区'], tuition: ['不限'], more: [] })} className="mt-4 text-blue-600 text-sm font-bold">
                      清除筛选
                  </button>
              </div>
          ) : (
            filteredPrograms.map((prog) => {
             const isComparing = compareList.some((p: any) => p.id === prog.id);
             return (
               <div 
                 key={prog.id}
                 onClick={() => onProgramClick(prog)}
                 className={`relative bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.99] transition-transform cursor-pointer border ${prog.isPremium ? 'border-yellow-500/20' : 'border-gray-100'}`}
               >
                 {/* Premium Background Effect */}
                 {prog.isPremium && <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent pointer-events-none" />}

                 <div className="flex p-4 gap-4 relative z-0">
                    {/* Cover Image */}
                    <div className="w-24 h-32 shrink-0 rounded-xl overflow-hidden shadow-sm">
                       <img src={prog.coverImage} className="w-full h-full object-cover" alt={prog.name} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                       <div>
                          {/* Tier Badge */}
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 ${prog.isPremium ? 'bg-gray-900 text-yellow-500' : 'bg-blue-50 text-blue-600'}`}>
                             {prog.isPremium && <Crown className="w-3 h-3 fill-yellow-500" />}
                             {prog.tierLabel}
                          </div>
                          
                          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-2">
                             {prog.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                             <MapPin className="w-3 h-3" />
                             {prog.location}
                          </div>
                       </div>

                       <div className="flex items-end justify-between">
                          <div className="flex flex-col">
                             <span className="text-[10px] text-gray-400">学费</span>
                             <span className="text-sm font-bold text-red-600">{prog.tuition}</span>
                          </div>
                          
                          {/* Add to Compare Button */}
                          <button 
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isComparing ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500'}`}
                            onClick={(e) => {
                               e.stopPropagation();
                               if (isComparing) {
                                  onRemoveFromCompare(prog);
                               } else {
                                  onAddToCompare(prog);
                               }
                            }}
                          >
                             {isComparing ? <Check className="w-4 h-4 stroke-[3]" /> : <Scale className="w-4 h-4" />}
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
             );
          })
        )}
       </div>

       {/* 3. Floating VS Button */}
       <AnimatePresence>
         {compareList.length > 0 && (
           <motion.div 
             initial={{ y: 100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 100, opacity: 0 }}
             className="absolute bottom-20 left-0 right-0 flex justify-center z-50 pointer-events-none"
           >
              <button 
                 onClick={onStartCompare}
                 className="pointer-events-auto bg-black text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-black/20 flex items-center gap-2 active:scale-95 transition-transform"
              >
                 <Scale className="w-4 h-4 text-yellow-400" />
                 开始对比 ({compareList.length}/2)
              </button>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Bottom Navigation (Included in Main Layout, but this view needs padding-bottom) */}
    </div>
  );
}

// --- Message Center View Component ---
function MessageCenterView({ onBack, onChatClick, onNotificationClick, activeTab, onTabChange }: any) {

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* 1. Top Navigation Bar */}
      <div className="w-full bg-white px-4 py-3 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-6">
          <div 
            className={`text-xl font-bold relative cursor-pointer transition-colors ${activeTab === 'messages' ? 'text-black' : 'text-gray-300'}`}
            onClick={() => onTabChange('messages')}
          >
            消息
             {activeTab === 'messages' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black rounded-full" />}
          </div>
          <div 
            className={`text-xl font-bold relative cursor-pointer transition-colors ${activeTab === 'notifications' ? 'text-black' : 'text-gray-300'}`}
            onClick={() => onTabChange('notifications')}
          >
            通知
            <div className="absolute top-0 -right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            {activeTab === 'notifications' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black rounded-full" />}
          </div>
        </div>
        <div 
          className="p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={onBack}
        >
           <User className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* 2. Content Area */}
      <div className={`flex-1 overflow-y-auto ${activeTab === 'notifications' ? 'bg-gray-100' : 'bg-gray-50'}`}>
        {activeTab === 'messages' ? (
          // Message List
          <div className="p-4 space-y-3">
            {MOCK_MESSAGES.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => onChatClick(msg)}
                className="w-full bg-white rounded-2xl p-4 flex gap-3 shadow-sm active:bg-gray-50 transition-colors relative overflow-hidden"
              >
                {msg.isAgentRecommended && (
                   <div className="absolute top-0 left-0 bg-black text-white text-[10px] px-2 py-1 rounded-br-lg font-medium z-10">
                     分身推荐
                   </div>
                )}

                <div className="relative shrink-0">
                  <img src={msg.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt={msg.name} />
                  {msg.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold">
                      {msg.unreadCount}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 pt-1">
                   <div className="flex items-center justify-between mb-1">
                     <h3 className="font-bold text-base text-gray-900 truncate pr-2">{msg.name}</h3>
                     <span className="text-xs text-gray-400 shrink-0">{msg.time}</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate leading-relaxed">{msg.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Notification List
          <div className="p-4 space-y-6">
            {MOCK_NOTIFICATIONS.map((notice) => (
              <div key={notice.id} className="flex flex-col gap-3">
                {/* Time Badge */}
                <div className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-md mx-auto w-max">
                  {notice.time}
                </div>
                
                {/* Card */}
                <div 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                  onClick={() => onNotificationClick(notice)}
                >
                  <div className="w-full h-40 relative">
                    <img src={notice.coverImage} className="w-full h-full object-cover" alt={notice.title} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{notice.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">{notice.summary}</p>
                    
                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{notice.sender}</span>
                      <span className="text-sm text-gray-500 font-medium">查看详情 {'>'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="w-full bg-white border-t border-gray-200 shrink-0 z-50">
        <div className="w-full max-w-md mx-auto flex items-center justify-around h-16 px-4">
          <div className="flex flex-col items-center justify-center gap-1 text-gray-400" onClick={onBack}>
            <Bot className="w-6 h-6" />
            <span className="text-[10px] font-medium">发现</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-[#1A365D]">
            <MessageCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">消息</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">我的</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscoveryRedesign({ initialView = 'discovery' }: { initialView?: 'discovery' | 'programs-list' }) {
  const [currentView, setCurrentView] = useState<'discovery' | 'agent-chat' | 'circle-detail' | 'message-center' | 'notification-detail' | 'programs-list' | 'program-detail' | 'program-compare'>(initialView);
  const [returnView, setReturnView] = useState<'discovery' | 'message-center' | 'programs-list'>('discovery');
  const [messageTab, setMessageTab] = useState<'messages' | 'notifications'>('messages');
  const [showCertification, setShowCertification] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeNotice, setActiveNotice] = useState<any>(null);
  const [activeProgram, setActiveProgram] = useState<any>(null);
  const [compareList, setCompareList] = useState<any[]>([]);

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  const handleCertificationClick = (user: any) => {
    setSelectedUser(user);
    setShowCertification(true);
  };

  const handleAgentChatClick = (user: any) => {
    setSelectedUser(user);
    setReturnView('discovery');
    setCurrentView('agent-chat');
  };

  const handleCircleClick = (user: any) => {
    setSelectedUser(user);
    setCurrentView('circle-detail');
  };

  const handleMessageItemClick = (msg: any) => {
    const user = MOCK_USERS.find(u => u.id === msg.id) || {
        id: msg.id,
        name: msg.name,
        title: msg.title,
        agentType: "Agent",
        company: "公司",
        position: "职位",
        tags: [{ text: "通用领域", color: "gray" }],
        image: msg.avatar,
        agents: [{ name: "Agent", status: "在线", type: "business" }]
    };
    setSelectedUser(user);
    setReturnView('message-center');
    setCurrentView('agent-chat');
  };

  const handleNotificationClick = (notice: any) => {
    setActiveNotice(notice);
    setMessageTab('notifications');
    setCurrentView('notification-detail');
  };

  const handleProgramClick = (prog: any) => {
    setActiveProgram(prog);
    setCurrentView('program-detail');
  };

  const handleAddToCompare = (prog: any) => {
    if (compareList.length >= 2) {
      alert("最多只能对比两个项目");
      return;
    }
    setCompareList([...compareList, prog]);
  };

  const handleRemoveFromCompare = (prog: any) => {
    setCompareList(compareList.filter(p => p.id !== prog.id));
  };

  const handleStartCompare = () => {
    setCurrentView('program-compare');
  };

  if (currentView === 'agent-chat' && selectedUser) {
    return <AgentChatView user={selectedUser} onBack={() => setCurrentView(returnView as any)} currentView={currentView} setCurrentView={setCurrentView} />;
  }

  if (currentView === 'circle-detail' && selectedUser) {
    return <CircleDetailView user={selectedUser} onBack={() => setCurrentView('discovery')} />;
  }

  if (currentView === 'message-center') {
    return (
      <MessageCenterView 
        activeTab={messageTab}
        onTabChange={setMessageTab}
        onBack={() => setCurrentView('discovery')} 
        onChatClick={handleMessageItemClick}
        onNotificationClick={handleNotificationClick}
      />
    );
  }

  if (currentView === 'notification-detail' && activeNotice) {
    return <NotificationDetailView notification={activeNotice} onBack={() => setCurrentView('message-center')} />;
  }

  if (currentView === 'program-detail' && activeProgram) {
    return <ProgramDetailView program={activeProgram} onBack={() => setCurrentView('programs-list')} />;
  }

  if (currentView === 'program-compare') {
    return <ProgramCompareView compareList={compareList} onBack={() => setCurrentView('programs-list')} />;
  }

  if (showCertification && selectedUser) {
    return (
      <CertificationPage 
        user={selectedUser} 
        onBack={() => setShowCertification(false)}
        onCertify={() => setShowActionSheet(true)}
        showActionSheet={showActionSheet}
        onCloseActionSheet={() => setShowActionSheet(false)}
      />
    );
  }

  // --- Main Layout Render ---
  return (
    <div className="h-full w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Top Navigation Bar - Full Width Fixed (Visible on Discovery, Programs, Class, Circles, Profile) */}
      <div className="w-full flex items-center justify-center border-b border-gray-200 bg-white shrink-0 z-50">
        <div className="w-full max-w-md px-4 py-3 flex items-center justify-between">
          <div className="text-[#1A365D] font-extrabold text-2xl tracking-tight">MBAi</div>
          <div 
            className="relative cursor-pointer"
            onClick={() => setCurrentView('message-center')}
          >
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none px-1.5 py-[2px] rounded-full border-2 border-white">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex justify-center overflow-hidden pb-16">
        <div className="w-full max-w-md flex flex-col h-full">
          {currentView === 'discovery' ? (
            /* Discovery Feed */
            <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 px-4 pt-4">
            {MOCK_USERS.map((user) => (
              <div key={user.id} className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
                {/* Photo Section */}
                <div className="relative w-full h-[420px]">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-t-2xl object-top"
                  />
                </div>

                {/* Header Section */}
                <div className="p-4 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-black font-bold text-2xl tracking-tight">{user.name}</div>
                    <div 
                      onClick={() => handleCertificationClick(user)} 
                      className="flex items-center gap-1 bg-[#1E7145] text-white rounded-md px-2 py-1 cursor-pointer hover:bg-[#155d38] transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{user.authCount}人认证</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 text-sm mt-1 font-normal">
                    {user.title}
                  </div>

                  {/* Education Section */}
                  <div className="flex items-center my-3">
                    <GraduationCap className="w-5 h-5 text-[#1A365D] mr-2 shrink-0" />
                    <div className="text-gray-700 text-sm leading-tight">
                      {user.education}
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {user.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`border rounded-full px-3 py-1 text-xs font-medium bg-white ${
                          tag.color === 'blue' 
                            ? 'border-blue-500 text-blue-600' 
                            : 'border-gray-300 text-gray-600'
                        }`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>

                  {/* AI Summary Box */}
                  <div className="bg-indigo-50 rounded-xl p-4 my-4 border border-indigo-100/50">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-indigo-800" />
                      <span className="font-bold text-xs text-indigo-800">
                        AI 推荐摘要
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2 text-justify">
                      {user.aiSummary}
                    </p>
                  </div>

                  {/* Agent Bots Section */}
                  <div className="grid grid-cols-2 gap-3">
                    {user.agents.map((agent, idx) => (
                      <div 
                          key={idx} 
                          className="bg-white border border-gray-200 rounded-xl p-3 flex items-center shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
                          onClick={() => {
                              if (agent.type === 'business') {
                                  handleAgentChatClick(user);
                              } else {
                                  handleCircleClick(user);
                              }
                          }}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                          agent.type === 'business' ? 'bg-[#1A365D]' : 'bg-[#1E7145]'
                        }`}>
                          {agent.type === 'business' ? (
                            <User className="w-4.5 h-4.5 text-white" />
                          ) : (
                            <Dribbble className="w-4.5 h-4.5 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm font-bold text-black leading-tight">{agent.name}</div>
                          <div className="text-[10px] text-gray-500 font-medium mt-0.5">{agent.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right-side thin scrollbar indicator (Visual only) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-1.5 h-40 w-1 bg-gray-100 rounded-full overflow-hidden pointer-events-none opacity-50">
                  <div className="absolute top-0 w-full h-12 bg-gray-300 rounded-full" />
                </div>
              </div>
            ))}
            </div>
          ) : currentView === 'programs-list' ? (
             <ProgramListView 
                onProgramClick={handleProgramClick}
                compareList={compareList}
                onAddToCompare={handleAddToCompare}
                onRemoveFromCompare={handleRemoveFromCompare}
                onStartCompare={handleStartCompare}
             />
          ) : null}
        </div>
      </div>
    </div>
  );
}
