import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SUGGESTED_PROMPTS } from "./agents.config";

export default function EmptyState({ onPick }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20"
      >
        <Sparkles size={24} className="text-white" />
      </motion.div>
      <h2 className="text-lg font-semibold text-white">How can I help with your shopping today?</h2>
      <p className="text-sm text-white/40 mt-1 mb-6">Hindi · English · Hinglish — pick a prompt or type below</p>

      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {SUGGESTED_PROMPTS.map((s, i) => (
          <motion.button
            key={s.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => onPick(s.text)}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            {s.emoji} {s.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}