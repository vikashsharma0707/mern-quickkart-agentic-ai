require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");

const categories = [
  { name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥬" },
  { name: "Dairy & Bakery", slug: "dairy-bakery", icon: "🥛" },
  { name: "Snacks & Munchies", slug: "snacks", icon: "🍿" },
  { name: "Beverages", slug: "beverages", icon: "🧃" },
  { name: "Atta, Rice & Dal", slug: "atta-rice-dal", icon: "🌾" },
  { name: "Personal Care", slug: "personal-care", icon: "🧴" },
  { name: "Home & Cleaning", slug: "home-cleaning", icon: "🧹" },
  { name: "Cold Drinks & Juices", slug: "cold-drinks", icon: "🥤" },
];

const productsRaw = [
  ["Onion", "fruits-vegetables", 39, 50, "1kg", ["veg"], { calories: 40 }],
  ["Tomato", "fruits-vegetables", 29, 40, "1kg", ["veg"], { calories: 18 }],
  ["Potato", "fruits-vegetables", 35, 45, "1kg", ["veg"], { calories: 77 }],
  ["Banana", "fruits-vegetables", 49, 60, "1 dozen", ["veg","fruit"], { calories: 89 }],
  ["Apple Shimla", "fruits-vegetables", 169, 220, "1kg", ["veg","fruit"], { calories: 52 }],
  ["Spinach (Palak)", "fruits-vegetables", 25, 35, "250g", ["veg","leafy"], { calories: 23 }],
  ["Amul Milk Toned", "dairy-bakery", 60, 64, "1L", ["veg"], { calories: 58, protein: 3 }],
  
  
];

async function run() {
  await connectDB();
  await Promise.all([User.deleteMany(), Category.deleteMany(), Product.deleteMany()]);

  const cats = await Category.insertMany(categories);
  const bySlug = Object.fromEntries(cats.map(c => [c.slug, c._id]));

  const products = productsRaw.map(([name, slug, price, mrp, unit, diet, nutrition]) => ({
    name, slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 5),
    category: bySlug[slug], price, mrp, unit, diet, nutrition,
    brand: name.split(" ")[0], description: `${name} - quick delivery`,
    images: [`https://source.unsplash.com/300x300/?${encodeURIComponent(name)}`],
    stock: 50 + Math.floor(Math.random() * 50), tags: [slug, ...name.toLowerCase().split(" ")],
  }));
  await Product.insertMany(products);

  await User.create([
    { name: "Admin", email: "admin@quickkart.ai", password: "Admin@123", role: "admin", phone: "9999999999" },
    { name: "Super", email: "super@quickkart.ai", password: "Super@123", role: "superadmin" },
    { name: "User", email: "user@quickkart.ai", password: "User@123", role: "customer", phone: "9000000000",
      addresses: [{ label: "Home", line1: "B-12", line2: "Park Street", city: "Delhi", state: "DL", pincode: "110001", lat: 28.6, lng: 77.2 }],
      preferences: { diet: "vegetarian", allergies: [] } },
    { name: "Delivery Hero", email: "delivery@quickkart.ai", password: "Delivery@123", role: "delivery", phone: "8000000000", vehicle: "Bike", online: true, location: { lat: 28.6, lng: 77.2 } },
    { name: "Vendor One", email: "vendor@quickkart.ai", password: "Vendor@123", role: "vendor" },
  ]);

  console.log(`Seeded: ${cats.length} categories, ${products.length} products, 5 users`);
  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });
