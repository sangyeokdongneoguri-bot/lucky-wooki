import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

export default function InfoNotice() {
  return (
    <section style={{
      background: colors.bg,
      padding: '48px 20px',
    }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{
            background: colors.bgAlt,
            borderRadius: '4px',
            padding: '28px 24px',
            border: `1px solid ${colors.border}`,
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: fonts.body,
              fontSize: '14px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 20px',
              lineHeight: 1.8,
            }}>
              축하 화환은 감사하지만 정중히 사양합니다.
            </p>

            <div style={{
              height: '1px',
              background: colors.border,
              margin: '0 0 20px',
            }} />

            <p style={{
              fontFamily: fonts.body,
              fontSize: '13px',
              color: colors.textLight,
              margin: '0 0 8px',
            }}>
              무료 주차 2시간 제공
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '16px',
            }}>
              {[
                { label: '예식', detail: `${weddingData.ceremony.floor} · ${weddingData.ceremony.time}` },
                { label: '식사', detail: `${weddingData.dining.floor} · ${weddingData.dining.time}` },
              ].map(({ label, detail }) => (
                <div key={label} style={{
                  flex: 1,
                  background: colors.white,
                  borderRadius: '4px',
                  padding: '14px 12px',
                  textAlign: 'center',
                  border: `1px solid ${colors.border}`,
                }}>
                  <p style={{
                    fontFamily: fonts.body,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.accentDark,
                    letterSpacing: '1px',
                    marginBottom: '6px',
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: fonts.body,
                    fontSize: '12px',
                    color: colors.text,
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
