import React from 'react'
export default function Toast({ text }: { text: string }) {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white rounded px-3 py-2 shadow">
      {text}
    </div>
  )
}
