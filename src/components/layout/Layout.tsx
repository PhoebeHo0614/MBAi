import { BottomNav } from "./BottomNav";
import { Compass, Calendar, Users, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Compass, label: "发现", path: "/" },
  { icon: Calendar, label: "班级协作", path: "/class" },
  { icon: Users, label: "圈子", path: "/circles" },
  { icon: MessageSquare, label: "关系", path: "/connections" },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#eef3f8] text-gray-900 flex justify-center items-center font-sans">
      
      {/* Mobile App Container */}
      <div id="mobile-app-container" className="w-full max-w-[430px] h-[100vh] md:h-[90vh] md:max-h-[932px] relative flex flex-col shadow-2xl overflow-hidden bg-[#f3f2ef] md:rounded-[40px] md:border-[8px] md:border-gray-900">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#f3f2ef]">
            <div className="h-full w-full">
                {children}
            </div>
        </main>
        
        {/* Mobile Bottom Nav (Always visible since we are in mobile view) */}
        <BottomNav />
      </div>
    </div>
  );
}
