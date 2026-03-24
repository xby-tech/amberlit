'use client';

import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 px-4">
          <div className="text-4xl">😟</div>
          <h2 className="text-xl font-bold text-gray-800">Something went wrong</h2>
          <p className="text-gray-500 text-center max-w-md">
            We hit an unexpected error. Try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="bg-amber-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-amber-700"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
