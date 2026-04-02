import { useState, useRef, useCallback, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const galleryPhotos = Array.from({ length: 36 }, (_, i) => ({
  src: `/images/page4/gallery/4-${i + 1}.webp`,
}));

const ROWS = 3;

export default function Page4Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Mouse drag scroll
  const scrollRef = useRef<HTMLDivElement>(null);
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
      dragStartX.current = e.pageX - el.offsetLeft;
      dragScrollLeft.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - dragStartX.current;
      if (Math.abs(walk) > 5) hasDragged.current = true;
      el.scrollLeft = dragScrollLeft.current - walk;
    };
    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
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

      {/* 3-row horizontal scroll grid */}
      <div style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        <style>{`.gallery-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div
          ref={scrollRef}
          className="gallery-scroll"
          style={{
            cursor: 'grab',
            display: 'grid',
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gridAutoFlow: 'column',
            gridAutoColumns: '120px',
            gap: '3px',
            padding: '0 3px',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => { if (!hasDragged.current) setLightboxIndex(i); }}
              style={{
                width: '120px',
                height: '120px',
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
            top: '60px',
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
