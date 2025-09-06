import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { ProgressFlow } from "./ProgressFlow";

interface HeaderProps {
  currentStep: number;
  onCancel?: () => void;
}

export const Header = ({ currentStep, onCancel }: HeaderProps) => {
  return (
    <header className="bg-pure-white border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-bold">
              PC
            </div>
            <div>
              <h1 className="font-poppins font-bold text-xl text-primary">PC Community</h1>
              <p className="text-sm text-muted-foreground -mt-1">Events</p>
            </div>
          </div>

          {/* Progress Flow */}
          <div className="hidden md:flex">
            <ProgressFlow currentStep={currentStep} />
          </div>

        {/* Mobile Progress Flow */}
        <div className="md:hidden mt-4">
          <ProgressFlow currentStep={currentStep} />
        </div>

        {/* Cancel Button */}
        <Link
          to="/"
          onClick={onCancel}
          className="p-2 hover:bg-neutral-bg rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-secondary-gray hover:text-charcoal" />
        </Link>
      </div>
    </header>
  );
};