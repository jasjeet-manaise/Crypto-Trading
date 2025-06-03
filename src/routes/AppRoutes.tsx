import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Trade } from "../pages";
import ProtectedRoute from "./ProtectedRoutes";
import { Layout } from "../components";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
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
