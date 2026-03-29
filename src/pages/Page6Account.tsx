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
  groom.parentAccount,
];

const brideAccounts: AccountEntry[] = [
  bride.account,
  bride.parentAccount,
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
      borderBottom: '1px solid #eee',
    }}>
      <div>
        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 2px' }}>
          {account.holder} / {account.bank}
        </p>
        <p style={{ fontSize: '14px', color: '#222', margin: 0, letterSpacing: '0.05em' }}>
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
          border: '1px solid #ddd',
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

function AccountSection({ title, accounts }: { title: string; accounts: AccountEntry[] }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 600,
        color: '#222',
        padding: '12px 0',
        borderBottom: '2px solid #222',
        marginBottom: '4px',
      }}>
        {title}
      </div>
      {accounts.map((account, i) => (
        <AccountRow key={i} account={account} />
      ))}
    </div>
  );
}

export default function Page6Account() {
  return (
    <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 600,
        color: '#222',
        margin: '0 0 28px',
      }}>
        마음 전하실 곳
      </h2>

      <AccountSection title="신랑측 계좌번호" accounts={groomAccounts} />
      <AccountSection title="신부측 계좌번호" accounts={brideAccounts} />
    </div>
  );
}
