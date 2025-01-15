import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products.api";
import { Product } from "../types/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();

      if (products.error) {
        setError(String(products.error));
        setIsLoading(false);
        return;
      }

      setProducts(products.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};
