import React, { Component, ReactNode, ReactElement } from "react";

interface ErrorBoundaryProps {
    children?: ReactElement;
}

interface ErrorBoundaryState {
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    render(): ReactNode {
        const { error } = this.state;

        if (error) {
            return (
                <div>
                    <p>Seems like an error occurred!</p>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
