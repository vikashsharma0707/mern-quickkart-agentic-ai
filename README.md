# QuickKart AI 🛒🤖

Production-ready Agentic AI Quick Commerce Platform (Blinkit-style) with 20+ autonomous AI agents, RAG, voice ordering, Razorpay payments, real-time delivery tracking, and full admin/delivery/customer panels.

## Stack
- **Frontend**: React (JSX), Vite, Redux Toolkit, React Router, Tailwind, Axios, Socket.IO client
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT (access + refresh), Multer, Socket.IO
- **AI**: OpenRouter API, in-memory RAG vector store (cosine similarity)
- **Payments**: Razorpay
- **DevOps**: Docker, docker-compose, Kubernetes manifests, GitHub Actions CI/CD

## Quick Start
```bash
# Backend
cd server
cp .env.example .env   # fill MONGO_URI, JWT secrets, OPENROUTER_API_KEY, RAZORPAY keys
npm install
npm run seed
npm run dev

# Frontend
cd ../client
cp .env.example .env
npm install
npm run dev
```

## Demo Credentials (after `npm run seed`)
- Admin: `admin@quickkart.ai` / `Admin@123`
- Customer: `user@quickkart.ai` / `User@123`
- Delivery: `delivery@quickkart.ai` / `Delivery@123`

## AI Agents (20)
chat-to-order, voice-to-order, whatsapp-ordering, grocery-planner, meal-planning,
festival-shopping, auto-reorder, budget-optimization, shopping-crew, smart-replacement,
family-shopping, emergency-shopping, inventory-prediction, personal-shopper,
smart-reminder, health-aware, seasonal, negotiation, autonomous, rag-qa

## Docker
```bash
docker-compose up --build
```

## Kubernetes
```bash
kubectl apply -f k8s/
```
