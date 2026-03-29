import { useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

const carouselPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: `https://picsum.photos/seed/gallery${i + 1}/400/533`,
}));

const gridPhotos = Array.from({ length: 20 }, (_, i) => ({
  src: `https://picsum.photos/seed/grid${i + 1}/${300 + (i % 3) * 50}/${400 + (i % 4) * 60}`,
  span: i % 5 === 0 ? 2 : 1,
}));

const INITIAL_COUNT = 6;

export default function Page4Gallery() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = showAll ? gridPhotos : gridPhotos.slice(0, INITIAL_COUNT);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // 터치 스와이프
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setLightboxIndex((prev) =>
        diff > 0
          ? (prev! + 1) % gridPhotos.length
          : (prev! - 1 + gridPhotos.length) % gridPhotos.length
      );
    }
  }, []);

  return (
    <div style={{ width: '100%', padding: '24px 0' }}>
      {/* 캐러셀 */}
      <div style={{ position: 'relative' }}>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={12}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          style={{ padding: '0 24px' }}
        >
          {carouselPhotos.map((photo, i) => (
            <SwiperSlide key={i}>
              <img
                src={photo.src}
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

      {/* 비정형 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        padding: '24px 24px 0',
      }}>
        {visiblePhotos.map((photo, i) => (
          <div
            key={i}
            onClick={() => setLightboxIndex(i)}
            style={{
              gridColumn: photo.span === 2 ? 'span 2' : undefined,
              gridRow: photo.span === 2 ? 'span 2' : undefined,
              cursor: 'pointer',
            }}
          >
            <img
              src={photo.src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                aspectRatio: '1 / 1',
              }}
            />
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
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
      {/* 라이트박스 */}
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
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! - 1 + gridPhotos.length) % gridPhotos.length);
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
            src={gridPhotos[lightboxIndex].src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '85vh',
              objectFit: 'contain',
            }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % gridPhotos.length);
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
            {lightboxIndex + 1} / {gridPhotos.length}
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
