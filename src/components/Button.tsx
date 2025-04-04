import React from 'react';

// Define the props interface for type safety
interface ButtonProps {
  children: React.ReactNode; // Content inside the button (text, icons, etc.)
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link'; // Button styles
  size?: 'lg' | 'md' | 'sm' | 'xs'; // Button sizes
  disabled?: boolean; // Disable the button
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click handler
  type?: 'button' | 'submit' | 'reset'; // Button type for forms
  className?: string; // Additional custom classes
  fullWidth?: boolean; // Make button full-width
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
}: ButtonProps) => {
  // Base classes from DaisyUI
  const baseClasses = 'btn';

  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
    link: 'btn-link',
  }[variant];

  // Size classes
  const sizeClasses = {
    lg: 'btn-lg',
    md: '',
    sm: 'btn-sm',
    xs: 'btn-xs',
  }[size];

  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidth ? 'btn-block' : '',
    disabled ? 'btn-disabled' : '',
    className,
  ]
    .filter(Boolean) // Remove empty strings
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;