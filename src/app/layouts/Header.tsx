import { Link } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Car className="w-8 h-8" />
            <span className="font-bold text-xl hidden sm:inline">TracAuto Marketplace</span>
            <span className="font-bold text-xl sm:hidden">Marketplace</span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-text-muted hover:text-primary transition-colors"
            >
              Catálogo
            </Link>
            <a
              href="https://tracauto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors"
            >
              TracAuto.com
            </a>
          </nav>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 text-text-muted hover:text-text"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-text-muted hover:text-primary transition-colors"
                onClick={() => setMenuAbierto(false)}
              >
                Catálogo
              </Link>
              <a
                href="https://tracauto.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
              >
                TracAuto.com
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
