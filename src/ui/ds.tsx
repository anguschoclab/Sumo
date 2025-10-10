import React from 'react'
export const Card:React.FC<React.PropsWithChildren<{className?:string; style?:React.CSSProperties}>>=({className,style,children})=>(
  <div className={['card',className].filter(Boolean).join(' ')} style={style}>{children}</div>
)
export const Button:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>=(p)=>(
  <button {...p} className={['btn',p.className].filter(Boolean).join(' ')} />
)
