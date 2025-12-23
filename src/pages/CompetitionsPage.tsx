import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompetitions } from '../api/apiClient';
import { useAuth } from '../auth/useAuth';

type Competition = {
  id: number;
  name: string;
  category: string;
};

function CompetitionsPage() {
  const { user, logout } = useAuth();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getCompetitions();
        setCompetitions(data);
      } catch {
        setError('No se han podido cargar las competiciones');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header simple */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <h1 className="text-xl font-semibold">Basket League</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user?.username} ({user?.rol})
          </span>
          <button
            onClick={logout}
            className="rounded-md bg-destructive text-destructive-foreground px-3 py-1 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-2">Competiciones</h2>
        <p className="text-muted-foreground mb-6">
          Selecciona una competición para ver clasificación y partidos.
        </p>

        {loading && (
          <p className="text-muted-foreground">Cargando competiciones…</p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && competitions.length === 0 && (
          <p className="text-muted-foreground">No hay competiciones aún.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {competitions.map((c) => (
            <Link
              key={c.id}
              to={`/competition/${c.id}`}
              className="rounded-lg border bg-card p-4 hover:opacity-90 transition"
            >
              <h3 className="font-medium text-lg">{c.name}</h3>
              {c.category && (
                <p className="text-sm text-muted-foreground">{c.category}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Ver clasificación y partidos →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CompetitionsPage;
