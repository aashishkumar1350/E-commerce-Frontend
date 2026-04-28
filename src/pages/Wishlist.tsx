import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-6 w-6 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">
          My Wishlist
        </h1>
        <span className="text-muted-foreground">
          ({items?.length || 0} items)
        </span>
      </div>

      {/* Empty State */}
      {!items || items.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          Your wishlist is empty. Start adding products you love!
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item: any) => {
            const p = item.product || item; // 🔥 handle both cases

            const normalizedProduct = {
              id: p.id,
              name: p.name,
              price: Number(p.price || 0),
              seller_id: p.seller_id || 0,
              variant_id: p.variants?.[0]?.id, // 🔥 ADD THIS
              variants: p.variants || [],
              images:
                p.images?.map((img: any) => ({
                  image: img.image || img.image_path,
                })) || [],
            };
            return (
              <div key={normalizedProduct.id} className="relative">

                {/* 🔥 REMOVE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(String(normalizedProduct.id));
                  }}
                  className="absolute top-2 right-2 z-10 text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>

                {/* Product Card */}
                <ProductCard product={normalizedProduct} />

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}