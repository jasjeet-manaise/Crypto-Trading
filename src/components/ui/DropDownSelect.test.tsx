import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dropdown } from './DropDownSelect';

describe('Dropdown', () => {
  it('renders Buy/Sell button', () => {
    render(<Dropdown onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: /buy\/sell/i })).toBeInTheDocument();
  });
});
