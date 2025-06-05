import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

vi.mock('./AppHeader', () => ({
  default: () => <header data-testid="app-header" />,
}));
vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

describe('AppLayout', () => {
  it('renders AppHeader and Outlet', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('applies correct class names to root div and main', () => {
    const { container } = render(<AppLayout />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass('flex', 'min-h-screen', 'flex-col');
    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-1', 'bg-gray-50', 'p-4', 'dark:bg-gray-900');
  });
});
