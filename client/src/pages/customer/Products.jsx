import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../../features/products/productsSlice";
import ProductCard from "../../components/customer/ProductCard";
import Loading from "../../components/common/Loading";

export default function Products() {
  const dispatch = useDispatch();
  const { list, categories, loading } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "-createdAt";

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState(category ? [category] : []);

  // Load Data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ q, category, minPrice, maxPrice, sort }));
  }, [dispatch, q, category, minPrice, maxPrice, sort]);

  const handleCategoryChange = (slug) => {
    let newCats = [...selectedCategories];
    if (newCats.includes(slug)) {
      newCats = newCats.filter(c => c !== slug);
    } else {
      newCats.push(slug);
    }
    setSelectedCategories(newCats);

    const params = new URLSearchParams(searchParams);
    if (newCats.length > 0) {
      params.set("category", newCats.join(","));
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", min);
    params.set("maxPrice", max);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-72 hidden lg:block bg-white border rounded-2xl p-5 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={clearFilters} className="text-red-600 text-sm hover:underline">
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => handleCategoryChange(cat.slug)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="flex gap-3">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e.target.value, priceRange[1])}
                className="input w-full"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], e.target.value)}
                className="input w-full"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-semibold mb-3">Sort By</h3>
            <select
              className="input w-full"
              value={sort}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("sort", e.target.value);
                setSearchParams(params);
              }}
            >
              <option value="-createdAt">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-stock">Best Selling</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {q ? `Search: "${q}"` : "All Products"}
            </h1>
            <p className="text-gray-500">{list.length} products</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {list.map((product) => (
                <ProductCard key={product._id} p={product} />
              ))}
            </div>
          )}

          {list.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-500">
              No products found for your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}