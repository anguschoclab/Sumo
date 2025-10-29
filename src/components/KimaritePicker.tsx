import React from 'react'
import { kimarite } from '../data/kimarite'

export default function KimaritePicker({ value, onChange }) {
  return (
    <select value={value || ''} onChange={e => onChange(e.target.value)} className="border rounded px-2 py-1">
      <option value="">— Select kimarite —</option>
      {kimarite.map(k => (
        <option key={k.id} value={k.id}>{k.name}</option>
      ))}
    </select>
  )
}
