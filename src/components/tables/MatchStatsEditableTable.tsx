import type { Stat, Team, User } from '../../entitys/Entity';

type Props = {
    team: Team;
    stats: Stat[];
    canEdit: boolean;
    onChange?: (
        userId: number,
        field: keyof Stat,
        value: number
    ) => void;
};

type EditableStatField =
    | 'points'
    | 'rebounds'
    | 'assists'
    | 'steals'
    | 'blocks'
    | 'turnovers'
    | 'fouls'
    | 'minutesPlayed';

const STAT_FIELDS: { key: EditableStatField; label: string }[] = [
    { key: 'points', label: 'PTS' },
    { key: 'rebounds', label: 'REB' },
    { key: 'assists', label: 'AST' },
    { key: 'steals', label: 'STL' },
    { key: 'blocks', label: 'BLK' },
    { key: 'turnovers', label: 'TO' },
    { key: 'fouls', label: 'F' },
    { key: 'minutesPlayed', label: 'MIN' },
];


function getOrCreateStat(
    stats: Stat[],
    player: User
): Stat {
    const existing = stats.find(s => s.user.id === player.id);
    if (existing) return existing;

    return {
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
    };
}

export default function MatchStatsEditableTable({
    team,
    stats,
    canEdit,
    onChange,
}: Props) {
    const players = team.players ?? [];

    return (
        <div className="rounded-lg border bg-card p-4 mb-6">
            <h4 className="font-semibold mb-3">{team.name}</h4>

            <table className="w-full text-sm">
            <thead>
                <tr className="border-b text-muted-foreground">
                <th className="text-left py-2">Jugador</th>
                {STAT_FIELDS.map(stat => (
                    <th key={stat.key} className="text-center">
                    {stat.label}
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {players.map(player => {
                const stat = getOrCreateStat(stats, player);

                return (
                    <tr key={player.id} className="border-b last:border-b-0">
                    <td className="py-2">
                        {player.name} {player.surname}
                    </td>

                    {STAT_FIELDS.map(({ key }) => (
                        <td key={key} className="text-center">
                        {canEdit ? (
                            <input
                            type="number"
                            min={0}
                            value={stat[key]}
                            onChange={e =>
                                onChange?.(
                                player.id,
                                key,
                                Number(e.target.value)
                                )
                            }
                            className="w-12 rounded border bg-background text-center"
                            />
                        ) : (
                            <span>{stat[key]}</span>
                        )}
                        </td>
                    ))}
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
    );
}