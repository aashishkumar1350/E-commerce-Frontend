import { Navigate } from "react-router-dom";

export default function SellerRoute({ children }: any) {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  console.log("SELLER ROUTE USER:", user); // 🔍 debug

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not seller
  if (user.role !== "seller") {
    return <Navigate to="/become-seller" replace />;
  }

  // ✅ OK
  return children;
}