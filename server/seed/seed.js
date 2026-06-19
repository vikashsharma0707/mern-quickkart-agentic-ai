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
  ["Amul Butter", "dairy-bakery", 56, 60, "100g", ["veg"], { calories: 717, fat: 81 }],
  ["Britannia Bread", "dairy-bakery", 45, 50, "400g", ["veg"], { calories: 265 }],
  ["Mother Dairy Curd", "dairy-bakery", 45, 50, "400g", ["veg"], { calories: 98, protein: 11 }],
  ["Amul Paneer", "dairy-bakery", 95, 110, "200g", ["veg"], { calories: 296, protein: 25 }],
  ["Eggs (12)", "dairy-bakery", 89, 99, "12pcs", ["non-veg"], { calories: 155, protein: 13 }],
  ["Lays Classic", "snacks", 20, 20, "52g", ["veg"], { calories: 536 }],
  ["Kurkure", "snacks", 20, 20, "85g", ["veg"], { calories: 530 }],
  ["Haldiram Bhujia", "snacks", 55, 60, "200g", ["veg"], { calories: 538 }],
  ["Parle-G Biscuit", "snacks", 10, 10, "100g", ["veg"], { calories: 460 }],
  ["Oreo Biscuits", "snacks", 30, 30, "120g", ["veg"], { calories: 480 }],
  ["Dark Fantasy", "snacks", 30, 35, "75g", ["veg"], { calories: 510 }],
  ["Coca Cola", "cold-drinks", 40, 45, "750ml", ["veg"], { calories: 42 }],
  ["Pepsi", "cold-drinks", 40, 45, "750ml", ["veg"], { calories: 41 }],
  ["Sprite", "cold-drinks", 40, 45, "750ml", ["veg"], { calories: 40 }],
  ["Real Mixed Fruit Juice", "beverages", 110, 120, "1L", ["veg"], { calories: 50 }],
  ["Tropicana Orange", "beverages", 110, 120, "1L", ["veg"], { calories: 45 }],
  ["Red Bull", "beverages", 125, 130, "250ml", ["veg"], { calories: 110 }],
  ["Aashirvaad Atta", "atta-rice-dal", 285, 320, "5kg", ["veg"], { calories: 340, protein: 12 }],
  ["India Gate Basmati Rice", "atta-rice-dal", 520, 580, "5kg", ["veg"], { calories: 360 }],
  ["Toor Dal", "atta-rice-dal", 175, 190, "1kg", ["veg"], { calories: 343, protein: 22 }],
  ["Moong Dal", "atta-rice-dal", 145, 160, "1kg", ["veg"], { calories: 347, protein: 24 }],
  ["Chana Dal", "atta-rice-dal", 125, 140, "1kg", ["veg"], { calories: 360 }],
  ["Fortune Sunflower Oil", "atta-rice-dal", 165, 180, "1L", ["veg"], { calories: 884 }],
  ["Tata Salt", "atta-rice-dal", 28, 30, "1kg", ["veg"], {}],
  ["Tata Sampann Sugar", "atta-rice-dal", 50, 55, "1kg", ["veg"], { calories: 387 }],
  ["Dove Soap", "personal-care", 65, 70, "100g", [], {}],
  ["Colgate MaxFresh", "personal-care", 95, 110, "150g", [], {}],
  ["Head & Shoulders", "personal-care", 199, 220, "340ml", [], {}],
  ["Dettol Handwash", "personal-care", 99, 110, "200ml", [], {}],
  ["Surf Excel", "home-cleaning", 230, 250, "1kg", [], {}],
  ["Vim Dishwash Liquid", "home-cleaning", 115, 130, "500ml", [], {}],
  ["Harpic Toilet Cleaner", "home-cleaning", 95, 110, "500ml", [], {}],
  ["Lizol Floor Cleaner", "home-cleaning", 155, 175, "975ml", [], {}],
  ["Cucumber", "fruits-vegetables", 25, 30, "500g", ["veg"], { calories: 16 }],
  ["Lemon", "fruits-vegetables", 30, 40, "250g", ["veg"], { calories: 29 }],
  ["Ginger", "fruits-vegetables", 35, 45, "250g", ["veg"], { calories: 80 }],
  ["Garlic", "fruits-vegetables", 49, 60, "250g", ["veg"], { calories: 149 }],
  ["Carrot", "fruits-vegetables", 35, 45, "500g", ["veg"], { calories: 41 }],
  ["Pomegranate", "fruits-vegetables", 145, 180, "1kg", ["veg","fruit"], { calories: 83 }],
  ["Mango Alphonso", "fruits-vegetables", 299, 350, "1kg", ["veg","fruit"], { calories: 60 }],
  ["Almonds", "snacks", 449, 499, "500g", ["veg"], { calories: 579, protein: 21 }],
  ["Cashews", "snacks", 499, 549, "500g", ["veg"], { calories: 553, protein: 18 }],
  ["Greek Yogurt", "dairy-bakery", 80, 90, "200g", ["veg"], { calories: 59, protein: 10 }],
  ["Brown Bread", "dairy-bakery", 55, 60, "400g", ["veg"], { calories: 247 }],
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
