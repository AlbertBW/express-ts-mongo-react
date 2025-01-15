import { useEffect, useState } from "react";
import { getProduct } from "../api/products.api";
import { Product } from "../types/types";

export default function useProductItem({
  productId,
}: {
  productId: string | undefined;
}) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!productId) {
      setError("No product ID");
      return;
    }

    const fetchProduct = async () => {
      try {
        const { data, error } = await getProduct(productId);

        if (error) {
          throw new Error("An error has occurred");
        }

        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
}
