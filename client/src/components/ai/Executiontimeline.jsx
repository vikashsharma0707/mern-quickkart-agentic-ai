import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { EXECUTION_STEPS, CREW_WORKFLOW } from "./agents.config";

/**
 * activeIndex: index of the step currently running (-1 = none started, length = all done)
 * crew: if true, renders the multi-agent workflow graph instead of the linear timeline
 */
export default function ExecutionTimeline({ activeIndex = 0, crew = false }) {
  const steps = crew ? CREW_WORKFLOW : EXECUTION_STEPS;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 max-w-sm">
      <p className="text-[11px] uppercase tracking-wide text-white/35 mb-2.5">
        {crew ? "Multi-Agent Workflow" : "Agent Thinking"}
      </p>
      <div className="space-y-2">
        {steps.map((step, i) => {
          const done = i < activeIndex;
          const running = i === activeIndex;
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  done ? "bg-emerald-500/20 text-emerald-300" : running ? "bg-indigo-500/20 text-indigo-300" : "bg-white/[0.05] text-white/25"
                }`}
              >
                {done ? <Check size={11} /> : running ? <Loader2 size={11} className="animate-spin" /> : i + 1}
              </span>
              <span className={`text-xs ${done ? "text-white/70" : running ? "text-white" : "text-white/30"}`}>
                {step}
              </span>
              {crew && i < steps.length - 1 && <span className="text-white/15">↓</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}