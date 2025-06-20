import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function PremiumPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      // Verificar pagamento no Firestore
      const docRef = doc(db, 'pagamentos', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().hasPaid === true) {
        setHasPaid(true);
      } else {
        setHasPaid(false);
        router.push('/'); // Ou mostrar mensagem em vez de redirecionar
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>🔐 A verificar acesso premium...</p>;
  if (!hasPaid) return null;

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>🔐 Área Premium</h1>
        <p>Estás a aceder a prognósticos completos com odds e análise:</p>

        <ul style={{ marginTop: '1rem' }}>
          <li>
            <strong>Benfica vs Porto</strong><br />
            Prognóstico: Vitória Benfica<br />
            Odds: 2.10<br />
            Análise: O Benfica vem de 5 vitórias seguidas em casa...
          </li>
          <br />
          <li>
            <strong>Real Madrid vs Barcelona</strong><br />
            Prognóstico: Mais de 2.5 golos<br />
            Odds: 1.85<br />
            Análise: Ambos os clubes têm uma média superior a 3 golos por jogo...
          </li>
        </ul>
      </main>
    </>
  );
}
