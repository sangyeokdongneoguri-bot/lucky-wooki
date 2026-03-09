import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

const INITIAL_COUNT = 6;

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = weddingData.gallery;
  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section style={{ background: colors.bg, padding: '60px 20px' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: '11px',
            letterSpacing: '4px',
            color: colors.accent,
            marginBottom: '8px',
            textTransform: 'lowercase',
          }}>
            photo
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: '32px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '6px',
            margin: 0,
            textTransform: 'lowercase',
          }}>
            gallery
          </h2>
        </div>
      </ScrollReveal>

      {/* Photo Grid */}
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
      }}>
        {visibleImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index < INITIAL_COUNT ? index * 0.05 : 0 }}
            onClick={() => openLightbox(showAll ? index : index)}
            style={{
              aspectRatio: '1',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && images.length > INITIAL_COUNT && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(true)}
            style={{
              background: 'transparent',
              border: `1px solid ${colors.text}`,
              borderRadius: '2px',
              padding: '12px 32px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: fonts.body,
              color: colors.text,
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            더보기
          </motion.button>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.97)',
              zIndex: 3000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Header */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              zIndex: 3001,
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                fontFamily: fonts.body,
              }}>
                사진 좌우로 밀어보세요 ({lightboxIndex + 1}/{images.length})
              </span>
              <button
                onClick={closeLightbox}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.white,
                  fontSize: '28px',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '4px 8px',
                }}
              >
                ×
              </button>
            </div>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              style={{
                maxWidth: '100vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                userSelect: 'none',
              }}
            />

            {/* Desktop nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: colors.white,
                fontSize: '22px',
                cursor: 'pointer',
                padding: '12px 14px',
                borderRadius: '50%',
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: colors.white,
                fontSize: '22px',
                cursor: 'pointer',
                padding: '12px 14px',
                borderRadius: '50%',
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
