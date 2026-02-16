import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { calculateSolar, QuoteInputs, SolarCalculation } from '@/lib/calculator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Building2, Building, ArrowDown, Leaf, Sun, TrendingUp, Euro } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { motion, AnimatePresence } from 'framer-motion';

export function Calculator() {
  const { t } = useLanguage();
  
  const [inputs, setInputs] = useState<QuoteInputs>({
    propertyType: 'house',
    roofType: 'pitched',
    roofArea: 60,
    monthlyBill: 150
  });

  const [results, setResults] = useState<SolarCalculation>(calculateSolar(inputs));

  useEffect(() => {
    setResults(calculateSolar(inputs));
  }, [inputs]);

  const handleSliderChange = (key: keyof QuoteInputs, value: number[]) => {
    setInputs(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleRadioChange = (key: keyof QuoteInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="calculator" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Smart Calculator</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Calculate Your Solar Potential</h2>
          <p className="text-muted-foreground text-lg">Adjust the sliders to see your estimated savings and system size instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* INPUT FORM */}
          <Card className="lg:col-span-5 bg-card border-border shadow-xl rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-8 space-y-8">
              
              {/* Property Type */}
              <div className="space-y-4">
                <Label className="text-base font-bold uppercase tracking-wide flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  {t('form.property_type')}
                </Label>
                <RadioGroup 
                  value={inputs.propertyType} 
                  onValueChange={(val) => handleRadioChange('propertyType', val)}
                  className="grid grid-cols-3 gap-3"
                >
                  <Label htmlFor="house" className={`flex flex-col items-center justify-center p-3 border-2 cursor-pointer transition-all hover:bg-muted ${inputs.propertyType === 'house' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="house" id="house" className="sr-only" />
                    <Home className="mb-2 w-5 h-5" />
                    <span className="text-xs font-bold text-center">{t('form.house')}</span>
                  </Label>
                  <Label htmlFor="apartment" className={`flex flex-col items-center justify-center p-3 border-2 cursor-pointer transition-all hover:bg-muted ${inputs.propertyType === 'apartment' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="apartment" id="apartment" className="sr-only" />
                    <Building className="mb-2 w-5 h-5" />
                    <span className="text-xs font-bold text-center">{t('form.apartment')}</span>
                  </Label>
                  <Label htmlFor="business" className={`flex flex-col items-center justify-center p-3 border-2 cursor-pointer transition-all hover:bg-muted ${inputs.propertyType === 'business' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="business" id="business" className="sr-only" />
                    <Building2 className="mb-2 w-5 h-5" />
                    <span className="text-xs font-bold text-center">{t('form.business')}</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Roof Type */}
              <div className="space-y-4">
                <Label className="text-base font-bold uppercase tracking-wide flex items-center gap-2">
                  <ArrowDown className="w-4 h-4 text-primary" />
                  {t('form.roof_type')}
                </Label>
                <div className="flex gap-2 p-1 bg-muted rounded-none">
                  {[
                    { val: 'pitched', label: t('form.pitched') },
                    { val: 'flat', label: t('form.flat') },
                    { val: 'facade', label: t('form.facade') }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleRadioChange('roofType', opt.val)}
                      className={`flex-1 py-2 text-sm font-medium transition-all ${inputs.roofType === opt.val ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="font-bold uppercase tracking-wide">{t('form.roof_area')}</Label>
                    <span className="text-2xl font-display font-bold text-primary">{inputs.roofArea} m²</span>
                  </div>
                  <Slider 
                    value={[inputs.roofArea]} 
                    min={10} 
                    max={200} 
                    step={5} 
                    onValueChange={(val) => handleSliderChange('roofArea', val)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 m²</span>
                    <span>200 m²</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-end">
                    <Label className="font-bold uppercase tracking-wide">{t('form.monthly_bill')}</Label>
                    <span className="text-2xl font-display font-bold text-primary">{inputs.monthlyBill} €</span>
                  </div>
                  <Slider 
                    value={[inputs.monthlyBill]} 
                    min={50} 
                    max={500} 
                    step={10} 
                    onValueChange={(val) => handleSliderChange('monthlyBill', val)}
                    className="py-2"
                  />
                   <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50 €</span>
                    <span>500 €</span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* RESULTS DISPLAY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* System Size */}
              <ResultCard 
                icon={<Sun className="w-5 h-5 text-primary" />}
                label={t('result.system_size')}
                value={`${results.systemSize} kWp`}
                subValue={`${Math.ceil(results.systemSize * 2.5)} Panels`}
              />

              {/* Annual Production */}
              <ResultCard 
                icon={<Leaf className="w-5 h-5 text-green-500" />}
                label={t('result.production')}
                value={`${results.annualProduction.toLocaleString()} kWh`}
                subValue="Green Energy"
              />

              {/* Net Cost */}
              <ResultCard 
                icon={<Euro className="w-5 h-5 text-primary" />}
                label={t('result.net_cost')}
                value={`€${results.netCost.toLocaleString()}`}
                subValue={`After €${results.subsidy.toLocaleString()} subsidy`}
                highlight
              />

              {/* ROI */}
              <ResultCard 
                icon={<TrendingUp className="w-5 h-5 text-primary" />}
                label={t('result.roi')}
                value={`${results.roi} ${t('result.years')}`}
                subValue={`Save €${results.annualSavings.toLocaleString()} / year`}
              />
            </div>

            <LeadForm results={results} inputs={inputs} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ icon, label, value, subValue, highlight = false }: { icon: React.ReactNode, label: string, value: string, subValue: string, highlight?: boolean }) {
  return (
    <motion.div 
      layout
      className={`p-6 border rounded-none flex flex-col justify-between h-32 relative overflow-hidden transition-all hover:shadow-lg ${highlight ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-card border-border'}`}
    >
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold uppercase tracking-wider ${highlight ? 'text-gray-400' : 'text-muted-foreground'}`}>{label}</span>
        {icon}
      </div>
      <div>
        <div className={`text-3xl font-display font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </div>
        <div className={`text-xs mt-1 ${highlight ? 'text-gray-400' : 'text-muted-foreground'}`}>
          {subValue}
        </div>
      </div>
    </motion.div>
  );
}
