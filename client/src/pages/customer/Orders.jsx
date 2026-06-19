// // // import { useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link } from "react-router-dom";
// // // import { fetchOrders } from "../../features/orders/ordersSlice";

// // // export default function Orders() {
// // //   const dispatch = useDispatch();
// // //   const { list } = useSelector((s) => s.orders);
// // //   useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);
// // //   return (
// // //     <div className="max-w-4xl mx-auto p-4">
// // //       <h1 className="text-2xl font-bold mb-4">My Orders</h1>
// // //       <div className="space-y-3">
// // //         {list.map((o) => (
// // //           <Link to={`/track/${o._id}`} key={o._id} className="card p-4 flex justify-between hover:shadow-md">
// // //             <div>
// // //               <div className="font-semibold">Order #{o._id.slice(-6)}</div>
// // //               <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()} · {o.items.length} items</div>
// // //             </div>
// // //             <div className="text-right">
// // //               <div className="font-bold">₹{o.amount}</div>
// // //               <div className="text-xs uppercase font-semibold text-brand">{o.status}</div>
// // //             </div>
// // //           </Link>
// // //         ))}
// // //         {!list.length && <div className="text-gray-400">No orders yet.</div>}
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import { fetchOrders, cancelOrder } from "../../features/orders/ordersSlice"; // ← cancelOrder add karna hai

// // export default function Orders() {
// //   const dispatch = useDispatch();
// //   const { list, loading } = useSelector((s) => s.orders);

// //   useEffect(() => {
// //     dispatch(fetchOrders());
// //   }, [dispatch]);

// //   const handleCancel = async (orderId) => {
// //     if (!window.confirm("Are you sure you want to cancel this order?")) return;

// //     try {
// //       await dispatch(cancelOrder(orderId)).unwrap();
// //       alert("Order cancelled successfully");
// //       // Refresh list
// //       dispatch(fetchOrders());
// //     } catch (err) {
// //       alert(err?.message || "Failed to cancel order");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">My Orders</h1>

// //       <div className="space-y-3">
// //         {list.map((o) => (
// //           <div key={o._id} className="card p-4 hover:shadow-md">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <div className="font-semibold">Order #{o._id.slice(-6)}</div>
// //                 <div className="text-xs text-gray-500">
// //                   {new Date(o.createdAt).toLocaleString()} · {o.items.length} items
// //                 </div>
// //               </div>

// //               <div className="text-right">
// //                 <div className="font-bold">₹{o.amount}</div>
// //                 <div className={`text-xs uppercase font-semibold mt-1 
// //                   ${o.status === "cancelled" ? "text-red-600" : "text-brand"}`}>
// //                   {o.status}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Cancel Button */}
// //             {(o.status === "placed" || o.status === "confirmed") && (
// //               <button
// //                 onClick={() => handleCancel(o._id)}
// //                 className="mt-3 text-red-600 hover:text-red-700 text-sm font-medium border border-red-300 hover:border-red-500 px-4 py-1 rounded-md transition"
// //               >
// //                 Cancel Order
// //               </button>
// //             )}

// //             <Link
// //               to={`/track/${o._id}`}
// //               className="mt-3 block text-center text-brand hover:underline text-sm"
// //             >
// //               Track Order →
// //             </Link>
// //           </div>
// //         ))}

// //         {!list.length && <div className="text-gray-400 py-8 text-center">No orders yet.</div>}
// //       </div>
// //     </div>
// //   );
// // }



// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchOrders, cancelOrder } from "../../features/orders/ordersSlice";

// export default function Orders() {
//   const dispatch = useDispatch();
//   const { list, loading } = useSelector((s) => s.orders);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) 
//       return;

//     try {
//       await dispatch(cancelOrder(orderId)).unwrap();
//       dispatch(fetchOrders()); // Refresh list
//     } catch (err) {
//       alert(err?.message || "Failed to cancel order");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending": return "text-yellow-600 bg-yellow-100";
//       case "placed": return "text-blue-600 bg-blue-100";
//       case "confirmed": return "text-green-600 bg-green-100";
//       case "packed": return "text-purple-600 bg-purple-100";
//       case "out_for_delivery": return "text-orange-600 bg-orange-100";
//       case "delivered": return "text-green-700 bg-green-100";
//       case "cancelled": return "text-red-600 bg-red-100";
//       default: return "text-gray-600 bg-gray-100";
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">My Orders</h1>
//         <button 
//           onClick={() => dispatch(fetchOrders())} 
//           className="text-sm text-green-600 hover:text-green-700 font-medium"
//         >
//           ↻ Refresh
//         </button>
//       </div>

//       {loading && <div className="text-center py-10">Loading orders...</div>}

//       <div className="space-y-4">
//         {list.map((o) => (
//           <div key={o._id} className="bg-white border rounded-2xl p-6 hover:shadow-md transition">
//             <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h3 className="font-bold text-xl">Order #{o._id.toString().slice(-8)}</h3>
//                   <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(o.status)}`}>
//                     {o.status.toUpperCase()}
//                   </span>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1">
//                   {new Date(o.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="text-2xl font-bold">₹{o.amount}</p>
//                 <p className="text-sm text-gray-500">{o.items.length} items</p>
//               </div>
//             </div>

//             {/* Items Summary */}
//             <div className="mt-4 text-sm text-gray-600 border-t pt-4">
//               {o.items.slice(0, 2).map((item, i) => (
//                 <div key={i} className="flex justify-between py-1">
//                   <span>{item.qty}× {item.name}</span>
//                   <span>₹{item.price * item.qty}</span>
//                 </div>
//               ))}
//               {o.items.length > 2 && (
//                 <p className="text-xs text-gray-500 mt-1">+{o.items.length - 2} more items</p>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 mt-6">
//               <Link
//                 to={`/track/${o._id}`}
//                 className="flex-1 btn border border-gray-300 hover:bg-gray-50 py-3 text-center font-medium"
//               >
//                 Track Order
//               </Link>

//               {/* Cancel Button - Only for early stages */}
//               {(o.status === "pending" || o.status === "placed" || o.status === "confirmed") && (
//                 <button
//                   onClick={() => handleCancel(o._id)}
//                   className="flex-1 btn border border-red-300 text-red-600 hover:bg-red-50 py-3 font-medium"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         {!list.length && !loading && (
//           <div className="text-center py-20 bg-white rounded-2xl border">
//             <div className="text-6xl mb-4">📦</div>
//             <h3 className="text-xl font-medium">No orders yet</h3>
//             <p className="text-gray-500 mt-2">Your orders will appear here</p>
//             <Link to="/" className="btn btn-primary mt-6 inline-block">
//               Start Shopping
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../features/orders/ordersSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.orders);
  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-3">
        {list.map((o) => (
          <Link to={`/track/${o._id}`} key={o._id} className="card p-4 flex justify-between hover:shadow-md">
            <div>
              <div className="font-semibold">Order #{o._id.slice(-6)}</div>
              <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()} · {o.items.length} items</div>
            </div>
            <div className="text-right">
              <div className="font-bold">₹{o.amount}</div>
              <div className="text-xs uppercase font-semibold text-brand">{o.status}</div>
            </div>
          </Link>
        ))}
        {!list.length && <div className="text-gray-400">No orders yet.</div>}
      </div>
    </div>
  );
}