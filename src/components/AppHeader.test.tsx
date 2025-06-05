import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppHeader from './AppHeader';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => vi.fn(),
    Link: ({ to, children, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock useAuthBackUrl
vi.mock('@/hooks/useAuthBackUrl', () => ({
  useAuthBackUrl: () => ({
    handleAuthBackUrlSet: vi.fn(),
  }),
}));

// Mock useAuth
let mockUser: any = null;
vi.mock('@/store/authStore', () => ({
  useAuth: (fn: any) => fn({ user: mockUser }),
}));

// Mock Button, UserMenu, LoginModal
vi.mock('./ui/Button', () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));
vi.mock('./UserMenu', () => ({
  default: () => <div>UserMenu</div>,
}));
vi.mock('./LoginModal', () => ({
  default: ({ onClose }: any) => (
    <div>
      LoginModal
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('AppHeader', () => {
  beforeEach(() => {
    mockUser = null;
  });

  it('renders Home and Trade', () => {
    render(<AppHeader />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Trade')).toBeInTheDocument();
  });

  it('shows Login button when not authenticated', () => {
    render(<AppHeader />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows UserMenu when authenticated', () => {
    mockUser = { name: 'Test' };
    render(<AppHeader />);
    expect(screen.getByText('UserMenu')).toBeInTheDocument();
  });

  it('opens LoginModal when clicking Trade while not authenticated', () => {
    render(<AppHeader />);
    fireEvent.click(screen.getByText('Trade'));
    expect(screen.getByText('LoginModal')).toBeInTheDocument();
  });

  it('opens LoginModal when clicking Login', () => {
    render(<AppHeader />);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('LoginModal')).toBeInTheDocument();
  });

  it('closes LoginModal when Close is clicked', () => {
    render(<AppHeader />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('LoginModal')).not.toBeInTheDocument();
  });
});
