import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Menu, X, MapPin, Clock, Phone, Mail, ChevronDown, Star, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/image.png";
import videoSrc from "@/imports/40167-424912126_medium.mp4";
import videoSrc2 from "@/imports/Video-Project.mp4";

// ── Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

function AnimateIn({ children, className = "", delay = 0, once = true }: {
  children: React.ReactNode; className?: string; delay?: number; once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Speisekarte", href: "#speisekarte" },
  { label: "Galerie", href: "#galerie" },
  { label: "Kontakt", href: "#kontakt" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-md border-b border-red-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3 group">
          <ImageWithFallback
            src={logoSrc}
            alt="Ruppiner Feingebäck Logo"
            className={`h-10 w-auto object-contain transition-all duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-['Raleway'] text-[11px] tracking-[0.18em] uppercase transition-colors relative group ${
                scrolled ? "text-foreground/60 hover:text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <motion.a
            href="#kontakt"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`font-['Raleway'] text-[11px] tracking-[0.18em] uppercase px-6 py-2.5 transition-all duration-300 ${
              scrolled
                ? "bg-primary text-white hover:bg-red-700"
                : "bg-white/15 text-white border border-white/50 hover:bg-white hover:text-primary"
            }`}
          >
            Reservieren
          </motion.a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-primary" : "text-white"}`}
          aria-label="Menü"
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-red-100 px-6 py-6 flex flex-col gap-5"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-['Raleway'] text-[11px] tracking-[0.18em] uppercase text-foreground/60 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#kontakt" onClick={() => setOpen(false)}
            className="font-['Raleway'] text-[11px] tracking-[0.18em] uppercase bg-primary text-white px-5 py-3 text-center hover:bg-red-700 transition-colors">
            Reservieren
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

// ── Hero with video background ─────────────────────────────────────────────────
function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const target = 1793;
    const start = Date.now();
    const duration = 2000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(1700 + (target - 1700) * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(tick); }, 800);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1a0202]">
        <video
          autoPlay muted loop playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-40" : "opacity-0"}`}
        >
          {/* Nutzt hier die importierte Video-Variable */}
          <source src={videoSrc} type="video/mp4" />
        </video>
        {!videoLoaded && (
          <div className="absolute inset-0 w-full h-full bg-[#1a0202] opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/50 via-[#1a0202]/40 to-[#1a0202]/80" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#8B3333]/20" />
      </div>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-400/40 rounded-full"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          {/* <ImageWithFallback 
            src={logoSrc}
            alt="Ruppiner Feingebäck"
            className="h-28 md:h-36 w-auto object-contain brightness-0 invert"
          />*/}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-['Raleway'] text-[10px] tracking-[0.4em] uppercase text-red-200/80 mb-6"
        >
          Handwerkliche Konditorei · Seit{" "}
          <motion.span className="text-white font-semibold tabular-nums">{count}</motion.span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight mb-8"
        >
          Feingebäck mit
          <br />
          <em className="italic font-normal text-red-300">Herz &amp; Seele</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="font-['Lora'] text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Im Herzen Rheinsbergs — wo jede Torte ein Kunstwerk ist und
          jeder Besuch ein unvergesslicher Moment wird.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#speisekarte"
            whileHover={{ scale: 1.04, backgroundColor: "#a01010" }}
            whileTap={{ scale: 0.97 }}
            className="font-['Raleway'] text-xs tracking-[0.22em] uppercase px-10 py-4 bg-primary text-white transition-colors duration-300 flex items-center gap-3 justify-center"
          >
            Speisekarte <ArrowRight size={14} />
          </motion.a>
          <motion.a
            href="#galerie"
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="font-['Raleway'] text-xs tracking-[0.22em] uppercase px-10 py-4 border border-white/50 text-white transition-colors duration-300"
          >
            Galerie ansehen
          </motion.a>
        </motion.div>
      </div>
      <motion.a
        href="#ueber-uns"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scrollen"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
}

// ── Marquee ribbon ─────────────────────────────────────────────────────────────
function Ribbon() {
  const items = ["Torten", "Croissants", "Pralinen", "Kaffee", "Macarons", "Brote", "Waffeln", "Tartes"];
  return (
    <div className="bg-primary overflow-hidden py-3.5 border-y border-red-700/30">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-['Raleway'] text-[10px] tracking-[0.25em] uppercase text-white/80 px-8 flex items-center gap-8">
            {item}
            <span className="text-white/30">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="ueber-uns" ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className="relative h-[520px] md:h-[620px]">
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -2 }}
              animate={inView ? { opacity: 1, x: 0, rotate: -2 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 w-[65%] h-[55%] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&h=500&fit=crop&auto=format"
                alt="Gemütliches Café-Interieur"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              animate={inView ? { opacity: 1, x: 0, rotate: 2 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 right-0 w-[60%] h-[52%] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=500&fit=crop&auto=format"
                alt="Elegante Torte"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-[44%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary flex items-center justify-center shadow-lg z-10"
            >
              <div className="text-center text-white">
                <div className="font-['Playfair_Display'] text-4xl font-bold">231</div>
                <div className="font-['Raleway'] text-[8px] tracking-[0.2em] uppercase mt-0.5 opacity-80">Jahre</div>
              </div>
            </motion.div>
          </div>
          <div>
            <AnimateIn delay={0}>
              <p className="font-['Raleway'] text-[10px] tracking-[0.35em] uppercase text-primary mb-5">
                Unsere Geschichte
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
                Tradition &amp;
                <br />
                <em className="italic font-normal text-primary">Leidenschaft</em>
              </h2>
            </AnimateIn>
            <motion.div
              className="space-y-5 font-['Lora'] text-foreground/70 leading-relaxed"
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {[
                "Seit 1793 steht der Name Ruppiner Feingebäck für unnachahmliche Konditorkunst in der Ruppiner Seenlandschaft. Was als kleine Backstube im Herzen Rheinsbergs begann, ist heute ein Stück lebendiger Geschichte.",
                "In unserer hauseigenen Konditorei entstehen täglich frische Torten, Pralinen und Feingebäcke — nach überlieferten Rezepten, verfeinert durch moderne Techniken und verfeinert mit besten regionalen Zutaten.",
                "Das denkmalgeschützte Haus am Markt lädt ein zum Verweilen: ein Stück Torte, ein aromatischer Kaffee — und die traumhafte Kulisse des historischen Rheinsbergs.",
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUp}>{text}</motion.p>
              ))}
            </motion.div>
            <AnimateIn delay={0.3} className="mt-10 flex gap-12">
              {[
                { num: "231", label: "Jahre Tradition" },
                { num: "60+", label: "Sorten täglich" },
                { num: "4", label: "Generationen" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-1">{stat.num}</div>
                  <div className="font-['Raleway'] text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </AnimateIn>
            <AnimateIn delay={0.4} className="mt-10">
              <motion.a
                href="#speisekarte"
                whileHover={{ x: 6 }}
                className="inline-flex items-center gap-3 font-['Raleway'] text-[11px] tracking-[0.18em] uppercase text-primary font-semibold group"
              >
                Speisekarte entdecken
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={14} />
                </motion.span>
              </motion.a>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Menu ───────────────────────────────────────────────────────────────────────
const BOOK_MENU = [
  {
    category: "Torten & Kuchen",
    icon: "🎂",
    items: [
      { name: "Ruppiner Buttercremetorte", desc: "Hausgemachte Buttercreme, feiner Biskuit, Haselnuss-Praline", price: "4,80 €" },
      { name: "Schwarzwälder Kirschtorte", desc: "Kirschkonfitüre, Kirschwasser-Sahne, dunkler Schokoladenbiskuit", price: "4,20 €" },
      { name: "Brandenburger Pflaumenkuchen", desc: "Regionale Pflaumen auf zartem Hefeteig, Zimtzucker", price: "3,50 €" },
      { name: "Sachertorte nach Wiener Art", desc: "Zartbitterschokolade, Aprikosenkonfitüre, Fondantglasur", price: "5,20 €" },
    ],
  },
  {
    category: "Feingebäcke",
    icon: "🥐",
    items: [
      { name: "Croissant au Beurre", desc: "Mit reiner Süßrahmbutter, täglich frisch gebacken", price: "2,40 €" },
      { name: "Mandelhörnchen", desc: "Geröstete Mandelblättchen, zarte Marzipanfüllung", price: "2,80 €" },
      { name: "Rheinsberg-Schnecken", desc: "Zimtschnecke mit Vanillecreme & karamellisierten Walnüssen", price: "3,20 €" },
      { name: "Windbeutel", desc: "Luftiger Brandteig, frische Vanillecreme, Puderzucker", price: "3,60 €" },
    ],
  },
  {
    category: "Kaffee-Spezialitäten",
    icon: "☕",
    items: [
      { name: "Ruppiner Melange", desc: "Doppelter Espresso, aufgeschäumte Vollmilch, Karamell-Hauch", price: "4,20 €" },
      { name: "Darjeeling First Flush", desc: "Erlesener Indien-Tee, mit Kandiszucker serviert", price: "3,80 €" },
      { name: "Heiße Schokolade", desc: "Valrhona-Kuvertüre, Vollmilch, frische Schlagsahne", price: "4,50 €" },
      { name: "Cappuccino della Casa", desc: "Hausgerösteter Arabica, samtiger Milchschaum, Kakao", price: "3,60 €" },
    ],
  },
  {
    category: "Frühstück",
    icon: "🍳",
    items: [
      { name: "Ruppiner Frühstücksbrett", desc: "Auswahl feiner Brote, Butter, regionale Marmeladen, Frischkäse", price: "8,90 €" },
      { name: "Klassisches Frühstück", desc: "Zwei Weckchen, Butter, Konfitüre, Honig, ein weichgekochtes Ei", price: "6,50 €" },
      { name: "Granola mit Joghurt", desc: "Selbstgemachtes Granola, Naturjoghurt, frische Beeren", price: "5,80 €" },
      { name: "Warme Waffeln", desc: "Frisch gebacken, Puderzucker, hausgemachte Kirschkonfitüre", price: "4,90 €" },
    ],
  },
];

function MenuItem({ name, desc, price }: { name: string; desc: string; price: string }) {
  return (
    <div className="py-5 border-b border-primary/10 last:border-0">
      <div className="flex items-baseline gap-2 mb-1.5">
        <h4 className="font-['Playfair_Display'] text-[15px] font-medium text-foreground leading-tight flex-1">
          {name}
        </h4>
        <div className="flex-shrink-0 border-b border-dotted border-primary/25 w-8 mb-1" />
        <span className="font-['Raleway'] text-sm font-bold text-primary whitespace-nowrap">{price}</span>
      </div>
      <p className="font-['Lora'] text-xs text-muted-foreground italic leading-relaxed">{desc}</p>
    </div>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState(0);
  const flipDirRef = useRef<number>(1);

  const goTo = (i: number) => {
    if (i === activeTab || i < 0 || i >= BOOK_MENU.length) return;
    flipDirRef.current = i > activeTab ? 1 : -1;
    setActiveTab(i);
  };

  const cat = BOOK_MENU[activeTab];

  return (
    <section id="speisekarte" className="py-24 bg-[#f5ede0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn className="text-center mb-14">
          <p className="font-['Raleway'] text-[10px] tracking-[0.35em] uppercase text-primary mb-4">Seit 1793</p>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-foreground">
            Speise<em className="italic font-normal text-primary">karte</em>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="w-14 h-px bg-primary/30" />
            <div className="w-1.5 h-1.5 bg-primary rotate-45" />
            <div className="w-14 h-px bg-primary/30" />
          </div>
        </AnimateIn>

        <div className="max-w-5xl mx-auto">
          <AnimateIn className="flex justify-center mb-0 relative z-10">
            <div className="flex shadow-sm">
              {BOOK_MENU.map((c, i) => (
                <motion.button
                  key={c.category}
                  onClick={() => goTo(i)}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-5 py-3 font-['Raleway'] text-[10px] tracking-[0.16em] uppercase border-t-2 transition-all duration-300 ${
                    activeTab === i
                      ? "bg-white border-primary text-primary shadow-[0_-2px_0_0_#C8231A]"
                      : "bg-[#ede3d4] border-transparent text-muted-foreground hover:text-primary hover:bg-[#e8dbcc]"
                  }`}
                >
                  <span className="text-sm">{c.icon}</span>
                  <span className="hidden sm:inline">{c.category}</span>
                </motion.button>
              ))}
            </div>
          </AnimateIn>

          {/* PERFEKT SIMULIERTES 3D-BUCHBLÄTTERN */}
          <div style={{ perspective: "2500px" }} className="relative">
            <div className="grid md:grid-cols-[1fr_auto_1fr] shadow-[0_25px_60px_-15px_rgba(26,2,2,0.35),0_15px_30px_-10px_rgba(0,0,0,0.25)] rounded-sm overflow-hidden bg-[#fdf8f0]">
              
              {/* ── Linke Seite (Dreht sich organisch beim Blättern) ── */}
              <motion.div
                key={activeTab + "-left"}
                initial={{ 
                  rotateY: flipDirRef.current > 0 ? -45 : 0, 
                  opacity: flipDirRef.current > 0 ? 0.7 : 1,
                  z: flipDirRef.current > 0 ? -30 : 0
                }}
                animate={{ rotateY: 0, opacity: 1, z: 0 }}
                exit={{ 
                  rotateY: flipDirRef.current > 0 ? 0 : -45, 
                  opacity: flipDirRef.current > 0 ? 1 : 0.7,
                  z: flipDirRef.current > 0 ? 0 : -30
                }}
                transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
                className="relative bg-[#fdf8f0] p-8 md:p-12 min-h-[480px] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22%3E%3Crect width=%224%22 height=%224%22 fill=%22%23000%22/%3E%3Crect x=%220%22 y=%220%22 width=%221%22 height=%221%22 fill=%22%23fff%22/%3E%3C/svg%3E')" }} />
                
                {/* Realistischer Schatten im Falz */}
                <div className="absolute top-0 right-0 bottom-0 w-14 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-14 bottom-0 w-20 bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-10 opacity-40" />

                <div className="absolute top-5 left-7 font-['Raleway'] text-[9px] tracking-[0.25em] text-muted-foreground/40 select-none">
                  {String(activeTab * 2 + 1).padStart(2, "0")}
                </div>

                <div className="text-center mb-8 pt-3">
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary">
                    {cat.category}
                  </h3>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="w-8 h-px bg-primary/25" />
                    <div className="w-1 h-1 bg-primary/35 rotate-45" />
                    <div className="w-8 h-px bg-primary/25" />
                  </div>
                </div>

                {cat.items.slice(0, 2).map((item) => (
                  <MenuItem key={item.name} {...item} />
                ))}
              </motion.div>

              {/* ── Buchrücken / Starre Bindung (Bleibt fest verankert) ── */}
              <div className="hidden md:flex flex-col items-center justify-center w-6 bg-gradient-to-b from-[#8B1E17] via-[#C8231A] to-[#8B1E17] relative z-20 shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 bottom-0 w-px bg-black/40 left-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              </div>

              {/* ── Rechte Seite (Schlägt entgegengesetzt um) ── */}
              <motion.div
                key={activeTab + "-right"}
                initial={{ 
                  rotateY: flipDirRef.current > 0 ? 0 : 45, 
                  opacity: flipDirRef.current > 0 ? 1 : 0.7,
                  z: flipDirRef.current > 0 ? 0 : -30
                }}
                animate={{ rotateY: 0, opacity: 1, z: 0 }}
                exit={{ 
                  rotateY: flipDirRef.current > 0 ? 45 : 0, 
                  opacity: flipDirRef.current > 0 ? 0.7 : 1,
                  z: flipDirRef.current > 0 ? -30 : 0
                }}
                transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="relative bg-[#fdf3e8] p-8 md:p-12 min-h-[480px] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22%3E%3Crect width=%224%22 height=%224%22 fill=%22%23000%22/%3E%3Crect x=%222%22 y=%222%22 width=%221%22 height=%221%22 fill=%22%23fff%22/%3E%3C/svg%3E')" }} />
                
                {/* Realistischer Schatten im Falz */}
                <div className="absolute top-0 left-0 bottom-0 w-14 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 left-14 bottom-0 w-20 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-10 opacity-40" />

                <div className="absolute top-5 right-7 font-['Raleway'] text-[9px] tracking-[0.25em] text-muted-foreground/40 select-none">
                  {String(activeTab * 2 + 2).padStart(2, "0")}
                </div>

                <div className="pt-3">
                  {cat.items.slice(2, 4).map((item) => (
                    <MenuItem key={item.name} {...item} />
                  ))}
                </div>

                <div className="absolute bottom-14 right-10 font-['Playfair_Display'] text-6xl text-primary/8 select-none leading-none">❧</div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="font-['Lora'] text-[11px] italic text-muted-foreground/50">
                    Alle Preise inkl. MwSt. · Saisonale Ergänzungen auf Anfrage
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          <div className="flex items-center justify-between mt-7 px-1">
            <motion.button
              onClick={() => goTo(activeTab - 1)}
              disabled={activeTab === 0}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 font-['Raleway'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              ← Zurück
            </motion.button>

            <div className="flex items-center gap-3">
              {BOOK_MENU.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2 h-2 rotate-45 transition-all duration-300 ${activeTab === i ? "bg-primary scale-125" : "bg-primary/25 hover:bg-primary/50"}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => goTo(activeTab + 1)}
              disabled={activeTab === BOOK_MENU.length - 1}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 font-['Raleway'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              Weiter →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Video section ──────────────────────────────────────────────────────────────
function VideoSection() {
  return (
    <section className="relative py-0 overflow-hidden h-[480px] md:h-[600px] flex items-center">
      <div className="absolute inset-0">
       <video
          src={videoSrc2}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/60 via-transparent to-[#8B0000]/60" />
      </div>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-2xl">
          <AnimateIn>
            <p className="font-['Raleway'] text-[10px] tracking-[0.35em] uppercase text-red-200/80 mb-5">Handwerk erleben</p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-semibold text-white leading-tight mb-8">
              Jedes Gebäck ist
              <br />
              <em className="italic font-normal">ein Kunstwerk</em>
            </h2>
            <div className="flex flex-wrap gap-8">
              {[
                { icon: "🌾", label: "Regionale Zutaten" },
                { icon: "🤲", label: "Handgemacht täglich" },
                { icon: "⭐", label: "Seit 1793" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-['Raleway'] text-xs tracking-[0.15em] uppercase text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  { src: "https://www.ruppiner-feingebaeck.de/wp-content/uploads/2024/02/IMG_9798-1536x864.jpg", alt: "Frisches Brot" },
  { src: "https://www.ruppiner-feingebaeck.de/wp-content/uploads/2024/02/Vitrine-scaled.jpg", alt: "Kaffee & Kuchen" },
  { src: "https://www.ruppiner-feingebaeck.de/wp-content/uploads/2026/01/IMG_3022-scaled.jpeg", alt: "Zimtschnecken" },
  { src: "https://www.ruppiner-feingebaeck.de/wp-content/uploads/2026/01/IMG_3052-scaled-e1767358558476-2048x1150.jpeg", alt: "Tortenkreation" },
  { src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop&auto=format", alt: "Kekse & Feingebäck" },
  { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop&auto=format", alt: "Dessertvariation" },
];

function GallerySection() {
  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn className="text-center mb-16">
          <p className="font-['Raleway'] text-[10px] tracking-[0.35em] uppercase text-primary mb-4">Einblicke</p>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-foreground">
            Unsere <em className="italic font-normal text-primary">Galerie</em>
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <AnimateIn key={i} delay={i * 0.05} className="group relative aspect-square overflow-hidden bg-muted shadow-sm">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="kontakt" className="py-24 bg-[#1a0202] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-['Raleway'] text-[10px] tracking-[0.35em] uppercase text-red-300 mb-4">Besuchen Sie uns</p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium mb-12">
              Kontakt &amp; <em className="italic font-normal text-red-300">Öffnungszeiten</em>
            </h2>
            <div className="space-y-8 font-['Lora'] text-white/70">
              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-['Raleway'] text-xs tracking-[0.1em] uppercase text-white font-semibold mb-1">Adresse</h4>
                  <p>Am Markt 3, 16831 Rheinsberg</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-['Raleway'] text-xs tracking-[0.1em] uppercase text-white font-semibold mb-1">Öffnungszeiten</h4>
                  <p>Mittwoch – Sonntag: 12:00 – 18:00 Uhr</p>
                  <p className="text-white/40 text-sm mt-0.5">Montag &amp; Dienstag: Ruhetag</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-['Raleway'] text-xs tracking-[0.1em] uppercase text-white font-semibold mb-1">Telefon</h4>
                  <p>033931 / 2345</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm">
            <h3 className="font-['Playfair_Display'] text-2xl font-medium mb-6">Nachricht senden</h3>
            <form className="space-y-5 font-['Raleway'] text-xs tracking-[0.1em] uppercase" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors" />
                <input type="email" placeholder="E-Mail" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>
              <textarea placeholder="Ihre Nachricht" rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors resize-none" />
              <button type="submit" className="w-full bg-primary py-4 font-semibold text-white hover:bg-red-700 transition-colors tracking-[0.2em]">
                Nachricht absenden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f0101] text-white/40 py-12 border-t border-white/5 text-center font-['Raleway'] text-[10px] tracking-[0.15em] uppercase">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p>&copy; {new Date().getFullYear()} Ruppiner Feingebäck. Alle Rechte vorbehalten.</p>
        <div className="flex gap-8">
          <a href="#impressum" className="hover:text-white transition-colors">Impressum</a>
          <a href="#datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

// ── HAUPTKOMPONENTE ────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="bg-[#fcfaf7] text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Ribbon />
      <AboutSection />
      <MenuSection />
      <VideoSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}