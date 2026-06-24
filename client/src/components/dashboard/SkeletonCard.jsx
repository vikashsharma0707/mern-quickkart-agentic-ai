export function SkeletonCard({ className = "h-28" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

export function EmptyState({ title = "No analytics available yet", subtitle = "Data will appear here once activity starts." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="mb-4 opacity-70">
        <rect x="10" y="40" width="14" height="30" rx="3" fill="#818cf8" opacity="0.4" />
        <rect x="32" y="25" width="14" height="45" rx="3" fill="#a78bfa" opacity="0.5" />
        <rect x="54" y="10" width="14" height="60" rx="3" fill="#e879f9" opacity="0.6" />
        <rect x="76" y="30" width="14" height="40" rx="3" fill="#a78bfa" opacity="0.5" />
        <rect x="98" y="48" width="14" height="22" rx="3" fill="#818cf8" opacity="0.4" />
      </svg>
      <p className="text-sm font-medium text-white/70">{title}</p>
      <p className="text-xs text-white/35 mt-1">{subtitle}</p>
    </div>
  );
}