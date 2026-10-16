# Manual de Operación y Administración — Tienda "Lúdicamente"

Bienvenido/a al manual de operación diaria de **Lúdicamente**. Este documento fue redactado especialmente para que tú y tu equipo puedan gestionar el catálogo, los productos, las fotos y las solicitudes de WhatsApp de manera 100% autónoma, amigable y sin necesidad de escribir una sola línea de código.

---

## 1. Acceso al Panel de Administración (Medusa Admin)

El panel administrativo es el centro de control de tu tienda.

- **Dirección web local:** [http://localhost:9000/app](http://localhost:9000/app)
- **Usuario administrador demo:** `owner@ludicamente.cl` (o `admin@ludicamente.cl`)
- **Contraseña:** `AdminLudicamente2026!`

> **Consejo:** Guarda este enlace en los marcadores de tu navegador para acceder con un solo clic.

---

## 2. Gestión de Productos y Variantes

Desde el menú lateral izquierdo haz clic en **Products** (Productos).

### 2.1 Crear un nuevo producto paso a paso
1. En la esquina superior derecha, presiona el botón **New Product** (Nuevo Producto).
2. Completa los campos principales:
   - **Title (Título):** Nombre comercial del juego o material (ej. *Catan: El Juego de Mesa*).
   - **Subtitle (Subtítulo opcional):** Una frase breve descriptiva (ej. *Estrategia y comercio para 3 a 4 jugadores*).
   - **Description (Descripción):** Explicación del juego, objetivos pedagógicos, edad recomendada y componentes.
   - **Category (Categoría):** Selecciona una o varias categorías (ej. *Juegos de Mesa*, *Estrategia Familiar*).
3. **Fotografías:**
   - Arrastra las imágenes del producto en la zona multimedia.
   - La primera imagen seleccionada actuará como miniatura principal en el catálogo.
4. **Precios en Pesos Chilenos (CLP):**
   - En la sección de precios, asegúrate de asignar el valor en **CLP** sin decimales (ej. `34990` para $34.990).
5. **Inventario en V1:**
   - En el modelo V1 de cotización asistida, deja desmarcada la opción *Manage Inventory* (Gestionar Inventario).
   - La tienda mostrará automáticamente la etiqueta informativa **"Disponibilidad por confirmar"** a los clientes para no comprometer stock no verificado.
6. Presiona **Publish** (Publicar). ¡El producto aparecerá inmediatamente en tu tienda pública!

---

## 3. Importación Masiva mediante Planilla Excel / CSV

Si tienes un catálogo con decenas de productos, no necesitas cargarlos uno por uno.

1. En el menú **Products**, haz clic en el botón de opciones `···` y selecciona **Import Products** (Importar Productos).
2. Puedes descargar la plantilla de ejemplo oficial provista por Medusa (*Download Template*).
3. Rellena las columnas clave:
   - `Title`: Nombre del producto.
   - `Handle`: Identificador amigable en la URL (ej. `catan-juego-de-mesa`).
   - `Description`: Descripción en texto limpio.
   - `Variant Price CLP`: Precio en pesos chilenos sin puntos ni signos de peso (ej. `34990`).
4. Sube el archivo `.csv` y presiona **Import**. El sistema procesará los productos en segundo plano y te notificará al finalizar.

---

## 4. Gestión de Solicitudes de WhatsApp

En el menú lateral encontrarás una sección exclusiva creada a tu medida: **"Solicitudes WhatsApp"**.

### 4.1 ¿Qué ocurre cuando un cliente cotiza en la tienda?
1. El cliente agrega juegos a su carrito en la tienda pública.
2. Al presionar **"Consultar pedido por WhatsApp"**, ingresa su nombre, preferencia de entrega (*Retiro en Santiago* o *Despacho por coordinar*) y observaciones opcionales.
3. El sistema de Lúdicamente calcula en el servidor los precios reales vigentes en pesos chilenos y genera un código único de seguimiento (ej. **`LUD-123456`**).
4. La solicitud queda guardada automáticamente en tu panel con el estado **"Creada"** y abre una ventana con el mensaje preparado para WhatsApp.

### 4.2 Estados de una Solicitud
Puedes cambiar el estado de la solicitud en tu panel según avance la conversación:
- 🔵 **Creada:** El cliente generó la solicitud desde la web.
- 🟠 **Contacto Iniciado:** Ya estás en contacto con el cliente por WhatsApp.
- 🟣 **En Revisión:** Estás verificando stock físico en bodega o coordinando opciones.
- 🟢 **Mix Confirmado:** El cliente aceptó los productos y el total acordado.
- ⚪ **Cerrada:** Pedido despachado o entregado exitosamente.
- 🔴 **Cancelada:** El cliente desistió o no hubo stock disponible.

### 4.3 Ajustes durante la conversación
A veces en WhatsApp el cliente pide agregar un juego extra, cambiar una variante o solicita un descuento por pago en efectivo:
- Abre el detalle de la solicitud haciendo clic sobre la fila.
- En el campo **"Total Final Confirmado (CLP)"**, anota el nuevo total acordado.
- En el campo **"Notas Internas"**, escribe recordatorios para tu equipo (ej. *Cliente retira el viernes a las 17:00 en local. Pagará por transferencia*).
- Presiona **Guardar Cambios**.
- Si necesitas retomar el chat, presiona el botón verde **"Abrir Chat WhatsApp"** para hablar directamente con el cliente.

---

## 5. Configuración de Teléfono y Textos de la Portada

En el menú lateral, dirígete a **"Ajustes WhatsApp & Hero"**:
- **Número de WhatsApp:** Aquí puedes cambiar el número de teléfono donde recibirás las cotizaciones. Debe estar en formato internacional (ej. `+56912345678`).
- **Mensaje Base:** El saludo inicial predeterminado.
- **Barra Superior de Aviso:** Mensaje que aparece en la parte superior de toda la tienda (ideal para anuncios de vacaciones, feriados o promociones).
- **Título y Subtítulo de Portada:** Los textos principales que reciben a las familias en la página de inicio.
- Al presionar **"Guardar Configuración"**, la tienda pública se actualizará automáticamente.

---

## 6. Preguntas Frecuentes y Buenas Prácticas

### ¿Por qué la tienda no pide pagar con tarjeta de crédito de inmediato?
En la **Versión 1 (V1)**, Lúdicamente opera bajo el modelo de *Cotización y Confirmación Asistida por WhatsApp*. Esto permite:
- Confirmar stock real antes de comprometer cualquier cobro.
- Asesorar a las familias sobre edades recomendadas y dinámicas de juego.
- Acordar el método de despacho más económico para cada comuna o región de Chile.
- En la futura **Versión 2 (V2)**, se podrán activar pasarelas automáticas chilenas (Webpay Plus, Flow, Mercado Pago) sin perder nada de lo construido.

### ¿Qué hago si un producto se agota temporalmente?
En el panel de Medusa, entra al producto y cambia su estado de **Published** (Publicado) a **Draft** (Borrador), o añade en la descripción que el producto se encuentra agotado temporalmente.

### ¿Cómo respaldar la base de datos?
Tu base de datos PostgreSQL almacena todas las solicitudes, productos y clientes. Puedes solicitar a tu equipo técnico una copia de seguridad periódica del archivo de base de datos `medusa_ludicamente`.
