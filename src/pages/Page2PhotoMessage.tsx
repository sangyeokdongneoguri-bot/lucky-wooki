import Polaroid from '../components/Polaroid';

const photos = [
  { src: '/images/2-1.jpg', rotation: -2 },
  { src: '/images/2-2.jpg', rotation: 1.5 },
  { src: '/images/2-3.jpg', rotation: -1 },
  { src: '/images/2-4.jpg', rotation: 2 },
  { src: '/images/2-5.jpg', rotation: -1.5 },
  { src: '/images/2-6.jpg', rotation: 1 },
];

export default function Page2PhotoMessage() {
  return (
    <div style={{ width: '100%', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
      }}>
        {photos.map((photo, i) => (
          <Polaroid
            key={i}
            src={photo.src}
            rotation={photo.rotation}
            width="100%"
          />
        ))}
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: 2,
        color: '#555',
        marginTop: '40px',
        wordBreak: 'keep-all',
      }}>
        어떤 순간에도 나의 편이 되어주는 사람과<br />
        오래도록 이어질 길을 함께 걸어가려 합니다.<br /><br />
        따뜻한 걸음하셔서<br />
        저희 두 사람의 앞날을 축복해 주시면<br />
        진심으로 감사드리겠습니다.
      </p>
    </div>
  );
}
