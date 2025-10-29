
import React from 'react'
export default class ErrorBoundary extends React.Component<{children:React.ReactNode},{err?:Error}> {
  state = { err: undefined as Error | undefined }
  static getDerivedStateFromError(err:Error){ return { err } }
  render(){
    if (this.state.err) return <div className="panel">Something went wrong: {this.state.err.message}</div>
    return this.props.children
  }
}
