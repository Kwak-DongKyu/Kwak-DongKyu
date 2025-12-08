import React from 'react';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    backgroundColor: '#0f172a',
                    color: '#ef4444',
                    minHeight: '100vh',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap'
                }}>
                    <h1>Something went wrong.</h1>
                    <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Error:</h2>
                        {this.state.error && this.state.error.toString()}
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b', overflowX: 'auto' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Component Stack:</h2>
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#38bdf8',
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
