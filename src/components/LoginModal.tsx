import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../store";
import { Input, Button, Loader } from "./ui";

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
      return;
    }

    setError("");
    setLoading(false);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          {loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.getElementById("modal-root")!);
}
