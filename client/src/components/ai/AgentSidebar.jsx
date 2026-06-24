import { motion } from "framer-motion";
import {
  MessageSquareText, ShoppingBag, Users2, ClipboardList, Salad, PiggyBank,
  Users, Send, Leaf, Handshake, HeartPulse, RotateCcw, Cog, Siren, PartyPopper,
} from "lucide-react";
import { AGENTS, GROUPS } from "./agents.config";

const ICONS = {
  MessageSquareText, ShoppingBag, Users2, ClipboardList, Salad, PiggyBank,
  Users, Send, Leaf, Handshake, HeartPulse, RotateCcw, Cog, Siren, PartyPopper,
};

const STATUS_DOT = {
  online: "bg-emerald-400",
  working: "bg-amber-400",
  offline: "bg-white/25",
};

function AgentCard({ agent, isSelected, onSelect, runtime }) {
  const Icon = ICONS[agent.icon];
  const status = runtime?.status ?? "online";
  return (
    <motion.button
      onClick={() => onSelect(agent)}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left rounded-xl border p-2.5 transition-colors ${
        isSelected
          ? "border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.3)]"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`relative rounded-lg p-1.5 bg-white/[0.06] border border-white/10 ${isSelected ? "text-indigo-300" : "text-white/50"}`}>
          {Icon && <Icon size={15} strokeWidth={1.75} />}
          <span className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${STATUS_DOT[status]} ${status === "online" ? "" : ""}`}>
            {status === "online" && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-white/85 truncate">{agent.t}</p>
          <p className="text-[10px] text-white/35 truncate">{runtime?.lastRun ?? "Ready"}</p>
        </div>
        {runtime?.successRate != null && (
          <span className="text-[10px] text-emerald-300/80 shrink-0">{runtime.successRate}%</span>
        )}
      </div>
    </motion.button>
  );
}

export default function AgentSidebar({ selectedAgent, onSelectAgent, agentRuntime = {} }) {
  return (
    <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center gap-2 px-1 mb-5">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
        <div>
          <p className="font-semibold text-white text-sm leading-none">AI Shopping</p>
          <p className="text-[11px] text-white/35">15 agents online</p>
        </div>
      </div>

      <div className="space-y-5">
        {GROUPS.map((group) => {
          const items = AGENTS.filter((a) => a.group === group);
          if (!items.length) return null;
          return (
            <div key={group}>
              <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2">{group}</p>
              <div className="space-y-1.5">
                {items.map((a) => (
                  <AgentCard
                    key={a.k}
                    agent={a}
                    isSelected={selectedAgent === a.k}
                    onSelect={onSelectAgent}
                    runtime={agentRuntime[a.k]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}