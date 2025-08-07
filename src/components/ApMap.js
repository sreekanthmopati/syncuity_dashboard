import { useState, useRef, useEffect } from 'react';
import { FiMapPin } from 'react-icons/fi';

// District data with sample revenue and growth
const districts = [
    {
      name: "Visakhapatnam",
      left: 86.275,
      top: 30,
      revenue: 7.2,
      growth: 12.5,
      color: "emerald",
    },
    {
      name: "Guntur",
      left: 43.645,
      top: 52,
      revenue: 5.8,
      growth: 8.2,
      color: "blue",
    },
    {
      name: "Nellore",
      left: 56,
      top: 78,
      revenue: 4.2,
      growth: 6.7,
      color: "blue",
    },
    {
      name: "Krishna",
      left: 48,
      top: 43,
      revenue: 5.1,
      growth: 7.3,
      color: "blue",
    },
    {
      name: "East Godavari",
      left: 62,
      top: 28,
      revenue: 6.9,
      growth: 10.1,
      color: "emerald",
    },
    {
      name: "West Godavari",
      left: 54,
      top: 34,
      revenue: 5.5,
      growth: 7.0,
      color: "blue",
    },
    {
      name: "Chittoor",
      left: 42,
      top: 85,
      revenue: 3.7,
      growth: 5.2,
      color: "amber",
    },
    {
      name: "Kadapa",
      left: 44,
      top: 68,
      revenue: 3.2,
      growth: 4.5,
      color: "amber",
    },
    {
      name: "Kurnool",
      left: 25,
      top: 63,
      revenue: 4.9,
      growth: 6.8,
      color: "blue",
    },
    {
      name: "Anantapur",
      left: 18,
      top: 77,
      revenue: 4.1,
      growth: 5.9,
      color: "blue",
    },
    {
      name: "Srikakulam",
      left: 85,
      top: 12,
      revenue: 2.8,
      growth: 3.6,
      color: "amber",
    },
    {
      name: "Vizianagaram",
      left: 77,
      top: 22,
      revenue: 3.9,
      growth: 4.1,
      color: "amber",
    },
    {
      name: "Prakasam",
      left: 48,
      top: 63,
      revenue: 4.6,
      growth: 6.0,
      color: "blue",
    },
  ];
  

const ApMap = () => {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef();

  // Handle responsive positioning
  useEffect(() => {
    const handleResize = () => {
      if (activeDistrict && mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        setTooltipPosition({
          x: (rect.width * activeDistrict.left) / 100,
          y: (rect.height * activeDistrict.top) / 100,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeDistrict]);

  // Color mapping
  const colorClasses = {
    emerald: "bg-emerald-100 border-emerald-500 text-emerald-800",
    blue: "bg-blue-100 border-blue-500 text-blue-800",
    amber: "bg-amber-100 border-amber-500 text-amber-800",
  };

  return (
    <div className="relative w-full bg-gray-50 rounded-xl shadow-lg overflow-hidden p-4">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative w-full aspect-[4/5] max-w-5xl mx-auto"
      >
        {/* SVG Map */}
        <object
          data="/AP_map.svg"
          type="image/svg+xml"
          className="absolute inset-0 w-full h-full"
          aria-label="Andhra Pradesh Districts Map"
        >
          <img
            src="/AP_map.png"
            alt="Andhra Map Fallback"
            className="w-full h-full object-contain"
          />
        </object>

        {/* District Markers */}
        {districts.map((district) => (
          <div
            key={district.name}
            className={`absolute transition-all duration-300 z-10 transform -translate-x-1/2 -translate-y-1/2 ${
              activeDistrict?.name === district.name ? 'scale-125 z-20' : 'scale-100'
            }`}
            style={{
              left: `${district.left}%`,
              top: `${district.top}%`,
            }}
            onMouseEnter={() => {
              setActiveDistrict(district);
              if (mapRef.current) {
                const rect = mapRef.current.getBoundingClientRect();
                setTooltipPosition({
                  x: (rect.width * district.left) / 100,
                  y: (rect.height * district.top) / 100,
                });
              }
            }}
            onMouseLeave={() => setActiveDistrict(null)}
          >
            <div className="relative group">
              {/* Map Pin Icon */}
              <FiMapPin
                className={`w-5 h-5 md:w-6 md:h-6 drop-shadow-lg transition-transform ${
                  activeDistrict?.name === district.name
                    ? 'text-red-600 scale-110'
                    : `text-${district.color}-600`
                }`}
              />

              {/* Revenue Badge */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded-full border-2 shadow-md whitespace-nowrap text-xs md:text-sm ${
                  colorClasses[district.color]
                } ${
                  activeDistrict?.name === district.name
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                } transition-opacity duration-200`}
              >
                ₹{district.revenue} Cr
              </div>
            </div>
          </div>
        ))}

        {/* Detailed Tooltip */}
        {activeDistrict && (
          <div
            className="absolute z-30 p-4 bg-white rounded-lg shadow-xl border border-gray-200"
            style={{
              left: `${tooltipPosition.x + 20}px`,
              top: `${tooltipPosition.y - 60}px`,
              minWidth: '200px',
            }}
          >
            <h3 className="font-bold text-lg mb-1">{activeDistrict.name}</h3>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-semibold">₹{activeDistrict.revenue} Crores</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth:</span>
              <span
                className={`font-semibold ${
                  activeDistrict.growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {activeDistrict.growth >= 0 ? '↑' : '↓'} {Math.abs(activeDistrict.growth)}%
              </span>
            </div>
            <div className="mt-2 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
              Revenue Trend Chart
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="flex justify-center mt-4 flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
          <span>High Revenue (&gt; 6 Cr)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>Medium Revenue (4–6 Cr)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
          <span>Low Revenue (&lt; 4 Cr)</span>
        </div>
      </div>
    </div>
  );
};

export default ApMap;