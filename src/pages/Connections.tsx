import { useState } from "react";
import { USERS } from "../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ShieldCheck, Zap, MoreHorizontal, MessageCircle, ArrowLeft, Bot, Send } from "lucide-react";
import { cn } from "../utils/cn";

interface ConnectionsProps {
  connections?: any[];
}

export default function Connections({ connections = [] }: ConnectionsProps) {
  const sortedConnections = [...connections].sort((a, b) => b.weight - a.weight);
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  const [showWechatModal, setShowWechatModal] = useState(false);

  const openAgentChat = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setShowAgentChat(true);
  };

  if (showAgentChat && selectedUser) {
    return (
        <div className="h-full w-full bg-white flex flex-col z-50 absolute inset-0">
            <div className="p-4 border-b flex items-center gap-4 bg-white shadow-sm z-10 shrink-0">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100" onClick={() => setShowAgentChat(false)}>
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Button>
                <div>
                    <h2 className="font-bold text-lg">Agent 对话</h2>
                    <p className="text-xs text-gray-500">我的 Agent 正在与 {selectedUser.name} 的 Agent 沟通</p>
                </div>
            </div>
            <div className="flex-1 p-4 bg-gray-50 space-y-4 overflow-y-auto pb-32">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
                        <Bot className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
                        <p className="text-sm text-gray-700">你好，我是 {selectedUser.name} 的商务 Agent。很高兴收到您的组队邀请！我的用户在财务建模方面非常有经验。</p>
                    </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                        <p className="text-sm text-white">太好了！我们的队伍正好缺少一位财务专家。我们可以进一步沟通具体的合作分工。</p>
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

  return (
    <div className="p-4 pb-24 space-y-6 bg-[#f3f2ef] min-h-full relative">
      {/* Top Board */}
      <div className="grid grid-cols-2 gap-3 pt-4 px-2">
        <Card className="bg-white border-blue-100 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-primary mb-1">854</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">总权重分</span>
            </CardContent>
        </Card>
        <Card className="bg-white border-gray-100 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-1">
                    12 <ShieldCheck className="w-4 h-4 text-green-600" />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">认证校友</span>
            </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center px-2">
          <h2 className="text-lg font-bold text-gray-900">您的人脉网络</h2>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-primary">按权重排序</Button>
      </div>

      {/* Connection List */}
      <div className="space-y-3 px-2">
          {sortedConnections.map((conn) => (
              <Card 
                key={conn.id} 
                className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openAgentChat(conn.user)}
              >
                  <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                          {/* Avatar & Weight */}
                          <div className="relative">
                              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                  <img src={conn.user.image} alt={conn.user.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
                                  <div className={cn(
                                      "flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold border-2 border-white",
                                      conn.weight >= 90 ? "bg-orange-500 text-white" : 
                                      conn.weight >= 80 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                  )}>
                                      {conn.weight}%
                                  </div>
                              </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                  <h3 className="text-base font-bold text-gray-900 truncate">{conn.user.name}</h3>
                                  <span className="text-[10px] text-gray-400">{conn.lastInteraction}</span>
                              </div>
                              <p className="text-xs text-gray-500 mb-2 truncate font-medium">{conn.user.title} @ {conn.user.company}</p>
                              
                              {/* Agent Log Bubble */}
                              <div className="bg-blue-50 rounded-lg p-2.5 relative mt-2 border border-blue-100">
                                  <div className="absolute -top-1 left-4 w-2 h-2 bg-blue-50 rotate-45 border-t border-l border-blue-100" />
                                  <p className="text-[11px] text-gray-700 leading-snug">
                                      <span className="text-primary font-bold">Agent 日志: </span>
                                      {conn.agentLog}
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-50">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                              <MoreHorizontal className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="h-8 text-xs gap-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 shadow-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowWechatModal(true);
                            }}
                          >
                              <MessageCircle className="w-3 h-3" /> 微信群
                          </Button>
                          <Button 
                            size="sm" 
                            variant="primary" 
                            className="h-8 text-xs gap-1 shadow-sm text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                openAgentChat(conn.user);
                            }}
                          >
                              <Zap className="w-3 h-3 fill-current text-white" /> 接管对话
                          </Button>
                      </div>
                  </CardContent>
              </Card>
          ))}
      </div>

      {/* WeChat Modal */}
      {showWechatModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-sm bg-white border-0 shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">创建微信群聊</CardTitle>
              <p className="text-sm text-gray-500 mt-1">即将跳转至微信，请确认是否继续？</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200 text-gray-600"
                  onClick={() => setShowWechatModal(false)}
                >
                  取消
                </Button>
                <Button 
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 border-transparent"
                  onClick={() => {
                      alert("正在打开微信...");
                      setShowWechatModal(false);
                  }}
                >
                  确认跳转
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
