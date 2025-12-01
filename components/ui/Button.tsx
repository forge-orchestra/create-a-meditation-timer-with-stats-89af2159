import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      },
      size: {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button: React.FC<ButtonProps> = ({ children, icon: Icon, iconPosition = 'left', variant, size, ...props }) => {
  return (
    <button className={buttonStyles({ variant, size })} {...props}>
      {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" aria-hidden="true" />}
    </button>
  );
};

export default Button;