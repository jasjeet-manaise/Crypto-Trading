import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    />
  );
}
