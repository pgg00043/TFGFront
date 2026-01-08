import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamPlayers } from '../api/apiClient';

type Player = {
  id: number;
  name: string;
  surname: string;
  email: string;
  rol: string;
};

function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const teamId = id ? Number(id) : null;

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!teamId) {
      setError('ID de equipo inválido');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getTeamPlayers(teamId);
        setPlayers(data);
      } catch {
        setError('No se han podido cargar los jugadores');
      } finally {
        setLoading(false);
      }
    })();
  }, [teamId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-6 py-4 border-b border-border bg-card">
        <Link to={-1 as any} className="text-sm text-primary">
          ← Volver
        </Link>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Jugadores del equipo</h2>

        {loading && <p className="text-muted-foreground">Cargando…</p>}
        {error && <p className="text-destructive">{error}</p>}

        {!loading && !error && (
          <ul className="divide-y divide-border rounded-lg border bg-card">
            {players.map((p) => (
              <li key={p.id} className="p-4 flex justify-between">
                <div>
                  <p className="font-medium">
                    {p.name} {p.surname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {p.email}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-muted">
                  {p.rol}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default TeamDetailPage;
