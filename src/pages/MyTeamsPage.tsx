import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyTeams } from '../api/apiClient';

type Team = {
  id: number;
  name: string;
};

function MyTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyTeams();
        setTeams(data);
      } catch {
        setError('No se han podido cargar tus equipos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Mis equipos</h1>
          <p className="text-sm text-muted-foreground">
            Equipos creados por ti
          </p>
        </div>

        <Link
          to="/teams/create"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
        >
          + Crear equipo
        </Link>
      </header>

      <main className="p-6">
        {loading && (
          <p className="text-muted-foreground">Cargando equipos…</p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && teams.length === 0 && (
          <p className="text-muted-foreground">
            Aún no has creado ningún equipo.
          </p>
        )}

        {!loading && !error && teams.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <Link
                key={team.id}
                to={`/teams/${team.id}`}
                state={{ name: team.name }}
                className="rounded-lg border bg-card p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <h3 className="font-semibold text-lg">{team.name}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Equipo creado por ti
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyTeamsPage;
