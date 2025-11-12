import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const BulkMessage = ({ show, onClose, recipients = [] }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || recipients.length === 0) {
      alert("Please add at least one recipient.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("http://localhost:5000/whatsapp/sendBulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients, // ✅ dynamically passed from props
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ WhatsApp API response:", data);
        setSendSuccess(true);
        setMessage("");

        setTimeout(() => {
          setSendSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("❌ Failed to send: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message");
    } finally {
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
          className="fixed inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center p-3"
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
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Message All RIs</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              {sendSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaPaperPlane className="text-green-600 text-xl" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-gray-600">
                    All selected RIs have received your message.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Recipient Preview */}
                  <div className="mb-2 text-xs text-gray-500">
                    Sending to:{" "}
                    {recipients.length > 0 ? (
                      <span className="font-medium text-gray-700">
                        {recipients.join(", ")}
                      </span>
                    ) : (
                      <span className="text-red-500">No recipients selected</span>
                    )}
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32"
                    placeholder="Type your message to all RIs..."
                  />

                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={onClose}
                      className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending || recipients.length === 0}
                      className={`px-3 py-1 rounded-lg text-white flex items-center transition-all text-sm ${
                        !message.trim() || isSending || recipients.length === 0
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {isSending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-1" />
                          Send to All
                        </>
                      )}
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

export default BulkMessage;

