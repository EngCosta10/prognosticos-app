import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/premium');
    } catch (err) {
      setError('Email ou palavra-passe inválidos');
    }
  };

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>🔑 Login</h1>

        <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />

          <label>Palavra-passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}

