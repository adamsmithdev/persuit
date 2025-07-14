import React from 'react';

interface Props {
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly disabled?: boolean;
  readonly variant?: 'primary' | 'secondary' | 'danger' | 'success';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: React.ReactNode;
}

export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  children,
}: Props) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--info)] hover:bg-[var(--infoHover)] text-white';
      case 'secondary':
        return 'bg-[var(--elementBackground)] hover:bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600';
      case 'danger':
        return 'bg-[var(--danger)] hover:bg-[var(--dangerHover)] text-white';
      case 'success':
        return 'bg-[var(--success)] hover:bg-[var(--successHover)] text-white';
      default:
        return 'bg-[var(--info)] hover:bg-[var(--infoHover)] text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'md':
        return 'px-4 py-2';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-lg font-medium
        flex items-center justify-center
        transition-all duration-200
        hover:cursor-pointer
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </button>
  );
}
