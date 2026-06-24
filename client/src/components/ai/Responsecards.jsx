import { motion } from "framer-motion";
import {
  ShoppingCart, Star, Eye, TrendingDown, TrendingUp, AlertTriangle, Flame,
  Users, Heart, Gift, Tag, Clock, Sparkles, RotateCcw, BookOpen,
} from "lucide-react";

const wrap = "rounded-xl border border-white/10 bg-white/[0.03] p-3.5";

export function ProductResponseCard({ products = [] }) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
      {products.map((p) => (
        <motion.div key={p._id ?? p.name} whileHover={{ y: -2 }} className={`${wrap} flex gap-3`}>
          <div className="h-14 w-14 rounded-lg bg-white/10 overflow-hidden shrink-0 flex items-center justify-center text-[10px] text-white/30">
            {p.image ? <img src={p.image} alt="" className="h-full w-full object-cover" /> : "IMG"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{p.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-semibold text-emerald-300">₹{p.price}</span>
              {p.discount > 0 && <span className="text-[11px] text-rose-300">-{p.discount}%</span>}
              {p.rating && <span className="flex items-center gap-0.5 text-[11px] text-amber-300"><Star size={10} fill="currentColor" />{p.rating}</span>}
            </div>
            <p className={`text-[11px] mt-0.5 ${p.available === false ? "text-rose-400" : "text-emerald-400"}`}>
              {p.available === false ? "Out of stock" : "In stock"}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <button className="rounded-lg bg-indigo-500/20 text-indigo-300 p-1.5 hover:bg-indigo-500/30"><ShoppingCart size={13} /></button>
            <button className="rounded-lg bg-white/[0.06] text-white/50 p-1.5 hover:bg-white/[0.12]"><Eye size={13} /></button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MealPlanCard({ plan }) {
  if (!plan) return null;
  const meals = [["Breakfast", plan.breakfast], ["Lunch", plan.lunch], ["Dinner", plan.dinner]];
  const macros = [["Calories", plan.calories, "kcal"], ["Protein", plan.protein, "g"], ["Carbs", plan.carbs, "g"], ["Fat", plan.fat, "g"]];
  return (
    <div className={`${wrap} mt-2 space-y-3`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5"><Sparkles size={13} className="text-emerald-300" /> Daily Meal Plan</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {meals.map(([label, val]) => (
          <div key={label} className="rounded-lg bg-white/[0.03] p-2.5">
            <p className="text-[10px] uppercase text-white/35">{label}</p>
            <p className="text-xs text-white/80 mt-0.5">{val || "—"}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {macros.map(([label, val, unit]) => (
          <div key={label} className="text-center rounded-lg bg-white/[0.03] py-2">
            <p className="text-sm font-semibold text-white">{val ?? "—"}{unit}</p>
            <p className="text-[10px] text-white/35">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BudgetCard({ budget }) {
  if (!budget) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><TrendingDown size={13} className="text-emerald-300" /> Budget Analysis</p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center rounded-lg bg-white/[0.03] py-2">
          <p className="text-sm font-semibold text-white/70">₹{budget.currentCost}</p>
          <p className="text-[10px] text-white/35">Current</p>
        </div>
        <div className="text-center rounded-lg bg-emerald-500/10 py-2">
          <p className="text-sm font-semibold text-emerald-300">₹{budget.optimizedCost}</p>
          <p className="text-[10px] text-white/35">Optimized</p>
        </div>
        <div className="text-center rounded-lg bg-white/[0.03] py-2">
          <p className="text-sm font-semibold text-amber-300">₹{budget.savings}</p>
          <p className="text-[10px] text-white/35">You Save</p>
        </div>
      </div>
      {budget.alternatives?.length > 0 && (
        <ul className="space-y-1">
          {budget.alternatives.map((a) => (
            <li key={a._id ?? a.name} className="flex justify-between text-xs text-white/60">
              <span>{a.name}</span><span className="text-white/80">₹{a.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FestivalCard({ festival }) {
  if (!festival) return null;
  const groups = [["Decorations", festival.decorations], ["Groceries", festival.groceries], ["Sweets", festival.sweets], ["Puja Items", festival.pujaItems]];
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><Gift size={13} className="text-fuchsia-300" /> {festival.name ?? "Festival"} Basket</p>
      <div className="grid grid-cols-2 gap-2">
        {groups.map(([label, items]) => (
          <div key={label} className="rounded-lg bg-white/[0.03] p-2.5">
            <p className="text-[10px] uppercase text-white/35 mb-1">{label}</p>
            <p className="text-xs text-white/70">{items?.length ? items.join(", ") : "—"}</p>
          </div>
        ))}
      </div>
      {festival.offers?.length > 0 && (
        <p className="text-[11px] text-amber-300 mt-2 flex items-center gap-1"><Tag size={11} /> {festival.offers.join(" · ")}</p>
      )}
    </div>
  );
}

export function HealthCard({ health }) {
  if (!health) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5"><Heart size={13} className="text-rose-300" /> Health Insights</p>
        {health.score != null && <span className="text-xs font-semibold text-emerald-300">{health.score}/100</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-emerald-500/10 p-2.5">
          <p className="text-[10px] uppercase text-emerald-300/70 mb-1">Safe</p>
          <p className="text-xs text-white/70">{health.safe?.join(", ") || "—"}</p>
        </div>
        <div className="rounded-lg bg-rose-500/10 p-2.5">
          <p className="text-[10px] uppercase text-rose-300/70 mb-1 flex items-center gap-1"><AlertTriangle size={10} /> Avoid</p>
          <p className="text-xs text-white/70">{health.avoid?.join(", ") || "—"}</p>
        </div>
      </div>
      {health.note && <p className="text-[11px] text-white/40 mt-2">{health.note}</p>}
    </div>
  );
}

export function AutoReorderCard({ reorder }) {
  if (!reorder) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><RotateCcw size={13} className="text-cyan-300" /> Auto Reorder</p>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="text-center rounded-lg bg-white/[0.03] py-2">
          <p className="text-sm font-semibold text-white">{reorder.predictedDate ?? "—"}</p>
          <p className="text-[10px] text-white/35">Predicted Date</p>
        </div>
        <div className="text-center rounded-lg bg-white/[0.03] py-2">
          <p className="text-sm font-semibold text-white">{reorder.stockRemaining ?? "—"}</p>
          <p className="text-[10px] text-white/35">Stock Left</p>
        </div>
        <div className="text-center rounded-lg bg-amber-500/10 py-2">
          <p className="text-sm font-semibold text-amber-300">{reorder.urgencyScore ?? "—"}</p>
          <p className="text-[10px] text-white/35">Urgency</p>
        </div>
      </div>
      {reorder.basket?.length > 0 && <p className="text-xs text-white/60">Suggested: {reorder.basket.join(", ")}</p>}
    </div>
  );
}

export function FamilyCartCard({ family }) {
  if (!family) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><Users size={13} className="text-indigo-300" /> Family Cart Merge</p>
      <div className="space-y-1.5 mb-2">
        {family.members?.map((m) => (
          <div key={m.name} className="flex justify-between text-xs text-white/60">
            <span>{m.name}</span><span>{m.items} items · ₹{m.total}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2">
        <span className="text-white/80">Merged Total</span>
        <span className="text-emerald-300">₹{family.mergedTotal} <span className="text-[11px] text-white/35">(save ₹{family.savings})</span></span>
      </div>
    </div>
  );
}

export function PersonalShopperCard({ shopper }) {
  if (!shopper) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><BookOpen size={13} className="text-fuchsia-300" /> Personal Shopper</p>
      {shopper.favoriteBrands?.length > 0 && <p className="text-xs text-white/60 mb-1">Favorite brands: {shopper.favoriteBrands.join(", ")}</p>}
      {shopper.recommendations?.length > 0 && (
        <ul className="text-xs text-white/70 list-disc pl-4 space-y-0.5">
          {shopper.recommendations.map((r) => <li key={r}>{r}</li>)}
        </ul>
      )}
    </div>
  );
}

export function DealNegotiatorCard({ deal }) {
  if (!deal) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><Tag size={13} className="text-amber-300" /> Deal Negotiator</p>
      {deal.stores?.length > 0 && (
        <div className="space-y-1.5">
          {deal.stores.map((s) => (
            <div key={s.name} className={`flex justify-between text-xs px-2 py-1.5 rounded-lg ${s.best ? "bg-emerald-500/10 text-emerald-300" : "text-white/60"}`}>
              <span>{s.name}{s.best ? " ⭐ Best Deal" : ""}</span><span>₹{s.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SeasonalCard({ seasonal }) {
  if (!seasonal) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><Flame size={13} className="text-orange-300" /> Seasonal Picks</p>
      {["trending", "fruits", "vegetables", "offers"].map((k) => seasonal[k]?.length > 0 && (
        <p key={k} className="text-xs text-white/60 mb-1 capitalize">
          <span className="text-white/40">{k}: </span>{seasonal[k].join(", ")}
        </p>
      ))}
    </div>
  );
}

export function AutonomousCard({ auto }) {
  if (!auto) return null;
  return (
    <div className={`${wrap} mt-2`}>
      <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5 mb-2.5"><Clock size={13} className="text-cyan-300" /> Autonomous Mode</p>
      {auto.rules?.length > 0 && <p className="text-xs text-white/60 mb-1">Active rules: {auto.rules.join(", ")}</p>}
      {auto.upcomingOrders?.length > 0 && (
        <ul className="text-xs text-white/70 list-disc pl-4 space-y-0.5">
          {auto.upcomingOrders.map((o) => <li key={o}>{o}</li>)}
        </ul>
      )}
      {auto.logs?.length > 0 && (
        <div className="mt-2 space-y-0.5 text-[11px] text-white/40">
          {auto.logs.slice(0, 4).map((l, i) => <p key={i}>• {l}</p>)}
        </div>
      )}
    </div>
  );
}

/** Renders whichever rich card(s) match the keys present on the payload. */
export function ResponseCards({ p }) {
  if (!p) return null;
  return (
    <div className="space-y-1">
      <ProductResponseCard products={p.products ?? p.alternatives} />
      <MealPlanCard plan={p.mealPlan} />
      <BudgetCard budget={p.budget} />
      <FestivalCard festival={p.festival} />
      <HealthCard health={p.health} />
      <AutoReorderCard reorder={p.reorder} />
      <FamilyCartCard family={p.family} />
      <PersonalShopperCard shopper={p.shopper} />
      <DealNegotiatorCard deal={p.deal} />
      <SeasonalCard seasonal={p.seasonal} />
      <AutonomousCard auto={p.autonomous} />

      {p.predictions?.length > 0 && (
        <div className={`${wrap} mt-2`}>
          <p className="text-xs font-semibold text-white/70 mb-2">Reorder Predictions</p>
          <table className="text-xs w-full">
            <thead className="text-white/35">
              <tr><th className="text-left pb-1">Item</th><th className="pb-1">Predicted</th><th className="pb-1">Stock</th></tr>
            </thead>
            <tbody>
              {p.predictions.slice(0, 6).map((x) => (
                <tr key={x.name} className="border-t border-white/5">
                  <td className="py-1 text-white/70">{x.name}</td>
                  <td className="py-1 text-center text-white/60">{x.predicted}</td>
                  <td className={`py-1 text-center ${x.reorder ? "text-rose-300" : "text-white/60"}`}>{x.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {p.added?.length > 0 && (
        <p className="text-xs text-emerald-300 mt-2 flex items-center gap-1">
          <ShoppingCart size={12} /> Added: {p.added.map((a) => `${a.qty}× ${a.name}`).join(", ")}
        </p>
      )}
      {p.notFound?.length > 0 && (
        <p className="text-xs text-rose-300 mt-1 flex items-center gap-1">
          <AlertTriangle size={12} /> Not found: {p.notFound.join(", ")}
        </p>
      )}
      {p.sources?.length > 0 && (
        <p className="text-[11px] text-white/35 mt-1">📚 Sources: {p.sources.length}</p>
      )}
    </div>
  );
}