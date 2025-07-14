import React from 'react';

interface Props {
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly disabled?: boolean;
  readonly children: React.ReactNode;
}

export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-3 py-1 bg-[var(--info)] hover:bg-[var(--infoHover)] text-white rounded flex items-center hover:cursor-pointer transition-all duration-200`}
    >
      {children}
    </button>
  );
}
