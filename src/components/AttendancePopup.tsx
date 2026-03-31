import { weddingData } from '../data/wedding';

const STORAGE_KEY = 'attendance-popup-dismissed';

interface AttendancePopupProps {
  onClose: () => void;
}

function dismissToday() {
  localStorage.setItem(STORAGE_KEY, new Date().toDateString());
}

export function isDismissedToday(): boolean {
  return localStorage.getItem(STORAGE_KEY) === new Date().toDateString();
}

export default function AttendancePopup({ onClose }: AttendancePopupProps) {
  const handleDismissToday = () => {
    dismissToday();
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 오늘 보지 않기 */}
        <div style={{ textAlign: 'right', marginBottom: '8px', paddingRight: '8px' }}>
          <button
            onClick={handleDismissToday}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            오늘 보지 않기
          </button>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          padding: '24px 24px 32px',
        }}>

        {/* 제목 */}
        <h2 style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: '#222',
          margin: '0 0 20px',
        }}>
          참석 정보
        </h2>

        {/* 안내 문구 */}
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          lineHeight: 1.8,
          color: '#666',
          margin: '0 0 28px',
          wordBreak: 'keep-all',
        }}>
          참석의 부담을 드리기 보다,<br />
          정성껏 준비하기 위해 여쭙는 것이니<br />
          참석 정보를 알려주시면 감사하겠습니다.
        </p>

        {/* 정보 */}
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 신랑 & 신부 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>
              신랑 {weddingData.groom.name} &amp; 신부 {weddingData.bride.name}
            </span>
          </div>

          {/* 날짜 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: '14px', color: '#222' }}>
              2026년 5월 10일 일요일 오후 2시
            </span>
          </div>

          {/* 장소 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontSize: '14px', color: '#222' }}>
              {weddingData.location.name} {weddingData.ceremony.floor}
            </span>
          </div>
          </div>
        </div>

        {/* 버튼 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: '#fff',
              color: '#222',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: '#222',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            참석 정보 전달하기
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
