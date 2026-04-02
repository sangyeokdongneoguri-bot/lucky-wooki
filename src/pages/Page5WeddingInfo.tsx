import { useState } from 'react';
import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const { location } = weddingData;

const mapLinks = {
  naver: 'https://naver.me/x0UPVZt4',
  kakao: 'https://kko.to/HblJ2OPgQp',
  tmap: 'https://tmap.life/a23b58f3',
};

const bodyText: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.8,
  color: '#555',
  margin: 0,
  wordBreak: 'keep-all',
};

const divider: React.CSSProperties = {
  width: '100%',
  height: '1px',
  background: '#eee',
  margin: '20px 0',
};

export default function Page5WeddingInfo() {
  const [mapExpanded, setMapExpanded] = useState(false);

  return (
    <ScrollReveal>
    <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
      {/* Title */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 400,
        color: '#222',
        margin: '0 0 28px',
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: '0.15em',
      }}>
        Location
      </h2>

      {/* Venue name */}
      <p style={{
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 600,
        color: '#333',
        margin: '0 0 4px',
      }}>
        판교 더블유스퀘어 8층 채플홀
      </p>

      {/* Address */}
      <p style={{
        textAlign: 'center',
        fontSize: '15px',
        color: '#444',
        margin: '0 0 16px',
        lineHeight: 1.6,
      }}>
        {location.address}
      </p>

      {/* Map app buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
        {([
          ['네이버지도', mapLinks.naver, '/images/page5/naver-map.webp'],
          ['카카오지도', mapLinks.kakao, '/images/page5/kakao-map.webp'],
          ['TMAP', mapLinks.tmap, '/images/page5/tmap.svg'],
        ] as const).map(([label, url, icon]) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            <img
              src={icon}
              alt={label}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            />
            <span style={{ fontSize: '11px', color: '#888' }}>{label}</span>
          </a>
        ))}
      </div>

      {/* Phone */}
      <p style={{ textAlign: 'center', margin: '0 0 24px' }}>
        <a
          href={`tel:${location.tel.replace(/\./g, '')}`}
          style={{
            fontSize: '15px',
            color: '#444',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {location.tel}
        </a>
      </p>

      {/* Map image */}
      <div
        onClick={() => setMapExpanded(true)}
        style={{ marginBottom: '20px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', padding: '0 48px' }}
      >
        <img
          src="/images/page5/map.webp"
          alt="오시는 길"
          style={{ width: '100%', display: 'block', height: 'auto', background: '#eee' }}
        />
      </div>

      {/* Map lightbox */}
      {mapExpanded && (
        <div
          onClick={() => setMapExpanded(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/images/page5/map.webp"
            alt="오시는 길"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={() => setMapExpanded(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Walking distance */}
      <p style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#666',
        margin: '0 0 8px',
        fontWeight: 500,
      }}>
        판교역 1번 출구에서 도보 약 6분 거리
      </p>

      <div style={divider} />

      {/* Parking */}
      <p style={{ ...bodyText, fontWeight: 600, color: '#333', marginBottom: '4px' }}>주차</p>
      <p style={{ ...bodyText, paddingLeft: '12px' }}>
        웨딩홀 건물과 바로 건너편 건물 주차장 (도보 1분) 모두 가능합니다.<br />
        웨딩홀 주차장 입구에서 주차 요원이 자세히 안내 드릴 예정입니다.<br />
        무료 주차는 2시간 제공하며, 별도로 등록하실 필요 없습니다.
      </p>

      <div style={{ height: '12px' }} />

      {/* Shuttle bus */}
      <p style={{ ...bodyText, fontWeight: 600, color: '#333', marginBottom: '4px' }}>셔틀버스</p>
      <p style={{ ...bodyText, paddingLeft: '12px' }}>
        판교역 1번 출구 50m 앞 횡단보도에서 탑승 가능합니다.<br />
        버스 2대가 예식장과 판교역을 수시로 운행하며, 약 10~15분 간격으로 이용할 수 있습니다.
      </p>

      <div style={divider} />

      {/* Ceremony & Dining */}
      <p style={{ ...bodyText, fontWeight: 600, color: '#333', marginBottom: '4px' }}>추가 안내</p>
      <p style={{ ...bodyText, paddingLeft: '12px' }}>
        예식: 8층 채플홀 | 오후 2시<br />
        식사: 7층 연회장 | 오후 1시 30분~3시 30분<br />
        600명 이상 수용 가능한 넓은 단독 연회장이오니 자유롭게 착석하여 주시길 바랍니다.
      </p>
    </div>
    </ScrollReveal>
  );
}
