import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
type Product = {
  id: number;
  name: string;
  price: number | string;
  seller_id: number;
  images?: { image: string }[];
  variants?: { id: number }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(String(product.id));

  const handleAdd = (e: any) => {
    e.preventDefault();   // ✅ stop Link navigation
    e.stopPropagation();  // ✅ stop bubbling

    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(String(product.id));
      toast.info(`Removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.length
          ? `http://127.0.0.1:8001/storage/${product.images[0].image}`
          : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image",
      });
      toast.success(`Added to wishlist`);
    }
  };

  const discount = 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={
              product?.images?.length
                ? `http://127.0.0.1:8001/storage/${product.images[0].image}`
                : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
            }
            alt={product.name || "No Name"}
            className="h-full w-full object-cover"
          />
          {discount > 0 && (
            <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlist();
            }}
            className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 shadow backdrop-blur-sm transition-colors hover:bg-card"
          >
            <Heart
              className={`h-4 w-4 ${
                wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            Seller #{product.seller_id}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium text-foreground">4.5</span>
            <span className="text-xs text-muted-foreground">(10)</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">Rs.{Number(product.price)}</span>
            </div>
            <Button size="sm" onClick={handleAdd} className="gap-1.5">
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
