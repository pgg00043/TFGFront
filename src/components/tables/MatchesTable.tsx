import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../../api/apiClient";

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
};

type Props = {
  matches: Match[];
  isOwner?: boolean;
};

function MatchesTable({ matches, isOwner }: Props) {
  const navigate = useNavigate();

  const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
  const [form, setForm] = useState({
    date: "",
    scoreHome: "",
    scoreAway: "",
    hour: "",
    location: "",
  });

  const startEdit = (match: Match) => {
    setEditingMatchId(match.id);

    const formattedDate = match.date
      ? new Date(match.date).toISOString().split("T")[0]
      : "";

    setForm({
      date: formattedDate,
      scoreHome: match.scoreHome?.toString() ?? "",
      scoreAway: match.scoreAway?.toString() ?? "",
      hour: match.hour ?? "",
      location: match.location ?? "",
    });
  };


  const cancelEdit = () => {
    setEditingMatchId(null);
  };

  const saveEdit = async (matchId: number) => {
    await updateMatch(matchId, {
      date: form.date? new Date(form.date).toISOString() : null,
      scoreHome: Number(form.scoreHome),
      scoreAway: Number(form.scoreAway),
      hour: form.hour,
      location: form.location,
    });

    setEditingMatchId(null);
  };

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
            {isOwner && <th className="py-2 text-center">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {matches.map((match) => {
            const isEditing = editingMatchId === match.id;
            const formattedDate = new Date(match.date).toLocaleDateString();

            return (
              <tr
                key={match.id}
                className="border-b border-border hover:bg-muted"
                onClick={() => {
                  if (!isEditing) {
                    navigate(`/matches/${match.id}`);
                  }
                }}
              >
                <td className="py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="rounded-md border border-border bg-white text-black px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    formattedDate
                  )}
                </td>


                <td className="py-2">
                  {isEditing ? (
                    <input
                      value={form.hour}
                      onChange={(e) =>
                        setForm({ ...form, hour: e.target.value })
                      }
                      className="rounded-md border border-border bg-white text-black px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    match.hour
                  )}
                </td>

                <td className="py-2">
                  {isEditing ? (
                    <input
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className="rounded-md border border-border bg-white text-black px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    match.location
                  )}
                </td>

                <td className="py-2 font-medium">
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </td>

                <td className="py-2 text-center font-semibold">
                  {isEditing ? (
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        value={form.scoreHome}
                        onChange={(e) =>
                          setForm({ ...form, scoreHome: e.target.value })
                        }
                        className="rounded-md border border-border bg-white text-black px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={form.scoreAway}
                        onChange={(e) =>
                          setForm({ ...form, scoreAway: e.target.value })
                        }
                        className="rounded-md border border-border bg-white text-black px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ) : match.scoreHome !== null ? (
                    `${match.scoreHome} - ${match.scoreAway}`
                  ) : (
                    "—"
                  )}
                </td>

                {isOwner && (
                  <td className="py-2 text-center">
                    {!isEditing ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(match);
                        }}
                        className="text-primary text-sm hover:opacity-80"
                      >
                        Editar
                      </button>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit(match.id);
                          }}
                          className="text-primary text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEdit();
                          }}
                          className="text-muted-foreground text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MatchesTable;
