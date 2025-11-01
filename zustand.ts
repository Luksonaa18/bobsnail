import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: any;
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }
  )
);

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) => set({ products: [...get().products, product] }),
      updateProduct: (updated) =>
        set({
          products: get().products.map((p) =>
            p._id === updated._id ? updated : p
          ),
        }),
      deleteProduct: (id) =>
        set({ products: get().products.filter((p) => p._id !== id) }),
    }),
    { name: "product-storage" }
  )
);

export type CartItem = Product & { quantity: number };

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
}
const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product) => {
        const existing = get().cartItems.find((p) => p._id === product._id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((p) =>
              p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) =>
        set({ cartItems: get().cartItems.filter((p) => p._id !== productId) }),
      clearCart: () => set({ cartItems: [] }),
      cartCount: 0,
    }),
    {
      name: "cart-storage",
      storage: localStorageAdapter,
    }
  )
);
