import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../actions/auth";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, authenticated, refreshUser } = useContext(UserContext);


  const getLinkClass = (path) =>
    location.pathname === path ? "nav-link-active" : "nav-link";

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        refreshUser();
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };



  const renderNavLinks = () => (
    <>
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className={getLinkClass("/")}
      >
        Home
      </Link>

      <div className="relative group">
        <div className="px-4 py-2 nav-link cursor-pointer rounded hover:nav-link-active group-hover:bg-slate-700">
          Categories
        </div>

      </div>

      {!authenticated && (
        <Link
          to="/register"
          onClick={() => setMenuOpen(false)}
          className={getLinkClass("/register")}
        >
          Register / Login
        </Link>
      )}

      {authenticated && role === "admin" && (
        <Link
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
          className={getLinkClass("/dashboard")}
        >
          Dashboard
        </Link>
      )}

      {authenticated && (
        <button
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
          className="nav-link text-left"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav>
      <Link to="/" className="text-xl font-bold">
        Logo
      </Link>

      <div className="hidden md:flex space-x-6 items-center">
        {renderNavLinks()}
      </div>

      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col gap-4 py-4 px-6 md:hidden shadow-md z-10">
          {renderNavLinks()}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
