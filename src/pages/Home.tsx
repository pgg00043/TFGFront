import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

function Home() {
  const { user, isAuthenticated } = useAuth();

  console.log('AUTH STATE:', user, isAuthenticated);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-[420px] rounded-lg border bg-card p-8 text-card-foreground shadow text-center space-y-6">
        
        <h1 className="text-3xl font-bold">
          Basket App
        </h1>

        <p className="text-muted-foreground">
          Plataforma para gestionar ligas, equipos, partidos y estadísticas.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium text-center"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full rounded-md border border-primary text-primary py-2 font-medium text-center"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
