import React from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Copy } from 'lucide-react'

export default function Editor({
  autorPor,
  setAutorPor,
  embarques,
  actualizarEmbarque,
  agregarEmbarque,
  eliminarEmbarque,
  duplicarEmbarque,
  moverEmbarque
}) {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Autor */}
      <div className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/80 border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/40 p-4 sm:p-5 md:p-6 backdrop-blur-xl hover:border-slate-600/70 hover:shadow-3xl transition-all duration-500 card-hover">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2 sm:mb-3 uppercase tracking-wider flex items-center gap-2">
          <span className="text-base sm:text-lg">👤</span>
          Driver Manager:
        </label>
        <input
          type="text"
          value={autorPor}
          onChange={(e) => setAutorPor(e.target.value.toUpperCase())}
          placeholder="Nombre del responsable"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-600 bg-slate-800/80 text-slate-100 text-sm sm:text-base rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner"
        />
      </div>

      {/* Embarques */}
      <div className="space-y-4 sm:space-y-5">
        {embarques.map((embarque, index) => (
          <div key={embarque.id} className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/90 border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/40 p-4 sm:p-5 md:p-6 animate-scaleIn backdrop-blur-xl hover:border-slate-600/70 hover:shadow-3xl transition-all duration-500 card-hover group"
            style={{ animationDelay: `${index * 50}ms` }}>
            {/* Encabezado */}
            <div className="flex flex-col gap-3 mb-4 sm:mb-5">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-lg sm:text-xl text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
                  Embarque #{index + 1}
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wide whitespace-nowrap flex items-center gap-1">
                    <span className="text-sm">🏢</span>
                    Cliente / Planta
                  </label>
                  <div className="relative w-full group/input">
                    <input
                      type="text"
                      value={embarque.cliente || ''}
                      onChange={(e) => actualizarEmbarque(embarque.id, 'cliente', e.target.value.toUpperCase())}
                      placeholder="Destino"
                      className={`w-full px-3 py-2 sm:py-2.5 border text-xs sm:text-sm ${embarque.cliente && embarque.cliente.trim() ? 'border-emerald-500/70 bg-emerald-900/20 ring-1 ring-emerald-500/30' : 'border-slate-600'} bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner transition-all`}
                    />
                    {embarque.cliente && embarque.cliente.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-emerald-400 text-base animate-scaleIn">✓</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {index > 0 && (
                  <button
                    onClick={() => moverEmbarque(embarque.id, 'arriba')}
                    title="Mover arriba"
                    className="p-2 sm:p-2.5 hover:bg-slate-700/60 rounded-lg sm:rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95 shadow-lg hover:shadow-slate-700/50"
                  >
                    <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}
                {index < embarques.length - 1 && (
                  <button
                    onClick={() => moverEmbarque(embarque.id, 'abajo')}
                    title="Mover abajo"
                    className="p-2 sm:p-2.5 hover:bg-slate-700/60 rounded-lg sm:rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95 shadow-lg hover:shadow-slate-700/50"
                  >
                    <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}
                <button
                  onClick={() => duplicarEmbarque(embarque.id)}
                  title="Duplicar embarque"
                  className="p-2 sm:p-2.5 hover:bg-sky-500/20 rounded-lg sm:rounded-xl transition-all text-sky-400 hover:text-sky-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-sky-500/50"
                >
                  <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => eliminarEmbarque(embarque.id)}
                  title="Eliminar embarque"
                  disabled={embarques.length === 1}
                  className="p-2 sm:p-2.5 hover:bg-red-500/20 rounded-lg sm:rounded-xl transition-all text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-red-500/50"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
              {/* Operador */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Operador *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.operador}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'operador', e.target.value.toUpperCase())}
                    placeholder="Ej: FedEx"
                    className={`w-full px-3 py-2 sm:py-2.5 border text-xs sm:text-sm ${embarque.operador.trim() ? 'border-emerald-500/70 bg-emerald-900/20 ring-1 ring-emerald-500/30' : 'border-slate-600'} bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner transition-all`}
                  />
                  {embarque.operador.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-emerald-400 animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Unidad */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Unidad *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.unidad}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'unidad', e.target.value.toUpperCase())}
                    placeholder="Ej: AC-1234"
                    className={`w-full px-3 py-2 sm:py-2.5 border text-xs sm:text-sm ${embarque.unidad.trim() ? 'border-emerald-500/70 bg-emerald-900/20 ring-1 ring-emerald-500/30' : 'border-slate-600'} bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner transition-all`}
                  />
                  {embarque.unidad.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-emerald-400 animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Caja */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Caja *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.caja}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'caja', e.target.value.toUpperCase())}
                    placeholder="Ej: 12345"
                    className={`w-full px-3 py-2 sm:py-2.5 border text-xs sm:text-sm ${embarque.caja.trim() ? 'border-emerald-500/70 bg-emerald-900/20 ring-1 ring-emerald-500/30' : 'border-slate-600'} bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner transition-all`}
                  />
                  {embarque.caja.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-emerald-400 animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Tipo *
                </label>
                <div className="relative">
                  <select
                    value={embarque.tipo}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'tipo', e.target.value)}
                    className={`w-full px-3 py-2 sm:py-2.5 border text-xs sm:text-sm ${embarque.tipo ? 'border-emerald-500/70 bg-emerald-900/20 ring-1 ring-emerald-500/30' : 'border-slate-600'} bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 transition-all hover:border-slate-500 shadow-inner cursor-pointer`}
                  >
                    <option value="export">Exportación</option>
                    <option value="import">Importación</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1.5 sm:mb-2 uppercase tracking-wider">
                Instrucciones
              </label>
              <textarea
                value={embarque.instrucciones}
                onChange={(e) => actualizarEmbarque(embarque.id, 'instrucciones', e.target.value.toUpperCase())}
                placeholder="Escribe las instrucciones específicas para este embarque..."
                rows="3"
                className="w-full px-3 py-2 sm:py-2.5 border border-slate-600 bg-slate-800/80 text-slate-100 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:border-zaro-red focus:ring-2 focus:ring-zaro-red/30 placeholder:text-slate-500 shadow-inner transition-all min-h-[80px] sm:min-h-[100px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botón Agregar */}
      <button
        onClick={agregarEmbarque}
        className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transform hover:scale-[1.02] sm:hover:scale-[1.03] active:scale-[0.97] animate-slideUp"
      >
        <Plus size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base tracking-wide">Agregar Embarque</span>
      </button>
    </div>
  )
}
