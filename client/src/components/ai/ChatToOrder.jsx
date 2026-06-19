




import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ChatToOrder() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Namaste! 👋 Kya order karna hai aaj? Boliye jaise '5kg rice order kar do'" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { type: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await api.post("/chat/chat", { message: userMsg });
      const result = data.data || data;

      setMessages(prev => [...prev, { 
        type: "bot", 
        text: result.reply || "Samajh gaya!" 
      }]);

      // Handle Cart Update
      if (result.cartUpdated && result.addedItems?.length > 0) {
        toast.success(`✅ ${result.addedItems.length} item cart mein add ho gaya!`, {
          duration: 2500,
        });
      }

      // Handle Order + Payment
      if (result.orderCreated) {
        if (result.needsRazorpay || result.paymentMethod === "online") {
          toast.loading("Razorpay opening...", { id: "razorpay" });
          await handleRazorpayPayment(result.orderId);
        } else if (result.paymentMethod === "cod") {
          toast.success("🎉 Order COD ke saath confirm ho gaya!", { duration: 5000 });
        }
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: "Sorry bhai, abhi thoda issue hai. Phir se try karo." 
      }]);
      toast.error("Kuch issue ho gaya");
    } finally {
      setLoading(false);
    }
  };

  // Razorpay Payment Handler
  const handleRazorpayPayment = async (orderId) => {
    try {
      const { data } = await api.post(`/payments/razorpay/${orderId}`);
      const rzp = data.data;

      const options = {
        key: rzp.key,
        amount: rzp.amount,
        currency: rzp.currency,
        name: "QuickKart AI",
        description: `Order #${orderId.slice(-8)}`,
        order_id: rzp.id,
        handler: async (response) => {
          await api.post("/payments/verify", {
            orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("🎉 Payment Successful! Order Confirmed.", { duration: 6000 });
        },
        prefill: {
          name: "User",
          email: "user@quickkart.ai",
        },
        theme: { color: "#15803d" },
      };

      if (window.Razorpay) {
        const rzpInstance = new window.Razorpay(options);
        rzpInstance.open();
      } else {
        toast.error("Razorpay script not loaded");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 text-white p-5 flex items-center gap-3">
        <div className="text-3xl">🤖</div>
        <div>
          <h3 className="font-bold text-xl">QuickKart AI</h3>
          <p className="text-green-100 text-sm">Instant • Smart • Voice Ready</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[15.5px] leading-relaxed shadow-sm
              ${msg.type === "user" 
                ? "bg-green-600 text-white rounded-br-none" 
                : "bg-white border border-gray-100 rounded-bl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-3 rounded-3xl shadow-sm flex gap-1.5">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-5 border-t bg-white">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="5kg rice order kar do..."
            className="input flex-1 py-4 text-base focus:ring-green-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="btn btn-primary px-10 font-medium disabled:opacity-70"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}