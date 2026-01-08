import { useState } from "react";

export default function CreateLeague() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/competition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        season,
      }),
    });

    if (!response.ok) {
      alert("Error al crear la liga");
      return;
    }

    alert("Liga creada correctamente");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Nombre de la liga"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Temporada"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Crear liga
      </button>
    </form>
  );
}
