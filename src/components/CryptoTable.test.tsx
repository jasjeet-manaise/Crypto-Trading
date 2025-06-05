import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortField, SortDirection } from '../enums';
import CryptoTable from './CryptoTable';

// Mock dependencies
vi.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="skeleton" {...props} />,
}));
vi.mock('./ui/Button', () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));
vi.mock('./ui/DropDownSelect', () => ({
  Dropdown: (props: any) => (
    <select data-testid="dropdown" onChange={e => props.onSelect(e.target.value)}>
      <option value="buy">Buy</option>
      <option value="sell">Sell</option>
    </select>
  ),
}));

const baseProps = {
  assets: [],
  isLoading: false,
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: vi.fn(),
  sortField: SortField.Name,
  sortDirection: SortDirection.Asc,
  setSortField: vi.fn(),
  setSortDirection: vi.fn(),
};

const assets = [
  {
    id: 'btc',
    name: 'Bitcoin',
    image: 'btc.png',
    current_price: 50000,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    image: 'eth.png',
    current_price: 4000,
  },
];

describe('CryptoTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeletons when isLoading is true', () => {
    render(<CryptoTable {...baseProps} isLoading={true} />);
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
  });

  it('renders "No data available" when assets is empty and not loading', () => {
    render(<CryptoTable {...baseProps} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('renders asset rows when assets are provided', () => {
    render(<CryptoTable {...baseProps} assets={assets} />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getAllByTestId('dropdown').length).toBe(2);
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('$4,000')).toBeInTheDocument();
  });

  it('calls setSortField and setSortDirection when clicking Name header', () => {
    render(<CryptoTable {...baseProps} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(baseProps.setSortField).not.toHaveBeenCalled(); // Already Name
    expect(baseProps.setSortDirection).toHaveBeenCalled();
  });

  it('calls setSortField and setSortDirection when clicking Price header', () => {
    render(<CryptoTable {...baseProps} />);
    const priceHeader = screen.getByText(/price/i);
    fireEvent.click(priceHeader);
    expect(baseProps.setSortField).toHaveBeenCalledWith(SortField.Price);
    expect(baseProps.setSortDirection).toHaveBeenCalledWith(SortDirection.Asc);
  });

  it('calls onSort with keyboard Enter/Space on header', () => {
    render(<CryptoTable {...baseProps} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.keyDown(nameHeader, { key: 'Enter' });
    expect(baseProps.setSortDirection).toHaveBeenCalled();
    fireEvent.keyDown(nameHeader, { key: ' ' });
    expect(baseProps.setSortDirection).toHaveBeenCalledTimes(2);
  });

  it('renders "Show More" button if hasNextPage is true and calls fetchNextPage on click', () => {
    render(<CryptoTable {...baseProps} hasNextPage={true} />);
    const btn = screen.getByRole('button', { name: /show more/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(baseProps.fetchNextPage).toHaveBeenCalled();
  });

  it('calls alert when Dropdown onSelect is triggered', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<CryptoTable {...baseProps} assets={assets} />);
    const dropdowns = screen.getAllByTestId('dropdown');
    fireEvent.change(dropdowns[0], { target: { value: 'buy' } });
    expect(alertMock).toHaveBeenCalledWith('You selected buy for Bitcoin');
    alertMock.mockRestore();
  });
});
