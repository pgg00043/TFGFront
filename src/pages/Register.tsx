import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api/apiClient';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            await register({
                name,
                surname,
                username,
                email,
                password,
            });

            setSuccess('Usuario registrado correctamente');
            setName('');
            setSurname('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch {
            setError('Error al registrar el usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-[380px] rounded-lg border bg-card p-6 text-card-foreground shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
            Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Name</label>
                <input
                type="name"
                className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Surname</label>
                <input
                type="surname"
                className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={loading}
                required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Username</label>
                <input
                    className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Password</label>
                <input
                    type="password"
                    className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Confirm password</label>
                <input
                    type="password"
                    className="w-full rounded-md border px-3 py-2 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            {error && (
            <p className="text-sm text-destructive text-center">
                {error}
            </p>
            )}

            {success && (
            <p className="text-sm text-secondary text-center">
                {success}
            </p>
            )}

            <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium transition-opacity disabled:opacity-50"
            >
            {loading ? 'Registrando...' : 'Register'}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-sm text-foreground">¿Ya tienes cuenta?</span>
            <Link
                to="/login"
                className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
            >
                Login
            </Link>
            </div>
        </form>
        </div>
    </div>
    );
}

export default Register;
