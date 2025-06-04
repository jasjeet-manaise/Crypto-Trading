import clsx from 'clsx';
import { LogOut, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/store/authStore';
import { Button } from './ui/Button';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initial = user.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white transition-transform focus:outline-none',
          open && 'ring-2 ring-blue-400'
        )}
        onClick={() => setOpen(v => !v)}
        aria-label="User menu">
        {initial}
      </Button>

      {open && (
        <div className="animate-fade-in absolute right-0 z-30 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm text-gray-800 dark:border-gray-700 dark:text-gray-100">
            <Mail size={16} className="text-gray-500" />
            {user.email}
          </div>
          <button
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-100 dark:hover:bg-red-900"
            onClick={() => {
              logout();
              setOpen(false);
            }}>
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
