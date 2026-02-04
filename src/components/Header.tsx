import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/useAuth";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b bg-card text-card-foreground">
      {/* CONTENEDOR FULL WIDTH REAL */}
      <div className="flex h-16 items-center justify-between px-6">

        {/* IZQUIERDA */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          Basket League
        </Link>

        {/* DERECHA */}
        <nav className="flex items-center gap-6">

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
              >
                {user?.username}
                <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-md border bg-card shadow-lg">
                  <Link
                    to="/my-teams"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    Mis equipos
                  </Link>

                  <Link
                    to="/my-leagues"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    Mis ligas
                  </Link>

                  <Link
                    to={`/profile/${user?.id}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    Mi perfil
                  </Link>

                  <div className="border-t" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
