import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-primary/10 rounded-lg animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-10 w-12 h-12 border border-primary/30 rounded-lg animate-float" style={{ animationDelay: "4s" }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Software Engineer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Priyansh</span>
            <br />
            <span className="text-foreground">Garg</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Full-Stack Developer with expertise in Java, React Native, and cloud technologies. 
            Building scalable solutions at Kotak Mahindra Bank.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group">
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download Resume
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center">
            <a 
              href="https://www.linkedin.com/in/garg-priyansh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
            >
              <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:priyanshgarg.iitr@gmail.com"
              className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
            >
              <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
            >
              <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};