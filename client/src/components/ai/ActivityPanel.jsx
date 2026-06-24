import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Activity } from "lucide-react";
import { socket } from "../../api/socket";

const FALLBACK_INSIGHTS = [
  "You usually buy milk every 6 days",
  "Rice prices dropped 8%",
  "Save ₹250 by switching brands",
  "Protein intake below target",
  "Festival season demand increasing",
];

export default function ActivityPanel({ insights = [] }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const onActivity = (payload) => {
      setFeed((f) => [{ id: Date.now(), text: payload.text ?? payload.message ?? String(payload), time: "now" }, ...f].slice(0, 30));
    };
    socket.on("ai:activity", onActivity);
    return () => socket.off("ai:activity", onActivity);
  }, []);

  const list = insights.length ? insights : FALLBACK_INSIGHTS;
  return (
    <aside className="hidden xl:flex xl:flex-col w-80 shrink-0 border-l border-white/10 bg-white/[0.02] backdrop-blur-xl min-h-screen p-4 space-y-6 overflow-y-auto">
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">
          <Lightbulb size={13} className="text-amber-300" /> AI Insights
        </p>
        <div className="space-y-2">
          {list.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/70"
            >
              💡 {insight}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">
          <Activity size={13} className="text-emerald-300" /> Live Activity
        </p>
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {feed.length ? feed.map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 text-xs"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div>
                  <p className="text-white/70">{a.text}</p>
                  <p className="text-[10px] text-white/30">{a.time}</p>
                </div>
              </motion.div>
            )) : (
              <p className="text-xs text-white/30">Waiting for agent activity…</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}