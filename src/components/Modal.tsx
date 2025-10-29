import React from 'react'

type Props = {
  title: string
  onClose: () => void
  children: React.ReactNode
}
export default function Modal({ title, onClose, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-[min(680px,92vw)] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button aria-label="Close" onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
