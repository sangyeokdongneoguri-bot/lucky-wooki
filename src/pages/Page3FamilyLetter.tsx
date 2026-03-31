import { weddingData } from '../data/wedding';

const { groom, bride } = weddingData;

export default function Page3FamilyLetter() {
  return (
    <div
      style={{
        width: '100%',
        padding: '40px 24px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Groom */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#333', margin: '0 0 4px' }}>
            신랑 {groom.name}
          </p>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px' }}>
            {groom.father} · {groom.mother}의 아들
          </p>
          <img
            src="/images/page3/3-1.webp"
            alt=""
            style={{
              width: '80%',
              aspectRatio: '3 / 2',
              objectFit: 'cover',
              display: 'inline-block',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Bride */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#333', margin: '0 0 4px' }}>
            신부 {bride.name}
          </p>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px' }}>
            {bride.father} · {bride.mother}의 딸
          </p>
          <img
            src="/images/page3/3-2.webp"
            alt=""
            style={{
              width: '80%',
              aspectRatio: '3 / 2',
              objectFit: 'cover',
              display: 'inline-block',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
