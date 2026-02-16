/**
 * Voltmax – PDF quote. Structure from brief: branding, client, system specs,
 * cost breakdown (Klimabonus highlighted), ROI, contact. Premium, one page.
 */
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY } from '@/lib/company';
import type { SolarCalculation, QuoteInputs } from '@/lib/calculator';

const BLACK: [number, number, number] = [0, 0, 0];
const GOLD: [number, number, number] = [255, 215, 0]; // #FFD700
const GRAY: [number, number, number] = [100, 100, 100];

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
  const margin = 24;
  let y = 20;

  // —— 1. VOLTMAX LOGO & BRANDING ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...BLACK);
  doc.text('VOLTMAX', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(COMPANY.tagline, margin, y + 6);
  doc.setFontSize(9);
  doc.text(`Ref: ${quoteRef}  ·  ${new Date().toLocaleDateString()}  ·  Valid 30 days`, margin, y + 12);
  y += 26;

  // —— 2. CLIENT DETAILS ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text('Prepared for', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(formData.name, margin, y + 6);
  doc.text(`${formData.email}  ·  ${formData.phone}`, margin, y + 12);
  doc.text(`${inputs.propertyType}  ·  ${inputs.roofType} roof  ·  ${inputs.roofArea} m²`, margin, y + 18);
  y += 28;

  // —— 3. SYSTEM SPECIFICATIONS ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text('System specification', margin, y);
  y += 6;
  autoTable(doc, {
    startY: y,
    head: [['', '']],
    body: [
      ['Roof area', `${inputs.roofArea} m²`],
      ['Recommended system', `${results.systemSize} kWp`],
      ['Est. annual production', `${results.annualProduction.toLocaleString()} kWh`],
      ['Monthly electricity bill (est.)', `${inputs.monthlyBill} €`],
    ],
    theme: 'plain',
    styles: { fontSize: 10, textColor: GRAY },
    columnStyles: { 0: { fontStyle: 'normal' }, 1: { halign: 'right', fontStyle: 'bold', textColor: BLACK } },
    margin: { left: margin },
    tableWidth: pageW - 2 * margin,
  });
  y = (doc as any).lastAutoTable.finalY + 16;

  // —— 4. COST BREAKDOWN (Klimabonus highlighted) ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text('Cost breakdown', margin, y);
  y += 8;
  const schemeLabel = results.klimabonusScheme === '2026' ? '2026 scheme' : 'Transition scheme';
  const rowH = 8;
  const col2X = pageW - margin - 50;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text('Installation cost', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BLACK);
  doc.text(`€${results.installationCost.toLocaleString()}`, pageW - margin, y, { halign: 'right' });
  y += rowH;

  doc.setFillColor(...GOLD);
  doc.rect(col2X - 4, y - 5, pageW - margin - col2X + 4, rowH + 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text('Klimabonus subsidy (−)', margin, y + 1);
  doc.text(`€${results.subsidy.toLocaleString()}`, pageW - margin, y + 1, { halign: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(schemeLabel, margin, y + 5);
  y += rowH + 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text('Net investment', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BLACK);
  doc.text(`€${results.netCost.toLocaleString()}`, pageW - margin, y, { halign: 'right' });
  y += rowH;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.text('Est. annual savings', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.text(`€${results.annualSavings.toLocaleString()}`, pageW - margin, y, { halign: 'right' });
  y += 18;

  // —— 5. ROI CALCULATION (highlighted) ——
  doc.setFillColor(...BLACK);
  doc.rect(margin, y, pageW - 2 * margin, 22, 'F');
  doc.setTextColor(...GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`ROI: ${results.roi} years`, pageW / 2, y + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Est. savings over 25 years: €${(results.annualSavings * 25).toLocaleString()}`, pageW / 2, y + 17, { align: 'center' });
  y += 30;

  // —— 6. CONTACT DETAILS ——
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text('Contact', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(`k.gajda@voltmax.lu  ·  +352 26 33 86`, margin, y + 6);
  doc.text(COMPANY.address.full, margin, y + 12);
  doc.text(COMPANY.urls.website, margin, y + 18);
  y += 26;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Indicative quote. Final offer after site visit. Klimabonus subject to eligibility.', margin, y);
  doc.text(`© ${new Date().getFullYear()} ${COMPANY.legalName}`, pageW / 2, 292, { align: 'center' });

  return doc;
}

export function downloadQuotePdf(data: QuotePdfData): string {
  const ref = data.quoteRef || quoteReference();
  const doc = generateQuotePdf({ ...data, quoteRef: ref });
  const filename = `Voltmax_Quote_${ref}_${data.formData.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
  return ref;
}
