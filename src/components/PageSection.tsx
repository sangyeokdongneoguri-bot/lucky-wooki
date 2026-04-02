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

const pageBg: Record<number, string> = {
  1: '#f8f7f2',
  3: '#f8f7f2',
  5: '#f8f7f2',
};

export default function PageSection({ page, children, style }: PageSectionProps) {
  const noCard = page === 1 || page === 2 || page === 3 || page === 6;
  const bg = pageBg[page];

  return (
    <section
      data-page={page}
      style={{
        minHeight: page === 1 ? '100dvh' : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        ...(bg ? { backgroundColor: bg } : {}),
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: noCard ? 0 : '40px 16px',
          boxSizing: 'border-box',
        }}
      >
        {noCard ? (
          children ?? null
        ) : (
          <div
            style={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {children ?? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <p style={{ fontSize: '3rem', color: '#ccc', margin: '0 0 12px', fontWeight: 300 }}>
                  {page}
                </p>
                <p style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', margin: 0 }}>
                  {pageLabels[page] ?? `Page ${page}`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
