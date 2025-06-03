import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { decrypt, encrypt } from "@/utils/crypto";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  // TODO: Enable for user creation
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(
  //   /[^A-Za-z0-9]/,
  //   "Password must contain at least one special character"
  // ),
});

interface AuthState {
  user: { email: string; loginTime: number } | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isSessionExpired: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email, password) => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const firstError = result.error.issues[0]?.message;
          return { success: false, error: firstError };
        }

        await new Promise((res) => setTimeout(res, 800));

        set({ user: { email, loginTime: Date.now() } });
        return { success: true };
      },

      logout: () => set({ user: null }),

      isSessionExpired: () => {
        const user = get().user;
        if (!user) return true;
        const maxAge = 15 * 60 * 1000;
        return Date.now() - user.loginTime > maxAge;
      },
    }),
    {
      name: "auth-storage",

      storage: {
        getItem: (name) => {
          const stored = localStorage.getItem(name);
          return stored ? decrypt(stored, ENCRYPTION_KEY) : null;
        },
        setItem: (name, value) => {
          const encrypted = encrypt(value, ENCRYPTION_KEY);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
