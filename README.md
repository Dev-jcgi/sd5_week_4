# PixPro Arena · DS5 Semana 4

Presentación **Arquitectura Basada en Eventos 1** (62 diapositivas animadas) con quiz en vivo tipo Kahoot integrado:

- El **profesor** entra con su contraseña, abre una sala (PIN de 6 dígitos), avanza las diapositivas y lanza las 12 rondas de preguntas.
- Los **estudiantes** entran con PIN + apodo desde su celular o laptop: ven la misma diapositiva que el profesor y, cuando se lanza una ronda, su pantalla cambia a responder.
- Puntaje por acierto y rapidez, ranking en vivo, podio final, registro por pregunta (respondieron / correctas / %) y exportación a CSV.
- Ruta **Repasar** (`#/diapositivas`) para que los estudiantes revisen las diapositivas después de clase.

Tecnologías gratuitas: Vite + React 18, GSAP y canvas-confetti para animación, Firebase (Authentication + Cloud Firestore en plan Spark gratuito) para el tiempo real y GitHub Actions → GitHub Pages para publicar.

## Estructura

```
├─ .github/workflows/deploy.yml   # compila y publica en GitHub Pages en cada push a main
├─ firestore.rules                # reglas de seguridad (pegar en Firebase)
├─ scripts/
│  ├─ sync-slides.mjs             # copia las diapositivas del deck y quita notas y respuestas
│  └─ encrypt-answers.mjs         # cifra la clave de respuestas con la contraseña del profesor
├─ private/answers.source.json    # clave de respuestas EN CLARO (ignorada por git, no la subas)
└─ src/
   ├─ App.jsx                     # rutas: inicio · #/sala · #/diapositivas · #/profesor
   ├─ components/
   │  ├─ Landing.jsx              # portada
   │  ├─ Student.jsx              # unión con PIN, diapositiva sincronizada, preguntas, resultados
   │  ├─ Host.jsx                 # contraseña, sala, presentador, rondas, panel, CSV
   │  ├─ SlideStage.jsx           # escenario 1920×1080 escalado + transiciones GSAP
   │  ├─ Game.jsx                 # pregunta, revelación, ranking, podio
   │  └─ Viewer.jsx               # repaso libre
   ├─ data/
   │  ├─ rounds.js                # preguntas públicas (sin respuestas)
   │  └─ answers.enc.json         # respuestas cifradas (AES-GCM + PBKDF2)
   ├─ lib/                        # backend (Firebase o demo local), cifrado, elementos de diapositiva
   ├─ slides/html/                # las 62 diapositivas
   └─ styles/
```

## Puesta en marcha (una sola vez, ~20 minutos)

### 1. Repositorio en GitHub
1. Crea un repositorio nuevo (por ejemplo `pixpro-arena`) y sube el contenido de esta carpeta a la rama `main`.
2. En **Settings → Pages**, en *Build and deployment* elige **Source: GitHub Actions**.

### 2. Proyecto de Firebase (gratis)
1. En <https://console.firebase.google.com> crea un proyecto.
2. **Build → Firestore Database → Create database** (modo producción, la región más cercana).
3. **Build → Authentication → Sign-in method**: habilita **Anonymous** y **Email/Password**.
4. **Authentication → Settings → Authorized domains**: agrega `TU-USUARIO.github.io`.
5. **Project settings → General → Your apps → Web app (</>)**: registra una app web y copia `apiKey`, `authDomain`, `projectId` y `appId`.

### 3. Cuenta del profesor
En **Authentication → Users → Add user** crea el usuario con tu correo y como contraseña la del profesor. **Debe ser la misma contraseña con la que se cifraron las respuestas**: la app verifica la contraseña de dos formas, descifrando las respuestas y autenticándose en Firebase.

### 4. Reglas de seguridad
Abre `firestore.rules`, reemplaza `profesor@tu-dominio.com` por tu correo y pega el contenido completo en **Firestore → Rules → Publish**.
Con estas reglas los estudiantes no pueden abrir salas, mover diapositivas, ver respuestas de otros ni cambiar puntajes.

### 5. Variables en GitHub
En el repositorio: **Settings → Secrets and variables → Actions → Variables → New repository variable**:

| Variable | Valor |
|---|---|
| `VITE_FIREBASE_API_KEY` | apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
| `VITE_FIREBASE_PROJECT_ID` | projectId |
| `VITE_FIREBASE_APP_ID` | appId |
| `VITE_HOST_EMAIL` | tu correo de profesor |

La configuración web de Firebase es pública por diseño; la protección real está en las reglas del paso 4.

### 6. Publicar
Haz un push a `main` (o en **Actions → Publicar en GitHub Pages → Run workflow**). En 1–2 minutos queda en `https://TU-USUARIO.github.io/pixpro-arena/`.

## Cómo se usa en clase

1. Profesor: abre el sitio → **Soy profesor** → contraseña → **Crear sala nueva**. Pulsa **PIN** para proyectarlo en grande.
2. Estudiantes: abren el sitio → **Soy estudiante** → PIN + apodo.
3. Avanza con las flechas del teclado o los botones ◀ ▶ (F = pantalla completa). En cada diapositiva de “Arena PixPro” aparece **Lanzar ronda N**.
4. Durante la pregunta ves cuántos respondieron; luego **Revelar respuesta** → **Siguiente pregunta** → al terminar la ronda, **Volver a las diapositivas** (el ranking no se muestra entre rondas).
5. En la última diapositiva pulsa **Ver ranking final** (o ▶) → **Mostrar podio**.
6. **Panel**: saltar a secciones, lanzar cualquier ronda, registro de aciertos por pregunta, ranking completo, exportar CSV, mostrar podio y cerrar la sala.

## Cambiar la contraseña o las respuestas

```bash
# 1) edita private/answers.source.json si cambias respuestas
# 2) vuelve a cifrar con la contraseña (también cámbiala en Firebase → Authentication)
HOST_PASSWORD='NuevaContraseña' npm run encrypt
git add src/data/answers.enc.json && git commit -m "Actualiza respuestas" && git push
```

## Actualizar diapositivas

Si editas el deck y descargas sus archivos (`project/deck.json` + `project/slides/*.html`):

```bash
npm run sync-slides -- ruta/a/la/carpeta/del/deck
```

El script elimina las notas del orador y las respuestas de las diapositivas de juego antes de que lleguen al navegador.

## Desarrollo local

```bash
npm install
npm run dev
```

Sin archivo `.env` la app corre en **modo demo local**: la sala funciona entre pestañas del mismo navegador. Sirve para ensayar la clase sin configurar Firebase.

## Seguridad: qué protege y qué no
- **Protegido**: abrir salas, avanzar diapositivas, lanzar preguntas y escribir puntajes (reglas de Firestore + cuenta del profesor). Las respuestas viajan cifradas y solo se publican al revelar. Las respuestas de cada estudiante son privadas.
- **No protegido**: el texto de las preguntas y las diapositivas es público (cualquiera con el enlace puede verlas en *Repasar*). El tiempo de respuesta lo mide el dispositivo del estudiante.
