import { FiBriefcase, FiCreditCard, FiFileText, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from "framer-motion";

// Track which statuses have already been used
const usedStatusTypes = new Set();

const generateUpdateStatus = (assetId) => {
  // Seed random based on asset ID for consistency
  const seed = Array.from(assetId).reduce((hash, char) => char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash, 0);
  const pseudoRandom = (Math.sin(seed) + 1) / 2;

  const now = new Date();
  const statusTypes = [
    {
      name: 'Recent',
      maxDays: 2,
      color: 'from-green-600 to-green-800',
      icon: <FiCheckCircle className="text-green-300 text-sm" />
    },
    {
      name: 'Stale',
      minDays: 3,
      maxDays: 7,
      color: 'from-blue-600 to-blue-800',
      icon: <FiAlertCircle className="text-blue-300 text-sm" />
    },
    {
      name: 'Outdated',
      minDays: 8,
      maxDays: 14,
      color: 'from-amber-600 to-amber-800',
      icon: <FiAlertTriangle className="text-amber-300 text-sm" />
    }
  ];

  // Force usage of all 3 types at least once
  let status;
  const remainingTypes = statusTypes.filter(s => !usedStatusTypes.has(s.name));
  if (remainingTypes.length > 0) {
    // Pick one from unused
    status = remainingTypes[0];
    usedStatusTypes.add(status.name);
  } else {
    // Fallback to original probability
    if (pseudoRandom < 0.6) {
      status = statusTypes[0];
    } else if (pseudoRandom < 0.9) {
      status = statusTypes[1];
    } else {
      status = statusTypes[2];
    }
  }

  // Generate random days within the selected status's range
  const daysAgo = status.minDays !== undefined
    ? status.minDays + Math.floor(pseudoRandom * (status.maxDays - status.minDays))
    : Math.floor(pseudoRandom * (status.maxDays + 1));

  const lastUpdated = new Date(now);
  lastUpdated.setDate(now.getDate() - daysAgo);

  let displayText;
  if (daysAgo === 0) {
    displayText = 'Today';
  } else if (daysAgo === 1) {
    displayText = 'Yesterday';
  } else {
    displayText = `${daysAgo} days ago`;
  }

  return {
    ...status,
    date: lastUpdated,
    formattedDate: lastUpdated.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    daysAgo,
    displayText
  };
};


const AssetHeader = ({ asset, setShowMessageForm }) => {
  const updateStatus = generateUpdateStatus(asset.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-gradient-to-r ${updateStatus.color} p-3 rounded-lg mb-4 shadow-lg border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3`}
    >
      {/* Left Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/10 rounded-md backdrop-blur-sm border border-white/10">
            <FiBriefcase className="text-white text-base" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              {asset.type}
              <span className="text-blue-100 font-mono ml-1.5 opacity-90 text-sm">#{asset.id}</span>
            </h1>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <div className="bg-white/15 backdrop-blur-sm px-2 py-1 rounded-md text-white text-xs font-medium flex items-center gap-1 border border-white/10">
                <FiCreditCard className="opacity-80 text-xs" />
                <span>PAN:</span>
                <span className="font-mono">{asset.pan || 'N/A'}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-2 py-1 rounded-md text-white text-xs font-medium flex items-center gap-1 border border-white/10">
                <FiFileText className="opacity-80 text-xs" />
                <span>GST:</span>
                <span className="font-mono">{asset.gst || 'N/A'}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-2 py-1 rounded-md text-white text-xs font-medium flex items-center gap-1 border border-white/10">
                {updateStatus.icon}
                <span>Updated:</span>
                <span className="font-mono">{updateStatus.formattedDate}</span>
                <span className="hidden sm:inline">({updateStatus.displayText})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Button */}
      <motion.button
        onClick={() => setShowMessageForm(true)}
        whileHover={{ 
          scale: 1.03,
          backgroundColor: 'rgba(255,255,255,0.25)'
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="flex-shrink-0 flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200 shadow-md hover:shadow-lg border border-white/20 text-xs sm:text-sm"
      >
        <FaPaperPlane className="mr-1.5 text-xs sm:text-sm" />
        <span className="font-medium">Message RI</span>
      </motion.button>
    </motion.div>
  );
};

export default AssetHeader;