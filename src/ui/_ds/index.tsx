
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Toast from '@radix-ui/react-toast'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

export function Card({ className='', children }:{ className?:string; children:React.ReactNode }){
  return <div className={clsx('panel', className)}>{children}</div>
}

export function Button({ className='', children, ...rest }:{ className?:string; children:React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button className={clsx('btn', className)} {...rest}>{children}</button>
}

export function Modal({ open, onOpenChange, title, children }:{ open:boolean; onOpenChange:(o:boolean)=>void; title?:string; children:React.ReactNode }){
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 panel">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild><button className="btn ghost">✕</button></Dialog.Close>
          </div>
          <div className="mt-3">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ToastCtx = React.createContext<{ push:(msg:string)=>void }|null>(null)
export function ToastProvider({ children }:{ children:React.ReactNode }){
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const push = (msg:string)=>{ setMessage(msg); setOpen(false); setTimeout(()=> setOpen(true), 0) }
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <Toast.Provider swipeDirection="right">
        <Toast.Root open={open} onOpenChange={setOpen} className="fixed bottom-4 right-4 panel">
          <Toast.Title className="font-semibold text-sm">Notification</Toast.Title>
          <Toast.Description className="text-sm mt-1">{message}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 p-4" />
      </Toast.Provider>
    </ToastCtx.Provider>
  )
}
export function useToast(){
  const v = React.useContext(ToastCtx)
  if (!v) throw new Error('useToast must be used within ToastProvider')
  return v
}

export const RTabs = Tabs
export const RMenu = Dropdown
