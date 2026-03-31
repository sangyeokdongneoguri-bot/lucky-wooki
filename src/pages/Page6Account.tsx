import { useCallback, useState } from 'react';
import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const { groom, bride } = weddingData;

interface AccountEntry {
  holder: string;
  bank: string;
  number: string;
}

const groomAccounts: AccountEntry[] = [
  groom.account,
  groom.fatherAccount,
  groom.motherAccount,
];

const brideAccounts: AccountEntry[] = [
  bride.account,
  bride.fatherAccount,
  bride.motherAccount,
];

function AccountRow({ account }: { account: AccountEntry }) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(account.number).then(() => {
      alert('계좌번호가 복사되었습니다.');
    });
  }, [account.number]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <div>
        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 2px' }}>
          {account.bank} · {account.holder}
        </p>
        <p style={{ fontSize: '14px', color: '#222', margin: 0, letterSpacing: '0.03em' }}>
          {account.number}
        </p>
      </div>
      <button
        onClick={handleCopy}
        style={{
          padding: '6px 14px',
          fontSize: '12px',
          color: '#555',
          background: '#f5f5f5',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          cursor: 'pointer',
          flexShrink: 0,
          marginLeft: '12px',
        }}
      >
        복사
      </button>
    </div>
  );
}

function AccordionSection({ title, accounts }: { title: string; accounts: AccountEntry[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #ddd' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '15px',
          color: '#333',
          fontWeight: 500,
        }}
      >
        {title}
        <span style={{
          fontSize: '12px',
          color: '#999',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          ▼
        </span>
      </button>
      <div style={{
        maxHeight: open ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <div style={{ padding: '0 4px 12px' }}>
          {accounts.map((account, i) => (
            <AccountRow key={i} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page6Account() {
  return (
    <ScrollReveal>
    <div style={{
      width: '100%',
      padding: '40px 24px',
      boxSizing: 'border-box',
    }}>
      {/* Heart icon */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#c0392b" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Title */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 600,
        color: '#333',
        margin: '0 0 28px',
      }}>
        마음 전하실 곳
      </h2>

      {/* Accordion sections */}
      <div style={{ borderTop: '1px solid #ddd' }}>
        <AccordionSection title="신랑측 계좌번호" accounts={groomAccounts} />
        <AccordionSection title="신부측 계좌번호" accounts={brideAccounts} />
      </div>
    </div>
    </ScrollReveal>
  );
}
