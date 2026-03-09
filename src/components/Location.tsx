import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

const { location } = weddingData;

const mapUrls = {
  kakao: `https://map.kakao.com/link/map/${encodeURIComponent(location.name)},${location.lat},${location.lng}`,
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`,
  tmap: `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodeURIComponent(location.name)}&lon=${location.lng}&lat=${location.lat}`,
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
            fontFamily: fonts.heading,
            fontSize: '11px',
            letterSpacing: '4px',
            color: colors.accent,
            marginBottom: '8px',
            textTransform: 'lowercase',
          }}>
            venue
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: '32px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '6px',
            margin: 0,
            textTransform: 'lowercase',
          }}>
            location
          </h2>
          <div style={{
            width: '40px',
            height: '1px',
            background: colors.border,
            margin: '16px auto 0',
          }} />
        </div>
      </ScrollReveal>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Venue Info */}
        <ScrollReveal delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: fonts.heading,
              fontSize: '22px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 6px',
            }}>
              {location.name}
            </h3>
            <p style={{
              fontFamily: fonts.body,
              fontSize: '13px',
              color: colors.textLight,
              margin: '0 0 4px',
            }}>
              {location.hall}
            </p>
            <p style={{
              fontFamily: fonts.body,
              fontSize: '13px',
              color: colors.textLight,
              margin: '0 0 16px',
            }}>
              Tel {location.tel}
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
                fontFamily: fonts.body,
                fontSize: '13px',
                color: colors.textLight,
              }}>
                {location.address}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={copyAddress}
                style={{
                  background: copied ? colors.text : 'transparent',
                  border: `1px solid ${colors.text}`,
                  borderRadius: '20px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  color: copied ? colors.white : colors.text,
                  cursor: 'pointer',
                  fontFamily: fonts.body,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? '복사됨' : '복사'}
              </motion.button>
            </div>

            <p style={{
              fontFamily: fonts.body,
              fontSize: '12px',
              color: colors.accent,
              margin: '12px 0 0',
            }}>
              판교역 1번 출구에서 도보 약 6분 거리입니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Map Image */}
        <ScrollReveal delay={0.2}>
          <div style={{
            marginBottom: '24px',
            borderRadius: '4px',
            overflow: 'hidden',
            border: `1px solid ${colors.border}`,
          }}>
            <img
              src={location.mapImage}
              alt="오시는 길 약도"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
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
              { label: '카카오맵', url: mapUrls.kakao },
              { label: '네이버지도', url: mapUrls.naver },
              { label: '티맵', url: mapUrls.tmap },
            ].map(({ label, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: colors.text,
                  border: `1px solid ${colors.text}`,
                  borderRadius: '24px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: fonts.body,
                  textDecoration: 'none',
                  letterSpacing: '0.2px',
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* Transport Info */}
        <ScrollReveal delay={0.35}>
          <div style={{
            background: colors.bgAlt,
            borderRadius: '4px',
            padding: '24px 20px',
            border: `1px solid ${colors.border}`,
          }}>
            <h4 style={{
              fontFamily: fonts.heading,
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
              { icon: '🚗', label: '주차', desc: location.transport.parking },
            ].filter(({ desc }) => desc).map(({ icon, label, desc }) => (
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
                    fontFamily: fonts.body,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.accentDark,
                    display: 'block',
                    marginBottom: '2px',
                    letterSpacing: '0.5px',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: fonts.body,
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
