import { useEffect, useState } from 'react';

const authorAvatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="60" fill="#E8E5DE"/>
      <path d="M30 78C34 67 44 60 60 60C76 60 86 67 90 78" stroke="#6E7F6B" stroke-width="4" stroke-linecap="round"/>
      <circle cx="60" cy="48" r="16" stroke="#1A1A1A" stroke-width="4"/>
    </svg>
  `);

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
      <div
        className="h-px origin-left bg-sage transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

function LogoMark() {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="Stacy Designs home">
      <svg
        className="h-16 w-16 shrink-0 drop-shadow-[0_10px_18px_rgba(26,26,26,0.18)] transition-all duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldStroke" x1="26" y1="16" x2="136" y2="144" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8E7A7" />
            <stop offset="16%" stopColor="#B88211" />
            <stop offset="38%" stopColor="#F6DD74" />
            <stop offset="62%" stopColor="#8B5A04" />
            <stop offset="100%" stopColor="#F0D26A" />
          </linearGradient>
          <linearGradient id="shadowStroke" x1="24" y1="20" x2="136" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D0D0D" />
            <stop offset="100%" stopColor="#2A2A2A" />
          </linearGradient>
          <filter id="softGlow" x="0" y="0" width="160" height="160" filterUnits="userSpaceOnUse">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#softGlow)">
          <text
            x="26"
            y="116"
            fontFamily="'Playfair Display', 'Times New Roman', serif"
            fontSize="116"
            fontWeight="700"
            fill="#121212"
            stroke="url(#goldStroke)"
            strokeWidth="4.2"
            paintOrder="stroke fill"
          >
            S
          </text>
          <text
            x="68"
            y="100"
            fontFamily="'Playfair Display', 'Times New Roman', serif"
            fontSize="118"
            fontWeight="700"
            fill="#121212"
            stroke="url(#goldStroke)"
            strokeWidth="4.2"
            paintOrder="stroke fill"
          >
            A
          </text>
          <path
            d="M22 118c22 7 50 8 94 4"
            stroke="url(#shadowStroke)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M22 116c22 7 50 8 94 4"
            stroke="url(#goldStroke)"
            strokeWidth="6.2"
            strokeLinecap="round"
            opacity="0.85"
          />
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
          <a className="transition-all duration-300 hover:text-sage" href="#article">
            Article
          </a>
          <a className="transition-all duration-300 hover:text-sage" href="#highlights">
            Highlights
          </a>
          <a className="transition-all duration-300 hover:text-sage" href="#notes">
            Notes
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 lg:py-24">
      <div className="max-w-3xl">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-sage">
          Stacy Akinyi / Design Perspective
        </p>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] text-charcoal sm:text-6xl lg:text-7xl">
          Stacy Designs: a refined visual language for modern creative work
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal/75 sm:text-lg">
          A measured interface can do more than display words. It can frame identity, present selected work, and turn a creative practice into something that feels unmistakably premium.
        </p>

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
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-white/25 sm:left-8 sm:top-8 sm:h-32 sm:w-32" />
        <div className="absolute bottom-8 left-8 right-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">Creative direction / hero treatment</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
              A premium space reserved for Stacy’s signature imagery, posters, styling studies, or campaign visuals.
            </p>
          </div>
          <div className="h-20 w-20 justify-self-end rounded-full border border-white/25 bg-white/10 backdrop-blur-sm sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-14 flex gap-5 border-y border-charcoal/10 py-8 sm:py-10">
      <span className="w-px shrink-0 bg-sage" aria-hidden="true" />
      <p className="font-serif text-2xl italic leading-tight tracking-[-0.03em] text-charcoal sm:text-3xl">
        {children}
      </p>
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
      <figcaption className="px-6 py-4 text-center text-sm italic text-charcoal/60 sm:px-8">
        This section is ready for Stacy’s real post imagery once the selected Instagram assets are shared.
      </figcaption>
    </figure>
  );
}

function WorkCard({ title, label, caption }: { title: string; label: string; caption: string }) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-charcoal/10 bg-white/65 shadow-[0_14px_45px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(26,26,26,0.08)]">
      <div className="relative aspect-[4/5] bg-[linear-gradient(160deg,rgba(26,26,26,0.92),rgba(110,127,107,0.55))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_18%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/70">
          {label}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="h-px w-16 bg-white/40 transition-all duration-300 group-hover:w-24" />
        </div>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-serif text-xl tracking-[-0.03em] text-charcoal">{title}</h3>
        <p className="text-sm leading-6 text-charcoal/65">{caption}</p>
      </div>
    </article>
  );
}

function ArticleBody() {
  return (
    <article id="article" className="mx-auto max-w-3xl px-5 pb-24 sm:px-8 lg:px-0">
      <div className="mx-auto max-w-2xl">
        <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-charcoal sm:first-letter:text-7xl">
          Space is not absence. In a premium editorial interface, it is a structural material that guides rhythm, protects comprehension, and elevates every type choice into something ceremonial. The best digital stories feel edited, not merely arranged.
        </p>

        <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
          This composition keeps the reading column narrow enough to maintain a stable eye line while surrounding it with generous negative space. That margin is not wasted real estate; it is the buffer that allows Stacy’s name, work, and story to breathe with confidence.
        </p>

        <PullQuote>
          Editorial luxury is often less about adding more and more about removing everything that does not deserve the reader’s attention.
        </PullQuote>

        <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
          The hierarchy stays disciplined. Serif headlines introduce tone and elegance, while the sans-serif body copy maintains clarity over long-form content. Micro-interactions are intentionally restrained, reserved for navigational states, progress indicators, and subtle link affordances.
        </p>

        <InlineFigure />

        <section className="my-16">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-sage">Selected Work</p>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em] text-charcoal sm:text-4xl">
                A showcase layout for Stacy’s visuals
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-6 text-charcoal/60 sm:block">
              Share her actual Instagram images and these tiles can be replaced with the real posts immediately.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <WorkCard
              label="Editorial"
              title="Quiet luxury portrait study"
              caption="A refined composition slot for portrait-led creative work, fashion references, or branding imagery."
            />
            <WorkCard
              label="Concept"
              title="Typography and visual rhythm"
              caption="A clean card for graphic systems, type-driven posts, or high-contrast design experiments."
            />
            <WorkCard
              label="Studio"
              title="Mood-led campaign frame"
              caption="A premium landing spot for campaign stills, product details, or atmospheric social content."
            />
          </div>
        </section>

        <p className="mb-8 text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
          Every breakpoint preserves the same editorial logic. The hero graphic compresses gracefully, the nav remains calm and sticky, and the body content retains its cadence without collapsing into a generic blog template. That consistency is what makes the interface feel authored.
        </p>

        <p id="highlights" className="text-base leading-8 text-charcoal/80 sm:text-lg sm:leading-9">
          The result is a single-page reading experience that feels premium, spatial, and precise, with a visual language that can support a designer’s article without competing with it.
        </p>
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
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream font-sans text-charcoal">
      <ReadingProgressBar />
      <Navbar />
      <main>
        <Hero />
        <ArticleBody />
      </main>
    </div>
  );
}