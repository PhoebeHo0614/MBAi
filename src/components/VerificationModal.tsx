import { useState, useEffect } from "react";
import { 
  ShieldCheck, GraduationCap, Mail, FileText, Lock, 
  ChevronRight, ArrowLeft, Loader2, Sparkles, CheckCircle2,
  ScanLine, Building2, UploadCloud, Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../utils/cn";
import { createPortal } from "react-dom";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type VerificationMethod = 'email' | 'offer' | 'chsi';
type Step = 'selection' | 'input' | 'processing' | 'success';

export default function VerificationModal({ isOpen, onClose, onSuccess }: VerificationModalProps) {
  const [step, setStep] = useState<Step>('selection');
  const [method, setMethod] = useState<VerificationMethod | null>(null);
  const [school, setSchool] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('selection');
      setMethod(null);
      setSchool("");
      setCode("");
      setEmail("");
      setVerificationCode("");
      setUploadedFile(null);
    }
  }, [isOpen]);

  // Countdown timer for email code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSelectMethod = (m: VerificationMethod) => {
    setMethod(m);
    setStep('input');
  };

  const handleSendCode = () => {
    if (!email || isSending || countdown > 0) return;
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setCountdown(60);
      alert(`验证码已发送至 ${email}`);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Validation based on method
    if (method === 'chsi' && (!school || !code)) return;
    if (method === 'email' && (!email || !verificationCode)) return;
    if (method === 'offer' && !uploadedFile) return;
    
    setStep('processing');
    
    // Simulate API call and verification process
    setTimeout(() => {
      setStep('success');
      // Auto-advance after 2 seconds if user doesn't click
      if (onSuccess) {
         setTimeout(onSuccess, 2000);
      }
    }, 2500);
  };

  const portalContainer = document.getElementById('mobile-app-container') || document.body;

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[70] flex flex-col bg-[#f8f9fa] overflow-hidden">
          
          {/* --- Header (Common) --- */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full w-10 h-10 p-0 hover:bg-gray-100"
              onClick={step === 'selection' || step === 'success' ? onClose : () => setStep('selection')}
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </Button>
            {step === 'input' && (
                <span className="font-bold text-gray-900">
                  {method === 'email' ? '教育邮箱认证' : 
                   method === 'offer' ? 'Offer 验证' : '学信网认证'}
                </span>
            )}
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* --- Content Area --- */}
          <div className="flex-1 overflow-y-auto no-scrollbar pt-16 pb-safe">
            
            {/* --- State 1: Method Selection --- */}
            {step === 'selection' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 space-y-8"
              >
                {/* Hero Section */}
                <div className="text-center space-y-4 mt-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20 rotate-3 transform hover:rotate-6 transition-transform">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    激活您的 MBAi<br/>专属身份
                  </h1>
                  <p className="text-sm text-gray-500 px-4 leading-relaxed">
                    为了维护圈层的绝对纯粹，我们需要核实您的教育背景。您的隐私受银行级加密保护。
                  </p>
                </div>

                {/* Method Cards */}
                <div className="space-y-4">
                  <MethodCard 
                    icon={Mail}
                    title="教育/校友邮箱认证"
                    desc="支持以 .edu.cn 或商学院专属域名结尾的邮箱，极速秒批"
                    onClick={() => handleSelectMethod('email')}
                  />
                  <MethodCard 
                    icon={FileText}
                    title="正式 Offer 邮件验证"
                    desc="适用于即将入学的准新生，支持 PDF 或截图 AI 自动识别"
                    onClick={() => handleSelectMethod('offer')}
                  />
                  <MethodCard 
                    icon={GraduationCap}
                    title="学信网学籍/学历认证"
                    desc="输入学信网在线验证码，权威直连"
                    onClick={() => handleSelectMethod('chsi')}
                  />
                </div>
              </motion.div>
            )}

            {/* --- State 2: Input Forms --- */}
            {step === 'input' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-6">
                    
                    {/* Form: Email Verification */}
                    {method === 'email' && (
                      <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 ml-1">教育邮箱</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="请输入 .edu.cn 结尾的邮箱"
                                    className="w-full bg-white h-14 pl-12 pr-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 shadow-sm transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 ml-1">验证码</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="6位验证码"
                                        className="w-full bg-white h-14 pl-12 pr-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 shadow-sm transition-all"
                                    />
                                </div>
                                <Button 
                                    className="h-14 w-32 rounded-2xl bg-blue-50 text-primary hover:bg-blue-100 font-bold text-sm"
                                    onClick={handleSendCode}
                                    disabled={!email || isSending || countdown > 0}
                                >
                                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                                     countdown > 0 ? `${countdown}s` : "发送验证码"}
                                </Button>
                            </div>
                        </div>
                      </>
                    )}

                    {/* Form: Offer Upload */}
                    {method === 'offer' && (
                      <div className="space-y-4">
                        <div 
                            className="border-2 border-dashed border-gray-300 rounded-3xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer relative"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input 
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                            />
                            {uploadedFile ? (
                                <div className="text-center p-4">
                                    <FileText className="w-12 h-12 text-primary mx-auto mb-2" />
                                    <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{uploadedFile.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <Button variant="ghost" size="sm" className="mt-4 text-red-500 hover:bg-red-50">重新上传</Button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                        <UploadCloud className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">点击上传 Offer 文件</p>
                                    <p className="text-xs text-gray-500 mt-1">支持 PDF / JPG / PNG</p>
                                </>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                            请确保文件清晰可见，包含您的姓名和录取院校信息。<br/>AI 将自动识别关键字段。
                        </p>
                      </div>
                    )}

                    {/* Form: CHSI (Existing) */}
                    {method === 'chsi' && (
                      <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 ml-1">所属院校</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
                                    placeholder="请搜索并选择您的院校 (如：北大光华)"
                                    className="w-full bg-white h-14 pl-12 pr-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 shadow-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 ml-1">在线验证码</label>
                            <div className="relative">
                                <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="请输入 12 位或 16 位学信网在线验证码"
                                    className="w-full bg-white h-14 pl-12 pr-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 shadow-sm transition-all"
                                />
                            </div>
                        </div>
                      </>
                    )}
                </div>

                {/* Privacy Trust Badge */}
                <div className="bg-gray-50 rounded-xl p-4 flex gap-3 items-start border border-gray-100">
                    <Lock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed text-justify">
                        MBAi 承诺您的数据仅用于单次身份校验，绝不在平台任何对外页面展示验证码原文。校验通过后，验证码将立即销毁。
                    </p>
                </div>

                <div className="pt-8">
                    <Button 
                        className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 text-lg hover:scale-[1.02] transition-transform active:scale-95"
                        disabled={
                            (method === 'chsi' && (!school || !code)) ||
                            (method === 'email' && (!email || !verificationCode)) ||
                            (method === 'offer' && !uploadedFile)
                        }
                        onClick={handleSubmit}
                    >
                        提交 AI 极速核验
                    </Button>
                </div>
              </motion.div>
            )}

            {/* --- State 3: Processing & Success --- */}
            {(step === 'processing' || step === 'success') && (
              <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-8 text-center">
                {step === 'processing' ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                            <motion.div 
                                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Bot className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">AI 正在核验...</h2>
                        <p className="text-sm text-gray-500">正在安全连接至 CHSI 权威数据库<br/>请勿关闭页面</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="space-y-8 w-full max-w-sm"
                    >
                        {/* Success Icon */}
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 relative overflow-hidden">
                             <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                             >
                                <CheckCircle2 className="w-12 h-12 text-white" />
                             </motion.div>
                             <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">认证通过！</h2>
                            <p className="text-gray-600">
                                尊贵的 <span className="font-bold text-gray-900">{school || "北京大学"}</span> 校友<br/>
                                欢迎加入 MBAi
                            </p>
                        </div>

                        {/* Privileges */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {['Agent 高级匹配', '校友背书权限', '私董会圈子'].map((privilege, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-gray-700"
                                >
                                    <Sparkles className="w-3 h-3 text-yellow-400" />
                                    {privilege}
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <Button 
                                className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-colors"
                                onClick={handleSuccess}
                            >
                                立即开启我的 MBAi 之旅
                            </Button>
                        </div>
                    </motion.div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}

function MethodCard({ icon: Icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="group relative bg-[#1a1a1a] hover:bg-[#252525] rounded-2xl p-5 cursor-pointer transition-all duration-300 border border-gray-800 shadow-lg hover:shadow-xl overflow-hidden"
        >
            {/* Glossy Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    )
}