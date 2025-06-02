import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}
