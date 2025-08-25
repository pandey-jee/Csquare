import { useEffect } from 'react';
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Instagram,
  Code,
  Heart,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

export default function Footer() {
  const { isLoaded } = useGSAP();

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      // Footer animation when it comes into view
      window.gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-content',
            start: 'top 90%',
          },
        }
      );

      // Stagger footer sections
      gsapUtils.staggerCards('.footer-section', 0.1);
    }
  }, [isLoaded]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="container mx-auto px-6 py-16">
        <div className="footer-content grid md:grid-cols-4 gap-12">
          {/* Club Info Section */}
          <div className="footer-section space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C²</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground" data-testid="text-footer-logo">CSquare</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-footer-description">
              Empowering the next generation of competitive programmers through collaborative learning, 
              skill development, and innovative problem-solving.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://github.com/cSquare-club', '_blank')}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://linkedin.com/company/cSquare-club', '_blank')}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://twitter.com/cSquare_club', '_blank')}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://instagram.com/cSquare_club', '_blank')}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold text-foreground mb-6" data-testid="text-quick-links">Quick Links</h4>
            <nav className="space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-about"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-team"
              >
                Our Team
              </button>
              <button 
                onClick={() => scrollToSection('events')}
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-events"
              >
                Events
              </button>
              <button 
                onClick={() => scrollToSection('collaborators')}
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-collaborators"
              >
                Partners
              </button>
            </nav>
          </div>
          
          {/* Resources Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold text-foreground mb-6">Resources</h4>
            <nav className="space-y-3">
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Practice Problems
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Tutorials
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Contest Calendar
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Study Materials
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Alumni Network
              </a>
            </nav>
          </div>
          
          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold text-foreground mb-6" data-testid="text-contact">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>Computer Science Department</p>
                  <p>University Campus</p>
                  <p>Building A, Room 101</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:contact@cSquare.club"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  contact@cSquare.club
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+1234567890"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-phone"
                >
                  +1 (234) 567-8900
                </a>
              </div>
            </div>
            
            {/* Office Hours */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-foreground mb-2">Office Hours</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 2:00 PM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-primary-foreground">
          <div className="text-center max-w-2xl mx-auto">
            <Code className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-lg opacity-90 mb-6">
              Get the latest news about workshops, competitions, and exciting opportunities 
              in the world of competitive programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                variant="secondary"
                className="px-8 py-3 font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2024 CSquare Club. Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by passionate programmers.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={scrollToTop}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
