import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to analytics service if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[color:var(--card-background)] flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[color:var(--heading-color)] mb-4">
                Something went wrong
              </h1>
              <p className="text-lg text-[color:var(--body-color)]/70 mb-8">
                We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
              </p>
            </div>

            {/* Error Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-6 py-3 bg-transparent border border-[color:var(--accent-color)]/30 hover:bg-[color:var(--accent-color)]/10 text-[color:var(--accent-color)] rounded-xl font-semibold transition-all duration-300"
              >
                Go Home
              </button>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-800/50 rounded-lg p-4 mt-8">
                <summary className="cursor-pointer text-[color:var(--accent-color)] font-medium mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-300 space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 p-2 bg-gray-900/50 rounded text-xs overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 p-2 bg-gray-900/50 rounded text-xs overflow-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Contact Support */}
            <div className="mt-8 pt-6 border-t border-[color:var(--accent-color)]/20">
              <p className="text-sm text-[color:var(--body-color)]/60 mb-2">
                Still having issues?
              </p>
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 text-[color:var(--accent-color)] hover:text-[color:var(--accent-color)]/80 font-medium transition-colors duration-300"
              >
                Contact our support team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;