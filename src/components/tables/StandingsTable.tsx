import { Link } from "react-router-dom";

type StandingRow = {
  id: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
};

type Props = {
  standings: StandingRow[];
};

function StandingsTable({ standings }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2">Equipo</th>
            <th className="py-2 text-center">PJ</th>
            <th className="py-2 text-center">G</th>
            <th className="py-2 text-center">P</th>
            <th className="py-2 text-center">PF</th>
            <th className="py-2 text-center">PC</th>
            <th className="py-2 text-center">Dif</th>
          </tr>
        </thead>

        <tbody>
          {standings.map((row) => {
            const diff = row.pointsFor - row.pointsAgainst;

            return (
              <tr
                key={`${row.id}-${row.name}`}
                className="border-b border-border hover:bg-muted"
              >
                <td className="py-2 font-medium">
                  <Link to={`/team/${row.id}`} className="text-primary">
                    {row.name}
                  </Link>
                </td>
                <td className="py-2 text-center">{row.played}</td>
                <td className="py-2 text-center">{row.won}</td>
                <td className="py-2 text-center">{row.lost}</td>
                <td className="py-2 text-center">{row.pointsFor}</td>
                <td className="py-2 text-center">{row.pointsAgainst}</td>
                <td className="py-2 text-center">
                  {diff > 0 ? `+${diff}` : diff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;
