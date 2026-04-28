import { useState } from "react";
import { registerAPI } from "@/lib/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // 🔥 Password Strength
  const getPasswordStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[A-Z])(?=.*[0-9])/)) return "Strong";
    return "Medium";
  };

  // 🔥 Validation
  const validate = () => {
    let newErrors: any = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await registerAPI({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors({ api: "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8"
      >
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your{" "}
          <span className="text-primary font-extrabold">
            Kapdewala
          </span>{" "}
          account
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg border px-4 py-2 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 👁 Toggle */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer text-sm text-muted-foreground"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Strength */}
          {password && (
            <p className="text-sm mt-1">
              Strength:{" "}
              <span
                className={
                  getPasswordStrength() === "Strong"
                    ? "text-green-600"
                    : getPasswordStrength() === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {getPasswordStrength()}
              </span>
            </p>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border px-4 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {errors.api}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm mt-4 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}