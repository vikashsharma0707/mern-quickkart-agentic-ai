// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useSearchParams } from "react-router-dom";
// import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
// import ProductCard from "../../components/customer/ProductCard";
// import Loading from "../../components/common/Loading";

// export default function Home() {
//   const dispatch = useDispatch();
//   const { list, categories, loading } = useSelector((s) => s.products);
//   const [params] = useSearchParams();
//   const q = params.get("q") || "";
//   const cat = params.get("category") || "";

//   useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
//   useEffect(() => { dispatch(fetchProducts({ q, category: cat })); }, [dispatch, q, cat]);

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-2xl p-6 mb-6">
//         <div className="text-3xl font-extrabold">Groceries delivered in <span className="text-brand">10 minutes</span></div>
//         <div className="text-sm text-gray-700 mt-1">Powered by 20 autonomous AI agents · Ask, plan, save 💰</div>
//         <Link to="/ai" className="btn btn-primary mt-3 inline-block">🤖 Try AI Assistant</Link>
//       </div>

//       <h2 className="text-xl font-bold mb-3">Shop by category</h2>
//       <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
//         {categories.map((c) => (
//           <Link key={c._id} to={`/?category=${c.slug}`} className="card p-3 text-center hover:shadow-md">
//             <div className="text-3xl">{c.icon}</div>
//             <div className="text-xs mt-1 font-medium line-clamp-2">{c.name}</div>
//           </Link>
//         ))}
//       </div>

//       <h2 className="text-xl font-bold mb-3">{q ? `Results for "${q}"` : "Top picks for you"}</h2>
//       {loading ? <Loading /> : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//           {list.map((p) => <ProductCard key={p._id} p={p} />)}
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "../../components/customer/ProductCard";
import Loading from "../../components/common/Loading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { list, categories, loading } = useSelector((s) => s.products);

  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const cat = params.get("category") || "";

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ q, category: cat }));
  }, [dispatch, q, cat]);

  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
      title: "Fresh Groceries Delivered",
      subtitle: "Get your daily essentials in just 10 minutes",
      button: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600",
      title: "Mega Savings Everyday",
      subtitle: "Up to 60% OFF on groceries, fruits & vegetables",
      button: "Explore Deals",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 md:p-12 mb-8 shadow-2xl">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
            ⚡ 10 Minute Delivery
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Groceries Delivered
            <br />
            In <span className="text-yellow-300">10 Minutes</span>
          </h1>

          <p className="mt-4 text-lg text-green-50 max-w-2xl">
            Smart grocery shopping powered by AI. Find products,
            discover offers, and get lightning-fast delivery.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/ai"
              className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              🤖 AI Assistant
            </Link>

            <Link
              to="/products"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          Shop by Category
        </h2>

        <Link
          to="/categories"
          className="text-green-600 font-semibold hover:text-green-700"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-10">
        {categories.map((c) => (
          <Link
            key={c._id}
            to={`/?category=${c.slug}`}
            className="
              bg-white
              rounded-2xl
              p-4
              border
              hover:border-green-500
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              text-center
            "
          >
            <div className="text-4xl mb-2">
              {c.icon}
            </div>

            <div className="text-xs font-semibold text-gray-700 line-clamp-2">
              {c.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Zepto Style Carousel */}
      <div className="mb-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative h-[220px] md:h-[350px]">

                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 md:px-16 text-white max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3">
                      {banner.title}
                    </h2>

                    <p className="text-lg md:text-xl mb-5 text-white/90">
                      {banner.subtitle}
                    </p>

                    <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                      {banner.button}
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Products */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {q ? `Results for "${q}"` : "Top Picks For You"}
        </h2>

        <Link
          to="/products"
          className="text-green-600 font-semibold hover:text-green-700"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {list.map((p) => (
            <ProductCard
              key={p._id}
              p={p}
            />
          ))}
        </div>
      )}
    </div>
  );
}