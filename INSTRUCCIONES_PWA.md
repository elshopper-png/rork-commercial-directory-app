# 📱 Cómo Publicar Tu App como PWA (Aplicación Web)

## ✅ Paso 1: Exportar tu App

Ejecuta este comando en tu terminal:

```bash
npm run export:web
```

Esto creará una carpeta llamada `dist` con todos los archivos HTML, JavaScript y CSS de tu app.

---

## 🌐 Paso 2: Publicar en Vercel (GRATIS)

### Opción A: Usando la Web de Vercel (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta gratis (puedes usar tu cuenta de GitHub, GitLab o email)
3. Haz clic en "Add New Project"
4. Arrastra la carpeta `dist` a la página
5. Haz clic en "Deploy"
6. ¡Listo! Te dará un link como: `https://tu-app.vercel.app`

### Opción B: Usando la Terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Ir a la carpeta dist
cd dist

# Publicar
vercel

# Seguir las instrucciones en pantalla
```

---

## 🚀 Paso 3: Otras Opciones de Hosting GRATIS

### Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist`
3. ¡Listo!

### GitHub Pages
1. Sube la carpeta `dist` a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama y carpeta
4. Obtendrás un link como: `https://tu-usuario.github.io/tu-repo`

### Cloudflare Pages
1. Ve a [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conecta tu cuenta
3. Sube la carpeta `dist`

---

## 📲 Instalar como App en el Celular

Una vez publicada, los usuarios pueden:

### En Android (Chrome):
1. Abrir el link en Chrome
2. Tocar el menú (3 puntos)
3. Seleccionar "Agregar a pantalla de inicio"
4. ¡La app se instala como si fuera nativa!

### En iPhone (Safari):
1. Abrir el link en Safari
2. Tocar el botón de compartir
3. Seleccionar "Agregar a pantalla de inicio"
4. ¡Listo!

---

## 🔄 Actualizar tu App

Cuando hagas cambios:

1. Ejecuta de nuevo: `npm run export:web`
2. Sube la nueva carpeta `dist` a tu hosting
3. Los usuarios verán los cambios automáticamente

---

## ⚠️ Notas Importantes

- **Videos**: Los videos de MEGA no funcionarán en la versión web. Necesitas subirlos a un servicio compatible como:
  - YouTube (puedes hacerlos no listados)
  - Vimeo
  - Cloudinary
  - Tu propio servidor

- **Dominio Personalizado**: Puedes conectar tu propio dominio (ej: `www.tuapp.com`) en la configuración de Vercel/Netlify

- **HTTPS**: Todos estos servicios incluyen HTTPS gratis automáticamente

---

## 🆘 Problemas Comunes

### "No se ve bien en el celular"
- La app está optimizada para móviles, pero prueba en diferentes navegadores

### "Los videos no cargan"
- Cambia los links de MEGA por YouTube o Vimeo

### "Quiero mi propio dominio"
- En Vercel: Settings → Domains → Add Domain
- Cuesta aprox $10-15 USD al año

---

## 📞 Resumen Rápido

```bash
# 1. Exportar
npm run export:web

# 2. Publicar en Vercel
cd dist
vercel

# 3. Compartir el link que te da Vercel
```

¡Tu app estará disponible 24/7 en internet!
