# Registro de Decisiones de Arquitectura (ADR) — Lúdicamente

## ADR 001: Módulo Personalizado `whatsapp-inquiry` vs Medusa Quote Management vs Draft Orders

### Contexto
En la Versión 1 (V1), Lúdicamente opera bajo el modelo **"Catálogo + Carrito Cotizador hacia WhatsApp con Trazabilidad en Backend"**:
- El cliente llena un carrito en el storefront y presiona *"Consultar pedido por WhatsApp"*.
- No existe pasarela de pago online activa en V1 (se introducirá en V2 con Webpay / Flow / Mercado Pago).
- Se requiere que el backend recalcule los precios en CLP de forma segura (sin confiar en el cliente), asigne un código legible (ej: `LUD-000101`), persista el snapshot de los productos/cantidades cotizados, y permita al equipo comercial gestionar el ciclo de vida de la cotización desde Medusa Admin.

### Evaluación de Opciones

1. **Opción A: Usar Draft Orders nativos de Medusa v2**
   - *Pros:* Es una entidad estándar del core.
   - *Contras:* Los Draft Orders en Medusa v2 están diseñados para requerir cliente registrado, dirección formal de facturación/envío y asignación de métodos de pago. Forzar un Draft Order en un flujo rápido de consulta sin registro agrega fricción innecesaria y puede reservar inventario o generar órdenes incompletas en el panel de ventas oficial.

2. **Opción B: Usar la guía oficial "Quote Management" de Medusa v2**
   - *Pros:* La guía de Quotes de Medusa v2 ilustra la extensión de flujos B2B/cotizaciones vinculando Carts a un modelo de Quotes.
   - *Contras:* La arquitectura de Quote Management de Medusa está pensada para ciclos de aprobación B2B multi-usuario con cuentas corporativas y mensajes dentro de la plataforma. Para una tienda B2C cuyo canal de cierre y negociación es WhatsApp, este enfoque introduce sobrecarga conceptual.

3. **Opción C (ELEGIDA): Módulo Personalizado `whatsapp-inquiry` con Workflow Transaccional**
   - *Diseño:*
     - Se crea un módulo nativo Medusa v2 (`model.define` + `MedusaService`) totalmente tipado.
     - Se implementa un Workflow (`createWhatsappInquiryWorkflow`) que valida variantes, consulta precios de la región CLP en la base de datos, genera el código secuencial `LUD-XXXXXX`, guarda el snapshot inmutable y devuelve el enlace estructurado a WhatsApp (`wa.me`).
     - En Medusa Admin se crea una UI Route (`/admin/whatsapp-inquiries`) con componentes de `@medusajs/ui`.
   - *Ventajas:*
     - **Cero interferencia:** Deja intactos los modelos de `Cart`, `Order` y `PaymentCollection` nativos de Medusa v2 para cuando se integren pasarelas de pago en V2.
     - **Inmutabilidad vs Edición:** Mantiene el snapshot original inmutable para auditoría, pero provee campos `confirmed_items_snapshot` y `confirmed_total_clp` para que el vendedor registre sustituciones acordadas en WhatsApp.
     - **Regla de oro:** Abrir WhatsApp no descuenta inventario ni marca pedidos como pagados.

---

## ADR 002: Manejo de Moneda y Precios en CLP (Pesos Chilenos)

### Contexto
El peso chileno (CLP) no utiliza centavos en el comercio minorista. En Medusa v2, los montos monetarios se asocian a una región y moneda (`currency_code: 'clp'`).

### Decisión
- Todas las operaciones en la base de datos y en la API manejarán montos enteros en CLP.
- En el storefront y en el admin, todo formateo de moneda se realizará mediante el formateador unificado:
  ```ts
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })
  ```
- No se permitirán decimales en la presentación ni en los cálculos del subtotal.

---

## ADR 003: Política de Inventario y Disponibilidad en V1

### Contexto
En V1 no se dispone aún de sincronización automática de stock con un ERP físico o bodega central. Mostrar stock numérico puede frustrar al cliente si hay ventas físicas paralelas.

### Decisión
- Todos los productos y variantes del seed DEMO se configuran con `manage_inventory: false`.
- En el frontend (Ficha de Producto, Tarjetas y Carrito), se prohíbe mostrar cantidades numéricas en stock y se utiliza de manera uniforme la insignia/etiqueta:
  **"Disponibilidad por confirmar"** (estilo badge sutil en tono mostaza/cálido).
- La confirmación definitiva de disponibilidad se realiza de forma humana en la conversación de WhatsApp previa al pago/despacho.

---

## ADR 004: Monorepo y Comunicación Storefront <-> Backend

### Contexto
Se requiere desacoplar el motor comercial (backend) de la capa de experiencia de usuario (storefront) con bajo costo de mantenimiento y alta autonomía.

### Decisión
- **Backend:** Node.js + Medusa v2 + PostgreSQL en `/apps/backend`. El backend expone la Store API (`/store/...`), la Admin API y sirve la interfaz de Medusa Admin integrada.
- **Storefront:** Next.js (App Router) + TypeScript + Tailwind CSS en `/apps/storefront`.
- **SDK:** Comunicación cliente-servidor mediante `@medusajs/js-sdk` oficial con Publishable API Key para las rutas públicas de catálogo, y llamadas seguras tipo fetch para la API de solicitudes de WhatsApp.
- **Server Components:** Utilizados para el renderizado del catálogo, fichas de producto y metadatos SEO.
- **Client Components:** Carrito interactivo (drawer persistente en `localStorage`), formulario rápido de cotización y modal de WhatsApp.

---

## ADR 005: Idempotencia y Prevención de Duplicados en WhatsApp Inquiry

### Contexto
Los usuarios en móviles pueden hacer doble clic en el botón de consulta o recargar la pantalla tras ser redirigidos a WhatsApp.

### Decisión
- El storefront genera un `idempotency_key` (UUID v4) al iniciar el proceso de consulta.
- El endpoint `POST /store/whatsapp-inquiries` almacena la clave de idempotencia con índice único.
- Si se recibe una petición con la misma `idempotency_key` dentro de una ventana de tiempo, el backend retorna la solicitud existente sin duplicar el registro en la base de datos.

---

## ADR 006: Compatibilidad con Entorno de Ejecución Node.js v24 (v24.21.0)

### Contexto
El entorno anfitrión del sistema opera bajo Node.js `v24.21.0` y npm `11.19.0`. Medusa v2 declara soporte oficial para Node `>= 22.22.0`. Ciertas bibliotecas de compilación o binarios nativos (e.g. SWC, MikroORM, Next.js Turbopack) pueden presentar advertencias o incompatibilidades en ramas de versiones recientes de Node.

### Evaluación y Verificación
1. **Next.js Storefront:** El paquete `@tailwindcss/turbopack`, Next.js 16/15 y React 19 compilan sin errores en Node v24.21.0 (`next build` validado con 0 errores de TypeScript y empaquetado Turbopack exitoso).
2. **Medusa v2 Backend:** La suite de `@medusajs/framework` (2.21.2) y `@swc/core` (1.16.x) provee binarios precompilados darwin-arm64 (`@swc/core-darwin-arm64`) que ejecutan de forma nativa en Node 24 sin necesidad de recompilación con `node-gyp`.
3. **Decisión:** Mantener Node `v24.21.0` como runtime oficial de desarrollo, utilizando TypeScript con target ES2022 y resolución de módulos NodeNext/Bundler para asegurar consistencia en ambos espacios de trabajo.

---

## ADR 007: Optimización de Almacenamiento y `node_modules` en Discos Externos (FAT32/exFAT vs APFS)

### Contexto
El repositorio del proyecto se encuentra ubicado en un disco externo `/Volumes/SAMSUNG/Sitios Web/LUDICAMENTE` con sistema de archivos `msdos` (FAT32), administrado mediante el subsistema de usuario `fskit` de macOS.
En proyectos con árboles de dependencias masivos como Medusa v2 (más de 1.300 paquetes y 60.000 archivos individuales), la resolución y escritura de metadatos en un sistema de archivos FAT32 genera saturación de I/O y tiempos de resolución elevados.

### Decisión
1. Las dependencias complejas del backend (`apps/backend/node_modules`) se instalan y gestionan en el almacenamiento nativo APFS de alta velocidad (`~/.medusa-cache/backend-deps/node_modules`) y se enlazan simbólicamente de forma transparente hacia `apps/backend/node_modules`.
2. El código fuente, configuraciones, scripts de base de datos y migraciones residen íntegramente en el workspace de trabajo dentro de `/Volumes/SAMSUNG/Sitios Web/LUDICAMENTE`.
3. Esto garantiza tiempos de respuesta de milisegundos tanto para el CLI de Medusa v2 como para el servidor de desarrollo en Node v24.21.0.

---

## ADR 008: Modo Webpack en Next.js Storefront para Compatibilidad con FAT32

### Contexto
Al compilar con Turbopack (`next build` / `next dev` con Turbopack activado) en un volumen con sistema de archivos `msdos` (FAT32), la base de datos de persistencia de caché de Turbopack (basada en LMDB/SQLite con bloqueos de memoria `flock`) falla con el error `Failed to open database ... Loading persistence directory failed: invalid digit found in string` debido a las limitaciones del subsistema de archivo de bloqueo en FAT32.

### Decisión
Configurar los scripts de `apps/storefront/package.json` utilizando la bandera `--webpack` (`"dev": "next dev --webpack"`, `"build": "next build --webpack"`).
Esto asegura una compilación en memoria estable, predecible y 100% compatible con volúmenes de desarrollo externos, manteniendo soporte completo de TypeScript 5, React 19 y Tailwind CSS 4.

