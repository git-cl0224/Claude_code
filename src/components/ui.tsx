import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div 
      className={cn('card', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) {
  const baseStyles = 'rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-sky-600 shadow-sm hover:shadow',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-danger text-white hover:bg-red-600 shadow-sm',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'input-field',
          error && 'border-danger focus:ring-danger/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={cn('input-field bg-white', className)}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  status?: 'normal' | 'warning' | 'danger';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  status = 'normal',
  showLabel = true,
  className 
}: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);
  
  const colors = {
    normal: 'bg-primary',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">进度</span>
          <span className="font-medium">{percent.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[status])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
