import { useState } from "react";
import api from "../../api/axios";
export default function Forgot() {
  const [email, setEmail] = useState(""); const [msg, setMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const r = await api.post("/auth/forgot", { email });
    setMsg(`Reset token (dev): ${r.data.data?.resetToken || "sent"}`);
  };
  return (
    <div className="max-w-md mx-auto mt-12 card p-6">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-primary w-full">Send reset</button>
      </form>
      {msg && <div className="text-sm text-green-700 mt-3">{msg}</div>}
    </div>
  );
}
