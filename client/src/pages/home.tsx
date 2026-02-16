import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Calculator } from '@/components/Calculator';
import { Features } from '@/components/Features';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { COMPANY } from '@/lib/company';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-12 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-display font-bold text-xl text-primary mb-4">{COMPANY.brandName}</h3>
          <p className="text-gray-400 leading-relaxed">{t('footer.description')}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-wider mb-4">{t('footer.contact')}</h4>
          <p className="text-gray-400">{COMPANY.address.full}</p>
          <p className="text-gray-400 mt-2">
            <a href={`mailto:${COMPANY.contact.email}`} className="hover:text-primary transition-colors">{COMPANY.contact.email}</a>
          </p>
          <p className="text-gray-400">
            <a href={`tel:${COMPANY.contact.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{COMPANY.contact.phone}</a>
          </p>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-wider mb-4">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href={COMPANY.urls.terms} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.terms')}</a></li>
            <li><a href={COMPANY.urls.impressum} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.impressum')}</a></li>
            <li><a href={COMPANY.urls.contact} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.contact_link')}</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {COMPANY.legalName}. {t('footer.copyright')}
      </div>
    </footer>
  );
}

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
        <Footer />
      </div>
    </LanguageProvider>
  );
}
