import { useState } from 'react';

const STORAGE_KEY = 'samsung-dark-banner-dismissed';

function isDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === new Date().toDateString();
}

function isSamsungBrowser(): boolean {
  return /SamsungBrowser/i.test(navigator.userAgent);
}

export default function SamsungDarkBanner() {
  const [visible, setVisible] = useState(() => isSamsungBrowser() && !isDismissed());

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
    setVisible(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0dcd4',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ flex: 1, fontSize: '12.5px', lineHeight: 1.7, color: '#333' }}>
        <span style={{ fontWeight: 600 }}>화면이 어둡게 보이시나요?</span>
        <br />
        우측 하단{' '}
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          border: '1px solid #999',
          borderRadius: '3px',
          padding: '0 4px',
          lineHeight: '18px',
          verticalAlign: 'middle',
        }}>
          ☰
        </span>
        {' '}메뉴 →{' '}
        <span style={{ fontWeight: 600 }}>밝게 보기</span>를 눌러주세요.
      </div>
      <button
        onClick={dismiss}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          color: '#999',
          cursor: 'pointer',
          padding: '0 4px',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}
