import React, { useState, useEffect } from 'react'
import { Save, Trash2, Copy, ChevronDown } from 'lucide-react'

const STORAGE_KEY = 'zaro_plantillas'

export default function Templates({ embarque, actualizarEmbarque, mostrarToast }) {
  const [plantillas, setPlantillas] = useState([])
  const [nombrePlantilla, setNombrePlantilla] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  // Cargar plantillas al montar
  useEffect(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY)
    if (guardadas) {
      try {
        setPlantillas(JSON.parse(guardadas))
      } catch (e) {
        console.error('Error cargando plantillas:', e)
      }
    }
  }, [])

  // Guardar plantillas en localStorage
  const guardarPlantillas = (nuevas) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevas))
    setPlantillas(nuevas)
  }

  // Crear nueva plantilla
  const crearPlantilla = () => {
    if (!nombrePlantilla.trim()) {
      mostrarToast('Ingresa un nombre para la plantilla', 'warning')
      return
    }

    const nuevaPlantilla = {
      id: Date.now(),
      nombre: nombrePlantilla,
      operador: embarque.operador,
      unidad: embarque.unidad,
      caja: embarque.caja,
      tipo: embarque.tipo,
      instrucciones: embarque.instrucciones,
      cliente: embarque.cliente
    }

    const actualizadas = [...plantillas, nuevaPlantilla]
    guardarPlantillas(actualizadas)
    setNombrePlantilla('')
    setMostrarFormulario(false)
    mostrarToast(`Plantilla "${nombrePlantilla}" creada`, 'success')
  }

  // Aplicar plantilla
  const aplicarPlantilla = (plantilla) => {
    actualizarEmbarque(embarque.id, 'operador', plantilla.operador)
    actualizarEmbarque(embarque.id, 'unidad', plantilla.unidad)
    actualizarEmbarque(embarque.id, 'caja', plantilla.caja)
    actualizarEmbarque(embarque.id, 'tipo', plantilla.tipo)
    actualizarEmbarque(embarque.id, 'instrucciones', plantilla.instrucciones)
    actualizarEmbarque(embarque.id, 'cliente', plantilla.cliente)
    mostrarToast(`Plantilla "${plantilla.nombre}" aplicada`, 'success')
  }

  // Eliminar plantilla
  const eliminarPlantilla = (id) => {
    const actualizada = plantillas.filter(p => p.id !== id)
    guardarPlantillas(actualizada)
    mostrarToast('Plantilla eliminada', 'success')
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-xl p-4 backdrop-blur-xl">
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer mb-3 hover:text-zaro-red transition-colors">
          <h3 className="text-sm font-semibold text-slate-200">📋 Plantillas Reutilizables</h3>
          <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
        </summary>

        <div className="space-y-3 mt-4 pt-4 border-t border-slate-700/50">
          {/* Plantillas disponibles */}
          {plantillas.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase">Plantillas guardadas:</p>
              <div className="flex flex-wrap gap-2">
                {plantillas.map((plantilla) => (
                  <div
                    key={plantilla.id}
                    className="flex items-center gap-1 bg-slate-800/60 border border-slate-700 rounded-lg p-2 hover:border-slate-500 transition-all group/plantilla"
                  >
                    <button
                      onClick={() => aplicarPlantilla(plantilla)}
                      className="text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors truncate max-w-[120px]"
                      title={plantilla.nombre}
                    >
                      {plantilla.nombre}
                    </button>
                    <button
                      onClick={() => eliminarPlantilla(plantilla.id)}
                      className="p-1 hover:bg-red-500/20 rounded opacity-0 group-plantilla-hover:opacity-100 transition-all"
                      title="Eliminar plantilla"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulario para crear plantilla */}
          {!mostrarFormulario ? (
            <button
              onClick={() => setMostrarFormulario(true)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-emerald-200 border border-emerald-500/50 rounded-lg py-2 text-xs font-semibold transition-all"
            >
              <Save size={14} />
              Guardar como plantilla
            </button>
          ) : (
            <div className="space-y-2 p-3 bg-slate-800/40 rounded-lg border border-emerald-500/30">
              <input
                type="text"
                value={nombrePlantilla}
                onChange={(e) => setNombrePlantilla(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && crearPlantilla()}
                placeholder="Nombre de la plantilla..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100 rounded text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={crearPlantilla}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded text-xs font-semibold transition-all"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setMostrarFormulario(false)
                    setNombrePlantilla('')
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 rounded text-xs font-semibold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </details>
    </div>
  )
}
