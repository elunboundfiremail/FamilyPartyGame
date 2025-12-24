# 🎉 Family Party Game

> Juego familiar en línea - Desplegado en GitHub Pages

¡El juego perfecto para pasar una noche divertida en familia! Un juego de tablero estilo Mario Party con minijuegos de trivia, acertijos, retos y más.

## ✨ Características

- 🎲 **Tablero de juego** interactivo con 20 casillas
- 👥 **Multijugador en tiempo real** (2-6 jugadores)
- 🎯 **Minijuegos variados**: Trivias, acertijos, retos, penitencias
- 📱 **PWA instalable** - Funciona como app nativa
- 🌐 **100% gratis** - Firebase + GitHub Pages
- 🎨 **Diseño moderno** con animaciones fluidas
- 📺 **Proyectable** en TV mientras juegas desde el celular

## 🚀 Instalación y Configuración

### 1. Clonar el proyecto

```bash
git clone <tu-repo>
cd FamilyPartyGame
npm install
```

### 2. Configurar Firebase

#### 2.1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Crear proyecto"
3. Nombre: `family-party-game` (o el que prefieras)
4. Deshabilita Google Analytics (opcional)
5. Clic en "Crear proyecto"

#### 2.2. Configurar Realtime Database

1. En el menú lateral, ve a **Build > Realtime Database**
2. Clic en "Crear base de datos"
3. Selecciona ubicación: `us-central1` (o la más cercana)
4. Modo: **Empezar en modo de prueba** (para desarrollo)
5. Clic en "Habilitar"

#### 2.3. Configurar reglas de seguridad

En la pestaña "Reglas", reemplaza con:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

⚠️ **Nota**: Estas reglas son para desarrollo. Para producción, implementa reglas más seguras.

#### 2.4. Obtener credenciales

1. Ve a **Configuración del proyecto** (⚙️ arriba a la izquierda)
2. En "Tus apps", clic en el ícono web `</>`
3. Registra la app: Nombre: `Family Party`
4. Copia las credenciales de Firebase

#### 2.5. Configurar en el proyecto

Edita `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 📦 Despliegue en GitHub Pages

### 1. Preparar el proyecto

Edita `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/FamilyPartyGame/' // Reemplaza con el nombre de tu repo
})
```

### 2. Build y deploy

```bash
npm run build
```

### 3. Opción A: Despliegue manual

```bash
# Instalar gh-pages
npm install -D gh-pages

# Agregar scripts en package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Desplegar
npm run deploy
```

### 4. Opción B: GitHub Actions (Recomendado)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 5. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings > Pages
3. Source: `gh-pages` branch
4. Save

Tu app estará en: `https://tu-usuario.github.io/FamilyPartyGame/`

## 🎮 Cómo Jugar

### Crear una sala

1. Ingresa tu nombre
2. Clic en "Crear Nueva Sala"
3. Comparte el código de 6 dígitos con los demás jugadores

### Unirse a una sala

1. Ingresa tu nombre
2. Clic en "Unirse a una Sala"
3. Introduce el código compartido

### Durante el juego

1. **Lanza el dado** en tu turno
2. **Responde** el minijuego que aparezca según la casilla
3. **Gana puntos** respondiendo correctamente
4. **Primer jugador** en llegar a la casilla 20 gana

### Tipos de casillas

- 🧠 **Trivia**: Preguntas de cultura general, películas, novelas, canciones
- 🤔 **Acertijos**: Adivinanzas divertidas
- 🎯 **Retos**: Desafíos para hacer en el momento
- 😱 **Penitencias**: Penalizaciones aleatorias
- 💬 **Conversación**: Preguntas para conocerse mejor

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos modernos
- **Framer Motion** - Animaciones fluidas
- **Firebase Realtime Database** - Multijugador en tiempo real
- **PWA** - Instalable como app nativa

## 📱 Instalar como App

### Android

1. Abre la página en Chrome
2. Menú (⋮) > "Agregar a pantalla de inicio"
3. La app se instalará como una app nativa

### iOS

1. Abre la página en Safari
2. Botón compartir
3. "Agregar a pantalla de inicio"

## 🎨 Personalización

### Agregar más preguntas

Edita `src/data/questions.js` y agrega tus propias preguntas:

```javascript
export const triviaQuestions = {
  tuCategoria: [
    { q: "Tu pregunta", a: ["Respuesta"], points: 10 }
  ]
};
```

### Cambiar colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#TU_COLOR',
      // ...
    }
  }
}
```

### Ajustar tablero

En `src/components/GameBoard.jsx`, cambia:

```javascript
const boardSpaces = 20; // Número de casillas
```

## 🐛 Solución de Problemas

### Error: Firebase no conecta

- Verifica que las credenciales en `src/config/firebase.js` sean correctas
- Asegúrate de haber habilitado Realtime Database
- Revisa las reglas de seguridad en Firebase Console

### La app no se actualiza

```bash
# Limpia caché y reconstruye
rm -rf node_modules dist
npm install
npm run build
```

### No funciona en producción

- Verifica el `base` en `vite.config.js`
- Asegúrate de que GitHub Pages esté habilitado
- Revisa la consola del navegador para errores

## 📄 Licencia

MIT - Úsalo libremente para pasar buenos momentos en familia ❤️

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Ideas para mejorar:

- Más categorías de preguntas
- Efectos de sonido
- Temas visuales (Navidad, Halloween, etc.)
- Modo torneo
- Estadísticas de jugadores
- Chat en tiempo real

---

**¡Hecho con ❤️ para pasar tiempo de calidad en familia!**
