import { useState } from "react";
import { searchPlayers, addPlayerToTeam } from "../../api/apiClient";
import { useNotification } from "../../ui/NotificationContext";


interface Props {
  teamId: number;
}

export default function AddPlayerToTeam({ teamId }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await searchPlayers(query);
      setResults(data);
    } catch {
      notify("Error al buscar jugadores", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!selectedPlayer) return;

    try {
      setLoading(true);
      await addPlayerToTeam(teamId, selectedPlayer.id);
      notify("Jugador añadido al equipo", "success");
      setQuery("");
      setResults([]);
      setSelectedPlayer(null);
    } catch {
      notify("No tienes permiso para añadir este jugador", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h3 className="font-bold">Añadir jugador al equipo</h3>

      {/* BUSCADOR */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar jugador por nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1 bg-white text-black"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Buscar
        </button>
      </div>

      {/* RESULTADOS */}
      {results.length > 0 && (
        <ul className="border rounded divide-y">
          {results.map((player) => (
            <li
              key={player.id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedPlayer?.id === player.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedPlayer(player)}
            >
              {player.name}
            </li>
          ))}
        </ul>
      )}

      {/* ACCIÓN */}
      <button
        onClick={handleAdd}
        disabled={!selectedPlayer || loading}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Añadir jugador
      </button>
    </div>
  );
}
