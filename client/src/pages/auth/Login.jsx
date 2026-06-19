import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [f, setF] = useState({ email: "user@quickkart.ai", password: "User@123" });
  const submit = async (e) => {
    e.preventDefault();
    const r = await dispatch(login(f));
    if (r.meta.requestStatus === "fulfilled") nav("/");
  };
  return (
    <div className="max-w-md mx-auto mt-12 card p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required />
        <input className="input" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
        <button disabled={loading} className="btn btn-primary w-full">{loading ? "..." : "Login"}</button>
      </form>
      <div className="text-sm text-gray-500 mt-3">
        New here? <Link to="/register" className="text-brand">Sign up</Link> · <Link to="/forgot" className="text-brand">Forgot?</Link>
      </div>
      <div className="text-xs text-gray-400 mt-4 border-t pt-3">
        Demo: admin@quickkart.ai/Admin@123 · delivery@quickkart.ai/Delivery@123
      </div>
    </div>
  );
}
