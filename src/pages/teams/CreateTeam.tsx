import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeam } from '../../api/apiClient';

function CreateTeamPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('El nombre del equipo es obligatorio');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await createTeam({ name });
      navigate('/my-teams');
    } catch {
      setError('No se ha podido crear el equipo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Crear equipo</h1>
          <p className="text-sm text-muted-foreground">
            Crea un nuevo equipo
          </p>
        </div>

        <Link
          to="/my-teams"
          className="text-sm text-primary hover:opacity-90"
        >
          ← Volver a mis equipos
        </Link>
      </header>

      <main className="p-6 max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border bg-card p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre del equipo
            </label>
            <input
              className="w-full border rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del equipo"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md"
          >
            {loading ? 'Creando…' : 'Crear equipo'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateTeamPage;
