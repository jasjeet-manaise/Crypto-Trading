import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}
