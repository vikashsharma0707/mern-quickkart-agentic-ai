const styles = {
  Delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Processing: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
};

export default function StatusBadge({ status }) {
  const cls = styles[status] || "bg-white/10 text-white/60 border-white/20";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}