import { Compass, Calendar, Users, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Compass, label: "发现", path: "/" },
  { icon: Calendar, label: "班级协作", path: "/class" },
  { icon: Users, label: "圈子", path: "/circles" },
  { icon: MessageSquare, label: "关系", path: "/connections" },
  { icon: User, label: "我的", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <nav className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 p-1 transition-colors min-w-[64px]",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <item.icon 
                className={cn(
                  "h-8 w-8 p-1.5 transition-all duration-300", 
                  isActive ? "bg-primary text-white rounded-xl shadow-md transform scale-105" : "text-gray-500"
                )} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
