"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import OrderNotifications from "../../components/OrderNotifications";
import CheckoutTimer from "../../components/CheckoutTimer";
import TrustSignals from "../../components/TrustSignals";
import BrandQuotes from "../../components/BrandQuotes";
import { trackInitiateCheckout, trackAddToCart, initPixel } from "../../lib/pixel";
import { getOffersForQuiz, type FunnelProduct } from "../../lib/shopify";

/* ─── Icons ─── */
function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-3.5 h-3.5 text-warm-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function PayPalLogo() {
  return (
    <svg viewBox="0 0 101 32" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
      <path fill="#253B80" d="M12.2 6.8H5.6c-.5 0-.8.3-.9.8L2 24.4c0 .3.2.6.5.6h3.1c.5 0 .8-.3.9-.8l.7-4.5c.1-.5.5-.8.9-.8h2.1c4.4 0 6.9-2.1 7.6-6.3.3-1.8 0-3.3-.8-4.3-1-1-2.7-1.5-4.8-1.5zm.8 6.2c-.4 2.4-2.2 2.4-4 2.4h-1l.7-4.6c0-.3.3-.5.6-.5h.5c1.2 0 2.3 0 2.9.7.4.4.5 1.1.3 2z"/>
      <path fill="#253B80" d="M31.9 12.9h-3.1c-.3 0-.5.2-.6.5l-.1.9-.2-.3c-.7-1-2.2-1.3-3.7-1.3-3.5 0-6.5 2.6-7.1 6.3-.3 1.8.1 3.6 1.2 4.8 1 1.1 2.4 1.6 4.1 1.6 2.8 0 4.3-1.8 4.3-1.8l-.1.9c0 .3.2.6.5.6h2.8c.5 0 .8-.3.9-.8l1.7-10.8c.1-.3-.2-.6-.6-.6zm-4.3 6.1c-.3 1.8-1.7 3-3.5 3-.9 0-1.7-.3-2.1-.8-.5-.5-.6-1.3-.5-2.1.3-1.8 1.7-3 3.5-3 .9 0 1.7.3 2.1.9.5.5.7 1.2.5 2z"/>
      <path fill="#253B80" d="M48.6 12.9h-3.1c-.3 0-.6.1-.8.4l-4.3 6.3-1.8-6.1c-.1-.4-.5-.6-.8-.6h-3.1c-.4 0-.7.4-.5.7l3.4 10-3.2 4.5c-.2.3 0 .8.4.8h3.1c.3 0 .6-.1.8-.4l10.3-14.9c.2-.3 0-.7-.4-.7z"/>
      <path fill="#179BD7" d="M58.9 6.8h-6.6c-.5 0-.8.3-.9.8L48.7 24.4c0 .3.2.6.5.6h3.4c.3 0 .6-.2.6-.5l.7-4.8c.1-.5.5-.8.9-.8h2.1c4.4 0 6.9-2.1 7.6-6.3.3-1.8 0-3.3-.8-4.3-1-1-2.7-1.5-4.8-1.5zm.8 6.2c-.4 2.4-2.2 2.4-4 2.4h-1l.7-4.6c0-.3.3-.5.6-.5h.5c1.2 0 2.3 0 2.9.7.4.4.5 1.1.3 2z"/>
      <path fill="#179BD7" d="M78.6 12.9h-3.1c-.3 0-.5.2-.6.5l-.1.9-.2-.3c-.7-1-2.2-1.3-3.7-1.3-3.5 0-6.5 2.6-7.1 6.3-.3 1.8.1 3.6 1.2 4.8 1 1.1 2.4 1.6 4.1 1.6 2.8 0 4.3-1.8 4.3-1.8l-.1.9c0 .3.2.6.5.6h2.8c.5 0 .8-.3.9-.8l1.7-10.8c0-.3-.2-.6-.6-.6zm-4.3 6.1c-.3 1.8-1.7 3-3.5 3-.9 0-1.7-.3-2.1-.8-.5-.5-.6-1.3-.5-2.1.3-1.8 1.7-3 3.5-3 .9 0 1.7.3 2.1.9.5.5.7 1.2.5 2z"/>
      <path fill="#179BD7" d="M82.3 7.3l-2.7 17.1c0 .3.2.6.5.6h2.7c.5 0 .8-.3.9-.8L86.4 7c0-.3-.2-.6-.5-.6h-3c-.3 0-.5.2-.6.5z"/>
    </svg>
  );
}

function CardBrand({ name }: { name: string }) {
  const colors: Record<string, string> = { visa: "#1A1F71", mastercard: "#EB001B", amex: "#006FCF", postepay: "#FFCD00" };
  const textColor: Record<string, string> = { visa: "#fff", mastercard: "#fff", amex: "#fff", postepay: "#003399" };
  const labels: Record<string, string> = { visa: "VISA", mastercard: "MASTERCARD", amex: "AMEX", postepay: "POSTEPAY" };
  return (
    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide" style={{ backgroundColor: colors[name], color: textColor[name] || "#fff" }}>
      {labels[name] || name}
    </span>
  );
}

/* ─── Floating label input ─── */
function FloatingInput({ label, type = "text", name, value, onChange, half }: {
  label: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; half?: boolean;
}) {
  return (
    <div className={`relative ${half ? "flex-1" : "w-full"}`}>
      <input type={type} name={name} value={value} onChange={onChange} placeholder=" "
        className="peer w-full px-4 pt-6 pb-2.5 border border-cream-dark rounded-xl text-base text-coffee-dark bg-white focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee transition-colors" />
      <label className="absolute left-4 top-2 text-[11px] text-warm-gray transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-coffee pointer-events-none">
        {label}
      </label>
    </div>
  );
}

/* ─── Stock indicator ─── */
function StockIndicator() {
  const [stock] = useState(() => Math.floor(Math.random() * 15) + 18); // 18-32
  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-amber-500" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <p className="text-sm text-amber-700">
        Solo <strong>{stock} confezioni</strong> rimaste in magazzino
      </p>
    </div>
  );
}

/* ─── Quiz Tag ─── */
function QuizTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream rounded-lg px-3 py-1.5 text-center flex-1">
      <p className="text-[9px] text-warm-gray uppercase tracking-wider">{label}</p>
      <p className="text-[11px] font-semibold text-coffee-dark uppercase tracking-wide mt-0.5">{value}</p>
    </div>
  );
}

/* ─── Checkout Page ─── */
export default function CheckoutPage() {
  const [answers, setAnswers] = useState<{ formato: string; intensita: string; consumo: string; famiglia: string } | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<"kit" | "mese1" | "mesi3">("mese1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "",
    province: "", cap: "", phone: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("daprileQuiz");
    if (saved) {
      const parsedAnswers = JSON.parse(saved);
      setAnswers(parsedAnswers);
      // Fire InitiateCheckout with the default offer's value (mese1)
      const offers = getOffersForQuiz(parsedAnswers.formato, parsedAnswers.intensita);
      const defaultOffer = offers.mese1;
      trackInitiateCheckout({
        content_name: defaultOffer.name,
        value: defaultOffer.price,
        currency: "EUR",
        content_ids: [defaultOffer.variantId],
        num_items: 1,
      });
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (!answers) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <p className="text-warm-gray text-base">Caricamento...</p>
      </div>
    );
  }

  const offerData = getOffersForQuiz(answers.formato, answers.intensita);
  const offers: { id: "kit" | "mese1" | "mesi3"; data: FunnelProduct; tag?: string }[] = [
    { id: "kit", data: offerData.kit },
    { id: "mese1", data: offerData.mese1, tag: "Consigliato per te" },
    { id: "mesi3", data: offerData.mesi3, tag: "Più conveniente" },
  ];
  const currentOffer = offers.find((o) => o.id === selectedOffer)!;

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    // Re-init pixel with Advanced Matching (email/phone) so the events that
    // follow + any attribution on the Shopify side benefits from better matching.
    initPixel({
      em: form.email,
      ph: form.phone,
      fn: form.firstName,
      ln: form.lastName,
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: currentOffer.data.variantId,
          email: form.email,
          shipping: {
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            city: form.city,
            province: form.province,
            cap: form.cap,
            phone: form.phone,
          },
        }),
      });
      const data = await res.json();

      if (!data.success || !data.cart?.checkoutUrl) {
        throw new Error(data.error || "Errore nella creazione dell'ordine");
      }

      localStorage.setItem("daprileOrder", JSON.stringify({
        email: form.email,
        firstName: form.firstName,
        product: currentOffer.data.name,
        quantity: currentOffer.data.quantity,
        total: currentOffer.data.price,
        cartId: data.cart.id,
      }));

      window.location.href = data.cart.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il checkout");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)" }}>
      <CheckoutTimer />

      <header className="bg-white border-b border-cream-dark/50 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center md:justify-start">
          <Image src="/logo.webp" alt="D'Aprile Caffè" width={100} height={100} className="h-12 md:h-14 w-auto" priority />
        </div>
      </header>

      {/* Trust signals — brand heritage right below the header */}
      <div className="max-w-5xl mx-auto px-4 pt-5">
        <TrustSignals variant="checkout" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-14">

          {/* ─── LEFT: Form ─── */}
          <div className="flex-1 min-w-0">
            <nav className="text-sm text-warm-gray/50 mb-10 flex items-center gap-2">
              <span className="text-coffee-dark font-medium">Informazioni</span>
              <ChevronRight />
              <span>Spedizione</span>
              <ChevronRight />
              <span>Pagamento</span>
            </nav>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="font-heading text-xl text-coffee-dark mb-4">Contatto</h2>
              <FloatingInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
            </section>

            {/* Shipping */}
            <section className="mb-10">
              <h2 className="font-heading text-xl text-coffee-dark mb-4">Indirizzo di spedizione</h2>
              <div className="space-y-3">
                <FloatingInput label="Nome" name="firstName" value={form.firstName} onChange={handleChange} />
                <FloatingInput label="Cognome" name="lastName" value={form.lastName} onChange={handleChange} />
                <FloatingInput label="Indirizzo" name="address" value={form.address} onChange={handleChange} />
                <FloatingInput label="Città" name="city" value={form.city} onChange={handleChange} />
                <FloatingInput label="Provincia" name="province" value={form.province} onChange={handleChange} />
                <FloatingInput label="CAP" name="cap" value={form.cap} onChange={handleChange} />
                <FloatingInput label="Telefono" type="tel" name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </section>

            {/* Shipping method */}
            <section className="mb-10">
              <h2 className="font-heading text-xl text-coffee-dark mb-4">Spedizione</h2>
              <div className="border border-gold ring-2 ring-gold/20 shadow-md shadow-gold/10 rounded-xl px-5 py-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-[5px] border-gold-dark flex-shrink-0" />
                    <span className="text-base text-coffee-dark font-medium">Spedizione standard</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-warm-gray/40 line-through text-sm">&euro;4,90</span>
                    <span className="text-base font-semibold text-green-700">Gratis</span>
                  </div>
                </div>
                <p className="text-sm text-warm-gray ml-8 mt-1">2/4 giorni lavorativi · <span className="text-gold-dark italic">offerta da noi :)</span></p>
              </div>
            </section>

            {/* Payment */}
            <section className="mb-10">
              <h2 className="font-heading text-xl text-coffee-dark mb-4">Pagamento</h2>

              <div className="border border-cream-dark rounded-xl bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-base text-coffee-dark font-medium">
                    Metodi accettati
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap [&>span:last-child>svg]:h-4">
                    <CardBrand name="visa" />
                    <CardBrand name="mastercard" />
                    <CardBrand name="amex" />
                    <CardBrand name="postepay" />
                    <span className="inline-flex items-center"><PayPalLogo /></span>
                  </div>
                </div>
                <p className="text-sm text-warm-gray leading-relaxed mt-4">
                  Al click su <strong>Completa l&apos;ordine</strong> verrai reindirizzato alla pagina di pagamento sicura dove potrai scegliere tra carta, PayPal, Apple Pay e Google Pay.
                </p>
              </div>

              <p className="text-sm text-warm-gray/60 mt-3 flex items-center justify-center gap-2">
                <LockIcon className="w-4 h-4" />
                Transazione crittografata e sicura
              </p>
            </section>

            {/* Brand quotes — reassurance right before the CTA */}
            <div className="mb-6 bg-white rounded-xl border border-cream-dark/40 px-4">
              <BrandQuotes compact />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-5 bg-green-700 hover:bg-green-600 disabled:bg-green-700/50 text-white font-bold text-xl rounded-xl transition-all cursor-pointer shadow-lg shadow-green-700/25 hover:shadow-xl hover:shadow-green-600/30 uppercase tracking-widest disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Elaborazione...
                </span>
              ) : (
                <>
                  <span className="block">Completa l&apos;ordine</span>
                  <span className="block text-xs font-normal tracking-normal normal-case text-white/70 mt-1">Spediremo il tuo ordine subito...</span>
                </>
              )}
            </motion.button>

            {/* Trust */}
            <div className="flex items-center justify-center gap-3 mt-4 text-warm-gray/50 text-[10px] uppercase tracking-widest">
              <LockIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Sicuro</span>
              <span>&middot;</span>
              <span>Spedizione gratis</span>
            </div>
          </div>

          {/* ─── RIGHT: Order Summary ─── */}
          <div className="md:w-[400px] flex-shrink-0">
            <div className="md:sticky md:top-8 space-y-5">

              {/* Product result */}
              <div className="bg-white rounded-2xl border border-cream-dark/50 p-6 shadow-sm">
                <p className="text-xs text-gold-dark uppercase tracking-[0.2em] font-semibold mb-3">Selezionato per te</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-cream-light border border-cream-dark/30">
                    <Image src={offerData.mese1.imageUrl} alt={offerData.formatName} fill className="object-contain p-1" sizes="96px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg md:text-xl text-coffee-dark leading-tight mb-0.5">{offerData.formatName}</h3>
                    <p className="text-sm md:text-base text-warm-gray">Miscela {offerData.miscela}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <QuizTag label="Intensità" value={answers.intensita} />
                  <QuizTag label="Consumo" value={`${answers.consumo}/giorno`} />
                  <QuizTag label="Famiglia" value={answers.famiglia === "1" ? "1 pers." : `${answers.famiglia} pers.`} />
                </div>
                <StockIndicator />
              </div>

              {/* Offer tiers */}
              <div>
                <p className="text-xs text-gold-dark uppercase tracking-[0.2em] font-semibold mb-3">Scegli la quantità</p>
                <div className="space-y-4">
                  {offers.map((offer) => {
                    const isSelected = selectedOffer === offer.id;
                    const isBest = offer.id === "mesi3";
                    const isRec = offer.id === "mese1";

                    return (
                      <motion.button
                        key={offer.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedOffer(offer.id);
                          trackAddToCart({ content_name: offer.data.name, value: offer.data.price, currency: "EUR", content_ids: [offer.data.variantId] });
                        }}
                        className={`w-full text-left rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                          isBest
                            ? `shadow-lg ${isSelected ? "border-gold ring-2 ring-gold/30 shadow-gold/10" : "border-gold hover:border-gold-dark"}`
                            : `shadow-sm ${isSelected ? "border-gold ring-2 ring-gold/20 shadow-md shadow-gold/10" : "border-cream-dark/50 hover:border-gold/40 hover:shadow-md"}`
                        }`}
                      >
                        {offer.tag && (
                          <div className={`py-2 px-4 text-center ${isRec ? "bg-brand-red" : "bg-gradient-to-r from-gold-dark via-gold to-gold-dark"}`}>
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{offer.tag}</span>
                          </div>
                        )}
                        <div className={`flex items-center bg-white ${isBest ? "p-5" : "p-4"}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${isSelected ? "border-gold-dark" : "border-cream-dark"}`}>
                            {isSelected && <div className="w-3 h-3 rounded-full bg-gold-dark" />}
                          </div>
                          <div className="flex-1 min-w-0 mr-3">
                            <span className={`font-bold text-coffee-dark leading-tight whitespace-nowrap ${isBest ? "text-base md:text-lg" : "text-sm md:text-base"}`}>{offer.data.name}</span>
                            <p className={`text-warm-gray leading-tight mt-0.5 ${isBest ? "text-base" : "text-sm"}`}>
                              {offer.data.quantity}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right whitespace-nowrap">
                            {offer.data.compareAtPrice && (
                              <p className="text-xs text-warm-gray/50 line-through tabular-nums">&euro;{offer.data.compareAtPrice.toFixed(2)}</p>
                            )}
                            <p className={`font-bold text-coffee-dark tabular-nums ${isBest ? "text-2xl" : "text-lg"}`}>&euro;{offer.data.price.toFixed(2)}</p>
                            {offer.data.pricePerUnit && (
                              <p className="text-[11px] text-warm-gray/70 tabular-nums mt-0.5">{offer.data.pricePerUnit}</p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-cream-dark/50 p-6 shadow-sm">
                <h3 className="font-heading text-lg text-coffee-dark mb-4">Riepilogo ordine</h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex justify-between items-center text-coffee/70">
                    <span className="truncate mr-3">{currentOffer.data.name}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {currentOffer.data.compareAtPrice && (
                        <span className="text-warm-gray/40 line-through text-xs tabular-nums">&euro;{currentOffer.data.compareAtPrice.toFixed(2)}</span>
                      )}
                      <span className="tabular-nums font-medium">&euro;{currentOffer.data.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-coffee/70">
                    <span>Spedizione</span>
                    <span className="text-green-700 font-medium">Gratuita</span>
                  </div>
                  <div className="border-t border-cream-dark/30 pt-3 flex justify-between items-baseline">
                    <span className="text-xs text-warm-gray uppercase tracking-wider">Totale</span>
                    <span className="text-2xl font-bold text-coffee-dark tabular-nums">&euro;{currentOffer.data.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderNotifications />
    </div>
  );
}
