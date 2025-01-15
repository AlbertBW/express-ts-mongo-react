import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Dropdown from "./Dropdown";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <div>
        <Dropdown />
      </div>
      <div>
        <h1>
          <Link to={"/"}>AuthAPI</Link>
        </h1>
      </div>
      <div>{user ? <SignOutButton /> : <SignInButton />}</div>
    </header>
  );
}
