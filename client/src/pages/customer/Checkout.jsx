// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { placeOrder } from "../../features/orders/ordersSlice";
// import { fetchCart } from "../../features/cart/cartSlice";
// import api from "../../api/axios";

// export default function Checkout() {
//   const dispatch = useDispatch(); const nav = useNavigate();
//   const { cart } = useSelector((s) => s.cart);
//   const { user } = useSelector((s) => s.auth);
//   const [addr, setAddr] = useState(user?.addresses?.[0] || { line1: "", city: "", pincode: "" });
//   const [method, setMethod] = useState("cod");
//   useEffect(() => { dispatch(fetchCart()); }, [dispatch]);

//   const place = async () => {
//     const r = await dispatch(placeOrder({ address: addr, paymentMethod: method }));
//     if (r.meta.requestStatus !== "fulfilled") return;
//     const order = r.payload;
//     if (method === "razorpay") {
//       const { data } = await api.post(`/payments/razorpay/${order._id}`);
//       const rzp = data.data;
//       const options = {
//         key: rzp.key, amount: rzp.amount, currency: rzp.currency, name: "QuickKart AI",
//         description: "Order " + order._id, order_id: rzp.id,
//         handler: async (resp) => {
//           await api.post("/payments/verify", { orderId: order._id, ...resp });
//           nav(`/track/${order._id}`);
//         },
//         prefill: { name: user.name, email: user.email },
//         theme: { color: "#0c831f" },
//       };
//       if (window.Razorpay) new window.Razorpay(options).open();
//       else { alert("Razorpay script not loaded. Order placed as COD."); nav(`/track/${order._id}`); }
//     } else nav(`/track/${order._id}`);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="card p-4 space-y-3">
//         <div className="font-semibold">Delivery address</div>
//         <input className="input" placeholder="Line 1" value={addr.line1 || ""} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} />
//         <div className="grid grid-cols-2 gap-2">
//           <input className="input" placeholder="City" value={addr.city || ""} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
//           <input className="input" placeholder="Pincode" value={addr.pincode || ""} onChange={(e) => setAddr({ ...addr, pincode: e.target.value })} />
//         </div>
//         <div className="font-semibold mt-2">Payment</div>
//         <div className="flex gap-3">
//           <label className="flex items-center gap-2"><input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} /> COD</label>
//           <label className="flex items-center gap-2"><input type="radio" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} /> Razorpay (UPI/Card)</label>
//         </div>
//         <div className="border-t pt-3 flex justify-between font-bold">
//           <span>Total</span><span>₹{cart.total}</span>
//         </div>
//         <button className="btn btn-primary w-full" onClick={place}>Place order</button>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../features/orders/ordersSlice";
import { fetchCart } from "../../features/cart/cartSlice";
import api from "../../api/axios";

export default function Checkout() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  const { cart, loading: cartLoading } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  
  const [addr, setAddr] = useState({
    line1: "",
    city: "",
    pincode: "",
    ...user?.addresses?.[0]
  });
  
  const [method, setMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const place = async () => {
    if (!addr.line1 || !addr.city || !addr.pincode) {
      alert("Please fill complete address");
      return;
    }
    if (!cart || cart.items?.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setPlacing(true);

    try {
      const result = await dispatch(placeOrder({ 
        address: addr, 
        paymentMethod: method 
      })).unwrap();

      const order = result; // ya result.data depending on your slice

      if (method === "razorpay") {
        const { data } = await api.post(`/payments/razorpay/${order._id}`);
        const rzp = data.data;

        const options = {
          key: rzp.key,
          amount: rzp.amount,
          currency: rzp.currency,
          name: "QuickKart AI",
          description: `Order ${order._id}`,
          order_id: rzp.id,
          handler: async (resp) => {
            await api.post("/payments/verify", { orderId: order._id, ...resp });
            nav(`/track/${order._id}`);
          },
          prefill: { name: user?.name, email: user?.email },
          theme: { color: "#0c831f" },
        };

        if (window.Razorpay) {
          new window.Razorpay(options).open();
        } else {
          alert("Razorpay not loaded. Order placed as COD.");
          nav(`/track/${order._id}`);
        }
      } else {
        nav(`/track/${order._id}`);
      }
    } catch (err) {
      console.error("Place Order Failed:", err);
      alert(err?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (cartLoading) return <div>Loading cart...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <div className="card p-4 space-y-4">
        <div>
          <div className="font-semibold mb-2">Delivery Address</div>
          <input 
            className="input w-full mb-2" 
            placeholder="House No, Street" 
            value={addr.line1 || ""} 
            onChange={(e) => setAddr({ ...addr, line1: e.target.value })} 
          />
          <div className="grid grid-cols-2 gap-2">
            <input 
              className="input" 
              placeholder="City" 
              value={addr.city || ""} 
              onChange={(e) => setAddr({ ...addr, city: e.target.value })} 
            />
            <input 
              className="input" 
              placeholder="Pincode" 
              value={addr.pincode || ""} 
              onChange={(e) => setAddr({ ...addr, pincode: e.target.value })} 
            />
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">Payment Method</div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} />
              Online Payment (Razorpay)
            </label>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total Amount</span>
          <span>₹{cart?.total || 0}</span>
        </div>

        <button 
          className="btn btn-primary w-full py-3 text-lg" 
          onClick={place}
          disabled={placing || !cart?.items?.length}
        >
          {placing ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}