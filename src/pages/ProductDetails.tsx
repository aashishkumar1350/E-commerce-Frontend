import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "@/lib/api";
import API from "@/lib/api";

import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        console.log("API RESPONSE:", res);

        setProduct(res?.data?.data || res?.data); // ✅ safe fallback
      } catch (err) {
        console.error(err);
      }
    };



    if (id) fetchProduct();
  }, [id]);


  const handleAddToCart = async () => {
  try {
    const variantId = product.variants?.[0]?.id;

    if (!variantId) {
      alert("No variant available");
      return;
    }

    await addToCart({
      ...product,
      variant_id: variantId,
    });

    toast.success(`Added to Cart`)

  } catch (err) {
    console.error(err);
    alert("Error ❌");
  }
};
  if (!product) return <div className="p-10 text-center">Loading...</div>;


  return (
    <div
      className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* LEFT: PRODUCT IMAGES */}
      <div>
        {/* MAIN IMAGE */}
        <img
          src={
            product.images?.[activeImage]?.image
              ? `http://127.0.0.1:8001/storage/${product.images[activeImage].image}`
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-[600px] object-cover rounded-xl border"
        />

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-4">
          {product.images?.map((img: any, index: number) => (
            <img
              key={index}
              src={`http://127.0.0.1:8001/storage/${img.image}`}
              onClick={() => setActiveImage(index)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${activeImage === index ? "border-primary" : ""
                }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

        {/* Category */}
        <p className="text-sm text-muted-foreground mb-2">
          Category: {product.category?.name}
        </p>

        {/* Brand */}
        <p className="text-sm text-muted-foreground mb-4">
          Brand: {product.brand?.name}
        </p>

        {/* Price */}
        <p className="text-2xl text-primary font-semibold mb-4">
          ₹ {product.price}
        </p>

        {/* Stock */}
        <p className="text-sm mb-4">
          Stock:{" "}
          <span className="font-medium text-green-600">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
        {/* Description */}
        <p className="text-gray-600 mb-6">
          {product.description || "No description available"}
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={handleAddToCart} className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90">
            Add to Cart
          </button>

          <button className="border px-6 py-3 rounded-lg">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}