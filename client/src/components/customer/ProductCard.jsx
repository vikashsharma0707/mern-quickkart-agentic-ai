import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
export default function ProductCard({ p }) {
  const dispatch = useDispatch();
  return (
    <div className="card p-3 flex flex-col">
      <img src={p.images?.[0] || "https://via.placeholder.com/200"} alt={p.name} className="h-32 object-contain mx-auto" />
      <div className="mt-2 text-xs text-gray-500">{p.unit}</div>
      <div className="font-semibold text-sm line-clamp-2">{p.name}</div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <div>
          <span className="font-bold">₹{p.price}</span>
          {p.mrp > p.price && <span className="text-xs text-gray-400 line-through ml-1">₹{p.mrp}</span>}
        </div>
        <button className="text-brand font-semibold border border-brand px-3 py-1 rounded-md text-sm hover:bg-brand hover:text-white" onClick={() => dispatch(addToCart({ productId: p._id, qty: 1 }))}>ADD</button>
      </div>
    </div>
  );
}
