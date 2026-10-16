# Lúdicamente — Plataforma E-commerce (Medusa v2 + Next.js)

Plataforma de comercio electrónico para juegos de mesa, juguetes didácticos y material pedagógico en Chile.

- **Backend:** [Medusa.js v2](https://medusajs.com) (Node.js + TypeScript + PostgreSQL 16) en `apps/backend`
- **Storefront:** [Next.js](https://nextjs.org) (App Router + React 19 + Tailwind CSS) en `apps/storefront`
- **Monorepo:** npm workspaces estructurado para desarrollo independiente y despliegues desacoplados

---

## 🚀 Inicio Rápido en Desarrollo Local

### 1. Requisitos Previos
- **Node.js:** `>= 20.x` (Verificado y compatible con `v24.21.0`)
- **npm:** `>= 10.x` (`npm 11.19.0`)
- **PostgreSQL:** `>= 15.x` (Ejecutándose localmente en puerto `5432`)
  - Base de datos requerida: `medusa_ludicamente`
  - URL de conexión: `postgres://localhost:5432/medusa_ludicamente`

### 2. Comandos del Monorepo

Desde la raíz del repositorio:

```bash
# Levantar el backend de Medusa v2 (API en :9000, Admin en :9000/app)
npm run dev:backend

# Levantar el storefront Next.js (Web en :3008)
npm run dev:storefront

# Ejecutar la semilla DEMO Chile (Catálogo, CLP, Región y Publishable Key)
npm run seed:demo

# Construir ambas aplicaciones para producción
npm run build
```

---

## 🔑 Credenciales de Acceso a Medusa Admin

- **Panel de Control:** [http://localhost:9000/app](http://localhost:9000/app)
- **Email:** `admin@ludicamente.cl`
- **Contraseña:** `supersecret`

---

## 📂 Documentación del Proyecto

Consulte la carpeta `docs/` para detalles técnicos profundos:
- [docs/ARCHITECTURE.md](file:///Volumes/SAMSUNG/Sitios%20Web/LUDICAMENTE/docs/ARCHITECTURE.md): Topología del monorepo, flujos de datos y módulo `whatsapp-inquiry`.
- [docs/DECISIONS.md](file:///Volumes/SAMSUNG/Sitios%20Web/LUDICAMENTE/docs/DECISIONS.md): Registro de Decisiones de Arquitectura (ADRs formales).
- [docs/DESIGN.md](file:///Volumes/SAMSUNG/Sitios%20Web/LUDICAMENTE/docs/DESIGN.md): Sistema de Diseño "Editorial Lúdica Contemporánea" (tokens, accesibilidad WCAG AA).
- [docs/OPERACION_CLIENTE.md](file:///Volumes/SAMSUNG/Sitios%20Web/LUDICAMENTE/docs/OPERACION_CLIENTE.md): Guía operativa y manual para administradores comerciales.
- [docs/ROADMAP.md](file:///Volumes/SAMSUNG/Sitios%20Web/LUDICAMENTE/docs/ROADMAP.md): Plan de evolución V2 (pasarelas de pago y logística chilena).

---

## 🇨🇱 Especificaciones Comerciales Chile (V1)
- **Moneda:** Pesos Chilenos (`CLP`), representada siempre como número entero sin decimales (`maximumFractionDigits: 0`).
- **Disponibilidad:** Modo asistido (`manage_inventory: false`) con etiqueta unificada *"Disponibilidad por confirmar"*.
- **Conversión:** Checkout formal hacia WhatsApp con código único de pedido (`LUD-XXXXXX`) y recálculo de precios seguro en el backend.
