import { useState, useEffect } from "react";
import { 
  X, ShieldCheck, CheckCircle2, Flame, GraduationCap, 
  Users, Award, ChevronRight, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../utils/cn";
import { createPortal } from "react-dom";

interface User {
  name: string;
  avatar: string;
  school: string;
}

import VerificationModal from "./VerificationModal";

interface AlumniEndorsementModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User;
  currentUser: User;
  isVerified: boolean; // Controls whether to show interception or endorsement form
}

type EndorsementType = 'classmate' | 'same_year' | 'cross_year';

export default function AlumniEndorsementModal({
  isOpen,
  onClose,
  targetUser,
  currentUser,
  isVerified
}: AlumniEndorsementModalProps) {
  const [step, setStep] = useState<'interception' | 'form' | 'success'>('form');
  const [selectedType, setSelectedType] = useState<EndorsementType | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Verification Modal State
  const [showVerification, setShowVerification] = useState(false);
  
  // Agent Communication Modal State
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      if (!isVerified) {
        setStep('interception');
      } else {
        setStep('form');
      }
      setSelectedType(null);
      setIsAgreed(false);
      setIsSubmitting(false);
      setShowAgentModal(false);
    }
  }, [isOpen, isVerified]);

  const handleSubmit = () => {
    if (!selectedType || !isAgreed) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const portalContainer = document.getElementById('mobile-app-container') || document.body;

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[60] flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl",
              step === 'success' ? "bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white" : "bg-white"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full w-8 h-8 p-0 hover:bg-black/10",
                  step === 'success' ? "text-white/50 hover:text-white hover:bg-white/10" : "text-gray-400"
                )}
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* --- State 1: Interception (Unverified) --- */}
            {step === 'interception' && (
              <div className="p-8 pb-12 flex flex-col items-center text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-2"
                >
                  <ShieldCheck className="w-10 h-10 text-red-500" />
                </motion.div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">需完成校友认证</h3>
                  <p className="text-sm text-gray-500 px-4 leading-relaxed">
                    为了保证圈层质量，您需先完成 <span className="font-bold text-gray-900">{currentUser.school}</span> 的身份认证，才能为他人进行背书。
                  </p>
                </div>

                <Button 
                  className="w-full bg-primary text-white h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                  onClick={() => setShowVerification(true)}
                >
                  立即去认证
                </Button>
              </div>
            )}

            {/* --- Verification Modal --- */}
            <VerificationModal 
                isOpen={showVerification} 
                onClose={() => setShowVerification(false)} 
                onSuccess={() => {
                    setShowVerification(false);
                    // In a real app, this would update parent state
                    // For demo, we just switch to form
                    setStep('form');
                }}
            />

            {/* --- State 2: Endorsement Form --- */}
            {step === 'form' && (
              <div className="flex flex-col h-[85vh] sm:h-auto max-h-[850px]">
                {/* Header Visual */}
                <div className="bg-gradient-to-b from-blue-50 to-white p-6 pb-2 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  
                  <div className="flex items-center justify-center gap-8 mb-6 mt-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0" />
                    <motion.div 
                      animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full blur-[2px] z-0"
                    />

                    {/* Me */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <img src={currentUser.avatar} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100">我</span>
                    </div>

                    {/* Link Icon */}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-white border border-blue-100 flex items-center justify-center shadow-sm text-blue-500">
                        <Users className="w-4 h-4" />
                    </div>

                    {/* Them */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <img src={targetUser.avatar} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100">Ta</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">校友身份背书</h3>
                  <p className="text-xs text-gray-500">
                    正在为 <span className="font-bold text-gray-900">{targetUser.name}</span> 的 [{targetUser.school}] 身份背书
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Relationship Selection */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      请选择你们的交集
                      <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">决定初始权重</span>
                    </p>
                    
                    <div className="grid gap-3">
                      {[
                        { id: 'classmate', title: '同班同学', desc: '权重加成极高', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
                        { id: 'same_year', title: '同届校友', desc: '权重加成高', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
                        { id: 'cross_year', title: '跨届校友', desc: '权重加成中等', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
                      ].map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedType(item.id as EndorsementType)}
                          className={cn(
                            "relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            selectedType === item.id 
                              ? `${item.bg} ${item.border}` 
                              : "bg-white border-gray-100 hover:border-gray-200"
                          )}
                        >
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", selectedType === item.id ? "bg-white" : "bg-gray-50")}>
                            <item.icon className={cn("w-5 h-5", item.color)} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            selectedType === item.id ? "border-primary bg-primary" : "border-gray-300"
                          )}>
                            {selectedType === item.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agreement */}
                  <div 
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer"
                    onClick={() => setIsAgreed(!isAgreed)}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors",
                      isAgreed ? "bg-primary border-primary" : "border-gray-300 bg-white"
                    )}>
                      {isAgreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed select-none">
                      我承诺该用户的校友身份真实有效。如发现联合造假，双方账号将被连带<span className="text-red-500 font-bold">降权/封禁</span>。
                    </p>
                  </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 pb-10 bg-white">
                  <Button 
                    className="w-full h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 text-base"
                    disabled={!selectedType || !isAgreed || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                         正在提交...
                      </span>
                    ) : "签署背书"}
                  </Button>
                </div>
              </div>
            )}

            {/* --- State 3: Success --- */}
            {step === 'success' && (
              <div className="p-8 pb-12 flex flex-col items-center text-center relative overflow-hidden">
                {/* Background Particles (Simulated) */}
                <div className="absolute inset-0 pointer-events-none">
                   <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                   <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce" />
                   <div className="absolute bottom-32 left-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                </div>

                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/30 relative"
                >
                  <Award className="w-12 h-12 text-white" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">✅ 认证成功！</h3>
                <p className="text-white/80 text-sm mb-8">
                  {targetUser.name} 的校友身份已激活
                </p>

                <div className="w-full bg-white/10 rounded-2xl p-6 border border-white/10 space-y-4 mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤝</span>
                    <div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        您与 Ta 的 Connection 权重已直接跃升至 <span className="text-green-400 font-bold">90%</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10" />
                  
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎁</span>
                    <div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        感谢您的真实背书，作为奖励，您的全平台 Connection 基础分已 <span className="text-yellow-400 font-bold">+5</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <Button 
                    className="w-full h-12 bg-white text-primary font-bold rounded-xl hover:bg-gray-100"
                    onClick={onClose}
                  >
                    完成
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-12 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-colors"
                    onClick={() => setShowAgentModal(true)}
                  >
                    🤖 顺便让秘书和 Ta 打个招呼
                  </Button>
                </div>
              </div>
            )}
            
            {/* --- Agent Communication Modal --- */}
            {showAgentModal && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white w-full max-w-sm rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">秘书 Agent 正在沟通中</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    您的 AI 秘书正在根据您的偏好生成个性化问候语，并尝试与 {targetUser.name} 建立联系...
                  </p>
                  <Button 
                    className="w-full h-12 bg-primary text-white rounded-xl font-bold"
                    onClick={() => {
                      setShowAgentModal(false);
                      onClose();
                    }}
                  >
                    确定
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}