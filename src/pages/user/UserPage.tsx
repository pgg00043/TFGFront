import { useParams, Link } from "react-router-dom";

function PlayerProfilePage() {
  const { id } = useParams<{ id: string }>();

  // 🔜 Aquí luego irá la llamada al backend
  const player = {
    id,
    username: "JugadorDemo",
    email: "jugador@email.com",
    rol: "player",
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* CABECERA JUGADOR */}
        <div className="rounded-lg border bg-card p-6 shadow">
          <h1 className="text-2xl font-bold text-card-foreground">
            Perfil del jugador
          </h1>

          <p className="mt-2 text-muted-foreground">
            Información pública y estadísticas del jugador
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Usuario</p>
              <p className="font-medium">{player.username}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Rol</p>
              <p className="font-medium capitalize">{player.rol}</p>
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS GENERALES */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card p-6 text-center shadow">
            <p className="text-sm text-muted-foreground">Partidos jugados</p>
            <p className="mt-2 text-3xl font-bold">–</p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center shadow">
            <p className="text-sm text-muted-foreground">Puntos totales</p>
            <p className="mt-2 text-3xl font-bold">–</p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center shadow">
            <p className="text-sm text-muted-foreground">Media por partido</p>
            <p className="mt-2 text-3xl font-bold">–</p>
          </div>
        </div>

        {/* EQUIPOS */}
        <div className="rounded-lg border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold">Equipos</h2>

          <div className="mt-4 text-muted-foreground">
            Este apartado mostrará los equipos en los que ha participado el
            jugador.
          </div>
        </div>

        {/* HISTORIAL / PARTIDOS */}
        <div className="rounded-lg border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold">Actividad reciente</h2>

          <div className="mt-4 text-muted-foreground">
            Aquí se mostrará el historial de partidos y estadísticas individuales.
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="rounded-md border border-primary px-4 py-2 text-primary font-medium"
          >
            Volver a competiciones
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PlayerProfilePage;
