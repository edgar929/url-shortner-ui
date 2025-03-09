import { forwardRef, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            ${error ? 'border-red-500 dark:border-red-400' : ''}
            ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField'; 