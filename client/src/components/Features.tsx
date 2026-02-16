import React from 'react';
import { useLanguage } from './LanguageContext';
import { Zap, Shield, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: language === 'en' ? "High Efficiency" : "Haute Efficacité",
      description: language === 'en' 
        ? "We use the latest N-Type TopCon technology for maximum energy yield even on cloudy days." 
        : "Nous utilisons la dernière technologie N-Type TopCon pour un rendement énergétique maximal même par temps nuageux."
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: language === 'en' ? "25-Year Warranty" : "Garantie 25 Ans",
      description: language === 'en' 
        ? "Peace of mind with industry-leading performance and product warranties on all installations." 
        : "Tranquillité d'esprit avec des garanties de performance et de produit de pointe sur toutes les installations."
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: language === 'en' ? "Fast Installation" : "Installation Rapide",
      description: language === 'en' 
        ? "From technical visit to grid connection in less than 6 weeks. We handle all Luxembourgish permits." 
        : "De la visite technique au raccordement au réseau en moins de 6 semaines. Nous gérons tous les permis luxembourgeois."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: language === 'en' ? "Smart Monitoring" : "Suivi Intelligent",
      description: language === 'en' 
        ? "Track your production and consumption in real-time with our premium mobile application." 
        : "Suivez votre production et votre consommation en temps réel grâce à notre application mobile premium."
    }
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
              <h3 className="text-xl font-display font-bold uppercase tracking-wide">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
