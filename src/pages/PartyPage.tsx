import { motion } from 'framer-motion';
import { partyData } from '../data/party';
import ScrollReveal from '../components/ScrollReveal';
import useCountdown from '../hooks/useCountdown';

const PINK = '#FF69B4';
const RED = '#FF0000';
const GOLD = '#B8960C';
const LIGHT_BLUE = '#E0F4FF';

// Cloud shape using CSS border-radius
function Cloud({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* main body */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            height: '60%',
            backgroundColor: '#fff',
            borderRadius: '50px',
          }}
        />
        {/* left puff */}
        <div
          style={{
            position: 'absolute',
            bottom: '35%',
            left: '5%',
            width: '45%',
            height: '60%',
            backgroundColor: '#fff',
            borderRadius: '50%',
          }}
        />
        {/* right puff */}
        <div
          style={{
            position: 'absolute',
            bottom: '35%',
            right: '5%',
            width: '40%',
            height: '55%',
            backgroundColor: '#fff',
            borderRadius: '50%',
          }}
        />
        {/* center top puff */}
        <div
          style={{
            position: 'absolute',
            bottom: '45%',
            left: '30%',
            width: '40%',
            height: '65%',
            backgroundColor: '#fff',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}

// Sun peeking from top-right
function Sun() {
  return (
    <div
      style={{
        position: 'absolute',
        top: -40,
        right: 30,
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: '#FFD700',
        boxShadow: '0 0 30px 10px rgba(255,215,0,0.4)',
        zIndex: 1,
      }}
    />
  );
}

function HeartBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '2px solid #4CAF50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        ...style,
      }}
    >
      ♥
    </div>
  );
}

const circleNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦'];

export default function PartyPage() {
  const countdown = useCountdown(partyData.dDay);

  const containerStyle: React.CSSProperties = {
    maxWidth: 480,
    margin: '0 auto',
    backgroundColor: '#fff',
    fontFamily: "'Noto Sans KR', sans-serif",
    overflowX: 'hidden',
  };

  // ── Hero Section ──────────────────────────────────────────────────
  const heroStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: LIGHT_BLUE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 24px 48px',
  };

  // ── Info Section ──────────────────────────────────────────────────
  const infoSectionStyle: React.CSSProperties = {
    padding: '48px 24px',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  // ── Notes Section ─────────────────────────────────────────────────
  const notesSectionStyle: React.CSSProperties = {
    padding: '48px 24px',
    backgroundColor: '#FFF0F8',
    textAlign: 'center',
  };

  const noteCardStyle: React.CSSProperties = {
    backgroundColor: PINK,
    borderRadius: 24,
    padding: '28px 24px',
    textAlign: 'left',
    marginTop: 24,
  };

  // ── Footer ────────────────────────────────────────────────────────
  const footerStyle: React.CSSProperties = {
    padding: '48px 24px 64px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  return (
    <div style={containerStyle}>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={heroStyle}>
        {/* Sky background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #87CEEB 0%, #E0F4FF 40%, #fff 100%)',
            zIndex: 0,
          }}
        />

        {/* Sun */}
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, width: 140, height: 140 }}>
          <Sun />
        </div>

        {/* Clouds */}
        <Cloud style={{ top: 10, left: -20, width: 180, height: 90, zIndex: 2 }} />
        <Cloud style={{ top: 60, right: 20, width: 140, height: 70, zIndex: 2 }} />
        <Cloud style={{ top: 120, left: 60, width: 120, height: 60, zIndex: 2 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, width: '100%', textAlign: 'center' }}>
          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 8,
                letterSpacing: '-1px',
              }}
            >
              <span style={{ color: PINK }}>파티는</span>
              <br />
              <span style={{ color: RED }}>핑계고</span>
            </div>
          </motion.div>

          {/* Date subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#333',
                margin: '12px 0 32px',
              }}
            >
              4월 11일 토요일에 만나요!
            </p>
          </motion.div>

          {/* Couple photo placeholder + names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16 }}
          >
            {/* Bride name */}
            <div style={{ textAlign: 'center', paddingBottom: 16 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: PINK,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: 4,
                }}
              >
                {partyData.bride.name}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>bride</div>
            </div>

            {/* Photo placeholder */}
            <div
              style={{
                width: 220,
                height: 300,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #FFB6D9 0%, #FFD6EC 50%, #FFC0CB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(255,105,180,0.3)',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 48 }}>💑</span>
            </div>

            {/* Groom name */}
            <div style={{ textAlign: 'center', paddingBottom: 16 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: RED,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: 4,
                }}
              >
                {partyData.groom.name}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>groom</div>
            </div>
          </motion.div>

          {/* Countdown */}
          {!countdown.isExpired && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
              }}
            >
              {[
                { label: 'DAY', value: countdown.days },
                { label: 'HRS', value: countdown.hours },
                { label: 'MIN', value: countdown.minutes },
                { label: 'SEC', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: '8px 12px',
                    minWidth: 52,
                    boxShadow: '0 2px 12px rgba(255,105,180,0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: PINK,
                      lineHeight: 1,
                    }}
                  >
                    {String(value).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 9, color: '#aaa', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          )}
          {countdown.isExpired && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{ marginTop: 24, fontSize: 16, color: PINK, fontWeight: 700 }}
            >
              파티가 열렸어요! 🎉
            </motion.p>
          )}
        </div>
      </section>

      {/* ── INFO SECTION ──────────────────────────────────────────── */}
      <section style={infoSectionStyle}>
        <ScrollReveal direction="up" delay={0}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: PINK,
              letterSpacing: 12,
              margin: '0 0 32px',
            }}
          >
            초 대 장
          </h2>
        </ScrollReveal>

        {/* Group photo placeholder */}
        <ScrollReveal direction="up" delay={0.1}>
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <div
              style={{
                width: '100%',
                height: 200,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #FFD6EC 0%, #FFE4B5 50%, #FFB6D9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255,105,180,0.2)',
              }}
            >
              <span style={{ fontSize: 40 }}>🎊</span>
            </div>
            {/* Heart badges overlay */}
            <HeartBadge
              style={{
                position: 'absolute',
                bottom: -10,
                left: '20%',
                color: PINK,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            <HeartBadge
              style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                color: RED,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            <HeartBadge
              style={{
                position: 'absolute',
                bottom: -10,
                right: '20%',
                color: PINK,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Event details */}
        <ScrollReveal direction="up" delay={0.2}>
          <div style={{ marginTop: 28, lineHeight: 2 }}>
            <p style={{ fontSize: 17, fontWeight: 600, color: '#444', margin: '0 0 4px' }}>
              4월 11일(토) {partyData.timeLabel}
            </p>
            <p
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: '#111',
                margin: '8px 0',
              }}
            >
              {partyData.location.name}
            </p>
            <p style={{ fontSize: 14, color: '#666', margin: '4px 0' }}>
              {partyData.location.address}
            </p>
            <p style={{ fontSize: 13, color: '#999', margin: '4px 0' }}>
              ({partyData.location.transport})
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── NOTES SECTION ─────────────────────────────────────────── */}
      <section style={notesSectionStyle}>
        <ScrollReveal direction="up" delay={0}>
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: PINK,
                display: 'block',
              }}
            >
              유의사항
            </span>
            <span
              style={{
                fontSize: 16,
                fontStyle: 'italic',
                color: '#C06090',
                fontFamily: 'Georgia, serif',
              }}
            >
              Pre-Wedding party
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div style={noteCardStyle}>
            {partyData.notes.map((note, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: i < partyData.notes.length - 1 ? 16 : 0,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {circleNumbers[i]}
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: '#fff',
                    fontWeight: 500,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {note}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
          <p
            style={{
              fontSize: 13,
              color: '#888',
              marginTop: 24,
              lineHeight: 1.7,
            }}
          >
            {partyData.closingNote}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: GOLD,
              marginTop: 12,
              fontFamily: 'Georgia, serif',
              letterSpacing: 0.5,
            }}
          >
            {partyData.groom.fullNameEn} &amp; {partyData.bride.fullNameEn}
          </p>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={footerStyle}>
        <ScrollReveal direction="up" delay={0}>
          <p
            style={{
              fontSize: 20,
              fontWeight: 900,
              background: `linear-gradient(90deg, ${PINK}, ${RED})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            청첩장파티에 초대되신 여러분 환영합니다.
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
