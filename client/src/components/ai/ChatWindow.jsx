import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";
import ExecutionTimeline from "./Executiontimeline";

export default function ChatWindow({ history, loading, isCrew, onPickPrompt, onRegenerate }) {
  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
      {!history.length && !loading && <EmptyState onPick={onPickPrompt} />}

      {history.map((m, i) => (
        <MessageBubble key={i} message={m} onRegenerate={onRegenerate} />
      ))}

      {loading && (
        <div className="flex justify-start">
          <ExecutionTimeline activeIndex={2} crew={isCrew} />
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}