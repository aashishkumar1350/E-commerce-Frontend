import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { ArrowRight, Truck, Shield, Headphones, Tag, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";


export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();

        const formatted = (res?.data?.data || []);

        setProducts(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Banner Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over 2499" },
            { icon: Shield, label: "Secure Payment", desc: "100% protected" },
            { icon: Headphones, label: "24/7 Support", desc: "Ready to help" },
            { icon: Tag, label: "Best Prices", desc: "Guaranteed" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {/* <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.slice(0, 5).map((cat) => (
            <Link key={cat} to="/products">
              <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex flex-col items-center justify-center p-5 text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{cat}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section> */}

      {/* ✅ Latest Products */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Become a Seller on MarketHub
          </h2>
          <p className="max-w-md text-primary-foreground/80">
            Join thousands of sellers and reach millions of customers. Start selling today!
          </p>
          <Link to="/seller">
            <Button variant="secondary" size="lg" className="gap-2">
              Start Selling <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
