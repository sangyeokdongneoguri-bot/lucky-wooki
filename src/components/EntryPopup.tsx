import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, fonts } from '../styles/theme';

const STORAGE_KEY = 'wedding-visited';

interface EntryPopupProps {
  onEnter: () => void;
}

export default function EntryPopup({ onEnter }: EntryPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem(STORAGE_KEY);
    if (visited) {
      onEnter();
    } else {
      setVisible(true);
    }
  }, [onEnter]);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors.bg,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '40px 28px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: fonts.heading,
              fontSize: '20px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 24px',
              letterSpacing: '2px',
            }}>
              참석 정보
            </p>

            <p style={{
              fontFamily: fonts.body,
              fontSize: '13px',
              lineHeight: 2,
              color: colors.textLight,
              margin: '0 0 36px',
              wordBreak: 'keep-all',
            }}>
              참석의 부담을 드리기보다,<br />
              정성껏 준비하기 위해 여쭙는 것이니<br />
              참석 정보를 알려주시면 감사하겠습니다.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '40px',
            }}>
              {/* Groom & Bride */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.text} style={{ flexShrink: 0 }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span style={{
                  fontFamily: fonts.body,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: colors.text,
                }}>
                  신랑 성기욱 &amp; 신부 이소연
                </span>
              </div>

              {/* Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span style={{
                  fontFamily: fonts.body,
                  fontSize: '14px',
                  color: colors.text,
                }}>
                  2026년 5월 10일 일요일 오후 2시
                </span>
              </div>

              {/* Location */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{
                  fontFamily: fonts.body,
                  fontSize: '14px',
                  color: colors.text,
                }}>
                  판교 더블유스퀘어 8층 채플홀
                </span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '16px',
                background: colors.text,
                color: colors.white,
                border: 'none',
                borderRadius: '2px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: fonts.body,
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
            >
              확인
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
