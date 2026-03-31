import Polaroid from '../components/Polaroid';

const photos = [
  { src: '/images/page2/2-1.webp', rotation: -2 },
  { src: '/images/page2/2-2.webp', rotation: 1.5 },
  { src: '/images/page2/2-3.webp', rotation: -1 },
  { src: '/images/page2/2-4.webp', rotation: 2 },
  { src: '/images/page2/2-5.webp', rotation: -1.5 },
  { src: '/images/page2/2-6.webp', rotation: 1 },
];

export default function Page2PhotoMessage() {
  return (
    <div style={{ width: '100%', padding: '48px 24px 24px', boxSizing: 'border-box' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
      }}>
        {photos.map((photo, i) => (
          <Polaroid
            key={i}
            src={photo.src}
            rotation={photo.rotation}
            width="90%"
          />
        ))}
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '12px',
        lineHeight: 2,
        color: '#555',
        marginTop: '60px',
        wordBreak: 'keep-all',
      }}>
        어떤 순간에도 나의 편이 되어주는 사람과<br />
        오래도록 이어질 길을 함께 걸어가려 합니다.<br /><br />
        따뜻한 걸음하셔서 저희 두 사람의 앞날을 축복해 주시면<br />
        진심으로 감사드리겠습니다.
      </p>
    </div>
  );
}
