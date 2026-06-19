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
// app.use(helmet({ crossOriginResourcePolicy: false }));
// // app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// const io = new Server(server, {
//   cors: {
//     origin: [
//       methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// app.use(express.json({ limit: "10mb" }));
// app.use(morgan("dev"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/api/health", (_req, res) => res.json({ ok: true, service: "quickkart-ai" }));
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




// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🛒🚀 QuickKart AI Backend is Live",
//     version: "1.0.0",
//     health: "/api/health",
   
//     }
//   });
// });



// // Routes
// app.use('/api/chat', chatRoutes);

// app.use(errorHandler);

// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });
// initSockets(io);
// app.set("io", io);

// const PORT = process.env.PORT || 5000;
// connectDB().then(() => server.listen(PORT, () => console.log(`QuickKart API on :${PORT}`)));






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

// ===================== CORS CONFIG =====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mern-quickkart-agentic-om5bw47yc.vercel.app/",
  "https://mern-quickkart-agentic-om5bw47yc.vercel.app",   // ← Aapka current frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health Check
app.get("/api/health", (_req, res) => 
  res.json({ ok: true, service: "quickkart-ai" })
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
    version: "1.0.0"
  });
});

app.use(errorHandler);

// Create Server
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

initSockets(io);
app.set("io", io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 QuickKart API running on port :${PORT}`);
  });
});