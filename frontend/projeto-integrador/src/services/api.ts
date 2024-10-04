import { Product, StockItem } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  return await response.json();
};

export const updateStock = async (id: number, quantity: number): Promise<StockItem> => {
  const response = await fetch(`/api/stock/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  return await response.json();
};
