import React from 'react';

interface Props {
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly disabled?: boolean;
  readonly variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'ghost'
    | 'outline';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: React.ReactNode;
  readonly fullWidth?: boolean;
  readonly loading?: boolean;
}

export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
}: Props) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-sm hover:shadow-md active:shadow-sm';
      case 'secondary':
        return 'bg-[var(--surface)] hover:bg-[var(--surface-variant)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--border-strong)] shadow-sm';
      case 'danger':
        return 'bg-[var(--error)] hover:bg-[var(--error-hover)] text-white shadow-sm hover:shadow-md active:shadow-sm';
      case 'success':
        return 'bg-[var(--success)] hover:bg-[var(--success-hover)] text-white shadow-sm hover:shadow-md active:shadow-sm';
      case 'ghost':
        return 'bg-transparent hover:bg-[var(--surface-variant)] text-[var(--foreground)] hover:text-[var(--foreground)]';
      case 'outline':
        return 'bg-transparent hover:bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white';
      default:
        return 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-sm hover:shadow-md active:shadow-sm';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm font-medium';
      case 'md':
        return 'px-4 py-2.5 text-sm font-medium';
      case 'lg':
        return 'px-6 py-3 text-base font-medium';
      default:
        return 'px-4 py-2.5 text-sm font-medium';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        rounded-[var(--radius)]
        inline-flex items-center justify-center gap-2
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        active:scale-[0.98]
        select-none
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
