import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';

const authorAvatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="60" fill="#E8E5DE"/>
      <path d="M30 78C34 67 44 60 60 60C76 60 86 67 90 78" stroke="#6E7F6B" stroke-width="4" stroke-linecap="round"/>
      <circle cx="60" cy="48" r="16" stroke="#1A1A1A" stroke-width="4"/>
    </svg>
  `);

const initialPortfolioImages = [
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" rx="42" fill="#1A1A1A"/>
      <rect x="64" y="64" width="672" height="872" rx="38" fill="#5F665C"/>
      <circle cx="238" cy="282" r="140" fill="#FBFBFA" fill-opacity="0.16"/>
      <rect x="176" y="556" width="448" height="36" rx="18" fill="#FBFBFA" fill-opacity="0.54"/>
      <rect x="176" y="616" width="278" height="20" rx="10" fill="#FBFBFA" fill-opacity="0.34"/>
      <text x="176" y="744" fill="#FBFBFA" font-size="74" font-family="Inter, Arial, sans-serif" font-weight="700">Stacy</text>
    </svg>
  `),
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" rx="42" fill="#F5F2EB"/>
      <rect x="104" y="152" width="592" height="396" rx="28" fill="#1A1A1A"/>
      <rect x="148" y="210" width="404" height="16" rx="8" fill="#FBFBFA" fill-opacity="0.54"/>
      <rect x="148" y="246" width="260" height="12" rx="6" fill="#FBFBFA" fill-opacity="0.38"/>
      <text x="148" y="434" fill="#FBFBFA" font-size="58" font-family="Playfair Display, Georgia, serif" font-weight="700">Brand studies</text>
      <circle cx="596" cy="736" r="132" fill="#6E7F6B" fill-opacity="0.24"/>
    </svg>
  `),
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" rx="42" fill="#FBFBFA"/>
      <rect x="92" y="92" width="616" height="816" rx="38" fill="#1A1A1A"/>
      <path d="M142 764C234 602 326 560 418 396c58-100 128-168 228-244" stroke="#F0D36D" stroke-width="28" stroke-linecap="round" fill="none"/>
      <circle cx="534" cy="304" r="90" fill="#FBFBFA" fill-opacity="0.08"/>
    </svg>
  `),
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" rx="42" fill="#F8F6F1"/>
      <rect x="78" y="78" width="644" height="844" rx="34" fill="#E7E0D0"/>
      <rect x="140" y="140" width="520" height="56" rx="28" fill="#1A1A1A"/>
      <rect x="140" y="272" width="520" height="470" rx="26" fill="#FBFBFA"/>
    </svg>
  `),
];

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-px w-full bg-charcoal/10">
      <div className="h-px origin-left bg-sage transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} aria-hidden="true" />
    </div>
  );
}

function LogoMark() {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="Stacy Designs home">
      <svg className="h-16 w-16 shrink-0 drop-shadow-[0_10px_18px_rgba(26,26,26,0.18)] transition-all duration-300 group-hover:scale-105 sm:h-20 sm:w-20" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="goldStroke" x1="24" y1="18" x2="138" y2="142" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF1BB" />
            <stop offset="16%" stopColor="#B58010" />
            <stop offset="38%" stopColor="#F4DA6E" />
            <stop offset="62%" stopColor="#855404" />
            <stop offset="100%" stopColor="#F0D36D" />
          </linearGradient>
          <linearGradient id="shadowStroke" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D0D0D" />
            <stop offset="100%" stopColor="#2A2A2A" />
          </linearGradient>
          <filter id="softGlow" x="0" y="0" width="160" height="160" filterUnits="userSpaceOnUse">
            <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
          </filter>
        </defs>
        <g filter="url(#softGlow)">
          <path d="M50 122c-9-8-14-19-14-31 0-24 15-39 39-39 13 0 23 5 30 13" stroke="url(#goldStroke)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 121c-9-8-14-19-14-31 0-24 15-39 39-39 13 0 23 5 30 13" stroke="url(#shadowStroke)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M89 25 113 121" stroke="url(#goldStroke)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M90 25 113 121" stroke="url(#shadowStroke)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 116 66 61 52 116" stroke="url(#goldStroke)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 116 66 61 52 116" stroke="url(#shadowStroke)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M58 75h19" stroke="url(#goldStroke)" strokeWidth="10" strokeLinecap="round" />
          <path d="M58 75h19" stroke="url(#shadowStroke)" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M30 124c15 7 42 10 88 5" stroke="url(#shadowStroke)" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
          <path d="M30 122c15 7 42 10 88 5" stroke="url(#goldStroke)" strokeWidth="5.8" strokeLinecap="round" opacity="0.85" />
        </g>
      </svg>
      <span className="sr-only">Stacy Designs</span>
    </a>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <LogoMark />
        <div className="hidden items-center gap-8 text-sm text-charcoal/65 md:flex">
          <a className="transition-all duration-300 hover:text-sage" href="#article">Article</a>
          <a className="transition-all duration-300 hover:text-sage" href="#highlights">Highlights</a>
          <a className="transition-all duration-300 hover:text-sage" href="#notes">Notes</a>
        </div>
      </nav>
    </header>
  );
}

function usePortfolioState() {
  const [portfolioImages, setPortfolioImages] = useState<string[]>(initialPortfolioImages);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [instagramGridSlots, setInstagramGridSlots] = useState({ left: 1, rightTop: 2, rightBottom: 3 });
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return null;
    }

    const nextUrl = URL.createObjectURL(file);
    let nextIndex = portfolioImages.length;

    setPortfolioImages((current) => {
      nextIndex = current.length;
      return [...current, nextUrl];
    });

    event.target.value = '';
    return nextIndex;
  };

  const handleSlotImageUpload = (slot: 'hero' | 'left' | 'rightTop' | 'rightBottom') => (event: ChangeEvent<HTMLInputElement>) => {
    const nextIndex = handleImageUpload(event);
    if (nextIndex == null) {
      return;
    }

    if (slot === 'hero') {
      setHeroImageIndex(nextIndex);
      return;
    }

    setInstagramGridSlots((current) => ({ ...current, [slot]: nextIndex }));
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setLogoImageUrl(URL.createObjectURL(file));
    event.target.value = '';
  };

  const removeLogoImage = () => setLogoImageUrl(null);

  return {
    portfolioImages,
    heroImageIndex,
    instagramGridSlots,
    logoImageUrl,
    handleSlotImageUpload,
    handleLogoUpload,
    removeLogoImage,
  };
}

interface HeroProps {
  portfolioImages: string[];
  heroImageIndex: number;
  handleSlotImageUpload: (slot: 'hero') => (event: ChangeEvent<HTMLInputElement>) => void;
  logoImageUrl: string | null;
  handleLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Hero({ portfolioImages, heroImageIndex, handleSlotImageUpload, logoImageUrl, handleLogoUpload }: HeroProps) {
  const heroImage = portfolioImages[heroImageIndex] ?? portfolioImages[0];
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 lg:py-24">
      <div className="max-w-3xl">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-sage">Stacy Akinyi / Design Perspective</p>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] text-charcoal sm:text-6xl lg:text-7xl">Stacy Designs: a refined visual language for modern creative work</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal/75 sm:text-lg">A measured interface can do more than display words. It can frame identity, present selected work, and turn a creative practice into something that feels unmistakably premium.</p>

        <div className="mt-8 inline-flex flex-wrap items-center gap-4 rounded-full border border-charcoal/10 bg-white/55 px-4 py-3 shadow-[0_10px_30px_rgba(26,26,26,0.05)] backdrop-blur-sm">
          <img src={authorAvatar} alt="Author avatar" className="h-12 w-12 rounded-full border border-charcoal/10" />
          <div className="pr-4">
            <p className="text-sm font-medium text-charcoal">Stacy Akinyi</p>
            <p className="text-sm text-charcoal/65">Creative portfolio · Published July 2, 2026</p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-charcoal/10 bg-[linear-gradient(135deg,rgba(26,26,26,0.94)_0%,rgba(43,43,43,0.9)_44%,rgba(110,127,107,0.82)_100%)] shadow-editorial sm:min-h-[30rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.14),transparent_18%)]" />
        
        {/* Dynamic Top-Left Circle (Logo Upload Slot) */}
        <button
          type="button"
          onClick={() => logoInputRef.current?.click()}
          className="group absolute left-6 top-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/5 transition-all duration-300 hover:bg-white/10 sm:left-8 sm:top-8 sm:h-32 sm:w-32"
          aria-label="Upload custom logo asset"
        >
          {logoImageUrl ? (
            <img src={logoImageUrl} alt="Stacy Custom Logo" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs uppercase tracking-wider text-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Add Logo</span>
          )}
        </button>
        <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="sr-only" aria-hidden="true" tabIndex={-1} />

        <div className="absolute bottom-8 left-8 right-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">Creative direction / hero treatment</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">A premium space reserved for Stacy’s signature imagery, posters, styling studies, or campaign visuals.</p>
          </div>

          {/* Clean Profile Photo Trigger Wrapper */}
          <button 
            type="button"
            onClick={() => heroInputRef.current?.click()}
            className="group relative h-20 w-20 justify-self-end rounded-full border border-white/25 bg-white/10 backdrop-blur-sm sm:h-24 sm:w-24 overflow-visible"
            aria-label="Upload or replace the hero image"
          >
            <img src={heroImage} alt="Hero image preview" className="h-full w-full rounded-full object-cover" />
            <span className="absolute inset-0 rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:ring-white/50" />
            
            <div
              className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-charcoal/55 text-sm text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-charcoal/75"
            >
              +
            </div>
          </button>
          <input ref={heroInputRef} type="file" accept="image/*" onChange={handleSlotImageUpload('hero')} className="sr-only" aria-hidden="true" tabIndex={-1} />
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-14 flex gap-5 border-y border-charcoal/10 py-8 sm:py-10">
      <span className="w-px shrink-0 bg-sage" aria-hidden="true" />
      <p className="font-serif text-2xl italic leading-tight tracking-[-0.03em] text-charcoal sm:text-3xl">{children}</p>
    </blockquote>
  );
}

function InlineFigure() {
  return (
    <figure className="my-12 overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white/70 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
      <div className="grid min-h-[16rem] place-items-center bg-[linear-gradient(135deg,rgba(110,127,107,0.18),rgba(26,26,26,0.05))] p-8 sm:min-h-[20rem]">
        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-[0.95fr_1.05fr]">
          <div className="h-44 rounded-[1.5rem] border border-white/70 bg-white/60 shadow-sm sm:h-52" />
          <div className="grid gap-4">
            <div className="h-20 rounded-[1.25rem] border border-white/70 bg-white/55" />
            <div className="h-28 rounded-[1.25rem] border border-white/70 bg-white/50" />
          </div>
        </div>
      </div>
      <figcaption className="px-6 py-4 text-center text-sm italic text-charcoal/60 sm:px-8">This section is ready for Stacy’s real post imagery once the selected Instagram assets are shared.</figcaption>
    </figure>
  );
}

function PortfolioCircle({ image, title, description, onUpload }: { image: string; title: string; description: string; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <figure className="space-y-4 text-center">
      <div className="group relative mx-auto flex aspect-square w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-full border border-charcoal/10 bg-white/70 p-4 shadow-[0_16px_45px_rgba(26,26,26,0.08)] sm:max-w-[22rem]">
        <img src={image} alt={title} className="h-full w-full rounded-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 rounded-full ring-1 ring-white/30 transition-all duration-300 group-hover:ring-sage/35" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10 bg-white/85 text-base text-charcoal shadow-[0_8px_20px_rgba(26,26,26,0.12)] transition-all duration-300 hover:bg-white"
          aria-label={`Upload image for ${title}`}
        >
          +
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={onUpload} className="sr-only" aria-hidden="true" tabIndex={-1} />
      </div>
      <figcaption className="mx-auto max-w-[18rem] text-sm italic leading-6 text-charcoal/60 sm:max-w-[22rem]">
        <span className="block font-medium not-italic text-charcoal">{title}</span>
        {description}
      </figcaption>
    </figure>
  );
}

function LogoBadge({ logoImageUrl, onLogoUpload, onRemoveLogo }: { logoImageUrl: string | null; onLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void; onRemoveLogo: () => void }) {
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <figure className="space-y-4 text-center">
      <div className="group relative mx-auto flex aspect-square w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-full border border-charcoal/10 bg-[radial-gradient(circle_at_30%_25%,#ffffff_0%,#f7f5f0_38%,#ece6d7_100%)] p-5 shadow-[0_16px_45px_rgba(26,26,26,0.08)] sm:max-w-[22rem]">
        {logoImageUrl ? <img src={logoImageUrl} alt="Uploaded logo" className="h-full w-full rounded-full object-cover object-center" /> : <div className="flex h-full w-full items-center justify-center"><LogoMark /></div>}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/30 transition-all duration-300 group-hover:ring-sage/35" />
        <button
          type="button"
          onClick={() => logoInputRef.current?.click()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10 bg-white/90 text-base text-charcoal shadow-[0_8px_20px_rgba(26,26,26,0.12)] transition-all duration-300 hover:bg-white"
          aria-label="Upload or replace the logo image"
        >
          +
        </button>
        <input ref={logoInputRef} type="file" accept="image/*" onChange={onLogoUpload} className="sr-only" aria-hidden="true" tabIndex={-1} />
      </div>
      <figcaption className="mx-auto max-w-[18rem] text-sm italic leading-6 text-charcoal/60 sm:max-w-[22rem]">
        <span className="block font-medium not-italic text-charcoal">Logo</span>
        Upload a logo image or keep the monogram fallback.
      </figcaption>
      <button type="button" onClick={onRemoveLogo} className="rounded-full border border-charcoal/10 px-4 py-2 text-sm text-charcoal transition-all duration-300 hover:border-sage hover:text-sage">Remove logo image</button>
    </figure>
  );
}

function App() {
  const { portfolioImages, heroImageIndex, instagramGridSlots, logoImageUrl, handleSlotImageUpload, handleLogoUpload, removeLogoImage } = usePortfolioState();

  useEffect(() => {
    return () => {
      portfolioImages.forEach((image) => {
        if (image.startsWith('blob:')) {
          URL.revokeObjectURL(image);
        }
      });
      if (logoImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(logoImageUrl);
      }
    };
  }, [portfolioImages, logoImageUrl]);

  const heroImage = portfolioImages[heroImageIndex] ?? portfolioImages[0];
  const gridLeft = portfolioImages[instagramGridSlots.left] ?? portfolioImages[0];
  const gridRightTop = portfolioImages[instagramGridSlots.rightTop] ?? portfolioImages[0];
  const gridRightBottom = portfolioImages[instagramGridSlots.rightBottom] ?? portfolioImages[0];

  return (
    <div id="top" className="min-h-screen bg-cream font-sans text-charcoal">
      <ReadingProgressBar />
      <Navbar />
      <main>
        <Hero 
          portfolioImages={portfolioImages} 
          heroImageIndex={heroImageIndex} 
          handleSlotImageUpload={handleSlotImageUpload} 
          logoImageUrl={logoImageUrl}
          handleLogoUpload={handleLogoUpload}
        />

        <article id="article" className="mx-auto max-w-3xl px-5 pb-24 sm:px-8 lg:px-0">
          <div className="mx-auto max-w-2xl">
            <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-charcoal sm:first-letter:text-7xl">
              Space is not absence. In a premium editorial interface, it is a structural material that guides rhythm, protects comprehension, and elevates every type choice into something ceremonial. The best digital stories feel edited, not merely arranged.
            </p>

            <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
              This composition keeps the reading column narrow enough to maintain a stable eye line while surrounding it with generous negative space. That margin is not wasted real estate; it is the buffer that allows Stacy’s name, work, and story to breathe with confidence.
            </p>

            <PullQuote>Editorial luxury is often less about adding more and more about removing everything that does not deserve the reader’s attention.</PullQuote>

            <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
              The hierarchy stays disciplined. Serif headlines introduce tone and elegance, while the sans-serif body copy maintains clarity over long-form content. Micro-interactions are intentionally restrained, reserved for navigational states, progress indicators, and subtle link affordances.
            </p>

            <InlineFigure />

            <section className="my-16" id="highlights">
              <div className="mb-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.35em] text-sage">Creative Portfolio</p>
                  <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em] text-charcoal sm:text-4xl">Selected work and identity mark</h2>
                </div>
                <p className="hidden max-w-xs text-sm leading-6 text-charcoal/60 sm:block">Upload files directly into the circles while keeping the editorial layout intact.</p>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                <PortfolioCircle image={heroImage} title="Hero treatment" description="Drop a new image onto this circle to replace the featured work." onUpload={handleSlotImageUpload('hero')} />
                <LogoBadge logoImageUrl={logoImageUrl} onLogoUpload={handleLogoUpload} onRemoveLogo={removeLogoImage} />
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                <PortfolioCircle image={gridLeft} title="Instagram grid left" description="Square-safe circle for the left grid slot." onUpload={handleSlotImageUpload('left')} />
                <PortfolioCircle image={gridRightTop} title="Instagram grid top" description="Square-safe circle for the top-right slot." onUpload={handleSlotImageUpload('rightTop')} />
                <PortfolioCircle image={gridRightBottom} title="Instagram grid bottom" description="Square-safe circle for the bottom-right slot." onUpload={handleSlotImageUpload('rightBottom')} />
              </div>
            </section>

            <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
              Every breakpoint preserves the same editorial logic. The hero graphic compresses gracefully, the nav remains calm and sticky, and the body content retains its cadence without collapsing into a generic blog template. That consistency is what makes the interface feel authored.
            </p>

            <p className="text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">The result is a single-page reading experience that feels premium, spatial, and precise, with a visual language that can support a designer’s article without competing with it.</p>
          </div>

          <section id="notes" className="mx-auto mt-20 max-w-2xl rounded-[1.75rem] border border-charcoal/10 bg-white/55 p-6 shadow-[0_10px_40px_rgba(26,26,26,0.04)] sm:p-8">
            <h2 className="font-serif text-2xl tracking-[-0.03em] text-charcoal">Design Notes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-charcoal/70 sm:text-base">
              <li>• The outer padding stays generous so the reading column feels curated instead of cramped.</li>
              <li>• Accent color use is intentionally limited to progress, hover states, and the single-line quote treatment.</li>
              <li>• Surfaces use soft borders and blur instead of heavy shadows to keep the page feeling airy.</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}

export default App;