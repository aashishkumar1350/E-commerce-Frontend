import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import API from "@/lib/api";

type Product = {
  id: number;
  name: string;
  price: number | string;
  images?: { image: string }[];
};

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // ✅ Fetch wishlist from backend on load
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      console.log("WISHLIST:", res.data);
      setItems(res.data); // backend must return full product data
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    }
  };

  // ✅ Add to wishlist (API)
  const addToWishlist = async (product: Product) => {
    try {
      await API.post("/wishlist", {
        product_id: product.id,
      });

      fetchWishlist(); // refresh list
    } catch (err) {
      console.error("Add wishlist error:", err);
    }
  };

  // ✅ Remove from wishlist (API)
  const removeFromWishlist = async (productId: string) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      fetchWishlist();
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  // ✅ Fix type issue (string vs number)
  const isInWishlist = (productId: string) =>
    items.some((p) => p.id === Number(productId));

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};