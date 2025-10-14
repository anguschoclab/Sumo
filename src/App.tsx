import React from 'react'
import HeaderBar from '@components/HeaderBar'
import { useWorld } from '@engine/world'
import { toDate } from '@engine/time'
import { flags } from '@state/flags'

export default function App() {
  const w = useWorld()
  const date = toDate(w)

  return (
    <div>
      <HeaderBar />
      <main style={{padding:16}}>
        <h1>Always-Playable Baseline (Vite)</h1>
        <p>Today: <strong>{date.toDateString()}</strong></p>

        <section>
          <h2>Feature Flags</h2>
          <pre>{JSON.stringify(flags, null, 2)}</pre>
        </section>

        <section>
          <h2>Tabs (stubs)</h2>
          <ul>
            <li>Dashboard</li>
            <li>Rikishi</li>
            <li>Economy</li>
            <li>Rivalries</li>
            <li>Tournaments</li>
            <li>Settings</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
