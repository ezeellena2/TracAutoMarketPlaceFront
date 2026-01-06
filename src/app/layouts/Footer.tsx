import { Car } from 'lucide-react';

export function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container-app py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-text-muted">
            <Car className="w-5 h-5" />
            <span className="font-semibold">TracAuto Marketplace</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <a
              href="https://tracauto.com/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Términos y condiciones
            </a>
            <a
              href="https://tracauto.com/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Privacidad
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            © {anioActual} TracAuto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
