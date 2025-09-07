import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface Role {
  id: string;
  name: string;
  image?: string;
  icon?: React.ReactNode;
}

export interface RoleCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  role: Role;
  selected?: boolean;
}

const RoleCard = forwardRef<HTMLButtonElement, RoleCardProps>(
  ({ className, role, selected, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex items-center gap-4 w-full p-4 bg-card border border-border rounded-lg font-body text-left transition-all hover:bg-neutral-bg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2",
          selected && "border-royal-blue bg-royal-blue/5",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Role Image/Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-neutral-bg rounded-lg flex items-center justify-center">
          {role.image ? (
            <img
              src={role.image}
              alt={role.name}
              className="w-8 h-8 object-cover rounded"
            />
          ) : (
            role.icon || (
              <div className="w-8 h-8 bg-royal-blue/20 rounded-full flex items-center justify-center">
                <span className="text-royal-blue font-semibold text-sm">
                  {role.name.charAt(0)}
                </span>
              </div>
            )
          )}
        </div>

        {/* Role Name */}
        <div className="flex-1">
          <h3 className="font-semibold text-charcoal">{role.name}</h3>
        </div>

        {/* Selection Indicator */}
        <div className={cn(
          "w-4 h-4 rounded-full border-2 transition-colors",
          selected
            ? "border-royal-blue bg-royal-blue" 
            : "border-secondary-gray"
        )}>
          {selected && (
            <div className="w-full h-full rounded-full bg-royal-blue flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          )}
        </div>
      </button>
    );
  }
);
RoleCard.displayName = "RoleCard";

export { RoleCard };