import React from 'react'
import Tooltip from '@components/Tooltip'

export default function Shop() {
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-semibold">Shop <Tooltip text="Sprint D–E" /></h1>
      <p>Purchase items that provide small temporary boosts. (Stubbed)</p>
      <ul className="list-disc ml-5 text-sm">
        <li>Salt, Mawashi patterns, Recovery wraps</li>
        <li>Currency & inventory coming soon</li>
      </ul>
    </div>
  )
}
