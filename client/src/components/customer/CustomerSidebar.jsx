import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";


const menuItems = [
  { label: "My Profile", icon: "👤", path: "/profile" },
  { label: "QuickKart Plus Zone", icon: "⭐", path: "/plus-zone" },
  { label: "Orders", icon: "📦", path: "/orders" },
  { label: "Wishlist", icon: "❤️", path: "/wishlist" },
];

export default function CustomerSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-700">QuickKart AI</h2>
          <button onClick={onClose} className="text-3xl text-gray-500">✕</button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-medium transition-all
                  ${location.pathname === item.path
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-100 text-gray-700"}`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className="w-full py-4 text-red-600 font-medium border border-red-200 rounded-2xl hover:bg-red-50 transition"
          >
            Logout
          </button>

         
        </div>
      </div>
    </>
  );
}