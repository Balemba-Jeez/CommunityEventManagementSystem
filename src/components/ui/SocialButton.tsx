import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  provider: string;
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, icon, provider, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex items-center justify-center gap-3 w-full h-12 px-6 py-3 bg-secondary text-charcoal border border-border rounded-lg font-button font-medium transition-colors hover:bg-border active:bg-border/80 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
      >
        {icon}
        <span>Sign in with {provider}</span>
      </button>
    );
  }
);
SocialButton.displayName = "SocialButton";

export { SocialButton };