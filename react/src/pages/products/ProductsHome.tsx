import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function ProductsHome() {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );

  return (
    <main>
      <h2>Products</h2>

      <Link to="/products/all" className="nav-link">
        <button className="home-selection">All Products</button>
      </Link>
      {user && (
        <Link to="/products/create" className="nav-link">
          <button className="home-selection">Create Product</button>
        </Link>
      )}
    </main>
  );
}
