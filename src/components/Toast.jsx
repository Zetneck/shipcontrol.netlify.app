import React, { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function Toast({ id, type = 'info', message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-gradient-to-r from-emerald-600 to-emerald-500',
    error: 'bg-gradient-to-r from-red-600 to-red-500',
    warning: 'bg-gradient-to-r from-yellow-600 to-yellow-500',
    info: 'bg-gradient-to-r from-blue-600 to-blue-500'
  }[type]

  const shadowColor = {
    success: 'shadow-emerald-500/50',
    error: 'shadow-red-500/50',
    warning: 'shadow-yellow-500/50',
    info: 'shadow-blue-500/50'
  }[type]

  const icon = {
    success: <CheckCircle size={22} strokeWidth={2.5} />,
    error: <AlertCircle size={22} strokeWidth={2.5} />,
    warning: <AlertCircle size={22} strokeWidth={2.5} />,
    info: <Info size={22} strokeWidth={2.5} />
  }[type]

  return (
    <div className={`${bgColor} ${shadowColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideIn backdrop-blur-md border border-white/30 max-w-sm transform hover:scale-105 transition-transform`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-sm font-bold tracking-wide">{message}</span>
      <button
        onClick={onClose}
        className="hover:bg-white/20 rounded-lg p-1.5 transition-all hover:scale-110 active:scale-95 flex-shrink-0"
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
