# BDD Golf - PWA

App web instalable (PWA) para mi BDD personal de Pitch & Putt: visor de rondas, stats, handicaps rolling, records, formulario de tarjeta, exportar Excel y backup JSON.

Funciona offline una vez instalada y guarda los datos localmente en el móvil.

---

## 1. Crear el repositorio en GitHub

1. Entra en https://github.com con tu cuenta.
2. Pulsa el botón verde **"Create repository"** (arriba a la izquierda) o el `+` de la barra superior → *New repository*.
3. Rellena:
   - **Repository name**: `bdd-golf` (sin espacios ni acentos; los `-` están permitidos)
   - **Description**: `BDD personal Pitch & Putt`
   - **Public** ✅ (obligatorio para usar GitHub Pages gratis)
   - **Add a README file** ✅
4. Pulsa **"Create repository"** abajo del todo.

---

## 2. Subir los archivos

Dentro del repo recién creado:

1. Pulsa **"Add file"** → **"Upload files"**.
2. Arrastra estos 5 archivos a la zona de subida:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`
3. Abajo, en *Commit changes*, pulsa el botón verde **"Commit changes"**.

> Si ves que ya existía un README.md del paso 1, no pasa nada: puedes sustituirlo por el de este proyecto o dejar el suyo. Lo importante son los 5 archivos de arriba.

---

## 3. Activar GitHub Pages

Dentro del repo:

1. Pestaña **Settings** (arriba a la derecha del repo).
2. Menú izquierdo → **Pages**.
3. En *Source*:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Pulsa **"Save"**.

Espera 1-2 minutos. Refresca la página de Pages y verás arriba la URL pública del tipo:

```
https://TU-USUARIO.github.io/bdd-golf/
```

Esa es la dirección desde la que vas a instalar la app en el móvil.

---

## 4. Instalar en Android

1. Abre **Chrome** en el móvil.
2. Ve a la URL pública del paso 3.
3. Espera unos segundos a que cargue completa (la primera vez descarga SheetJS y lo guarda para offline).
4. Menú de Chrome (3 puntos arriba a la derecha) → **"Instalar app"** o **"Añadir a pantalla de inicio"**.
5. Confirma. El icono verde con la bandera aparece en el lanzador.
6. Abre desde el icono: arranca a pantalla completa, sin barra de Chrome.

A partir de aquí funciona sin conexión. Los datos se guardan en el móvil y persisten al cerrar y reabrir.

---

## 5. Backup y restauración (Exportar / Importar JSON)

Dentro de la app, pestaña **Comandos**:

- **Exportar JSON (backup)** → descarga `bdd_golf_YYYYMMDD.json` con todas las rondas (RAW + HOLES + PUTTS + BAN + OBS + PEN). Guarda este archivo en Drive, mail, o donde prefieras.
- **Importar JSON (restaurar)** → selector de archivo. Carga un JSON previamente exportado y restaura toda la BDD. Pide confirmación antes de sobrescribir.

**Recomendación**: exporta JSON cada cierto tiempo, sobre todo después de añadir tarjetas nuevas. Es tu seguro contra borrar el caché del navegador, cambiar de móvil o reinstalar.

**Mover entre dispositivos**: Exportar JSON en el móvil → enviarlo al ordenador (mail, Drive, etc.) → en la versión web del ordenador, Importar JSON. Los datos quedan idénticos en ambos sitios.

---

## 6. Actualizar la app (cuando Claude entregue una versión nueva del HTML)

1. En el repo de GitHub, pulsa el archivo `index.html`.
2. Pulsa el icono del lápiz (✏️) arriba a la derecha → *Edit this file*.
3. Borra todo el contenido y pega el nuevo HTML.
4. Pulsa **"Commit changes"**.

Alternativa más simple: borra el `index.html` antiguo (botón papelera) y vuelve a subir el nuevo con *Add file → Upload files*.

> En el móvil, la próxima vez que abras la app con conexión, el service worker detectará la nueva versión. Si no se actualiza al instante, cierra la app, espera unos segundos y vuelve a abrir.

**Antes de actualizar siempre Exporta JSON primero**, por si acaso.

---

## Estructura del repo

```
bdd-golf/
├── index.html         ← App principal (PWA)
├── manifest.json      ← Metadata PWA (nombre, iconos, colores)
├── service-worker.js  ← Cache offline
├── icon-192.png       ← Icono pantalla de inicio
├── icon-512.png       ← Icono splash y stores
└── README.md          ← Este archivo
```

Todo es estático, sin build step, sin dependencias de servidor. JavaScript vanilla embebido en el HTML.

---

## Notas técnicas

- Datos persistidos en `localStorage` con claves: `pp9`, `pp_extra_rounds`, `pp_extra_rounds_full`, `pp_course`, `pp_customs`, `pp_rounds`.
- Limpieza de caché del navegador (Chrome → Configuración → Privacidad → Borrar datos) borra todos los datos. Por eso el JSON de backup es imprescindible.
- La app pide conexión solo la primera vez, para descargar SheetJS desde CDN. A partir de ahí queda en cache y funciona 100% offline.
