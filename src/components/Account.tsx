import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { weddingData } from '../data/wedding';
import { colors, fonts } from '../styles/theme';

interface AccountRowProps {
  label: string;
  bank: string;
  number: string;
  holder: string;
  onCopy: (text: string) => void;
}

function AccountRow({ label, bank, number, holder, onCopy }: AccountRowProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      background: colors.white,
      borderBottom: `1px solid ${colors.border}`,
    }}>
      <div>
        <p style={{
          fontFamily: fonts.body,
          fontSize: '12px',
          color: colors.textLight,
          margin: '0 0 4px',
        }}>
          {bank} · {label}
        </p>
        <p style={{
          fontFamily: fonts.body,
          fontSize: '15px',
          fontWeight: 700,
          color: colors.text,
          margin: '0 0 2px',
          letterSpacing: '0.5px',
        }}>
          {number}
        </p>
        <p style={{
          fontFamily: fonts.body,
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
          background: 'transparent',
          border: `1px solid ${colors.text}`,
          borderRadius: '20px',
          padding: '8px 14px',
          fontSize: '12px',
          color: colors.text,
          cursor: 'pointer',
          fontFamily: fonts.body,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        복사
      </motion.button>
    </div>
  );
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '12px',
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          background: colors.white,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: fonts.body,
          fontSize: '15px',
          fontWeight: 700,
          color: colors.text,
        }}>
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'inline-block',
            color: colors.accent,
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
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Account() {
  const [toast, setToast] = useState(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const { groom, bride } = weddingData;

  return (
    <section style={{ background: colors.bgAlt, padding: '60px 20px' }}>
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
            gift
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: '28px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '4px',
            margin: '0 0 6px',
          }}>
            마음 전하실 곳
          </h2>
          <div style={{
            width: '40px',
            height: '1px',
            background: colors.border,
            margin: '0 auto',
          }} />
        </div>
      </ScrollReveal>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Groom Side */}
        <AccordionSection title="신랑측">
          <AccountRow
            label={groom.name}
            bank={groom.account.bank}
            number={groom.account.number}
            holder={groom.account.holder}
            onCopy={copyText}
          />
          <AccountRow
            label={`아버지 ${groom.father}`}
            bank={groom.parentAccount.bank}
            number={groom.parentAccount.number}
            holder={groom.parentAccount.holder}
            onCopy={copyText}
          />
          <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', background: colors.white }}>
            <motion.a
              href={groom.kakaopayUrl}
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
                borderRadius: '4px',
                padding: '12px 0',
                fontFamily: fonts.body,
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              카카오페이
            </motion.a>
            <motion.a
              href={groom.tossUrl}
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
                borderRadius: '4px',
                padding: '12px 0',
                fontFamily: fonts.body,
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              토스
            </motion.a>
          </div>
        </AccordionSection>

        {/* Bride Side */}
        <AccordionSection title="신부측">
          <AccountRow
            label={bride.name}
            bank={bride.account.bank}
            number={bride.account.number}
            holder={bride.account.holder}
            onCopy={copyText}
          />
          <AccountRow
            label={`아버지 ${bride.father}`}
            bank={bride.parentAccount.bank}
            number={bride.parentAccount.number}
            holder={bride.parentAccount.holder}
            onCopy={copyText}
          />
          <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', background: colors.white }}>
            <motion.a
              href={bride.kakaopayUrl}
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
                borderRadius: '4px',
                padding: '12px 0',
                fontFamily: fonts.body,
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              카카오페이
            </motion.a>
            <motion.a
              href={bride.tossUrl}
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
                borderRadius: '4px',
                padding: '12px 0',
                fontFamily: fonts.body,
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              토스
            </motion.a>
          </div>
        </AccordionSection>
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
              background: 'rgba(0,0,0,0.8)',
              color: colors.white,
              borderRadius: '2px',
              padding: '10px 22px',
              fontSize: '13px',
              fontFamily: fonts.body,
              fontWeight: 500,
              zIndex: 2000,
              whiteSpace: 'nowrap',
            }}
          >
            복사되었습니다
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
