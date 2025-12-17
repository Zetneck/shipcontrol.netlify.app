# Zaro Instrucciones

Una aplicación web moderna para crear plantillas profesionales de instrucciones de embarques y exportarlas como imágenes de alta calidad.

## 🎯 Características

- ✅ **Editor intuitivo** de embarques con múltiples campos
- 📱 **Dos formatos de exportación**: WhatsApp (1080px) y Hoja Vertical (A4)
- 🖼️ **Vista previa WYSIWYG** en tiempo real
- 📥 **Exportación de alta calidad** a PNG y JPG (pixelRatio 2x)
- 🔴 **Badges profesionales** para tipos de embarque (Importación/Exportación)
- 💾 **Persistencia automática** en LocalStorage
- ✏️ **Funcionalidades avanzadas**:
  - Duplicar embarques
  - Reordenar con flechas arriba/abajo
  - Validación de campos obligatorios
  - Logo corporativo en encabezado

## 📋 Requisitos previos

- Node.js 16+ y npm
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Instalación y ejecución

### 1. Clonar o descargar el proyecto

```bash
cd zaro-instrucciones
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

El navegador se abrirá automáticamente en `http://localhost:5173`

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📁 Estructura del proyecto

```
zaro-instrucciones/
├── public/
│   └── zaro-logo.png          # Logo corporativo
├── src/
│   ├── components/
│   │   ├── Editor.jsx          # Componente editor de embarques
│   │   └── Preview.jsx         # Vista previa WYSIWYG
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos de App
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Entry point
├── index.html                  # HTML principal
├── vite.config.js              # Configuración Vite
├── tailwind.config.js          # Configuración Tailwind CSS
├── postcss.config.js           # Configuración PostCSS
├── package.json                # Dependencias del proyecto
└── .gitignore                  # Archivos ignorados en Git
```

## 🎨 Colores corporativos

- **Rojo Zaro**: `#E63946` (Importación, botones principales)
- **Negro Zaro**: `#1D1D1D` (Exportación, texto principal)
- **Gris**: `#F1F1F1` (Fondos secundarios)
- **Gris oscuro**: `#6B6B6B` (Texto secundario)

## 📝 Campos obligatorios por embarque

- **OPERADOR** *
- **UNIDAD** *
- **CAJA** *
- **TIPO** * (Importación/Exportación)
- **INSTRUCCIONES** (opcional)

\* = Campo obligatorio para exportar

## 🔧 Uso

1. **Cargar logo**: Coloca tu logo en `/public/zaro-logo.png`
2. **Completar autor**: Ingresa el nombre en "Creado por:"
3. **Agregar embarques**: Presiona "+ Agregar embarque"
4. **Editar datos**: Completa los campos en el panel izquierdo
5. **Ver preview**: La vista previa se actualiza en tiempo real a la derecha
6. **Cambiar formato**: Usa el toggle para elegir entre WhatsApp o Hoja Vertical
7. **Exportar**: Presiona PNG o JPG (se validarán campos obligatorios)

## 💾 Almacenamiento local

El aplicación guarda automáticamente tu trabajo en el navegador (LocalStorage). Los datos persisten incluso al cerrar la pestaña.

## 🚨 Validación

Cuando intentes exportar, la app validará que todos los embarques tengan:
- OPERADOR
- UNIDAD
- CAJA
- TIPO

Si falta algún campo, mostrará una lista clara de errores.

## 📦 Dependencias principales

- **React 18**: Framework principal
- **Vite 5**: Build tool ultrarrápido
- **Tailwind CSS**: Utility-first CSS framework
- **html-to-image**: Exportación de elementos DOM a imágenes
- **Lucide React**: Iconografía moderna

## 🌐 Despliegue

Puedes desplegar la aplicación en:
- **Vercel**: `npm run build` + conectar repositorio Git
- **Netlify**: Drag & drop de la carpeta `dist/`
- **GitHub Pages**: Configurar GitHub Actions
- **Servidor propio**: Servir archivos de `dist/` con tu servidor web

## 🎓 Notas técnicas

- No requiere backend (frontend-only)
- Todos los datos se guardan localmente en el navegador
- Las imágenes se generan usando canvas
- Responsive design (adaptable a móviles)

## 📞 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

**Desarrollado por**: Frontend Senior  
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025
