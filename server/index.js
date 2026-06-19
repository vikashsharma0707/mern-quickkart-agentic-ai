require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const initSockets = require("./sockets");
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "quickkart-ai" }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/delivery", require("./routes/delivery.routes"));
app.use("/api/ai", require("./routes/ai.routes"));




app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🛒🚀 QuickKart AI Backend is Live",
    version: "1.0.0",
    health: "/api/health",
    docs: {
      auth: "/api/auth",
      users: "/api/users",
      products: "/api/products",
      categories: "/api/categories",
      cart: "/api/cart",
      orders: "/api/orders",
      payments: "/api/payments",
      delivery: "/api/delivery",
      reviews: "/api/reviews",
      wishlist: "/api/wishlist",
      notifications: "/api/notifications",

      ai: {
        chat: "/api/ai/chat",
        voiceOrder: "/api/ai/voice-order",
        groceryPlanner: "/api/ai/grocery-planner",
        mealPlanner: "/api/ai/meal-planner",
        autoReorder: "/api/ai/auto-reorder",
        smartReplacement: "/api/ai/smart-replacement",
        budgetOptimizer: "/api/ai/budget-optimizer",
        festivalShopping: "/api/ai/festival-shopping",
        personalShopper: "/api/ai/personal-shopper",
        ragQA: "/api/ai/rag-qa"
      },

      admin: {
        dashboard: "/api/admin/dashboard",
        analytics: "/api/admin/analytics",
        inventory: "/api/admin/inventory",
        users: "/api/admin/users",
        orders: "/api/admin/orders"
      }
    }
  });
});



// Routes
app.use('/api/chat', chatRoutes);

app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
initSockets(io);
app.set("io", io);

const PORT = process.env.PORT || 5000;
connectDB().then(() => server.listen(PORT, () => console.log(`QuickKart API on :${PORT}`)));
