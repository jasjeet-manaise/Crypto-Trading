import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 space-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
