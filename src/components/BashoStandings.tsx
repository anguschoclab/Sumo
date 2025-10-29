
import React from 'react'

type Row = { rank: string, shikona: string, wins: number, losses: number }
type Props = { rows: Row[] }

export default function BashoStandings({ rows }: Props) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0}}>Basho Standings</h3>
        <span className="pill">Sprint K</span>
      </div>
      <div style={{overflowX:'auto', marginTop:'.5rem'}}>
        <table style={{borderCollapse:'collapse', width:'100%'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:'.25rem .5rem'}}>Rank</th>
              <th style={{textAlign:'left', padding:'.25rem .5rem'}}>Shikona</th>
              <th style={{textAlign:'right', padding:'.25rem .5rem'}}>W</th>
              <th style={{textAlign:'right', padding:'.25rem .5rem'}}>L</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i)=> (
              <tr key={i}>
                <td style={{padding:'.25rem .5rem', borderTop:'1px solid #2e3447'}}>{r.rank}</td>
                <td style={{padding:'.25rem .5rem', borderTop:'1px solid #2e3447'}}>{r.shikona}</td>
                <td style={{padding:'.25rem .5rem', borderTop:'1px solid #2e3447', textAlign:'right'}}>{r.wins}</td>
                <td style={{padding:'.25rem .5rem', borderTop:'1px solid #2e3447', textAlign:'right'}}>{r.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
