import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Tag, Ticket, ListChecks, Settings2, LayoutDashboard } from "lucide-react";

/**
 * Sidebar
 * Quick Actions are real routes (NavLink), not dead buttons.
 * Adjust the `to` paths below to match your actual admin routes.
 */
const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
];

const quickActions = [
  { label: "Add Product", to: "/admin/products", icon: Plus, gradient: "from-indigo-500 to-violet-500" },
  { label: "Add Category", to: "/admin/categories/new", icon: Tag, gradient: "from-fuchsia-500 to-pink-500" },
  { label: "Create Coupon", to: "/admin/coupons/new", icon: Ticket, gradient: "from-emerald-500 to-teal-500" },
  { label: "Manage Orders", to: "/admin/orders", icon: ListChecks, gradient: "from-amber-500 to-orange-500" },
  { label: "AI Settings", to: "/admin/ai-settings", icon: Settings2, gradient: "from-cyan-500 to-blue-500" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl min-h-screen p-4">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
        <span className="font-semibold text-white">Admin Panel</span>
      </div>

      <nav className="space-y-1 mb-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-white/[0.08] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <p className="px-2 text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">Quick Actions</p>
      <div className="flex flex-col gap-2.5">
        {quickActions.map((a) => (
          <NavLink key={a.to} to={a.to}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2.5 rounded-xl bg-gradient-to-r ${a.gradient} px-3.5 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 ${
                  isActive ? "ring-2 ring-white/70" : ""
                }`}
              >
                <a.icon size={16} />
                {a.label}
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}