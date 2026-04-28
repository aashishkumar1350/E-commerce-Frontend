import { useState } from "react";
import API from "@/lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/newsletter/subscribe", {
        email,
      });

      alert(res.data.message);
      setEmail("");

    } catch (err: any) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary/5 py-6 px-4 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">
          Subscribe to our Newsletter
        </h3>
        <p className="text-sm text-muted-foreground">
          Get latest deals in your inbox
        </p>
      </div>

      <div className="flex gap-2 mt-3 md:mt-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
}