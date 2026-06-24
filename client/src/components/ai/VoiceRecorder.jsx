import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square } from "lucide-react";

export default function VoiceRecorder({ listening, onToggle, transcript, supported }) {
  if (!supported) return null;
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.92 }}
        className={`relative h-10 w-10 rounded-xl flex items-center justify-center border transition-colors ${
          listening ? "bg-rose-500/20 border-rose-400/40 text-rose-300" : "bg-white/[0.04] border-white/10 text-white/50 hover:text-white/80"
        }`}
      >
        {listening && (
          <>
            <span className="absolute inset-0 rounded-xl bg-rose-400/30 animate-ping" />
            <span className="absolute -inset-1 flex items-center justify-center gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 bg-rose-300 rounded-full"
                  animate={{ height: [4, 14, 4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          </>
        )}
        {listening ? <Square size={15} /> : <Mic size={17} />}
      </motion.button>

      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 rounded-lg border border-white/10 bg-[#11131c] px-3 py-2 text-center shadow-lg"
          >
            <p className="text-[11px] text-rose-300 font-medium">Listening...</p>
            <p className="text-xs text-white/60 truncate mt-0.5">{transcript || "Speak now..."}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}