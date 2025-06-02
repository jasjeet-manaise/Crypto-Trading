import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { Button } from "./ui/Button";
import UserMenu from "./UserMenu";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <nav className="flex gap-6">
          <Link
            to="/"
            className={`font-medium ${
              pathname === "/" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Home
          </Link>

          <button
            onClick={() => {
              if (!user) {
                alert("Please log in to access the Trade page.");
                return;
              }
              navigate("/trade");
            }}
            className={`font-medium ${
              pathname === "/trade" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Trade
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <Button onClick={() => setShowModal(true)}>Login</Button>
          ) : (
            <UserMenu />
          )}
        </div>
      </header>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
