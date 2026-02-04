import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  addPlayerToTeam,
  getTeamPlayers,
  getTeamById,
} from '../../api/apiClient';
import { useAuth } from '../../auth/useAuth';
import type { Team } from '../../entitys/Entity';
import { useNotification } from '../../ui/NotificationContext';

type Player = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const teamId = useMemo(() => (id ? Number(id) : null), [id]);

  const { user } = useAuth();

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [adding, setAdding] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    if (!teamId) return;

    (async () => {
      try {
        const data = await getTeamById(teamId);
        setTeam(data);
      } catch {
        setError('No se ha podido cargar el equipo');
      }
    })();
  }, [teamId]);

  
  const loadPlayers = async () => {
    if (!teamId) return;

    try {
      const data = await getTeamPlayers(teamId);
      setPlayers(data);
    } catch {
      setError('No se han podido cargar los jugadores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!teamId) {
      setError('ID de equipo inválido');
      setLoading(false);
      return;
    }
    loadPlayers();
  }, [teamId]);

  
  const isOwner = useMemo(() => {
    if (!team || !user) return false;
    return team.owner.id === user.id;
  }, [team, user]);

  const handleAddPlayer = async () => {
    if (!teamId || !userId) return;

    try {
      setAdding(true);
      await addPlayerToTeam(teamId, Number(userId));
      await loadPlayers();
      setUserId('');
    } catch {
      notify('No se pudo añadir el jugador', 'error');
    } finally {
      setAdding(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="px-6 py-4 border-b border-border bg-card">
        <Link to={-1 as any} className="text-sm text-primary">
          ← Volver
        </Link>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {/* INFO EQUIPO */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              team?.imageUrl
                ? `https://tfgback-production-3d35.up.railway.app${team.imageUrl}`
                : '/team-placeholder.png'
            }
            alt="Logo del equipo"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {team?.name ?? 'Equipo'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Jugadores del equipo
            </p>
          </div>
        </div>

        {/* GESTIÓN (SOLO OWNER, MISMO PATRÓN QUE LIGAS) */}
        {isOwner && (
          <div className="rounded-lg border bg-card p-5 mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Gestión de jugadores
            </h3>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="ID del jugador"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
              />
              <button
                onClick={handleAddPlayer}
                disabled={adding}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm"
              >
                Añadir
              </button>
            </div>
          </div>
        )}

        {/* LISTA JUGADORES */}
        {loading && (
          <p className="text-muted-foreground">Cargando…</p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

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
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default TeamDetailPage;
