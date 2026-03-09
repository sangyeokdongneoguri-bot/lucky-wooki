import { motion } from 'framer-motion';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

function fade(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay, ease: 'easeOut' as const },
  };
}

export default function Hero() {
  const { greeting } = weddingData;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.bg,
        padding: '60px 24px 80px',
      }}
    >
      {/* Photo */}
      <motion.div
        {...fade(0.3)}
        style={{
          width: '80%',
          maxWidth: 320,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <img
          src="/images/hero-1.jpg"
          alt="wedding"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Quote */}
      <motion.div
        {...fade(0.6)}
        style={{
          marginTop: 48,
          textAlign: 'center',
          maxWidth: 320,
        }}
      >
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '14px',
          fontWeight: 300,
          fontStyle: 'italic',
          color: colors.text,
          lineHeight: 1.8,
          margin: '0 0 8px',
          whiteSpace: 'pre-line',
        }}>
          {greeting.quote}
        </p>
        <p style={{
          fontFamily: fonts.body,
          fontSize: '11px',
          color: colors.textLight,
          margin: 0,
        }}>
          — {greeting.quoteSource}
        </p>
      </motion.div>

      {/* Greeting message */}
      <motion.p
        {...fade(0.9)}
        style={{
          fontFamily: fonts.body,
          fontSize: '14px',
          lineHeight: 2,
          color: colors.text,
          textAlign: 'center',
          marginTop: 48,
          maxWidth: 320,
          whiteSpace: 'pre-line',
          wordBreak: 'keep-all',
        }}
      >
        {greeting.message}
      </motion.p>
    </section>
  );
}
