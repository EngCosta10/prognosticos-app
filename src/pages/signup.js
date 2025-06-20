import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError('As palavras-passe não coincidem');
      return;
    }

    // Simulação de sucesso no registo
    localStorage.setItem('auth', 'true');
    router.push('/premium');
  };

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>📝 Registar</h1>

        <form onSubmit={handleSignup} style={{ maxWidth: '400px' }}>
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

          <label>Confirmar palavra-passe:</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Criar Conta</button>
        </form>
      </main>
    </>
  );
}
