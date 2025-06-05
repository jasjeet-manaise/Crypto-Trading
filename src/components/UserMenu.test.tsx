import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserMenu from './UserMenu';

// Mock useAuth
vi.mock('@/store/authStore', () => ({
  useAuth: () => ({
    user: { email: 'test@example.com' },
    logout: vi.fn(),
  }),
}));

describe('UserMenu', () => {
  it('renders user initial', () => {
    render(<UserMenu />);
    expect(screen.getByLabelText(/user menu/i)).toHaveTextContent('T');
  });

  it('shows menu on button click', () => {
    render(<UserMenu />);
    fireEvent.click(screen.getByLabelText(/user menu/i));
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
});
