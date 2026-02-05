import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCompetitions } from "../../api/apiClient";

type Competition = {
  id: number;
  name: string;
  category: string;
};

export default function MyLeaguesPage() {
  const [leagues, setLeagues] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyCompetitions();
        setLeagues(data);
      } catch {
        setError("No se han podido cargar tus ligas");
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
          <h1 className="text-xl font-semibold">Mis ligas</h1>
          <p className="text-sm text-muted-foreground">
            Competiciones creadas por ti
          </p>
        </div>

        <Link
          to="/competitions/create"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
        >
          + Crear liga
        </Link>
      </header>

      <main className="p-6">
        {loading && (
          <p className="text-muted-foreground">Cargando ligas…</p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && leagues.length === 0 && (
          <p className="text-muted-foreground">
            Aún no has creado ninguna liga.
          </p>
        )}

        {!loading && !error && leagues.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leagues.map((league) => (
              <Link
                key={league.id}
                to={`/competition/${league.id}`}
                className="rounded-lg border bg-card p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <h3 className="font-semibold text-lg">{league.name}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Categoría: {league.category}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
