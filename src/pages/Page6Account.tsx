import { useCallback } from 'react';
import { weddingData } from '../data/wedding';

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

function CopyButton({ number }: { number: string }) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(number).then(() => {
      alert('계좌번호가 복사되었습니다.');
    });
  }, [number]);

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'relative',
        padding: '8px 20px',
        fontSize: '13px',
        color: '#fff',
        background: `url(/images/tape-btn.png) center/100% 100% no-repeat`,
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      복사
    </button>
  );
}

function AccountInfo({ account }: { account: AccountEntry }) {
  return (
    <div>
      <p style={{ fontSize: '13px', color: '#666', margin: '0 0 2px' }}>
        {account.holder} / {account.bank}
      </p>
      <p style={{ fontSize: '14px', color: '#222', margin: 0, letterSpacing: '0.03em' }}>
        {account.number}
      </p>
    </div>
  );
}

function GroomRow({ account }: { account: AccountEntry }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 0',
      gap: '14px',
    }}>
      <AccountInfo account={account} />
      <CopyButton number={account.number} />
    </div>
  );
}

function BrideRow({ account }: { account: AccountEntry }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 0',
      gap: '14px',
    }}>
      <CopyButton number={account.number} />
      <AccountInfo account={account} />
    </div>
  );
}

export default function Page6Account() {
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      padding: '0',
      boxSizing: 'border-box',
    }}>
      {/* Card frame background */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 4',
        backgroundImage: 'url(/images/card-frame.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        padding: '16% 20%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Title */}
        <h2 style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: '#333',
          margin: '0 0 24px',
          letterSpacing: '0.1em',
        }}>
          마음 전하실 곳
        </h2>

        {/* Groom accounts */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            margin: '0 0 12px',
          }}>
            신랑측 계좌번호
          </p>
          {groomAccounts.map((account, i) => (
            <GroomRow key={i} account={account} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '60%', height: '1px', background: '#ccc', margin: '8px auto 20px' }} />

        {/* Bride accounts */}
        <div>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            margin: '0 0 12px',
          }}>
            신부측 계좌번호
          </p>
          {brideAccounts.map((account, i) => (
            <BrideRow key={i} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
}
