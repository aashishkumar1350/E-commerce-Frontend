import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AccountLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "My Orders", path: "/account/orders" },
    { name: "Wishlist", path: "/account/wishlist" },
    { name: "Profile", path: "/account/profile" },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl shadow p-4 h-fit">
          {menu.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}