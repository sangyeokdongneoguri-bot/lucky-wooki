import { weddingData } from '../data/wedding';

export default function Page1Opening() {
  const { groom, bride, date } = weddingData;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return (
    <div
      style={{
        width: '100%',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'inherit',
        position: 'relative',
        padding: '40px 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          aspectRatio: '5 / 8',
          backgroundImage: 'url(/images/card-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '2px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '26% 24px 8%',
          boxSizing: 'border-box',
        }}
      >
        {/* Upper group: Photo + Names + Date */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Photo */}
          <div
            style={{
              width: '56%',
              aspectRatio: '1 / 1.05',
              overflow: 'hidden',
              marginBottom: '40px',
            }}
          >
            <img
              src="/images/hero-1.jpg"
              alt="웨딩 사진"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%)',
              }}
            />
          </div>

          {/* Names */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.85rem',
              fontWeight: 400,
              color: '#444',
              letterSpacing: '0.18em',
              margin: '0 0 6px',
            }}
          >
            {groom.nameEn} &amp; {bride.nameEn}
          </p>

          {/* Date & Venue */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              color: '#444',
              letterSpacing: '0.08em',
              margin: '0 0 4px',
            }}
          >
            {year}. {month}. {day} · 2:00 PM
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              color: '#444',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            W Square · 8F Chapel Hall
          </p>
        </div>

        {/* Message */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.65rem',
            fontWeight: 300,
            color: '#666',
            textAlign: 'center',
            lineHeight: 1.8,
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          We're all traveling through time together,
          <br />
          every day of our lives.
        </p>
      </div>
    </div>
  );
}
