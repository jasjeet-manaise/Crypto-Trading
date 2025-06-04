import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/authStore';

export function useAuthBackUrl() {
  const { user } = useAuth();
  const backUrlRef = useRef<string | null>(null);
  const navigate = useNavigate();

  const handleAuthBackUrlSet = (backUrl: string) => {
    backUrlRef.current = backUrl;
  };

  useEffect(() => {
    if (!user && !backUrlRef.current) return;
    if (backUrlRef.current) navigate(backUrlRef.current);
  }, [user]);

  return { handleAuthBackUrlSet };
}
