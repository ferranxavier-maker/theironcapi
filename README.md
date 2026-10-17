# The Iron Capi

Web personal de Ferran Lobón (Pitch & Putt, modalidad Catalunya): resultados, estadísticas, handicaps, récords, formulario de tarjeta, Excel Maestro y backup JSON.

Publicada en **https://theironcapi.com**. Es instalable en el móvil (PWA), funciona sin conexión y guarda los datos en el propio dispositivo.

---

## Publicación

- **Repositorio:** `ferranxavier-maker/theironcapi` (antes `bddpp`; la URL antigua `ferranxavier-maker.github.io/bddpp` redirige al dominio nuevo).
- **GitHub Pages:** rama `main`, carpeta raíz `/ (root)`, dominio propio `theironcapi.com`, HTTPS activado.
- **CNAME:** el archivo `CNAME` del repo contiene `theironcapi.com`. **No borrarlo**: sin él, GitHub Pages pierde el dominio.

## Dominio y DNS (Cloudflare)

Dominio comprado en Cloudflare, en la cuenta de `theironsgolfclub@gmail.com`.

Todos los registros en **DNS only** (nube gris, sin proxy). Si se activa el proxy, GitHub Pages puede dejar de renovar el certificado HTTPS.

| Tipo  | Nombre           | Valor                         |
|-------|------------------|-------------------------------|
| A     | theironcapi.com  | 185.199.108.153               |
| A     | theironcapi.com  | 185.199.109.153               |
| A     | theironcapi.com  | 185.199.110.153               |
| A     | theironcapi.com  | 185.199.111.153               |
| CNAME | www              | ferranxavier-maker.github.io  |

---

## Estructura del repo

```
theironcapi/
├── index.html           ← Landing (portada de theironcapi.com)
├── bdd.html             ← App de resultados y estadísticas (todo el código va dentro)
├── manifest.json        ← Ficha de la app instalable: nombre, icono, colores
├── service-worker.js    ← Copia offline de los archivos y control de versiones
├── icon-192.png         ← Icono de la app (Android)
├── icon-512.png         ← Icono grande (pantalla de carga)
├── apple-touch-icon.png ← Icono para iPhone (180 px)
├── logo.png             ← Retrato con fondo transparente (landing)
├── CNAME                ← Dominio propio. No borrar
└── README.md            ← Este archivo
```

Todo es estático: sin servidor, sin compilación. JavaScript embebido en el HTML. La landing enlaza con el botón **Resultados** a `bdd.html`. El Excel se genera con SheetJS 0.18.5 desde CDN.

---

## Actualizar la web

1. Subir los archivos nuevos al repo `theironcapi`, rama `main` (*Add file → Upload files*, sustituyendo los existentes).
2. **Subir la versión del caché** en `service-worker.js` (`CACHE_NAME = "ironcapi-v2"` → `v3`, `v4`…). Si no se cambia, el móvil puede seguir mostrando la versión antigua.
3. GitHub Pages publica en 1-2 minutos.
4. En el móvil: abrir la app con conexión; si no se actualiza, cerrarla del todo y volver a abrir.

**Antes de actualizar, exportar siempre el backup JSON.**

---

## Instalar en el móvil

**Android (Chrome):** abrir https://theironcapi.com → menú ⋮ → *Instalar app* / *Añadir a pantalla de inicio*.

**iPhone (Safari):** abrir https://theironcapi.com → botón Compartir → *Añadir a pantalla de inicio*.

Al cambiar el icono o el nombre, hay que quitar la app del móvil y volver a instalarla para verlo.

---

## Datos, backup y cambio de dominio

Los datos se guardan en el navegador de cada dispositivo (`localStorage`), ligados al dominio. Claves: `pp9`, `pp_rounds`, `pp_extra_rounds`, `pp_extra_rounds_full`, `pp_course`, `pp_customs`.

En la pestaña **Comandos**:

- **Exportar JSON** → descarga `ironcapi_YYYYMMDD.json` con todas las rondas (RAW + HOLES + PUTTS + BAN + OBS + PEN).
- **Importar JSON** → restaura todo desde un backup. Pide confirmación antes de sobrescribir.
- **Exportar Excel Maestro** → Excel con todos los datos y reglas necesarios para reconstruir la web.

Cosas a tener en cuenta:

- Borrar los datos del navegador borra las rondas. El JSON es el seguro.
- **Cambio de dominio:** los datos de la versión antigua (`github.io/bddpp`) no pasan solos a `theironcapi.com`. Exportar JSON desde la versión vieja, importarlo en la nueva y reinstalar la app desde el dominio nuevo.
- **Pasar a otro dispositivo:** exportar JSON en uno e importarlo en el otro.
- Mientras todo siga en `theironcapi.com` (incluida `theironcapi.com/bdd.html`), los datos se conservan.
