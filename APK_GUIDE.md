# 📱 Guía para Crear APK Android

## ¿PWA o APK Nativo?

Tienes 3 opciones para tener la app en tu celular:

### Opción 1: PWA (Progressive Web App) - ⭐ RECOMENDADO
**Ventajas**:
- ✅ No necesitas Android Studio
- ✅ Se instala directo desde el navegador
- ✅ Actualizaciones automáticas
- ✅ Funciona como app nativa
- ✅ Más fácil y rápido

**Cómo instalar**:
1. Abre la app en Chrome (Android) o Safari (iOS)
2. Menú (⋮) > "Agregar a pantalla de inicio"
3. ¡Listo! Ícono en tu pantalla principal

### Opción 2: TWA (Trusted Web Activity) - APK Real
**Ventajas**:
- ✅ APK real instalable
- ✅ Puede subirse a Google Play
- ✅ Funciona offline
- ✅ Basado en tu PWA

**Desventajas**:
- ⚠️ Requiere configuración
- ⚠️ Necesitas un dominio con HTTPS
- ⚠️ Más complejo

### Opción 3: Capacitor/Cordova - App Híbrida
**Ventajas**:
- ✅ APK nativo completo
- ✅ Acceso a todas las APIs del teléfono
- ✅ Publicable en Play Store

**Desventajas**:
- ⚠️ Más complejo
- ⚠️ Requiere Android Studio
- ⚠️ Build time más largo

---

## Método 1: PWA (Fácil - 5 minutos)

### Paso 1: Despliega tu app
```bash
# En tu proyecto
npm run build

# Sube a GitHub Pages, Netlify o Vercel
# Ejemplo con Netlify:
# - Arrastra carpeta dist/ a netlify.com
# - Obtienes URL: https://mi-app.netlify.app
```

### Paso 2: Instala en Android
1. Abre la URL en Chrome
2. Menú (⋮) > "Instalar aplicación" o "Agregar a inicio"
3. La app se instala como si fuera nativa

### Paso 3: Instala en iOS
1. Abre la URL en Safari
2. Botón compartir (⬆️)
3. "Agregar a pantalla de inicio"
4. Confirma

**¡Listo!** Ya tienes la app instalada.

---

## Método 2: TWA con Bubblewrap (APK Real - 30 minutos)

### Requisitos
- Node.js instalado
- JDK 11+ instalado
- Android SDK (o Android Studio)
- Tu PWA desplegada con HTTPS

### Paso 1: Instalar Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

### Paso 2: Inicializar
```bash
bubblewrap init --manifest=https://tu-dominio.com/manifest.json
```

Te preguntará:
- **Domain**: tu-dominio.com
- **Package name**: com.familyparty.game
- **App name**: Family Party Game
- **Icon**: Ruta a tu ícono

### Paso 3: Build APK
```bash
bubblewrap build
```

Genera el APK en: `./app-release-signed.apk`

### Paso 4: Instalar
```bash
# Transfiere el APK a tu Android
# Instala desde "Archivos" permitiendo "Orígenes desconocidos"
```

---

## Método 3: Capacitor (App Completa - 1 hora)

### Paso 1: Instalar Capacitor
```bash
cd FamilyPartyGame
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

Ingresa:
- **App name**: Family Party Game
- **Package ID**: com.familyparty.game

### Paso 2: Build y agregar plataforma
```bash
npm run build
npx cap add android
npx cap sync
```

### Paso 3: Abrir en Android Studio
```bash
npx cap open android
```

### Paso 4: Configurar íconos
Coloca tus íconos en:
```
android/app/src/main/res/
├── mipmap-hdpi/
├── mipmap-mdpi/
├── mipmap-xhdpi/
├── mipmap-xxhdpi/
└── mipmap-xxxhdpi/
```

### Paso 5: Build APK
En Android Studio:
1. Build > Build Bundle(s) / APK(s) > Build APK(s)
2. Espera la compilación
3. Encuentra el APK en: `android/app/build/outputs/apk/debug/`

### Paso 6: Firmar APK (Para producción)
```bash
# Genera keystore
keytool -genkey -v -keystore my-release-key.keystore -alias family-party -keyalg RSA -keysize 2048 -validity 10000

# En Android Studio:
# Build > Generate Signed Bundle / APK
# Selecciona tu keystore
```

---

## Método 4: PWA Builder (Muy Fácil - 10 minutos)

### Paso 1: Ve a PWA Builder
https://www.pwabuilder.com/

### Paso 2: Ingresa tu URL
```
https://tu-dominio.com
```

### Paso 3: Descarga el APK
1. Clic en "Package for Stores"
2. Selecciona "Android"
3. Configura opciones
4. Descarga el APK generado

**¡Súper fácil!** No necesitas código.

---

## Comparación de Métodos

| Método | Dificultad | Tiempo | APK Real | Play Store |
|--------|-----------|--------|----------|------------|
| PWA | ⭐ Fácil | 5 min | ❌ | ❌ |
| TWA | ⭐⭐ Media | 30 min | ✅ | ✅ |
| Capacitor | ⭐⭐⭐ Difícil | 1 hora | ✅ | ✅ |
| PWA Builder | ⭐ Fácil | 10 min | ✅ | ✅ |

## Recomendación

**Para uso familiar personal**: Usa **PWA** (Método 1)
- Más rápido
- Más fácil
- Actualizaciones automáticas
- Funciona perfecto

**Para publicar en Play Store**: Usa **PWA Builder** (Método 4)
- Fácil y rápido
- Genera APK válido
- Listo para la tienda

**Para app avanzada con funciones nativas**: Usa **Capacitor** (Método 3)
- Acceso completo al dispositivo
- Cámara, notificaciones, etc.
- Más profesional

---

## Checklist Antes de Crear APK

- [ ] App desplegada con HTTPS
- [ ] `manifest.json` configurado
- [ ] Íconos de 192x192 y 512x512 listos
- [ ] Service Worker funcionando
- [ ] Firebase configurado correctamente
- [ ] App probada en navegador móvil
- [ ] Nombre y descripción definidos

---

## Recursos Útiles

### Generadores de Íconos
- https://icon.kitchen/
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### Herramientas PWA
- https://www.pwabuilder.com/
- https://developers.google.com/web/tools/lighthouse
- Chrome DevTools > Application > Manifest

### Hosting Gratis
- GitHub Pages: https://pages.github.com/
- Netlify: https://netlify.com
- Vercel: https://vercel.com
- Firebase Hosting: https://firebase.google.com/docs/hosting

---

## ❓ FAQ

**¿Puedo vender mi app?**
- Sí, pero necesitas APK firmado y cuenta de desarrollador ($25 único)

**¿Funciona offline?**
- Parcialmente. El Service Worker cachea la UI, pero necesita internet para multijugador.

**¿Puedo personalizar el ícono?**
- Sí, reemplaza los íconos en `public/` y actualiza `manifest.json`

**¿Necesito dominio propio?**
- No para PWA. Sí para TWA y publicar en Play Store.

**¿Cuánto cuesta publicar?**
- Google Play Store: $25 USD (pago único)
- App Store: $99 USD/año

---

## 🎉 Conclusión

**Mi recomendación personal**:
1. Empieza con PWA (Método 1) para probar
2. Si te gusta y quieres compartir, usa PWA Builder (Método 4)
3. Si quieres funciones avanzadas, usa Capacitor (Método 3)

**La PWA es perfecta para tu caso de uso familiar.**

¿Necesitas ayuda? Revisa el README.md principal.
