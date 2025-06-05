import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default (primary) variant', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toHaveClass('bg-blue-600');
    expect(btn).toHaveTextContent('Click me');
  });

  it('renders with danger variant', () => {
    render(<Button variant="danger">Danger</Button>);
    const btn = screen.getByRole('button', { name: /danger/i });
    expect(btn).toHaveClass('bg-red-600');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button', { name: /ghost/i });
    expect(btn).toHaveClass('bg-transparent');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('passes additional props', () => {
    render(
      <Button type="submit" data-testid="my-btn">
        Submit
      </Button>
    );
    const btn = screen.getByTestId('my-btn');
    expect(btn).toHaveAttribute('type', 'submit');
  });
});
