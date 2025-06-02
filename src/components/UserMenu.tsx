import { useState, useRef, useEffect } from "react";
import { useAuth } from "../store/authStore";
import { Button } from "./ui/Button";

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

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold"
        onClick={() => setOpen((v) => !v)}
      >
        {user.email[0].toUpperCase()}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-20 border">
          <div className="px-4 py-2 text-sm text-gray-800 border-b">
            {user.email}
          </div>
          <Button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-900"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
