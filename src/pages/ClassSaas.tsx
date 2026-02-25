import { useState } from "react";
import { createPortal } from "react-dom";
import { Mic, BookOpen, Users, Clock, ArrowRight, Check, ArrowLeft, Share2, Download, Brain, X, Loader2, Sparkles } from "lucide-react";
import { SCHEDULE, USERS } from "../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { cn } from "../utils/cn";
import GroupProjectDetail from "./GroupProjectDetail";

interface ClassSaasProps {
    onAddConnection?: (conn: any) => void;
}

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  professor?: string;
  location?: string;
  status: string;
  type?: 'course' | 'event';
  description?: string;
}

export default function ClassSaas({ onAddConnection }: ClassSaasProps) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showMindMap, setShowMindMap] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{id: string, state: 'formation' | 'collaboration'} | null>(null);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

  // Voice Agent State
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [agentStep, setAgentStep] = useState<'listening' | 'processing' | 'replying' | 'completed'>('listening');
  const [localSchedule, setLocalSchedule] = useState<ScheduleItem[]>(
    SCHEDULE.map(item => ({ ...item, type: 'course' }))
  );

  const handleStartVoiceAgent = () => {
    setShowVoiceAgent(true);
    setAgentStep('listening');
    
    // Simulate flow
    setTimeout(() => {
        setAgentStep('processing');
        setTimeout(() => {
            setAgentStep('replying');
            // Add new schedule item
            const newItem: ScheduleItem = {
                id: `new-${Date.now()}`,
                time: '20:00',
                title: '与王总晚餐',
                location: '国贸三期 80层',
                status: 'upcoming',
                type: 'event',
                description: '商务晚餐'
            };
            // Insert in correct order (simple append for demo, or insert before last item if time matches)
            setLocalSchedule(prev => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
        }, 2000);
    }, 3000);
  };

  if (showVoiceAgent) {
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
                        {agentStep === 'replying' && "日程已更新"}
                    </h2>
                    <p className="text-white/60 text-sm">
                        {agentStep === 'listening' && "请告诉我您的安排"}
                        {agentStep === 'processing' && "正在提取关键信息：时间、地点、人物"}
                        {agentStep === 'replying' && "已为您自动同步到日历"}
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
                                帮我安排今晚8点和王总在国贸吃晚饭。
                            </p>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-white/90 leading-relaxed">
                                    好的，已为您安排<span className="text-yellow-400 font-bold mx-1">今晚 20:00</span>与<span className="text-yellow-400 font-bold mx-1">王总</span>在<span className="text-yellow-400 font-bold mx-1">国贸三期</span>的晚餐。
                                </p>
                                <div className="bg-black/20 rounded-lg p-3 text-xs text-white/70 flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    <span>已添加到今日日程</span>
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
  }

  if (selectedProject) {
    return (
      <GroupProjectDetail 
        projectId={selectedProject.id} 
        initialState={selectedProject.state}
        onBack={() => setSelectedProject(null)} 
        onAddConnection={onAddConnection}
      />
    );
  }

  if (showMindMap) {
      return (
        <div className="h-full w-full bg-white flex flex-col z-[60] absolute inset-0">
             <div className="p-4 border-b flex items-center justify-between bg-white shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => setShowMindMap(false)}>
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Button>
                    <h2 className="font-bold text-lg">思维导图</h2>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Download className="w-5 h-5 text-gray-600" /></Button>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 overflow-auto">
                {/* Mock Mind Map Visualization */}
                <div className="w-full h-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
                        <div className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg text-lg">
                            动态能力 (Dynamic Capabilities)
                        </div>
                        
                        <div className="flex gap-8 items-start">
                            {/* Branch 1 */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-8 w-0.5 bg-gray-300" />
                                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold border border-blue-200 shadow-sm">
                                    感知 (Sensing)
                                </div>
                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">识别机会</div>
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">威胁预警</div>
                                </div>
                            </div>

                            {/* Branch 2 */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-8 w-0.5 bg-gray-300" />
                                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold border border-purple-200 shadow-sm">
                                    捕捉 (Seizing)
                                </div>
                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">资源动员</div>
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">快速决策</div>
                                </div>
                            </div>

                            {/* Branch 3 */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-8 w-0.5 bg-gray-300" />
                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold border border-green-200 shadow-sm">
                                    重组 (Transforming)
                                </div>
                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">组织变革</div>
                                    <div className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">资产重构</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  if (showSummary && selectedCourseId) {
    const course = SCHEDULE.find(c => c.id === selectedCourseId);
    
    // Mock Lectures Data
    const lectures = [
        { id: 'l1', title: `${course?.title} L1: 基础理论`, date: '2024-10-10' },
        { id: 'l2', title: `${course?.title} L2: 案例分析`, date: '2024-10-17' },
        { id: 'l3', title: `${course?.title} L3: 进阶研讨`, date: '2024-10-24' },
    ];

    if (selectedLectureId) {
        // Detailed Lecture Summary View
        const lecture = lectures.find(l => l.id === selectedLectureId);
        return (
            <div className="h-full w-full bg-white flex flex-col z-50 absolute inset-0">
                 <div className="p-4 border-b flex items-center justify-between bg-white shadow-sm z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => setSelectedLectureId(null)}>
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </Button>
                        <h2 className="font-bold text-lg">课堂总结</h2>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Share2 className="w-5 h-5 text-gray-600" /></Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Download className="w-5 h-5 text-gray-600" /></Button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 pb-32">
                    <div className="mb-6">
                        <Badge className="bg-blue-100 text-blue-700 mb-2 border-blue-200">{course?.title}</Badge>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{lecture?.title}</h1>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lecture?.date}</span>
                            <span>{course?.professor}</span>
                        </div>
                    </div>

                    <div className="prose prose-blue max-w-none">
                        {/* Reuse existing content logic based on course title, or make it dynamic per lecture */}
                        {course?.title === '战略管理' ? (
                            <>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                                    <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> 
                                        核心观点摘要
                                    </h3>
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        本节课张教授重点阐述了在VUCA时代，企业仅靠拥有的资源已不足以维持竞争优势。核心在于“动态能力”（Dynamic Capabilities），即企业整合、构建和重组内外部能力以应对快速变化环境的能力。
                                    </p>
                                </div>

                                <h3 className="font-bold text-lg text-gray-900 mb-3">1. 动态能力的三个维度</h3>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">S</div>
                                        <div>
                                            <strong className="text-gray-900">感知 (Sensing)：</strong>
                                            <p className="text-sm text-gray-600 mt-1">识别机会与威胁的能力。例如：比亚迪在2015年对新能源趋势的预判。</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">Sz</div>
                                        <div>
                                            <strong className="text-gray-900">捕捉 (Seizing)：</strong>
                                            <p className="text-sm text-gray-600 mt-1">动员资源抓住机会。案例：瑞幸咖啡通过数字化系统快速铺开万店规模。</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">T</div>
                                        <div>
                                            <strong className="text-gray-900">重组 (Transforming)：</strong>
                                            <p className="text-sm text-gray-600 mt-1">持续更新组织结构。案例：微软从Windows向Azure云服务的战略转型。</p>
                                        </div>
                                    </li>
                                </ul>

                                <h3 className="font-bold text-lg text-gray-900 mb-3">2. 课堂讨论精选</h3>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-700 italic">
                                        "在出海业务中，由于地缘政治的不确定性，'感知'能力比'效率'更重要。" —— 李总 (腾讯) 分享
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                                    <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> 
                                        核心观点摘要
                                    </h3>
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        李教授通过特斯拉的财报案例，深入讲解了如何通过现金流量表判断企业的真实经营状况，以及EBITDA指标在重资产行业估值中的局限性。
                                    </p>
                                </div>
                                
                                <h3 className="font-bold text-lg text-gray-900 mb-3">1. 关键财务指标解读</h3>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">1</div>
                                        <div>
                                            <strong className="text-gray-900">经营性现金流 (OCF)：</strong>
                                            <p className="text-sm text-gray-600 mt-1">企业的造血能力。需关注OCF与净利润的背离情况。</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">2</div>
                                        <div>
                                            <strong className="text-gray-900">自由现金流 (FCF)：</strong>
                                            <p className="text-sm text-gray-600 mt-1">OCF减去资本开支。衡量企业分红和回购潜力的核心指标。</p>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="absolute bottom-[64px] left-0 right-0 p-4 border-t bg-white shrink-0 flex justify-center">
                     <Button 
                        className="rounded-full px-8 shadow-lg bg-primary text-white"
                        onClick={() => setShowMindMap(true)}
                     >
                        生成思维导图
                     </Button>
                </div>
            </div>
        );
    }

    // Course Lecture List View
    return (
        <div className="h-full w-full bg-white flex flex-col z-50 absolute inset-0">
             <div className="p-4 border-b flex items-center justify-between bg-white shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => {
                        setShowSummary(false);
                        setSelectedCourseId(null);
                    }}>
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Button>
                    <h2 className="font-bold text-lg">{course?.title} 课程列表</h2>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {/* Exam Prep Guide Card */}
                <Card 
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setShowMindMap(true)}
                >
                    <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <Brain className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">期末备考指南</h3>
                                <p className="text-xs text-amber-700">AI 生成知识图谱 & 重点梳理</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    {lectures.map((lecture) => (
                        <Card 
                            key={lecture.id} 
                            className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedLectureId(lecture.id)}
                        >
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{lecture.title}</h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {lecture.date}
                                    </p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-6 bg-[#f3f2ef] min-h-full">
      {/* Header & Voice Interaction */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-4">
        <h1 className="text-xl font-bold text-gray-900">班级 & 助理</h1>
        <Button 
            variant="outline" 
            className="rounded-full w-full max-w-xs h-12 border-primary/30 bg-white hover:bg-blue-50 text-primary flex items-center justify-center gap-2 transition-all shadow-sm"
            onClick={handleStartVoiceAgent}
        >
            <Mic className="w-5 h-5" />
            <span>"告诉秘书我今天的安排..."</span>
        </Button>
      </div>

      {/* Today's Schedule */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                今日日程
            </h2>
            <span className="text-xs text-gray-500">2024年10月24日</span>
        </div>
        
        <div className="space-y-4 px-2">
            {localSchedule.map((item, index) => (
                <div key={item.id} className="relative pl-6 border-l-2 border-gray-200 last:border-0">
                    {/* Timeline Dot */}
                    <div className={cn(
                        "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2",
                        item.type === 'event' 
                            ? "bg-purple-500 border-purple-500 ring-4 ring-purple-50"
                            : index === 0 
                                ? "bg-primary border-primary ring-4 ring-blue-50" 
                                : "bg-gray-300 border-white"
                    )} />
                    
                    <Card className={cn(
                        "border-0 shadow-sm transition-all",
                        item.type === 'event' ? "bg-purple-50 border-purple-100" : (index === 0 ? 'bg-white' : 'bg-white/60')
                    )}>
                        <CardContent className="p-4 flex justify-between items-start">
                            <div>
                                <span className={cn(
                                    "text-xs font-bold block mb-1",
                                    item.type === 'event' ? "text-purple-600" : "text-primary"
                                )}>{item.time}</span>
                                <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                                
                                {item.type === 'event' ? (
                                    <p className="text-sm text-purple-700 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" /> 
                                        {item.description}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full" /> 
                                        {item.professor}
                                    </p>
                                )}
                                
                                <p className={cn(
                                    "text-xs mt-1",
                                    item.type === 'event' ? "text-purple-400" : "text-gray-400"
                                )}>{item.location}</p>
                            </div>
                            
                            {/* Sign In Button only for active Course */}
                            {item.type !== 'event' && index === 0 && (
                                <Button 
                                    size="sm" 
                                    className={cn(
                                        "h-8 text-xs px-3 shadow-none transition-all duration-300",
                                        checkedIn 
                                            ? "bg-blue-100 text-primary hover:bg-blue-200" 
                                            : "bg-primary text-white hover:bg-primary-dark"
                                    )}
                                    onClick={() => setCheckedIn(true)}
                                    disabled={checkedIn}
                                >
                                    {checkedIn ? (
                                        <>
                                            <Check className="w-3 h-3 mr-1" />
                                            已签到
                                        </>
                                    ) : (
                                        "签到"
                                    )}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
      </section>

      {/* AI Study Assistant */}
      <section className="px-2">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            AI 助学
        </h2>
        <div className="grid grid-cols-1 gap-3">
            {SCHEDULE.map((course) => (
                <Card key={course.id} className="bg-blue-50 border-blue-100 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-100">课堂总结</Badge>
                            <span className="text-[10px] text-gray-400">2小时前</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">重点回顾：{course.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                            {course.title === '战略管理' 
                                ? '张教授强调了AI时代“动态能力”的重要性。核心观点在于企业如何快速适应技术变革...' 
                                : '李教授深入讲解了如何通过现金流量表判断企业的真实经营状况...'}
                        </p>
                        <div 
                            className="flex items-center text-blue-600 text-xs font-bold cursor-pointer hover:underline"
                            onClick={() => {
                                setSelectedCourseId(course.id);
                                setShowSummary(true);
                            }}
                        >
                            查看课程列表 <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      {/* Group Projects */}
      <section className="px-2">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            小组作业
        </h2>
        
        {/* Project 1: Collaboration State */}
        <Card 
            className="bg-white border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all mb-4"
            onClick={() => setSelectedProject({ id: 'p1', state: 'collaboration' })}
        >
            <CardHeader className="p-4 pb-2 border-b border-gray-50">
                <CardTitle className="text-base flex justify-between items-center text-gray-900">
                    <span>全球战略案例分析</span>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 shadow-none">进行中</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2">
                        {USERS.slice(0, 3).map((user) => (
                            <img 
                                key={user.id} 
                                src={user.image} 
                                alt={user.name}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-400 cursor-pointer transition-colors">
                            +1
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">3天后截止</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '75%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                    <span>调研阶段</span>
                    <span>75%</span>
                </div>
            </CardContent>
        </Card>

        {/* Project 2: Formation State */}
        <Card 
            className="bg-white border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedProject({ id: 'p2', state: 'formation' })}
        >
            <CardHeader className="p-4 pb-2 border-b border-gray-50">
                <CardTitle className="text-base flex justify-between items-center text-gray-900">
                    <span>财务报表深度解读</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-none">组队中</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                            <Users className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-500">还差 3 人</span>
                    </div>
                    <span className="text-xs text-orange-500 font-medium">建议尽快组队</span>
                </div>
                <p className="text-xs text-gray-400">需具备财务背景队友，匹配度高者优先。</p>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
