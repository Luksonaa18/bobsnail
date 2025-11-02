const url = process.env.NEXT_PUBLIC_API_URL;
const uploadFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${url}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload file");

  const data = await res.json();
  return data.url; // backend should return { url: '...' }
};

export const createProduct = async (product: any, token: string) => {
  let imageUrls: string[] = [];
  if (product.images && product.images.length > 0) {
    imageUrls = await Promise.all(
      product.images.map((file: File) => uploadFile(file, token))
    );
  }

  const res = await fetch(`${url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...product, images: imageUrls }),
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
    images?: File[]; // accept new files
  },
  token: string
) => {
  let imageUrls: string[] = [];
  if (updatedData.images && updatedData.images.length > 0) {
    imageUrls = await Promise.all(
      updatedData.images.map((file) => uploadFile(file, token))
    );
  }

  const res = await fetch(`${url}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...updatedData, images: imageUrls }),
  });

  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
};

export const deleteProduct = async (productId: string, token: string) => {
  const res = await fetch(`${url}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return await res.json();
};

