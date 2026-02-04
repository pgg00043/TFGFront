import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserById, uploadUserAvatar } from '../../api/apiClient';
import { useAuth } from '../../auth/useAuth';
import type { User } from '../../entitys/Entity';
import { useNotification } from '../../ui/NotificationContext.tsx';

function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const userId = useMemo(() => (id ? Number(id) : null), [id]);

  const { user: authUser } = useAuth();
  const { notify } = useNotification();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const isOwnProfile = authUser?.id === user?.id;

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch {
        notify('No se ha podido cargar el usuario', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    try {
      setUploading(true);
      await uploadUserAvatar(user.id, e.target.files[0]);
      const updated = await getUserById(user.id);
      setUser(updated);
    
      notify('Avatar actualizado', 'success');
    } catch {
      notify('Error al subir la imagen', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <p className="p-6 text-muted-foreground">Cargando perfil…</p>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-6 py-4 border-b border-border bg-card">
        <Link to={-1 as any} className="text-sm text-primary">
          ← Volver
        </Link>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
        <img
            src={
              user.imageUrl
                ? `http://localhost:3000${user.imageUrl}`
                : '/user-placeholder.png'
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {user.name} {user.surname}
            </h1>
            <p className="text-sm text-muted-foreground">
              @{user.username}
            </p>

            {isOwnProfile && (
              <label className="text-sm text-primary cursor-pointer">
                Cambiar avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-lg font-semibold mb-2">
            Información
          </h3>
          <p className="text-sm">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserProfilePage;
