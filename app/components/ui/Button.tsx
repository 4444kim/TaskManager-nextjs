import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

const buttonVariants = cva('rounded-xl font-medium transition-colors duration-200', {
  variants: {
    variant: {
      default: 'text-red-400 hover:underline',
      primary: 'bg-gradient-to-r from-[#6b2a14] via-[#a41914] to-[#410a0a] text-white',
      outline: 'text-red-400 hover:bg-[#38282a]',
      danger: 'bg-red-800 text-white',
    },
    size: {
      custom: 'w-full py-4',
      sm: 'px-3 py-3 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-3 text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={clsx(buttonVariants({ variant, size }), className)} {...props} />;
};

export default Button;
