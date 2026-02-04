import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/apiClient';
import { useAuth } from '../auth/useAuth';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      authLogin(result.accessToken, result.user);

      localStorage.setItem('token', result.accessToken);
      
      navigate('/dashboard');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-[350px] rounded-lg border bg-card p-6 text-card-foreground shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Username
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium transition-opacity disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Login'}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-sm text-foreground">¿Aún no tienes cuenta?</span>
            <Link
              to="/register"
              className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
