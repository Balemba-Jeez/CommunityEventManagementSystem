import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressFlow } from "../../components/auth/ProgressFlow";
import { Logo } from "../ui/Logo";

interface HeaderProps {
  showJoinButton?: boolean;
  onCancel?: () => void;
  rightContent?: React.ReactNode;
  currentStep: number;
}

export function Header({ showJoinButton = true, currentStep, onCancel, rightContent }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 bg-background border-b border-border">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Progress Flow */}
        <div className="hidden md:flex">
            <ProgressFlow currentStep={currentStep} />
        </div>

        {/* Mobile Progress Flow */}
        <div className="md:hidden mt-4">
            <ProgressFlow currentStep={currentStep} />
        </div>

        {/* Right Content */}
        <div className="flex items-center gap-4">
          {onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          )}

          
          {rightContent}
          
          {showJoinButton && !rightContent && (
            <Link to="/create-account">
              {/* <Button 
                className="btn-text bg-primary hover:bg-primary/90 text-primary-foreground"
                variant="outline"
              >
                Join Community
              </Button> */}
                <Button size="sm" variant="outline" className="cta-secondary text-lg px-4 py-5 rounded-xl">
                
                Join Community
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}