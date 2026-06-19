// import { useState } from "react";
// import ChatToOrder from "../ai/ChatToOrder";

// export default function FloatingChat() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95"
//       >
//         <span className="text-3xl">💬</span>
//       </button>

//       {/* Chat Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-3xl h-[85vh] md:h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
//             {/* Modal Header */}
//             <div className="bg-green-700 text-white p-5 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="text-3xl">🤖</div>
//                 <div>
//                   <h3 className="font-bold text-xl">QuickKart AI</h3>
//                   <p className="text-green-100 text-sm">Order in seconds</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="text-3xl leading-none hover:text-green-200"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Chat Content */}
//             <div className="flex-1 overflow-hidden">
//               <ChatToOrder />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import { useState } from "react";
import { useSelector } from "react-redux";
import ChatToOrder from "../ai/ChatToOrder";

export default function FloatingChat() {
  const user = useSelector((s) => s.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  // Sirf Customer ke liye show karo
  if (!user || (user.role !== "customer" && user.role !== "user")) {
    return null;
  }

  return (
    <>
      {/* Floating Button - Green Circle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95"
      >
        <span className="text-3xl">💬</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="bg-green-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤖</div>
                <div>
                  <h3 className="font-bold text-xl">QuickKart AI</h3>
                  <p className="text-green-100 text-sm">Order in your language</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-4xl leading-none hover:text-green-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <ChatToOrder />
            </div>
          </div>
        </div>
      )}
    </>
  );
}