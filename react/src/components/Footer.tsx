import { Link } from "react-router";
import GitHub from "../assets/github-mark.svg";

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2025 AuthAPI.</p>

      <Link
        target="_blank"
        rel="noopener noreferrer"
        to={"https://github.com/AlbertBW"}
      >
        <img className="github" src={GitHub} /> Albert Wales
      </Link>
    </footer>
  );
}
