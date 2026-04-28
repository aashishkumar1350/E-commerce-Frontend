import { createContext, useContext, useState, ReactNode } from "react";
import { addToCartAPI, updateCartAPI } from "@/lib/api";
import { useEffect } from "react";
import { getCartAPI, removeCartAPI } from "@/lib/api";
import Swal from "sweetalert2"

// ✅ Types
interface Product {
  id: number;
  name: string;
  price: number;
  variants?: any[];
  variant_id?: number;
}

interface CartItem {
  id?: number;
  variant_id?: number;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: number) => void;
  updateQuantity: (cartId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);


  const loadCart = async () => {
    try {
      const res = await getCartAPI();

      const backendItems = res.data.data
        .filter((item: any) => item.variant?.product)
        .map((item: any) => ({
          id: item.id,
          product: item.variant.product,
          quantity: item.quantity,
        }));

      setItems(backendItems);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product: Product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      const variantId =
        product?.variants?.[0]?.id || product?.variant_id;

      if (!variantId) {
        Swal.fire("This product has no variant");
        return;
      }

      // ✅ API FIRST (important)
      const res = await addToCartAPI({
        variant_id: variantId,
        quantity: 1,
      });

      // ✅ Then reload correct data
      await loadCart();

    } catch (err: any) {
      console.error("❌ ERROR:", err.response?.data);
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await removeCartAPI(cartId);
      setItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ UPDATE
  const updateQuantity = async (cartId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      await updateCartAPI(cartId, { quantity });

      setItems((prev) =>
        prev.map((i) =>
          i.id === cartId ? { ...i, quantity } : i
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = () => setItems([]);
  const totalItems = items.length;
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
