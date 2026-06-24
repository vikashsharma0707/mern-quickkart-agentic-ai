import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

/**
 * KpiCard
 * props:
 *  - label: string
 *  - value: string | number
 *  - delta: number (signed % change)
 *  - icon: lucide icon component
 *  - tint: "indigo" | "emerald" | "amber" | "rose" | "cyan" | "fuchsia"
 *  - spark: number[] (sparkline series)
 */
const tints = {
  indigo: { from: "from-indigo-500/20", glow: "shadow-indigo-500/20", text: "text-indigo-300", bar: "#818cf8" },
  emerald: { from: "from-emerald-500/20", glow: "shadow-emerald-500/20", text: "text-emerald-300", bar: "#34d399" },
  amber: { from: "from-amber-500/20", glow: "shadow-amber-500/20", text: "text-amber-300", bar: "#fbbf24" },
  rose: { from: "from-rose-500/20", glow: "shadow-rose-500/20", text: "text-rose-300", bar: "#fb7185" },
  cyan: { from: "from-cyan-500/20", glow: "shadow-cyan-500/20", text: "text-cyan-300", bar: "#22d3ee" },
  fuchsia: { from: "from-fuchsia-500/20", glow: "shadow-fuchsia-500/20", text: "text-fuchsia-300", bar: "#e879f9" },
};

export default function KpiCard({ label, value, delta = 0, icon: Icon, tint = "indigo", spark = [] }) {
  const t = tints[tint] || tints.indigo;
  const up = delta >= 0;
  const sparkData = (spark.length ? spark : [3, 5, 4, 6, 5, 8, 7]).map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-lg ${t.glow} hover:border-white/20 transition-colors`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${t.from} to-transparent pointer-events-none`} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/50 font-medium">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white tracking-tight">{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 bg-white/[0.06] border border-white/10 ${t.text}`}>
          {Icon ? <Icon size={20} strokeWidth={1.75} /> : null}
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-400" : "text-rose-400"}`}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(delta)}%
        </span>
        <div className="h-8 w-24 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.bar} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={t.bar} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={t.bar} strokeWidth={1.5} fill={`url(#spark-${label})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}