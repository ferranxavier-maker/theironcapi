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
├── index.html           ← Landing (portada de theironcapi.com, banner "The Iron Capi" incrustado en el propio HTML)
├── bdd.html             ← App de resultados: Pitch & Putt y Golf (todos los datos y el código van dentro)
├── onlyfans.html        ← Página de broma del enlace OnlyFans del pie (retrato + "Jesuschrist! ...¿qué esperabas?" 😂)
├── manifest.json        ← Ficha de la app instalable: nombre, icono, colores
├── service-worker.js    ← Copia offline de los archivos y control de versiones
├── icon-192.png         ← Icono de la app (Android)
├── icon-512.png         ← Icono grande (pantalla de carga)
├── apple-touch-icon.png ← Icono para iPhone (180 px)
├── CNAME                ← Dominio propio. No borrar
└── README.md            ← Este archivo
```

Todo es estático: sin servidor, sin compilación. JavaScript embebido en el HTML. La landing tiene un enlace **Resultados** que lleva a `bdd.html`, donde se elige Pitch & Putt o Golf (también se puede entrar directo con `bdd.html?m=pp` o `bdd.html?m=golf`). El enlace "← Inicio" de la app vuelve a la landing. Bajo Resultados van los iconos de YouTube, Instagram, TikTok y OnlyFans (iconos de Simple Icons cargados desde jsdelivr, en medallones de hierro). Debajo va el globo de visitantes de MapMyVisitors (cuenta en mapmyvisitors.com; el service worker no lo cachea para que los datos estén siempre al día). El Excel se genera con xlsx-js-style 1.2.0 desde CDN.

---

## Actualizar la web

1. Subir los archivos nuevos al repo `theironcapi`, rama `main` (*Add file → Upload files*, sustituyendo los existentes).
2. **Subir la versión del caché** en `service-worker.js` (`CACHE_NAME = "ironcapi-v2"` → `v3`, `v4`…). Si no se cambia, el móvil puede seguir mostrando la versión antigua.
3. GitHub Pages publica en 1-2 minutos.
4. En el móvil: abrir la app con conexión; si no se actualiza, cerrarla del todo y volver a abrir.

Las rondas van dentro de `bdd.html`, así que la copia buena es siempre la última versión del archivo en el repo.

---

## Instalar en el móvil

**Android (Chrome):** abrir https://theironcapi.com → menú ⋮ → *Instalar app* / *Añadir a pantalla de inicio*.

**iPhone (Safari):** abrir https://theironcapi.com → botón Compartir → *Añadir a pantalla de inicio*.

Al cambiar el icono o el nombre, hay que quitar la app del móvil y volver a instalarla para verlo.

---

## Datos, backup y cambio de dominio

Todas las rondas (Pitch & Putt y Golf) van escritas dentro de `bdd.html`. Lo que se añade desde el móvil se guarda además en el navegador (`localStorage`, ligado al dominio) con las claves `pp9`, `pp_extra_rounds`, `pp_course`, `pp_customs`.

En la pestaña **Comandos** está **Exportar Excel Maestro**: Excel con todos los datos y reglas necesarios para reconstruir la web.

Cosas a tener en cuenta:

- Borrar los datos del navegador borra solo lo añadido desde el móvil que aún no esté en `bdd.html`.
- **Cambio de dominio:** lo guardado en el navegador con la versión antigua (`github.io/bddpp`) no pasa solo a `theironcapi.com`; hay que reinstalar la app desde el dominio nuevo.
- Mientras todo siga en `theironcapi.com`, lo guardado en el navegador se conserva.
