import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const { groom, bride } = weddingData;

const photoStyle: React.CSSProperties = {
  width: '50%',
  aspectRatio: '3 / 4',
  objectFit: 'cover',
  borderRadius: '4px',
};

function FamilySection({ role, person, photos, letterSrc, delay }: {
  role: '신랑' | '신부';
  person: { name: string; father: string; mother: string };
  photos: [string, string];
  letterSrc: string;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <p style={{ fontSize: '15px', fontWeight: 600, color: '#333', margin: '0 0 4px' }}>
        {role} {person.name}
      </p>
      <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px' }}>
        {person.father} · {person.mother}의 {role === '신랑' ? '아들' : '딸'}
      </p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <img src={photos[0]} alt="" loading="lazy" style={photoStyle} />
        <img src={photos[1]} alt="" loading="lazy" style={photoStyle} />
      </div>
      <img
        src={letterSrc}
        alt={`${role}측 부모님 편지`}
        loading="lazy"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
    </ScrollReveal>
  );
}

export default function Page3FamilyLetter() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '40px 24px',
      boxSizing: 'border-box',
    }}>
      <FamilySection
        role="신랑"
        person={groom}
        photos={['/images/page3/3-1.webp', '/images/page3/4-1.webp']}
        letterSrc="/images/page3/letter-groom.webp"
      />
      <FamilySection
        role="신부"
        person={bride}
        photos={['/images/page3/3-2.webp', '/images/page3/4-2.webp']}
        letterSrc="/images/page3/letter-bride.webp"
        delay={0.15}
      />
    </div>
  );
}
