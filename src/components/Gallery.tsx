import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <section style={{ background: colors.bg, padding: '60px 0', overflow: 'hidden' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: '11px',
            letterSpacing: '4px',
            color: colors.accent,
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>
            Our Story
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: '32px',
            fontWeight: 300,
            color: '#222',
            letterSpacing: '6px',
            margin: 0,
          }}>
            gallery
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          style={{ paddingBottom: '50px' }}
        >
          {weddingData.gallery.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{ width: '260px', cursor: 'pointer' }}
              onClick={() => openLightbox(index)}
            >
              <div style={{
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '360px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: colors.white,
                fontSize: '32px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '8px',
                zIndex: 1001,
              }}
            >
              ×
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
              }}
            >
              <img
                src={weddingData.gallery[lightboxIndex].src}
                alt={weddingData.gallery[lightboxIndex].alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  display: 'block',
                }}
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + weddingData.gallery.length) % weddingData.gallery.length : null
                );
              }}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: colors.white,
                fontSize: '24px',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '50%',
              }}
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % weddingData.gallery.length : null
                );
              }}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: colors.white,
                fontSize: '24px',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '50%',
              }}
            >
              ›
            </button>

            <div style={{
              position: 'absolute',
              bottom: '24px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontFamily: fonts.body,
            }}>
              {lightboxIndex + 1} / {weddingData.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .swiper-pagination-bullet {
          background: #999 !important;
          opacity: 0.4;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
