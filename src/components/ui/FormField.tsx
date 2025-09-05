import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base font-body text-charcoal placeholder:text-secondary-gray focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-body">{error}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };