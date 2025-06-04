import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 bg-gray-50 p-4 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}
