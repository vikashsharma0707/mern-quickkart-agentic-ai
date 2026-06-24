import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShoppingCart, PackageCheck, IndianRupee, Bot, Timer, Target } from "lucide-react";

function AnimatedNumber({ value = 0, prefix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const end = value;
    const duration = 600;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setDisplay(start + (end - start) * p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{prefix}{display.toFixed(decimals)}</>;
}

const metrics = [
  { key: "requestsToday", label: "AI Requests Today", icon: ShoppingCart, tint: "indigo" },
  { key: "productsSuggested", label: "Products Suggested", icon: Sparkles, tint: "fuchsia" },
  { key: "ordersCreated", label: "Orders Created", icon: PackageCheck, tint: "emerald" },
  { key: "moneySaved", label: "Money Saved", icon: IndianRupee, tint: "amber", prefix: "₹" },
  { key: "activeAgents", label: "Active Agents", icon: Bot, tint: "cyan" },
  { key: "avgResponseTime", label: "Avg Response", icon: Timer, tint: "indigo", suffix: "s" },
  { key: "successRate", label: "Success Rate", icon: Target, tint: "emerald", suffix: "%" },
];

const tintMap = {
  indigo: "from-indigo-500/20 text-indigo-300",
  fuchsia: "from-fuchsia-500/20 text-fuchsia-300",
  emerald: "from-emerald-500/20 text-emerald-300",
  amber: "from-amber-500/20 text-amber-300",
  cyan: "from-cyan-500/20 text-cyan-300",
};

export default function MetricsBar({ stats = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
      {metrics.map((m, i) => {
        const tint = tintMap[m.tint];
        const [grad, text] = tint.split(" ");
        const value = stats[m.key] ?? 0;
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${grad} to-transparent pointer-events-none`} />
            <div className="relative flex items-center gap-2">
              <m.icon size={14} className={text} />
              <p className="text-[10px] uppercase tracking-wide text-white/45 leading-tight">{m.label}</p>
            </div>
            <p className="relative mt-1.5 text-lg font-semibold text-white">
              <AnimatedNumber value={value} prefix={m.prefix ?? ""} decimals={m.key === "avgResponseTime" ? 1 : 0} />
              {m.suffix ?? ""}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}