import { useState } from "react";
import { Plus, Users, Zap, MapPin, Calendar, Sparkles, ChevronLeft, MoreHorizontal, MessageCircle, Mic, Check } from "lucide-react";
import { CIRCLES, USERS } from "../data/mockData";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { cn } from "../utils/cn";

// --- Mock Data Extension ---
const MY_CIRCLES = [
  { id: 'mc1', name: '大湾区网球联盟', image: CIRCLES[0].image, updates: 2 },
  { id: 'mc2', name: '女性领导力论坛', image: CIRCLES[1].image, updates: 0 },
];

const CIRCLE_ACTIVITIES = [
  {
    id: 'a1',
    user: USERS[0],
    type: 'event',
    content: '周五晚南山文体中心网球局，缺2人，水平不限！',
    time: '2小时前',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2670&auto=format&fit=crop',
    location: '南山文体中心'
  },
  {
    id: 'a2',
    user: USERS[1],
    type: 'post',
    content: '分享一个关于出海SaaS的行业报告，感兴趣的校友可以看看。',
    time: '5小时前',
    link: '2024出海白皮书.pdf'
  }
];

export default function Circles() {
  // State Machine: 'list' | 'detail' | 'create'
  const [viewState, setViewState] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedCircle, setSelectedCircle] = useState<typeof CIRCLES[0] | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof USERS[0] | null>(null);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    name: '',
    desc: '',
    tags: '',
    visibility: 'public'
  });

  const handleOpenDetail = (circle: typeof CIRCLES[0]) => {
    setSelectedCircle(circle);
    setViewState('detail');
  };

  const handleMemberClick = (member: typeof USERS[0]) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  // --- Render Functions ---

  const renderMainList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center px-2 pt-2">
        <h1 className="text-xl font-bold text-gray-900">圈子</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-primary text-primary hover:bg-primary/5 bg-white shadow-sm"
          onClick={() => setViewState('create')}
        >
            <Plus className="w-4 h-4" /> 创建
        </Button>
      </div>

      {/* My Circles (Horizontal Scroll) */}
      <section className="px-2">
         <h2 className="text-sm font-bold text-gray-900 mb-3 flex justify-between items-center">
            已加入的圈子
            <span className="text-xs text-gray-400 font-normal">查看全部</span>
         </h2>
         <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {MY_CIRCLES.length > 0 ? MY_CIRCLES.map((circle, index) => (
                <div key={circle.id} className="flex flex-col items-center space-y-2 min-w-[80px] cursor-pointer group" onClick={() => handleOpenDetail(CIRCLES[index] || CIRCLES[0])}>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group-hover:scale-105 transition-transform">
                        <img src={circle.image} className="w-full h-full object-cover" />
                        {circle.updates > 0 && (
                            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium text-center w-20 truncate">{circle.name}</span>
                </div>
            )) : (
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-xl w-full">
                    <Sparkles className="w-4 h-4" /> 暂无已加入圈子，看看推荐吧
                </div>
            )}
         </div>
      </section>

      {/* Recommended Circles (Vertical Feed) */}
      <section className="px-2 space-y-4 pb-24">
        <h2 className="text-sm font-bold text-gray-900 mb-1">可能感兴趣</h2>
        {CIRCLES.slice(2).map((circle) => (
            <Card 
                key={circle.id} 
                className="overflow-hidden border-0 relative group shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-all"
                onClick={() => handleOpenDetail(circle)}
            >
                <div className="absolute inset-0">
                    <img src={circle.image} className="w-full h-full object-cover opacity-90 transition-opacity group-hover:scale-105 duration-700" alt={circle.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <CardContent className="relative p-5 z-10 text-white h-48 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md shadow-sm">
                            <Zap className="w-3 h-3 mr-1 fill-current text-yellow-400" /> {circle.heat}°
                        </Badge>
                        <div className="flex -space-x-1">
                            {circle.schools.map((school, i) => (
                                <div key={i} className="px-1.5 py-0.5 rounded-md bg-white text-primary text-[10px] font-bold shadow-sm border border-gray-100">
                                    {school}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 shadow-black/50 text-shadow leading-tight">{circle.name}</h3>
                        <p className="text-xs text-gray-200 mb-3 line-clamp-1 text-shadow opacity-90">{circle.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-xs font-medium text-gray-300">
                                <Users className="w-3 h-3" /> {circle.members} 成员
                            </span>
                            <Button 
                                size="sm" 
                                className="h-7 text-xs bg-white text-primary hover:bg-gray-100 border-0 font-bold px-4 rounded-full shadow-lg"
                                onClick={(e) => { e.stopPropagation(); /* Join Logic */ }}
                            >
                                加入
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </section>
    </div>
  );

  const renderDetail = () => {
    if (!selectedCircle) return null;
    return (
      <div className="min-h-full bg-white pb-24 animate-in slide-in-from-right duration-300 absolute inset-0 z-40 overflow-y-auto">
         {/* Header Image */}
         <div className="relative h-64 w-full">
            <img src={selectedCircle.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-4 left-4 text-white hover:bg-white/20 z-10"
                onClick={() => setViewState('list')}
            >
                <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2 text-shadow">{selectedCircle.name}</h1>
                <p className="text-sm text-gray-200 text-shadow opacity-90 line-clamp-2">{selectedCircle.description}</p>
                <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="border-white/40 text-white bg-white/10 text-xs">#出海</Badge>
                    <Badge variant="outline" className="border-white/40 text-white bg-white/10 text-xs">#资源置换</Badge>
                </div>
            </div>
         </div>

         {/* Top Members */}
         <section className="p-6 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex justify-between">
                圈友墙 (Top Members)
                <span className="text-xs text-gray-400 font-normal">按 Connection 排序</span>
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {USERS.map((user, i) => (
                    <div key={user.id} className="flex flex-col items-center gap-1 cursor-pointer shrink-0" onClick={() => handleMemberClick(user)}>
                        <div className="relative">
                            <img src={user.image} className="w-12 h-12 rounded-full border border-gray-100 object-cover" />
                            <div className="absolute -bottom-1 -right-1 bg-purple-100 text-purple-700 text-[9px] font-bold px-1 rounded-full border border-white">
                                {95 - i*5}%
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-600 w-14 truncate text-center">{user.name}</span>
                    </div>
                ))}
            </div>
         </section>

         {/* Activity Feed */}
         <section className="p-6 bg-gray-50 min-h-[500px]">
            <h2 className="text-sm font-bold text-gray-900 mb-4">圈内动态</h2>
            <div className="space-y-4">
                {CIRCLE_ACTIVITIES.map((activity) => (
                    <Card key={activity.id} className="border-gray-100 shadow-sm bg-white">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <img src={activity.user.image} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900">{activity.user.name}</h4>
                                    <p className="text-[10px] text-gray-400">{activity.time} • {activity.user.company}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-800 mb-3">{activity.content}</p>
                            {activity.type === 'event' && (
                                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-3">
                                    <img src={activity.image} className="w-full h-32 object-cover" />
                                    <div className="p-3">
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                            <MapPin className="w-3 h-3" /> {activity.location}
                                        </div>
                                        <Button size="sm" className="w-full bg-primary text-white text-xs h-8 mt-2">立即报名</Button>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                <div className="flex gap-4">
                                    <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"><Zap className="w-3 h-3" /> 12</button>
                                    <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 4</button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
         </section>
      </div>
    );
  };

  const renderCreateForm = () => (
    <div className="min-h-full bg-white pb-24 animate-in slide-in-from-bottom duration-300 absolute inset-0 z-50 overflow-y-auto">
        <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0 z-10">
            <Button variant="ghost" size="sm" onClick={() => setViewState('list')}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">创建圈子</h1>
        </div>
        
        <div className="p-6 space-y-6">
            {/* AI Voice Fill */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 p-4 rounded-xl flex items-center justify-between border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Mic className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-primary-dark">和秘书聊聊帮我填写</h3>
                        <p className="text-xs text-gray-500">AI 自动生成名称与简介</p>
                    </div>
                </div>
                <Sparkles className="w-4 h-4 text-primary" />
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">圈子名称</label>
                    <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-primary text-lg font-medium" placeholder="例如：新能源出海联盟" />
                </div>
                
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">一句话简介</label>
                    <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none h-24" placeholder="介绍一下圈子的宗旨和目标人群..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">准入条件</label>
                    <div className="grid grid-cols-1 gap-3">
                        <div className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between ${createForm.visibility === 'public' ? 'border-primary bg-blue-50' : 'border-gray-200'}`} onClick={() => setCreateForm({...createForm, visibility: 'public'})}>
                            <span className="text-sm text-gray-900">全平台可见</span>
                            {createForm.visibility === 'public' && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <div className={`p-3 rounded-lg border cursor-pointer flex flex-col gap-2 ${createForm.visibility === 'private' ? 'border-primary bg-blue-50' : 'border-gray-200'}`} onClick={() => setCreateForm({...createForm, visibility: 'private'})}>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm text-gray-900">仅限指定学校可见</span>
                                {createForm.visibility === 'private' && <Check className="w-4 h-4 text-primary" />}
                            </div>
                            {createForm.visibility === 'private' && (
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {['清华', '北大', '中欧', '长江'].map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white border-blue-100 text-blue-600 cursor-pointer hover:bg-blue-100">{tag}</Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Button className="w-full h-12 rounded-full bg-primary text-white shadow-lg text-sm font-bold mt-8">
                <Sparkles className="w-4 h-4 mr-2" />
                AI 生成海报并提交
            </Button>
        </div>
    </div>
  );

  return (
    <div className="p-4 pb-24 space-y-6 relative min-h-full bg-[#f3f2ef] overflow-hidden">
      {viewState === 'list' && renderMainList()}
      {viewState === 'detail' && renderDetail()}
      {viewState === 'create' && renderCreateForm()}

      {/* Member Action Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowMemberModal(false)}>
            <Card className="w-full max-w-sm bg-white border-0 shadow-2xl animate-in slide-in-from-bottom-10 duration-300" onClick={e => e.stopPropagation()}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg mb-4">
                        <img src={selectedMember.image} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{selectedMember.title} @ {selectedMember.company}</p>
                    
                    <div className="bg-purple-50 text-purple-700 text-xs px-3 py-1.5 rounded-full font-medium mb-6">
                        Connection 权重: 95% • 共同好友 12 人
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <Button 
                            className="bg-primary text-white h-10 shadow-md text-xs"
                            onClick={() => {
                                alert("AI Agent 正在沟通中...");
                                setShowMemberModal(false);
                            }}
                        >
                            <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3 fill-current" />
                                <span>让秘书打招呼</span>
                            </div>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="border-gray-200 text-gray-700 h-10 text-xs hover:bg-gray-50"
                            onClick={() => setShowMemberModal(false)}
                        >
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>站内私信</span>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
