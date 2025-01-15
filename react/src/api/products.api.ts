import {
  APIResponseType,
  APIReturnType,
  CreateProductType,
  Product,
} from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProduct = async (
  productId: string
): Promise<APIReturnType<Product>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network error");
    }
    const data: Product = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getAllProducts = async (): Promise<APIReturnType<Product[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network error");
    }
    const data: Product[] = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const createProduct = async (
  product: CreateProductType,
  accessToken: string
): Promise<APIReturnType<Product>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Network error");
    }

    const data: Product = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const deleteProduct = async (
  productId: string,
  accessToken: string
): Promise<APIResponseType> => {
  try {
    if (!accessToken) {
      throw new Error("No access token");
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network error");
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
