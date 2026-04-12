import { useState } from 'react';
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

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwRY1Nd3Q_gArhNBh97ycsUAsYhri_mFADf4Kv-vwyGpDVfcE3DCKBiR-yzXn4dRWXXFw/exec';

export default function AttendancePopup({ onClose }: AttendancePopupProps) {
  const [step, setStep] = useState<'info' | 'form' | 'done'>('info');
  const [name, setName] = useState('');
  const [side, setSide] = useState<'groom' | 'bride' | ''>('');
  const [submitting, setSubmitting] = useState(false);

  const handleDismissToday = () => {
    dismissToday();
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !side) return;
    setSubmitting(true);
    try {
      if (SHEETS_URL) {
        const params = new URLSearchParams({
          name: name.trim(),
          side: side === 'groom' ? '신랑측' : '신부측',
          timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        });
        await fetch(`${SHEETS_URL}?${params}`, { method: 'GET', mode: 'no-cors' });
      }
      setStep('done');
    } catch {
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
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

        {step === 'info' && (
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
              onClick={() => setStep('form')}
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
        )}

        {step === 'form' && (
          <div>
            {/* 이름 입력 */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
                성함
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="성함을 입력해주세요"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* 신랑측/신부측 선택 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
                누구의 하객이신가요?
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSide('groom')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    fontSize: '14px',
                    border: side === 'groom' ? '2px solid #222' : '1px solid #ddd',
                    borderRadius: '4px',
                    background: side === 'groom' ? '#f5f5f5' : '#fff',
                    color: '#222',
                    fontWeight: side === 'groom' ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  신랑측
                </button>
                <button
                  onClick={() => setSide('bride')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    fontSize: '14px',
                    border: side === 'bride' ? '2px solid #222' : '1px solid #ddd',
                    borderRadius: '4px',
                    background: side === 'bride' ? '#f5f5f5' : '#fff',
                    color: '#222',
                    fontWeight: side === 'bride' ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  신부측
                </button>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setStep('info')}
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
                이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !side || submitting}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: (!name.trim() || !side) ? '#ccc' : '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: (!name.trim() || !side) ? 'default' : 'pointer',
                }}
              >
                {submitting ? '전송 중...' : '제출하기'}
              </button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#222', margin: '0 0 8px', fontWeight: 600 }}>
              감사합니다!
            </p>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px' }}>
              참석 정보가 전달되었습니다.
            </p>
            <button
              onClick={() => { dismissToday(); onClose(); }}
              style={{
                width: '100%',
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
              닫기
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
