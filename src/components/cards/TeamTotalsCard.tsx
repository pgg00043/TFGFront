type Totals = {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
};

type Props = {
  teamName: string;
  totals: Totals;
};

function TeamTotalsCard({ teamName, totals }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h4 className="font-semibold mb-3">{teamName}</h4>

      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex justify-between"><span>PTS</span><span>{totals.points}</span></li>
        <li className="flex justify-between"><span>REB</span><span>{totals.rebounds}</span></li>
        <li className="flex justify-between"><span>AST</span><span>{totals.assists}</span></li>
        <li className="flex justify-between"><span>ROB</span><span>{totals.steals}</span></li>
        <li className="flex justify-between"><span>TAP</span><span>{totals.blocks}</span></li>
        <li className="flex justify-between"><span>PER</span><span>{totals.turnovers}</span></li>
        <li className="flex justify-between"><span>FAL</span><span>{totals.fouls}</span></li>
      </ul>
    </div>
  );
}

export default TeamTotalsCard;
