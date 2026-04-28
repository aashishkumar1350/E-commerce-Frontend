import { useState } from "react";
import { loginAPI } from "@/lib/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginAPI({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const user = res.data.user;

      if (user.role === "seller") {
        navigate("/seller");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      
      {/* FORM (IMPORTANT) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8"
      >
        
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to{" "}
          <span className="text-primary font-extrabold">
            Kapdewala
          </span>
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-border px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-border px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-primary hover:opacity-90 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm mt-4 text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}