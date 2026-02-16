/**
 * Geração de PDF de orçamento premium – Voltmax.
 * Inclui todos os dados da empresa, validade, disclaimer e layout profissional.
 */
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY } from '@/lib/company';
import type { SolarCalculation, QuoteInputs } from '@/lib/calculator';

const GOLD = [255, 215, 0] as [number, number, number];
const BLACK = [0, 0, 0] as [number, number, number];
const DARK_GRAY = [60, 60, 60] as [number, number, number];
const LIGHT_GRAY = [240, 240, 240] as [number, number, number];

export interface QuotePdfData {
  formData: { name: string; email: string; phone: string };
  inputs: QuoteInputs;
  results: SolarCalculation;
  quoteRef?: string;
}

function quoteReference(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VM-${y}${m}${day}-${r}`;
}

export function generateQuotePdf(data: QuotePdfData): jsPDF {
  const { formData, inputs, results, quoteRef = quoteReference() } = data;
  const doc = new jsPDF();
  const pageW = 210;
  const margin = 20;
  let y = 0;

  // —— PAGE 1 ——

  // Header band (black + gold)
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, pageW, 44, 'F');
  doc.setTextColor(...GOLD);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(COMPANY.brandName, margin, 22);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(COMPANY.tagline, margin, 32);
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text(COMPANY.urls.website, margin, 39);

  y = 54;

  // Title block
  doc.setTextColor(...BLACK);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLAR QUOTATION', margin, y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...DARK_GRAY);
  doc.text(`Reference: ${quoteRef}`, margin, y + 7);
  doc.text(`Valid until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`, margin, y + 12);
  y += 22;

  // Client
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BLACK);
  doc.text('Prepared for', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.name, margin + 2, y + 6);
  doc.text(formData.email, margin + 2, y + 11);
  doc.text(formData.phone, margin + 2, y + 16);
  doc.text(`Property: ${inputs.propertyType} • ${inputs.roofType} roof • ${inputs.roofArea} m²`, margin + 2, y + 21);
  y += 30;

  // System specs table
  autoTable(doc, {
    startY: y,
    head: [['System specification', 'Value']],
    body: [
      ['Roof area', `${inputs.roofArea} m²`],
      ['Recommended system', `${results.systemSize} kWp`],
      ['Est. annual production', `${results.annualProduction.toLocaleString()} kWh`],
      ['Monthly electricity bill (est.)', `${inputs.monthlyBill} €`],
    ],
    theme: 'grid',
    headStyles: { fillColor: BLACK, textColor: GOLD, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    margin: { left: margin, right: margin },
  });
  y = (doc as any).lastAutoTable.finalY + 14;

  // Financial table
  const schemeLabel = results.klimabonusScheme === '2026'
    ? '2026 scheme (from 5 Jan 2026)'
    : 'Transition (order before 4 Mar 2026)';
  autoTable(doc, {
    startY: y,
    head: [['Financial breakdown', 'Amount (€)']],
    body: [
      ['Installation cost (indicative)', `€${results.installationCost.toLocaleString()}`],
      ['Klimabonus subsidy (−)', `€${results.subsidy.toLocaleString()}`],
      ['Klimabonus scheme', schemeLabel],
      ['NET INVESTMENT (indicative)', `€${results.netCost.toLocaleString()}`],
      ['Est. annual savings', `€${results.annualSavings.toLocaleString()}`],
    ],
    theme: 'striped',
    headStyles: { fillColor: BLACK, textColor: GOLD, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: { 1: { fontStyle: 'bold', halign: 'right' } },
    margin: { left: margin, right: margin },
  });
  y = (doc as any).lastAutoTable.finalY + 16;

  // ROI highlight
  doc.setFillColor(...GOLD);
  doc.roundedRect(margin, y, pageW - 2 * margin, 24, 2, 2, 'F');
  doc.setTextColor(...BLACK);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`RETURN ON INVESTMENT: ${results.roi} YEARS`, pageW / 2, y + 10, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Est. total savings over 25 years: €${(results.annualSavings * 25).toLocaleString()}`, pageW / 2, y + 19, { align: 'center' });
  y += 32;

  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This quotation is indicative and based on the data provided. Final offer subject to site survey and technical assessment. Prices may vary. Klimabonus eligibility and amounts depend on current regulations and your situation.', margin, y, { maxWidth: pageW - 2 * margin });
  y += 10;

  // Calculation notes (basis of figures)
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK_GRAY);
  doc.text('Calculation basis (indicative):', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('• System size: from roof area and roof type (pitched / flat / facade). Production: 900 kWh/kWp (Luxembourg indicative).', margin + 2, y + 5, { maxWidth: pageW - 2 * margin - 2 });
  doc.text('• Installation cost: market reference €2,200/kWp (excl. VAT), adjusted for roof type and property type.', margin + 2, y + 10, { maxWidth: pageW - 2 * margin - 2 });
  doc.text('• Annual savings: estimated at 45% of your declared monthly bill × 12 (self-consumption). ROI = net investment ÷ annual savings.', margin + 2, y + 15, { maxWidth: pageW - 2 * margin - 2 });
  y += 22;

  // —— Company block (premium: all info) ——
  doc.setFillColor(...LIGHT_GRAY);
  doc.rect(0, y, pageW, 52, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.rect(0, y, pageW, 52, 'S');
  const boxY = y + 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BLACK);
  doc.text(COMPANY.legalName, margin, boxY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...DARK_GRAY);
  doc.setFontSize(8);
  doc.text('Registered office:', margin, boxY + 6);
  doc.text(COMPANY.address.full, margin + 2, boxY + 11);
  doc.text('Showroom:', margin, boxY + 18);
  doc.text(COMPANY.showroom.full, margin + 2, boxY + 23);
  doc.text('Contact:', margin, boxY + 30);
  doc.text(`${COMPANY.contact.email}  •  ${COMPANY.contact.phone}  •  ${COMPANY.contact.phoneMobile}`, margin + 2, boxY + 35);
  doc.text(`Legal: ${COMPANY.legal.register}  •  VAT ${COMPANY.legal.vat}  •  ${COMPANY.urls.website}`, margin, boxY + 42);

  // Footer page 1
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`${COMPANY.brandName} – ${COMPANY.tagline}`, pageW / 2, 292, { align: 'center' });
  doc.text(`Page 1/2  •  ${quoteRef}`, pageW / 2, 297, { align: 'center' });

  // —— PAGE 2: Company & legal (premium) ——
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BLACK);
  doc.text('About Voltmax', margin, 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...DARK_GRAY);
  const aboutText = `${COMPANY.legalName} is Luxembourg's premier partner for solar photovoltaic installations, energy storage, heat pumps and thermal modernisation. We deliver high-performance solutions with transparent pricing and guaranteed ROI. Our advisors are available across the country.`;
  doc.text(doc.splitTextToSize(aboutText, pageW - 2 * margin), margin, 32);
  y = 52;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text('Registered office', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...DARK_GRAY);
  doc.text(COMPANY.address.street, margin + 2, y + 6);
  doc.text(`${COMPANY.address.postalCode} ${COMPANY.address.city}, ${COMPANY.address.country}`, margin + 2, y + 11);
  y += 22;

  doc.setFont('helvetica', 'bold');
  doc.text('Showroom', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(COMPANY.showroom.street, margin + 2, y + 6);
  doc.text(`${COMPANY.showroom.postalCode} ${COMPANY.showroom.city}, ${COMPANY.showroom.country}`, margin + 2, y + 11);
  y += 22;

  doc.setFont('helvetica', 'bold');
  doc.text('Contact', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${COMPANY.contact.email}`, margin + 2, y + 6);
  doc.text(`Phone: ${COMPANY.contact.phone}  /  ${COMPANY.contact.phoneMobile}`, margin + 2, y + 11);
  doc.text(`Website: ${COMPANY.urls.website}`, margin + 2, y + 16);
  y += 28;

  doc.setFont('helvetica', 'bold');
  doc.text('Legal information', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Company register: ${COMPANY.legal.register}  •  ID: ${COMPANY.legal.identificalNumber}`, margin + 2, y + 6);
  doc.text(`VAT: ${COMPANY.legal.vat}  •  Business permit: ${COMPANY.legal.businessPermit}`, margin + 2, y + 11);
  y += 22;

  doc.setFont('helvetica', 'bold');
  doc.text('Links', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Contact form: ${COMPANY.urls.contact}`, margin + 2, y + 6);
  doc.text(`Impressum: ${COMPANY.urls.impressum}`, margin + 2, y + 11);
  doc.text(`Terms: ${COMPANY.urls.terms}`, margin + 2, y + 16);
  y += 28;

  // —— Klimabonus 2026 rules & important notes ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text('Klimabonus 2026 – rules applied to this quote', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...DARK_GRAY);
  y += 7;

  const is2026 = results.klimabonusScheme === '2026';
  if (is2026) {
    doc.text('• Scheme 2026 (orders from 5 Jan 2026): subsidy = PPV × (1155 − 1155/35 × PPV) €, max €10,000 for PPV ≥ 15 kWp. Self-consumption only.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
    y += 5;
    doc.text('• Pre-financing available: subsidy can be deducted from the installer\'s invoice; installer must be on the official register.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
    y += 5;
    doc.text('• Installations with guaranteed feed-in tariff are not eligible for subsidy under the 2026 scheme.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
  } else {
    doc.text('• Transition scheme (order before 4 Mar 2026, invoice by 31 Dec 2026): 50% of eligible cost, max €1,250/kWp for self-consumption or energy community.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
    y += 5;
    doc.text('• Final invoice must be issued no later than 31 December 2026 to qualify under the transition rules.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
  }
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Important notes', margin, y);
  doc.setFont('helvetica', 'normal');
  y += 5;
  doc.text('• Official calculator and conditions: guichet.public.lu (simulateur photovoltaïque) and klima-agence.lu.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
  y += 5;
  doc.text('• Subsidy cannot exceed the actual eligible cost. Eligibility depends on your situation and current regulations.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
  y += 5;
  doc.text('• This document is an indicative quotation. Final terms and pricing are subject to a technical visit and written offer. Voltmax SARL reserves the right to modify or withdraw offers.', margin + 2, y, { maxWidth: pageW - 2 * margin - 2 });
  y += 12;

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`${COMPANY.legalName} – ${COMPANY.address.full}`, pageW / 2, 288, { align: 'center' });
  doc.text(`${COMPANY.contact.email}  •  ${COMPANY.contact.phone}`, pageW / 2, 293, { align: 'center' });
  doc.text(`Page 2/2  •  ${quoteRef}  •  ${new Date().toLocaleDateString()}`, pageW / 2, 298, { align: 'center' });

  return doc;
}

export function downloadQuotePdf(data: QuotePdfData): string {
  const ref = data.quoteRef || quoteReference();
  const doc = generateQuotePdf({ ...data, quoteRef: ref });
  const filename = `Voltmax_Quote_${ref}_${data.formData.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
  return ref;
}
