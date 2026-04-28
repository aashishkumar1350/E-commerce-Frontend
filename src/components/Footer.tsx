import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import Newsletter from "@/pages/Newsletter";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-card">

      <Newsletter />
      {/* Main footer */}
      <div className="container mx-auto grid gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">MarketHub</span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Your one-stop marketplace for quality products from trusted sellers worldwide.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "All Products" },
              { to: "/orders", label: "My Orders" },
              { to: "/wishlist", label: "Wishlist" },
              { to: "/cart", label: "Cart" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground transition-colors hover:text-primary">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-foreground">Customer Service</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="about" className="hover:text-primary">About us</a></li>
            <li><a href="refund-policy" className="hover:text-primary">Returns & Refunds</a></li>
            <li><a href="shipping-policy" className="hover:text-primary">Shipping Info</a></li>
            <li><a href="terms" className="hover:text-primary">Terms & Conditions</a></li>
            <li><a href="privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-foreground">Contact Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              123 Market Street, San Francisco, CA 94105
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              support@markethub.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2026 MarketHub. All rights reserved.</p>
          <div className="flex gap-4">
            <span>We accept: Visa, Mastercard, PayPal, UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
