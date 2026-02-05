import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeam, uploadTeamImage } from '../../api/apiClient';


function CreateTeamPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('El nombre del equipo es obligatorio');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const team = await createTeam({ name });

      if (file) {
        await uploadTeamImage(team.id, file);
      }

      navigate('/my-teams');
    } catch {
      setError('No se ha podido crear el equipo');
    } finally {
      setLoading(false);
    }
  };


  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
            <label className="block text-sm font-medium text-foreground mb-1">Nombre del equipo</label>
            <input
              className="w-full p-2 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del equipo"
            />
            <label className="block text-sm font-medium text-foreground mb-1">
              Logo del equipo (opcional)
            </label>
            <input
              className="w-full p-2 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              type="file"
              accept="image/*"
              onChange={handleFile}
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
