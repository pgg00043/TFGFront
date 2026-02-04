import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompetition } from "../../api/apiClient";
import { useNotification } from "../../ui/NotificationContext";


export default function CreateLeague() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCompetition({ name, category });
      notify("Liga creada con éxito", "success");
      navigate("/my-leagues");
    } catch {
      notify("Error al crear la liga", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Nombre de la liga</label>
        <input
          className="w-full p-2 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Nombre de la liga"
          aria-label="Nombre de la liga"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Temporada</label>
        <input
          className="w-full p-2 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Temporada"
          aria-label="Temporada"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
        Crear liga
      </button>
    </form>
  );
}
