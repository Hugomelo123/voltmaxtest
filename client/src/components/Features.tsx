import React from 'react';
import { useLanguage } from './LanguageContext';
import { Zap, Shield, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const { t } = useLanguage();

  const features = [
    { icon: <Zap className="w-10 h-10 text-primary" />, titleKey: 'feature.1.title', descKey: 'feature.1.desc' },
    { icon: <Shield className="w-10 h-10 text-primary" />, titleKey: 'feature.2.title', descKey: 'feature.2.desc' },
    { icon: <Clock className="w-10 h-10 text-primary" />, titleKey: 'feature.3.title', descKey: 'feature.3.desc' },
    { icon: <TrendingUp className="w-10 h-10 text-primary" />, titleKey: 'feature.4.title', descKey: 'feature.4.desc' },
  ];

  return (
    <section className="py-24 bg-secondary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-xl font-display font-bold uppercase tracking-wide">{t(f.titleKey)}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
