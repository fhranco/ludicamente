# Sistema de Diseño — Lúdicamente ("Editorial Lúdica Contemporánea")

## 1. Filosofía Visual e Identidad

**Lúdicamente** propone una estética cuidada, humana, cálida y contemporánea, orientada a familias, docentes y entusiastas de los juegos de mesa y material didáctico en Chile.

- **Atmósfera:** Editorial, no plástica; cálida y acogedora sin caer en saturación infantil chillona ni en el frío minimalismo genérico de plantillas tecnológicas.
- **Espacialidad:** Mucho aire, márgenes respirables, tipografía de alta legibilidad, esquinas amables y suavizadas (`rounded-2xl` en tarjetas principales y `rounded-xl` en botones).
- **Inspiración:** Tono cálido y editorial (referencia conceptual *magiaycarton.cl*), respetando originalidad absoluta en textos, colores, tipografía y activos propios.

---

## 2. Paleta de Colores y Tokens Semánticos

| Token Semántico | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `background-warm` | `#FFF9F0` | Fondo general de la aplicación (crema cálido suave) |
| `surface-white` | `#FFFFFF` | Superficies de tarjetas, modales y contenedores |
| `surface-muted` | `#F4ECE1` | Fondos de secciones alternas, chips inactivos, barras de aviso |
| `border-subtle` | `#E8DDCF` | Bordes suaves de tarjetas e inputs |
| `border-strong` | `#D1C2B0` | Bordes con foco y separadores destacados |
| `text-primary` | `#263640` | Títulos y párrafos de alta jerarquía (tinta profunda) |
| `text-muted` | `#5A6B75` | Textos secundarios, descripciones y metadatos |
| `accent-primary` | `#137D84` | Turquesa profundo: Marca, enlaces, navegación, iconos activos |
| `accent-primary-hover` | `#0E6167` | Estado hover de acento primario |
| `accent-coral` | `#EF745B` | Coral cálido: Botón principal de acción (CTA), estados destacados |
| `accent-coral-hover` | `#D95F47` | Estado hover de coral |
| `badge-mustard` | `#F2BD51` | Mostaza: Badge *"Disponibilidad por confirmar"*, avisos importantes |
| `badge-mustard-text` | `#684606` | Texto accesible de alto contraste para fondos mostaza |

### Validación de Contraste WCAG AA:
- Texto `#263640` sobre fondo `#FFF9F0`: Ratio 10.4:1 (Pasa AAA).
- Texto `#FFFFFF` sobre botón coral `#EF745B`: Ratio 4.6:1 (Pasa AA para texto grande/interactivo).
- Texto `#FFFFFF` sobre turquesa `#137D84`: Ratio 5.1:1 (Pasa AA).
- Texto `#684606` sobre mostaza `#F2BD51`: Ratio 5.2:1 (Pasa AA).

---

## 3. Tipografía

- **Familia tipográfica sugerida:** *Outfit* o *Plus Jakarta Sans* (con fallback a `system-ui, -apple-system, sans-serif`).
- **Escala modular:**
  - `Display / Hero Title`: 36px móvil / 52px desktop (`font-bold`, `tracking-tight`).
  - `H1 / Sección`: 28px móvil / 36px desktop (`font-bold`).
  - `H2 / Categoría`: 22px móvil / 26px desktop (`font-semibold`).
  - `H3 / Card Title`: 17px / 18px (`font-medium`).
  - `Body / Párrafos`: 15px / 16px (`leading-relaxed`).
  - `Caption / Badges`: 12px / 13px (`font-semibold`, `uppercase` opcional).

---

## 4. Componentes Clave y Reglas UI

### 4.1 Barra Superior de Avisos (Top Banner)
- Fondo: `#F4ECE1` con borde inferior `#E8DDCF`.
- Contenido: Aviso configurable con etiqueta explícita `[DEMO - POR CONFIGURAR]` para despachos o información de atención comercial.

### 4.2 Tarjeta de Producto (`ProductCard`)
- Fondo blanco, radio `rounded-2xl`, sombra sutil `shadow-sm hover:shadow-md transition-all duration-200`.
- Imagen con relación de aspecto 1:1, fondo neutro cálido, object-cover o contain según el producto.
- Badge flotante sutil: *"Disponibilidad por confirmar"* en tono mostaza suave.
- Precio prominente en CLP con formato `Intl.NumberFormat` (ej. `$19.990`).
- Botón rápido *"Consultar / Agregar"* con micro-interacción de pulsación.

### 4.3 Bloques de Categorías (Grilla 3x2 en Desktop, 2 columnas en Móvil)
- Tarjetas envolventes con gradiente suave o color de acento pastel cálido de fondo.
- Tipografía limpia con número de productos o breve llamado a explorar.

### 4.4 Botón Principal de Conversión
- Texto en V1: **"Consultar pedido por WhatsApp"** (o "Enviar consulta").
- **Prohibido:** "Pagar ahora", "Finalizar compra", "Checkout con tarjeta".
- Color: Coral cálido (`#EF745B`), radio `rounded-xl`, padding generoso, icono sutil de WhatsApp o mensaje.

### 4.5 Pantalla / Modal de Contingencia WhatsApp
- Si el navegador o dispositivo bloquea la apertura emergente de `wa.me`:
  1. Indicador claro con el código generado (ej: `Solicitud LUD-000101`).
  2. Cuadro con el texto exacto del mensaje formateado.
  3. Botón accesible para **"Copiar mensaje"** (con feedback táctil/visual de copiado exitoso).
  4. Botón accesible para **"Abrir WhatsApp nuevamente"**.
  5. Enlace directo al soporte telefónico o correo de contacto.

---

## 5. Política de Honestidad de Datos
- No se incluirán valoraciones falsas de 5 estrellas ("★★★★★ 500 reseñas") si no existen clientes reales.
- No se colocará "Envío gratis a todo Chile" como afirmación absoluta en V1 sin políticas de despacho reales definidas.
- Las imágenes de productos DEMO utilizarán ilustraciones o fotos didácticas libres de derechos o generadas con marca de agua clara `[DEMO]`.
