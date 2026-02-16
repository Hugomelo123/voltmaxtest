import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Calculator } from '@/components/Calculator';
import { Features } from '@/components/Features';
import { LanguageProvider } from '@/components/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black">
        <Header />
        <main>
          <Hero />
          <Features />
          <Calculator />
        </main>
        
        <footer id="contact" className="bg-secondary text-secondary-foreground py-12 border-t border-white/10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-4">VOLTMAX</h3>
              <p className="text-gray-400 leading-relaxed">
                Luxembourg's premier solar installation partner. 
                Delivering high-performance photovoltaic solutions with transparent pricing and guaranteed ROI.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4">Contact</h4>
              <p className="text-gray-400">123 Solar Avenue, L-1234 Luxembourg</p>
              <p className="text-gray-400 mt-2">k.gajda@voltmax.lu</p>
              <p className="text-gray-400">+352 26 33 86</p>
            </div>
            <div>
               <h4 className="font-bold uppercase tracking-wider mb-4">Legal</h4>
               <ul className="space-y-2 text-gray-400">
                 <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                 <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
               </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Voltmax Luxembourg. All rights reserved.
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
