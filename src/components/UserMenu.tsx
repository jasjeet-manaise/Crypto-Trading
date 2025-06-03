import { useState, useRef, useEffect } from "react";

import { LogOut, Mail } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../store";
import { Button } from "./ui";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initial = user.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className={clsx(
          "w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold focus:outline-none transition-transform",
          open && "ring-2 ring-blue-400"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
      >
        {initial}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-2 z-30 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            {user.email}
          </div>
          <button
            className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-2 transition-colors"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
