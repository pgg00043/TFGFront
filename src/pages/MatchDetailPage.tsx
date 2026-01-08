import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMatchById } from '../api/apiClient';
import MatchStatsTable from './MatchStatsTable.tsx';
import TeamTotalsCard from './TeamTotalsCard';

/* =======================
   TIPOS
======================= */

type Player = {
  id: number;
  name: string;
  surname: string;
  team: {
    id: number;
    name: string;
  };
};

type Stat = {
  id: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  minutesPlayed: number;
  user: Player;
};

type Match = {
  id: number;
  date: string;
  hour: string;
  location: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  scoreHome: number | null;
  scoreAway: number | null;
  stats?: Stat[];
};

/* =======================
   UTILIDADES
======================= */

function calculateTeamTotals(stats: Stat[] | undefined, teamId: number) {
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

  return stats
    .filter(stat => stat.user.team.id === teamId)
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


/* =======================
   COMPONENTE
======================= */

function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const matchId = id ? Number(id) : null;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    match.stats ?? [],
    match.homeTeam.id
  );
  const awayTotals = calculateTeamTotals(
    match.stats ?? [],
    match.awayTeam.id
  );

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

        {/* Individual stats */}
        <h3 className="text-lg font-semibold mb-4">
          Estadísticas individuales
        </h3>

        {(match.stats ?? []).length > 0 ? (
          <MatchStatsTable stats={match.stats ?? []} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay estadísticas registradas para este partido.
          </p>
        )}
      </main>
    </div>
  );
}

export default MatchDetailPage;
