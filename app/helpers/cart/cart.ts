export const addToCart = async (
  productId: string,
  quantity: number,
  token: string
) => {
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error adding to cart:", err);
    throw err;
  }
};

export const getCartItems = async (token: string) => {
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch("http://localhost:5000/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw err;
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    const res = await fetch("http://localhost:5000/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error removing from cart:", err);
    throw err;
  }
};
