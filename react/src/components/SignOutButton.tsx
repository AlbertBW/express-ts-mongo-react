import { Link } from "react-router";

export default function SignOutButton() {
  return (
    <Link to={"/logout"}>
      <button>Log Out</button>
    </Link>
  );
}
