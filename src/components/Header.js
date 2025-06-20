import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header style={{ padding: '1rem', background: '#1e293b', color: 'white' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          🏠 Prognósticos
        </Link>

        <div>
          {user ? (
            <>
              <Link href="/premium" style={{ marginRight: '1rem', color: 'white' }}>
                Premium
              </Link>
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ marginRight: '1rem', color: 'white' }}>
                Login
              </Link>
              <Link href="/signup" style={{ color: 'white' }}>
                Registar
              </Link>
            </>
          )}
          
        </div>
      </nav>
    </header>
  );
}
const handleCheckout = async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
  });
  const data = await res.json();
  window.location = data.url;
};
