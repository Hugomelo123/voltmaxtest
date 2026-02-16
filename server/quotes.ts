/**
 * Armazenamento de leads/orçamentos (em memória).
 * Pode depois ser substituído por base de dados ou envio por email.
 */
export interface QuoteLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  createdAt: string;
}

const leads: QuoteLead[] = [];

function randomId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export async function saveQuote(data: Omit<QuoteLead, "id">): Promise<string> {
  const id = randomId();
  const lead: QuoteLead = { ...data, id };
  leads.push(lead);
  console.log(`[quotes] New lead saved: ${id} – ${data.name} (${data.email})`);
  return id;
}

export function getQuotes(): QuoteLead[] {
  return [...leads];
}
