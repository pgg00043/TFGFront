import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createStat, getMatchById, updateStat } from '../../api/apiClient.ts';
import TeamTotalsCard from '../../components/cards/TeamTotalsCard.tsx';
import type { Match, Stat } from '../../entitys/Entity.tsx';
import { useAuth } from '../../auth/useAuth.tsx';
import MatchStatsEditableTable from '../../components/tables/MatchStatsEditableTable';


function calculateTeamTotals(
  stats: Stat[] | undefined,
  teamPlayers: { id: number }[]
) {
  if (!stats || stats.length === 0) {
    return {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
    };
  }

  const playerIds = new Set(teamPlayers.map(p => p.id));

  return stats
    .filter(stat => playerIds.has(stat.user.id))
    .reduce(
      (acc, stat) => ({
        points: acc.points + stat.points,
        rebounds: acc.rebounds + stat.rebounds,
        assists: acc.assists + stat.assists,
        steals: acc.steals + stat.steals,
        blocks: acc.blocks + stat.blocks,
        turnovers: acc.turnovers + stat.turnovers,
        fouls: acc.fouls + stat.fouls,
      }),
      {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        fouls: 0,
      }
    );
}


function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const matchId = id ? Number(id) : null;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [localStats, setLocalStats] = useState<Stat[]>([]);


  const canEditStats = Boolean(
    user && match && match.competition?.ownerId === user.id
  )

  useEffect(() => {
    if (!matchId) {
      setError('ID de partido inválido');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getMatchById(matchId);
        setMatch(data);
      } catch {
        setError('No se ha podido cargar el partido');
      } finally {
        setLoading(false);
      }
    })();
  }, [matchId]);



  useEffect(() => {
    if (!match) return;

    const allPlayers = [
      ...(match.homeTeam.players ?? []),
      ...(match.awayTeam.players ?? []),
    ];

    const initialStats: Stat[] = allPlayers.map(player => {
      const existing = match.stats?.find(
        s => s.user.id === player.id
      );

      return (
        existing ?? {
          id: -1,
          user: player,
          points: 0,
          rebounds: 0,
          assists: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0,
          minutesPlayed: 0,
        }
      );
    });

    setLocalStats(initialStats);
  }, [match]);


  
  if (loading) {
    return (
      <p className="p-6 text-muted-foreground">
        Cargando partido…
      </p>
    );
  }
  
  if (error) {
    return (
      <p className="p-6 text-destructive">
        {error}
      </p>
    );
  }
  
  if (!match) return null;

  const formattedDate = new Date(match.date).toLocaleDateString();

  const homeTotals = calculateTeamTotals(
    localStats,
    match.homeTeam.players ?? []
  );

  const awayTotals = calculateTeamTotals(
    localStats,
    match.awayTeam.players ?? []
  );

  const handleStatChange = (
    userId: number,
    field: keyof Stat,
    value: number
  ) => {
    setLocalStats(prev =>
      prev.map(stat =>
        stat.user.id === userId
          ? { ...stat, [field]: value }
          : stat
      )
    );
  };

  const handleSaveStats = async () => {
    if (!match) return;

    try {
      for (const stat of localStats) {
        const payload = {
          matchId: match.id,
          userId: stat.user.id,
          points: stat.points,
          rebounds: stat.rebounds,
          assists: stat.assists,
          steals: stat.steals,
          blocks: stat.blocks,
          turnovers: stat.turnovers,
          fouls: stat.fouls,
          minutesPlayed: stat.minutesPlayed,
        };

        if (stat.id === -1) {
          await createStat(payload);
        } else {
          await updateStat(stat.id, payload);
        }
      }

      alert('Estadísticas guardadas correctamente');
    } catch {
      alert('Error al guardar estadísticas');
    }
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card">
        <Link to={-1 as any} className="text-sm text-primary">
          ← Volver
        </Link>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {/* Match info */}
        <div className="rounded-lg border bg-card p-6 mb-6">
          <p className="text-sm text-muted-foreground">
            {formattedDate} · {match.hour} · {match.location}
          </p>

          <h2 className="text-2xl font-bold text-center my-6">
            {match.homeTeam.name}
            <span className="mx-4">
              {match.scoreHome !== null
                ? `${match.scoreHome} - ${match.scoreAway}`
                : 'vs'}
            </span>
            {match.awayTeam.name}
          </h2>

          {match.scoreHome === null && (
            <p className="text-center text-muted-foreground">
              Partido pendiente de disputar
            </p>
          )}
        </div>

        {/* Team totals */}
        <div className="flex flex-col gap-4 mb-10">
          <TeamTotalsCard
            teamName={match.homeTeam.name}
            totals={homeTotals}
          />
          <TeamTotalsCard
            teamName={match.awayTeam.name}
            totals={awayTotals}
          />
        </div>

        <h3 className="text-lg font-semibold mb-4">
          Estadísticas por jugador
        </h3>
        {canEditStats && (
          <button
            onClick={handleSaveStats}
            className="mb-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Guardar estadísticas
          </button>
        )}
        <MatchStatsEditableTable
          team={match.homeTeam as any}
          stats={localStats}
          canEdit={canEditStats}
          onChange={handleStatChange}
        />

        <MatchStatsEditableTable
          team={match.awayTeam as any}
          stats={localStats}
          canEdit={canEditStats}
          onChange={handleStatChange}
        />

      </main>
    </div>
  );
}

export default MatchDetailPage;
