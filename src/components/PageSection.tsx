import type { CSSProperties, ReactNode } from 'react';

const pageLabels: Record<number, string> = {
  1: 'Opening',
  2: 'Photo & Message',
  3: 'Family Letter',
  4: 'Gallery',
  5: 'Wedding Info',
  6: 'Account',
};

interface PageSectionProps {
  page: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export default function PageSection({ page, children, style }: PageSectionProps) {
  return (
    <section
      data-page={page}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...style,
      }}
    >
      {page > 1 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '1px',
          backgroundColor: '#bbb',
        }} />
      )}
      {children ?? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', color: '#ccc', margin: '0 0 12px', fontWeight: 300 }}>
            {page}
          </p>
          <p style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', margin: 0 }}>
            {pageLabels[page] ?? `Page ${page}`}
          </p>
        </div>
      )}
    </section>
  );
}
