# TracAuto Marketplace

Frontend público del Marketplace de vehículos TracAuto.

## Stack Tecnológico

- **React 18** + **TypeScript** - Framework UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **React Router 6** - Enrutamiento
- **React Query** - Estado de servidor y caché
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **PWA** - Progressive Web App (vite-plugin-pwa)

## Requisitos Previos

- Node.js 18+
- npm 9+ o yarn 1.22+

## Instalación

```bash
# Clonar el repositorio (si no está clonado)
git clone https://github.com/tu-usuario/TracAutoMarketPlaceFront.git
cd TracAutoMarketPlaceFront

# Instalar dependencias
npm install
```

## Configuración

1. Copiar el archivo de variables de entorno:

```bash
cp .env.example .env.local
```

2. Editar `.env.local` con la URL del backend:

```env
VITE_API_BASE_URL=http://localhost:5200/api
VITE_API_VERSION=v1
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## Build de Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Ejecuta ESLint |

## Estructura del Proyecto

```
src/
├── app/
│   ├── layouts/          # Layout principal (Header, Footer)
│   ├── providers/        # Providers (QueryClient, Toast)
│   └── routes/           # Configuración de rutas
├── config/
│   └── env.ts            # Variables de entorno tipadas
├── features/
│   ├── catalogo/         # Feature de listado de vehículos
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── detalle/          # Feature de detalle de vehículo
│       └── pages/
├── services/
│   ├── endpoints/        # API endpoints
│   └── http/             # Cliente HTTP y interceptores
├── shared/
│   ├── types/            # DTOs y tipos compartidos
│   └── ui/               # Componentes UI reutilizables
└── store/                # Zustand stores
```

## Endpoints API Consumidos

El frontend consume los siguientes endpoints públicos del backend TracAuto:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/public/v1/marketplace/vehicles` | Lista paginada de vehículos |
| GET | `/api/public/v1/marketplace/vehicles/{id}` | Detalle de un vehículo |

## PWA

La aplicación es una Progressive Web App instalable. Características:

- **Instalable** en dispositivos móviles y desktop
- **Offline-first** para assets estáticos
- **Cache de API** con estrategia Network-First

## Checklist de Validación

- [ ] La aplicación carga correctamente en `http://localhost:5173`
- [ ] La navegación entre catálogo y detalle funciona
- [ ] El menú móvil abre/cierra correctamente
- [ ] Las llamadas de red aparecen en Network (aunque fallen por backend)
- [ ] La PWA es instalable (ver ícono en barra de direcciones)
- [ ] El build de producción genera sin errores

## Notas

- El frontend está diseñado para funcionar con los endpoints **públicos** del backend TracAuto
- Si el backend no tiene los endpoints públicos implementados, la app mostrará "Sin resultados"
- El diseño es **mobile-first** con soporte completo para desktop

## Licencia

Propietario - TracAuto © 2024
