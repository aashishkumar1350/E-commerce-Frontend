import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, Home, Package, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/about", label: "About Us", icon: Package },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/products?search=${query}`);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-8 items-center justify-between px-4 text-xs">
          <span>Free shipping on orders over Rs.2499!</span>
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/seller" className="hover:underline">Sell on MarketHub</Link>
            <Link to="/admin" className="hover:underline">Admin</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MarketHub</span>
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-10 pl-10 pr-20"
            />
            <Button
  size="sm"
  onClick={handleSearch}
  className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
>
  Search
</Button>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button variant={isActive(link.to) ? "default" : "ghost"} size="sm" className="gap-1.5 text-xs">
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">

            {user ? (
              <Button
                size="sm"
                variant="outline"
                className="hidden md:flex"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
            )}
          </div>
          <Link to="/wishlist" className="relative">

            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-xs text-destructive-foreground">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-accent-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t p-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(link.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="my-2 border-t" />
            <Link to="/seller" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">Sell on MarketHub</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
