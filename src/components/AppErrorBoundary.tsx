import React from 'react';
type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: any };
export default class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  componentDidCatch(error: any, info: any) { console.error('[AppErrorBoundary]', error, info); }
  render() {
    if (this.state.hasError) {
      return (<div style={{ padding: 24 }}><h1>Something went wrong.</h1>
        <p>We hit a snag running the app.</p>
        <button onClick={() => (window.location.href = '/')}>Back to Dashboard</button></div>);
    }
    return this.props.children;
  }
}
