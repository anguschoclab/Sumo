
import React from 'react';
export function Card({children, className='' }:{children:React.ReactNode; className?:string}){
  return <div className={`card ${className}`}>{children}</div>;
}
export function Button({children, className='', ...rest}:{children:React.ReactNode; className?:string} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button type="button" className={`btn ${className}`} {...rest}>{children}</button>;
}
export function SectionTitle({children}:{children:React.ReactNode}){
  return <div className="text-sm font-semibold">{children}</div>;
}
