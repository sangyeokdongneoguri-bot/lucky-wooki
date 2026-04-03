import { useCallback, useState } from 'react';
import { weddingData } from '../data/wedding';

declare global {
  interface Window {
    Kakao?: {
      init(appKey: string): void;
      isInitialized(): boolean;
      Share: {
        sendDefault(options: Record<string, unknown>): void;
      };
    };
  }
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleKakaoShare = useCallback(() => {
    const { Kakao } = window;
    if (!Kakao?.isInitialized()) return;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '성기욱 ♥ 이소연 결혼합니다',
        description: '2026년 5월 10일 오후 2시\n판교 더블유스퀘어 8층 채플홀',
        imageUrl: `${weddingData.siteUrl}${weddingData.ogImage}`,
        link: { mobileWebUrl: weddingData.siteUrl, webUrl: weddingData.siteUrl },
      },
      buttons: [
        { title: '청첩장 보기', link: { mobileWebUrl: weddingData.siteUrl, webUrl: weddingData.siteUrl } },
      ],
    });
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(weddingData.siteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  return (
    <footer style={{
      backgroundColor: '#f8f7f2',
      padding: '32px 24px 48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    }}>
      <button
        onClick={handleKakaoShare}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#555',
        }}
      >
        <img
          src="/images/footer/kakao-icon.png"
          alt=""
          style={{ width: '18px', height: '18px' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        카카오톡으로 공유하기
      </button>

      <button
        onClick={handleCopyLink}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          color: copied ? '#b8a68e' : '#555',
          transition: 'color 0.4s ease',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={copied ? '#b8a68e' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s ease' }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        청첩장 링크 복사하기
      </button>
    </footer>
  );
}
