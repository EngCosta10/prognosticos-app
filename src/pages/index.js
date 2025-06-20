import Head from 'next/head'
import Header from '../components/Header'


export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🏠 Bem-vindo à App de Prognósticos</h1>
      <p>Consulta os jogos, odds e análises exclusivas.</p>
    </main>
  );
}
export default function Home() {
   
    const handleCheckout = async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
  });
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert('Erro ao iniciar checkout.');
  }
};
    return (
    <>
      <Head>
        <title>Prognósticos Desportivos</title>
        <meta name="description" content="Prognósticos gratuitos e premium com odds" />
      </Head>

      <Header />

      <main style={{ padding: '2rem' }}>
        <h1>🎯 Prognósticos Gratuitos</h1>

        <p>Acede gratuitamente aos prognósticos básicos do dia:</p>

        <ul style={{ marginTop: '1rem' }}>
          <li><strong>Jogo:</strong> Benfica vs Porto – <em>Vitória Benfica</em></li>
          <li><strong>Jogo:</strong> Real Madrid vs Barcelona – <em>Mais de 2.5 golos</em></li>
          <li><strong>Jogo:</strong> PSG vs Lyon – <em>Empate</em></li>
        </ul>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f1f5f9' }}>
          <p>⚠️ Para veres os prognósticos detalhados com odds e análise, acede à <a href="/premium"><strong>área premium</strong></a>.</p>
        </div>
      </main> <div style={{ marginTop: '2rem' }}>
  <button onClick={handleCheckout} style={{ padding: '1rem', fontSize: '1rem' }}>
    Aderir à área premium (€5)
  </button>
</div>

    </>
  )

}


