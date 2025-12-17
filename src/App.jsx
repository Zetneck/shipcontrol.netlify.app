import React, { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Copy, Download, RotateCcw, RotateCw } from 'lucide-react'
import { toPng, toJpeg } from 'html-to-image'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toast from './components/Toast'
import './App.css'

const DEFAULT_EMBARQUE = {
  id: Date.now(),
  operador: '',
  unidad: '',
  caja: '',
  cliente: '',
  tipo: 'export',
  instrucciones: ''
}

export default function App() {
  const [embarques, setEmbarques] = useState([
    { ...DEFAULT_EMBARQUE, id: 1 }
  ])
  const [autorPor, setAutorPor] = useState('')
  const [errores, setErrores] = useState([])
  const [toasts, setToasts] = useState([])
  const [embarqueSeleccionadoId, setEmbarqueSeleccionadoId] = useState(1)
  const [historial, setHistorial] = useState([
    { embarques: [{ ...DEFAULT_EMBARQUE, id: 1 }], autorPor: '' }
  ])
  const [indiceHistorial, setIndiceHistorial] = useState(0)
  const previewRef = useRef(null)
  const ultimaAccionRef = useRef(null)
  const ignorarHistorialRef = useRef(false)

  const clonarEmbarques = (lista) => lista.map((e) => ({ ...e }))

  const mostrarToast = (mensaje, tipo = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, mensaje, tipo }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  // Agregar al historial
  const agregarAlHistorial = (nuevosEmbarques = embarques, nuevoAutor = autorPor) => {
    const ahora = Date.now()
    // Evitar duplicados demasiado rápidos (menos de 100ms)
    if (ultimaAccionRef.current && (ahora - ultimaAccionRef.current) < 100) {
      return
    }
    ultimaAccionRef.current = ahora

    // Cortar el historial después del índice actual
    const nuevoHistorial = historial.slice(0, indiceHistorial + 1)
    nuevoHistorial.push({ embarques: clonarEmbarques(nuevosEmbarques), autorPor: nuevoAutor })
    
    // Limitar a 30 acciones máximo
    if (nuevoHistorial.length > 30) {
      nuevoHistorial.shift()
    }
    
    setIndiceHistorial(nuevoHistorial.length - 1)
    setHistorial(nuevoHistorial)
  }

  // Deshacer
  const deshacer = () => {
    if (indiceHistorial > 0) {
      ignorarHistorialRef.current = true
      const nuevoIndice = indiceHistorial - 1
      const estado = historial[nuevoIndice]
      setEmbarques(clonarEmbarques(estado.embarques))
      setAutorPor(estado.autorPor)
      setIndiceHistorial(nuevoIndice)
      mostrarToast('Deshacer', 'info')
      setTimeout(() => {
        ignorarHistorialRef.current = false
      }, 0)
    }
  }

  // Rehacer
  const rehacer = () => {
    if (indiceHistorial < historial.length - 1) {
      ignorarHistorialRef.current = true
      const nuevoIndice = indiceHistorial + 1
      const estado = historial[nuevoIndice]
      setEmbarques(clonarEmbarques(estado.embarques))
      setAutorPor(estado.autorPor)
      setIndiceHistorial(nuevoIndice)
      mostrarToast('Rehacer', 'info')
      setTimeout(() => {
        ignorarHistorialRef.current = false
      }, 0)
    }
  }

  // Atajos de teclado
  useEffect(() => {
    const handler = (e) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase()
      const isTyping = tag === 'input' || tag === 'textarea'

      // Alt+N = Nuevo embarque
      if ((e.altKey && e.key.toLowerCase() === 'n') && !isTyping) {
        e.preventDefault()
        agregarEmbarque()
      }

      // Alt+E = Exportar PNG
      if ((e.altKey && e.key.toLowerCase() === 'e') && !isTyping) {
        e.preventDefault()
        exportarImagen('png')
      }

      // Ctrl+S = Guardar (feedback visual)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && !isTyping) {
        e.preventDefault()
        mostrarToast('Guardado automático', 'success')
      }

      // Ctrl+Z = Deshacer
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !isTyping) {
        e.preventDefault()
        deshacer()
      }

      // Ctrl+Y = Rehacer
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y' && !isTyping) {
        e.preventDefault()
        rehacer()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [indiceHistorial, historial, embarques])
  useEffect(() => {
    const savedData = localStorage.getItem('zaro-instrucciones-draft')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        const embarquesNormalizados = (data.embarques || [{ ...DEFAULT_EMBARQUE, id: 1 }]).map((e) => ({
          cliente: '',
          ...e
        }))
        setEmbarques(embarquesNormalizados)
        setAutorPor(data.autorPor || '')
        // Actualizar historial inicial
        setHistorial([{ embarques: embarquesNormalizados, autorPor: data.autorPor || '' }])
        setIndiceHistorial(0)
        // Seleccionar el primero disponible
        if (embarquesNormalizados.length > 0) {
          setEmbarqueSeleccionadoId(embarquesNormalizados[0].id)
        }
      } catch (e) {
        console.error('Error cargando datos guardados:', e)
      }
    }
  }, [])

  // Guardar en localStorage y actualizar historial
  useEffect(() => {
    const dataToSave = {
      embarques,
      autorPor
    }
    localStorage.setItem('zaro-instrucciones-draft', JSON.stringify(dataToSave))
  }, [embarques, autorPor])

  // Actualizar historial cuando cambien embarques
  useEffect(() => {
    if (!ignorarHistorialRef.current) {
      agregarAlHistorial(embarques, autorPor)
    }
  }, [embarques, autorPor])

  const agregarEmbarque = () => {
    const newEmbarque = {
      ...DEFAULT_EMBARQUE,
      id: Date.now()
    }
    setEmbarques([...embarques, newEmbarque])
    setEmbarqueSeleccionadoId(newEmbarque.id)
    mostrarToast('✓ Embarque agregado', 'success')
  }

  const eliminarEmbarque = (id) => {
    if (embarques.length > 1) {
      const nuevos = embarques.filter(e => e.id !== id)
      setEmbarques(nuevos)
      // Ajustar selección si se eliminó el seleccionado
      if (embarqueSeleccionadoId === id) {
        const idx = Math.min(embarques.findIndex(e => e.id === id), nuevos.length - 1)
        const nuevoSeleccionado = nuevos[idx]?.id || nuevos[0]?.id
        if (nuevoSeleccionado) setEmbarqueSeleccionadoId(nuevoSeleccionado)
      }
      mostrarToast('Embarque eliminado', 'warning')
    } else {
      mostrarToast('No puedes eliminar el último embarque', 'error')
    }
  }

  const duplicarEmbarque = (id) => {
    const embarqueADuplicar = embarques.find(e => e.id === id)
    if (embarqueADuplicar) {
      const newEmbarque = {
        ...embarqueADuplicar,
        id: Date.now()
      }
      const index = embarques.findIndex(e => e.id === id)
      const newEmbarques = [...embarques]
      newEmbarques.splice(index + 1, 0, newEmbarque)
      setEmbarques(newEmbarques)
      setEmbarqueSeleccionadoId(newEmbarque.id)
      mostrarToast('✓ Embarque duplicado', 'success')
    }
  }

  const moverEmbarque = (id, direccion) => {
    const index = embarques.findIndex(e => e.id === id)
    if (index === -1) return

    const newEmbarques = [...embarques]
    if (direccion === 'arriba' && index > 0) {
      [newEmbarques[index], newEmbarques[index - 1]] = [newEmbarques[index - 1], newEmbarques[index]]
    } else if (direccion === 'abajo' && index < embarques.length - 1) {
      [newEmbarques[index], newEmbarques[index + 1]] = [newEmbarques[index + 1], newEmbarques[index]]
    }
    setEmbarques(newEmbarques)
  }

  const actualizarEmbarque = (id, campo, valor) => {
    setEmbarques(embarques.map(e => 
      e.id === id ? { ...e, [campo]: valor } : e
    ))
  }

  const validarEmbarques = (lista = embarques) => {
    const nuevosErrores = []
    lista.forEach((embarque, index) => {
      const erroresEmbarque = []
      if (!embarque.operador.trim()) erroresEmbarque.push('OPERADOR')
      if (!embarque.unidad.trim()) erroresEmbarque.push('UNIDAD')
      if (!embarque.caja.trim()) erroresEmbarque.push('CAJA')
      if (!embarque.tipo) erroresEmbarque.push('TIPO')
      
      if (erroresEmbarque.length > 0) {
        nuevosErrores.push({
          numeroEmbarque: index + 1,
          campos: erroresEmbarque
        })
      }
    })
    setErrores(nuevosErrores)
    return nuevosErrores.length === 0
  }

  const exportarImagen = async (tipoFormato) => {
    const seleccionado = embarques.find(e => e.id === embarqueSeleccionadoId)
    const listaValidar = seleccionado ? [seleccionado] : embarques
    if (!validarEmbarques(listaValidar)) {
      mostrarToast('Por favor completa los campos requeridos', 'error')
      return
    }

    try {
      // Siempre exportar el contenedor completo con logo y encabezado
      if (!previewRef.current) return
      const element = previewRef.current

      const dataUrl = tipoFormato === 'png' 
        ? await toPng(element, {
            pixelRatio: 4,
            quality: 1,
            backgroundColor: '#ffffff',
            cacheBust: true
          })
        : await toJpeg(element, {
            pixelRatio: 4,
            quality: 0.98,
            backgroundColor: '#ffffff',
            cacheBust: true
          })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `instrucciones-embarque-${new Date().toISOString().slice(0, 10)}.${tipoFormato}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      mostrarToast(`✓ Exportado como ${tipoFormato.toUpperCase()}`, 'success')
    } catch (error) {
      console.error('Error exportando imagen:', error)
      mostrarToast('Error al exportar la imagen', 'error')
    }
  }

  const limpiarErrores = () => setErrores([])

  const cerrarToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-3 sm:p-4 md:p-6">
      {/* Toast Container */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 space-y-2 sm:space-y-3 max-w-[90vw] sm:max-w-md">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.tipo}
            message={toast.mensaje}
            onClose={() => cerrarToast(toast.id)}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto min-h-full flex flex-col gap-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-[#ff4757] via-[#E63946] to-[#ff4757] bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight px-2">
            INSTRUCCIONES DE EMBARQUE
          </h1>
          <p className="text-[#b3b3b3] text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide px-2">Asignación y control de instrucciones de embarque</p>
        </div>

        {/* Botones Control + Exportación */}
        <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 sm:p-4 md:p-6 mb-2 sm:mb-3 md:mb-4 hover:bg-[#202020] hover:border-[#3a3a3a] transition-all duration-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Botones Undo/Redo */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={deshacer}
                disabled={indiceHistorial <= 0}
                title="Deshacer (Ctrl+Z)"
                className="flex-1 sm:flex-initial items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#282828] hover:bg-[#3e3e3e] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full transition-all font-bold hover:scale-105 active:scale-95 disabled:hover:scale-100 text-xs sm:text-sm flex"
              >
                <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xs:inline">Deshacer</span>
              </button>
              <button
                onClick={rehacer}
                disabled={indiceHistorial >= historial.length - 1}
                title="Rehacer (Ctrl+Y)"
                className="flex-1 sm:flex-initial items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#282828] hover:bg-[#3e3e3e] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full transition-all font-bold hover:scale-105 active:scale-95 disabled:hover:scale-100 text-xs sm:text-sm flex"
              >
                <RotateCw size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xs:inline">Rehacer</span>
              </button>
            </div>

            {/* Botones Exportación */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => exportarImagen('png')}
                className="flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#E63946] text-white rounded-full hover:bg-[#ff4757] transition-all font-bold transform hover:scale-105 active:scale-95 text-xs sm:text-sm flex"
              >
                <Download size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                <span>PNG</span>
              </button>
              <button
                onClick={() => exportarImagen('jpg')}
                className="flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#E63946] text-white rounded-full hover:bg-[#ff4757] transition-all font-bold transform hover:scale-105 active:scale-95 text-xs sm:text-sm flex"
              >
                <Download size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                <span>JPG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Errores de validación */}
        {errores.length > 0 && (
          <div className="bg-gradient-to-r from-red-950/80 to-red-900/80 border border-red-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-7 text-red-100 shadow-2xl shadow-red-900/40 backdrop-blur-sm animate-scaleIn card-hover">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-red-100 mb-3 flex items-center gap-3 text-lg">
                  <span className="text-2xl">⚠</span> Errores de validación
                </h3>
                <ul className="text-red-200 text-sm space-y-2">
                  {errores.map((error, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Embarque #{error.numeroEmbarque}: faltan {error.campos.join(', ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={limpiarErrores}
                className="text-red-200 hover:text-white font-bold text-xl transition-all hover:scale-125 active:scale-95"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Contenedor principal: Editor + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 flex-1 overflow-hidden">
          {/* Panel Izquierdo: Editor */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 overflow-auto">
            <Editor
              autorPor={autorPor}
              setAutorPor={setAutorPor}
              embarques={embarques}
              actualizarEmbarque={actualizarEmbarque}
              agregarEmbarque={agregarEmbarque}
              eliminarEmbarque={eliminarEmbarque}
              duplicarEmbarque={duplicarEmbarque}
              moverEmbarque={moverEmbarque}
            />
          </div>

          {/* Panel Derecho: Preview */}
          <div className="lg:sticky lg:top-4 h-fit overflow-hidden">
            <Preview
              ref={previewRef}
              autorPor={autorPor}
              embarques={embarques}
              embarqueSeleccionadoId={embarqueSeleccionadoId}
              setEmbarqueSeleccionadoId={setEmbarqueSeleccionadoId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
