import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    alert('An Error Occurred: ' + error.message + errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-center text-red-600">Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
