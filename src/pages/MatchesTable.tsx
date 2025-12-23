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

type Props = {
  matches: Match[];
};

function MatchesTable({ matches }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 text-left">Fecha</th>
            <th className="py-2 text-left">Hora</th>
            <th className="py-2 text-left">Lugar</th>
            <th className="py-2 text-left">Partido</th>
            <th className="py-2 text-center">Resultado</th>
          </tr>
        </thead>

        <tbody>
          {matches.map((match) => {
            const formattedDate = new Date(match.date).toLocaleDateString();

            return (
              <tr
                key={match.id}
                className="border-b border-border hover:bg-muted"
              >
                <td className="py-2">{formattedDate}</td>
                <td className="py-2">{match.hour}</td>
                <td className="py-2">{match.location}</td>
                <td className="py-2 font-medium">
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </td>
                <td className="py-2 text-center font-semibold">
                  {match.scoreHome !== null
                    ? `${match.scoreHome} - ${match.scoreAway}`
                    : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MatchesTable;
