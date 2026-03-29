import { weddingData } from '../data/wedding';

const { location, ceremony, dining } = weddingData;

const mapLinks = {
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`,
  kakao: `https://map.kakao.com/?q=${encodeURIComponent(location.address)}`,
  tmap: `https://tmap.life/search?query=${encodeURIComponent(location.address)}`,
};

const sectionTitle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#222',
  margin: '0 0 8px',
};

const bodyText: React.CSSProperties = {
  fontSize: '13px',
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
      {/* 지도 이미지 */}
      <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden' }}>
        <img
          src={location.mapImage}
          alt="오시는 길"
          style={{ width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover', background: '#eee' }}
        />
      </div>

      {/* 장소명 */}
      <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#222', margin: '0 0 4px' }}>
        {location.name}
      </h2>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#888', margin: '0 0 20px' }}>
        {ceremony.floor}
      </p>

      <div style={divider} />

      {/* 전화번호 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <a
          href={`tel:${location.tel.replace(/\./g, '')}`}
          style={{ fontSize: '14px', color: '#222', textDecoration: 'none' }}
        >
          Tel {location.tel}
        </a>
      </div>

      {/* 주소 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div>
          <p style={{ ...bodyText, marginBottom: '4px' }}>{location.address}</p>
          <p style={{ ...bodyText, color: '#888', fontSize: '12px' }}>
            판교역 1번 출구에서 도보 약 6분 거리
          </p>
        </div>
      </div>

      {/* 지도 앱 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {([['네이버지도', mapLinks.naver], ['카카오지도', mapLinks.kakao], ['TMAP', mapLinks.tmap]] as const).map(([label, url]) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px 0',
              fontSize: '13px',
              color: '#222',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <div style={divider} />

      {/* 주차 안내 */}
      <p style={sectionTitle}>주차 안내</p>
      <p style={bodyText}>
        웨딩홀 건물 내 주차장과 바로 건너편 건물(도보 1분)에도 주차장이 있습니다.
        주차 공간은 비교적 넉넉하여 웨딩홀 건물에도 주차 가능하십니다.
        <br />(무료 주차 2시간 제공)
      </p>

      <div style={divider} />

      {/* 예식 / 식사 안내 */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px' }}>예식</p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#222', margin: '0 0 2px' }}>{ceremony.floor}</p>
          <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>{ceremony.time}</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px' }}>식사</p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#222', margin: '0 0 2px' }}>{dining.floor}</p>
          <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>{dining.time}</p>
        </div>
      </div>
    </div>
  );
}
