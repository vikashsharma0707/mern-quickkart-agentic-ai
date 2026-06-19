import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrder, setCurrent } from "../../features/orders/ordersSlice";
import { socket } from "../../api/socket";

const STEPS = ["placed", "confirmed", "packed", "out_for_delivery", "delivered"];

export default function Track() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const o = useSelector((s) => s.orders.current);
  useEffect(() => {
    dispatch(fetchOrder(id));
    socket.emit("order:track", id);
    socket.on(`order:${id}`, (data) => dispatch(setCurrent(data)));
    return () => socket.off(`order:${id}`);
  }, [dispatch, id]);
  if (!o) return <div className="p-10 text-center">Loading…</div>;
  const idx = STEPS.indexOf(o.status);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order #{o._id.slice(-6)}</h1>
      <div className="card p-4">
        <div className="flex justify-between mb-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i <= idx ? "bg-brand text-white" : "bg-gray-200"}`}>{i + 1}</div>
              <div className="text-xs mt-1 capitalize">{s.replace(/_/g, " ")}</div>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">ETA: ~{o.etaMinutes || 12} mins</div>
        {o.deliveryPartner && <div className="text-sm">Partner: {o.deliveryPartner.name} ({o.deliveryPartner.phone})</div>}
      </div>
      <div className="card p-4 mt-4">
        <div className="font-semibold mb-2">Items</div>
        {o.items.map((i) => <div key={i.product} className="flex justify-between text-sm py-1"><span>{i.qty}× {i.name}</span><span>₹{i.price * i.qty}</span></div>)}
        <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span>₹{o.amount}</span></div>
      </div>
      <div className="card p-4 mt-4">
        <div className="font-semibold mb-2">Timeline</div>
        {o.timeline.map((t, i) => (
          <div key={i} className="text-sm py-1">
            <span className="text-gray-500">{new Date(t.at).toLocaleTimeString()}</span> — <b>{t.status}</b> {t.note}
          </div>
        ))}
      </div>
    </div>
  );
}
