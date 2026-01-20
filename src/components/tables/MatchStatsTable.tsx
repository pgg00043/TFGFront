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
  user: {
    id: number;
    name: string;
    surname: string;
    team: {
      id: number;
      name: string;
    };
  };
};

type Props = {
  stats: Stat[];
};

function MatchStatsTable({ stats }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2">Jugador</th>
            <th className="py-2 text-center">MIN</th>
            <th className="py-2 text-center">PTS</th>
            <th className="py-2 text-center">REB</th>
            <th className="py-2 text-center">AST</th>
            <th className="py-2 text-center">ROB</th>
            <th className="py-2 text-center">TAP</th>
            <th className="py-2 text-center">PER</th>
            <th className="py-2 text-center">FAL</th>
          </tr>
        </thead>

        <tbody>
          {stats.map((stat) => (
            <tr
              key={stat.id}
              className="border-b border-border hover:bg-muted"
            >
              <td className="py-2 font-medium">
                {stat.user.name} {stat.user.surname}
              </td>
              <td className="py-2 text-center">{stat.minutesPlayed}</td>
              <td className="py-2 text-center font-semibold">
                {stat.points}
              </td>
              <td className="py-2 text-center">{stat.rebounds}</td>
              <td className="py-2 text-center">{stat.assists}</td>
              <td className="py-2 text-center">{stat.steals}</td>
              <td className="py-2 text-center">{stat.blocks}</td>
              <td className="py-2 text-center">{stat.turnovers}</td>
              <td className="py-2 text-center">{stat.fouls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatchStatsTable;
