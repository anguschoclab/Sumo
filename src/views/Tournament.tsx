import React from 'react'
import Tooltip from '@components/Tooltip'
import { seedMatches } from '@engine/match'
import MatchCard from '@components/MatchCard'

export default function Tournament() {
  const matches = seedMatches(6)
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-semibold">Tournament <Tooltip text="Sprint F–J" /></h1>
      <p>Preview and simulate card (lightweight). Real bracket logic coming later.</p>
      <div className="grid gap-3">
        {matches.map(m => <MatchCard key={m.id} match={m} />)}
      </div>
    </div>
  )
}
