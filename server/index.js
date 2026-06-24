



// require("dotenv").config();
// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const path = require("path");
// const { Server } = require("socket.io");

// const connectDB = require("./config/db");
// const errorHandler = require("./middleware/errorHandler");
// const initSockets = require("./sockets");
// const chatRoutes = require('./routes/chatRoutes');

// const app = express();

// // ===================== CORS CONFIGURATION =====================
// const allowedOrigins = [
//   "http://localhost:5173",      // Dev frontend
//   "http://localhost:3000",      // Alternative dev port
//   "https://yourdomain.com",     // Production frontend (update this)
//   "https://www.yourdomain.com"  // Production with www
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps, curl requests)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   credentials: true              // ← Allow credentials (cookies, auth headers)
// }));

// app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(express.json({ limit: "10mb" }));
// app.use(morgan("dev"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Health Check
// app.get("/api/health", (_req, res) => 
//   res.json({ ok: true, service: "quickkart-ai" })
// );

// // Routes
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/products", require("./routes/product.routes"));
// app.use("/api/categories", require("./routes/category.routes"));
// app.use("/api/cart", require("./routes/cart.routes"));
// app.use("/api/orders", require("./routes/order.routes"));
// app.use("/api/payments", require("./routes/payment.routes"));
// app.use("/api/admin", require("./routes/admin.routes"));
// app.use("/api/delivery", require("./routes/delivery.routes"));
// app.use("/api/ai", require("./routes/ai.routes"));
// app.use('/api/chat', chatRoutes);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🛒🚀 QuickKart AI Backend is Live",
//     version: "1.0.0"
//   });
// });

// app.use(errorHandler);

// // Create Server
// const server = http.createServer(app);

// // Socket.IO with specific origins
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,  // ← Use specific origins
//     methods: ["GET", "POST"],
//     credentials: true         // ← Allow credentials
//   }
// });

// initSockets(io);
// app.set("io", io);

// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log(`🚀 QuickKart API running on port :${PORT}`);
//   });
// });





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

// ===================== DYNAMIC CORS FOR PRODUCTION =====================
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL || "https://yourdomain.com",
      process.env.FRONTEND_WWW_URL || "https://www.yourdomain.com"
    ]
  : [
      "http://localhost:5173",
      "http://localhost:3000"
    ];

console.log("🌍 Allowed Origins:", allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health Check
app.get("/api/health", (_req, res) => 
  res.json({ 
    ok: true, 
    service: "quickkart-ai",
    env: process.env.NODE_ENV 
  })
);

// Routes
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
app.use('/api/chat', chatRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🛒🚀 QuickKart AI Backend is Live",
    version: "1.0.0",
    environment: process.env.NODE_ENV
  });
});

app.use(errorHandler);

// Create Server
const server = http.createServer(app);

// Socket.IO with dynamic origins
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

initSockets(io);
app.set("io", io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 QuickKart API running on port :${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch(err => {
  console.error("❌ Database connection failed:", err);
  process.exit(1);
});