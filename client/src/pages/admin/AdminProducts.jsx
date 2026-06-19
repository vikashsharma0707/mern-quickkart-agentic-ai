// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// export default function AdminProducts() {
//   const [list, setList] = useState([]);
//   const [f, setF] = useState({ name: "", price: 0, mrp: 0, unit: "", stock: 10 });
//   const load = () => api.get("/products?limit=200").then((r) => setList(r.data.data));
//   useEffect(() => { load(); }, []);
//   const add = async () => { await api.post("/products", f); setF({ name: "", price: 0, mrp: 0, unit: "", stock: 10 }); load(); };
//   const del = async (id) => { await api.delete("/products/" + id); load(); };
//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <div className="card p-4 mb-4 grid grid-cols-2 md:grid-cols-6 gap-2">
//         <input className="input col-span-2" placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
//         <input className="input" type="number" placeholder="Price" value={f.price} onChange={(e) => setF({ ...f, price: +e.target.value })} />
//         <input className="input" type="number" placeholder="MRP" value={f.mrp} onChange={(e) => setF({ ...f, mrp: +e.target.value })} />
//         <input className="input" placeholder="Unit" value={f.unit} onChange={(e) => setF({ ...f, unit: e.target.value })} />
//         <button className="btn btn-primary" onClick={add}>Add</button>
//       </div>
//       <div className="card divide-y">
//         {list.map((p) => (
//           <div key={p._id} className="p-3 flex items-center gap-3">
//             <img src={p.images?.[0]} className="w-12 h-12 object-contain" alt="" />
//             <div className="flex-1">
//               <div className="font-semibold">{p.name}</div>
//               <div className="text-xs text-gray-500">{p.unit} · stock {p.stock}</div>
//             </div>
//             <div className="font-bold">₹{p.price}</div>
//             <button className="text-red-500" onClick={() => del(p._id)}>Delete</button>
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
  const [f, setF] = useState({
    name: "",
    price: 0,
    mrp: 0,
    unit: "",
    stock: 10,
    image: null,        // ← New
  });
  const [imagePreview, setImagePreview] = useState(null);

  const load = () => {
    api.get("/products?limit=200").then((r) => setList(r.data.data || r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setF({ ...f, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const add = async () => {
    if (!f.name || !f.price) {
      alert("Name aur Price zaroori hai");
      return;
    }

    const formData = new FormData();
    formData.append("name", f.name);
    formData.append("price", f.price);
    formData.append("mrp", f.mrp);
    formData.append("unit", f.unit);
    formData.append("stock", f.stock);

    if (f.image) {
      formData.append("images", f.image);   // Backend ke hisaab se 'images' ya 'image'
    }

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      // Reset form
      setF({ name: "", price: 0, mrp: 0, unit: "", stock: 10, image: null });
      setImagePreview(null);
      load();
    } catch (err) {
      console.error(err);
      alert("Error adding product: " + (err.response?.data?.message || err.message));
    }
  };

  const del = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete("/products/" + id);
      load();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Add Product Form */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold mb-3">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            className="input col-span-2"
            placeholder="Product Name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Price"
            value={f.price}
            onChange={(e) => setF({ ...f, price: +e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="MRP"
            value={f.mrp}
            onChange={(e) => setF({ ...f, mrp: +e.target.value })}
          />

          <input
            className="input"
            placeholder="Unit (e.g. 1kg, 500ml)"
            value={f.unit}
            onChange={(e) => setF({ ...f, unit: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Stock"
            value={f.stock}
            onChange={(e) => setF({ ...f, stock: +e.target.value })}
          />

          {/* Image Upload */}
          <div className="lg:col-span-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand/90"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-lg border"
              />
            )}
          </div>

          <button className="btn btn-primary lg:col-span-1" onClick={add}>
            Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="card divide-y">
        {list.map((p) => (
          <div key={p._id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
            <img
              src={p.images?.[0] || "/placeholder.png"}
              className="w-14 h-14 object-contain border rounded"
              alt={p.name}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{p.name}</div>
              <div className="text-sm text-gray-500">
                {p.unit} • Stock: {p.stock}
              </div>
            </div>
            <div className="font-bold text-lg">₹{p.price}</div>
            <button
              className="text-red-600 hover:text-red-700 font-medium"
              onClick={() => del(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}