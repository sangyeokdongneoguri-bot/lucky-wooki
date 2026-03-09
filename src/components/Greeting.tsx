import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

const styles = {
  section: {
    backgroundColor: colors.bg,
    padding: '80px 24px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: '11px',
    letterSpacing: '0.3em',
    color: colors.text,
    textTransform: 'lowercase' as const,
    fontWeight: 300,
    marginBottom: '40px',
  },
  greetingTitle: {
    fontFamily: fonts.heading,
    fontSize: '18px',
    fontWeight: 400,
    color: colors.text,
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: '14px',
    lineHeight: 2,
    color: colors.text,
    whiteSpace: 'pre-line' as const,
    marginBottom: '48px',
    maxWidth: '320px',
  },
  parents: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    width: '100%',
    maxWidth: '320px',
  },
  parentRow: {
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.text,
    lineHeight: 1.8,
  },
  parentLabel: {
    color: colors.accentDark,
    fontFamily: fonts.heading,
    fontSize: '12px',
    marginRight: '6px',
  },
};

export default function Greeting() {
  const { greeting, groom, bride } = weddingData;

  return (
    <section style={styles.section}>
      <ScrollReveal direction="none" delay={0}>
        <p style={styles.sectionTitle}>invitation</p>
      </ScrollReveal>

      <ScrollReveal direction="none" delay={0.1}>
        <p style={styles.greetingTitle}>{greeting.title}</p>
      </ScrollReveal>

      <ScrollReveal direction="none" delay={0.2}>
        <p style={styles.message}>{greeting.message}</p>
      </ScrollReveal>

      <ScrollReveal direction="none" delay={0.3}>
        <div style={styles.parents}>
          <p style={styles.parentRow}>
            <span style={styles.parentLabel}>신랑</span>
            {groom.father} · {groom.mother}의 아들&nbsp;
            <strong>{groom.name}</strong>
          </p>
          <p style={styles.parentRow}>
            <span style={styles.parentLabel}>신부</span>
            {bride.father} · {bride.mother}의 딸&nbsp;
            <strong>{bride.name}</strong>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
