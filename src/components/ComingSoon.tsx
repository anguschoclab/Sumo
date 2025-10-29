import React from 'react'
export default function ComingSoon({title='Coming soon', children}: {title?:string, children?:React.ReactNode}){
  return <div style={{padding:16}}>
    <h2>{title}</h2>
    <p>We’re finishing this feature. You can still navigate safely.</p>
    {children}
  </div>
}