import MenuIcon from "../assets/icons/MenuIcon";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { useDropdown } from "../hooks/useDropdown";

export default function Dropdown() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { closeDropdown, dropdownRef, open, toggleDropdown } = useDropdown();

  return (
    <div ref={dropdownRef} className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        <MenuIcon />
      </button>
      {open && (
        <nav className="dropdown-open">
          <ul>
            {pathname !== "/" && (
              <li>
                <Link to={"/"} onClick={closeDropdown}>
                  <button>Home</button>
                </Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link to={"/logout"} onClick={closeDropdown}>
                    <button>Log Out</button>
                  </Link>
                </li>

                <li>
                  <Link to={"/sessions"} onClick={closeDropdown}>
                    <button>Sessions</button>
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to={"/login"} onClick={closeDropdown}>
                    <button>Log In</button>
                  </Link>
                </li>
                <li>
                  <Link to={"/register"} onClick={closeDropdown}>
                    <button>Register</button>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to={"/products"} onClick={closeDropdown}>
                <button>Products</button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
