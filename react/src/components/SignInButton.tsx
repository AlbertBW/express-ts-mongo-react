import { Link } from "react-router";

export default function SignInButton() {
  return (
    <Link to={"/login"}>
      <button>Log In</button>
    </Link>
  );
}
