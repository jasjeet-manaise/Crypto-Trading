import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  const base = 'px-4 py-2 rounded text-sm font-medium transition';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}
