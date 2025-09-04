import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-church-gradient rounded-lg"></div>
            <span className="text-xl font-bold text-foreground font-display">PC's TACC</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button className="cta-primary" size="sm">
              Join Community
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </a>
              <Button variant="ghost" size="sm" className="justify-start">
                Login
              </Button>
              <Button className="cta-primary" size="sm">
                Join Community
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;