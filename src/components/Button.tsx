import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  children,
  icon,
  color = 'info',
}) => {

  const buttonColor = `bg-[var(--${color})] hover:bg-[var(--${color}Hover)]`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-3 py-1 ${buttonColor} text-white rounded flex items-center hover:cursor-pointer transition-all duration-200`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
