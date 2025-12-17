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
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 sm:p-5 md:p-6 hover:bg-[#202020] hover:border-[#3a3a3a] transition-all duration-200">
        <label className="block text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-2">
          <span className="text-base sm:text-lg">👤</span>
          Driver Manager:
        </label>
        <input
          type="text"
          value={autorPor}
          onChange={(e) => setAutorPor(e.target.value.toUpperCase())}
          placeholder="Nombre del responsable"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0d0d0d] border border-[#333333] text-white text-sm sm:text-base rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all"
        />
      </div>

      {/* Embarques */}
      <div className="space-y-4 sm:space-y-5">
        {embarques.map((embarque, index) => (
          <div key={embarque.id} className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 sm:p-5 md:p-6 hover:bg-[#202020] hover:border-[#3a3a3a] transition-all duration-200 group"
            style={{ animationDelay: `${index * 50}ms` }}>
            {/* Encabezado */}
            <div className="flex flex-col gap-3 mb-4 sm:mb-5">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-lg sm:text-xl text-white">
                  Embarque #{index + 1}
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                  <label className="text-[10px] sm:text-[11px] font-bold text-[#cccccc] uppercase tracking-wide whitespace-nowrap flex items-center gap-1">
                    <span className="text-sm">🏢</span>
                    Cliente / Planta
                  </label>
                  <div className="relative w-full group/input">
                    <input
                      type="text"
                      value={embarque.cliente || ''}
                      onChange={(e) => actualizarEmbarque(embarque.id, 'cliente', e.target.value.toUpperCase())}
                      placeholder="Destino"
                      className={`w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm ${embarque.cliente && embarque.cliente.trim() ? 'bg-[#E63946]/20 border-2 border-[#E63946]' : 'bg-[#0d0d0d] border border-[#333333]'} text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all`}
                    />
                    {embarque.cliente && embarque.cliente.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-[#E63946] text-base animate-scaleIn">✓</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {index > 0 && (
                  <button
                    onClick={() => moverEmbarque(embarque.id, 'arriba')}
                    title="Mover arriba"
                    className="p-2 sm:p-2.5 hover:bg-[#282828] rounded-full transition-all text-[#b3b3b3] hover:text-white hover:scale-110 active:scale-95"
                  >
                    <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}
                {index < embarques.length - 1 && (
                  <button
                    onClick={() => moverEmbarque(embarque.id, 'abajo')}
                    title="Mover abajo"
                    className="p-2 sm:p-2.5 hover:bg-[#282828] rounded-full transition-all text-[#b3b3b3] hover:text-white hover:scale-110 active:scale-95"
                  >
                    <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}
                <button
                  onClick={() => duplicarEmbarque(embarque.id)}
                  title="Duplicar embarque"
                  className="p-2 sm:p-2.5 bg-[#E63946] hover:bg-[#ff4757] rounded-full transition-all text-white hover:scale-110 active:scale-95"
                >
                  <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => eliminarEmbarque(embarque.id)}
                  title="Eliminar embarque"
                  disabled={embarques.length === 1}
                  className="p-2 sm:p-2.5 hover:bg-red-600 rounded-full transition-all text-[#b3b3b3] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 disabled:hover:scale-100"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
              {/* Operador */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#cccccc] mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Operador *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.operador}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'operador', e.target.value.toUpperCase())}
                    placeholder="Ej: FedEx"
                    className={`w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm ${embarque.operador.trim() ? 'bg-[#E63946]/20 border-2 border-[#E63946]' : 'bg-[#0d0d0d] border border-[#333333]'} text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all`}
                  />
                  {embarque.operador.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-[#E63946] animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Unidad */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#cccccc] mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Unidad *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.unidad}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'unidad', e.target.value.toUpperCase())}
                    placeholder="Ej: AC-1234"
                    className={`w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm ${embarque.unidad.trim() ? 'bg-[#E63946]/20 border-2 border-[#E63946]' : 'bg-[#0d0d0d] border border-[#333333]'} text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all`}
                  />
                  {embarque.unidad.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-[#E63946] animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Caja */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#cccccc] mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Caja *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={embarque.caja}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'caja', e.target.value.toUpperCase())}
                    placeholder="Ej: 12345"
                    className={`w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm ${embarque.caja.trim() ? 'bg-[#E63946]/20 border-2 border-[#E63946]' : 'bg-[#0d0d0d] border border-[#333333]'} text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all`}
                  />
                  {embarque.caja.trim() && <span className="absolute right-3 top-2 sm:top-2.5 text-[#E63946] animate-scaleIn">✓</span>}
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#cccccc] mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Tipo *
                </label>
                <div className="relative">
                  <select
                    value={embarque.tipo}
                    onChange={(e) => actualizarEmbarque(embarque.id, 'tipo', e.target.value)}
                    className={`w-full px-3 py-2 sm:py-2.5 pr-10 text-xs sm:text-sm font-semibold ${embarque.tipo ? 'bg-[#E63946]/20 border-2 border-[#E63946]' : 'bg-[#0d0d0d] border border-[#333333]'} text-white rounded focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] hover:border-[#3a3a3a] transition-all cursor-pointer appearance-none uppercase tracking-wide [&>option]:bg-[#1a1a1a] [&>option]:text-white [&>option:checked]:bg-[#3a3a3a] [&>option:hover]:bg-[#2a2a2a]`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px',
                      colorScheme: 'dark'
                    }}
                  >
                    <option value="export" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>EXPORTACIÓN</option>
                    <option value="import" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>IMPORTACIÓN</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-[#cccccc] mb-1.5 sm:mb-2 uppercase tracking-wider">
                Instrucciones
              </label>
              <textarea
                value={embarque.instrucciones}
                onChange={(e) => actualizarEmbarque(embarque.id, 'instrucciones', e.target.value.toUpperCase())}
                placeholder="Escribe las instrucciones específicas para este embarque..."
                rows="3"
                className="w-full px-3 py-2 sm:py-2.5 bg-[#0d0d0d] border border-[#333333] text-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] placeholder:text-[#888888] hover:border-[#3a3a3a] transition-all min-h-[80px] sm:min-h-[100px] uppercase"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botón Agregar */}
      <button
        onClick={agregarEmbarque}
        className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[#E63946] hover:bg-[#ff4757] text-white font-bold py-3 sm:py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#E63946]/30 active:scale-[0.98]"
      >
        <Plus size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base tracking-wide">Agregar Embarque</span>
      </button>
    </div>
  )
}
