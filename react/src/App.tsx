import { Link } from "react-router";
import "./App.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );

  return (
    <main>
      {!user && (
        <>
          <Link to="/login" className="nav-link">
            <button className="home-selection">Log In</button>
          </Link>
          <Link to="/register" className="nav-link">
            <button className="home-selection">Register</button>
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to="/logout" className="nav-link">
            <button className="home-selection">Log out</button>
          </Link>

          <Link to={"/sessions"} className="nav-link">
            <button className="home-selection">Sessions</button>
          </Link>
        </>
      )}

      <Link to={"/products"} className="nav-link">
        <button className="home-selection">Products</button>
      </Link>
    </main>
  );
}

export default App;
