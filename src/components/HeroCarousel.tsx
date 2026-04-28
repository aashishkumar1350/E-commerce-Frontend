import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    title: "Up to 50% Off Clothing",
    subtitle: "Premium fashion at unbeatable prices — limited time only",
    cta: "View Deals",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=800&fit=crop",
  },
  {
    title: "New Summer Collection",
    subtitle: "Fresh styles just dropped — shop now",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Trending Fashion Deals",
    subtitle: "Upgrade your wardrobe today",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=800&fit=crop",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % banners.length),
    []
  );

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + banners.length) % banners.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <span className="mb-4 rounded-full border border-white/30 px-4 py-1 text-sm">
          HOT DEALS
        </span>

        <h1 className="text-4xl font-bold md:text-6xl">
          {banner.title}
        </h1>

        <p className="mt-4 max-w-xl text-lg text-white/80">
          {banner.subtitle}
        </p>

        <Link to="/products">
          <Button size="lg" className="mt-6 bg-white text-black hover:bg-gray-200">
            {banner.cta}
          </Button>
        </Link>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5 text-black" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}