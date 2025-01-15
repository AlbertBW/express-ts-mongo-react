import React from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products, error } = useProducts();

  if (error) return <h1>Error</h1>;

  return (
    <main>
      <h1>All Products</h1>
      <section className="items-section">
        {!products ? (
          <div>No products</div>
        ) : (
          products.map((product) => (
            <React.Fragment key={product._id}>
              <ProductItem product={product} />
            </React.Fragment>
          ))
        )}
      </section>
    </main>
  );
}
