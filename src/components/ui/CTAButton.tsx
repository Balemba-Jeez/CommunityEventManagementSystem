import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "sm" | "lg";
  loading?: boolean;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", size = "default", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-lg font-button font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          
          // Variants
          {
            "bg-royal-blue text-pure-white hover:bg-royal-blue/90 active:bg-royal-blue/95": variant === "primary",
            "bg-neutral-bg text-charcoal hover:bg-border active:bg-border/80": variant === "secondary",
          },
          
          // Sizes
          {
            "h-10 px-4 py-2 text-sm": size === "sm",
            "h-12 px-6 py-3 text-base": size === "default",
            "h-14 px-8 py-4 text-lg": size === "lg",
          },
          
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
CTAButton.displayName = "CTAButton";

export { CTAButton };