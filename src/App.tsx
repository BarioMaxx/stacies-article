import { ChangeEvent, ReactNode, useMemo, useState, useEffect } from 'react';

type ImageAsset = {
  id: string;
  url: string;
  alt: string;
  timestamp: string;
};

type GridPosition = 'left' | 'rightTop' | 'rightBottom';

type ModalState =
  | { type: 'hero' }
  | { type: 'grid'; position: GridPosition }
  | { type: 'alt'; imageId: string }
  | null;

const sampleAssets: ImageAsset[] = [
  {
    id: 'asset-1',
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#1A1A1A" />
              <stop offset="55%" stop-color="#5F665C" />
              <stop offset="100%" stop-color="#FBFBFA" />
            </linearGradient>
          </defs>
          <rect width="800" height="1000" rx="42" fill="#FBFBFA" />
          <rect x="58" y="58" width="684" height="884" rx="36" fill="url(#g1)" />
          <circle cx="246" cy="286" r="140" fill="#FBFBFA" fill-opacity="0.18" />
          <rect x="184" y="554" width="432" height="34" rx="17" fill="#FBFBFA" fill-opacity="0.55" />
          <rect x="184" y="612" width="278" height="22" rx="11" fill="#FBFBFA" fill-opacity="0.42" />
          <text x="184" y="736" fill="#FBFBFA" font-size="72" font-family="Inter, Arial, sans-serif" font-weight="700">Stacy</text>
          <text x="184" y="800" fill="#FBFBFA" fill-opacity="0.8" font-size="28" font-family="Inter, Arial, sans-serif">Creative direction</text>
        </svg>
      `),
    alt: 'Editorial poster composition with a dark gradient and typography.',
    timestamp: '2026-07-03 08:10',
  },
  {
    id: 'asset-2',
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
          <rect width="800" height="1000" rx="42" fill="#F5F2EB" />
          <circle cx="614" cy="250" r="174" fill="#6E7F6B" fill-opacity="0.18" />
          <circle cx="240" cy="718" r="188" fill="#1A1A1A" fill-opacity="0.08" />
          <rect x="112" y="150" width="220" height="22" rx="11" fill="#1A1A1A" fill-opacity="0.55" />
          <rect x="112" y="192" width="360" height="16" rx="8" fill="#1A1A1A" fill-opacity="0.2" />
          <rect x="112" y="236" width="576" height="420" rx="28" fill="#1A1A1A" fill-opacity="0.9" />
          <rect x="164" y="286" width="468" height="10" rx="5" fill="#FBFBFA" fill-opacity="0.5" />
          <rect x="164" y="318" width="336" height="10" rx="5" fill="#FBFBFA" fill-opacity="0.35" />
          <text x="164" y="484" fill="#FBFBFA" font-size="58" font-family="Playfair Display, Georgia, serif" font-weight="700">Brand studies</text>
          <text x="164" y="548" fill="#FBFBFA" fill-opacity="0.78" font-size="26" font-family="Inter, Arial, sans-serif">Poster layout / visual rhythm</text>
        </svg>
      `),
    alt: 'Brand study with typography over a dark editorial panel.',
    timestamp: '2026-07-03 09:15',
  },
  {
    id: 'asset-3',
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
          <rect width="800" height="1000" rx="42" fill="#FBFBFA" />
          <rect x="94" y="94" width="612" height="812" rx="38" fill="#1A1A1A" fill-opacity="0.94" />
          <path d="M140 766C234 600 326 560 420 394c58-102 126-168 226-244" stroke="#F0D36D" stroke-width="28" stroke-linecap="round" fill="none" />
          <path d="M186 782c84-144 166-228 274-362 78-96 130-154 192-224" stroke="#FBFBFA" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.7" />
          <circle cx="540" cy="302" r="94" fill="#FBFBFA" fill-opacity="0.08" />
          <text x="150" y="218" fill="#FBFBFA" font-size="54" font-family="Inter, Arial, sans-serif" font-weight="700">Layout</text>
          <text x="150" y="272" fill="#FBFBFA" fill-opacity="0.72" font-size="24" font-family="Inter, Arial, sans-serif">clean grid / premium spacing</text>
        </svg>
      `),
    alt: 'Dark layout sketch with a gold sweeping line and clean spacing.',
    timestamp: '2026-07-03 10:05',
  },
  {
    id: 'asset-4',
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
          <rect width="800" height="1000" rx="42" fill="#F8F6F1" />
          <rect x="72" y="72" width="656" height="856" rx="34" fill="#E7E0D0" />
          <rect x="138" y="140" width="524" height="56" rx="28" fill="#1A1A1A" fill-opacity="0.9" />
          <rect x="138" y="226" width="360" height="18" rx="9" fill="#1A1A1A" fill-opacity="0.35" />
          <rect x="138" y="276" width="524" height="472" rx="26" fill="#FBFBFA" />
          <circle cx="286" cy="472" r="112" fill="#6E7F6B" fill-opacity="0.3" />
          <circle cx="512" cy="584" r="156" fill="#1A1A1A" fill-opacity="0.1" />
          <text x="168" y="834" fill="#1A1A1A" font-size="42" font-family="Inter, Arial, sans-serif" font-weight="700">Portfolio cover</text>
        </svg>
      `),
    alt: 'Minimal cover composition with soft tones and editorial shapes.',
    timestamp: '2026-07-03 11:20',
  },
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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function ModalShell({ children, title, onClose }: { children: ReactNode; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/55 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-cream shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4 sm:px-6">
          <h3 className="font-serif text-2xl tracking-[-0.03em] text-charcoal">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-full border border-charcoal/10 px-3 py-1.5 text-sm text-charcoal transition-all duration-300 hover:border-sage hover:text-sage">
            Close
          </button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function GridSlot({
  title,
  image,
  onSwap,
  compact = false,
}: {
  title: string;
  image: ImageAsset;
  onSwap: () => void;
  compact?: boolean;
}) {
  return (
    <article className={cn('relative overflow-hidden rounded-[1.6rem] border border-charcoal/10 bg-cream shadow-[0_16px_44px_rgba(26,26,26,0.07)]', compact ? 'aspect-[4/3]' : 'aspect-[4/5]')}>
      <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-charcoal/0 to-charcoal/0" />
      <button type="button" onClick={onSwap} className="absolute right-4 top-4 rounded-full border border-white/15 bg-charcoal/55 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cream backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/75">
        Swap Image
      </button>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-cream">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cream/70">{title}</p>
          <p className="mt-1 text-sm leading-5 text-cream/85">{image.alt}</p>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream/75">Mapped</div>
      </div>
    </article>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-charcoal/10 bg-cream px-4 py-3">
      <dt className="text-[11px] uppercase tracking-[0.25em] text-charcoal/45">{label}</dt>
      <dd className="mt-1 text-base font-medium text-charcoal">{value}</dd>
    </div>
  );
}

function App() {
  const [images, setImages] = useState<ImageAsset[]>(sampleAssets);
  const [heroImageId, setHeroImageId] = useState<string>(sampleAssets[0].id);
  const [gridAssignments, setGridAssignments] = useState<Record<GridPosition, string>>({
    left: sampleAssets[1].id,
    rightTop: sampleAssets[2].id,
    rightBottom: sampleAssets[3].id,
  });
  const [activeTab, setActiveTab] = useState<'asset-library' | 'layout-editor'>('asset-library');
  const [modal, setModal] = useState<ModalState>(null);
  const [altDraft, setAltDraft] = useState('');
  const [selectedAltImageId, setSelectedAltImageId] = useState<string | null>(null);
  const [isDraggingOverDropzone, setIsDraggingOverDropzone] = useState(false);

  const imageMap = useMemo(() => new Map(images.map((image) => [image.id, image])), [images]);
  const heroImage = imageMap.get(heroImageId) ?? images[0] ?? sampleAssets[0];
  const resolvedGrid = {
    left: imageMap.get(gridAssignments.left) ?? images[0] ?? sampleAssets[0],
    rightTop: imageMap.get(gridAssignments.rightTop) ?? images[0] ?? sampleAssets[0],
    rightBottom: imageMap.get(gridAssignments.rightBottom) ?? images[0] ?? sampleAssets[0],
  };

  // Handles image uploads from the library panel and pushes the new asset into the single images array.
  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const nextImage: ImageAsset = {
        id: `asset-${Date.now()}`,
        url: typeof reader.result === 'string' ? reader.result : sampleAssets[0].url,
        alt: file.name.replace(/\.[^.]+$/, '') || 'Uploaded portfolio asset',
        timestamp: new Date().toLocaleString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setImages((current) => [nextImage, ...current]);
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  // Accepts dropped files in the same way as the file picker so the asset library feels native and fast.
  const handleDropImages = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOverDropzone(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const nextImage: ImageAsset = {
        id: `asset-${Date.now()}`,
        url: typeof reader.result === 'string' ? reader.result : sampleAssets[0].url,
        alt: file.name.replace(/\.[^.]+$/, '') || 'Dropped portfolio asset',
        timestamp: new Date().toLocaleString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setImages((current) => [nextImage, ...current]);
    };
    reader.readAsDataURL(file);
  };

  // Filters out an asset and also clears any layout assignment that points to it.
  const handleDeleteImage = (imageId: string) => {
    setImages((current) => {
      const nextImages = current.filter((image) => image.id !== imageId);
      const fallbackId = nextImages[0]?.id ?? '';

      setHeroImageId((currentHero) => (currentHero === imageId ? fallbackId : currentHero));
      setGridAssignments((currentAssignments) => ({
        left: currentAssignments.left === imageId ? fallbackId : currentAssignments.left,
        rightTop: currentAssignments.rightTop === imageId ? fallbackId : currentAssignments.rightTop,
        rightBottom: currentAssignments.rightBottom === imageId ? fallbackId : currentAssignments.rightBottom,
      }));

      return nextImages;
    });
  };

  // Opens the inline alt-text editor and preloads the current copy into the draft field.
  const openAltEditor = (imageId: string) => {
    const target = imageMap.get(imageId);
    if (!target) {
      return;
    }
    setSelectedAltImageId(imageId);
    setAltDraft(target.alt);
    setModal({ type: 'alt', imageId });
  };

  // Persists the alt-text change for the selected asset without disturbing the rest of the library state.
  const saveAltText = () => {
    if (!selectedAltImageId) {
      return;
    }

    setImages((current) => current.map((image) => (image.id === selectedAltImageId ? { ...image, alt: altDraft.trim() || image.alt } : image)));
    setSelectedAltImageId(null);
    setModal(null);
  };

  // Assigns a chosen asset to the hero slot and closes the picker immediately after selection.
  const assignHeroImage = (imageId: string) => {
    setHeroImageId(imageId);
    setModal(null);
  };

  // Assigns a chosen asset to one of the three Instagram grid positions.
  const assignGridImage = (position: GridPosition, imageId: string) => {
    setGridAssignments((current) => ({ ...current, [position]: imageId }));
    setModal(null);
  };

  const renderLibraryPicker = () => (
    <ModalShell title={modal?.type === 'hero' ? 'Assign Hero Image' : 'Swap Grid Image'} onClose={() => setModal(null)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => {
              if (modal?.type === 'hero') {
                assignHeroImage(image.id);
                return;
              }

              if (modal?.type === 'grid') {
                assignGridImage(modal.position, image.id);
              }
            }}
            className="group overflow-hidden rounded-[1.25rem] border border-charcoal/10 bg-white text-left shadow-[0_12px_30px_rgba(26,26,26,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(26,26,26,0.1)]"
          >
            <div className="aspect-square overflow-hidden bg-charcoal/5">
              <img src={image.url} alt={image.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="space-y-1 p-4">
              <p className="text-sm font-medium text-charcoal">{image.alt}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal/45">{image.timestamp}</p>
            </div>
          </button>
        ))}
      </div>
    </ModalShell>
  );

  const renderAltEditor = () => (
    <ModalShell title="Edit Alt Text" onClose={() => setModal(null)}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-charcoal">Alt text</span>
        <textarea
          value={altDraft}
          onChange={(event) => setAltDraft(event.target.value)}
          rows={4}
          className="w-full rounded-[1rem] border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      </label>
      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={() => setModal(null)} className="rounded-full border border-charcoal/10 px-4 py-2 text-sm text-charcoal transition-all duration-300 hover:border-sage hover:text-sage">
          Cancel
        </button>
        <button type="button" onClick={saveAltText} className="rounded-full bg-charcoal px-4 py-2 text-sm text-cream transition-all duration-300 hover:bg-charcoal/90">
          Save alt text
        </button>
      </div>
    </ModalShell>
  );

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal">
      <ReadingProgressBar />

      <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-cream/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sage">Designer CMS</p>
            <h1 className="mt-1 font-serif text-2xl tracking-[-0.03em]">Stacy Designs Dashboard</h1>
          </div>
          <div className="rounded-full border border-charcoal/10 bg-white p-1 shadow-[0_10px_28px_rgba(26,26,26,0.05)]">
            <button
              type="button"
              onClick={() => setActiveTab('asset-library')}
              className={cn('rounded-full px-4 py-2 text-sm transition-all duration-300', activeTab === 'asset-library' ? 'bg-charcoal text-cream' : 'text-charcoal/70 hover:text-charcoal')}
            >
              Asset Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('layout-editor')}
              className={cn('rounded-full px-4 py-2 text-sm transition-all duration-300', activeTab === 'layout-editor' ? 'bg-charcoal text-cream' : 'text-charcoal/70 hover:text-charcoal')}
            >
              Layout Editor
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-charcoal/10 bg-white/80 p-6 shadow-[0_16px_44px_rgba(26,26,26,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sage">Visual CMS</p>
                <h2 className="mt-2 font-serif text-4xl tracking-[-0.04em] text-charcoal sm:text-5xl">A premium editorial control surface for portfolio assets</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/70 sm:text-base">
                  Manage the image library, assign visuals to the hero treatment, and map assets into a live Instagram grid without leaving the interface.
                </p>
              </div>
              <div className="rounded-full border border-charcoal/10 bg-cream px-4 py-2 text-xs uppercase tracking-[0.3em] text-charcoal/55">{images.length} assets</div>
            </div>

            {activeTab === 'asset-library' ? (
              <section className="mt-8 space-y-6">
                <div
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDraggingOverDropzone(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDraggingOverDropzone(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setIsDraggingOverDropzone(false);
                  }}
                  onDrop={handleDropImages}
                  className={cn(
                    'rounded-[1.75rem] border-2 border-dashed bg-[linear-gradient(180deg,rgba(251,251,250,0.95),rgba(239,236,230,0.85))] p-6 transition-all duration-300',
                    isDraggingOverDropzone ? 'border-sage bg-[linear-gradient(180deg,rgba(251,251,250,1),rgba(232,238,229,1))]' : 'border-charcoal/15 hover:border-sage/45 hover:bg-[linear-gradient(180deg,rgba(251,251,250,1),rgba(239,236,230,1))]',
                  )}
                >
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/10 bg-white text-2xl text-sage">+</div>
                    <div>
                      <p className="font-medium text-charcoal">Drag and drop an image here</p>
                      <p className="mt-1 text-sm text-charcoal/55">or click to upload into the asset library</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleUploadImage} className="sr-only" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {images.map((image) => (
                    <article key={image.id} className="group overflow-hidden rounded-[1.35rem] border border-charcoal/10 bg-white shadow-[0_10px_30px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,26,26,0.09)]">
                      <div className="relative aspect-square overflow-hidden bg-charcoal/5">
                        <img src={image.url} alt={image.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-charcoal/55 p-3 text-xs text-cream transition-transform duration-300 group-hover:translate-y-0">
                          <button type="button" onClick={() => openAltEditor(image.id)} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 transition-all duration-300 hover:bg-white/20">
                            Edit Alt Text
                          </button>
                          <button type="button" onClick={() => handleDeleteImage(image.id)} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 transition-all duration-300 hover:bg-white/20">
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 p-3">
                        <p className="text-sm font-medium text-charcoal line-clamp-1">{image.alt}</p>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45">{image.timestamp}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : (
              <section className="mt-8 space-y-8">
                <div className="rounded-[1.8rem] border border-charcoal/10 bg-[linear-gradient(135deg,#1A1A1A_0%,#3a3a38_48%,#5f665c_100%)] p-6 text-cream shadow-[0_16px_44px_rgba(26,26,26,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-cream/60">Hero Treatment</p>
                      <h3 className="mt-2 font-serif text-3xl tracking-[-0.03em]">Stacy Akinyi</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-cream/75 sm:text-base">{heroImage.alt}</p>
                    </div>
                    <button type="button" onClick={() => setModal({ type: 'hero' })} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm transition-all duration-300 hover:bg-white/18">
                      Assign Hero Image
                    </button>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                      <img src={heroImage.url} alt={heroImage.alt} className="aspect-[16/9] w-full rounded-[1rem] object-cover" />
                    </div>
                    <div className="rounded-full border border-white/12 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-cream/70">Hero image active</div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-charcoal/10 bg-white p-6 shadow-[0_16px_44px_rgba(26,26,26,0.08)]">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-sage">Instagram Grid</p>
                      <h3 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-charcoal">Three-slot editorial layout</h3>
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-charcoal/60">Each slot can swap directly from the asset library with a single click.</p>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <GridSlot title="Left slot" image={resolvedGrid.left} onSwap={() => setModal({ type: 'grid', position: 'left' })} />
                    <div className="grid gap-4">
                      <GridSlot title="Right top" image={resolvedGrid.rightTop} onSwap={() => setModal({ type: 'grid', position: 'rightTop' })} compact />
                      <GridSlot title="Right bottom" image={resolvedGrid.rightBottom} onSwap={() => setModal({ type: 'grid', position: 'rightBottom' })} compact />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <section className="rounded-[1.8rem] border border-charcoal/10 bg-white/85 p-6 shadow-[0_16px_44px_rgba(26,26,26,0.06)]">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-charcoal">Library Health</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <StatBlock label="Assets in library" value={String(images.length)} />
                <StatBlock label="Hero assignment" value={heroImage?.alt ? 'Assigned' : 'Pending'} />
                <StatBlock label="Grid positions" value="3 mapped slots" />
                <StatBlock label="Current mode" value={activeTab === 'asset-library' ? 'Asset Library' : 'Layout Editor'} />
              </dl>
            </section>

            <section className="rounded-[1.8rem] border border-charcoal/10 bg-[linear-gradient(180deg,#FBFBFA,#F3EEE6)] p-6 shadow-[0_16px_44px_rgba(26,26,26,0.05)]">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-charcoal">Quick Workflow</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-charcoal/70">
                <li>1. Upload or drop portfolio images into the library.</li>
                <li>2. Edit alt text for accessibility and polish.</li>
                <li>3. Assign one asset to the hero and three assets to the Instagram grid.</li>
              </ul>
            </section>
          </aside>
        </section>
      </main>

      {modal?.type === 'hero' || modal?.type === 'grid' ? (
        <ModalShell title={modal?.type === 'hero' ? 'Assign Hero Image' : 'Swap Grid Image'} onClose={() => setModal(null)}>
          <div className="grid gap-4 sm:grid-cols-2">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => {
                  if (modal?.type === 'hero') {
                    setHeroImageId(image.id);
                  } else if (modal?.type === 'grid') {
                    setGridAssignments((current) => ({ ...current, [modal.position]: image.id }));
                  }
                  setModal(null);
                }}
                className="group overflow-hidden rounded-[1.25rem] border border-charcoal/10 bg-white text-left shadow-[0_12px_30px_rgba(26,26,26,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(26,26,26,0.1)]"
              >
                <div className="aspect-square overflow-hidden bg-charcoal/5">
                  <img src={image.url} alt={image.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="space-y-1 p-4">
                  <p className="text-sm font-medium text-charcoal">{image.alt}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-charcoal/45">{image.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        </ModalShell>
      ) : null}

      {modal?.type === 'alt' ? (
        <ModalShell title="Edit Alt Text" onClose={() => setModal(null)}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-charcoal">Alt text</span>
            <textarea
              value={altDraft}
              onChange={(event) => setAltDraft(event.target.value)}
              rows={4}
              className="w-full rounded-[1rem] border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </label>
          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={() => setModal(null)} className="rounded-full border border-charcoal/10 px-4 py-2 text-sm text-charcoal transition-all duration-300 hover:border-sage hover:text-sage">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (!selectedAltImageId) {
                  return;
                }

                setImages((current) => current.map((image) => (image.id === selectedAltImageId ? { ...image, alt: altDraft.trim() || image.alt } : image)));
                setSelectedAltImageId(null);
                setModal(null);
              }}
              className="rounded-full bg-charcoal px-4 py-2 text-sm text-cream transition-all duration-300 hover:bg-charcoal/90"
            >
              Save alt text
            </button>
          </div>
        </ModalShell>
      ) : null}
    </div>
  );
}

export default App;