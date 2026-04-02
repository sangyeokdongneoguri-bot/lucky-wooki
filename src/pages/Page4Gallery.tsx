import { useState, useRef, useCallback, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const photoRatios: Record<number, number> = {
  9: 1.33, 15: 1.33, 19: 1.25, 25: 1.25,
  29: 1.50, 30: 1.50, 31: 1.50, 32: 1.50, 35: 1.50,
};

const ROW_HEIGHT = 140;
const GAP = 6;
const PADDING = 16;
const NORMAL_COLS_BETWEEN = 2;

// Large photos: file number + which rows they span
const BIG_PHOTOS: { num: number; pos: 'top' | 'bottom' }[] = [
  { num: 21, pos: 'top' },    // rows 0-1
  { num: 6, pos: 'bottom' },  // rows 1-2
  { num: 20, pos: 'top' },    // rows 0-1
];

const allNums = [2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35];
const bigSet = new Set(BIG_PHOTOS.map(b => b.num));
const smallNums = allNums.filter(n => !bigSet.has(n));

// Absolute positioning layout - each photo keeps its own ratio
interface PhotoPlacement {
  num: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function getRatio(num: number) { return photoRatios[num] ?? 0.75; }

const rowX = [PADDING, PADDING, PADDING];
const placements: PhotoPlacement[] = [];
let _si = 0;

function placeSmall(row: number, num: number) {
  const w = Math.round(ROW_HEIGHT * getRatio(num));
  placements.push({ num, x: rowX[row], y: row * (ROW_HEIGHT + GAP), width: w, height: ROW_HEIGHT });
  rowX[row] += w + GAP;
}

function placeBig(topRow: number, num: number) {
  const h = ROW_HEIGHT * 2 + GAP;
  const w = Math.round(h * getRatio(num));
  const alignX = Math.max(rowX[topRow], rowX[topRow + 1]);
  rowX[topRow] = alignX;
  rowX[topRow + 1] = alignX;
  placements.push({ num, x: alignX, y: topRow * (ROW_HEIGHT + GAP), width: w, height: h });
  rowX[topRow] += w + GAP;
  rowX[topRow + 1] += w + GAP;
}

for (let bi = 0; bi < BIG_PHOTOS.length; bi++) {
  const colsBefore = bi === 0 ? 0 : NORMAL_COLS_BETWEEN;
  for (let c = 0; c < colsBefore; c++) {
    for (let r = 0; r < 3 && _si < smallNums.length; r++) {
      placeSmall(r, smallNums[_si++]);
    }
  }
  const big = BIG_PHOTOS[bi];
  if (big.pos === 'top') {
    placeBig(0, big.num);
    if (_si < smallNums.length) placeSmall(2, smallNums[_si++]);
  } else {
    if (_si < smallNums.length) placeSmall(0, smallNums[_si++]);
    placeBig(1, big.num);
  }
}

while (_si < smallNums.length) {
  for (let r = 0; r < 3 && _si < smallNums.length; r++) {
    placeSmall(r, smallNums[_si++]);
  }
}

const containerWidth = Math.max(...rowX) + PADDING - GAP;
const containerHeight = 3 * ROW_HEIGHT + 2 * GAP;

const galleryPhotos = placements.map(p => ({
  src: `/images/page4/gallery/4-${p.num}.webp`,
}));

export default function Page4Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [lightboxIndex]);

  // Mouse drag scroll
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.pageX;
      dragScrollLeft.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const walk = e.pageX - dragStartX.current;
      if (Math.abs(walk) > 5) hasDragged.current = true;
      el.scrollLeft = dragScrollLeft.current - walk;
    };
    const onMouseUp = () => {
      if (isDragging.current) el.style.cursor = 'grab';
      isDragging.current = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Lightbox touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setLightboxIndex((prev) =>
        diff > 0
          ? (prev! + 1) % galleryPhotos.length
          : (prev! - 1 + galleryPhotos.length) % galleryPhotos.length
      );
    }
  }, []);

  return (
    <ScrollReveal>
    <div style={{ width: '100%', padding: '24px 0' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 400,
        color: '#222',
        margin: '0 0 28px',
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: '0.15em',
      }}>
        Photo
      </h2>

      <style>{`.gallery-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        ref={scrollRef}
        className="gallery-scroll"
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
        }}
      >
        <div style={{
          position: 'relative',
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
        }}>
          {placements.map((p, i) => (
            <div
              key={i}
              onClick={() => { if (!hasDragged.current) setLightboxIndex(i); }}
              style={{
                position: 'absolute',
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.width}px`,
                height: `${p.height}px`,
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '2px',
              }}
            >
              <img
                src={galleryPhotos[i].src}
                alt=""
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{
            position: 'absolute',
            bottom: '52px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            margin: 0,
          }}>
            사진을 좌우로 밀어보세요
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! - 1 + galleryPhotos.length) % galleryPhotos.length);
            }}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            ‹
          </button>

          <img
            src={galleryPhotos[lightboxIndex].src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '75vh',
              objectFit: 'contain',
              userSelect: 'none',
              touchAction: 'pan-y',
            }}
            draggable={false}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % galleryPhotos.length);
            }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            ›
          </button>

          <span style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
          }}>
            {lightboxIndex + 1} / {galleryPhotos.length}
          </span>

          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
    </ScrollReveal>
  );
}
