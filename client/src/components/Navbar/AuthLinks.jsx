import { Link } from "react-router-dom";

function AuthLinks({
  authenticated,
  role,
  locationPath,
  closeMenu,
  handleLogout,
  getLinkClass,
}) {
  if (!authenticated) {
    const activeClass = ["/register", "/login"].includes(locationPath)
      ? "nav-link-active"
      : "nav-link";

    return (
      <span className={activeClass}>
        <Link to="/register" onClick={closeMenu}>
          Register {" / "}
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
      </span>
    );
  }

  return (
    <>
      {role === "admin" && (
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className={getLinkClass("/dashboard")}
        >
          Dashboard
        </Link>
      )}
      <button
        onClick={() => {
          closeMenu();
          handleLogout();
        }}
        className="nav-link text-left"
      >
        Logout
      </button>
    </>
  );
}

export default AuthLinks;
