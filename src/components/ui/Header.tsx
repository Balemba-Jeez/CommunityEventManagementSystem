import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface HeaderProps {
  onCancel?: () => void;
}

export const Header = ({ onCancel }: HeaderProps) => {
  return (
    <header className="bg-pure-white border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-heading font-semibold text-royal-blue">
            PC Community | Events
          </h1>
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