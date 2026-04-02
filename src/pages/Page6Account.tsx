import { createContext, useCallback, useContext, useState, useRef } from 'react';
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

const ToastContext = createContext<(msg: string) => void>(() => {});

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s ease',
      background: 'rgba(34, 34, 34, 0.88)',
      color: '#fff',
      fontSize: '13px',
      padding: '10px 24px',
      borderRadius: '20px',
      pointerEvents: 'none',
      zIndex: 10000,
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}

function AccountRow({ account }: { account: AccountEntry }) {
  const showToast = useContext(ToastContext);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(account.number)
      .then(() => showToast(`${account.holder} 님의 계좌번호가 복사되었습니다`))
      .catch(() => showToast('복사에 실패했습니다. 길게 눌러 복사해 주세요.'));
  }, [account.number, account.holder, showToast]);

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
  const [toast, setToast] = useState({ message: '', visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((msg: string) => {
    clearTimeout(timerRef.current);
    setToast({ message: msg, visible: true });
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
    <ScrollReveal>
    <Toast message={toast.message} visible={toast.visible} />
    <div style={{
      width: '100%',
      padding: '40px 24px',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 600,
        color: '#333',
        margin: '0 0 28px',
      }}>
        마음 전하실 곳
      </h2>

      <div style={{ borderTop: '1px solid #ddd' }}>
        <AccordionSection title="신랑측 계좌번호" accounts={groomAccounts} />
        <AccordionSection title="신부측 계좌번호" accounts={brideAccounts} />
      </div>
    </div>
    </ScrollReveal>
    </ToastContext.Provider>
  );
}
