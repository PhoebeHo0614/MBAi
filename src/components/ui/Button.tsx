import * as React from "react";
import { cn } from "../../utils/cn";

// Note: Installing class-variance-authority for easier variant management would be good, 
// but since I haven't installed it, I will implement a simpler version or just install it.
// Actually, let's just implement it with simple props first to avoid extra dependencies if not strictly needed.
// But cva is very standard. I'll stick to simple props for now to keep it lightweight as per "Technical Constraints".

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, ...props }, ref) => {
    
    const variants = {
      primary: "bg-accent text-primary-dark hover:bg-accent-light border border-transparent",
      secondary: "bg-primary-light text-white hover:bg-primary-light/80 border border-transparent",
      outline: "bg-transparent border border-white/20 text-white hover:border-accent hover:text-accent transition-colors duration-300",
      ghost: "bg-transparent text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3 text-lg",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };