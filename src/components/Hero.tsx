import { motion } from 'framer-motion';
import { weddingData } from '../data/wedding';

const styles = {
  section: {
    position: 'relative' as const,
    width: '100%',
    height: '100vh',
    minHeight: '600px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: 'url(https://picsum.photos/seed/wedding-hero/800/1200)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'rgba(107, 91, 78, 0.4)',
    zIndex: 1,
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center' as const,
    padding: '0 24px',
  },
  label: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '13px',
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase' as const,
  },
  divider: {
    width: '40px',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: '0 auto',
  },
  names: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '44px',
    fontWeight: 300,
    color: '#fff',
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  separator: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1,
  },
  date: {
    fontFamily: "'Noto Serif KR', serif",
    fontSize: '15px',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: '0.1em',
  },
  scroll: {
    position: 'absolute' as const,
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '6px',
  },
  scrollLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '11px',
    letterSpacing: '0.25em',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase' as const,
  },
};

function fadeProps(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' as const },
  };
}

export default function Hero() {
  const { groom, bride, date, time } = weddingData;

  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHour = h > 12 ? h - 12 : h;
  const formattedDate = `${year}. ${month}. ${day} SUN ${ampm} ${displayHour}:${minute}`;

  return (
    <section style={styles.section}>
      <div style={styles.bg} />
      <div style={styles.overlay} />

      <div style={styles.content}>
        <motion.p style={styles.label} {...fadeProps(0.2)}>
          We Are Getting Married
        </motion.p>

        <motion.div style={styles.divider} {...fadeProps(0.4)} />

        <motion.div style={styles.names} {...fadeProps(0.6)}>
          <span style={styles.name}>{groom.name}</span>
          <span style={styles.separator}>♥</span>
          <span style={styles.name}>{bride.name}</span>
        </motion.div>

        <motion.div style={styles.divider} {...fadeProps(0.8)} />

        <motion.p style={styles.date} {...fadeProps(1.0)}>
          {formattedDate}
        </motion.p>
      </div>

      <motion.div
        style={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span style={styles.scrollLabel}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
