

import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SideTagPanel = () => {
  // ... (keep all existing state and effect hooks unchanged)
  const [isOpen, setIsOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const panelRef = useRef(null);

  const [staleAssets, setStaleAssets] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
    const fetchStaleAssets = async () => {
      try {
        // const res = await fetch('http://localhost:5000/dumphistory/outdated?days=3'); // Your backend route
        const res = await fetch('https://analytics-api-4422.onrender.com/dumphistory/outdated?days=3');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setStaleAssets(data);
        console.log(data)
      } catch (err) {
        console.error(err);
        setError('Error fetching stale assets.');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isOpen) fetchStaleAssets();
  }, [isOpen]);
  
  

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const [isMounted, setIsMounted] = useState(false);

  // Add this useEffect for the delayed mount animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000); // 1 second delay before appearing
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  // Enhanced getPanelStyle with better visual parameters
  const getPanelStyle = () => {
    const isMobile = windowSize.width < 640;
    const maxWidth = isMobile ? windowSize.width * 0.95 : 350; // Slightly wider panel
    const maxHeight = windowSize.height * 0.7;
    
    return {
      panel: {
        width: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        right: isMobile ? '8px' : '24px',
        bottom: isMobile ? '72px' : 'auto',
        top: isMobile ? 'auto' : '50%',
        transform: isMobile ? 'none' : 'translateY(-50%)'
      },
      tag: {
        width: isMobile ? '52px' : '60px', // Slimmer vertical tag
        height: isMobile ? '120px' : '140px', // Taller for better vertical text
        fontSize: isMobile ? '0.8rem' : '0.9rem'
      }
    };
  };

  const { panel } = getPanelStyle();

  // Portal content
  const panelContent = (
    <div
      ref={panelRef}
      className="fixed z-[49]"
      style={{
        right: '0',
        bottom: panel.bottom,
        top: panel.top,
        transform: panel.transform
      }}
    >
      {/* Wrap the tag button in AnimatePresence and add entrance animation */}
  


<AnimatePresence>
  {isMounted && (
    <motion.div
      initial={{ x: '100%', y: windowSize.width < 640 ? '100%' : 0 }}
      animate={{
        x: 0,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      }}
      exit={{ x: '100%', y: windowSize.width < 640 ? '100%' : 0 }}
    >
      <motion.div
        animate={{
          backgroundColor: isOpen ? 'rgba(244, 114, 182, 0.15)' : 'rgba(236, 72, 153, 0.08)',
          boxShadow: isOpen
            ? '0 0 0 2px rgba(251, 207, 232, 0.6), 0 3px 10px rgba(236, 72, 153, 0.25)'
            : '0 1px 4px rgba(236, 72, 153, 0.08)'
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 24,
          backgroundColor: { duration: 0.3 }
        }}
        className="flex items-center justify-center cursor-pointer rounded-l-xl relative group overflow-hidden"
        style={{
          width:
            windowSize.width > 1600 ? '44px' :
            windowSize.width > 1280 ? '40px' :
            windowSize.width > 768 ? '36px' : '32px',
          height:
            windowSize.width > 1600 ? '140px' :
            windowSize.width > 1280 ? '125px' :
            windowSize.width > 768 ? '115px' : '105px'
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{
          backgroundColor: 'rgba(244, 114, 182, 0.18)',
          boxShadow: '0 0 0 2px rgba(251, 207, 232, 0.8), 0 4px 15px rgba(236, 72, 153, 0.25)'
        }}
        whileTap={{
          scale: 0.97,
          boxShadow: '0 0 0 3px rgba(251, 207, 232, 0.9)'
        }}
      >
        {/* Gradient + Glow Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-400/20 to-pink-600/20 backdrop-blur-[2px] rounded-l-xl border border-rose-300/30 shadow-inner" />

        {/* Text */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="transform rotate-90 origin-center whitespace-nowrap">
            <motion.span
              className="px-3 py-1.5 rounded-md flex items-center gap-2"
              style={{
                fontSize:
                  windowSize.width > 1600 ? '0.9rem' :
                  windowSize.width > 1280 ? '0.82rem' :
                  windowSize.width > 768 ? '0.75rem' : '0.7rem',
                background: 'linear-gradient(to right, #ec4899, #db2777)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 6px rgba(236, 72, 153, 0.3)',
                fontWeight: 600,
                backdropFilter: 'blur(5px)'
              }}
              whileHover={{
                background: 'linear-gradient(to right, #db2777, #be185d)',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                scale: 1.06
              }}
            >
              <div className="flex items-center gap-2 relative">
                {/* Brain/AI Analytics PNG Icon with refined animation */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1.3, 1.15, 1.3],
                    rotate: [0, 1.5, -1.5, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src="/ai_brain.png" 
                    alt="AI Analytics Brain Icon"
                    className="object-contain"
                    style={{ 
                      width: '20px',
                      height: '20px',
                      imageRendering: 'crisp-edges',
                      minWidth: '20px',
                      minHeight: '20px',
                      opacity: 1,
                      filter: 'brightness(0) invert(1)'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                    }}
                    onLoad={(e) => {
                      console.log('Brain icon loaded - dimensions:', e.target.naturalWidth, 'x', e.target.naturalHeight);
                    }}
                  />
                  {/* Subtle glow effect behind the icon */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white blur-[6px] opacity-0"
                    animate={{ opacity: [0, 0.25, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                  />
                </motion.div>

                {/* ANALYTICS text - now white */}
                <span className="text-white tracking-wide font-bold">
                  ANALYTICS
                </span>
              </div>
            </motion.span>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            opacity: isOpen ? 1 : 0.8,
            color: isOpen ? '#ffffff' : '#f9a8d4',
            scale: isOpen ? 1.12 : 1
          }}
          transition={{ type: 'spring', stiffness: 600 }}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className="w-4 h-4 drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Enhanced Panel Content */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute right-full top-0 mr-2 bg-white rounded-xl shadow-2xl border border-gray-200"
      style={{
        width: panel.width,
        maxHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sleeker Panel Header */}
     {/* Sleeker Panel Header */}
<div className="px-3 py-2 sm:px-4 sm:py-2.5 border-b border-pink-100/50 bg-gradient-to-r from-pink-600 to-rose-500 flex-shrink-0">
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">AI Asset Analysis</h3>
    </div>
    <button 
      onClick={() => setIsOpen(false)}
      className="text-white/80 hover:text-white transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <p className="text-pink-100/80 text-xs mt-0.5 ml-8 sm:ml-10">Real-time monitoring of your digital assets</p>
</div>


      {/* Scrollable Panel Body (unchanged) */}
      <div
        className="p-4 sm:p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300"
        style={{
          flex: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: '#fb7185 transparent',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h4 className="font-medium sm:font-semibold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3 flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Stale Assets (Last 3 Days)
            </h4>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-2 sm:space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-pink-500"></div>
                <p className="text-gray-500 text-sm">Analyzing your assets...</p>
              </div>
            )}

            {error && (
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {!isLoading && !error && staleAssets.length === 0 && (
              <div className="p-2 sm:p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">All assets are up to date!</span>
              </div>
            )}

            <ul className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
              {staleAssets.slice(0, 5).map((asset, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-pink-50 transition-colors"
                >
                  <span className="flex-shrink-0 bg-pink-100 text-pink-600 rounded-full p-1 sm:p-2 mr-2 sm:mr-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium sm:font-semibold text-gray-800 truncate">{asset.asset_name}</p>
                    {asset.last_updated && (
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Last updated: {new Date(asset.last_updated).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer with Close Button */}
      <div className="p-4 sm:p-5 border-t border-gray-100 flex-shrink-0">
        <motion.button
          onClick={() => setIsOpen(false)}
          className="w-full py-2 px-4 sm:py-2.5 sm:px-5 bg-white text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm hover:shadow flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm sm:text-base font-medium">Close</span>
        </motion.button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );

  return createPortal(panelContent, document.body);
};

export default SideTagPanel;












































