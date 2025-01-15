import { Link } from "react-router";
import { Product } from "../../types/types";
import Placeholder from "./../../assets/placeholder.png";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="item-card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p className="price">£{product.price}</p>
      <img src={Placeholder} alt="product image" />
      <Link to={`/products/${product.productId}`}>
        <button>View Product</button>
      </Link>
    </div>
  );
}
