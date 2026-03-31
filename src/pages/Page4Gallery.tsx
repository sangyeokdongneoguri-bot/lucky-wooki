import { useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

const carouselSets = [
  ['/images/4-1.jpg', '/images/4-2.jpg'],
];

const carouselPhotos = carouselSets.flat();

const galleryPhotos = Array.from({ length: 17 }, (_, i) => ({
  src: `/images/gallery/5-${i + 1}.jpg`,
}));

// Collage photo placement (percentage-based absolute positioning)
interface PlacedPhoto {
  idx: number;
  left: string;
  top: string;
  width: string;
  height: string;
}

const collage1: PlacedPhoto[] = [
  { idx: 0, left: '33%', top: '0%',   width: '35%', height: '27%' },   // 5-1 center-right top
  { idx: 1, left: '73%', top: '2%',   width: '23%', height: '17%' },   // 5-2 far right, shorter
  { idx: 3, left: '0%',  top: '20%',  width: '30%', height: '34%' },   // 5-4 left, tall
  { idx: 6, left: '46%', top: '35%',  width: '38%', height: '31%' },   // 5-7 center-right, lower
  { idx: 4, left: '0%',  top: '70%',  width: '22%', height: '21%' },   // 5-5 bottom far-left
  { idx: 7, left: '24%', top: '72%',  width: '22%', height: '18%' },   // 5-8 bottom left
  { idx: 5, left: '52%', top: '70%',  width: '20%', height: '19%' },   // 5-6 bottom right
  { idx: 2, left: '74%', top: '70%',  width: '22%', height: '21%' },   // 5-3 bottom far-right
];

const collage2: PlacedPhoto[] = [
  { idx: 14, left: '2%',  top: '1%',   width: '55%', height: '29%' },   // 5-15 top-left, large
  { idx: 15, left: '62%', top: '3%',   width: '28%', height: '30%' },   // 5-16 top-right, portrait
  { idx: 13, left: '2%',  top: '34%',  width: '34%', height: '34%' },   // 5-14 mid-left, tall
  { idx: 10, left: '38%', top: '34%',  width: '23%', height: '20%' },   // 5-11 center, small
  { idx: 11, left: '67%', top: '38%',  width: '30%', height: '30%' },   // 5-12 mid-right, tall
  { idx: 9,  left: '40%', top: '55%',  width: '23%', height: '18%' },   // 5-10 center, below 5-11
  { idx: 16, left: '2%',  top: '71%',  width: '34%', height: '28%' },   // 5-17 bottom-left
  { idx: 8,  left: '39%', top: '78%',  width: '26%', height: '22%' },   // 5-9 bottom-center
  { idx: 12, left: '73%', top: '72%',  width: '24%', height: '23%' },   // 5-13 bottom-right
];

export default function Page4Gallery() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const collages = showAll ? [collage1, collage2] : [collage1];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

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
    <div style={{ width: '100%', padding: '24px 0' }}>
      {/* Hint message */}
      <p style={{
        textAlign: 'center',
        fontSize: '12px',
        color: '#aaa',
        margin: '0 0 12px',
        letterSpacing: '0.05em',
      }}>
        사진을 좌우로 밀어보세요
      </p>

      {/* Carousel with album background */}
      <div style={{
        position: 'relative',
        backgroundImage: 'url(/images/album-bg.jpg)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        padding: '16px 0',
      }}>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={12}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          style={{ padding: '0 24px' }}
        >
          {carouselPhotos.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '4px',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          style={{
            position: 'absolute',
            left: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.8)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#222',
          }}
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.8)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#222',
          }}
        >
          ›
        </button>
      </div>

      {/* Collage */}
      <div style={{ padding: '24px 24px 0' }}>
        {collages.map((photos, ci) => (
          <div
            key={ci}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '15 / 22',
              marginBottom: ci < collages.length - 1 ? '24px' : 0,
            }}
          >
            {photos.map((p) => (
              <div
                key={p.idx}
                onClick={() => setLightboxIndex(p.idx)}
                style={{
                  position: 'absolute',
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  height: p.height,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '2px',
                }}
              >
                <img
                  src={galleryPhotos[p.idx].src}
                  alt=""
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
        ))}
      </div>

      {/* Show more */}
      {!showAll && (
        <div style={{ textAlign: 'center', padding: '20px 24px 0' }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              padding: '12px 32px',
              background: 'none',
              color: '#555',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            더보기 +
          </button>
        </div>
      )}

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
          {/* Hint */}
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
  );
}
