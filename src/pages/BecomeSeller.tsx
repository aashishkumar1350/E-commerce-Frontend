import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Store, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "@/lib/api";

export default function BecomeSeller() {
    
    const navigate = useNavigate();

    const handleBecomeSeller = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        try {
            const res = await API.post("/become-seller", {
            store_name: (form.elements.namedItem("store_name") as HTMLInputElement).value,
            phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
            address: (form.elements.namedItem("address") as HTMLInputElement).value,
            description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
            });

            console.log("SUCCESS:", res.data);

            toast.success("You are now a seller 🎉");

            // ✅ update user role in localStorage
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.role = "seller";
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ redirect to seller dashboard
            navigate("/seller");

        } catch (err: any) {
            console.error(err.response?.data);
            toast.error(err.response?.data?.message || "Error");
        }
        };
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <div className="bg-primary/5 py-16 text-center">
        <h1 className="text-4xl font-bold">
          Start Selling on MarketHub 🚀
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Grow your business online and reach thousands of customers.
        </p>

        <Button className="mt-6 px-6 py-2 text-lg">
          Become a Seller
        </Button>
      </div>

      {/* HERO IMAGES */}


      {/* BENEFITS */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Why Sell on MarketHub?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card>
            <CardContent className="p-6 text-center">
              <Store className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-semibold">Grow Your Business</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Reach more customers and increase sales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Deliver products quickly with our logistics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-semibold">Secure Payments</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Get paid safely and on time.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* STEPS */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div>
              <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
              <h3 className="mt-4 font-semibold">1. Register</h3>
              <p className="text-sm text-muted-foreground">
                Create your seller account.
              </p>
            </div>

            <div>
              <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
              <h3 className="mt-4 font-semibold">2. Add Products</h3>
              <p className="text-sm text-muted-foreground">
                Upload your products easily.
              </p>
            </div>

            <div>
              <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
              <h3 className="mt-4 font-semibold">3. Start Selling</h3>
              <p className="text-sm text-muted-foreground">
                Receive orders and earn money.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* PROCESS IMAGES */}
      


      {/* SELLER FORM */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Become a Seller
        </h2>

        <form
            onSubmit={handleBecomeSeller}
            className="max-w-xl mx-auto space-y-4"
            >

          <Input placeholder="Store Name" name="store_name" />

          <Input placeholder="Phone Number" name="phone" />

          <Input placeholder="Business Address" name="address" />

          <Textarea placeholder="Describe your business" name="description" />

          <Button className="w-full">
            Submit Application
          </Button>

        </form>
      </div>

      {/* CTA */}
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">
          Start Selling Today 🚀
        </h2>

        <Button className="mt-6 px-8 py-3 text-lg">
          Become a Seller Now
        </Button>
      </div>

    </div>
  );
}