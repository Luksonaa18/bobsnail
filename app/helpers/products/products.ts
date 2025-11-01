export const createProduct = async (product: any, token: string) => {
  const res = await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create product");
  return data;
};

export const updateProduct = async (
  productId: string,
  updatedData: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
  },
  token: string
) => {
  const res = await fetch(`http://localhost:5000/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
};

export const deleteProduct = async (productId: string, token: string) => {
  const res = await fetch(`http://localhost:5000/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return await res.json();
};
