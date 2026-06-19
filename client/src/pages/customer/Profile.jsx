import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((s) => s.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [addresses, setAddresses] = useState(user?.addresses || []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  const addAddress = () => {
    setAddresses([...addresses, { line1: "", city: "", pincode: "", isDefault: false }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Profile 👤</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-5">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={formData.email} disabled className="input w-full bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 mt-4"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Saved Addresses */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Saved Addresses</h2>
            <button onClick={addAddress} className="text-green-600 text-sm font-medium">
              + Add New
            </button>
          </div>

          {addresses.map((addr, index) => (
            <div key={index} className="border rounded-xl p-4 mb-4">
              <input
                placeholder="House No, Street"
                value={addr.line1}
                onChange={(e) => {
                  const newAddr = [...addresses];
                  newAddr[index].line1 = e.target.value;
                  setAddresses(newAddr);
                }}
                className="input mb-2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="City"
                  value={addr.city}
                  onChange={(e) => {
                    const newAddr = [...addresses];
                    newAddr[index].city = e.target.value;
                    setAddresses(newAddr);
                  }}
                  className="input"
                />
                <input
                  placeholder="Pincode"
                  value={addr.pincode}
                  onChange={(e) => {
                    const newAddr = [...addresses];
                    newAddr[index].pincode = e.target.value;
                    setAddresses(newAddr);
                  }}
                  className="input"
                />
              </div>
            </div>
          ))}

          {addresses.length === 0 && (
            <p className="text-gray-500 py-8 text-center">No addresses saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}