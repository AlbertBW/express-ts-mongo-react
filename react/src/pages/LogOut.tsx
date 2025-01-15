import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

export default function LogOut() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user)
    return (
      <main>
        <div>
          <h1>Not logged in</h1>
          <Link to={"/"}>
            <button>Return Home</button>
          </Link>
        </div>
      </main>
    );

  const handleLogOut = async () => {
    logout();
    navigate("/");
  };

  return (
    <main>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </main>
  );
}
