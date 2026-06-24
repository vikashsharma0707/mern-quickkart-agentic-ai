import { useRef } from "react";
import { Send, X, Paperclip } from "lucide-react";
import VoiceRecorder from "./VoiceRecorder";
import { AGENTS } from "./agents.config";

export default function ChatInput({
  text, setText, onSend, loading,
  selectedAgent, onClearAgent,
  voice,
}) {
  const taRef = useRef();
  const agent = AGENTS.find((a) => a.k === selectedAgent);

  const grow = (e) => {
    setText(e.target.value);
    const el = taRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(120, el.scrollHeight) + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(text);
    }
  };

  return (
    <div className="border-t border-white/10 bg-white/[0.02] backdrop-blur-xl px-4 sm:px-6 py-3">
      {agent && (
        <div className="flex items-center gap-2 mb-2 text-xs text-indigo-300">
          <span className="rounded-full bg-indigo-500/15 border border-indigo-400/30 px-2.5 py-1">
            Agent: <strong>{agent.t}</strong>
          </span>
          <button onClick={onClearAgent} className="text-white/30 hover:text-white/60">
            <X size={13} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
        <button className="h-9 w-9 shrink-0 rounded-xl flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.05]">
          <Paperclip size={16} />
        </button>

        <textarea
          ref={taRef}
          rows={1}
          value={text}
          onChange={grow}
          onKeyDown={handleKeyDown}
          placeholder="Type or speak your shopping request..."
          className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none py-2 max-h-28"
        />

        <VoiceRecorder
          listening={voice.listening}
          onToggle={voice.listening ? voice.stop : voice.start}
          transcript={voice.text}
          supported={voice.supported}
        />

        <button
          onClick={() => onSend(text)}
          disabled={loading || !text.trim()}
          className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white disabled:opacity-40 shadow-lg shadow-indigo-500/20"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}