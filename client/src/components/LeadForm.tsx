import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SolarCalculation, QuoteInputs } from '@/lib/calculator';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

interface LeadFormProps {
  results: SolarCalculation;
  inputs: QuoteInputs;
}

export function LeadForm({ results, inputs }: LeadFormProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const primaryColor = [255, 215, 0]; // #FFD700
    const blackColor = [0, 0, 0];

    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 215, 0);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("VOLTMAX", 20, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Luxembourg's Premium Solar Partner", 20, 32);

    // Client Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SOLAR QUOTATION", 20, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Prepared for: ${formData.name}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 75);
    doc.text(`Property: ${inputs.propertyType} (${inputs.roofType})`, 20, 80);

    // System Specs Table
    autoTable(doc, {
      startY: 90,
      head: [['System Specification', 'Value']],
      body: [
        ['Roof Area', `${inputs.roofArea} m²`],
        ['System Size', `${results.systemSize} kWp`],
        ['Annual Production', `${results.annualProduction.toLocaleString()} kWh`],
        ['Estimated Monthly Bill', `${inputs.monthlyBill} €`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 215, 0] },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Financials Table
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [['Financial Breakdown', 'Amount (€)']],
      body: [
        ['Installation Cost', `€${results.installationCost.toLocaleString()}`],
        ['Klimabonus Subsidy (-)', `€${results.subsidy.toLocaleString()}`],
        ['NET INVESTMENT', `€${results.netCost.toLocaleString()}`],
        ['Annual Savings', `€${results.annualSavings.toLocaleString()}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 215, 0] },
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        1: { fontStyle: 'bold', halign: 'right' }
      }
    });

    // ROI Section
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFillColor(255, 215, 0);
    doc.roundedRect(20, finalY, 170, 30, 2, 2, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`RETURN ON INVESTMENT: ${results.roi} YEARS`, 105, finalY + 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Estimated total savings over 25 years: €${(results.annualSavings * 25).toLocaleString()}`, 105, finalY + 22, { align: 'center' });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Voltmax Luxembourg - 123 Solar Avenue, L-1234 Luxembourg", 105, 280, { align: 'center' });
    doc.text("Contact: k.gajda@voltmax.lu | +352 26 33 86", 105, 285, { align: 'center' });

    doc.save(`Voltmax_Quote_${formData.name.replace(/\s+/g, '_')}.pdf`);
  };

  const sendWhatsAppNotification = async () => {
    // This is a client-side simulation of the API call requested
    // In a real app, this would hit a backend endpoint
    console.log("Sending WhatsApp via Twilio API...");
    
    const message = `🔆 NEW VOLTMAX LEAD
👤 ${formData.name}
📞 ${formData.phone}
📧 ${formData.email}
🏠 ${inputs.propertyType} - ${inputs.roofType} - ${inputs.roofArea}m²
⚡ System: ${results.systemSize}kWp
💰 Est. value: €${results.installationCost}
🎁 Subsidy: €${results.subsidy}
📊 ROI: ${results.roi} years
→ Follow up NOW`;

    console.log(message);
    // Placeholder for actual API call
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate PDF
    generatePDF();

    // Send Notification
    await sendWhatsAppNotification();

    setLoading(false);
    setSuccess(true);
    
    toast({
      title: "Quote Generated!",
      description: "Check your downloads for the PDF.",
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
          <p className="text-gray-400">One of our solar experts will contact you shortly at {formData.phone}.</p>
          <Button 
            onClick={() => setSuccess(false)}
            variant="outline" 
            className="mt-4 border-white/20 text-white hover:bg-white/10"
          >
            Get Another Quote
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
