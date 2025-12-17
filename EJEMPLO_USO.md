# 📝 Ejemplo de uso - Zaro Instrucciones

## Caso de uso: Crear instrucciones de embarque para FedEx

### Paso 1: Abrir la aplicación
Ejecuta `npm run dev` o `start-dev.bat` y abre http://localhost:5173/

### Paso 2: Rellenar el autor
- Campo: "Creado por: Juan Martínez Pérez"

### Paso 3: Editar el primer embarque

```
OPERADOR:       FedEx
UNIDAD:         AC-1234
CAJA:           BOX-789
TIPO:           Exportación
INSTRUCCIONES:  Empacar en caja de cartón reforzado. Verificar peso máximo de 30kg. 
                Incluir etiqueta de frágil. Entregar en terminal de FedEx de Zona 7.
```

### Paso 4: Agregar segundo embarque
Click en "+ Agregar embarque"

```
OPERADOR:       DHL
UNIDAD:         AC-5678
CAJA:           BOX-790
TIPO:           Importación
INSTRUCCIONES:  Recibir de proveedor Tailandés. Verificar cantidad de cajas.
                Almacenar en zona climatizada. Registrar en sistema.
```

### Paso 5: Ver preview
- A la derecha verás el documento final formateado profesionalmente
- El formato predeterminado es WhatsApp (1080px)

### Paso 6: Cambiar formato
- Presiona el botón "Hoja Vertical (A4)" para ver el formato de carta/impresión
- El preview se actualiza instantáneamente

### Paso 7: Exportar a imagen
- Presiona "PNG" para descargar como PNG (mejor para compartir digital)
- O "JPG" para descargar como JPG (mejor para imprimir)

El archivo se descargará con nombre: `instrucciones-embarque-2025-12-16.png`

---

## 🎨 Ejemplo de documento final (texto)

```
════════════════════════════════════════════════════════════════════════════════════════

                                    [LOGO ZARO]

                        INSTRUCCIONES DE EMBARQUE

              Creado por: Juan Martínez Pérez
              16 de diciembre de 2025 - 7:01 PM

════════════════════════════════════════════════════════════════════════════════════════

EMBARQUE #1

OPERADOR:  FedEx                UNIDAD:  AC-1234

CAJA:      BOX-789              TIPO:    [EXPORTACIÓN]

────────────────────────────────────────────────────────────────────────────────────────

INSTRUCCIONES

Empacar en caja de cartón reforzado. Verificar peso máximo de 30kg. Incluir etiqueta 
de frágil. Entregar en terminal de FedEx de Zona 7.

════════════════════════════════════════════════════════════════════════════════════════

EMBARQUE #2

OPERADOR:  DHL                  UNIDAD:  AC-5678

CAJA:      BOX-790              TIPO:    [IMPORTACIÓN]

────────────────────────────────────────────────────────────────────────────────────────

INSTRUCCIONES

Recibir de proveedor Tailandés. Verificar cantidad de cajas. Almacenar en zona 
climatizada. Registrar en sistema.

════════════════════════════════════════════════════════════════════════════════════════

                    Documento generado por Zaro Instrucciones
```

---

## ⚙️ Características usadas en este ejemplo

| Característica | Estado |
|---|---|
| ✅ Múltiples embarques | 2 embarques |
| ✅ Campos obligatorios | Todos completos |
| ✅ Tipo con badge | EXPORTACIÓN (negro), IMPORTACIÓN (rojo) |
| ✅ Instrucciones | Texto descriptivo en ambos |
| ✅ Toggle formato | WhatsApp y A4 disponibles |
| ✅ Preview WYSIWYG | Se ve en tiempo real |
| ✅ Exportación | PNG/JPG sin errores |
| ✅ localStorage | Se guarda automáticamente |

---

## 💡 Tips de uso

### Para crear muchos embarques rápido:
1. Rellena el primero completamente
2. Presiona el botón Copy (duplicar)
3. Modifica solo los campos que cambien
4. Repite

### Para mantener orden:
1. Usa las flechas para reordenar si es necesario
2. Los números (#1, #2, #3...) se asignan automáticamente

### Para guardar borradores:
1. La app GUARDA AUTOMÁTICAMENTE en localStorage
2. Cierra la pestaña y reabre - todo sigue ahí
3. Para empezar de cero, borra localStorage en DevTools

### Para imprimir:
1. Elige formato "Hoja Vertical (A4)"
2. Exporta a JPG
3. Abre en imagen y presiona Imprimir
4. O en Preview, presiona Ctrl+P (Print)

---

## 🚨 Errores comunes y solución

### Error: "Embarque #1: faltan OPERADOR, CAJA"
✅ Solución: Completa esos campos antes de exportar

### Error: "Embarque #2: faltan TIPO"
✅ Solución: Selecciona Importación o Exportación en el combo

### Error: "No puedo ver el logo"
✅ Solución: Asegúrate que existe `/public/zaro-logo.png`

### Error: "Se borró todo al recargar"
✅ Solución: Habilita localStorage en navegador (no está en modo privado)

---

## 🎯 Casos de uso reales

- **Logística**: Instrucciones de empaque para distintos operadores
- **E-commerce**: Guías de envío a clientes
- **Comercio exterior**: Documentación de importación/exportación
- **Almacenes**: Instrucciones de recepción y almacenamiento
- **Transportistas**: Documentación de carga

---

Ahora ya sabes cómo usar Zaro Instrucciones. ¡A crear documentos profesionales! 🚀
