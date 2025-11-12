// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTimes, FaPaperPlane } from "react-icons/fa";

// const MessageModal = ({ show, onClose, assetType }) => {
//   const [message, setMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [sendSuccess, setSendSuccess] = useState(false);


// const handleSendMessage = async () => {
//   setIsSending(true);

//   try {
//   //   const res = await fetch("http://localhost:5000/whatsapp/send", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ to: "919989035270" }),
//   //   });

//   const res = await fetch("http://localhost:5000/whatsapp/send", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     to: "918247034575",
//     message, // ✅ send the typed text from textarea
//   }),
// })

//     const data = await res.json();

//     if (res.ok) {
//       setIsSending(false);
//       setSendSuccess(true);
//       console.log("WhatsApp API response:", data);

//       setTimeout(() => {
//         setSendSuccess(false);
//         onClose();
//       }, 3000);
//     } else {
//       alert("Failed to send: " + (data.error || "Unknown error"));
//       setIsSending(false);
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("Error sending message");
//     setIsSending(false);
//   }
// };


//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.95, y: 20 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-bold">Message {assetType} RI</h3>
//                 <button
//                   onClick={onClose}
//                   className="p-1 rounded-full hover:bg-white/20 transition-colors"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="p-5">
//               {sendSuccess ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-center py-8"
//                 >
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FaPaperPlane className="text-green-600 text-2xl" />
//                   </div>
//                   <h4 className="text-xl font-bold text-gray-800 mb-1">
//                     Message Sent!
//                   </h4>
//                   <p className="text-gray-600">The RI will respond soon.</p>
//                 </motion.div>
//               ) : (
//                 <>
//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-40"
//                     placeholder="Type your message here..."
//                   />
//                   <div className="mt-4 flex justify-end space-x-3">
//                     <button
//                       onClick={onClose}
//                       className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={!message.trim() || isSending}
//                       className={`px-4 py-2 rounded-lg text-white flex items-center transition-all ${
//                         !message.trim() || isSending
//                           ? "bg-blue-400 cursor-not-allowed"
//                           : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
//                       }`}
//                     >
//                       {isSending ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Sending...
//                         </>
//                       ) : (
//                         <>
//                           <FaPaperPlane className="mr-2" />
//                           Send Message
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MessageModal;


















import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const MessageModal = ({ show, onClose, assetType }) => {
  const [message, setMessage] = useState("Hello RI, please update your asset details soon.");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

const handleSendMessage = async () => {
  setIsSending(true);

  try {
    const res = await fetch("http://localhost:5000/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "919989035270", // recipient
        message: message.trim(), // ✅ only the typed text
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setIsSending(false);
      setSendSuccess(true);
      console.log("WhatsApp API response:", data);

      setTimeout(() => {
        setSendSuccess(false);
        setMessage(""); // clear textarea
        onClose();
      }, 3000);
    } else {
      alert("Failed to send: " + (data.error || "Unknown error"));
      setIsSending(false);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Error sending message");
    setIsSending(false);
  }
};

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Message {assetType} RI</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                <FaTimes />
              </button>
            </div>

            <div className="p-5">
              {sendSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPaperPlane className="text-green-600 text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">Message Sent!</h4>
                  <p className="text-gray-600">The RI will respond soon.</p>
                </div>
              ) : (
                <>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-40"
                    placeholder="Type your message here..."
                  />
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending}
                      className={`px-4 py-2 rounded-lg text-white flex items-center ${
                        !message.trim() || isSending
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 shadow-md"
                      }`}
                    >
                      {isSending ? "Sending..." : <><FaPaperPlane className="mr-2" /> Send Message</>}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
