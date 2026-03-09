import { useState } from 'react';
import { colors } from '../styles/theme';

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_APP_KEY = 'YOUR_KAKAO_APP_KEY';

const GROOM_PHONE = '010-1234-5678';
const BRIDE_PHONE = '010-8765-4321';

export default function Footer() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '우리 결혼합니다',
        description: '소중한 분들을 초대합니다. 함께해 주세요.',
        imageUrl: 'https://example.com/wedding-cover.jpg',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const btnBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '13px 20px',
    borderRadius: '2px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 500,
    flex: 1,
    minWidth: 0,
  };

  return (
    <footer style={{ backgroundColor: colors.bgAlt, padding: '50px 20px 32px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Share section */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '13px',
            letterSpacing: '4px',
            color: colors.accent,
            marginBottom: '8px',
            textTransform: 'lowercase',
          }}>
            share
          </p>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '22px',
            color: colors.text,
            fontWeight: 400,
            margin: '0 0 20px',
          }}>
            공유하기
          </h3>

          <div style={{ display: 'flex', gap: '10px' }}>
            {/* KakaoTalk share button */}
            <button
              onClick={handleKakaoShare}
              style={{
                ...btnBase,
                backgroundColor: '#FEE500',
                color: '#3C1E1E',
              }}
            >
              {/* Kakao bubble icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.628 1.585 4.938 3.978 6.318L5 21l4.47-2.388A11.8 11.8 0 0 0 12 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
              </svg>
              카카오톡 공유
            </button>

            {/* Link copy button — outline style */}
            <button
              onClick={handleCopyLink}
              style={{
                ...btnBase,
                backgroundColor: 'transparent',
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              링크 복사
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: colors.border,
          margin: '28px 0',
        }} />

        {/* Phone call buttons */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            textAlign: 'center',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: '13px',
            color: colors.textLight,
            marginBottom: '16px',
          }}>
            연락하기
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`tel:${GROOM_PHONE}`}
              style={{
                ...btnBase,
                backgroundColor: 'transparent',
                color: colors.text,
                border: `1px solid ${colors.border}`,
                textDecoration: 'none',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              신랑에게 전화
            </a>
            <a
              href={`tel:${BRIDE_PHONE}`}
              style={{
                ...btnBase,
                backgroundColor: 'transparent',
                color: colors.text,
                border: `1px solid ${colors.border}`,
                textDecoration: 'none',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              신부에게 전화
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: '12px',
          color: colors.textLight,
          margin: 0,
        }}>
          Made with ♥
        </p>
      </div>

      {/* Toast */}
      <div style={{
        position: 'fixed',
        bottom: '90px',
        left: '50%',
        transform: `translateX(-50%) translateY(${toastVisible ? '0' : '20px'})`,
        opacity: toastVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '2px',
        fontSize: '13px',
        fontFamily: "'Noto Sans KR', sans-serif",
        pointerEvents: 'none',
        zIndex: 2000,
        whiteSpace: 'nowrap',
      }}>
        링크가 복사되었습니다
      </div>
    </footer>
  );
}
