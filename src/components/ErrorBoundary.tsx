import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; message?: string }

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(err: any): State {
    return { hasError: true, message: err?.message || 'Something went wrong.' }
  }
  componentDidCatch(error: any, info: any) {
    console.error('[ErrorBoundary]', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:16}}>
          <h2>Oops — something broke.</h2>
          <p>{this.state.message}</p>
          <a href="#/dashboard">Back to Dashboard</a>
        </div>
      )
    }
    return this.props.children
  }
}