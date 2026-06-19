import { useEffect, useRef, useState } from "react";
export default function useVoiceInput() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-IN"; rec.interimResults = false; rec.continuous = false;
    rec.onresult = (e) => setText(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    ref.current = rec;
  }, []);
  const start = () => { if (ref.current) { setText(""); setListening(true); ref.current.start(); } };
  const stop = () => { if (ref.current) ref.current.stop(); };
  return { listening, text, start, stop, supported: !!ref.current };
}
