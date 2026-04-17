"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackViewContent } from "../../lib/pixel";

/* Images estratte dal video VSL originale — match automatico testo→frame via Whisper */
const IMG = {
  hero: "/documentario/01-capsula-intro.jpg",
  capsulaIntro: "/documentario/01-capsula-intro.jpg",
  acquaTorbida: "/documentario/02-acqua-torbida.jpg",
  bassaQualita: "/documentario/03-bassa-qualita.jpg",
  etichetta: "/documentario/04-etichetta.jpg",
  cocktailScadente: "/documentario/05-cocktail-scadente.jpg",
  prezzoAlto: "/documentario/06-prezzo-alto.jpg",
  multinazionali: "/documentario/07-multinazionali.jpg",
  oekotest: "/documentario/08-oekotest.jpg",
  altroconsumo: "/documentario/09-altroconsumo.jpg",
  report: "/documentario/10-report.jpg",
  regolamento: "/documentario/11-regolamento.jpg",
  trentaMilioni: "/documentario/12-30milioni.jpg",
  sintomi: "/documentario/13-sintomi.jpg",
  moka: "/documentario/14-moka.jpg",
  domanda: "/documentario/15-domanda.jpg",
  francesco: "/documentario/16-francesco.jpg",
  toscane: "/documentario/17-toscane.jpg",
  dal1962: "/documentario/18-1962.jpg",
  chicchiAmico: "/documentario/19-chicchi-amico.jpg",
  fraseAmico: "/documentario/20-frase-amico.jpg",
  riflessione: "/documentario/21-riflessione.jpg",
  decisione: "/documentario/22-decisione.jpg",
  prodotto: "/documentario/23-prodotto.jpg",
  prezzoBasso: "/documentario/24-prezzo-basso.jpg",
  antiossidanti: "/documentario/25-antiossidanti.jpg",
  torrefazioneFamiglia: "/documentario/26-torrefazione-famiglia.jpg",
  spedizione: "/documentario/27-spedizione.jpg",
  tostatura: "/documentario/28-tostatura.jpg",
  macinatura: "/documentario/29-macinatura.jpg",
  decidi: "/documentario/30-decidi.jpg",
};

export default function DocumentarioPage() {
  useEffect(() => {
    trackViewContent({ content_name: "Documentario Scritto", content_type: "article" });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
      {/* Header bianco */}
      <header className="w-full py-3 px-4 flex justify-center bg-white shadow-sm border-b border-cream-dark/30">
        <Image src="/logo.webp" alt="D'Aprile Caffè" width={100} height={100} className="h-12 md:h-14 w-auto" priority />
      </header>

      <main className="pb-16">
        {/* ─── HERO dark ─── */}
        <section className="relative bg-espresso overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <Image src={IMG.hero} alt="" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/40" />
          </div>
          <div className="relative max-w-3xl mx-auto px-5 py-16 md:py-24 text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2 }}
              className="text-brand-red text-xs md:text-sm uppercase mb-6 font-semibold"
            >
              Inchiesta esclusiva
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-[1.2] mb-6 tracking-tight"
            >
              E se il caff&egrave; di <span className="italic">&ldquo;qualit&agrave;&rdquo;</span> che stai bevendo fosse una <span className="text-brand-red">miscela industriale</span>?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            >
              Un&apos;indagine su cosa c&apos;&egrave; davvero nella tazzina che 30 milioni di italiani bevono ogni mattina.
            </motion.p>
          </div>
        </section>

        <article className="max-w-[720px] mx-auto px-5 pt-20 pb-16 md:pt-28">
          <Body>
            <p>Questa &egrave; una capsula di caff&egrave; di una marca che sicuramente conosci&hellip;</p>
            <p>L&apos;ho censurata con dello scotch per correttezza&hellip;</p>
            <p>E ho rimosso il sopra in modo da far uscire il contenuto&hellip;</p>
            <p>Ora osserva cosa succede se lo verso in acqua calda&hellip;</p>
          </Body>

          <FullImage src={IMG.acquaTorbida} alt="Acqua torbida dopo la capsula" />

          <Body>
            <p>Lo vedi?</p>
            <p>L&apos;acqua diventa torbida&hellip;</p>
            <p>Si formano grumi&hellip;</p>
            <p>E non c&apos;&egrave; nemmeno il profumo del vero caff&egrave;.</p>
            <p><strong>Sai perch&eacute;?</strong></p>
          </Body>

          {/* Dark headline box */}
          <DarkBox>
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Perch&eacute; qui dentro c&apos;&egrave; caff&egrave; di <span className="text-brand-red">bassissima qualit&agrave;</span>.
            </p>
          </DarkBox>

          <Body>
            <p>Ci sono scarti&hellip;</p>
            <p>E chicchi bruciati&hellip;</p>
            <p>Questo non &egrave; il vero espresso italiano come vogliono farci credere&hellip;</p>
            <p><strong>&Egrave; una miscela industriale.</strong></p>
            <p>Eppure&hellip;</p>
            <p>Chi lo compra &egrave; convinto di bere un caff&egrave; pregiato perch&eacute; sull&apos;etichetta c&apos;&egrave; scritto &ldquo;caff&egrave; espresso 100% italiano&rdquo; o qualcosa di simile&hellip;</p>
            <p>E perch&eacute; dai, stiamo parlando di una marca con una reputazione forte.</p>
            <p>Ma la verit&agrave; &egrave; che in molte capsule di marchi noti si trovano miscele scadenti&hellip;</p>
            <p>Dei cocktail di <strong>BASSA QUALIT&Agrave;</strong> pieni di aromi per ricreare l&apos;aroma del buon caff&egrave;&hellip; anche se, di buon caff&egrave;, ce n&apos;&egrave; molto POCO o nulla.</p>
          </Body>

          {/* Sezione 3: Il prezzo */}
          <SectionTitle>Ma aspetta, adesso arriva il bello&hellip;</SectionTitle>
          <Body>
            <p>Anche se a queste multinazionali costa solo pochi centesimi produrre queste schifezze&hellip;</p>
            <p>Anche se il gusto viene riprodotto in modo non etico&hellip;</p>
            <p>E anche se sull&apos;etichetta ci sono scritte cose come &ldquo;tostatura lenta&rdquo; o &ldquo;qualit&agrave; superiore&rdquo;&hellip;</p>
            <p>Non si fanno <strong>PROBLEMI</strong> a rivendertele a 45, 50, o anche 60 centesimi l&apos;una&hellip;</p>
            <p><strong>Fregandosene della nostra salute.</strong></p>
            <p>Cos&igrave; facendo infatti&hellip;</p>
            <p>Tu domani vai al supermercato o nel loro punto vendita&hellip;</p>
            <p>Compri le loro capsule sovraprezzate credendo di aver scelto la qualit&agrave;&hellip;</p>
            <p>Le porti a casa&hellip;</p>
            <p>E durante il giorno ti bevi questa miscela scadente&hellip;</p>
            <p>Che non ha neanche uno straccio dei benefici antiossidanti, energizzanti e digestivi del vero caff&egrave; naturale, tostato e macinato a regola d&apos;arte.</p>
            <p>E mentre tu ti bevi il loro &ldquo;caff&egrave;&rdquo;&hellip;</p>
            <p>Che &egrave; un surrogato che nuoce alla salute&hellip;</p>
            <p>Progettato solo per tagliare i costi di produzione ed aumentare i profitti&hellip;</p>
            <p><strong>Queste multinazionali si arricchiscono in modo spudorato a discapito della tua salute!</strong></p>
          </Body>

          <FullImage src={IMG.multinazionali} alt="La verità dietro le multinazionali" />

          {/* Dark box transition */}
          <DarkBox>
            <p className="text-xl md:text-2xl font-bold leading-tight mb-3 uppercase tracking-wide">
              Non &egrave; uno scherzo.
            </p>
            <p className="text-lg md:text-xl text-white/80">
              Ecco tre prove che lo dimostrano.
            </p>
          </DarkBox>

          <Body>
            <p>E sai qual &egrave; la parte pi&ugrave; triste?</p>
            <p>Che tutto questo&hellip; succede davvero.</p>
            <p>L&apos;esperimento che ti ho mostrato&hellip; non &egrave; uno scherzo.</p>
            <p>Ho usato davvero una capsula di quelle che trovi al supermercato.</p>
            <p>Infatti&hellip;</p>
            <p><strong>Ascolta questa&hellip;</strong></p>
            <p>Un test condotto dalla nota rivista tedesca <strong>Oekotest</strong> ha analizzato 21 diverse marche di cialde per il caff&egrave; casalingo&hellip;</p>
            <p>I risultati?</p>
            <p>Hanno trovato contaminanti pericolosi come <strong>pesticidi, acrilammide e furani</strong> &ndash; tre sostanze tossiche per il nostro organismo&hellip;</p>
          </Body>

          <FullImage src={IMG.oekotest} alt="Test Oekotest" />

          <Body>
            <p><strong>E senti questa&hellip;</strong></p>
            <p>Secondo un test condotto da <strong>Altroconsumo</strong>&hellip;</p>
            <p>Nel caff&egrave; in capsule di aziende famose sono state trovate sostanze come l&apos;<strong>ocratossina A</strong>, una micotossina prodotta da muffe, e ancora una volta l&apos;<strong>acrilamide</strong>, una sostanza che si forma durante il riscaldamento ad alte temperature e considerata cancerogena.</p>
          </Body>

          <FullImage src={IMG.altroconsumo} alt="Test Altroconsumo" />

          <Body>
            <p><strong>E non &egrave; finita, ascolta questa&hellip;</strong></p>
            <p>Un&apos;indagine del programma <strong>Report</strong> &mdash; che ha fatto la storia del giornalismo investigativo in TV &mdash; ha evidenziato la presenza di <strong>metalli pesanti</strong> come alluminio, bario, ferro, manganese, rame e zinco nel caff&egrave; preparato con capsule.</p>
          </Body>

          <FullImage src={IMG.report} alt="Indagine Report" />

          {/* Sezione: La legge */}
          <SectionTitle>&ldquo;Ma non &egrave; illegale?&rdquo;</SectionTitle>
          <Body>
            <p>A questo punto ti starai chiedendo&hellip;</p>
            <p>Ma come &egrave; possibile una cosa del genere?</p>
            <p>Non &egrave; illegale?</p>
            <p>Se fosse vero, qualcuno li avrebbe fermati, no?</p>
            <p><strong>E invece&hellip; &egrave; tutto legale.</strong></p>
            <p>Sai perch&eacute;?</p>
            <p>Perch&eacute; lo consente il <strong>Regolamento Europeo N. 1334 del 16 novembre 2008</strong>, che riguarda aromi e ingredienti alimentari con propriet&agrave; aromatizzanti.</p>
            <p>Guarda qui&hellip;</p>
            <p>Ce l&apos;ho stampato, proprio per mostrartelo.</p>
            <p>Ti risparmio la lettura (anche perch&eacute; &egrave; infinito)&hellip;</p>
            <p>Ma se vuoi, lo trovi facilmente online.</p>
            <p><strong>Sconcertante, vero?</strong></p>
          </Body>

          <FullImage src={IMG.regolamento} alt="" />

          {/* Sezione: 30 milioni */}
          <DarkBox>
            <p className="text-xl md:text-2xl leading-tight font-bold mb-3">
              Pi&ugrave; di <span className="text-brand-red">30 milioni di italiani</span> ogni mattina iniziano la giornata ingerendo questo intruglio.
            </p>
            <p className="text-base md:text-lg text-white/70">Credendo che sia vero caff&egrave;.</p>
          </DarkBox>

          <Body>
            <p>Ma non preoccuparti&hellip;</p>
            <p>Perch&eacute; non sei l&apos;unico a non sapere tutto questo&hellip;</p>
            <p>Pi&ugrave; di 30 milioni di italiani ogni mattina iniziano la giornata ingerendo questo intruglio di bassa qualit&agrave; come se nulla fosse&hellip; credendo che sia vero caff&egrave;.</p>
            <p>Lo chiamano &ldquo;caff&egrave; italiano 100% naturale&rdquo;&hellip;</p>
            <p><strong>Ma non ha nulla di italiano&hellip; di naturale&hellip; e ancora meno di vero caff&egrave;.</strong></p>
          </Body>

          {/* Sezione: I sintomi */}
          <SectionTitle>I sintomi che forse non hai mai collegato</SectionTitle>
          <Body>
            <p>E, sai da cosa te ne accorgi che dentro ci sono scarti?</p>
            <p>Ti &egrave; mai capitato di bere un caff&egrave; in capsula o in cialda e subito dopo sentirti <strong>nervoso, agitato&hellip; o inspiegabilmente stanco mezz&apos;ora dopo</strong>?</p>
            <p>Esatto&hellip;</p>
            <p>Questi sono gli effetti collaterali di quella schifezza industriale&hellip;</p>
            <p>Ci&ograve; che dovrebbe darti energia&hellip; in realt&agrave; stressa ancora di pi&ugrave; il tuo sistema nervoso, ti irrita lo stomaco, ti appesantisce il fegato e ti rallenta la digestione&hellip;</p>
            <p><strong>Lasciandoti pi&ugrave; stanco, nervoso e irritato di prima.</strong></p>
            <p>O ancora&hellip; ci hai mai fatto caso che spesso il caff&egrave; dopo un pasto ti addormenta, invece di darti quella &ldquo;botta di energia&rdquo; che cercavi?</p>
            <p>Stesso motivo&hellip;</p>
            <p><strong>Perch&eacute; &egrave; caff&egrave; di bassa qualit&agrave;.</strong></p>
          </Body>

          <FullImage src={IMG.sintomi} alt="Gli effetti sul corpo" />

          {/* Moka */}
          <SectionTitle>&ldquo;E se bevo solo con la Moka?&rdquo;</SectionTitle>
          <Body>
            <p>E se ora stai pensando di evitare il problema perch&eacute; tu bevi solo quello fatto con la Moka&hellip;</p>
            <p><strong>Beh, non &egrave; proprio cos&igrave;!</strong></p>
            <p>Forse le schifezze che ci mettono dentro sono meno&hellip;</p>
            <p>Ma ti assicuro che col caff&egrave; in busta&hellip; anche se ci scrivono &ldquo;caff&egrave; arabica biologico dal Nicaragua&rdquo; o un altro paese che ti fa pensare al vero caff&egrave;&hellip; le multinazionali fanno lo stesso sporco gioco, <strong>fregandosene della nostra salute!</strong></p>
            <p>Anche perch&eacute; il regolamento europeo non cambia&hellip;</p>
            <p>Glielo consente lo stesso!</p>
            <p>Quindi credi davvero che non sostituiscono il vero caff&egrave;&hellip; selezionato, tostato e macinato a regola d&apos;arte con &ldquo;altro&rdquo; &ndash; solo per abbattere i costi e massimizzare i profitti?</p>
            <p><strong>Lo fanno eccome!</strong></p>
          </Body>

          <FullImage src={IMG.moka} alt="Il caffè in busta per moka" />

          {/* Sezione: La domanda */}
          <DarkBox>
            <p className="text-xl md:text-2xl font-bold leading-snug">
              Ma adesso la domanda &egrave;&hellip;<br />
              <span className="text-brand-red">Dove possiamo trovare del caff&egrave; vero?</span>
            </p>
          </DarkBox>

          <Body>
            <p>Ma adesso, arrivati a questo punto, la domanda &egrave;&hellip;</p>
            <p>Dove possiamo trovare del caff&egrave; vero, naturale, puro e di altissima qualit&agrave;&hellip; e non una miscela industriale aromatizzata per sembrare caff&egrave;?</p>
            <p>Un caff&egrave; che conserva tutte le sue propriet&agrave; antiossidanti ed energetiche&hellip;</p>
            <p>Dove possiamo comprare capsule, cialde o buste per un vero espresso fatto in casa, non solo di nome, ma anche di fatto?</p>
            <p>Dove possiamo acquistare del caff&egrave; con la certezza di non essere fregati ma di ottenere davvero ci&ograve; per cui paghiamo?</p>
            <p><strong>Fortunatamente&hellip;</strong></p>
            <p><strong>Possiamo aiutarti!</strong></p>
          </Body>

          {/* CTA intermedia */}
          <InlineCTA />

          {/* Sezione: Torrefazione D'Aprile */}
          <SectionTitle>La torrefazione D&apos;Aprile</SectionTitle>
          <Body>
            <p>Forse non hai mai sentito parlare di noi&hellip;</p>
            <p>Ma non importa&hellip;</p>
            <p>Perch&eacute; non siamo noi che devi conoscere, ma lui&hellip;</p>
          </Body>

          <Body>
            <p>Lui &egrave; <strong>Francesco D&apos;Aprile</strong>&hellip;</p>
            <p>Il cuore e l&apos;anima di una torrefazione diventata un punto di riferimento qui, sulle splendide colline toscane, in provincia di Arezzo.</p>
            <p>Un uomo che ha costruito tutto con le sue mani, mattone dopo mattone&hellip;</p>
            <p>Che ha costruito una torrefazione che, ancora adesso, dal <strong>1962</strong>&hellip;</p>
            <p>Seleziona solo le migliori variet&agrave; di caff&egrave;, che poi vengono macinate e tostate con cura, seguendo l&apos;antico metodo tradizionale&hellip;</p>
            <p>E con la stessa cura, da decenni fornisce i bar della zona e i migliori ristoranti del territorio&hellip;</p>
            <p><strong>Garantendo loro di servire sempre la massima qualit&agrave; ai propri clienti!</strong></p>
          </Body>

          <FullImage src={IMG.toscane} alt="" />

          {/* Sezione: Il figlio */}
          <SectionTitle>Poi &egrave; successo qualcosa&hellip;</SectionTitle>
          <Body>
            <p>O meglio&hellip;</p>
            <p>Questo &egrave; quello che ha fatto finora.</p>
            <p>Perch&eacute; di recente, da quando ha preso in mano la gestione il figlio, le cose sono cambiate.</p>
            <p>Cosa intendo dire?</p>
            <p>Te lo spiego&hellip;</p>
            <p>Dopo anni trascorsi al servizio di bar, ristoranti di alto livello e locali selezionati&hellip;</p>
            <p>Il figlio di Francesco D&apos;Aprile, il fondatore della torrefazione&hellip;</p>
            <p>Un giorno, mentre portava come al solito una scatola di chicchi del suo ottimo caff&egrave; a un caro amico &ndash; una piccola abitudine che aveva preso da tempo per fargli gustare lo stesso caff&egrave; servito nei migliori ristoranti e bar di zona&hellip;</p>
            <p>Si &egrave; sentito dire una frase che, all&apos;inizio, gli ha solo strappato un sorriso&hellip;</p>
            <p><strong>Ma poi gli ha fatto ribollire il sangue&hellip;</strong></p>
          </Body>

          <FullImage src={IMG.chicchiAmico} alt="La scatola di chicchi portata all'amico" />

          {/* La frase dell'amico - Pull quote dark */}
          <DarkBox>
            <p className="font-heading italic text-xl md:text-2xl leading-relaxed mb-4">
              &ldquo;Ma che caz*o stiamo bevendo noi italiani da anni?!
            </p>
            <p className="font-heading italic text-xl md:text-2xl leading-relaxed mb-4">
              Questo s&igrave; che &egrave; caff&egrave;. &Egrave; tutta un&apos;altra cosa! Altro che quelle porcherie da supermercato che ci rifilano in capsule lucide con la faccia dell&apos;attore famoso sopra&hellip;
            </p>
            <p className="font-heading italic text-xl md:text-2xl leading-relaxed mb-4">
              Sei quasi egoista a tenerlo solo per i tuoi clienti di zona&rdquo;
            </p>
            <p className="text-xs text-white/50 uppercase tracking-[0.2em] mt-4">&mdash; Un amico, dopo il primo sorso</p>
          </DarkBox>

          <Body>
            <p>Pensava fosse solo un complimento di un carissimo amico&hellip;</p>
            <p>Poi, ci ha riflettuto&hellip; a lungo.</p>
            <p>Ed &egrave; l&igrave; che gli &egrave; scattato qualcosa dentro.</p>
            <p><strong>S&igrave;, era un complimento&hellip; ma cavolo, aveva ragione!</strong></p>
            <p>Da anni beviamo polvere aromatizzata credendo che sia un caff&egrave; di qualit&agrave;!</p>
            <p>E, onestamente&hellip;</p>
            <p>Noi italiani, precursori della cultura del caff&egrave;, non ci meritiamo questi intrugli venduti a peso d&apos;oro da multinazionali che hanno il solo scopo di arricchirsi&hellip;</p>
            <p>Che riempiono le loro capsule di schifezze spacciandole come &ldquo;espresso di qualit&agrave;&rdquo;&hellip;</p>
          </Body>

          {/* Sezione: La missione */}
          <SectionTitle>&Egrave; scattato qualcosa dentro</SectionTitle>
          <Body>
            <p>&Egrave; stato in quel momento che in lui &egrave; scattato qualcosa dentro&hellip;</p>
            <p>Non poteva pi&ugrave; accettare che milioni di persone cominciassero la giornata con un prodotto che non ha NIENTE del vero caff&egrave; espresso italiano&hellip;</p>
            <p><strong>Non era giusto&hellip;</strong></p>
            <p><strong>Non era etico&hellip;</strong></p>
            <p><strong>Non era italiano&hellip;</strong></p>
            <p>Anche le famiglie&hellip; che amano iniziare le loro giornate con una tazzina di caff&egrave; preso a casa&hellip; meritano un prodotto di <strong>VERA qualit&agrave;!</strong></p>
            <p>Un caff&egrave; autentico&hellip;</p>
            <p>Tostato con metodo e con passione&hellip;</p>
            <p>Selezionato e lavorato con cura e amore&hellip;</p>
            <p>Non &egrave; giusto che si debbano accontentare di un caff&egrave; prodotto da grosse multinazionali con dentro scarti, chicchi bruciati, aromi senza sostanze nutritive&hellip;</p>
            <p>E in certi casi, anche tracce di sostanze potenzialmente tossiche o cancerogene, come dimostrato da diverse inchieste giornalistiche.</p>
          </Body>

          <FullImage src={IMG.tostatura} alt="" />

          {/* Sezione: La decisione */}
          <SectionTitle>La decisione</SectionTitle>
          <Body>
            <p>Cos&igrave; ha deciso di fare qualcosa che mai gli sarebbe passato per la mente.</p>
            <p>Rendere accessibile a chiunque &ndash; anche alla famiglia del paesino pi&ugrave; piccolo e sperduto d&apos;Italia &ndash; il caff&egrave; della sua torrefazione artigianale.</p>
            <p>Lo stesso che da oltre 60 anni viene tostato con cura sulle colline toscane&hellip;</p>
            <p>E che tutte le mattine conquista i palati pi&ugrave; esigenti nei migliori locali del territorio.</p>
            <p>E cos&igrave;&hellip;</p>
            <p>Senza girarci troppo intorno, abbiamo fatto il grande passo&hellip;</p>
            <p>Abbiamo creato le nostre prime <strong>capsule e cialde artigianali</strong>, rendendole ovviamente compatibili con tutte le macchinette pi&ugrave; comuni.</p>
            <p>E le abbiamo messe a disposizione di tutti&hellip;</p>
            <p>Con un semplicissimo click&hellip;</p>
            <p><strong>Direttamente sul nostro negozio online.</strong></p>
          </Body>

          {/* Sezione: Il prezzo */}
          <SectionTitle>Ma il pezzo forte?</SectionTitle>
          <Body>
            <p>Non volevamo scendere a compromessi.</p>
            <p>N&eacute; sulla qualit&agrave;&hellip;</p>
            <p>N&eacute; sul prezzo&hellip;</p>
            <p><strong>Perch&eacute; altrimenti tutto questo non avrebbe avuto senso!</strong></p>
            <p>Per questo&hellip;</p>
            <p>Il nostro caff&egrave;, realizzato <strong>SOLO con chicchi selezionati</strong>, tostati con cura secondo il nostro metodo artigianale vecchio 60 anni e macinato a regola d&apos;arte nella nostra torrefazione, costa una frazione rispetto a quello delle grosse multinazionali.</p>
            <p>Loro le capsule te le vendono anche 60-70 centesimi l&apos;una&hellip;</p>
            <p><strong>Noi a molto meno!</strong></p>
          </Body>

          <FullImage src={IMG.prodotto} alt="" />

          <Body>
            <p>E con una differenza sostanziale&hellip;</p>
            <p><strong>Nelle nostre c&apos;&egrave; del vero caff&egrave;&hellip;</strong></p>
            <p>Ricco di <strong>antiossidanti naturali</strong> che aiutano il corpo a difendersi dallo stress, dall&apos;infiammazione e dalla stanchezza cronica.</p>
            <p>Ricco di <strong>principi attivi energizzanti</strong>, che stimolano corpo e mente facendoti concentrare pi&ugrave; a lungo e sentirti pi&ugrave; attivo durante il giorno&hellip;</p>
            <p>Ricco di <strong>propriet&agrave; digestive</strong>, che ti aiutano a eliminare la pesantezza di stomaco e quella classica botta di sonno dopo pranzo&hellip;</p>
            <p>E non una miscela che sa di caff&egrave;&hellip;</p>
            <p>Non un caff&egrave; industriale che una volta bevuto ti irrita lo stomaco&hellip;</p>
            <p>Ti fa sentire gonfio&hellip;</p>
            <p>E ti lascia con nervosismo, sbalzi di energia improvvisi, e quella fastidiosa stanchezza che arriva senza preavviso&hellip; e ti fa crollare.</p>
            <p>Lo stesso caff&egrave; che serviamo nei bar e nei ristoranti migliori della Toscana&hellip; e d&apos;Italia!</p>
            <p><strong>Un caff&egrave; che sprigiona energia vera, che nutre il corpo, e che risveglia i sensi.</strong></p>
          </Body>

          {/* Sezione: La missione / spedizione */}
          <DarkBox>
            <p className="text-xl md:text-2xl font-bold leading-snug mb-3">
              Fino a esaurimento scorte,<br />
              <span className="text-brand-red">le spese di spedizione te le paghiamo noi.</span>
            </p>
            <p className="text-base md:text-lg text-white/70">Vedilo come un piccolo incentivo.</p>
          </DarkBox>

          <Body>
            <p>E siccome questo non &egrave; soltanto un progetto imprenditoriale&hellip;</p>
            <p>Ma una <strong>vera e propria missione contro lo scandalo del caff&egrave; industriale</strong> &ndash; prodotto in massa solo per generare profitti a discapito della salute di noi consumatori&hellip;</p>
            <p>Abbiamo deciso di fare anche un&apos;altra cosa&hellip;</p>
            <p><strong>Fino a esaurimento scorte in magazzino, le spese di spedizione te le paghiamo noi!</strong></p>
            <p>Vedilo come un piccolo incentivo&hellip;</p>
            <p>Questo significa che adesso puoi gustarti un caff&egrave; artigianale di altissima qualit&agrave;, preparato con cura e passione&hellip; direttamente a casa tua&hellip;</p>
            <p>A un prezzo molto pi&ugrave; basso rispetto a quello delle grandi marche&hellip;</p>
            <p><strong>E senza spendere neanche un centesimo per la spedizione!</strong></p>
          </Body>

          {/* Sezione: Scorte limitate */}
          <SectionTitle>Ma devi fare in fretta</SectionTitle>
          <Body>
            <p>Il problema per&ograve; &egrave; che le scorte non sono molte visto che siamo una piccola torrefazione di famiglia&hellip; e dunque non abbiamo magazzini grandi come campi da calcio.</p>
            <p>Quindi se ami davvero il caff&egrave;, e vuoi iniziare a berne uno di qualit&agrave; vera&hellip;</p>
            <p>Il mio consiglio &egrave; di assicurarti <strong>ADESSO</strong> le tue confezioni di capsule, cialde o i tuoi sacchetti di caff&egrave; da Moka&hellip; che sei in tempo.</p>
            <p>Perch&eacute; se torni pi&ugrave; tardi, domani o magari tra qualche giorno&hellip;</p>
            <p>Il rischio &egrave; che le scorte saranno esaurite e tu dovrai continuare a far finta di gustarti un qualcosa &ldquo;al gusto caff&egrave;&rdquo; &ndash; potenzialmente cancerogeno&hellip;</p>
            <p><strong>Quindi fai il tuo ordine adesso finch&eacute; le scorte sono disponibili.</strong></p>
            <p>Per farlo &egrave; semplice&hellip;</p>
            <p>Scorri la pagina in basso e segui le istruzioni&hellip;</p>
            <p>Ti spediremo tutto entro le prossime <strong>24 ore</strong> e riceverai il pacco direttamente all&apos;indirizzo indicato in <strong>3-5 giorni lavorativi</strong> &ndash; senza alcun costo!</p>
          </Body>

          {/* Sezione: Cosa è questo caffè */}
          <SectionTitle>Quello che stai per acquistare &egrave; un caff&egrave; autentico</SectionTitle>
          <Body>
            <p>Lavorato a mano, da una torrefazione che cura ogni lotto come fosse un&apos;opera d&apos;arte&hellip;</p>
            <p>Selezionato da piantagioni ad alta quota, dove i chicchi maturano lentamente&hellip; sviluppando un aroma ricco, profondo e senza note amare.</p>
            <p>&Egrave; caff&egrave; <strong>tostato lentamente</strong>, secondo il metodo artigianale tramandato dal 1962&hellip; niente tostatura &ldquo;flash&rdquo; che brucia l&apos;aroma e annienta i principi attivi&hellip;</p>
            <p>&Egrave; caff&egrave; <strong>macinato poco prima del confezionamento</strong>, per preservare gli oli essenziali e i composti volatili che danno quel profumo unico appena apri la capsula&hellip;</p>
            <p>&Egrave; caff&egrave; <strong>vivo</strong>, carico di antiossidanti naturali che aiutano a combattere lo stress ossidativo, migliorare la circolazione e sostenere il sistema immunitario&hellip;</p>
            <p>&Egrave; caff&egrave; <strong>funzionale</strong>, che aumenta la concentrazione, l&apos;energia mentale e la resistenza fisica&hellip; senza la fastidiosa agitazione o il &ldquo;crollo&rdquo; di energia dopo poche ore&hellip;</p>
            <p>&Egrave; caff&egrave; <strong>ben digeribile</strong>, grazie alla tostatura lenta e all&apos;assenza totale di additivi o sostanze irritanti&hellip; non ti lascia quella nota di acidit&agrave; e quel bruciore di stomaco&hellip;</p>
            <p>&Egrave; caff&egrave; <strong>pulito</strong>, confezionato in ambiente sterile, senza residui chimici, senza aromi artificiali e soprattutto&hellip; senza quelle polveri industriali fatte con scarti&hellip;</p>
          </Body>

          <FullImage src={IMG.decidi} alt="La scelta è tua" />

          {/* Chiusura */}
          <DarkBox>
            <p className="text-xl md:text-2xl font-bold leading-snug mb-4">
              Per anni ti hanno fatto credere che il buon caff&egrave; fosse quello &ldquo;che costa di pi&ugrave;&rdquo;&hellip;
            </p>
            <p className="text-lg md:text-xl text-white/80">
              <span className="text-brand-red font-bold">Adesso sai che non &egrave; cos&igrave;.</span>
            </p>
          </DarkBox>

          <Body>
            <p>Questo documentario sta per concludersi&hellip;</p>
            <p>Per anni ti hanno fatto credere che il buon caff&egrave; fosse quello &ldquo;che costa di pi&ugrave;&rdquo;&hellip;</p>
            <p><strong>Ma adesso hai capito che non &egrave; cos&igrave;&hellip; e che esiste un&apos;alternativa!</strong></p>
            <p>Quindi ora &egrave; il momento in cui decidi cosa vuoi mettere nella tua prossima tazzina di caff&egrave; che berrai tu, tuo marito o tua moglie&hellip; tuo figlio o tua figlia&hellip; oppure i tuoi amici&hellip;</p>
            <p>Un surrogato industriale, ideato per tagliare i costi di produzione e aumentare i profitti&hellip;</p>
            <p>O un caff&egrave; vero&hellip; 100% artigianale&hellip; ricco di antiossidanti che nutrono il corpo e di aromi che accendono i sensi e ti caricano di energia?</p>
            <p><strong>La decisione &egrave; soltanto tua!</strong></p>
            <p>E adesso hai l&apos;opportunit&agrave; di prendere la decisione migliore&hellip;</p>
            <p>Quella di assicurarti una scorta di questo prestigioso caff&egrave;, finora riservato soltanto ai migliori ristoranti e bar della zona&hellip;</p>
            <p>Il tutto, a una frazione del costo rispetto a quello delle grosse multinazionali&hellip;</p>
            <p><strong>E spedito direttamente a casa tua, ovunque ti trovi, senza costi extra!</strong></p>
            <p>Quindi agisci adesso, finch&eacute; sei in tempo&hellip;</p>
            <p>Scorri la pagina in basso, segui le istruzioni ed effettua il tuo ordine.</p>
            <p>Non vediamo l&apos;ora di spedirti questa nostra prelibatezza e sapere cosa ne pensi.</p>
            <p><strong>Ti auguriamo una splendida giornata.</strong></p>
          </Body>

          {/* CTA finale */}
          <FinalCTA />
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-dark/30 bg-white py-4 px-4">
        <p className="text-center text-[9px] md:text-[11px] text-coffee/40 whitespace-nowrap">
          &copy; {new Date().getFullYear()} D&apos;Aprile Caff&egrave; — Torrefazione dal 1962 &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-coffee transition-colors">Privacy</a> &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="hover:text-coffee transition-colors">Cookie</a> &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-coffee transition-colors">Termini</a>
        </p>
      </footer>
    </div>
  );
}

/* ─── Helper components ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mt-24 md:mt-32 mb-10 md:mb-12 text-center"
    >
      <div className="w-12 h-px bg-brand-red mx-auto mb-6 opacity-60" />
      <h2 className="font-heading text-3xl md:text-5xl text-coffee-dark font-bold leading-[1.15] tracking-tight max-w-2xl mx-auto">
        {children}
      </h2>
    </motion.div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="space-y-6 text-coffee-dark"
      style={{ fontSize: "20.8px", lineHeight: "1.7", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}

function DarkBox({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="my-20 md:my-24 -mx-5 md:mx-0 bg-espresso text-white px-6 py-14 md:px-14 md:py-20 md:rounded-3xl shadow-xl relative overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-xl mx-auto">{children}</div>
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-red via-brand-red-light to-brand-red" />
    </motion.div>
  );
}

function FullImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="my-14 md:my-16 -mx-5 md:mx-0"
    >
      <div className="relative aspect-[1280/580] md:rounded-2xl overflow-hidden shadow-md">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && <figcaption className="text-center text-coffee/50 text-sm italic mt-4 px-4 font-heading">{caption}</figcaption>}
    </motion.figure>
  );
}

function ProductImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="my-10"
    >
      <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-white border border-cream-dark/30 shadow-sm">
        <Image src={src} alt={alt} fill className="object-contain p-6" />
      </div>
      {caption && <figcaption className="text-center text-coffee/50 text-sm italic mt-3 px-4">{caption}</figcaption>}
    </motion.figure>
  );
}

function InlineCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-14 text-center bg-white border border-cream-dark/40 rounded-2xl px-6 py-10 md:px-10 md:py-12 shadow-sm"
    >
      <p className="font-heading italic text-xl md:text-2xl text-coffee-dark mb-2">
        Scopri la miscela perfetta per te.
      </p>
      <p className="text-coffee/60 text-base mb-7 max-w-md mx-auto">
        Rispondi a 4 semplici domande. Ti bastano 7 secondi.
      </p>
      <Link href="/quiz" className="inline-block w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 md:py-5 px-6 bg-brand-red hover:bg-brand-red-light text-white rounded-full cursor-pointer shadow-[0_6px_30px_-4px_rgba(185,28,28,0.4)] hover:shadow-[0_8px_40px_-4px_rgba(185,28,28,0.5)] transition-all"
        >
          <span className="block text-base md:text-lg font-bold tracking-wide">
            ☕ FAI IL QUIZ
          </span>
          <span className="block text-xs font-normal text-white/60 mt-1">
            Spedizione gratuita
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}

function FinalCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16 -mx-5 md:mx-0 bg-espresso text-white px-6 py-14 md:px-10 md:py-20 md:rounded-2xl text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red-light to-brand-red" />
      <p className="text-brand-red text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
        &Egrave; il momento di scegliere
      </p>
      <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-4 leading-tight">
        Scopri la <span className="text-brand-red">tua</span> miscela ideale
      </h2>
      <p className="text-white/70 text-base md:text-lg mb-8 max-w-md mx-auto">
        Rispondi a 4 semplici domande e ti consigliamo il caff&egrave; perfetto per i tuoi gusti.
      </p>
      <Link href="/quiz" className="inline-block w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-5 md:py-6 px-6 bg-brand-red hover:bg-brand-red-light text-white rounded-full cursor-pointer shadow-[0_6px_40px_-4px_rgba(185,28,28,0.5)] hover:shadow-[0_8px_50px_-4px_rgba(185,28,28,0.6)] transition-all"
        >
          <span className="block text-base md:text-xl font-bold tracking-wide">
            ☕ FAI IL QUIZ ADESSO
          </span>
          <span className="block text-[11px] md:text-xs font-normal text-white/60 mt-1">
            Solo 7 secondi &middot; Spedizione gratuita
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
