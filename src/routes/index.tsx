import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import exteriorAsset from "@/assets/real/exterior.png.asset.json";
import kacicaAsset from "@/assets/real/kacica.png.asset.json";
import cordonBleuAsset from "@/assets/real/cordonbleu.png.asset.json";
import barAsset from "@/assets/real/bar.png.asset.json";
import rezenAsset from "@/assets/real/rezen.png.asset.json";
import polievkaAsset from "@/assets/real/polievka.png.asset.json";

const exterior = exteriorAsset.url;
const kacica = kacicaAsset.url;
const cordonBleu = cordonBleuAsset.url;
const bar = barAsset.url;
const rezen = rezenAsset.url;
const polievka = polievkaAsset.url;
const hero = exterior;
const interior = bar;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reštaurácia Casablanca — Štúrovo | Rezervácie & Menu" },
      { name: "description", content: "Reštaurácia Casablanca v Štúrove ponúka tradičnú aj modernú kuchyňu v elegantnej atmosfére. Online rezervácie, menu a kontakt." },
      { property: "og:title", content: "Reštaurácia Casablanca — Štúrovo" },
      { property: "og:description", content: "Tradičná kuchyňa s moderným nádychom. Rezervujte si stôl." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: "Reštaurácia Casablanca",
        image: hero,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sobieskeho 359/7",
          addressLocality: "Štúrovo",
          postalCode: "943 01",
          addressCountry: "SK",
        },
        telephone: "+421 36 752 27 50",
        priceRange: "€€",
        servesCuisine: ["Slovenská", "Medzinárodná"],
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "1291" },
      }),
    }],
  }),
  component: Index,
});

const nav = [
  { href: "#o-nas", label: "O nás" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galéria" },
  { href: "#kontakt", label: "Kontakt" },
];

const menu = {
  "Polievky": [
    { name: "Fazuľová polievka s údeným kolienkom", desc: "330 g · Jókai bableves / Bean Soup with Smoked Joint", price: "2,90 €" },
    { name: "Slepačí vývar s mäsom a rezancami", desc: "330 g · Újházi tyúkhúsleves / Chicken Broth with Noodles", price: "2,50 €" },
    { name: "Držková polievka", desc: "330 g · Pacalleves / Tripe Soup", price: "2,90 €" },
    { name: "Grécka ovocná polievka (studená)", desc: "Görög gyümölcsleves / Greek Fruit Soup (cold)", price: "3,00 €" },
    { name: "Halászlé z kapra – Maďarská rybacia polievka", desc: "Halászlé pontyból / Hungarian Fish Soup of Carp", price: "5,90 €" },
    { name: "Halászlé zo sumca", desc: "Halászlé harcsából / Hungarian Fish Soup of Catfish", price: "8,00 €" },
  ],
  "Hotové jedlá": [
    { name: "Teľací perkelt", desc: "150 g · Borjúpörkölt / Veal in Paprika Sauce", price: "7,90 €" },
    { name: "Kotlíkový guláš na spôsob umelca", desc: "350 g · Bográcsgulyás művész módra / Goulash artist style", price: "5,90 €" },
    { name: "Držky na paprike so šampiňónmi a mozočkom", desc: "350 g · Velős, gombás pacalpörkölt / Tripe with Mushrooms and Brain", price: "5,50 €" },
    { name: "Bravčové cigánske rebierko", desc: "150 g · Cigánypecsenye / Roast Pork Rib", price: "9,90 €" },
    { name: "Bravčové medailónky s Rockfortom", desc: "150 g · Rockfortos szűzérmék", price: "9,90 €" },
    { name: "Bravčový rezeň plnený mozočkom", desc: "150 g · Velővel töltött sertésszelet", price: "9,90 €" },
    { name: "Sedliacka bravčová pečienka, dusená kapusta, knedle", desc: "150 g · Fokhagymás malacsült", price: "9,90 €" },
    { name: "Parížsky rezeň (rezeň v cestíčku)", desc: "150 g · Párizsi szelet / Veal Cutlet Paris style", price: "19,50 €" },
    { name: "Býčia láska", desc: "150 g · Vyprážané, restované býčie žľazy", price: "9,90 €" },
  ],
  "Hydina": [
    { name: "Husacia pečeň pečená / vyprážaná", desc: "100 g · Libamáj sütve / Roast of Fried Goose Liver", price: "18,90 €" },
    { name: "Morčacie prsia plnené husacou pečeňou", desc: "150 g · Libamájjal töltött pulykamell", price: "9,90 €" },
    { name: "Chrumkavé kačacie stehná, knedle, dusená kapusta", desc: "150 g · Ropogós kacsacombok, knédli, párolt káposzta", price: "9,50 €" },
  ],
  "Ryby": [
    { name: "Vyprážaný kapor", desc: "150 g · Rántott ponty / Fried Carp", price: "5,90 €" },
    { name: "Filetovaný zubáč s holandskou omáčkou", desc: "150 g · Filézett fogas – Holland mártással", price: "9,90 €" },
    { name: "Pstruh na rasci", desc: "10 g · Sült pisztráng / Trout on Caraway", price: "0,20 €" },
    { name: "Filetovaný sumec na spôsob „Orly\" (v pivnom cestíčku)", desc: "150 g · Orly harcsaszeletek / Catfish „Orly\" style", price: "7,10 €" },
    { name: "Perkelt zo sumca", desc: "150 g · Harcsapaprikás / Catfish in Paprika Sauce", price: "8,90 €" },
  ],
  "Šaláty": [
    { name: "Hlávkový šalát s dressingom a syrom", desc: "150 g · Fejessaláta sajttal és dresszinggel", price: "4,50 €" },
    { name: "Kapustový šalát", desc: "120 g · Káposztasaláta", price: "3,50 €" },
    { name: "Uhorkový šalát s kyslou smotanou", desc: "120 g · Tejfölös uborkasaláta", price: "4,50 €" },
    { name: "Rajčinový šalát", desc: "120 g · Paradicsomsaláta", price: "4,50 €" },
    { name: "Paprikový šalát", desc: "120 g · Paprikasaláta", price: "4,50 €" },
    { name: "Miešaný šalát z čerstvej zeleniny", desc: "120 g · Primőr vegyessaláta", price: "5,00 €" },
  ],
  "Prílohy": [
    { name: "Varené zemiaky", desc: "200 g · Főtt burgonya / Boiled Potatoes", price: "2,00 €" },
    { name: "Opekané zemiaky", desc: "200 g · Sült burgonya / Fried Potatoes", price: "2,00 €" },
    { name: "Hranolky", desc: "150 g · Hasábburgonya / French Fries", price: "2,00 €" },
    { name: "Zemiakové krokety", desc: "150 g · Burgonya krokett / Potato Croquettes", price: "2,50 €" },
    { name: "Ryža s hráškom a mrkvou", desc: "150 g · Rizs zöldséggel / Rice with Peas and Carrot", price: "2,00 €" },
    { name: "Kysnuté knedle", desc: "150 g · Párolt knédli / Dumplings", price: "2,00 €" },
    { name: "Halušky", desc: "150 g · Galuska / Gnocchi", price: "2,00 €" },
    { name: "Zemiakové pyré", desc: "150 g · Burgonyapüré / Mashed Potatoes", price: "2,90 €" },
    { name: "Tatárska omáčka / Kečup / Smotana", desc: "50 g", price: "0,90 €" },
  ],
  "Nápoje": [
    { name: "Prazdroj 12° čapované", desc: "0,5 l / 0,3 l", price: "2,50 / 1,50 €" },
    { name: "Birell (nealko)", desc: "0,5 l", price: "1,90 €" },
    { name: "Zlatý bažant fľ. (nealko)", desc: "0,33 l", price: "1,90 €" },
    { name: "Coca Cola / Sprite / Fanta / Kinley Tonic", desc: "Nealkoholické nápoje", price: "1,90 €" },
    { name: "Bonaqua / Rommer Quelle", desc: "Minerálna voda", price: "1,90 €" },
    { name: "Espresso", desc: "Káva", price: "1,90 €" },
    { name: "Capuccino", desc: "Káva", price: "2,50 €" },
    { name: "Latte", desc: "Káva", price: "3,90 €" },
    { name: "Viedeňská káva (šľahačka)", desc: "", price: "2,50 €" },
    { name: "Alžírska (šľahačka + vaječný likér)", desc: "", price: "4,50 €" },
    { name: "Francúzska (šľahačka + brandy)", desc: "", price: "4,50 €" },
    { name: "Írska (šľahačka + Baileys)", desc: "", price: "4,50 €" },
  ],
  "Aperitívy & Destiláty": [
    { name: "Cinzano Bianco / Dry", desc: "1 dcl", price: "2,70 €" },
    { name: "Martini Bianco / Dry", desc: "1 dcl", price: "2,70 €" },
    { name: "Campari", desc: "1 dcl", price: "4,20 €" },
    { name: "Vermouth", desc: "1 dcl", price: "1,50 €" },
    { name: "Gazdovská slivovica", desc: "2 cl / 4 cl", price: "1,30 / 2,60 €" },
    { name: "Becherovka / Fernet Stock", desc: "2 cl / 4 cl", price: "0,80 / 1,60 €" },
    { name: "Finlandia Vodka", desc: "2 cl / 4 cl", price: "0,80 / 1,60 €" },
    { name: "Gibson's Gin", desc: "2 cl / 4 cl", price: "1,30 / 2,60 €" },
    { name: "Spišská borovička", desc: "2 cl / 4 cl", price: "0,80 / 1,60 €" },
    { name: "Malibu – kokosový likér", desc: "2 cl / 4 cl", price: "1,50 / 3,00 €" },
    { name: "Baileys – írsky karamel", desc: "2 cl / 4 cl", price: "1,30 / 2,60 €" },
    { name: "Jägermeister", desc: "2 cl / 4 cl", price: "1,30 / 2,60 €" },
    { name: "Tequila", desc: "2 cl / 4 cl", price: "1,50 / 3,00 €" },
    { name: "Amaretto – mandľový likér", desc: "2 cl / 4 cl", price: "1,00 / 2,00 €" },
    { name: "Zacapa – rum", desc: "2 cl / 4 cl", price: "2,50 / 5,00 €" },
    { name: "Karpatské brandy špeciál", desc: "2 cl / 4 cl", price: "1,50 / 3,00 €" },
    { name: "Metaxa *****", desc: "2 cl / 4 cl", price: "1,30 / 2,60 €" },
    { name: "Calvados", desc: "2 cl / 4 cl", price: "2,50 / 5,00 €" },
  ],
  "Vína": [
    { name: "Rizling rýnsky / vlašský (polosladké/suché)", desc: "0,75 l / 1 dcl · Biele víno", price: "15,00 / 2,00 €" },
    { name: "Debrői hárslevelű (polosladké)", desc: "0,75 l / 1 dcl · Biele víno", price: "9,75 / 1,30 €" },
    { name: "Badacsonyi szürkebarát / muskotály", desc: "0,75 l / 1 dcl · Biele víno", price: "9,75 / 1,30 €" },
    { name: "Chardonnay (suché) HR Gbelce", desc: "0,75 l / 1 dcl", price: "22,50 / 3,00 €" },
    { name: "Pinot Gris (suché) HR Gbelce", desc: "0,75 l / 1 dcl", price: "22,50 / 3,00 €" },
    { name: "Tokajský výber 5 putňový", desc: "0,5 l", price: "31,50 €" },
    { name: "Tokajský výber 3 putňový", desc: "0,5 l", price: "22,00 €" },
    { name: "Samorodné suché – sladké", desc: "0,5 l / 1 dcl", price: "13,50 / 2,70 €" },
    { name: "Villányi Rosé (suché)", desc: "0,75 l / 1 dcl", price: "22,50 / 3,00 €" },
    { name: "Cabernet Sauvignon (suché)", desc: "0,75 l / 1 dcl", price: "22,50 / 3,00 €" },
    { name: "Egri bikavér (suché)", desc: "0,75 l / 1 dcl · Červené", price: "9,75 / 1,30 €" },
    { name: "Kláštorné červené (polosladké)", desc: "1 l", price: "7,00 €" },
    { name: "Pinot Noir (suché) HR Gbelce", desc: "0,75 l", price: "22,50 €" },
    { name: "Alibernet / Dorferdon (suché) HR Gbelce", desc: "0,75 l / 1 dcl", price: "22,50 / 3,00 €" },
    { name: "Hubert „de Luxe\" / Classic Metode", desc: "Šumivé víno · 0,7 l", price: "15,00 €" },
    { name: "Budweiser 12°", desc: "0,5 l · Fľaškové pivo", price: "2,20 €" },
    { name: "Zlatý bažant 73° 12° / Radler / Šariš tmavý", desc: "0,5 l", price: "1,90 €" },
  ],
} as const;

const hours = [
  ["Pondelok", "11:00 – 22:00"],
  ["Utorok", "11:00 – 22:00"],
  ["Streda", "11:00 – 22:00"],
  ["Štvrtok", "11:00 – 22:00"],
  ["Piatok", "11:00 – 23:00"],
  ["Sobota", "11:00 – 23:00"],
  ["Nedeľa", "11:00 – 22:00"],
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" />
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Hours />
      <Contact />
      <Reservation />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl tracking-wide">
          <span className="text-gold">Casablanca</span>
        </a>
        <nav className="hidden gap-10 text-sm md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-muted-foreground transition-colors hover:text-gold">{n.label}</a>
          ))}
        </nav>
        <a href="#rezervacia" className="hidden md:inline-flex items-center border border-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground">
          Rezervovať
        </a>
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-gold">{n.label}</a>
            ))}
            <a href="#rezervacia" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center border border-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold">Rezervovať</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img src={hero} alt="Interiér Reštaurácie Casablanca" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">Štúrovo · od 2005</div>
        <h1 className="font-display text-5xl leading-[1.05] text-foreground sm:text-7xl md:text-8xl">
          Reštaurácia<br />
          <span className="italic text-gold">Casablanca</span>
        </h1>
        <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          Tradičná kuchyňa s moderným nádychom. Miesto, kde sa každý večer mení na zážitok.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#rezervacia" className="border border-gold bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold">
            Rezervovať stôl
          </a>
          <a href="#menu" className="border border-border px-8 py-4 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-gold hover:text-gold">
            Zobraziť menu
          </a>
        </div>
        <div className="mt-16 flex items-center gap-6 text-xs text-muted-foreground">
          <span className="text-gold">★ 4,5</span>
          <span>1 291 hodnotení na Google</span>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-16 text-center">
      <div className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">{kicker}</div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
    </div>
  );
}

function About() {
  return (
    <section id="o-nas" className="px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={interior} alt="Interiér reštaurácie" loading="lazy" width={1280} height={896} className="h-full w-full object-cover" />
          <div className="absolute inset-0 border border-gold/30" style={{ transform: "translate(16px,16px)" }} />
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">O nás</div>
          <h2 className="font-display text-4xl md:text-5xl">Atmosféra, ktorú si zapamätáte</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Reštaurácia Casablanca v srdci Štúrova je miestom, kde sa tradičná slovenská kuchyňa stretáva s modernými chuťovými trendmi. Každý tanier pripravujeme s láskou k detailu a z čerstvých surovín.
            </p>
            <p>
              Ponúkame príjemné posedenie v elegantnom interiéri, profesionálny servis a dôraz na zážitok z jedla. Vhodné na romantickú večeru, biznis stretnutie aj rodinnú oslavu.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["20+", "rokov tradície"],
              ["4,5★", "Google hodnotenie"],
              ["15–20 €", "priemer za osobu"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl text-gold md:text-3xl">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [active, setActive] = useState<keyof typeof menu>("Polievky");
  return (
    <section id="menu" className="bg-secondary/30 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle kicker="Naše menu" title="Vybrané chute" />
        <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-6">
          {(Object.keys(menu) as Array<keyof typeof menu>).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`border-b px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                active === cat ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <ul className="space-y-8">
          {menu[active].map((item) => (
            <li key={item.name} className="grid grid-cols-[1fr_auto] gap-4 border-b border-border/60 pb-6">
              <div className="min-w-0">
                <h3 className="font-display text-xl text-foreground sm:text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <div className="shrink-0 font-display text-lg text-gold sm:text-xl">{item.price}</div>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Celé menu k dispozícii v reštaurácii · ceny vrátane DPH
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: rezen, alt: "Vyprážaný rezeň plnený so šunkou a syrom", cls: "md:col-span-2 md:row-span-2 aspect-square" },
    { src: bar, alt: "Barový pult v interiéri", cls: "aspect-square" },
    { src: polievka, alt: "Domáca polievka", cls: "aspect-square" },
    { src: kacica, alt: "Pečená kačica s knedľou a kapustou", cls: "aspect-square" },
    { src: cordonBleu, alt: "Cordon Bleu s opekanými zemiakmi", cls: "aspect-square" },
    { src: exterior, alt: "Exteriér Reštaurácie Casablanca", cls: "md:col-span-2 aspect-[2/1]" },
  ];
  return (
    <section id="galeria" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Galéria" title="Pohľad do reštaurácie" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {imgs.map((i, idx) => (
            <div key={idx} className={`group overflow-hidden ${i.cls}`}>
              <img src={i.src} alt={i.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hours() {
  return (
    <section className="bg-secondary/30 px-6 py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Otváracie hodiny</div>
          <h2 className="font-display text-4xl md:text-5xl">Tešíme sa na vás každý deň</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 text-muted-foreground">
            Pre väčšie skupiny a špeciálne príležitosti odporúčame rezerváciu vopred.
          </p>
        </div>
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {hours.map(([d, t]) => (
            <li key={d} className="flex items-center justify-between py-4">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">{d}</span>
              <span className="font-display text-lg text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Kontakt" title="Nájdite nás" />
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <ContactRow label="Adresa" value="Sobieskeho 359/7, 943 01 Štúrovo" link="https://www.google.com/maps/place/Re%C5%A1taur%C3%A1cia+Casablanca/@47.800741,18.7236886,16z" linkLabel="Trasa na Google Maps" />
            <ContactRow label="Telefón" value="036 752 27 50" link="tel:+421367522750" linkLabel="Zavolať teraz" />
            <ContactRow label="Web" value="m.facebook.com" link="https://m.facebook.com" linkLabel="Facebook" />
            <ContactRow label="Cenová úroveň" value="15 – 20 € za osobu" />
          </div>
          <div className="aspect-square w-full overflow-hidden border border-border md:aspect-auto">
            <iframe
              title="Mapa Reštaurácia Casablanca"
              src="https://www.google.com/maps?q=Re%C5%A1taur%C3%A1cia+Casablanca+Sobieskeho+359/7+%C5%A0t%C3%BArovo&output=embed"
              className="h-full min-h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, link, linkLabel }: { label: string; value: string; link?: string; linkLabel?: string }) {
  return (
    <div className="border-b border-border/60 pb-6">
      <div className="text-xs uppercase tracking-[0.3em] text-gold">{label}</div>
      <div className="mt-2 font-display text-2xl text-foreground">{value}</div>
      {link && (
        <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-2 inline-block text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold">
          → {linkLabel}
        </a>
      )}
    </div>
  );
}

function Reservation() {
  const [form, setForm] = useState({ name: "", people: "2", date: "", time: "19:00", phone: "", email: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        date: form.date,
        time: form.time,
        guests: parseInt(form.people, 10),
        note: form.note.trim() || null,
      });
      if (error) throw error;
      toast.success("Ďakujeme! Vašu rezerváciu sme prijali.", {
        description: `${form.name}, ${form.people} osôb · ${form.date} o ${form.time}. Potvrdíme telefonicky.`,
      });
      setForm({ name: "", people: "2", date: "", time: "19:00", phone: "", email: "", note: "" });
    } catch (err) {
      console.error(err);
      toast.error("Rezerváciu sa nepodarilo odoslať. Skúste to znova alebo zavolajte.");
    } finally {
      setSubmitting(false);
    }
  };
  const input = "w-full border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";
  return (
    <section id="rezervacia" className="relative overflow-hidden bg-secondary/30 px-6 py-28 md:py-36">
      <div className="absolute inset-0 opacity-10">
        <img src={kacica} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <SectionTitle kicker="Rezervácia" title="Rezervujte si stôl" />
        <form onSubmit={onSubmit} className="space-y-5 border border-border bg-card/80 p-6 backdrop-blur sm:p-10">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Meno</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} placeholder="Vaše meno" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Počet osôb</label>
              <select value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} className={input}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Telefón</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} placeholder="+421" type="tel" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Dátum</label>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={input} />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Čas</label>
              <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={input} />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Email (nepovinné)</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} placeholder="vas@email.sk" type="email" />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Poznámka (nepovinné)</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className={input} placeholder="Alergie, špeciálne želania..." rows={3} />
          </div>
          <button type="submit" disabled={submitting} className="w-full border border-gold bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold disabled:opacity-50">
            {submitting ? "Odosiela sa..." : "Odoslať rezerváciu"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Alebo zavolajte na <a href="tel:+421367522750" className="text-gold hover:underline">036 752 27 50</a>
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
        <div className="font-display text-lg text-gold">Casablanca</div>
        <div>Sobieskeho 359/7, 943 01 Štúrovo · 036 752 27 50</div>
        <div>© {new Date().getFullYear()} Reštaurácia Casablanca</div>
      </div>
    </footer>
  );
}
