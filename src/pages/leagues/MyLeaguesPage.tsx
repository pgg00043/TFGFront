import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCompetitions } from "../../api/apiClient";


type Competition = {
  id: number;
  name: string;
  category: string;
};


export default function MyLeaguesPage() {


  const [leagues, setLeagues] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCompetitions()
      .then(setLeagues)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Cargando tus ligas...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis ligas</h1>

        <Link
          to="/competitions/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear liga
        </Link>
      </div>

      {leagues.length === 0 ? (
        <p>No has creado ninguna liga todavía.</p>
      ) : (
        <ul className="space-y-3">
          {leagues.map((league) => (
            <li
              key={league.id}
              className="border rounded p-4 hover:bg-gray-50"
            >
              <Link to={`/competition/${league.id}`}>
                <p className="font-semibold">{league.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
