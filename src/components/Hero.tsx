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
  const { groom, bride, date } = weddingData;
  const [year, month, day] = date.split('-');

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg,
        padding: '80px 32px',
      }}
    >
      {/* Photo */}
      <motion.div
        {...fade(0.3)}
        style={{
          width: '65%',
          maxWidth: 280,
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <img
          src={weddingData.gallery[0]?.src}
          alt="wedding"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
          }}
        />
      </motion.div>

      {/* Names */}
      <motion.p
        {...fade(0.6)}
        style={{
          fontFamily: fonts.heading,
          fontSize: '18px',
          fontWeight: 300,
          color: colors.text,
          letterSpacing: '0.08em',
          marginTop: 40,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {groom.nameEn.toLowerCase()} &amp; {bride.nameEn.toLowerCase()}
      </motion.p>

      {/* Date */}
      <motion.p
        {...fade(0.8)}
        style={{
          fontFamily: fonts.heading,
          fontSize: '14px',
          fontWeight: 300,
          color: colors.textLight,
          letterSpacing: '0.1em',
          marginTop: 12,
          textAlign: 'center',
        }}
      >
        {year}. {month}. {day}.
      </motion.p>

      {/* Bottom quote */}
      <motion.p
        {...fade(1.0)}
        style={{
          fontFamily: fonts.heading,
          fontSize: '12px',
          fontWeight: 300,
          color: colors.textLight,
          letterSpacing: '0.05em',
          lineHeight: 1.8,
          marginTop: 48,
          textAlign: 'center',
          maxWidth: 300,
        }}
      >
        After a long time of preparation, our story is finally taking the stage.
        <br />
        We invite you to witness this special scene.
      </motion.p>
    </section>
  );
}
