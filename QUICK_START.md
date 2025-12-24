# 🚀 Guía Rápida de Inicio

## ⚡ Inicio Rápido (5 minutos)

### 1. Configurar Firebase (IMPORTANTE)

Antes de ejecutar la app, **DEBES** configurar Firebase:

#### Paso 1: Crea un proyecto Firebase
👉 https://console.firebase.google.com/

#### Paso 2: Habilita Realtime Database
1. Build > Realtime Database > "Crear base de datos"
2. Selecciona modo "prueba" (test mode)
3. Copia la URL de tu database

#### Paso 3: Obtén tus credenciales
1. Configuración del proyecto (⚙️)
2. Tus apps > Agregar app Web (</>) 
3. Copia todas las credenciales

#### Paso 4: Pega en el proyecto
Edita `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // ← Pega aquí
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com", // ← IMPORTANTE
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 2. Ejecutar localmente

```bash
npm install
npm run dev
```

Abre: http://localhost:5173

### 3. Probar el juego

1. **Dispositivo 1**: 
   - Nombre: "Jugador 1"
   - Crear Nueva Sala
   - Copia el código (ej: ABC123)

2. **Dispositivo 2** (otro navegador/celular):
   - Nombre: "Jugador 2"
   - Unirse a Sala
   - Pega el código: ABC123

3. **Iniciar Juego** desde el dispositivo 1

¡Listo! 🎉

## 📱 Probar en tu celular

### Opción 1: Misma red WiFi

```bash
npm run dev -- --host
```

La consola mostrará algo como:
```
➜  Network: http://192.168.1.100:5173/
```

Abre esa URL en tu celular.

### Opción 2: Túnel ngrok (Internet)

```bash
# Instalar ngrok
npm install -g ngrok

# En otra terminal
ngrok http 5173
```

Copia la URL https que te da ngrok.

## 🌐 Desplegar GRATIS

### GitHub Pages

```bash
# 1. Edita vite.config.js
base: '/nombre-de-tu-repo/'

# 2. Sube a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main

# 3. Activa GitHub Pages
# Settings > Pages > Source: gh-pages branch
```

La GitHub Action automáticamente desplegará tu app.

### Netlify (Alternativa fácil)

1. Ve a https://netlify.com
2. Arrastra la carpeta `dist` (después de `npm run build`)
3. ¡Listo! Te da una URL instantánea

## ⚠️ Problemas Comunes

### "Firebase: No Firebase App..."
❌ No configuraste Firebase correctamente
✅ Verifica `src/config/firebase.js`

### "Cannot read property 'players'..."
❌ Firebase Realtime Database no está habilitado
✅ Ve a Firebase Console > Build > Realtime Database

### La app no carga en celular
❌ Firewall bloqueando el puerto
✅ Usa `npm run dev -- --host` y verifica la IP local

### Errores de Tailwind
❌ No se instaló correctamente
✅ Ejecuta: `npm install -D tailwindcss postcss autoprefixer`

## 🎮 Tips para Jugar

### Para familias grandes (4-6 jugadores)
- Reduce las casillas a 15 en `GameBoard.jsx`
- Los juegos serán más rápidos

### Para niños pequeños
- Edita `questions.js` y agrega preguntas más fáciles
- Aumenta los puntos de los retos divertidos

### Modo fiesta
- Proyecta en TV (casting desde Chrome)
- Cada uno juega desde su celular
- ¡Diversión garantizada! 🎉

## 📝 Próximos Pasos

Una vez que funcione localmente:

1. ✅ Personaliza preguntas en `src/data/questions.js`
2. ✅ Cambia colores en `tailwind.config.js`
3. ✅ Agrega sonidos (opcional)
4. ✅ Despliega en GitHub Pages
5. ✅ Comparte con tu familia

## 💡 Ideas de Mejora

- [ ] Modo noche/día
- [ ] Temporizadores visuales
- [ ] Efectos de sonido
- [ ] Tema navideño
- [ ] Modo torneo
- [ ] Guardar estadísticas

---

¿Necesitas ayuda? Revisa el README.md completo.
