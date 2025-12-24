# 🎮 START HERE - Comienza Aquí

## 👋 ¡Bienvenido a Family Party Game!

Este es tu juego de mesa familiar digital estilo Mario Party. Sigue estos 3 pasos para comenzar:

---

## 📋 Paso 1: Configurar Firebase (5 minutos)

### ¿Por qué Firebase?
Para que múltiples dispositivos jueguen juntos en tiempo real, necesitamos un servidor. Firebase es **GRATIS** y fácil de configurar.

### Instrucciones:

1. **Crea una cuenta en Firebase**
   - Ve a: https://console.firebase.google.com/
   - Inicia sesión con tu cuenta de Google
   - Clic en "Crear proyecto"
   - Nombre: "FamilyPartyGame" (o el que prefieras)
   - Desactiva Google Analytics (opcional)
   - Clic en "Crear proyecto"

2. **Habilita Realtime Database**
   - En el menú lateral: **Build** > **Realtime Database**
   - Clic en "Crear base de datos"
   - Ubicación: Elige la más cercana (ej: `us-central1`)
   - Modo: **"Empezar en modo de prueba"**
   - Clic en "Habilitar"

3. **Configura reglas de seguridad**
   - En la pestaña "Reglas", pega esto:
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
   - Clic en "Publicar"

4. **Obtén tus credenciales**
   - Clic en el ícono de configuración ⚙️ (arriba a la izquierda)
   - "Configuración del proyecto"
   - Desplázate hasta "Tus apps"
   - Clic en el ícono web `</>`
   - Nombre de la app: "Family Party"
   - **NO marques** "Firebase Hosting"
   - Clic en "Registrar app"
   - **Copia todo el código de firebaseConfig**

5. **Pega en el proyecto**
   - Abre el archivo: `src/config/firebase.js`
   - Reemplaza las líneas 6-13 con tus credenciales:
   ```javascript
   const firebaseConfig = {
     apiKey: "TU_API_KEY_AQUI",           // ← Pega aquí
     authDomain: "tu-proyecto.firebaseapp.com",
     databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com", // ← Importante!
     projectId: "tu-proyecto",
     storageBucket: "tu-proyecto.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - Guarda el archivo

✅ **Firebase configurado!**

---

## 🚀 Paso 2: Ejecutar el Proyecto (2 minutos)

### En tu computadora:

1. **Abre una terminal/PowerShell**
   - Windows: Click derecho en carpeta > "Abrir PowerShell aquí"
   - Mac/Linux: Terminal en la carpeta del proyecto

2. **Instala dependencias** (solo la primera vez)
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**
   - Se abrirá automáticamente en: http://localhost:5173
   - Si no, copia y pega esa URL en Chrome o Firefox

✅ **¡La app está corriendo!**

---

## 🎮 Paso 3: Jugar (1 minuto)

### Probar con un solo dispositivo:

1. Abre http://localhost:5173
2. Ingresa tu nombre: "Jugador 1"
3. Clic en "Crear Nueva Sala"
4. Aparece un código como: **ABC123**

5. Abre una **nueva pestaña** o **ventana de incógnito**
6. Ingresa otro nombre: "Jugador 2"
7. Clic en "Unirse a Sala"
8. Ingresa el código: **ABC123**

9. En la primera pestaña, clic en "Iniciar Juego"

✅ **¡Estás jugando!**

### Jugar en múltiples dispositivos (celulares):

1. **En tu computadora**, ejecuta:
   ```bash
   npm run dev -- --host
   ```

2. La terminal mostrará algo como:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.100:5173/  ← Esta!
   ```

3. **En tu celular**, abre el navegador y ve a:
   ```
   http://192.168.1.100:5173
   ```
   (Usa la IP que te mostró la terminal)

4. **Otros celulares** pueden hacer lo mismo (deben estar en la misma WiFi)

✅ **¡Multijugador funcionando!**

---

## 📱 Instalar como App en el Celular

### Una vez que funcione:

1. **Android** (Chrome):
   - Menú (⋮) > "Agregar a pantalla de inicio"
   - La app se instala como si fuera del Play Store

2. **iOS** (Safari):
   - Botón compartir (⬆️) > "Agregar a pantalla de inicio"
   - Ya tienes el ícono en tu iPhone

---

## 🌐 Publicar en Internet (Para jugar desde cualquier lugar)

Si quieres que tu familia juegue aunque no estén en la misma WiFi:

### Opción más fácil: Netlify

1. Ve a: https://netlify.com (crea cuenta gratis)
2. En tu terminal:
   ```bash
   npm run build
   ```
3. Arrastra la carpeta `dist/` a Netlify
4. ¡Listo! Te da una URL como: https://tu-app.netlify.app
5. Comparte esa URL con tu familia

### Opción GitHub Pages:

Lee el archivo `README.md` para instrucciones completas.

---

## 📚 Documentación Completa

- **README.md** - Guía técnica completa
- **QUICK_START.md** - Guía rápida de 5 minutos
- **FAMILY_GUIDE.md** - Guía para jugar en familia
- **APK_GUIDE.md** - Cómo crear una app Android
- **SUMMARY.md** - Resumen del proyecto
- **TODO.md** - Lista de cosas pendientes

---

## ❓ Preguntas Frecuentes

**¿Es gratis?**
✅ Sí, 100% gratis. Firebase tiene plan gratuito generoso.

**¿Necesito saber programar?**
❌ No, solo seguir estos pasos.

**¿Puedo personalizarlo?**
✅ Sí, puedes cambiar preguntas, colores, etc.

**¿Funciona sin internet?**
⚠️ Parcialmente. La UI sí, pero multijugador necesita internet.

**¿Puedo jugar con mi familia en otro país?**
✅ Sí, si publicas en internet (Netlify/GitHub Pages).

---

## 🆘 ¿Problemas?

### "Firebase: No Firebase App..."
❌ No configuraste Firebase
✅ Revisa el Paso 1 de nuevo

### "Cannot find module..."
❌ No instalaste dependencias
✅ Ejecuta: `npm install`

### No carga en el celular
❌ No estás en la misma WiFi
✅ Verifica que todos estén conectados a la misma red

### Otros problemas
📖 Lee el `README.md` completo
🔍 Busca el error en Google
💬 Pide ayuda en el issue tracker

---

## 🎉 ¡Eso es todo!

En 10 minutos deberías tener tu juego funcionando.

**Orden recomendado:**
1. ✅ Configura Firebase (5 min)
2. ✅ Ejecuta localmente (2 min)
3. ✅ Prueba con 2 navegadores (1 min)
4. ✅ Prueba en tu celular (2 min)
5. ✅ Invita a tu familia (priceless!)

---

## 💡 Tips Finales

- 📱 Prueba primero en tu compu antes de invitar a todos
- 🔋 Carga los celulares de todos
- 📶 Asegúrate de tener buena WiFi
- 🍿 Prepara snacks para la familia
- 📸 ¡Toma fotos de los momentos divertidos!

---

**¿Listo? ¡Empieza con el Paso 1! ⬆️**

¡Que lo disfrutes con tu familia! 👨‍👩‍👧‍👦❤️
