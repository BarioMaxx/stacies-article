import { upload } from '@vercel/blob/client';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';

// Elegant default SVG placeholder graphics so the page looks stunning before uploads
const initialSvgAssets = {
  logo: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="24" fill="#6E7F6B"/>
      <text x="50" y="65" fill="#FBFBFA" font-size="42" font-family="Georgia, serif" font-weight="bold" text-anchor="middle">S</text>
    </svg>
  `),
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
  isOwner: boolean;
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
            <p className="text-[11px] text-zinc-400">Creative Portfolio · Published July 2026</p>
          </div>
        </div>
      </div>

      <div 
        onClick={() => { if (isOwner) heroInputRef.current?.click(); }}
        className={`relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-900 shadow-xl sm:min-h-[28rem] ${isOwner ? 'cursor-pointer group' : 'cursor-default'}`}
      >
        <img src={heroUrl} alt="Featured Portfolio Artwork" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
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
  isOwner: boolean;
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
  isOwner: boolean;
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
  isOwner: boolean;
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
        <p className="text-xs text-zinc-400 mt-0.5">Circle crop mapping module</p>
      </div>
    </div>
  );
}

export default function App() {
  const [assets, setAssets] = useState<typeof initialSvgAssets>(initialSvgAssets);
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return localStorage.getItem('stacy_admin_auth') === 'true';
  });

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const syncCloudAssets = async () => {
      try {
        const response = await fetch('/api/upload');
        if (response.ok) {
          const remoteMap = await response.json();
          setAssets(prev => ({ ...prev, ...remoteMap }));
        }
      } catch (err) {
        console.error("Unable to link global assets, using default SVGs:", err);
      }
    };
    syncCloudAssets();
  }, []);

  const updateAsset = async (slot: keyof typeof initialSvgAssets, file: File | null) => {
    if (!file) {
      setAssets(prev => ({ ...prev, [slot]: initialSvgAssets[slot] }));
      return;
    }

    try {
      const extension = file.name.split('.').pop();
      const uniqueFilename = `portfolio/${slot}-${Date.now()}.${extension}`;
      
      const targetBlob = await upload(uniqueFilename, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      
      setAssets(prev => ({ ...prev, [slot]: targetBlob.url }));
    } catch (error) {
      console.error("Vercel Storage transmission error:", error);
      alert("Failed to pipe file upload into cloud storage.");
    }
  };

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
      setAuthMessage('Access granted. Welcome back!');
    } else {
      setAuthMessage('Incorrect authorization code.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] font-sans text-zinc-800 antialiased selection:bg-[#6E7F6B]/10 selection:text-[#6E7F6B]">
      <ReadingProgressBar />
      
      <Navbar 
        logoUrl={assets.logo} 
        onLogoUpload={(e) => updateAsset('logo', e.target.files?.[0] || null)} 
        isOwner={isOwner} 
        onAdminLogin={handleAdminLogin} 
      />

      <main>
        <Hero 
          heroUrl={assets.hero} 
          avatarUrl={assets.avatar} 
          onHeroUpload={(e) => updateAsset('hero', e.target.files?.[0] || null)} 
          onAvatarUpload={(e) => updateAsset('avatar', e.target.files?.[0] || null)} 
          isOwner={isOwner} 
        />

        <article id="article" className="mx-auto max-w-3xl px-6 py-12 sm:px-12">
          <div className="prose prose-zinc lg:prose-lg text-zinc-700 leading-relaxed space-y-6">
            <p>
              Design isn't merely decoration; it is an organizational logic. When content flows into layout structures organically, the boundaries between the canvas container and the artistic composition dissolve.
            </p>
            
            <PullQuote>
              "Simplicity is not the lack of clutter, but the presence of clarity."
            </PullQuote>

            <p>
              By leveraging cloud infrastructure alongside asynchronous asset streaming, interfaces achieve continuous execution states without sacrificing typographic weight or design balance.
            </p>
          </div>

          <EditorialGridStudio assets={assets} updateAsset={updateAsset} isOwner={isOwner} />

          <section id="notes" className="my-16 border-t border-zinc-200 pt-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-6">Secondary Media Array</span>
            <div className="grid gap-8 sm:grid-cols-3">
              <CircleSlot image={assets.circle1} title="Identity Mapping" onUpload={(e) => updateAsset('circle1', e.target.files?.[0] || null)} isOwner={isOwner} />
              <CircleSlot image={assets.circle2} title="Structure & Space" onUpload={(e) => updateAsset('circle2', e.target.files?.[0] || null)} isOwner={isOwner} />
              <CircleSlot image={assets.circle3} title="Minimal Gestures" onUpload={(e) => updateAsset('circle3', e.target.files?.[0] || null)} isOwner={isOwner} />
            </div>
          </section>
        </article>
      </main>

      {/* Status Alert Overlay Toast */}
      {authMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-zinc-900 px-4 py-3 text-xs text-white shadow-xl max-w-sm animate-fade-in border border-zinc-800">
          {authMessage}
        </div>
      )}

      {/* Admin Credentials Pin Screen Overlay */}
      {showAuthDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-zinc-900">Authorize Owner Access</h3>
            <p className="mt-1 text-xs text-zinc-400">Please enter your system PIN configuration sequence to unlock editing privileges.</p>
            
            <form onSubmit={handleAuthSubmit} className="mt-4 space-y-4">
              <input 
                type="password" 
                placeholder="••••" 
                value={authPin} 
                onChange={(e) => setAuthPin(e.target.value)} 
                className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-center text-sm font-bold tracking-widest text-zinc-800 outline-none focus:border-[#6E7F6B] focus:ring-1 focus:ring-[#6E7F6B]" 
                autoFocus 
              />
              <div className="flex gap-2 justify-end text-xs font-semibold">
                <button type="button" onClick={() => setShowAuthDialog(false)} className="rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-100 transition">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-[#6E7F6B] px-4 py-2 text-white hover:bg-[#5C6B59] shadow-sm transition">
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}