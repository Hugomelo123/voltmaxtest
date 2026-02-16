import React from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBg from '@/assets/solar-hero.png';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img 
          src={heroBg} 
          alt="Solar Panels" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 px-4 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-4 h-4 fill-primary" />
            <span className="text-xs font-bold tracking-wider uppercase">{t('hero.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-6">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-8 h-14 rounded-none uppercase tracking-wider"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-4 px-6 text-sm font-medium">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center text-[10px]">
                    ⭐
                  </div>
                ))}
              </div>
              <div>
                <span className="block font-bold text-white">{t('hero.rating')}</span>
                <span className="text-white/60">{t('hero.rating_based')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
