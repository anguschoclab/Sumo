import React from 'react'

export default function Tooltip({ text }: { text: string }) {
  return <span className="inline-block text-xs text-gray-500 ml-2" title={text}>ⓘ</span>
}
