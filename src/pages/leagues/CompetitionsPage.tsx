import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompetitions } from '../../api/apiClient';
import type { Competition } from '../../entitys/Entity';

function CompetitionsPage() {
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
            <div
              key={c.id}
              className="rounded-lg border bg-card p-4 hover:opacity-90 transition"
            >
              <div className="flex items-center justify-between">
                <Link to={`/competition/${c.id}`} className="flex items-center gap-4">
                  <img
                    src={
                      c.imageUrl
                        ? `https://tfgback-production-3d35.up.railway.app${c.imageUrl}`
                        : '/competition-placeholder.png'
                    }
                    alt="Imagen competición"
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{c.name}</h3>
                    {c.category && (
                      <p className="text-sm text-muted-foreground">{c.category}</p>
                    )}
                  </div>
                </Link>

                <Link to={`/competition/${c.id}`} className="text-sm text-muted-foreground ml-4">
                  Ver clasificación y partidos →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CompetitionsPage;
