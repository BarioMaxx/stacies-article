import { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';

// Elegant default SVG placeholder graphics so the page looks stunning before uploads
const initialSvgAssets = {
  hero: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" rx="42" fill="#1A1A1A"/>
      <rect x="64" y="64" width="672" height="872" rx="38" fill="#5F665C"/>
      <circle cx="238" cy="282" r="140" fill="#FBFBFA" fill-opacity="0.16"/>
      <rect x="176" y="556" width="448" height="36" rx="18" fill="#FBFBFA" fill-opacity="0.54"/>
      <text x="176" y="744" fill="#FBFBFA" font-size="74" font-family="Arial, sans-serif" font-weight="700">Stacy</text>
    </svg>
  `),
  left: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">
      <rect width="600" height="800" rx="32" fill="#F5F2EB"/>
      <rect x="60" y="80" width="480" height="320" rx="20" fill="#1A1A1A"/>
      <text x="80" y="460" fill="#1A1A1A" font-size="38" font-family="Georgia, serif" font-weight="700">Brand Studies</text>
    </svg>
  `),
  rightTop: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
      <rect width="600" height="300" rx="24" fill="#6E7F6B" fill-opacity="0.15"/>
      <path d="M50 200C150 100 250 50 400 150" stroke="#6E7F6B" stroke-width="12" fill="none" stroke-linecap="round"/>
    </svg>
  `),
  rightBottom: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
      <rect width="600" height="400" rx="24" fill="#EAE6DF"/>
      <circle cx="450" cy="150" r="60" fill="#1A1A1A" fill-opacity="0.1"/>
    </svg>
  `),
  avatar: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="60" fill="#E8E5DE"/>
      <circle cx="60" cy="48" r="16" stroke="#1A1A1A" stroke-width="4"/>
      <path d="M30 82C35 70 45 62 60 62C75 62 85 70 90 82" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `),
  circle1: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="180" fill="#E3DFD5"/></svg>
  `),
  circle2: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="180" fill="#D6D1C4"/></svg>
  `),
  circle3: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="180" fill="#C9C3B3"/></svg>
  `),
};

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-zinc-200">
      <div className="h-full bg-[#6E7F6B] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

// UPGRADED FOR PERMISSIONS: Pass isOwner and onAdminLogin down to Navbar
function Navbar({ 
  logoUrl, 
  onLogoUpload, 
  isOwner, 
  onAdminLogin 
}: { 
  logoUrl: string | null; 
  onLogoUpload: (e: ChangeEvent<HTMLInputElement>) => void; 
  isOwner: boolean; 
  onAdminLogin: () => void 
}) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/50 bg-[#FBFBFA]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => { if (isOwner) logoInputRef.current?.click(); }}
            className={`h-10 w-10 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100 flex items-center justify-center relative ${isOwner ? 'cursor-pointer hover:border-[#6E7F6B] transition group' : 'cursor-default'}`}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-serif font-bold text-zinc-400">S</span>
            )}
            {isOwner && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[10px] text-white font-medium">Edit</div>
            )}
          </div>
          <input ref={logoInputRef} type="file" accept="image/*" className="sr-only" onChange={onLogoUpload} />
          
          {/* Secret Trigger: Clicking "Stacy Designs" opens the PIN login screen */}
          <span 
            onClick={onAdminLogin}
            className="font-serif text-sm font-semibold tracking-tight text-zinc-800 cursor-pointer select-none relative group"
            title="Click to toggle Admin Mode"
          >
            Stacy Designs
            {isOwner && (
              <span className="ml-2 rounded bg-[#6E7F6B] px-1.5 py-0.5 text-[9px] text-white uppercase font-sans font-bold tracking-wider">Owner Mode</span>
            )}
          </span>
        </div>
        
        <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-zinc-400 md:flex">
          <a className="text-zinc-900 transition hover:text-[#6E7F6B]" href="#article">Article</a>
          <a className="transition hover:text-[#6E7F6B]" href="#grid-editor">Layout Studio</a>
          <a className="transition hover:text-[#6E7F6B]" href="#notes">Design Notes</a>
        </div>
      </nav>
    </header>
  );
}

interface HeroProps {
  heroUrl: string;
  avatarUrl: string;
  onHeroUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner: boolean; // UPGRADED FOR PERMISSIONS
}

function Hero({ heroUrl, avatarUrl, onHeroUpload, onAvatarUpload, isOwner }: HeroProps) {
  const heroInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="max-w-2xl justify-center flex flex-col">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#6E7F6B]">Stacy Akinyi / Design Perspective</p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
          Stacy Designs: a refined visual language for modern creative work
        </h1>
        <p className="mt-6 text-base leading-8 text-zinc-600 sm:text-lg">
          A measured interface can do more than display words. It can frame identity, present selected work, and turn a creative practice into something that feels unmistakably premium.
        </p>

        {/* Interactive Avatar Container */}
        <div className="mt-8 inline-flex items-center gap-4 self-start rounded-full border border-zinc-200 bg-white/80 p-2 pr-6 shadow-sm backdrop-blur-sm">
          <div 
            onClick={() => { if (isOwner) avatarInputRef.current?.click(); }}
            className={`relative h-12 w-12 overflow-hidden rounded-full border border-zinc-300 bg-zinc-100 shadow-inner ${isOwner ? 'cursor-pointer group' : 'cursor-default'}`}
          >
            <img src={avatarUrl} alt="Stacy" className="h-full w-full object-cover" />
            {isOwner && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[9px] text-white font-bold uppercase tracking-wider">Swap</div>
            )}
          </div>
          <input ref={avatarInputRef} type="file" accept="image/*" className="sr-only" onChange={onAvatarUpload} />
          <div>
            <p className="text-xs font-bold text-zinc-800">Stacy Akinyi</p>
            <p className="text-[11px] text-zinc-400">Creative Portfolio · Published July 6, 2026</p>
          </div>
        </div>
      </div>

      {/* Hero Canvas Artwork Target */}
      <div 
        onClick={() => { if (isOwner) heroInputRef.current?.click(); }}
        className={`relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-900 shadow-xl sm:min-h-[28rem] ${isOwner ? 'cursor-pointer group' : 'cursor-default'}`}
      >
        <img src={heroUrl} alt="Featured Portfolio Artwork" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Only show editing controls if user is the Owner */}
        {isOwner ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 text-white">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Hero Treatment</p>
                <p className="mt-1 max-w-xs text-xs text-zinc-300 leading-relaxed">
                  Click anywhere on this canvas splash container to swap out your signature campaign banner.
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-zinc-900 transition duration-300">
                Change Cover Art
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40" />
        )}
        <input ref={heroInputRef} type="file" accept="image/*" className="sr-only" onChange={onHeroUpload} />
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 flex gap-6 border-y border-zinc-200 py-8">
      <span className="w-1 shrink-0 bg-[#6E7F6B] rounded-full" />
      <p className="font-serif text-xl italic leading-relaxed text-zinc-800 sm:text-2xl">{children}</p>
    </blockquote>
  );
}

interface GridSlotProps {
  image: string;
  label: string;
  aspectClass: string;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isOwner: boolean; // UPGRADED FOR PERMISSIONS
}

function GridSlot({ image, label, aspectClass, onUpload, onClear, isOwner }: GridSlotProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPlaceholder = image.startsWith('data:image/svg+xml');

  return (
    <div 
      onClick={() => { if (isOwner) fileInputRef.current?.click(); }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 shadow-sm transition-all duration-300 hover:shadow-md ${aspectClass} ${isOwner ? 'cursor-pointer group' : 'cursor-default'}`}
    >
      <img src={image} alt={label} className={`h-full w-full ${isPlaceholder ? 'object-contain p-6 opacity-60' : 'object-cover'} transition-transform duration-500 group-hover:scale-[1.02]`} />
      
      {/* Only show edit hover layer and buttons if user is the Owner */}
      {isOwner && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/90 bg-black/30 px-2 py-0.5 rounded self-start backdrop-blur-xs">
            {label}
          </span>
          <div className="flex gap-2 self-end">
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm transition transform hover:scale-105"
            >
              Swap File
            </button>
            {!isPlaceholder && (
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); onClear(); }}
                className="rounded-lg bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition transform hover:scale-105"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={onUpload} />
    </div>
  );
}

interface EditorialGridStudioProps {
  assets: typeof initialSvgAssets;
  updateAsset: (slot: keyof typeof initialSvgAssets, file: File | null) => void;
  isOwner: boolean; // UPGRADED FOR PERMISSIONS
}

function EditorialGridStudio({ assets, updateAsset, isOwner }: EditorialGridStudioProps) {
  return (
    <section id="grid-editor" className="my-16 rounded-[2rem] border border-zinc-200 bg-[#EFECE6]/50 p-6 sm:p-10 shadow-inner">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6E7F6B]">Asymmetric Grid Engine</span>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Live Grid Portfolio Mapper</h2>
        </div>
        {isOwner && (
          <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
            Hover over any asset placeholder module inside the asymmetric tree grid below to dynamically update or clear custom images.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
        <GridSlot 
          image={assets.left} 
          label="Feature Left Column" 
          aspectClass="h-64 sm:h-[26rem]" 
          onUpload={(e) => updateAsset('left', e.target.files?.[0] || null)}
          onClear={() => updateAsset('left', null)}
          isOwner={isOwner}
        />
        
        <div className="grid gap-4">
          <GridSlot 
            image={assets.rightTop} 
            label="Top Panel" 
            aspectClass="h-32 sm:h-[12rem]" 
            onUpload={(e) => updateAsset('rightTop', e.target.files?.[0] || null)}
            onClear={() => updateAsset('rightTop', null)}
            isOwner={isOwner}
          />
          <GridSlot 
            image={assets.rightBottom} 
            label="Bottom Card Structure" 
            aspectClass="h-44 sm:h-[13rem]" 
            onUpload={(e) => updateAsset('rightBottom', e.target.files?.[0] || null)}
            onClear={() => updateAsset('rightBottom', null)}
            isOwner={isOwner}
          />
        </div>
      </div>
    </section>
  );
}

interface CircleSlotProps {
  image: string;
  title: string;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner: boolean; // UPGRADED FOR PERMISSIONS
}

function CircleSlot({ image, title, onUpload, isOwner }: CircleSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isPlaceholder = image.startsWith('data:image/svg+xml');

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div 
        onClick={() => { if (isOwner) inputRef.current?.click(); }}
        className={`relative aspect-square w-full max-w-[14rem] overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm transition ${isOwner ? 'cursor-pointer group hover:border-[#6E7F6B] hover:shadow-md' : 'cursor-default'}`}
      >
        <img src={image} alt={title} className={`h-full w-full rounded-full ${isPlaceholder ? 'p-4' : 'object-cover'}`} />
        {isOwner && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-full">
            <span className="text-xs text-white font-medium tracking-wide">Upload Image</span>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={onUpload} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-zinc-800">{title}</h4>
        <p className="text-xs text-zinc-400 mt-0.5">Circle crop mapping fallback module</p>
      </div>
    </div>
  );
}

export default function App() {
  // 1. Core State: Loads edited assets out of device browser memory
  const [assets, setAssets] = useState<typeof initialSvgAssets>(() => {
    const saved = localStorage.getItem('stacy_portfolio_assets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialSvgAssets;
  });

  // 2. Permissions State: Defaults to false (client mode). Saved to local storage once unlocked.
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return localStorage.getItem('stacy_admin_auth') === 'true';
  });

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  // Keep the page anchored at the top when the app loads.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Auto-sync image changes into local storage
  useEffect(() => {
    localStorage.setItem('stacy_portfolio_assets', JSON.stringify(assets));
  }, [assets]);

  // Handle PIN authentication logic
  const handleAdminLogin = () => {
    if (isOwner) {
      localStorage.removeItem('stacy_admin_auth');
      setIsOwner(false);
      setShowAuthDialog(false);
      setAuthPin('');
      setAuthMessage('Logged out of Owner Mode. Viewing site as a client.');
    } else {
      setAuthMessage('');
      setShowAuthDialog(true);
    }
  };

  const handleAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authPin === '2026') {
      localStorage.setItem('stacy_admin_auth', 'true');
      setIsOwner(true);
      setShowAuthDialog(false);
      setAuthPin('');
      setAuthMessage('Access granted. Welcome back, Stacy!');
    } else {
      setAuthMessage('Incorrect authorization code.');
    }
  };

  // Convert uploaded assets to permanent Base64 strings
  const updateAsset = (slot: keyof typeof initialSvgAssets, file: File | null) => {
    if (!file) {
      setAssets(prev => ({ ...prev, [slot]: initialSvgAssets[slot] }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAssets(prev => ({ ...prev, [slot]: base64String }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] font-sans text-zinc-800 antialiased selection:bg-[#6E7F6B]/10 selection:text-[#6E7F6B]">
      <ReadingProgressBar />
      
      {/* Navbar with active permission hooks */}
      <Navbar 
        logoUrl={assets.circle1.startsWith('data:image/svg+xml') ? null : assets.circle1} 
        onLogoUpload={(e) => updateAsset('circle1', e.target.files?.[0] || null)} 
        isOwner={isOwner}
        onAdminLogin={handleAdminLogin}
      />

      {showAuthDialog && !isOwner && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-6 pt-24 backdrop-blur-[2px]">
          <form
            onSubmit={handleAuthSubmit}
            className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-[#FBFBFA] p-6 shadow-xl"
          >
            <h2 className="font-serif text-xl font-bold tracking-tight text-zinc-900">Owner Access</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Enter the editing PIN to unlock image uploads.
            </p>
            <input
              autoFocus
              type="password"
              value={authPin}
              onChange={(event) => setAuthPin(event.target.value)}
              className="mt-4 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#6E7F6B]"
              placeholder="PIN"
            />
            {authMessage && (
              <p className="mt-3 text-sm text-zinc-500">{authMessage}</p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAuthDialog(false)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#6E7F6B] px-4 py-2 text-sm font-medium text-white"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      )}
      
      <main>
        <Hero 
          heroUrl={assets.hero} 
          avatarUrl={assets.avatar} 
          onHeroUpload={(e) => updateAsset('hero', e.target.files?.[0] || null)}
          onAvatarUpload={(e) => updateAsset('avatar', e.target.files?.[0] || null)}
          isOwner={isOwner}
        />

        <article id="article" className="mx-auto max-w-3xl px-6 pb-24">
          <div className="prose prose-zinc mx-auto max-w-2xl">
            <p className="mb-8 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-zinc-900 sm:first-letter:text-7xl">
              Space is not absence. In a premium editorial interface, it is a structural material that guides rhythm, protects comprehension, and elevates every type choice into something ceremonial. The best digital stories feel edited, not merely arranged.
            </p>

            <p className="mb-8 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
              This composition keeps the reading column narrow enough to maintain a stable eye line while surrounding it with generous negative space. That margin is not wasted real estate; it is the buffer that allows Stacy’s name, work, and story to breathe with confidence.
            </p>

            <PullQuote>
              Editorial luxury is often less about adding more and more about removing everything that does not deserve the reader’s attention.
            </PullQuote>

            <p className="mb-8 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
              The hierarchy stays disciplined. Serif headlines introduce tone and elegance, while the sans-serif body copy maintains clarity over long-form content. Micro-interactions are intentionally restrained, reserved for navigational states, progress indicators, and subtle link affordances.
            </p>

            {/* Asymmetric Studio with layout blocking control */}
            <EditorialGridStudio assets={assets} updateAsset={updateAsset} isOwner={isOwner} />

            <p className="mb-8 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
              Every breakpoint preserves the same editorial logic. The hero graphic compresses gracefully, the nav remains calm and sticky, and the body content retains its cadence without collapsing into a generic blog template. That consistency is what makes the interface feel authored.
            </p>

            <p className="mb-16 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
              The result is a single-page reading experience that feels premium, spatial, and precise, with a visual language that can support a designer’s article without competing with it.
            </p>

            {/* Accent Profile Submodules */}
            <section className="border-t border-zinc-200 pt-12">
              <h3 className="font-serif text-xl font-bold mb-6 text-zinc-900">Alternative Profile Accents</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <CircleSlot image={assets.circle1} title="Accent Target Alpha" onUpload={(e) => updateAsset('circle1', e.target.files?.[0] || null)} isOwner={isOwner} />
                <CircleSlot image={assets.circle2} title="Accent Target Beta" onUpload={(e) => updateAsset('circle2', e.target.files?.[0] || null)} isOwner={isOwner} />
                <CircleSlot image={assets.circle3} title="Accent Target Gamma" onUpload={(e) => updateAsset('circle3', e.target.files?.[0] || null)} isOwner={isOwner} />
              </div>
            </section>
          </div>

          <section id="notes" className="mx-auto mt-20 max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-zinc-900 tracking-tight">Design Notes</h2>
            <ul className="mt-4 space-y-3 text-xs leading-6 text-zinc-500 sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#6E7F6B] font-bold">•</span>
                The outer padding stays generous so the reading column feels curated instead of cramped.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6E7F6B] font-bold">•</span>
                Accent color use is intentionally limited to progress, hover states, and the single-line quote treatment.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6E7F6B] font-bold">•</span>
                Surfaces use soft borders and blur instead of heavy shadows to keep the page feeling airy.
              </li>
            </ul>
          </section>

        </article>
      </main>
    </div>
  );
}