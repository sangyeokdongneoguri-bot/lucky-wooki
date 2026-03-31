import { weddingData } from '../data/wedding';

const { location, ceremony, dining } = weddingData;

const mapLinks = {
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`,
  kakao: `https://map.kakao.com/?q=${encodeURIComponent(location.address)}`,
  tmap: `https://tmap.life/search?query=${encodeURIComponent(location.address)}`,
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
  return (
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
        {([['네이버지도', mapLinks.naver], ['카카오지도', mapLinks.kakao], ['TMAP', mapLinks.tmap]] as const).map(([label, url], i) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                color: '#888',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {label}
            </a>
            {i < 2 && <span style={{ color: '#ccc', fontSize: '12px' }}>/</span>}
          </span>
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
          }}
        >
          {location.tel}
        </a>
      </p>

      {/* Map image */}
      <div style={{ marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
        <img
          src="/images/map.png"
          alt="오시는 길"
          style={{ width: '100%', display: 'block', height: 'auto', background: '#eee' }}
        />
      </div>

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
      <p style={bodyText}>
        <span style={{ fontWeight: 600, color: '#333' }}>주차</span>: 웨딩홀 건물 혹은 바로 건너편 건물 주차장(도보 1분)
        <br />무료 주차 2시간 제공하며, 따로 등록 하실 필요 없습니다
      </p>

      <div style={{ height: '12px' }} />

      {/* Shuttle bus */}
      <p style={bodyText}>
        <span style={{ fontWeight: 600, color: '#333' }}>셔틀버스</span>: 판교역 1번 출구 50m 앞 횡단보도에서 탑승
        <br />
        <span style={{ paddingLeft: '56px' }}>(버스 2대 운영, 안내 직원 상시 대기)</span>
      </p>

      <div style={divider} />

      {/* Ceremony & Dining */}
      <p style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#333',
        margin: '0 0 8px',
      }}>
        추가 안내
      </p>
      <p style={bodyText}>
        예식 {ceremony.floor}: {ceremony.time}
        <br />
        식사 {dining.floor}: {dining.time}
      </p>
    </div>
  );
}
