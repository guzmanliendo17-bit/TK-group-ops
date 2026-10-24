# TK Ground Ops · CCS (APK)

App con tres herramientas: **Reporte de vuelo**, **Cierre de mostrador** y **Anuncios de embarque**.
Funciona sin internet (fuentes y archivos incluidos en la app).

## Opción A: APK automático con GitHub (sin instalar nada)

1. Crea una cuenta en github.com y un repositorio nuevo (privado está bien).
2. Sube **todo el contenido de esta carpeta** al repositorio, incluida la carpeta oculta `.github`.
   - Desde computador: arrastra los archivos en "Add file → Upload files", o usa git:
     ```
     git init && git add . && git commit -m "TK Ground Ops"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
     git push -u origin main
     ```
3. Entra a la pestaña **Actions**. Verás "Compilar APK" corriendo (tarda unos 5 a 10 minutos).
   Si no arrancó solo: Actions → Compilar APK → **Run workflow**.
4. Al terminar, abre la ejecución y descarga **TK-Ground-Ops-APK** (un .zip con `app-debug.apk`).
5. Pasa el APK al teléfono, ábrelo y permite "instalar apps de origen desconocido".

Cada vez que cambies `www/index.html` y lo subas, se genera un APK nuevo.

## Opción B: compilar en tu computador

Necesitas Node 20+, Java 21 y Android Studio (con el SDK de Android).

```
npm install
npm run fonts
npx cap add android
npm run icons
npm run sync
cd android && ./gradlew assembleDebug
```

El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Opción C: PWABuilder

Si alojas la carpeta `www/` en un hosting con HTTPS, pwabuilder.com puede generar el APK a partir de la URL.
Antes ejecuta `npm install && npm run fonts` para que `www/fonts` tenga las fuentes.

## Notas

- **Voz de los anuncios:** usa el motor de texto a voz del teléfono. Para árabe, chino y turco, instala esos idiomas en Ajustes → Idioma → Salida de texto a voz.
- **WhatsApp:** el botón abre WhatsApp directamente con el reporte.
- **APK de depuración:** se instala sin problema para uso propio. Para publicar en Google Play hace falta firmarlo como release.
- **Cambiar nombre o ID:** edita `capacitor.config.json` antes de crear la carpeta `android`.
