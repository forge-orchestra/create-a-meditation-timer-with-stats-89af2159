import React from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps extends LucideProps {
  name: string;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className, ariaLabel, ...props }) => {
  const IconComponent = require('lucide-react')[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" does not exist in lucide-react.`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={cn('text-gray-800', className)}
      aria-label={ariaLabel}
      role="img"
      {...props}
    />
  );
};

export default Icon;