```
zaro-instrucciones/
│
├── 📁 public/
│   └── zaro-logo.png                # Logo corporativo (SVG/PNG)
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Editor.jsx               # Panel de edición de embarques
│   │   │                             # - Campos: Operador, Unidad, Caja, Tipo
│   │   │                             # - Botones: Agregar, Eliminar, Duplicar, Mover
│   │   │
│   │   └── Preview.jsx              # Vista previa WYSIWYG
│   │                                 # - Dos formatos: WhatsApp (1080px) y Vertical (A4)
│   │                                 # - Renderiza el documento final
│   │
│   ├── App.jsx                      # Componente principal
│   │                                 # - Gestión de estado
│   │                                 # - Validación de campos
│   │                                 # - Exportación PNG/JPG
│   │                                 # - localStorage
│   │
│   ├── App.css                      # Estilos y animaciones de App
│   ├── index.css                    # Estilos globales + Tailwind
│   └── main.jsx                     # Entry point React
│
├── 📄 index.html                    # HTML principal
├── 📄 vite.config.js                # Configuración Vite (dev server, plugins)
├── 📄 tailwind.config.js            # Configuración Tailwind (colores personalizados)
├── 📄 postcss.config.js             # Configuración PostCSS
├── 📄 package.json                  # Dependencias y scripts
├── 📄 package-lock.json             # Lock de dependencias (auto-generado)
├── 📄 .gitignore                    # Archivos ignorados en Git
├── 📄 README.md                     # Documentación completa
├── 📄 QUICKSTART.md                 # Guía rápida de inicio
├── 🚀 start-dev.bat                 # Script para ejecutar en desarrollo (Windows)
├── 🚀 build.bat                     # Script para compilar (Windows)
└── 📁 node_modules/                 # Dependencias instaladas (auto-generado)

```

## 📊 Resumen de funcionalidades implementadas

✅ **Editor de embarques**
  - Múltiples embarques con +Agregar botón
  - Campos: OPERADOR, UNIDAD, CAJA, TIPO (import/export), INSTRUCCIONES
  - Validación: campos obligatorios indicados con *
  - Botones de control: Eliminar, Duplicar, Mover arriba/abajo

✅ **Vista previa WYSIWYG**
  - Renders en tiempo real de los cambios
  - Dos formatos de salida intercambiables
  - Logo en encabezado
  - Información de autor y timestamp
  - Estilos profesionales y legibles

✅ **Sistema de tipos con badges**
  - Importación → Badge rojo (#E63946)
  - Exportación → Badge negro (#1D1D1D)
  - Visible en preview

✅ **Exportación de imágenes**
  - PNG y JPG con alta calidad (pixelRatio 2x)
  - Validación de campos antes de exportar
  - Error reporting detallado
  - Nombres de archivo automáticos con fecha

✅ **Persistencia con localStorage**
  - Guardado automático al editar
  - Restauración al recargar
  - Incluye: embarques, formato, autor

✅ **Diseño responsivo**
  - Tailwind CSS con colores personalizados
  - Interfaz moderna y limpia
  - Animaciones suaves
  - Compatible con móviles

✅ **Extras implementados**
  - Botón "Duplicar embarque"
  - Reordenar con flechas arriba/abajo
  - Toggle de formato (WhatsApp/A4)
  - Scripts .bat para Windows

## 🎨 Colores corporativos (Tailwind)

```
zaro-red:       #E63946  (Rojo primario - Importación)
zaro-black:     #1D1D1D  (Negro - Exportación)
zaro-gray:      #F1F1F1  (Gris claro - Fondos)
zaro-gray-dark: #6B6B6B  (Gris oscuro - Textos secundarios)
```

## 📦 Dependencias principales

- react (18.2.0)
- react-dom (18.2.0)
- vite (5.0.0)
- tailwindcss (3.3.6)
- html-to-image (1.11.11) - Exportación a imágenes
- lucide-react (0.263.1) - Iconos

## ⚡ Comandos disponibles

```bash
npm install              # Instalar dependencias
npm run dev             # Ejecutar en desarrollo (puerto 5173)
npm run build           # Compilar para producción
npm run preview         # Preview del build
```

O en Windows:
```
start-dev.bat           # Ejecutar en desarrollo
build.bat               # Compilar para producción
```
