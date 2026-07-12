import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const baseStyles = "px-6 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-navy text-white hover:bg-deep-blue shadow-md",
      secondary: "bg-amber text-navy hover:bg-amber/90 shadow-md",
      outline: "bg-transparent text-navy border-2 border-navy hover:bg-navy/5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
