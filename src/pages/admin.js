import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { db } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';


export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 UID do admin (podes usar o teu)
  const ADMIN_UID = 'jeMZIDD9EkObgkVkqJzXQsYHrgN2';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      if (currentUser.uid !== ADMIN_UID) {
        router.push('/');
        return;
      }

      // 🔍 Obter subscritores
      const querySnapshot = await getDocs(collection(db, 'pagamentos'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setSubs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>🔄 A carregar subscritores...</p>;

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>📋 Painel de Subscritores Premium</h1>
        <ul>
          {subs.map((sub) => (
            <li key={sub.id}>
              <strong>{sub.email}</strong> — Pago em: {new Date(sub.paidAt.seconds * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
