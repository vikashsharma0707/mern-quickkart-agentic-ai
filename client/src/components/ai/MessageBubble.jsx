import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Bot } from "lucide-react";
import { ResponseCards } from "./ResponseCards";

export default function MessageBubble({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const isUser = message.role === "user";

  const copy = () => {
    navigator.clipboard?.writeText(message.role === "user" ? message.text : message.payload?.reply ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`group max-w-[85%] ${isUser ? "" : "w-full"}`}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center">
              <Bot size={11} className="text-white" />
            </span>
            <span className="text-[11px] font-medium text-white/40 uppercase tracking-wide">
              {message.payload?.agent ?? "Assistant"}
            </span>
          </div>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 text-sm ${
            isUser
              ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20"
              : "bg-white/[0.04] border border-white/10 backdrop-blur-xl text-white/85"
          }`}
        >
          {isUser ? (
            message.text
          ) : (
            <div className="space-y-2">
              <div className="prose-sm prose-invert max-w-none [&_p]:my-1 [&_code]:text-indigo-300 [&_pre]:bg-black/30 [&_pre]:rounded-lg [&_pre]:p-2.5 [&_pre]:overflow-x-auto">
                <ReactMarkdown>{message.payload?.reply ?? ""}</ReactMarkdown>
              </div>
              <ResponseCards p={message.payload} />
            </div>
          )}
        </div>

        <div className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? "justify-end" : ""}`}>
          <span className="text-[10px] text-white/25 mr-1">
            {new Date(message.time ?? Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button onClick={copy} className="text-white/30 hover:text-white/70 p-1 rounded">
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
          {!isUser && (
            <>
              <button onClick={() => onRegenerate?.(message)} className="text-white/30 hover:text-white/70 p-1 rounded">
                <RotateCcw size={12} />
              </button>
              <button
                onClick={() => setFeedback("up")}
                className={`p-1 rounded ${feedback === "up" ? "text-emerald-400" : "text-white/30 hover:text-white/70"}`}
              >
                <ThumbsUp size={12} />
              </button>
              <button
                onClick={() => setFeedback("down")}
                className={`p-1 rounded ${feedback === "down" ? "text-rose-400" : "text-white/30 hover:text-white/70"}`}
              >
                <ThumbsDown size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}