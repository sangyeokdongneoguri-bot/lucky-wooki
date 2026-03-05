import ScrollReveal from './ScrollReveal';
import useCountdown from '../hooks/useCountdown';
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
    backgroundColor: colors.bgAlt,
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
    margin: '0 auto 12px',
  },
  dateLabel: {
    fontFamily: "'Noto Serif KR', serif",
    fontSize: '15px',
    color: colors.text,
    marginBottom: '32px',
    letterSpacing: '0.08em',
  },
  calendarWrap: {
    backgroundColor: colors.bg,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    padding: '24px 20px',
    width: '100%',
    maxWidth: '340px',
    marginBottom: '40px',
  },
  monthTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '20px',
    color: colors.accentDark,
    marginBottom: '16px',
    letterSpacing: '0.05em',
  },
  calGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  dayHeader: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '11px',
    color: colors.accent,
    textAlign: 'center' as const,
    paddingBottom: '8px',
    fontWeight: 600,
  },
  dayCell: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '13px',
    color: colors.text,
    textAlign: 'center' as const,
    padding: '6px 2px',
    lineHeight: 1,
    borderRadius: '50%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellHighlight: {
    backgroundColor: colors.accent,
    color: '#fff',
    borderRadius: '50%',
    fontWeight: 700,
  },
  dayCellSun: {
    color: '#C97B7B',
  },
  dayCellSat: {
    color: '#7B8EC9',
  },
  dayCellEmpty: {
    visibility: 'hidden' as const,
  },
  countdownWrap: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countUnit: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '6px',
  },
  countBox: {
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(107,91,78,0.08)',
  },
  countNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px',
    fontWeight: 600,
    color: colors.accentDark,
    lineHeight: 1,
  },
  countLabel: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '10px',
    color: colors.text,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
  countSep: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '24px',
    color: colors.accent,
    lineHeight: 1,
    marginBottom: '18px',
  },
  expiredMsg: {
    fontFamily: "'Noto Serif KR', serif",
    fontSize: '15px',
    color: colors.accentDark,
  },
};

// October 2025 starts on Wednesday (index 3, 0=Sun)
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HIGHLIGHT_DAY = 18;
const MONTH_START_DOW = 3; // Wednesday
const DAYS_IN_MONTH = 31;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Calendar() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingData.dDay);

  const cells: (number | null)[] = [
    ...Array(MONTH_START_DOW).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section style={styles.section}>
      <ScrollReveal direction="up" delay={0}>
        <p style={styles.sectionTitle}>Calendar</p>
        <div style={styles.titleUnderline} />
        <p style={styles.dateLabel}>2025년 10월 18일 토요일</p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <div style={styles.calendarWrap}>
          <p style={styles.monthTitle}>October 2025</p>
          <div style={styles.calGrid}>
            {DAYS_OF_WEEK.map((d, i) => (
              <div
                key={d}
                style={{
                  ...styles.dayHeader,
                  color: i === 0 ? '#C97B7B' : i === 6 ? '#7B8EC9' : colors.accent,
                }}
              >
                {d}
              </div>
            ))}
            {cells.map((day, idx) => {
              if (day === null) {
                return <div key={`e-${idx}`} style={styles.dayCellEmpty} />;
              }
              const col = idx % 7;
              const isHighlight = day === HIGHLIGHT_DAY;
              const isSun = col === 0;
              const isSat = col === 6;
              const cellStyle = {
                ...styles.dayCell,
                ...(isHighlight ? styles.dayCellHighlight : {}),
                ...(!isHighlight && isSun ? styles.dayCellSun : {}),
                ...(!isHighlight && isSat ? styles.dayCellSat : {}),
              };
              return (
                <div key={day} style={cellStyle}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        {isExpired ? (
          <p style={styles.expiredMsg}>결혼식이 진행되었습니다 ♥</p>
        ) : (
          <div style={styles.countdownWrap}>
            <div style={styles.countUnit}>
              <div style={styles.countBox}>
                <span style={styles.countNumber}>{String(days)}</span>
              </div>
              <span style={styles.countLabel}>Days</span>
            </div>
            <span style={styles.countSep}>:</span>
            <div style={styles.countUnit}>
              <div style={styles.countBox}>
                <span style={styles.countNumber}>{pad(hours)}</span>
              </div>
              <span style={styles.countLabel}>Hours</span>
            </div>
            <span style={styles.countSep}>:</span>
            <div style={styles.countUnit}>
              <div style={styles.countBox}>
                <span style={styles.countNumber}>{pad(minutes)}</span>
              </div>
              <span style={styles.countLabel}>Min</span>
            </div>
            <span style={styles.countSep}>:</span>
            <div style={styles.countUnit}>
              <div style={styles.countBox}>
                <span style={styles.countNumber}>{pad(seconds)}</span>
              </div>
              <span style={styles.countLabel}>Sec</span>
            </div>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
