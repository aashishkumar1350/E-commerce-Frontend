import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Start shopping to add items to your cart.</p>
        <Link to="/">
          <Button className="mt-6">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { clearCart(); toast.success("Cart cleared"); }}>
          Clear All
        </Button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const { product, quantity } = item;
            if (!product) return <div key={item.id} />;
            return (
              <Card key={item.id || item.variant_id}>
                <CardContent className="flex gap-4 p-4">
                  <img
                    src={
                      product?.images?.[0]?.image
                        ? `http://127.0.0.1:8001/storage/${product.images[0].image}`
                        : "/placeholder.png"
                    }
                    alt={product?.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{product?.name || "No Name"}</h3>
                      <p className="text-sm text-muted-foreground">
                    {product?.brand?.name || product?.category?.name || "No Brand"}
                  </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={quantity <= 1} // ✅ disable at 1
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">
                            ₹ {(product.price * quantity).toFixed(2)}
                          </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { removeFromCart(item.id); toast.success("Removed from cart"); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">₹ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-success">Free</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button
              className="mt-6 w-full"
              size="lg"
              disabled={items.length === 0}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
