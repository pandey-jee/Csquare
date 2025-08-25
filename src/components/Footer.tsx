import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export default function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/CWhite.png' : '/CBlack.png';

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src={logoSrc} alt="C Square" className="w-8 h-8" />
            <span className="text-xl font-bold text-foreground">C Square</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2024 C Square. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
