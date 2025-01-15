import { useNavigate, useParams } from "react-router";
import { deleteProduct, getProduct } from "../../api/products.api";
import { useEffect, useState } from "react";
import { Product } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";
import Placeholder from "./../../assets/placeholder.png";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<string>();
  const { id } = useParams();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const { data, error } = await getProduct(id);
        if (error) {
          throw error;
        }
        setProduct(data);
      } catch (error) {
        setError(String(error));
      }
    };

    fetchProduct();
  }, [id]);

  if (!id)
    return (
      <main>
        <h2>No ID</h2>
      </main>
    );

  if (error)
    return (
      <main>
        <h2>{error}</h2>
      </main>
    );

  if (!product)
    return (
      <main>
        <h2>No product found</h2>
      </main>
    );

  const handleDelete = async () => {
    if (!accessToken) return setError("No Access Token");
    const { success, error } = await deleteProduct(id, accessToken);

    if (error) {
      setError(String(error));
      return;
    }

    if (success) {
      navigate("/products");
    }
  };

  return (
    <main>
      <div className="item-page">
        <img src={Placeholder} alt="product image" />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="price">£{product.price}</p>

        {accessToken && user?._id === product.user && (
          <button onClick={handleDelete}>Delete Product</button>
        )}
      </div>
    </main>
  );
}
