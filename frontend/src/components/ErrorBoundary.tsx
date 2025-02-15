import { Component, ReactNode } from 'react';
import Button from "./ui/button";
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl text-center">
                        <AlertCircle className="h-16 w-16 text-red-600 mx-auto" />
                        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {this.state.error?.message || "An unexpected error occurred. Please try again."}
                        </p>

                        <div className="mt-6 space-y-4">
                            <Button onClick={this.handleRetry} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Retry
                            </Button>
                            <Link to="/">
                                <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
