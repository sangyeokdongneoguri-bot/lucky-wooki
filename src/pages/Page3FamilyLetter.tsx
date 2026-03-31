import { weddingData } from '../data/wedding';

const { groom, bride } = weddingData;

export default function Page3FamilyLetter() {
  return (
    <div
      style={{
        width: '100%',
        padding: '40px 24px',
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #f5f0e8 0%, #ede7db 100%)',
        position: 'relative',
      }}
    >
      {/* Spring notebook lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${60 + i * 36}px`,
              left: '24px',
              right: '24px',
              height: '1px',
              background: 'rgba(180, 170, 155, 0.25)',
            }}
          />
        ))}
        {/* Spring holes */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '36px',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          paddingTop: '20px',
        }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(160, 150, 135, 0.3)',
                border: '1px solid rgba(140, 130, 115, 0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingLeft: '20px' }}>
        {/* Top photos row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {/* Photo 3-1 */}
          <div style={{
            background: '#fff',
            padding: '8px 8px 28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transform: 'rotate(-2deg)',
          }}>
            <img
              src="/images/3-1.jpg"
              alt=""
              style={{
                width: '100%',
                aspectRatio: '3 / 2',
                objectFit: 'cover',
                display: 'block',
                filter: 'sepia(10%)',
              }}
            />
          </div>

          {/* Photo 3-2 (letter - placeholder) */}
          <div style={{
            background: '#fff',
            padding: '8px 8px 28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transform: 'rotate(1.5deg)',
          }}>
            <img
              src="/images/3-2.jpg"
              alt=""
              style={{
                width: '100%',
                aspectRatio: '3 / 2',
                objectFit: 'cover',
                display: 'block',
                filter: 'sepia(10%)',
              }}
            />
          </div>
        </div>

        {/* Family info */}
        <div style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '14px',
            lineHeight: 2.2,
            color: '#555',
            letterSpacing: '0.02em',
          }}>
            <p style={{ margin: '0 0 8px' }}>
              <span style={{ color: '#888', fontSize: '12px' }}>{groom.father} · {groom.mother}의 아들</span>
              <br />
              <span style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>신랑 {groom.name}</span>
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: '#888', fontSize: '12px' }}>{bride.father} · {bride.mother}의 딸</span>
              <br />
              <span style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>신부 {bride.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
