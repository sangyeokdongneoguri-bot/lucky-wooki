import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { colors, fonts } from '../styles/theme';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'none',
  border: 'none',
  borderBottom: `1px solid ${colors.border}`,
  padding: '10px 0',
  fontSize: '15px',
  color: colors.text,
  fontFamily: fonts.body,
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: fonts.body,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1px',
  color: colors.textLight,
  marginBottom: '6px',
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  paddingBottom: '10px',
  borderBottom: `1px solid ${colors.border}`,
};

interface RadioOptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

function RadioOption({ name, value, checked, onChange, label }: RadioOptionProps) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontFamily: fonts.body,
      fontSize: '14px',
      color: checked ? colors.text : colors.textLight,
      fontWeight: checked ? 700 : 400,
      transition: 'color 0.2s',
    }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <span style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        border: `2px solid ${checked ? colors.text : colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'border-color 0.2s',
      }}>
        {checked && (
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: colors.text,
            display: 'block',
          }} />
        )}
      </span>
      {label}
    </label>
  );
}

interface FormState {
  name: string;
  attending: 'yes' | 'no' | '';
  meal: 'yes' | 'no' | '';
  headcount: number;
  message: string;
}

export default function Rsvp() {
  const [form, setForm] = useState<FormState>({
    name: '',
    attending: '',
    meal: '',
    headcount: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const isAttending = form.attending === 'yes';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.attending) return;
    setSubmitted(true);
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
          }}>
            attendance
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: '32px',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '6px',
            margin: '0 0 6px',
          }}>
            rsvp
          </h2>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '13px',
            color: colors.textLight,
            margin: '0 0 16px',
          }}>
            참석 여부를 알려주세요
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
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <ScrollReveal delay={0.1}>
                {/* Name */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>성함</label>
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Attending */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>참석 여부</label>
                  <div style={radioGroupStyle}>
                    <RadioOption
                      name="attending"
                      value="yes"
                      checked={form.attending === 'yes'}
                      onChange={() => setForm((f) => ({ ...f, attending: 'yes' }))}
                      label="참석합니다"
                    />
                    <RadioOption
                      name="attending"
                      value="no"
                      checked={form.attending === 'no'}
                      onChange={() => setForm((f) => ({ ...f, attending: 'no', meal: '', headcount: 1 }))}
                      label="불참합니다"
                    />
                  </div>
                </div>

                {/* Conditional fields - Meal & Headcount */}
                <AnimatePresence>
                  {isAttending && (
                    <motion.div
                      key="attending-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      {/* Meal */}
                      <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>식사 여부</label>
                        <div style={radioGroupStyle}>
                          <RadioOption
                            name="meal"
                            value="yes"
                            checked={form.meal === 'yes'}
                            onChange={() => setForm((f) => ({ ...f, meal: 'yes' }))}
                            label="예정입니다"
                          />
                          <RadioOption
                            name="meal"
                            value="no"
                            checked={form.meal === 'no'}
                            onChange={() => setForm((f) => ({ ...f, meal: 'no' }))}
                            label="아닙니다"
                          />
                        </div>
                      </div>

                      {/* Headcount */}
                      <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>참석 인원</label>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          paddingBottom: '10px',
                          borderBottom: `1px solid ${colors.border}`,
                        }}>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <motion.button
                              key={n}
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setForm((f) => ({ ...f, headcount: n }))}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: `1px solid ${colors.border}`,
                                background: form.headcount === n ? colors.text : 'transparent',
                                color: form.headcount === n ? colors.white : colors.textLight,
                                fontSize: '13px',
                                fontFamily: fonts.body,
                                fontWeight: form.headcount === n ? 700 : 400,
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'all 0.2s',
                                padding: 0,
                              }}
                            >
                              {n}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div style={{ marginBottom: '36px' }}>
                  <label style={labelStyle}>축하 메시지 (선택)</label>
                  <textarea
                    placeholder="따뜻한 메시지를 남겨주세요"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'none',
                      lineHeight: '1.8',
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: form.name && form.attending ? colors.text : colors.border,
                    color: form.name && form.attending ? colors.white : colors.textLight,
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: fonts.body,
                    cursor: form.name && form.attending ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s, color 0.2s',
                    letterSpacing: '0.5px',
                  }}
                >
                  전송하기
                </motion.button>
              </ScrollReveal>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                textAlign: 'center',
                padding: '60px 20px',
              }}
            >
              {/* Checkmark animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <motion.svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <motion.path
                    d="M6 16L13 23L26 9"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: fonts.heading,
                  fontSize: '28px',
                  fontWeight: 400,
                  color: colors.text,
                  margin: '0 0 12px',
                  letterSpacing: '2px',
                }}
              >
                감사합니다
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                style={{
                  fontFamily: fonts.body,
                  fontSize: '14px',
                  color: colors.textLight,
                  lineHeight: '1.8',
                  margin: 0,
                }}
              >
                {form.name}님의 소중한 응답이<br />잘 전달되었습니다.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
