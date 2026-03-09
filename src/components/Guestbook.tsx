import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { colors, fonts } from '../styles/theme';

interface Message {
  id: number;
  name: string;
  date: string;
  message: string;
  password: string;
}

const DUMMY_MESSAGES: Message[] = [
  {
    id: 1,
    name: '김지영',
    date: '2025.10.01',
    message: '두 분의 결혼을 진심으로 축하드려요! 항상 행복하고 사랑이 넘치는 가정 이루세요. 오늘 이 아름다운 날을 함께할 수 있어서 너무 기뻐요.',
    password: '1234',
  },
  {
    id: 2,
    name: '박민준',
    date: '2025.10.02',
    message: '축하해! 오래오래 행복하게 잘 살아~ 앞으로의 날들이 오늘처럼 빛나길 바랄게. 사랑해 친구야!',
    password: '1234',
  },
  {
    id: 3,
    name: '이서연',
    date: '2025.10.03',
    message: '결혼 진심으로 축하드립니다. 두 분이 함께하는 모든 날들이 축복으로 가득하길 기도합니다. 건강하고 행복한 신혼 생활 보내세요.',
    password: '1234',
  },
  {
    id: 4,
    name: '최현우',
    date: '2025.10.04',
    message: '드디어 결혼이구나! 정말 잘 어울리는 두 사람이라 늘 생각했어. 앞으로도 지금처럼 서로 아껴주고 사랑하며 살길 바라.',
    password: '1234',
  },
];

let nextId = 100;

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('이름을 입력해주세요.'); return; }
    if (!password.trim()) { setError('비밀번호를 입력해주세요.'); return; }
    if (!messageText.trim()) { setError('메시지를 입력해주세요.'); return; }

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newMsg: Message = {
      id: nextId++,
      name: name.trim(),
      date: dateStr,
      message: messageText.trim(),
      password: password.trim(),
    };

    setMessages(prev => [newMsg, ...prev]);
    setName('');
    setPassword('');
    setMessageText('');
    setError('');
  };

  const handleDelete = (id: number) => {
    const input = window.prompt('비밀번호를 입력해주세요.');
    if (input === null) return;
    const target = messages.find(m => m.id === id);
    if (!target) return;
    if (input === target.password) {
      setMessages(prev => prev.filter(m => m.id !== id));
    } else {
      window.alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: `1px solid ${colors.border}`,
    borderRadius: '2px',
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: '14px',
    fontFamily: fonts.body,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <section style={{ backgroundColor: colors.bg, padding: '60px 20px' }}>
      <ScrollReveal direction="up">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{
              fontFamily: fonts.heading,
              fontSize: '13px',
              letterSpacing: '4px',
              color: colors.accent,
              marginBottom: '8px',
              textTransform: 'lowercase',
            }}>
              guestbook
            </p>
            <h2 style={{
              fontFamily: fonts.heading,
              fontSize: '26px',
              color: colors.text,
              fontWeight: 400,
              margin: 0,
            }}>
              축하 메시지를 남겨주세요
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            backgroundColor: colors.bgAlt,
            borderRadius: '2px',
            padding: '24px',
            marginBottom: '32px',
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: colors.textLight,
                  marginBottom: '6px',
                  fontFamily: fonts.body,
                }}>
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: colors.textLight,
                  marginBottom: '6px',
                  fontFamily: fonts.body,
                }}>
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="삭제 시 사용"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: colors.textLight,
                marginBottom: '6px',
                fontFamily: fonts.body,
              }}>
                메시지
              </label>
              <textarea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="축하 메시지를 입력해주세요"
                rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
              />
            </div>

            {error && (
              <p style={{
                color: '#c0392b',
                fontSize: '12px',
                marginBottom: '10px',
                fontFamily: fonts.body,
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: colors.text,
                color: colors.white,
                border: 'none',
                borderRadius: '2px',
                fontSize: '14px',
                fontFamily: fonts.body,
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
            >
              메시지 남기기
            </button>
          </form>

          {/* Message List */}
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '2px',
                  padding: '20px',
                  marginBottom: '12px',
                  border: `1px solid ${colors.border}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontFamily: fonts.body,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: colors.text,
                    }}>
                      {msg.name}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: colors.textLight,
                      fontFamily: fonts.body,
                    }}>
                      {msg.date}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    title="삭제"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      color: colors.textLight,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {/* Lock icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </button>
                </div>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: colors.text,
                  margin: 0,
                  fontFamily: fonts.body,
                  wordBreak: 'keep-all',
                }}>
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}
