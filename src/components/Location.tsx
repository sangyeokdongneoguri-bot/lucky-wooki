import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';

const colors = {
  bg: '#FFF9F5',
  accent: '#D4A574',
  accentDark: '#B8860B',
  text: '#6B5B4E',
  bgAlt: '#F5E6D3',
  border: '#E8D5C4',
  textLight: '#9B8B7E',
  white: '#FFFFFF',
};

const { location } = weddingData;

const mapUrls = {
  kakao: `https://map.kakao.com/link/map/더라움,${location.lat},${location.lng}`,
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`,
  tmap: `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodeURIComponent('더라움')}&lon=${location.lng}&lat=${location.lat}`,
};

export default function Location() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <section style={{ background: colors.bg, padding: '60px 20px' }}>
      {/* Section Header */}
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '11px',
            letterSpacing: '4px',
            color: colors.accent,
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>
            Venue
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '6px',
            margin: 0,
          }}>
            LOCATION
          </h2>
          <div style={{
            width: '40px',
            height: '1px',
            background: colors.accent,
            margin: '16px auto 0',
          }} />
        </div>
      </ScrollReveal>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Venue Info */}
        <ScrollReveal delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '22px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 6px',
            }}>
              {location.name}
            </h3>
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: '13px',
              color: colors.textLight,
              margin: '0 0 16px',
            }}>
              {location.hall}
            </p>

            {/* Address + Copy */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: '13px',
                color: colors.textLight,
              }}>
                {location.address}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={copyAddress}
                style={{
                  background: copied ? colors.accent : 'transparent',
                  border: `1px solid ${colors.accent}`,
                  borderRadius: '20px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  color: copied ? colors.white : colors.accent,
                  cursor: 'pointer',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? '복사됨' : '복사'}
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Map Placeholder */}
        <ScrollReveal delay={0.2}>
          <div style={{
            background: '#E8DDD5',
            borderRadius: '16px',
            height: '220px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${colors.border}`,
          }}>
            {/* Decorative grid lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(107,91,78,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(107,91,78,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }} />

            {/* Map pin icon */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                <path
                  d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26S36 31.5 36 18C36 8.06 27.94 0 18 0z"
                  fill={colors.accent}
                />
                <circle cx="18" cy="18" r="7" fill={colors.white} />
              </svg>
              <div style={{
                background: 'rgba(255,249,245,0.92)',
                borderRadius: '8px',
                padding: '6px 14px',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: colors.text,
                  margin: '0 0 2px',
                }}>
                  {location.name}
                </p>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '11px',
                  color: colors.textLight,
                  margin: 0,
                }}>
                  {location.address}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Navigation Buttons */}
        <ScrollReveal delay={0.3}>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '36px',
          }}>
            {[
              { label: '카카오맵', url: mapUrls.kakao, bg: '#FAE100', color: '#3C1E1E' },
              { label: '네이버지도', url: mapUrls.naver, bg: '#03C75A', color: colors.white },
              { label: '티맵', url: mapUrls.tmap, bg: '#FF6200', color: colors.white },
            ].map(({ label, url, bg, color }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-block',
                  background: bg,
                  color,
                  borderRadius: '24px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: "'Noto Sans KR', sans-serif",
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  letterSpacing: '0.2px',
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* Transport Info */}
        <ScrollReveal delay={0.4}>
          <div style={{
            background: colors.bgAlt,
            borderRadius: '16px',
            padding: '24px 20px',
            border: `1px solid ${colors.border}`,
          }}>
            <h4 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 18px',
              letterSpacing: '1px',
              textAlign: 'center',
            }}>
              교통 안내
            </h4>
            {[
              { icon: '🚇', label: '지하철', desc: location.transport.subway },
              { icon: '🚌', label: '버스', desc: location.transport.bus },
              { icon: '🚗', label: '주차', desc: location.transport.parking },
            ].map(({ icon, label, desc }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: '1.6', flexShrink: 0 }}>{icon}</span>
                <div>
                  <span style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.accent,
                    display: 'block',
                    marginBottom: '2px',
                    letterSpacing: '0.5px',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '12px',
                    color: colors.textLight,
                    lineHeight: '1.6',
                  }}>
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
