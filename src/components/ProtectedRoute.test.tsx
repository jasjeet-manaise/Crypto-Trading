import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';

// Mock useAuth and useLocation
vi.mock('@/store/authStore', () => ({
  useAuth: () => ({ user: { email: 'test@example.com' } }),
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/protected' }),
    Navigate: ({ to }: { to: string }) => <div>Navigate to {to}</div>,
  };
});

describe('ProtectedRoute', () => {
  it('renders children if user is present', () => {
    const Child = () => <div>Protected Content</div>;
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <Child />
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
