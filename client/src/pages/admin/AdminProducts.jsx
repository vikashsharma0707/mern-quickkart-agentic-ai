// // import { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // export default function AdminProducts() {
// //   const [list, setList] = useState([]);
// //   const [f, setF] = useState({ name: "", price: 0, mrp: 0, unit: "", stock: 10 });
// //   const load = () => api.get("/products?limit=200").then((r) => setList(r.data.data));
// //   useEffect(() => { load(); }, []);
// //   const add = async () => { await api.post("/products", f); setF({ name: "", price: 0, mrp: 0, unit: "", stock: 10 }); load(); };
// //   const del = async (id) => { await api.delete("/products/" + id); load(); };
// //   return (
// //     <div className="max-w-6xl mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Products</h1>
// //       <div className="card p-4 mb-4 grid grid-cols-2 md:grid-cols-6 gap-2">
// //         <input className="input col-span-2" placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
// //         <input className="input" type="number" placeholder="Price" value={f.price} onChange={(e) => setF({ ...f, price: +e.target.value })} />
// //         <input className="input" type="number" placeholder="MRP" value={f.mrp} onChange={(e) => setF({ ...f, mrp: +e.target.value })} />
// //         <input className="input" placeholder="Unit" value={f.unit} onChange={(e) => setF({ ...f, unit: e.target.value })} />
// //         <button className="btn btn-primary" onClick={add}>Add</button>
// //       </div>
// //       <div className="card divide-y">
// //         {list.map((p) => (
// //           <div key={p._id} className="p-3 flex items-center gap-3">
// //             <img src={p.images?.[0]} className="w-12 h-12 object-contain" alt="" />
// //             <div className="flex-1">
// //               <div className="font-semibold">{p.name}</div>
// //               <div className="text-xs text-gray-500">{p.unit} · stock {p.stock}</div>
// //             </div>
// //             <div className="font-bold">₹{p.price}</div>
// //             <button className="text-red-500" onClick={() => del(p._id)}>Delete</button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function AdminProducts() {
//   const [list, setList] = useState([]);
//   const [f, setF] = useState({
//     name: "",
//     price: 0,
//     mrp: 0,
//     unit: "",
//     stock: 10,
//     image: null,        // ← New
//   });
//   const [imagePreview, setImagePreview] = useState(null);

//   const load = () => {
//     api.get("/products?limit=200").then((r) => setList(r.data.data || r.data));
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setF({ ...f, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const add = async () => {
//     if (!f.name || !f.price) {
//       alert("Name aur Price zaroori hai");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", f.name);
//     formData.append("price", f.price);
//     formData.append("mrp", f.mrp);
//     formData.append("unit", f.unit);
//     formData.append("stock", f.stock);

//     if (f.image) {
//       formData.append("images", f.image);   // Backend ke hisaab se 'images' ya 'image'
//     }

//     try {
//       await api.post("/products", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Product added successfully!");
//       // Reset form
//       setF({ name: "", price: 0, mrp: 0, unit: "", stock: 10, image: null });
//       setImagePreview(null);
//       load();
//     } catch (err) {
//       console.error(err);
//       alert("Error adding product: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const del = async (id) => {
//     if (window.confirm("Delete this product?")) {
//       await api.delete("/products/" + id);
//       load();
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

//       {/* Add Product Form */}
//       <div className="card p-5 mb-6">
//         <h2 className="font-semibold mb-3">Add New Product</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
//           <input
//             className="input col-span-2"
//             placeholder="Product Name"
//             value={f.name}
//             onChange={(e) => setF({ ...f, name: e.target.value })}
//           />

//           <input
//             className="input"
//             type="number"
//             placeholder="Price"
//             value={f.price}
//             onChange={(e) => setF({ ...f, price: +e.target.value })}
//           />

//           <input
//             className="input"
//             type="number"
//             placeholder="MRP"
//             value={f.mrp}
//             onChange={(e) => setF({ ...f, mrp: +e.target.value })}
//           />

//           <input
//             className="input"
//             placeholder="Unit (e.g. 1kg, 500ml)"
//             value={f.unit}
//             onChange={(e) => setF({ ...f, unit: e.target.value })}
//           />

//           <input
//             className="input"
//             type="number"
//             placeholder="Stock"
//             value={f.stock}
//             onChange={(e) => setF({ ...f, stock: +e.target.value })}
//           />

//           {/* Image Upload */}
//           <div className="lg:col-span-2">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand/90"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="mt-2 w-24 h-24 object-cover rounded-lg border"
//               />
//             )}
//           </div>

//           <button className="btn btn-primary lg:col-span-1" onClick={add}>
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Products List */}
//       <div className="card divide-y">
//         {list.map((p) => (
//           <div key={p._id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
//             <img
//               src={p.images?.[0] || "/placeholder.png"}
//               className="w-14 h-14 object-contain border rounded"
//               alt={p.name}
//             />
//             <div className="flex-1 min-w-0">
//               <div className="font-semibold truncate">{p.name}</div>
//               <div className="text-sm text-gray-500">
//                 {p.unit} • Stock: {p.stock}
//               </div>
//             </div>
//             <div className="font-bold text-lg">₹{p.price}</div>
//             <button
//               className="text-red-600 hover:text-red-700 font-medium"
//               onClick={() => del(p._id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    unit: "",
    stock: 10,
    category: "",
    description: "",
    brand: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load Products + Categories
  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get("/products?limit=100"),
        api.get("/categories")
      ]);
      setList(prodRes.data.data || prodRes.data);
      setCategories(catRes.data.data || catRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addProduct = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("Name, Price aur Category zaroori hai");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("mrp", form.mrp || form.price);
    formData.append("unit", form.unit);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("brand", form.brand);

    if (image) {
      formData.append("images", image);
    }

    try {
      setLoading(true);
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      // Reset form
      setForm({
        name: "", price: "", mrp: "", unit: "", stock: 10, category: "", description: "", brand: ""
      });
      setImage(null);
      setImagePreview(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadData();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Add Product Form */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input className="input" placeholder="Product Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          
          <input className="input" type="number" placeholder="Price *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          
          <input className="input" type="number" placeholder="MRP" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} />

          <input className="input" placeholder="Unit (e.g. 1kg, 500ml)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />

          <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />

          <select 
            className="input" 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category *</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input className="input" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />

          <textarea 
            className="input col-span-1 md:col-span-2 lg:col-span-3" 
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Image Upload */}
          <div className="lg:col-span-3">
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg border" />}
          </div>

          <button 
            className="btn btn-primary lg:col-span-3 py-3 text-lg" 
            onClick={addProduct}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="card">
        <h2 className="p-4 border-b font-semibold text-lg">All Products ({list.length})</h2>
        <div className="divide-y">
          {list.map((p) => (
            <div key={p._id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <img
                src={p.images?.[0] ? `${import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000'}/uploads/${p.images[0].replace(/^\/uploads\//, '')}` : "/placeholder.png"}
                className="w-16 h-16 object-cover rounded border"
                alt={p.name}
              />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">
                  {p.unit} • ₹{p.price} • Stock: {p.stock}
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-700 font-medium px-4 py-2"
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}