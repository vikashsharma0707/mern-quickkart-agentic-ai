export default function Stat({ label, value, hint, icon: Icon, tint = "text-indigo-300" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-3">
      {Icon && (
        <div className={`rounded-lg p-2 bg-white/[0.06] border border-white/10 ${tint}`}>
          <Icon size={18} strokeWidth={1.75} />
        </div>
      )}
      <div>
        <p className="text-xs text-white/45">{label}</p>
        <p className="text-lg font-semibold text-white leading-tight">{value}</p>
        {hint && <p className="text-[11px] text-white/35 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}