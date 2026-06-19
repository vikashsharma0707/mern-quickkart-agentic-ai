import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch(); const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
  const submit = async (e) => {
    e.preventDefault();
    const r = await dispatch(register(f));
    if (r.meta.requestStatus === "fulfilled") nav("/");
  };
  return (
    <div className="max-w-md mx-auto mt-12 card p-6">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" required onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className="input" type="email" placeholder="Email" required onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input className="input" placeholder="Phone" onChange={(e) => setF({ ...f, phone: e.target.value })} />
        <input className="input" type="password" placeholder="Password" required onChange={(e) => setF({ ...f, password: e.target.value })} />
        <button className="btn btn-primary w-full">Sign up</button>
      </form>
      <div className="text-sm mt-3"><Link to="/login" className="text-brand">Have an account? Login</Link></div>
    </div>
  );
}
