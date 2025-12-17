import React, { forwardRef, useState, useEffect } from 'react'

const Preview = forwardRef(({ formato, autorPor, embarques, embarqueSeleccionadoId, setEmbarqueSeleccionadoId }, ref) => {
  const [logoBase64, setLogoBase64] = useState(null)
  const [tipoFiltro, setTipoFiltro] = useState(null) // null = todos, 'import' = importación, 'export' = exportación
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      setLogoBase64(canvas.toDataURL('image/png'))
    }
    img.onerror = () => {
      console.error('Error cargando logo')
      setLogoBase64('/zaro-logo.png')
    }
    img.src = '/zaro-logo.png'
  }, [])

  const ahora = new Date()
  const fechaFormato = ahora.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const horaFormato = ahora.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })

  // Ancho responsive del contenedor
  const containerWidth = windowWidth < 640 ? '100%' : windowWidth < 1024 ? '90%' : '600px'

  // Filtrar embarques según tipo y embarque seleccionado
  const listaEmbarques = Array.isArray(embarques) ? embarques : []
  const filtradosBase = tipoFiltro
    ? listaEmbarques.filter((e) => e.tipo === tipoFiltro)
    : listaEmbarques
  
  // Si hay un embarque seleccionado, mostrar solo ese. Si no, mostrar todos los filtrados
  const embarquesMostrar = embarqueSeleccionadoId !== null
    ? filtradosBase.filter((e) => e.id === embarqueSeleccionadoId)
    : filtradosBase

  // Al cambiar selección, desplazar a la vista el card
  useEffect(() => {
    if (embarqueSeleccionadoId) {
      const el = document.getElementById(`embarque-card-${embarqueSeleccionadoId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [embarqueSeleccionadoId, tipoFiltro])

  return (
    <div className="animate-fadeIn">
      {/* Controles: selector de embarque y filtro por tipo */}
      <div className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/80 border border-slate-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 md:mb-5 space-y-3 sm:space-y-4 shadow-2xl shadow-black/40 backdrop-blur-xl card-hover">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <span className="text-base sm:text-lg">📦</span>
            Embarque:
          </span>
          <button
            onClick={() => setEmbarqueSeleccionadoId(null)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-lg ${
              embarqueSeleccionadoId === null
                ? 'bg-gradient-to-r from-zaro-red to-red-500 text-white shadow-red-500/50 scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
            }`}
          >
            Ver Todos
          </button>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {listaEmbarques.map((embarque, index) => (
              <button
                key={embarque.id}
                onClick={() => setEmbarqueSeleccionadoId(embarqueSeleccionadoId === embarque.id ? null : embarque.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-lg ${
                  embarqueSeleccionadoId === embarque.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/50 scale-105 ring-2 ring-blue-400/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
                }`}
              >
                #{index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
          <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <span className="text-base sm:text-lg">🔍</span>
            Filtrar por tipo:
          </span>
          <button
            onClick={() => setTipoFiltro(null)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-lg ${
              tipoFiltro === null
                ? 'bg-gradient-to-r from-zaro-red to-red-500 text-white shadow-red-500/50 scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setTipoFiltro(tipoFiltro === 'export' ? null : 'export')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-lg ${
              tipoFiltro === 'export'
                ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-slate-600/50 scale-105 ring-2 ring-slate-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
            }`}
          >
            Exportación
          </button>
          <button
            onClick={() => setTipoFiltro(tipoFiltro === 'import' ? null : 'import')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-lg ${
              tipoFiltro === 'import'
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/50 scale-105 ring-2 ring-red-400/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
            }`}
          >
            Importación
          </button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl shadow-black/40 p-2 sm:p-3 md:p-4"
        style={{ overflow: 'visible' }}
      >
        <div
          ref={ref}
          style={{
            width: containerWidth,
            maxWidth: '100%',
            minHeight: 'auto',
            backgroundColor: '#ffffff',
            padding: '0.5rem',
            fontFamily: 'Arial, sans-serif',
            fontSize: windowWidth < 640 ? '9pt' : '11pt',
            lineHeight: '1.3',
            color: '#1D1D1D',
            margin: '0 auto',
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}
        >
          {/* Encabezado con logo */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '0.5rem',
              borderBottom: '2px solid #1D1D1D',
              paddingBottom: '0.5rem'
            }}
          >
            <div style={{ marginBottom: '0.1rem' }}>
              <img
                src={logoBase64 || '/zaro-logo.png'}
                alt="Zaro Logo"
                style={{ 
                  height: windowWidth < 640 ? '100px' : windowWidth < 1024 ? '130px' : '160px',
                  maxWidth: '100%',
                  margin: '0 auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </div>
            <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: '0.3rem 0', color: '#1D1D1D' }}>
              INSTRUCCIONES DE EMBARQUE
            </h1>
            <div style={{ fontSize: '9pt', color: '#6B6B6B', marginTop: '0.2rem' }}>
              <div>
                Driver Manager: <strong>{autorPor || '________________________'}</strong>
              </div>
              <div>
                {fechaFormato} - {horaFormato}
              </div>
            </div>
          </div>

          {/* Contenido de embarques */}
          <div>
            {embarquesMostrar.map((embarque, index) => (
              <div
                key={embarque.id}
                id={`embarque-card-${embarque.id}`}
                style={{
                  marginBottom: '0.6rem',
                  padding: '0.6rem',
                  backgroundColor: '#F1F1F1',
                  borderRadius: '4px',
                  pageBreakInside: 'avoid'
                }}
              >
                {/* Número de embarque y cliente */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.2rem',
                    marginBottom: '0.1rem'
                  }}
                >
                  <div style={{ fontSize: '10pt', fontWeight: 'bold', color: '#6B6B6B' }}>
                    EMBARQUE #{index + 1}
                  </div>
                  <div
                    style={{
                      fontSize: '9pt',
                      fontWeight: 'bold',
                      color: '#6B6B6B',
                      textAlign: 'right'
                    }}
                  >
                    CLIENTE / PLANTA:&nbsp;
                    <span style={{ color: '#1D1D1D' }}>{embarque.cliente || '—'}</span>
                  </div>
                </div>

                {/* Datos principales */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.4rem'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        marginBottom: '0.1rem'
                      }}
                    >
                      Operador
                    </div>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold', color: '#1D1D1D' }}>
                      {embarque.operador || '—'}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        marginBottom: '0.1rem'
                      }}
                    >
                      Unidad
                    </div>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold', color: '#1D1D1D' }}>
                      {embarque.unidad || '—'}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        marginBottom: '0.1rem'
                      }}
                    >
                      Caja
                    </div>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold', color: '#1D1D1D' }}>
                      {embarque.caja || '—'}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        marginBottom: '0.1rem'
                      }}
                    >
                      Tipo
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '8px',
                        fontSize: '10pt',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        backgroundColor: embarque.tipo === 'import' ? '#E63946' : '#1D1D1D'
                      }}
                    >
                      {embarque.tipo === 'import' ? 'IMPORTACIÓN' : 'EXPORTACIÓN'}
                    </div>
                  </div>
                </div>

                {/* Instrucciones */}
                {embarque.instrucciones && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '0.5rem',
                      borderLeft: '3px solid #E63946',
                      borderRadius: '2px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        marginBottom: '0.2rem'
                      }}
                    >
                      Instrucciones
                    </div>
                    <div
                      style={{
                        fontSize: '11pt',
                        color: '#1D1D1D',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }}
                    >
                      {embarque.instrucciones}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pie */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '0.5rem',
              paddingTop: '0.4rem',
              borderTop: '2px solid #ddd',
              fontSize: '9pt',
              color: '#6B6B6B'
            }}
          >
            Documento para fines de información
          </div>
        </div>
      </div>
    </div>
  )
})

Preview.displayName = 'Preview'

export default Preview
