# D'Aprile Caffè — Funnel VSL

Funnel Next.js con VSL, quiz, checkout custom e integrazione Shopify Storefront API.

## Flusso

`/` (VSL) → `/quiz` → `/loading` → `/checkout` → `/oto` → `/thank-you`

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion
- Shopify Storefront & Admin API
- Facebook Pixel

## Setup

1. Copia `.env.example` in `.env.local` e compila le variabili
2. Installa dipendenze: `npm install`
3. Avvia dev server: `npm run dev`
4. Apri [http://localhost:3000](http://localhost:3000)

## Variabili d'ambiente

Vedi `.env.example` per la lista completa.

## Deploy

Questo progetto è ottimizzato per Vercel. Importa il repo, imposta le env vars e fai deploy.

## Pagine

| Route | Descrizione |
|---|---|
| `/` | VSL page con video, timer, CTA |
| `/quiz` | Quiz 4 domande (formato, intensità, consumo, famiglia) |
| `/loading` | Loader di transizione con urgency |
| `/checkout` | Checkout custom (carta inline + PayPal redirect) |
| `/oto` | One-time offer post-purchase |
| `/thank-you` | Conferma ordine con Purchase pixel event |
