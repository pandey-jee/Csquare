import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/components/theme-provider';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { isLoaded } = useGSAP();
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? '/CWhite.png' : '/CBlack.png';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      gsapUtils.slideInLeft('.navbar-logo', 0.2);
      gsapUtils.slideInRight('.navbar-links', 0.4);
    }
  }, [isLoaded]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border' 
          : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="navbar-logo flex items-center space-x-3">
            <img 
              src={logoSrc} 
              alt="CSquare Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-foreground">CSquare</h1>
          </div>
          
          <div className="navbar-links hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link text-foreground/80 hover:text-primary transition-colors duration-300"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="nav-link text-foreground/80 hover:text-primary transition-colors duration-300"
              data-testid="nav-team"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="nav-link text-foreground/80 hover:text-primary transition-colors duration-300"
              data-testid="nav-events"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('collaborators')}
              className="nav-link text-foreground/80 hover:text-primary transition-colors duration-300"
              data-testid="nav-collaborators"
            >
              Partners
            </button>
            
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {(user as any)?.isAdmin && (
                  <Button
                    onClick={() => window.location.href = '/admin'}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-admin-dashboard"
                  >
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  onClick={() => window.location.href = '/api/logout'}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  data-testid="button-logout"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                data-testid="button-login"
              >
                Admin Login
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="w-8 h-8 flex flex-col justify-center items-center space-y-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-background/95 backdrop-blur-md border-b border-border shadow-lg transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-6 py-4 space-y-4">
          <button 
            onClick={() => scrollToSection('home')}
            className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
            data-testid="nav-home-mobile"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
            data-testid="nav-team-mobile"
          >
            Team
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
            data-testid="nav-events-mobile"
          >
            Events
          </button>
          <button 
            onClick={() => scrollToSection('collaborators')}
            className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
            data-testid="nav-collaborators-mobile"
          >
            Partners
          </button>
          
          {isAuthenticated ? (
            <div className="space-y-2 pt-2">
              {(user as any)?.isAdmin && (
                <Button
                  onClick={() => window.location.href = '/admin'}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-admin-dashboard-mobile"
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                onClick={() => window.location.href = '/api/logout'}
                variant="outline"
                className="w-full border-primary text-primary"
                data-testid="button-logout-mobile"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="pt-2">
              <Button
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-login-mobile"
              >
                Admin Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
