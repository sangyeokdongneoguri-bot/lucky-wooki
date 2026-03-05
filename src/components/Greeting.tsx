import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';

const colors = {
  bg: '#FFF9F5',
  accent: '#D4A574',
  accentDark: '#B8860B',
  text: '#6B5B4E',
  bgAlt: '#F5E6D3',
  border: '#E8D5C4',
};

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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '13px',
    letterSpacing: '0.35em',
    color: colors.accent,
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  },
  titleUnderline: {
    width: '32px',
    height: '1px',
    backgroundColor: colors.accent,
    margin: '0 auto 32px',
  },
  florals: {
    marginBottom: '28px',
  },
  greetingTitle: {
    fontFamily: "'Noto Serif KR', serif",
    fontSize: '18px',
    fontWeight: 400,
    color: colors.text,
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  message: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '14px',
    lineHeight: 2,
    color: colors.text,
    whiteSpace: 'pre-line' as const,
    marginBottom: '40px',
    maxWidth: '320px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    width: '100%',
    maxWidth: '280px',
    justifyContent: 'center',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.border,
  },
  dividerDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: colors.accent,
  },
  parents: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    width: '100%',
    maxWidth: '320px',
  },
  parentRow: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '13px',
    color: colors.text,
    lineHeight: 1.8,
  },
  parentLabel: {
    color: colors.accentDark,
    fontFamily: "'Noto Serif KR', serif",
    fontSize: '12px',
    marginRight: '6px',
  },
};

function FloralSVG() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* left branch */}
      <path d="M10 50 Q25 30 45 35" stroke={colors.accent} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M20 45 Q22 32 32 30" stroke={colors.accent} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M30 42 Q28 28 38 26" stroke={colors.accent} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* left leaves */}
      <ellipse cx="32" cy="30" rx="7" ry="3.5" transform="rotate(-30 32 30)" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.7" />
      <ellipse cx="20" cy="38" rx="6" ry="3" transform="rotate(-50 20 38)" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.7" />
      {/* center flower */}
      <circle cx="60" cy="28" r="5" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="1" />
      <circle cx="60" cy="28" r="2" fill={colors.accent} />
      <circle cx="60" cy="20" r="3" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.8" />
      <circle cx="67" cy="23" r="3" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.8" />
      <circle cx="53" cy="23" r="3" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.8" />
      <circle cx="67" cy="33" r="3" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.8" />
      <circle cx="53" cy="33" r="3" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.8" />
      {/* right branch */}
      <path d="M110 50 Q95 30 75 35" stroke={colors.accent} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M100 45 Q98 32 88 30" stroke={colors.accent} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M90 42 Q92 28 82 26" stroke={colors.accent} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* right leaves */}
      <ellipse cx="88" cy="30" rx="7" ry="3.5" transform="rotate(30 88 30)" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.7" />
      <ellipse cx="100" cy="38" rx="6" ry="3" transform="rotate(50 100 38)" fill={colors.bgAlt} stroke={colors.accent} strokeWidth="0.7" />
    </svg>
  );
}

export default function Greeting() {
  const { greeting, groom, bride } = weddingData;

  return (
    <section style={styles.section}>
      <ScrollReveal direction="up" delay={0}>
        <p style={styles.sectionTitle}>Invitation</p>
        <div style={styles.titleUnderline} />
      </ScrollReveal>

      <ScrollReveal direction="none" delay={0.1}>
        <div style={styles.florals}>
          <FloralSVG />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p style={styles.greetingTitle}>{greeting.title}</p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <p style={styles.message}>{greeting.message}</p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <div style={styles.dividerDot} />
          <div style={styles.dividerLine} />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.5}>
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
