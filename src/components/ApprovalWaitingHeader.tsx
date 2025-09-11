import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Logo } from "./ui/Logo";

interface HeaderProps {
  onCancel?: () => void;
  title?: string;
}

export const Header = ({ onCancel, title }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border px-6 py-4 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Center Title */}
        {title && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-lg font-heading font-medium text-[#2C2C2C]">
              {title}
            </h2>
          </div>
        )}

        {/* Cancel Button */}
        <Link
          to="/"
          onClick={onCancel}
          className="p-2 hover:bg-[#F4F6F7] rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-secondary-gray hover:text-foreground" />
        </Link>
      </div>
    </header>
  );
};