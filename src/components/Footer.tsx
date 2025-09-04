import { Facebook, MessageSquare, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-church-gradient rounded-lg"></div>
              <span className="text-xl font-bold font-display">PC's TACC</span>
            </div>
            <p className="text-muted-foreground">
              Connecting our community through every event, online and offline.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">About</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-primary-soft hover:bg-primary-glow text-primary rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-soft hover:bg-primary-glow text-primary rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-soft hover:bg-primary-glow text-primary rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 PC's TACC Community Cameroon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;