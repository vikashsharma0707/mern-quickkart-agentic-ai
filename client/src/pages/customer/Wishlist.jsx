import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  fetchWishlist, 
  removeFromWishlist 
} from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";   // ← Yeh sahi jagah se import

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((state) => state.wishlist);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ 
      productId: product._id, 
      quantity: 1 
    }));
    dispatch(removeFromWishlist(product._id));
  };

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading your wishlist...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist ❤️</h1>
        <p className="text-gray-500">{items.length} items</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">♡</div>
          <h3 className="text-2xl font-medium mb-3">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8">Save your favorite items here</p>
          <Link to="/" className="btn btn-primary px-8 py-3 text-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product._id} className="card overflow-hidden group hover:shadow-xl transition">
              <div className="relative">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow hover:bg-red-50 text-red-500 hover:scale-110 transition"
                >
                  🗑️
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.2em]">{product.name}</h3>
                <p className="text-green-600 font-bold text-xl mt-2">₹{product.price}</p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={cartLoading}
                    className="flex-1 btn btn-primary py-2.5 text-sm"
                  >
                    Move to Cart
                  </button>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 btn border border-gray-300 py-2.5 text-sm hover:bg-gray-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}