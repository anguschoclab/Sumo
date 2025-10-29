import React from 'react'
import Tooltip from '@components/Tooltip'

export default function Training() {
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-semibold">Training <Tooltip text="Sprint A–C" /></h1>
      <p>Plan drills, improve stats, and manage rest days. (Stubbed)</p>
      <ul className="list-disc ml-5 text-sm">
        <li>Strength, Balance, Technique sliders (coming soon)</li>
        <li>Auto-plan suggests rest before basho</li>
      </ul>
    </div>
  )
}
