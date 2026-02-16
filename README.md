# voltmaxtest

**Voltmax Quote Generator** – Gerador de orçamentos solares para **Voltmax SARL** (Luxemburgo), com calculadora de ROI e subsídio Klimabonus. Dados e fórmulas verificados junto das fontes oficiais (2026).

## Clone e instalação

```bash
git clone https://github.com/Hugomelo123/voltmaxtest.git
cd voltmaxtest
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5000` (ou na porta indicada no terminal).

## Dados verificados (fev 2026)

### Empresa – Voltmax SARL
- **Fonte:** [voltmax.lu](https://voltmax.lu) — [Contact](https://voltmax.lu/contact/), [Impressum](https://voltmax.lu/impressum/).
- **Morada (escritório registado):** 47 Rue Mathias Tresch, L-2626 Luxembourg  
- **Showroom:** 7 Pl. de l'Indépendance, 4418 Soleuvre Sanem, Luxembourg  
- **Contacto:** info@voltmax.lu | +352 26 33 86 (e +352 661 770 871)  
- **Legal:** B270450, TVA LU34874947  

Tudo centralizado em `client/src/lib/company.ts`.

### Klimabonus (subsídio Estado) – 2026

Fontes: [Klima-Agence](https://www.klima-agence.lu), [Guichet.lu](https://guichet.public.lu) (Klimabonus 2026, pré-financiamento PV).

#### Dois regimes no calculador

1. **Regime 2026** (padrão) – ofertas a partir de 5 jan 2026  
   - **PV:** fórmula oficial **PPV × (1155 − 1155/35 × PPV) €**, máximo **10 000 €** para PPV ≥ 15 kWp.  
   - **Bateria** (opcional): fórmula à parte, máx. 2 250 € a 9 kWh.  
   - Pré-financiamento: subvenção deduzida na fatura; instalador deve estar no [registo de instaladores](https://guichet.public.lu/en/citoyens/outils/registre-installateurs.html).  
   - Instalações com tarifa de injecção garantida **não** são elegíveis.

2. **Regime de transição** – ofertas entre 1 out 2024 e 4 mar 2026 (fatura até 31 dez 2026)  
   - Autoconsumo / comunidade de energia: **50%** do custo, **máx. 1 250 €/kWp**.

O utilizador escolhe o regime na calculadora; o PDF do orçamento indica qual foi usado.

#### Links oficiais
- [Calculador oficial PV (fórmula 2026)](https://guichet.public.lu/en/citoyens/outils/simulateur-photovoltaique.html)  
- [Pré-financiamento PV](https://guichet.public.lu/en/citoyens/aides/logement-construction/prefinancement-photovoltaique/prefinancement-installations-photovoltaiques.html)  
- [Simulador ajudas Klima-Agence](https://aides.klima-agence.lu/)  
- [Transição Klimabonus (Klima-Agence)](https://www.klima-agence.lu/en/understanding-transition-period-klimabonus-financial-subsidy-scheme-your-photovoltaic-installation)

## Estrutura do projeto

- **`client/src/lib/company.ts`** – Dados Voltmax e constantes/URLs Klimabonus (transição + 2026).  
- **`client/src/lib/calculator.ts`** – Cálculo do orçamento (potência, produção, custo, subsídio por regime, ROI).  
- **Footer e PDF** – Usam `COMPANY`; o PDF inclui o regime Klimabonus aplicado.

## Como correr (já dentro do projeto)

```bash
npm install
npm run dev
```

---

*Última verificação de dados: fevereiro 2026.*
