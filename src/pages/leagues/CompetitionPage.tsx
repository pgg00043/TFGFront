import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCompetitionById, getCompetitionMatches, getCompetitionStandings } from '../../api/apiClient';
import StandingsTable from '../../components/tables/StandingsTable';
import MatchesTable from '../../components/tables/MatchesTable';
import AddTeamToCompetition from "../../components/actions/addTeamToCompetition";
import { useAuth } from '../../auth/useAuth';


type Team = {
  id: number;
  name: string;
  players?: number[];
  competitions?: number[];
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
};

type Match = {
  id: number;
  date: Date;
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
  competitionId: number;
};

type Competition = {
  id: number;
  name: string;
  category: string;
  teams: Team[];
  owner: {
    id: number;
    name: string;
  };
};

type StandingRow = {
  id: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
};

type Tab = 'standings' | 'matches';

function CompetitionPage() {
  const params = useParams();
  const competitionId = useMemo(() => Number(params.id), [params.id]);

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [tab, setTab] = useState<Tab>('standings');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [standingsLoading, setStandingsLoading] = useState(true);
  const [standingsError, setStandingsError] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [matchesError, setMatchesError] = useState('');
  const { user } = useAuth();

  const isOwner = useMemo(() => {
    if (!competition || !user) return false;
    return competition.owner?.id === user.userId;
  }, [competition, user]);
  const [ownerOpen, setOwnerOpen] = useState(false);

  useEffect(() => {
    if (!competitionId) {
      setError('ID de competición no válido');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getCompetitionById(competitionId);
        setCompetition(data);
      } catch {
        setError('No se ha podido cargar la competición');
      } finally {
        setLoading(false);
      }
    })();
  }, [competitionId]);


  useEffect(() => {
    if (!competitionId){
      setError('ID de competición no válido');
      setLoading(false);
      return;
    };

    (async () => {
      try {
        setStandingsLoading(true);
        const data = await getCompetitionStandings(competitionId);
        setStandings(data);
      } catch {
        setStandingsError('No se ha podido cargar la clasificación');
      } finally {
        setStandingsLoading(false);
      }
    })();
  }, [competitionId]);

  useEffect(() => {
    if (!competitionId) return;

    (async () => {
      try {
        setMatchesLoading(true);
        const data = await getCompetitionMatches(competitionId);
        setMatches(data);
      } catch {
        setMatchesError('No se han podido cargar los partidos');
      } finally {
        setMatchesLoading(false);
      }
    })();
  }, [competitionId]);



  const tabBase =
    'px-3 py-2 rounded-md text-sm border border-border';
  const tabActive =
    'bg-primary text-primary-foreground border-primary';
  const tabInactive =
    'bg-card text-foreground hover:opacity-90';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Basket League</h1>
          <p className="text-sm text-muted-foreground">
            Competición
          </p>
        </div>

        <Link
          to="/dashboard"
          className="text-sm text-primary hover:opacity-90"
        >
          ← Volver a competiciones
        </Link>
      </header>

      <main className="p-6">
        {loading && (
          <p className="text-muted-foreground">Cargando competición…</p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && competition && (
          <>
            {/* Competition info */}
            <div className="rounded-lg border bg-card p-5 mb-6">
              <h2 className="text-2xl font-bold">{competition.name}</h2>
              <p className="text-muted-foreground">
                Categoría: {competition.category}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Equipos inscritos: {competition.teams?.length ?? 0}
              </p>
            </div>
            {/* Owner actions (collapsible) */}
            {isOwner && (
              <div className="rounded-lg border bg-card p-5 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-0">Gestión de equipos</h3>
                  <button
                    onClick={() => setOwnerOpen(o => !o)}
                    aria-expanded={ownerOpen}
                    className="text-sm text-primary hover:opacity-90"
                  >
                    {ownerOpen ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>

                {ownerOpen && (
                  <div className="mt-4">
                    <AddTeamToCompetition competitionId={competition.id} />
                  </div>
                )}
              </div>
            )}


            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('standings')}
                className={`${tabBase} ${tab === 'standings' ? tabActive : tabInactive}`}
              >
                Clasificación
              </button>

              <button
                onClick={() => setTab('matches')}
                className={`${tabBase} ${tab === 'matches' ? tabActive : tabInactive}`}
              >
                Partidos
              </button>
            </div>

            {tab === 'standings' && (
              <div className="rounded-lg border bg-card p-5">
                <h3 className="text-lg font-semibold mb-4">Clasificación</h3>

                {standingsLoading && (
                  <p className="text-muted-foreground">
                    Cargando clasificación…
                  </p>
                )}

                {standingsError && (
                  <p className="text-sm text-destructive">
                    {standingsError}
                  </p>
                )}

                {!standingsLoading && !standingsError && (
                  <StandingsTable standings={standings} />
                )}
              </div>
            )}

            {tab === 'matches' && (
              <div className="rounded-lg border bg-card p-5">
                <h3 className="text-lg font-semibold mb-4">Partidos</h3>

                {matchesLoading && (
                  <p className="text-muted-foreground">Cargando partidos…</p>
                )}

                {matchesError && (
                  <p className="text-sm text-destructive">{matchesError}</p>
                )}

                {!matchesLoading && !matchesError && (
                  <MatchesTable matches={matches} />
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default CompetitionPage;
