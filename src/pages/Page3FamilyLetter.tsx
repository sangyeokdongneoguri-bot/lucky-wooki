import { useState } from 'react';
import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const { groom, bride } = weddingData;

const albumPhotos = [
  '/images/page4/4-1.webp',
  '/images/page4/4-2.webp',
];

const spreads: [string, string][] = [];
for (let i = 0; i < albumPhotos.length; i += 2) {
  spreads.push([albumPhotos[i], albumPhotos[i + 1] ?? albumPhotos[i]]);
}

export default function Page3FamilyLetter() {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const currentSpread = spreads[spreadIndex];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '40px 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Album with arrows */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        marginBottom: '32px',
      }}>
        <button
          onClick={() => setSpreadIndex((prev) => (prev - 1 + spreads.length) % spreads.length)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#888',
            flexShrink: 0,
          }}
        >
          ‹
        </button>

        <div style={{
          flex: 1,
          maxWidth: '360px',
          backgroundImage: 'url(/images/page4/album-bg.webp)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          aspectRatio: '2 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12%',
          padding: '6% 5%',
          boxSizing: 'border-box',
          margin: '0 8px',
        }}>
          <img
            src={currentSpread[0]}
            alt=""
            style={{
              width: '36%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <img
            src={currentSpread[1]}
            alt=""
            style={{
              width: '36%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        <button
          onClick={() => setSpreadIndex((prev) => (prev + 1) % spreads.length)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#888',
            flexShrink: 0,
          }}
        >
          ›
        </button>
      </div>
      {/* Groom */}
      <ScrollReveal>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#333', margin: '0 0 4px' }}>
          신랑 {groom.name}
        </p>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px' }}>
          {groom.father} · {groom.mother}의 아들
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          <img
            src="/images/page3/3-1.webp"
            alt=""
            style={{
              width: '45%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              borderRadius: '4px',
              flexShrink: 0,
            }}
          />
          {/* 신랑측 부모님 편지 - 이미지 파일로 교체 예정 */}
          <div style={{
            flex: 1,
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/images/page3/letter-groom.webp"
              alt="신랑측 부모님 편지"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Bride */}
      <ScrollReveal delay={0.15}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#333', margin: '0 0 4px' }}>
          신부 {bride.name}
        </p>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px' }}>
          {bride.father} · {bride.mother}의 딸
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          {/* 신부측 부모님 편지 - 이미지 파일로 교체 예정 */}
          <div style={{
            flex: 1,
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/images/page3/letter-bride.webp"
              alt="신부측 부모님 편지"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
          <img
            src="/images/page3/3-2.webp"
            alt=""
            style={{
              width: '45%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              borderRadius: '4px',
              flexShrink: 0,
            }}
          />
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
}
