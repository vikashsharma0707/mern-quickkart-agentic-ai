import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, updateCart, removeFromCart, clearCart } from "../../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch(); const nav = useNavigate();
  const { cart } = useSelector((s) => s.cart);
  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);
  if (!cart.items?.length) return (
    <div className="text-center p-10">
      <div className="text-6xl">🛒</div>
      <div className="mt-3 text-lg">Your cart is empty</div>
      <Link to="/" className="btn btn-primary mt-4 inline-block">Shop now</Link>
    </div>
  );
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="card divide-y">
        {cart.items.map((i) => (
          <div key={i.product._id} className="p-3 flex items-center gap-3">
            <img src={i.product.images?.[0]} className="w-16 h-16 object-contain" alt="" />
            <div className="flex-1">
              <div className="font-semibold">{i.product.name}</div>
              <div className="text-xs text-gray-500">{i.product.unit} · ₹{i.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline px-2 py-0" onClick={() => dispatch(updateCart({ productId: i.product._id, qty: i.qty - 1 }))}>-</button>
              <span>{i.qty}</span>
              <button className="btn btn-outline px-2 py-0" onClick={() => dispatch(updateCart({ productId: i.product._id, qty: i.qty + 1 }))}>+</button>
            </div>
            <div className="w-20 text-right font-semibold">₹{i.price * i.qty}</div>
            <button className="text-red-500 text-sm" onClick={() => dispatch(removeFromCart(i.product._id))}>✕</button>
          </div>
        ))}
      </div>
      <div className="card p-4 mt-4 flex items-center justify-between">
        <div className="text-xl font-bold">Total: ₹{cart.total}</div>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => dispatch(clearCart())}>Clear</button>
          <button className="btn btn-primary" onClick={() => nav("/checkout")}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
