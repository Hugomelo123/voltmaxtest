import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SolarCalculation, QuoteInputs } from '@/lib/calculator';
import { downloadQuotePdf } from '@/lib/generateQuotePdf';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface LeadFormProps {
  results: SolarCalculation;
  inputs: QuoteInputs;
}

export function LeadForm({ results, inputs }: LeadFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [quoteRef, setQuoteRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let saved = false;
    let ref = '';

    try {
      // 1) Enviar dados para o servidor (guardar lead)
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inputs: inputs,
          results: results,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        saved = true;
      }
    } catch (_err) {
      // Falha de rede: continuamos e geramos o PDF na mesma
    }

    // 2) Gerar e descarregar PDF premium (sempre)
    ref = downloadQuotePdf({
      formData,
      inputs,
      results,
    });
    setQuoteRef(ref);

    setLoading(false);
    setSuccess(true);

    toast({
      title: saved ? t('lead.toast_title_sent') : t('lead.toast_title_pdf'),
      description: saved ? t('lead.toast_sent') : t('lead.toast_pdf_only'),
      className: "bg-primary text-black border-none"
    });
  };

  if (success) {
    return (
      <Card className="bg-secondary text-secondary-foreground border-none">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-black" />
          </motion.div>
          <h3 className="text-2xl font-display font-bold text-white">{t('lead.success')}</h3>
          <p className="text-gray-400">
            {quoteRef && <span className="block font-mono text-sm text-primary/90 mb-1">Ref: {quoteRef}</span>}
            {t('lead.follow_up')} {formData.phone}.
          </p>
          <Button 
            onClick={() => setSuccess(false)}
            variant="outline" 
            className="mt-4 border-white/20 text-white hover:bg-white/10"
          >
            {t('lead.another_quote')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle className="font-display text-2xl uppercase tracking-wide">{t('lead.title')}</CardTitle>
        <CardDescription>{t('lead.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('lead.name')}</Label>
            <Input 
              id="name" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe" 
              className="bg-muted border-transparent focus:bg-background transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('lead.email')}</Label>
            <Input 
              id="email" 
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com" 
              className="bg-muted border-transparent focus:bg-background transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('lead.phone')}</Label>
            <Input 
              id="phone" 
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              placeholder="+352 691 123 456" 
              className="bg-muted border-transparent focus:bg-background transition-colors"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-gray-800 font-bold h-12 text-lg uppercase tracking-wider rounded-none relative overflow-hidden group"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('lead.sending')}
              </span>
            ) : (
              <span className="relative z-10">{t('lead.submit')}</span>
            )}
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 block w-full h-full absolute top-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
               {t('lead.submit')}
            </span>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            By submitting, you agree to receive a PDF quote and a follow-up call.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
