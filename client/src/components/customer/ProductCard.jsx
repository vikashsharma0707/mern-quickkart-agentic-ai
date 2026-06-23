// // import { useDispatch } from "react-redux";
// // import { addToCart } from "../../features/cart/cartSlice";
// // export default function ProductCard({ p }) {
// //   const dispatch = useDispatch();
// //   return (
// //     <div className="card p-3 flex flex-col">
// //       {/* <img src={p.images?.[0] || "https://via.placeholder.com/200"} alt={p.name} className="h-32 object-contain mx-auto" /> */}
// //       <img 
// //   src={`${import.meta.env.VITE_UPLOADS_BASE_URL || '/uploads'}/${product.images?.[0]}`} 
// //   alt={product.name}
// //   className="w-full h-52 object-cover"
// // />
// //       <div className="mt-2 text-xs text-gray-500">{p.unit}</div>
// //       <div className="font-semibold text-sm line-clamp-2">{p.name}</div>
// //       <div className="mt-auto flex items-center justify-between pt-2">
// //         <div>
// //           <span className="font-bold">₹{p.price}</span>
// //           {p.mrp > p.price && <span className="text-xs text-gray-400 line-through ml-1">₹{p.mrp}</span>}
// //         </div>
// //         <button className="text-brand font-semibold border border-brand px-3 py-1 rounded-md text-sm hover:bg-brand hover:text-white" onClick={() => dispatch(addToCart({ productId: p._id, qty: 1 }))}>ADD</button>
// //       </div>
// //     </div>
// //   );
// // }





// import { useDispatch } from "react-redux";
// import { addToCart } from "../../features/cart/cartSlice";

// // Local SVG Fallback (No external dependency)
// const FALLBACK_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E`;

// export default function ProductCard({ p }) {
//   const dispatch = useDispatch();

//   const getImageUrl = (img) => {
//     if (!img) return FALLBACK_IMAGE;

//     // Full external URL (Unsplash etc.)
//     if (img.startsWith("http://") || img.startsWith("https://")) {
//       return img;
//     }

//     // Backend uploaded image
//     const baseUrl = import.meta.env.VITE_UPLOADS_BASE_URL 
//       ? import.meta.env.VITE_UPLOADS_BASE_URL 
//       : "http://localhost:5000";

//     const cleanName = img.replace(/^\/uploads\//, "").replace(/^\//, "");

//     return `${baseUrl}/uploads/${cleanName}`;
//   };

//   const imageUrl = getImageUrl(p.images?.[0]);

//   return (
//     <div className="card p-3 flex flex-col hover:shadow-lg transition-all duration-300 group">
//       <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] relative">
//         <img
//           src={imageUrl}
//           alt={p.name || "Product"}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           loading="lazy"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = FALLBACK_IMAGE;
//           }}
//         />
//       </div>

//       <div className="mt-3 text-xs text-gray-500 font-medium">{p.unit}</div>
      
//       <div className="font-semibold text-sm line-clamp-2 min-h-[42px] mt-1">
//         {p.name}
//       </div>

//       <div className="mt-auto flex items-center justify-between pt-3">
//         <div>
//           <span className="font-bold text-lg">₹{p.price}</span>
//           {p.mrp > p.price && (
//             <span className="text-xs text-gray-400 line-through ml-1">₹{p.mrp}</span>
//           )}
//         </div>

//         <button
//           className="text-brand font-semibold border border-brand px-5 py-1.5 rounded-md text-sm hover:bg-brand hover:text-white transition-all active:scale-95"
//           onClick={() => dispatch(addToCart({ productId: p._id, qty: 1 }))}
//         >
//           ADD
//         </button>
//       </div>
//     </div>
//   );
// }



import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

// Local SVG Fallback
const FALLBACK_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E`;

export default function ProductCard({ p }) {
  const dispatch = useDispatch();

  const getImageUrl = (img) => {
    if (!img) return FALLBACK_IMAGE;

    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    const baseUrl = import.meta.env.VITE_UPLOADS_BASE_URL 
      ? import.meta.env.VITE_UPLOADS_BASE_URL 
      : "http://localhost:5000";

    const cleanName = img.replace(/^\/uploads\//, "").replace(/^\//, "");

    return `${baseUrl}/uploads/${cleanName}`;
  };

  const imageUrl = getImageUrl(p.images?.[0]);

  return (
    <Link to={`/product/${p._id}`} className="block">
      <div className="card p-3 flex flex-col hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] relative">
          <img
            src={imageUrl}
            alt={p.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="mt-3 text-xs text-gray-500 font-medium">{p.unit}</div>
        
        <div className="font-semibold text-sm line-clamp-2 min-h-[42px] mt-1">
          {p.name}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <span className="font-bold text-lg">₹{p.price}</span>
            {p.mrp > p.price && (
              <span className="text-xs text-gray-400 line-through ml-1">₹{p.mrp}</span>
            )}
          </div>

          <button
            className="text-brand font-semibold border border-brand px-5 py-1.5 rounded-md text-sm hover:bg-brand hover:text-white transition-all active:scale-95"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking ADD
              dispatch(addToCart({ productId: p._id, qty: 1 }));
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </Link>
  );
}