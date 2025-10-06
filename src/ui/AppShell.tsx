
import React from 'react'
class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:Error|null}>{
  state={ error: null as Error|null }
  static getDerivedStateFromError(error:Error){ return { error } }
  render(){
    if (this.state.error){
      return <div className="p-6 text-sm text-rose-600">Something went wrong: {this.state.error.message}</div>;
    }
    return this.props.children
  }
}
export default function AppShell({ children }:{children:React.ReactNode}){
  return (
    <React.Suspense fallback={<div className="p-6 text-sm">Loading…</div>}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.Suspense>
  )
}
