import { useState, useRef, useCallback, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';

// Aspect ratios from actual image files (w/h)
const photoRatios: Record<number, number> = {
  9: 1.33, 15: 1.33, 19: 1.25, 25: 1.25,
  29: 1.50, 30: 1.50, 31: 1.50, 32: 1.50, 35: 1.50, 36: 1.50,
};

const galleryPhotos = Array.from({ length: 36 }, (_, i) => ({
  src: `/images/page4/gallery/4-${i + 1}.webp`,
  ratio: photoRatios[i + 1] ?? 0.75,
}));

const ROW_HEIGHT = 140;
const GAP = 6;
const ROWS = 3;
const PADDING = 16;
const perRow = Math.ceil(galleryPhotos.length / ROWS);
const rows = Array.from({ length: ROWS }, (_, r) =>
  galleryPhotos.slice(r * perRow, (r + 1) * perRow)
);

// Calculate content width per row and find the max
const rowWidths = rows.map(row =>
  row.reduce((sum, p) => sum + Math.round(ROW_HEIGHT * p.ratio), 0) + (row.length - 1) * GAP + PADDING * 2
);
const maxRowWidth = Math.max(...rowWidths);

export default function Page4Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // Synchronized scroll across 3 rows
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isSyncing = useRef(false);

  const handleRowScroll = useCallback((sourceIdx: number) => {
    if (isSyncing.current) return;
    const source = rowRefs.current[sourceIdx];
    if (!source) return;

    isSyncing.current = true;
    rowRefs.current.forEach((el, i) => {
      if (i !== sourceIdx && el) {
        el.scrollLeft = source.scrollLeft;
      }
    });
    requestAnimationFrame(() => { isSyncing.current = false; });
  }, []);

  // Mouse drag scroll
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const dragTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = rowRefs.current[0]?.parentElement;
    if (!container) return;

    const findRow = (e: MouseEvent) => {
      for (const el of rowRefs.current) {
        if (el && el.contains(e.target as Node)) return el;
      }
      return rowRefs.current[0];
    };

    const onMouseDown = (e: MouseEvent) => {
      const row = findRow(e);
      if (!row) return;
      isDragging.current = true;
      hasDragged.current = false;
      dragTarget.current = row;
      dragStartX.current = e.pageX;
      dragScrollLeft.current = row.scrollLeft;
      row.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !dragTarget.current) return;
      e.preventDefault();
      const walk = e.pageX - dragStartX.current;
      if (Math.abs(walk) > 5) hasDragged.current = true;
      dragTarget.current.scrollLeft = dragScrollLeft.current - walk;
    };
    const onMouseUp = () => {
      if (dragTarget.current) dragTarget.current.style.cursor = 'grab';
      isDragging.current = false;
      dragTarget.current = null;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
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

      <style>{`.gallery-row::-webkit-scrollbar { display: none; }`}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            ref={el => { rowRefs.current[ri] = el; }}
            className="gallery-row"
            onScroll={() => handleRowScroll(ri)}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              padding: '0 16px',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab',
            }}
          >
            {row.map((photo, ci) => {
              const globalIdx = ri * perRow + ci;
              const width = Math.round(ROW_HEIGHT * photo.ratio);
              return (
                <div
                  key={globalIdx}
                  onClick={() => { if (!hasDragged.current) setLightboxIndex(globalIdx); }}
                  style={{
                    flexShrink: 0,
                    width: `${width}px`,
                    height: `${ROW_HEIGHT}px`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={photo.src}
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
              );
            })}
            {/* Spacer to match longest row */}
            {rowWidths[ri] < maxRowWidth && (
              <div style={{ flexShrink: 0, width: `${maxRowWidth - rowWidths[ri]}px` }} />
            )}
          </div>
        ))}
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
