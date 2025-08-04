import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../../actions/auth";
import { UserContext } from "../../../context/UserContext";
import { getCategories } from "../../../actions/categories";
import AuthLinks from "./AuthLinks";
import CategoryDropdown from "./CategoryDropdown";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, authenticated, refreshUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [categoryMessage, setCategoryMessage] = useState("");

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

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      if (result.success) {
        setCategories(result.data);
        setCategoryMessage(result.message);
      } else {
        setCategories([]);
        setCategoryMessage(result.message || "Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  const renderNavLinks = () => (
    <>
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className={getLinkClass("/")}
      >
        Home
      </Link>

      <CategoryDropdown
        categories={categories}
        message={categoryMessage}
        role={role}
        closeMenu={() => setMenuOpen(false)}
        onCategoryAdded={(newCat) =>
          setCategories((prev) => {
            if (prev.some((cat) => cat._id === newCat._id)) {
              return prev;
            }
            return [...prev, newCat];
          })
        }
        onCategoryDeleted={(deletedId) => {
          setCategories((prev) => prev.filter((cat) => cat._id !== deletedId));
        }}
      />

      <AuthLinks
        authenticated={authenticated}
        role={role}
        locationPath={location.pathname}
        closeMenu={() => setMenuOpen(false)}
        handleLogout={handleLogout}
        getLinkClass={getLinkClass}
      />
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
        aria-label="Toggle menu"
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
