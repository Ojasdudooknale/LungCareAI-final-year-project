import React from 'react';

// Define button properties interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition-colors';

    const variantClasses =
        variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            : variant === 'secondary'
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400'
                : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';

    const sizeClasses =
        size === 'sm'
            ? 'px-2 py-1 text-sm'
            : size === 'lg'
                ? 'px-6 py-3 text-lg'
                : 'px-4 py-2 text-base';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
