import ChatToOrder from "./ChatToOrder";

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">🤖 QuickKart AI Assistant</h1>
          <p className="text-gray-600 text-lg">
            Boliye ya type kijiye — turant order ready!
          </p>
        </div>

        <ChatToOrder />
      </div>
    </div>
  );
}