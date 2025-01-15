import { useEffect, useState } from "react";
import { createProduct } from "../../api/products.api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function ProductCreate() {
  const { accessToken, isLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [accessToken, navigate]);

  if (!accessToken) return <h2>fjkla</h2>;

  if (isLoading) return <h1>Loading</h1>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price,
      image,
    };

    const product = await createProduct(newProduct, accessToken);

    if (product.error) return setError(String(product.error));
    navigate(`/products/${product.data.productId}`);
  };

  return (
    <main>
      <h2>Create a product</h2>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={120}
          rows={5}
          cols={33}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) =>
            setPrice(parseFloat(parseFloat(e.target.value).toFixed(2)))
          }
          step="0.01"
          required
        />
        <label htmlFor="image">Image (URL)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <div aria-hidden />
        <button type="submit">Create Product</button>
      </form>
    </main>
  );
}
