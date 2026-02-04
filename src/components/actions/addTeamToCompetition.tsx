import { useEffect, useState } from "react";
import { getAllTeams, addTeamToCompetition } from "../../api/apiClient";
import { useNotification } from "../../ui/NotificationContext";


interface Props {
  competitionId: number;
}

export default function AddTeamToCompetition({ competitionId }: Props) {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    getAllTeams().then(setTeams);
  }, []);

  const handleAdd = async () => {
    if (!selectedTeam) return;

    try {
      setLoading(true);
      await addTeamToCompetition(competitionId, selectedTeam);
      notify("Equipo añadido a la liga", "success");
    } catch {
      notify("No tienes permiso para añadir este equipo", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h3 className="font-bold">Añadir equipo a la liga</h3>

      <select
        className="border p-2 w-full bg-white text-black"
        onChange={(e) => setSelectedTeam(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Selecciona un equipo
        </option>

        {teams.map((team) => (
          <option key={team.id} value={team.id} className="bg-white text-black">
            {team.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Añadir
      </button>
    </div>
  );
}
