import { Route, Routes, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import Trade from "../pages/Trade";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/trade"
          element={
            <ProtectedRoute>
              <Trade />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
