import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/store/authStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Loader } from './ui/Loader';

interface Props {
  onClose: () => void;
}

interface FormState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

export default function LoginModal({ onClose }: Props) {
  const login = useAuth(s => s.login);
  const [mounted, setMounted] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    error: '',
    loading: false,
  });

  // to set the mounted state of the Modal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true, error: '' }));

    const result = await login(formState.email, formState.password);

    if (!result.success) {
      setFormState(prev => ({ ...prev, error: result.error || 'Login failed', loading: false }));
      return;
    }

    setFormState(prev => ({ ...prev, error: '', loading: false }));
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formState.email}
            required
            onChange={handleChange('email')}
            className="w-full rounded border p-2"
            disabled={formState.loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formState.password}
            required
            onChange={handleChange('password')}
            className="w-full rounded border p-2"
            disabled={formState.loading}
          />
          {formState.error && (
            <div className="text-sm font-medium text-red-600">{formState.error}</div>
          )}
          {formState.loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2"
              disabled={formState.loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
              disabled={formState.loading}>
              {formState.loading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.getElementById('modal-root')!);
}
