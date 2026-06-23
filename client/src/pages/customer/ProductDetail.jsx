// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../features/cart/cartSlice";
// import api from "../../api/axios";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await api.get(`/products/${id}`);
//         const prod = data.data || data;
//         setProduct(prod);
//         setMainImage(prod.images?.[0] || "");
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     dispatch(addToCart({ productId: product._id, qty: quantity }));
//     alert("Added to cart!");
//   };

//   if (loading) return <div className="text-center py-20">Loading product...</div>;
//   if (!product) return <div className="text-center py-20">Product not found</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <button 
//         onClick={() => navigate(-1)}
//         className="mb-6 text-green-600 hover:text-green-700 flex items-center gap-2"
//       >
//         ← Back
//       </button>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Left - Images */}
//         <div>
//           <div className="bg-white rounded-2xl overflow-hidden border mb-4">
//             <img
//               src={mainImage || "https://via.placeholder.com/600x600?text=No+Image"}
//               alt={product.name}
//               className="w-full h-auto object-contain"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3">
//             {product.images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img.startsWith("http") ? img : `${import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000'}/uploads/${img.replace(/^\/uploads\//, '')}`}
//                 alt={`thumb-${index}`}
//                 className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${mainImage === img ? 'border-green-600' : 'border-gray-200'}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right - Details */}
//         <div>
//           <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
//           <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

//           <div className="flex items-center gap-3 mt-4">
//             <span className="text-4xl font-bold">₹{product.price}</span>
//             {product.mrp > product.price && (
//               <span className="text-xl text-gray-400 line-through">₹{product.mrp}</span>
//             )}
//             {product.mrp > product.price && (
//               <span className="text-green-600 font-semibold">
//                 {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
//               </span>
//             )}
//           </div>

//           <div className="mt-6">
//             <div className="font-medium mb-2">Quantity</div>
//             <div className="flex items-center gap-4">
//               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border rounded-lg hover:bg-gray-100">-</button>
//               <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
//               <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border rounded-lg hover:bg-gray-100">+</button>
//             </div>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
//           >
//             Add to Cart - ₹{(product.price * quantity).toFixed(0)}
//           </button>

//           {/* Highlights */}
//           <div className="mt-10">
//             <h3 className="font-semibold text-lg mb-4">Highlights</h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div><span className="font-medium">Brand:</span> {product.brand || "—"}</div>
//               <div><span className="font-medium">Unit:</span> {product.unit}</div>
//               <div><span className="font-medium">Stock:</span> {product.stock} left</div>
//               <div><span className="font-medium">Diet:</span> {product.diet?.join(", ") || "—"}</div>
//             </div>
//           </div>

//           {product.description && (
//             <div className="mt-8">
//               <h3 className="font-semibold text-lg mb-3">Description</h3>
//               <p className="text-gray-600 leading-relaxed">{product.description}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import api from "../../api/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [openSection, setOpenSection] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const prod = data.data || data;
        setProduct(prod);
        setMainImage(prod.images?.[0] || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ productId: product._id, qty: quantity }));
    alert("Added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart({ productId: product._id, qty: quantity }));
    navigate("/cart");
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Safe getters for possibly populated fields
  const brandName = product?.brand?.name || product?.brand || "—";
  const categoryName = product?.category?.name || product?.category || "—";
  const discount = product?.mrp && product?.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const savings = product?.mrp && product?.price 
    ? (product.mrp - product.price) * quantity 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
        >
          ← Back to shopping
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              <div 
                className="relative aspect-square bg-white overflow-hidden cursor-zoom-in group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={mainImage.startsWith("http") 
                    ? mainImage 
                    : `${import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000'}/uploads/${mainImage.replace(/^\/uploads\//, '')}`}
                  alt={product.name}
                  className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  style={isZoomed ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` } : {}}
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  🔍 Zoom
                </div>
              </div>

              {product.images?.length > 1 && (
                <div className="p-6 border-t">
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
                    {product.images.map((img, index) => {
                      const imgSrc = img.startsWith("http") 
                        ? img 
                        : `${import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000'}/uploads/${img.replace(/^\/uploads\//, '')}`;
                      return (
                        <img
                          key={index}
                          src={imgSrc}
                          alt={`thumb-${index}`}
                          className={`w-20 h-20 object-cover rounded-2xl cursor-pointer border-2 transition-all flex-shrink-0 snap-center ${mainImage === img ? 'border-green-600 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setMainImage(img)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {brandName}
                </div>
                <div className="text-gray-500">{categoryName}</div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-4 text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-yellow-400 text-xl">★★★★☆</div>
                <span className="text-gray-600 font-medium">(142)</span>
              </div>

              {/* Price */}
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-5xl font-bold text-gray-900">₹{product.price}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">₹{product.mrp}</span>
                    <div className="ml-2 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-xl">
                      {discount}% OFF
                    </div>
                  </>
                )}
              </div>

              {savings > 0 && (
                <p className="text-green-600 font-semibold mt-1">You save ₹{savings}</p>
              )}

              {/* Delivery Info */}
              <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5 flex items-start gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <div className="font-semibold text-green-800">Delivered in 10-15 minutes</div>
                  <div className="text-sm text-green-700 mt-1">
                    Free delivery on orders above ₹499
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <span className={`font-medium ${product.stock > 5 ? 'text-green-700' : 'text-orange-600'}`}>
                  {product.stock > 10 ? "In stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <div className="font-medium text-gray-700 mb-3">Quantity</div>
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-2xl text-gray-700 hover:bg-white rounded-[14px] transition active:scale-95"
                  >
                    −
                  </button>
                  <div className="px-8 text-2xl font-semibold text-gray-900">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-2xl text-gray-700 hover:bg-white rounded-[14px] transition active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-2xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-lg rounded-2xl transition-all shadow-lg shadow-orange-200"
                >
                  Buy Now
                </button>
              </div>

              {/* Highlights */}
              <div className="mt-12">
                <h3 className="font-semibold text-xl mb-5">Highlights</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Brand", value: brandName },
                    { label: "Category", value: categoryName },
                    { label: "Unit", value: product.unit || "—"},
                    { label: "Diet", value: Array.isArray(product.diet) ? product.diet.join(", ") : product.diet || "—"},
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-5">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{item.label}</div>
                      <div className="font-medium text-gray-900">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenSection(openSection === "description" ? "" : "description")}
                  className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition text-left"
                >
                  <span className="text-xl font-semibold">Description</span>
                  <span className={`text-2xl transition-transform ${openSection === "description" ? "rotate-180" : ""}`}>↓</span>
                </button>
                {openSection === "description" && (
                  <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t">
                    {product.description}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}