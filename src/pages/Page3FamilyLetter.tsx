import MediaFrame from '../components/MediaFrame';

export default function Page3FamilyLetter() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      padding: '24px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* 좌측 상단 (고정 1장) */}
      <MediaFrame
        sources={['https://picsum.photos/seed/frame-lt/400/533']}
        frameStyle="none"
        width="100%"
        rotation={-3}
      />

      {/* 우측 상단 (3장 전환) */}
      <MediaFrame
        sources={[
          'https://picsum.photos/seed/frame1/400/533',
          'https://picsum.photos/seed/frame2/400/533',
          'https://picsum.photos/seed/frame3/400/533',
        ]}
        frameStyle="none"
        transition="none"
        width="100%"
        rotation={3}
      />

      {/* 좌측 하단 (2장 전환) */}
      <MediaFrame
        sources={[
          'https://picsum.photos/seed/frame4/400/533',
          'https://picsum.photos/seed/frame5/400/533',
        ]}
        frameStyle="none"
        transition="none"
        width="100%"
        rotation={-2}
      />

      {/* 우측 하단 (고정 1장) */}
      <MediaFrame
        sources={['https://picsum.photos/seed/frame-rb/400/533']}
        frameStyle="none"
        width="100%"
        rotation={2}
      />
    </div>
  );
}
