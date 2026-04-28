export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviews: number;
  stock: number;
  createdAt: string;
  badge?: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalProducts: number;
  totalSales: number;
  revenue: number;
  status: "active" | "pending" | "suspended";
  joinedAt: string;
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  buyerName: string;
  buyerEmail: string;
  shippingAddress: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Beauty & Health",
  "Automotive",
  "Grocery",
  "Office Supplies",
];

export const sellers: Seller[] = [
  { id: "s1", name: "TechVault", email: "tech@vault.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TV", totalProducts: 12, totalSales: 340, revenue: 28500, status: "active", joinedAt: "2024-01-15" },
  { id: "s2", name: "StyleHub", email: "hello@stylehub.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SH", totalProducts: 25, totalSales: 520, revenue: 41200, status: "active", joinedAt: "2024-02-20" },
  { id: "s3", name: "HomeNest", email: "info@homenest.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HN", totalProducts: 18, totalSales: 210, revenue: 15800, status: "active", joinedAt: "2024-03-10" },
  { id: "s4", name: "FitGear", email: "sales@fitgear.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=FG", totalProducts: 8, totalSales: 150, revenue: 12400, status: "pending", joinedAt: "2024-06-01" },
  { id: "s5", name: "BookWorm", email: "read@bookworm.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BW", totalProducts: 30, totalSales: 410, revenue: 18700, status: "active", joinedAt: "2024-01-05" },
  { id: "s6", name: "GlowUp", email: "beauty@glowup.com", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GU", totalProducts: 15, totalSales: 280, revenue: 22100, status: "active", joinedAt: "2024-04-12" },
];

export const products: Product[] = [
  // Electronics
  { id: "p1", name: "Wireless Noise-Cancelling Headphones", price: 129.99, originalPrice: 179.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", category: "Electronics", description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.", sellerId: "s1", sellerName: "TechVault", rating: 4.7, reviews: 234, stock: 45, createdAt: "2024-05-01", badge: "Best Seller" },
  { id: "p2", name: "Smart Watch Pro", price: 249.99, originalPrice: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", category: "Electronics", description: "Feature-rich smartwatch with health tracking and GPS.", sellerId: "s1", sellerName: "TechVault", rating: 4.5, reviews: 189, stock: 30, createdAt: "2024-05-15", badge: "New" },
  { id: "p8", name: "Portable Bluetooth Speaker", price: 59.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", category: "Electronics", description: "Waterproof portable speaker with 360° sound.", sellerId: "s1", sellerName: "TechVault", rating: 4.6, reviews: 203, stock: 55, createdAt: "2024-07-15" },
  { id: "p9", name: "4K Ultra HD Webcam", price: 89.99, image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop", category: "Electronics", description: "Crystal clear 4K webcam with auto-focus and noise-canceling mic.", sellerId: "s1", sellerName: "TechVault", rating: 4.4, reviews: 112, stock: 38, createdAt: "2024-08-01" },
  { id: "p10", name: "Wireless Charging Pad", price: 29.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=400&h=400&fit=crop", category: "Electronics", description: "Fast wireless charging pad compatible with all Qi-enabled devices.", sellerId: "s1", sellerName: "TechVault", rating: 4.3, reviews: 340, stock: 100, createdAt: "2024-06-20", badge: "Deal" },
  { id: "p11", name: "Mechanical Gaming Keyboard", price: 119.99, originalPrice: 149.99, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop", category: "Electronics", description: "RGB backlit mechanical keyboard with Cherry MX switches.", sellerId: "s1", sellerName: "TechVault", rating: 4.8, reviews: 567, stock: 22, createdAt: "2024-04-15", badge: "Top Rated" },
  // Fashion
  { id: "p3", name: "Leather Crossbody Bag", price: 79.99, originalPrice: 120.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", category: "Fashion", description: "Elegant genuine leather crossbody bag with adjustable strap.", sellerId: "s2", sellerName: "StyleHub", rating: 4.8, reviews: 312, stock: 60, createdAt: "2024-04-10", badge: "Best Seller" },
  { id: "p4", name: "Classic Denim Jacket", price: 89.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop", category: "Fashion", description: "Timeless denim jacket with modern fit.", sellerId: "s2", sellerName: "StyleHub", rating: 4.6, reviews: 178, stock: 40, createdAt: "2024-04-20" },
  { id: "p12", name: "Premium Sunglasses", price: 64.99, originalPrice: 89.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", category: "Fashion", description: "UV400 polarized sunglasses with lightweight titanium frame.", sellerId: "s2", sellerName: "StyleHub", rating: 4.5, reviews: 220, stock: 75, createdAt: "2024-05-10" },
  { id: "p13", name: "Canvas Sneakers", price: 49.99, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop", category: "Fashion", description: "Classic canvas sneakers with cushioned insole for all-day comfort.", sellerId: "s2", sellerName: "StyleHub", rating: 4.4, reviews: 445, stock: 90, createdAt: "2024-03-01" },
  { id: "p14", name: "Minimalist Wristwatch", price: 159.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", category: "Fashion", description: "Elegant minimalist watch with sapphire crystal and leather strap.", sellerId: "s2", sellerName: "StyleHub", rating: 4.7, reviews: 156, stock: 20, createdAt: "2024-06-05", badge: "Premium" },
  // Home & Garden
  { id: "p5", name: "Minimalist Desk Lamp", price: 49.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop", category: "Home & Garden", description: "Sleek LED desk lamp with adjustable brightness.", sellerId: "s3", sellerName: "HomeNest", rating: 4.4, reviews: 95, stock: 70, createdAt: "2024-06-01" },
  { id: "p6", name: "Ceramic Plant Pot Set", price: 34.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", category: "Home & Garden", description: "Set of 3 handcrafted ceramic pots for indoor plants.", sellerId: "s3", sellerName: "HomeNest", rating: 4.9, reviews: 267, stock: 25, createdAt: "2024-06-10", badge: "Top Rated" },
  { id: "p15", name: "Scented Candle Collection", price: 24.99, image: "https://images.unsplash.com/photo-1602607693606-92b49e5ee400?w=400&h=400&fit=crop", category: "Home & Garden", description: "Set of 4 luxury scented soy candles in elegant glass jars.", sellerId: "s3", sellerName: "HomeNest", rating: 4.6, reviews: 189, stock: 50, createdAt: "2024-07-01" },
  { id: "p16", name: "Throw Blanket - Knitted", price: 39.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=400&h=400&fit=crop", category: "Home & Garden", description: "Cozy knitted throw blanket in neutral tones, perfect for any room.", sellerId: "s3", sellerName: "HomeNest", rating: 4.7, reviews: 134, stock: 35, createdAt: "2024-05-20", badge: "Deal" },
  // Sports & Outdoors
  { id: "p7", name: "Yoga Mat Premium", price: 39.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", category: "Sports & Outdoors", description: "Extra thick non-slip yoga mat with carrying strap.", sellerId: "s4", sellerName: "FitGear", rating: 4.3, reviews: 145, stock: 80, createdAt: "2024-07-01" },
  { id: "p17", name: "Resistance Bands Set", price: 19.99, originalPrice: 34.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop", category: "Sports & Outdoors", description: "5-piece resistance band set for home workouts with door anchor.", sellerId: "s4", sellerName: "FitGear", rating: 4.5, reviews: 320, stock: 120, createdAt: "2024-06-15", badge: "Best Seller" },
  { id: "p18", name: "Insulated Water Bottle", price: 27.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", category: "Sports & Outdoors", description: "32oz double-wall vacuum insulated stainless steel water bottle.", sellerId: "s4", sellerName: "FitGear", rating: 4.6, reviews: 512, stock: 95, createdAt: "2024-04-01" },
  // Books
  { id: "p19", name: "The Art of Thinking Clearly", price: 14.99, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop", category: "Books", description: "Bestselling guide to recognizing and avoiding common thinking errors.", sellerId: "s5", sellerName: "BookWorm", rating: 4.4, reviews: 890, stock: 200, createdAt: "2024-01-10" },
  { id: "p20", name: "JavaScript: The Good Parts", price: 29.99, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop", category: "Books", description: "Essential reading for every JavaScript developer.", sellerId: "s5", sellerName: "BookWorm", rating: 4.7, reviews: 1205, stock: 150, createdAt: "2024-02-20", badge: "Top Rated" },
  // Beauty & Health
  { id: "p21", name: "Vitamin C Serum", price: 18.99, originalPrice: 28.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", category: "Beauty & Health", description: "Brightening vitamin C serum with hyaluronic acid for glowing skin.", sellerId: "s6", sellerName: "GlowUp", rating: 4.6, reviews: 670, stock: 85, createdAt: "2024-05-01", badge: "Best Seller" },
  { id: "p22", name: "Essential Oil Diffuser", price: 34.99, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", category: "Beauty & Health", description: "Ultrasonic cool mist diffuser with LED mood lighting.", sellerId: "s6", sellerName: "GlowUp", rating: 4.5, reviews: 245, stock: 42, createdAt: "2024-06-10" },
  { id: "p23", name: "Jade Roller & Gua Sha Set", price: 15.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop", category: "Beauty & Health", description: "Natural jade stone roller and gua sha set for facial massage.", sellerId: "s6", sellerName: "GlowUp", rating: 4.3, reviews: 389, stock: 60, createdAt: "2024-07-20", badge: "Deal" },
  { id: "p24", name: "Stainless Steel Tumbler", price: 22.99, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop", category: "Home & Garden", description: "Insulated tumbler with lid and straw, keeps drinks cold for 24 hours.", sellerId: "s3", sellerName: "HomeNest", rating: 4.5, reviews: 433, stock: 110, createdAt: "2024-03-15" },
];

export const orders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { product: products[0], quantity: 1, price: 129.99 },
      { product: products[2], quantity: 2, price: 59.99 },
    ],
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    shippingAddress: "123 Main St, New York, NY 10001",
    status: "delivered",
    totalAmount: 249.97,
    createdAt: "2024-07-20",
    updatedAt: "2024-07-25",
    trackingNumber: "TRK-98765",
  },
  {
    id: "ORD-002",
    items: [
      { product: products[1], quantity: 1, price: 249.99 },
    ],
    buyerName: "Jane Smith",
    buyerEmail: "jane@example.com",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    status: "shipped",
    totalAmount: 249.99,
    createdAt: "2024-08-01",
    updatedAt: "2024-08-03",
    trackingNumber: "TRK-12345",
  },
  {
    id: "ORD-003",
    items: [
      { product: products[6], quantity: 1, price: 79.99 },
      { product: products[7], quantity: 1, price: 89.99 },
    ],
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    shippingAddress: "123 Main St, New York, NY 10001",
    status: "processing",
    totalAmount: 169.98,
    createdAt: "2024-08-10",
    updatedAt: "2024-08-10",
  },
  {
    id: "ORD-004",
    items: [
      { product: products[11], quantity: 2, price: 49.99 },
    ],
    buyerName: "Alice Johnson",
    buyerEmail: "alice@example.com",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    status: "confirmed",
    totalAmount: 99.98,
    createdAt: "2024-08-12",
    updatedAt: "2024-08-12",
  },
  {
    id: "ORD-005",
    items: [
      { product: products[16], quantity: 1, price: 39.99 },
    ],
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    shippingAddress: "123 Main St, New York, NY 10001",
    status: "pending",
    totalAmount: 39.99,
    createdAt: "2024-08-15",
    updatedAt: "2024-08-15",
  },
];
