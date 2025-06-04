import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx('space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800', className)}>
      {children}
    </div>
  );
}
