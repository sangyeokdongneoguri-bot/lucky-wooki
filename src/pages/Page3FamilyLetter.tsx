import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const { groom, bride } = weddingData;

export default function Page3FamilyLetter() {

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
      {/* Family photos */}
      <ScrollReveal>
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <img
          src="/images/page4/4-1.webp"
          alt=""
          style={{
            width: '50%',
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
        <img
          src="/images/page4/4-2.webp"
          alt=""
          style={{
            width: '50%',
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      </div>
      </ScrollReveal>

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
