import React from 'react'
import Tooltip from '@components/Tooltip'

export default function Stats() {
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-semibold">Stats & Records <Tooltip text="Sprint K–L" /></h1>
      <p>Career stats, basho history, charts (coming soon)</p>
      <div className="rounded border p-3 text-sm text-gray-600 bg-gray-50">
        Placeholder analytics – this page will pull from match/tournament history.
      </div>
    </div>
  )
}
