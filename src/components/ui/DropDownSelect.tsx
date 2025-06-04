import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

interface DropdownProps {
  onSelect: (value: 'buy' | 'sell') => void;
}

export function Dropdown({ onSelect }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-between rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
          Buy/Sell
          <ChevronDown className="ml-2 h-4 w-4" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems className="absolute z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-gray-700 dark:bg-gray-800">
          <div className="px-1 py-1">
            {['buy', 'sell'].map(option => (
              <MenuItem key={option}>
                {({ active }) => (
                  <button
                    onClick={() => onSelect(option as 'buy' | 'sell')}
                    className={clsx(
                      'group flex w-full items-center rounded-md px-4 py-2 text-sm',
                      active
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white'
                        : 'text-gray-700 dark:text-gray-100'
                    )}>
                    {option === 'buy' ? 'Buy' : 'Sell'}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
