import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

export default function Greeting() {
  const { groom, bride } = weddingData;

  return (
    <section style={{
      backgroundColor: colors.bg,
      padding: '60px 24px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      {/* Photo */}
      <ScrollReveal direction="none" delay={0}>
        <div style={{
          width: '80%',
          maxWidth: 320,
          margin: '0 auto',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        }}>
          <img
            src="/images/hero-2.jpg"
            alt="wedding"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </ScrollReveal>

      {/* Names — script style */}
      <ScrollReveal direction="none" delay={0.15}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '32px',
          fontWeight: 300,
          fontStyle: 'italic',
          color: colors.text,
          letterSpacing: '2px',
          marginTop: 48,
          marginBottom: 12,
        }}>
          {groom.nameEn} &amp; {bride.nameEn}
        </p>
      </ScrollReveal>

      {/* Date & Venue */}
      <ScrollReveal direction="none" delay={0.25}>
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '13px',
          fontWeight: 400,
          color: colors.textLight,
          lineHeight: 1.8,
          margin: '0 0 40px',
        }}>
          May 10, 2026 · 2:00 PM<br />
          W Square · 8F Chapel Hall
        </p>
      </ScrollReveal>

      {/* Parents */}
      <ScrollReveal direction="none" delay={0.35}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: 320,
        }}>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '13px',
            color: colors.text,
            lineHeight: 1.8,
            margin: 0,
          }}>
            <span style={{
              color: colors.accentDark,
              fontFamily: fonts.heading,
              fontSize: '12px',
              marginRight: '6px',
            }}>신랑</span>
            {groom.father} · {groom.mother}의 아들&nbsp;
            <strong>{groom.name}</strong>
          </p>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '13px',
            color: colors.text,
            lineHeight: 1.8,
            margin: 0,
          }}>
            <span style={{
              color: colors.accentDark,
              fontFamily: fonts.heading,
              fontSize: '12px',
              marginRight: '6px',
            }}>신부</span>
            {bride.father} · {bride.mother}의 딸&nbsp;
            <strong>{bride.name}</strong>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
