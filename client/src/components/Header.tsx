import React from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { Menu } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Voltmax" className="h-8 md:h-10 w-auto" />
          <span className="font-display font-bold text-xl tracking-tighter hidden sm:inline-block">VOLTMAX</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</a>
          <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.calculator')}</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-secondary/5 rounded-full p-1">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'fr' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              FR
            </button>
          </div>
          
          <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none uppercase tracking-wider">
            {t('nav.get_quote')}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
