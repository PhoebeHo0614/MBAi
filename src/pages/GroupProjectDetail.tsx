import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, Users, Clock, Plus, CheckCircle2, Circle, 
  FileText, Upload, Send, MessageSquare, AlertCircle, 
  Crown, X, Lock, Check, Calendar, ChevronRight
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { cn } from "../utils/cn";

// --- Mock Data ---

interface Teammate {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  connection: number;
  status: 'available' | 'invited' | 'pending_approval' | 'joined';
}

const RECOMMENDED_TEAMMATES: Teammate[] = [
  {
    id: '1',
    name: 'Jason Wang',
    title: '副总裁',
    company: '腾讯云',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
    connection: 98,
    status: 'available'
  },
  {
    id: '2',
    name: 'Alice Chen',
    title: '运营总监',
    company: '字节跳动',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop',
    connection: 92,
    status: 'available'
  },
  {
    id: '3',
    name: 'David Liu',
    title: '合伙人',
    company: '红杉资本',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop',
    connection: 85,
    status: 'pending_approval'
  }
];

const MY_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop";

interface TaskFile {
  id: string;
  name: string;
  type: 'pdf' | 'ppt' | 'xls';
  uploader: string;
  date: string;
}

interface ProjectTask {
  id: string;
  title: string;
  dueDate: string;
  owner: Teammate | null;
  status: 'pending' | 'completed';
  files: TaskFile[];
}

const TASKS: ProjectTask[] = [
  {
    id: 't1',
    title: '开题报告调研',
    dueDate: '3月5日',
    owner: RECOMMENDED_TEAMMATES[0],
    status: 'completed',
    files: [
      { id: 'f1', name: '行业调研初稿.pdf', type: 'pdf', uploader: 'Jason Wang', date: '2小时前' }
    ]
  },
  {
    id: 't2',
    title: '行业数据分析',
    dueDate: '3月10日',
    owner: RECOMMENDED_TEAMMATES[1],
    status: 'pending',
    files: []
  },
  {
    id: 't3',
    title: 'PPT 制作与路演',
    dueDate: '3月15日',
    owner: null,
    status: 'pending',
    files: []
  }
];

// --- Component ---

interface GroupProjectDetailProps {
  onBack: () => void;
  projectId: string;
  initialState?: 'formation' | 'collaboration';
  onAddConnection?: (conn: any) => void;
}

export default function GroupProjectDetail({ onBack, projectId, initialState = 'formation', onAddConnection }: GroupProjectDetailProps) {
  // State Machine: 'formation' | 'collaboration'
  const [viewState, setViewState] = useState<'formation' | 'collaboration'>(initialState);
  // User Role: 'none' (not in team), 'leader' (created team), 'member' (joined team)
  const [userRole, setUserRole] = useState<'none' | 'leader' | 'member'>(
    initialState === 'collaboration' ? 'leader' : 'none'
  );

  // Project Info based on ID (Mock)
  const projectTitle = projectId === 'p1' ? "全球战略案例分析" : "财务报表深度解读";
  const projectDeadline = projectId === 'p1' ? "3月20日" : "3月25日";

  // Local UI State
  const [teammates, setTeammates] = useState<Teammate[]>(RECOMMENDED_TEAMMATES);
  const [tasks, setTasks] = useState<ProjectTask[]>(TASKS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleCreateTeam = () => {
    setUserRole('leader');
    // In a real app, this would update server state
  };

  const handleInvite = (id: string, teammate: Teammate) => {
    setTeammates(prev => prev.map(t => {
      if (t.id === id) return { ...t, status: 'invited' };
      return t;
    }));
    
    // Add to Global Connections
    if (onAddConnection) {
        onAddConnection({
            id: `new_${id}_${Date.now()}`,
            user: {
                id: teammate.id,
                name: teammate.name,
                title: teammate.title,
                company: teammate.company,
                image: teammate.avatar
            },
            weight: teammate.connection,
            lastInteraction: '刚刚',
            agentLog: `已发送组队邀请：${projectTitle}，等待回复...`
        });
        alert(`已邀请 ${teammate.name}，请前往“关系”页面查看 Agent 沟通进度。`);
    }
  };

  const handleApprove = (id: string) => {
    setTeammates(prev => prev.map(t => {
      if (t.id === id) return { ...t, status: 'joined' };
      return t;
    }));
  };

  const handleFileUpload = (taskId: string) => {
    // Simulate file upload
    const newFile: TaskFile = {
      id: Math.random().toString(),
      name: 'Q1财务数据.xlsx',
      type: 'xls',
      uploader: '我',
      date: '刚刚'
    };
    
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) return { ...t, files: [...t.files, newFile] };
      return t;
    }));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSubmitModal(false);
      alert("作业提交成功！教授已收到通知。");
    }, 1500);
  };

  // --- Render Sections ---

  const renderHeader = () => (
    <div className="p-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h2 className="font-bold text-lg text-gray-900 leading-tight">{projectTitle}</h2>
          <p className="text-xs text-gray-500">截止日期: {projectDeadline} • 需 4-5 人</p>
        </div>
      </div>
      
      {/* State Badge */}
      <div className="flex gap-1 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
        <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded",
            viewState === 'formation' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
        )}>
            {viewState === 'formation' ? '组队中' : '协作中'}
        </span>
      </div>
    </div>
  );

  const renderFormationState = () => (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">当前状态：{userRole === 'none' ? '未组队' : '正在组建队伍'}</p>
            <p className="text-xs text-blue-700 mt-0.5">
              {userRole === 'none' ? '建议尽快组队，Connection 匹配度高有助于获得高分。' : '已邀请 2 位校友，等待确认中。'}
            </p>
          </div>
        </div>
        {userRole === 'none' && (
          <Button onClick={handleCreateTeam} className="bg-primary text-white shadow-lg text-xs px-6 rounded-full whitespace-nowrap shrink-0 ml-2">
            创建队伍
          </Button>
        )}
      </div>

      {/* Recommended Teammates */}
      <section>
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
          <span>推荐队友 (按 Connection 排序)</span>
          <span className="text-xs text-gray-400 font-normal">AI 智能匹配</span>
        </h3>
        
        <div className="space-y-3">
          {teammates.filter(t => t.status !== 'pending_approval' && t.status !== 'joined').map((teammate) => (
            <Card key={teammate.id} className="border-gray-100 shadow-sm bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={teammate.avatar} alt={teammate.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{teammate.name}</h4>
                    <p className="text-xs text-gray-500">{teammate.company} {teammate.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                       <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-green-50 text-green-700 border-green-100">
                          匹配度 {teammate.connection}%
                       </Badge>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant={teammate.status === 'invited' ? 'secondary' : 'outline'}
                  className={cn(
                    "text-xs h-8 min-w-[80px] transition-all",
                    teammate.status === 'invited' ? "bg-gray-100 text-gray-400" : "border-primary text-primary hover:bg-blue-50"
                  )}
                  onClick={() => handleInvite(teammate.id, teammate)}
                  disabled={teammate.status === 'invited' || userRole === 'none'}
                >
                  {teammate.status === 'invited' ? (
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 沟通中</span>
                  ) : (
                    "Agent 邀请"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Approvals (Leader Only) */}
      {userRole === 'leader' && (
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            入队申请 <Badge className="bg-red-100 text-red-600 border-red-200 h-5 px-1.5">1</Badge>
          </h3>
          
          {teammates.filter(t => t.status === 'pending_approval').map((applicant) => (
            <Card key={applicant.id} className="border-l-4 border-l-orange-400 border-y border-r border-gray-100 shadow-sm bg-white">
               <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{applicant.name}</h4>
                        <p className="text-xs text-gray-500">申请加入队伍</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">10分钟前</span>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded-lg text-xs text-gray-600 mb-3">
                    <span className="font-bold text-primary">Agent 备注:</span> 他的背景在“财务建模”方面非常强，正好补足我们的短板。
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 h-8 text-xs bg-primary text-white hover:bg-primary-dark"
                      onClick={() => handleApprove(applicant.id)}
                    >
                      同意入组
                    </Button>
                    <Button variant="outline" className="flex-1 h-8 text-xs text-gray-500">
                      婉拒
                    </Button>
                  </div>
               </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );

  const renderCollaborationState = () => (
    <div className="p-4 pb-32 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Team Header */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
           <div className="relative">
             <img src={MY_AVATAR} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
             <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5 border border-white">
               <Crown className="w-2.5 h-2.5 text-white fill-current" />
             </div>
           </div>
           {teammates.slice(0, 3).map(t => (
             <img key={t.id} src={t.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
           ))}
           <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-bold">
             +1
           </div>
        </div>
        <div className="text-right">
           <div className="text-xs text-gray-500 mb-1">整体进度</div>
           <div className="flex items-center gap-2">
             <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-[65%]" />
             </div>
             <span className="text-xs font-bold text-green-600">65%</span>
           </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
           任务节点 (Milestones)
           <Badge variant="outline" className="text-xs font-normal text-gray-500 border-gray-200">3 进行中</Badge>
        </h3>

        {tasks.map((task) => (
          <Card key={task.id} className="border-gray-100 shadow-sm bg-white overflow-visible">
            <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
               <div className="flex items-start gap-3">
                 <div className={cn(
                   "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                   task.status === 'completed' ? "bg-green-100 border-green-500 text-green-600" : "border-gray-300"
                 )}>
                   {task.status === 'completed' && <Check className="w-3 h-3" />}
                 </div>
                 <div>
                   <h4 className={cn("text-sm font-bold", task.status === 'completed' ? "text-gray-500 line-through" : "text-gray-900")}>
                     {task.title}
                   </h4>
                   <div className="flex items-center gap-3 mt-1">
                     <span className={cn("text-xs flex items-center gap-1", task.status === 'completed' ? "text-gray-400" : "text-orange-500")}>
                       <Calendar className="w-3 h-3" /> {task.dueDate}
                     </span>
                     {task.owner && (
                       <span className="text-xs text-gray-500 flex items-center gap-1">
                         <img src={task.owner.avatar} className="w-4 h-4 rounded-full" />
                         {task.owner.name}
                       </span>
                     )}
                   </div>
                 </div>
               </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 pl-12">
               {/* File Attachments */}
               <div className="space-y-2">
                 {task.files.map(file => (
                   <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                          <p className="text-[10px] text-gray-400">{file.uploader} • {file.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                   </div>
                 ))}
                 
                 {/* Upload Button */}
                 <Button 
                   variant="ghost" 
                   className="w-full h-8 text-xs text-gray-500 border border-dashed border-gray-200 hover:bg-gray-50 hover:border-gray-300 justify-start px-2 gap-2"
                   onClick={() => handleFileUpload(task.id)}
                 >
                   <Plus className="w-3 h-3" /> 上传资料 / 挂载文件
                 </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-[#f8f9fa] flex flex-col z-[70] absolute inset-0 overflow-hidden">
      {renderHeader()}
      
      <div className="flex-1 overflow-y-auto">
        {viewState === 'formation' ? renderFormationState() : renderCollaborationState()}
      </div>

      {/* Final Submit Button (Absolute) */}
      {viewState === 'collaboration' && (
        <div className="absolute bottom-8 left-0 right-0 px-6 flex justify-center z-[80] pointer-events-none">
          <Button 
            className="w-full max-w-md bg-primary text-white shadow-xl h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-all transform active:scale-95 pointer-events-auto"
            onClick={() => setShowSubmitModal(true)}
          >
            <Send className="w-4 h-4" /> 提交最终作业
          </Button>
        </div>
      )}

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-sm bg-white border-0 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg text-gray-900">确认交付作业？</CardTitle>
              <p className="text-sm text-gray-500 mt-1">将提交以下 3 个最终文件给教授。<br/>提交后不可修改。</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                 {['全球战略分析_Final.pdf', '小组路演PPT.pptx', '财务附表.xlsx'].map((f, i) => (
                   <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                     <FileText className="w-3 h-3 text-gray-400" /> {f}
                   </div>
                 ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200 text-gray-600"
                  onClick={() => setShowSubmitModal(false)}
                >
                  再想想
                </Button>
                <Button 
                  className="flex-1 bg-primary text-white"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "正在上传..." : "确认交付"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
