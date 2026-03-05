import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

type TabKey = 'groom' | 'bride';

interface AccountRowProps {
  label: string;
  bank: string;
  number: string;
  holder: string;
  onCopy: (text: string) => void;
}

function AccountRow({ label, bank, number, holder, onCopy }: AccountRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '10px',
    }}>
      {/* Accordion Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: open ? colors.bgAlt : colors.white,
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <span style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          color: colors.text,
        }}>
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'inline-block',
            color: colors.textLight,
            fontSize: '16px',
            lineHeight: 1,
          }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '14px 16px 16px',
              background: colors.white,
              borderTop: `1px solid ${colors.border}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '12px',
                    color: colors.textLight,
                    margin: '0 0 4px',
                  }}>
                    {bank}
                  </p>
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: colors.text,
                    margin: '0 0 2px',
                    letterSpacing: '0.5px',
                  }}>
                    {number}
                  </p>
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '12px',
                    color: colors.textLight,
                    margin: 0,
                  }}>
                    {holder}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCopy(`${bank} ${number} (${holder})`)}
                  style={{
                    background: colors.accent,
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    color: colors.white,
                    cursor: 'pointer',
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  복사
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Account() {
  const [activeTab, setActiveTab] = useState<TabKey>('groom');
  const [toast, setToast] = useState(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback: do nothing
    }
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'groom', label: '신랑측' },
    { key: 'bride', label: '신부측' },
  ];

  const currentData = weddingData[activeTab];

  return (
    <section style={{ background: colors.bgAlt, padding: '60px 20px' }}>
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
            Gift
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '4px',
            margin: '0 0 6px',
          }}>
            CONGRATULATORY MONEY
          </h2>
          <p style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: '13px',
            color: colors.textLight,
            margin: '0 0 16px',
          }}>
            마음 전하실 곳
          </p>
          <div style={{
            width: '40px',
            height: '1px',
            background: colors.accent,
            margin: '0 auto',
          }} />
        </div>
      </ScrollReveal>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Tab Bar */}
        <ScrollReveal delay={0.1}>
          <div style={{
            display: 'flex',
            position: 'relative',
            background: colors.white,
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '24px',
            border: `1px solid ${colors.border}`,
          }}>
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex: 1,
                  position: 'relative',
                  padding: '10px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '14px',
                  fontWeight: activeTab === key ? 700 : 400,
                  color: activeTab === key ? colors.text : colors.textLight,
                  transition: 'color 0.2s',
                  zIndex: 1,
                }}
              >
                {label}
                {activeTab === key && (
                  <motion.div
                    layoutId="tabIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      background: colors.accent,
                      borderRadius: '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {/* Main account */}
            <AccountRow
              label={`${currentData.name} 계좌`}
              bank={currentData.account.bank}
              number={currentData.account.number}
              holder={currentData.account.holder}
              onCopy={copyText}
            />

            {/* Parent account */}
            <AccountRow
              label={`${activeTab === 'groom' ? weddingData.groom.father : weddingData.bride.father} 계좌`}
              bank={currentData.parentAccount.bank}
              number={currentData.parentAccount.number}
              holder={currentData.parentAccount.holder}
              onCopy={copyText}
            />

            {/* Quick transfer buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <motion.a
                href={currentData.kakaopayUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#FAE100',
                  color: '#3C1E1E',
                  borderRadius: '12px',
                  padding: '14px 0',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <span>💛</span> 카카오페이
              </motion.a>

              <motion.a
                href={currentData.tossUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#0064FF',
                  color: colors.white,
                  borderRadius: '12px',
                  padding: '14px 0',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,100,255,0.3)',
                }}
              >
                <span>💙</span> 토스
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(107, 91, 78, 0.92)',
              color: colors.white,
              borderRadius: '24px',
              padding: '10px 22px',
              fontSize: '13px',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: 500,
              zIndex: 2000,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            복사되었습니다
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
