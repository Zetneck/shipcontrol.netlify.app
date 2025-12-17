# 🎨 Cómo reemplazar el logo de Zaro

## 📋 Opción 1: Logo rápido (Archivo PNG existente)

### Si tienes un archivo PNG o JPG de tu logo:

1. **Renombra tu logo** a `zaro-logo.png`

2. **Coloca el archivo** en la carpeta `/public/`
   ```
   zaro-instrucciones/
   └── public/
       └── zaro-logo.png  ← Aquí va tu logo
   ```

3. **Recarga la página** en http://localhost:5173/

¡Listo! Tu logo ahora aparece en la vista previa.

---

## 🎨 Opción 2: Logo SVG (Mejor calidad)

Los archivos SVG se ven perfectos en cualquier tamaño.

### Si tienes un archivo SVG:

1. **Renombra tu logo SVG** a `zaro-logo.png` 
   (o actualiza la referencia en Preview.jsx)

2. **Coloca en `/public/`** como en la opción anterior

3. **Recarga la página**

### O si quieres que sea específicamente SVG:

Edita `src/components/Preview.jsx`:

```jsx
// Encuentra esta línea (aproximadamente línea 30):
<img
  src="/zaro-logo.png"
  alt="Zaro Logo"
  ...
/>

// Y cambia a:
<img
  src="/zaro-logo.svg"   // ← Cambiar a .svg
  alt="Zaro Logo"
  ...
/>
```

Luego coloca tu archivo como `zaro-logo.svg` en `/public/`

---

## 📐 Especificaciones técnicas

### Tamaño recomendado
- **Ancho mínimo**: 200px
- **Ancho máximo**: 400px
- **Altura**: Auto-escalada
- **Proporción**: 16:9 o cuadrado

### Formatos soportados
- ✅ PNG
- ✅ JPG/JPEG
- ✅ SVG (mejor opción)
- ✅ WebP
- ✅ GIF

### Recomendaciones
- Usa PNG/SVG para mejor calidad
- Logo con fondo transparente funciona mejor
- Evita logos muy pequeños (< 100px)
- El logo se reescalará automáticamente

---

## 🔍 Verificar que funciona

1. Ejecuta `npm run dev`
2. Abre http://localhost:5173/
3. Debería ver tu logo en la vista previa (lado derecho)
4. El logo también aparecerá en las imágenes exportadas

---

## 🚨 Problemas comunes

### "No veo mi logo"
✅ Soluciones:
- Verifica que el archivo está en `/public/`
- Verifica el nombre: debe ser `zaro-logo.png`
- Presiona Ctrl+Shift+R para limpiar caché
- Abre DevTools (F12) → Console y busca errores

### "Mi logo se ve borroso"
✅ Soluciones:
- Usa SVG en lugar de PNG
- Si es PNG, asegúrate que es de alta resolución (2x o más)
- O crea un SVG desde tu logo

### "Mi logo se cortó en la vista previa"
✅ Soluciones:
- El logo se reescala automáticamente a altura 60px
- Si es muy ancho, SVG lo maneja mejor
- Ajusta los márgenes en `Preview.jsx` si lo necesitas

---

## 💡 Crear un logo SVG desde cero

Si no tienes logo y quieres uno personalizado:

### Opción A: Generador online gratis
- https://www.logomaker.com/
- https://designer.io/
- https://vectr.com/ (online SVG editor)

### Opción B: Editar el actual (simple.svg)
Abre `/public/zaro-logo.png` en cualquier editor SVG:
- Inkscape (gratis)
- Adobe Illustrator
- Figma (online)
- Visual Studio Code + extensión SVG

### Opción C: Código SVG manual
Abre `/public/zaro-logo.png`, reemplaza con tu SVG:

```svg
<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Tu contenido aquí -->
</svg>
```

---

## 🎯 Ejemplo: Logo de empresa real

Suponiendo que tu empresa es "LogisticaPro":

1. **Descarga tu logo** desde el drive/email de tu empresa

2. **Asegúrate que sea PNG/SVG** de buena calidad

3. **Coloca en `/public/zaro-logo.png`**

4. **Recarga: Ctrl+R**

5. **Aparece en la vista previa automáticamente**

---

## 📦 Incluir logo en la compilación final

Cuando hagas `npm run build`, el logo se incluye automáticamente en la carpeta `dist/public/`

Para desplegar a producción:
1. `npm run build`
2. Sube la carpeta `dist/` a tu servidor
3. El logo viajará con el código

---

## ✅ Checklist

- [x] Logo colocado en `/public/zaro-logo.png`
- [x] Archivo está en formato PNG/SVG
- [x] Página recargada (Ctrl+R)
- [x] Logo visible en la vista previa
- [x] Logo aparece en exportaciones PNG/JPG

---

## 🆘 ¿Necesitas ayuda?

Si tu logo no aparece:
1. Abre DevTools (F12)
2. Mira la pestaña **Console**
3. Busca errores sobre `zaro-logo.png`
4. Verifica la ruta: debe ser exactamente `/public/zaro-logo.png`

---

¡Listo! Tu logo corporativo ahora forma parte del documento. 🎉
