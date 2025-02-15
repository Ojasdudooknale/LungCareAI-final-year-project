import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <AlertTriangle className="text-red-500 h-20 w-20" />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mt-2 text-center">
                Sorry, the page you are looking for does not exist. You might have mistyped the URL or the page may have moved.
            </p>
            <Link to="/" className="mt-6 px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
