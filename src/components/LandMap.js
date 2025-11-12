import { MapContainer, GeoJSON, Marker, useMapEvents } from "react-leaflet";
import { useRef } from "react";
import L from "leaflet";
import apDistrictsGeoJson from "../data/andhra-pradesh.json";
import { useNavigate } from "react-router-dom";

const LandMap = ({ isPreview }) => {
  const navigate = useNavigate();

  const goToLandDetails = () => navigate("/land-management/landdetails");
  const goBack = () => navigate(-1);

  const center = [16.5, 80.6];
  const popupRefs = useRef({});
  const districtPopupRef = useRef(null);

const landParcels = [
  { 
    id: 1, 
    position: [16.5, 80.6], 
    surveyNo: "SY-2024-001", 
    owner: "Rajesh Kumar", 
    size: "2.5 acres", 
    district: "Krishna", 
    village: "Machilipatnam",
    mandal: "Machilipatnam",
    assetType: "Agricultural Land",
    status: "Verified" 
  },
  { 
    id: 2, 
    position: [15.8, 80.4], 
    surveyNo: "SY-2024-002", 
    owner: "Priya Sharma", 
    size: "1.8 acres", 
    district: "Guntur", 
    village: "Tenali",
    mandal: "Tenali",
    assetType: "Residential Plot",
    status: "Pending" 
  },
  { 
    id: 3, 
    position: [16.3, 80.4], 
    surveyNo: "SY-2024-003", 
    owner: "Suresh Reddy", 
    size: "3.2 acres", 
    district: "Krishna", 
    village: "Vijayawada",
    mandal: "Vijayawada",
    assetType: "Commercial Land",
    status: "Verified" 
  },
  { 
    id: 4, 
    position: [14.8, 79.9], 
    surveyNo: "SY-2024-004", 
    owner: "Anita Rani", 
    size: "2.0 acres", 
    district: "Prakasam", 
    village: "Ongole",
    mandal: "Ongole",
    assetType: "Industrial Plot",
    status: "Pending" 
  },
  { 
    id: 5, 
    position: [17.7, 83.3], 
    surveyNo: "SY-2024-005", 
    owner: "Vikram Singh", 
    size: "1.5 acres", 
    district: "Visakhapatnam", 
    village: "Anakapalle",
    mandal: "Anakapalle",
    assetType: "Residential Plot",
    status: "Verified" 
  },
  { 
    id: 6, 
    position: [18.3, 83.9], 
    surveyNo: "SY-2024-006", 
    owner: "Meena Reddy", 
    size: "4.0 acres", 
    district: "Srikakulam", 
    village: "Palasa",
    mandal: "Palasa",
    assetType: "Agricultural Land",
    status: "Pending" 
  },
  { 
    id: 7, 
    position: [15.9, 80.1], 
    surveyNo: "SY-2024-007", 
    owner: "Ramesh Babu", 
    size: "2.8 acres", 
    district: "Guntur", 
    village: "Bapatla",
    mandal: "Bapatla",
    assetType: "Commercial Land",
    status: "Verified" 
  },
 
  { 
    id: 9, 
    position: [16.9, 82.2], 
    surveyNo: "SY-2024-009", 
    owner: "Kiran Kumar", 
    size: "1.2 acres", 
    district: "West Godavari", 
    village: "Eluru",
    mandal: "Eluru",
    assetType: "Residential Plot",
    status: "Verified" 
  },
  { 
    id: 10, 
    position: [17.2, 82.5], 
    surveyNo: "SY-2024-010", 
    owner: "Deepa Reddy", 
    size: "2.3 acres", 
    district: "West Godavari", 
    village: "Tadepalligudem",
    mandal: "Tadepalligudem",
    assetType: "Agricultural Land",
    status: "Pending" 
  }
];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Under Review': return '#3b82f6';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Enhanced vibrant district colors with better contrast
const districtColors = [
  "#1E3A8A", // shiny dark blue
  "#065F46", // dark green
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46",
  "#1E3A8A",
  "#065F46"
];




  const getDistrictColor = (name) => {
    if (!name) return "#FF6B6B";
    const index = name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % districtColors.length;
    return districtColors[index];
  };

  // Function to get district name from feature properties
  const getDistrictName = (feature) => {
    if (!feature?.properties) return "Unknown District";
    return (
      feature.properties.district || 
      feature.properties.DISTRICT || 
      feature.properties.name || 
      feature.properties.NAME_1 || 
      "Unknown District"
    );
  };

  // Get district statistics
  const getDistrictStats = (districtName) => {
    const districtAssets = landParcels.filter(p => p.district === districtName);
    const totalSize = districtAssets.reduce((sum, asset) => {
      const size = parseFloat(asset.size) || 0;
      return sum + size;
    }, 0);
    
    return {
      assetCount: districtAssets.length,
      totalSize: totalSize.toFixed(1),
      verifiedCount: districtAssets.filter(p => p.status === 'Verified').length,
      pendingCount: districtAssets.filter(p => p.status === 'Pending').length
    };
  };

  const createCustomIcon = (status) => {
    const statusColor = getStatusColor(status);
    return L.divIcon({
      html: `
        <div class="custom-marker" style="--marker-color: ${statusColor}">
          <div class="marker-shadow"></div>
          <div class="marker-pin"></div>
          <div class="marker-pulse"></div>
          <div class="marker-glow"></div>
        </div>
      `,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      className: "custom-location-marker"
    });
  };

  const onEachDistrict = (feature, layer) => {
    const districtName = getDistrictName(feature);
    const baseColor = getDistrictColor(districtName);
    const stats = getDistrictStats(districtName);

    layer.setStyle({
      fillColor: baseColor,
      fillOpacity: 0.8,
      weight: 2,
      color: '#ffffff',
      dashArray: '3, 3',
      lineCap: 'round',
      lineJoin: 'round'
    });

    layer.on({
      mouseover: () => {
        // Close previous popup
        if (districtPopupRef.current) {
          districtPopupRef.current._map.closePopup(districtPopupRef.current);
          districtPopupRef.current = null;
        }

        layer.setStyle({
          fillOpacity: 0.95,
          weight: 4,
          color: "#ffd700",
          dashArray: '',
          className: "district-hover"
        });

        const centroid = layer.getBounds().getCenter();

        const popup = L.popup({
          closeButton: false,
          autoClose: false,
          closeOnClick: false,
          className: "district-hover-popup",
          offset: [0, -10],
          maxWidth: 280
        })
        .setLatLng(centroid)
        .setContent(`
          <div class="district-popup-content" style="--district-color: ${baseColor}">
            <div class="popup-header">
              <div class="district-name">${districtName}</div>
              <div class="district-stats-brief">
                <span class="stat-badge">${stats.assetCount} Assets</span>
                <span class="stat-badge">${stats.totalSize} acres</span>
              </div>
            </div>
            <div class="popup-body">
              <div class="stat-grid">
                <div class="stat-item">
                  <div class="stat-icon">📊</div>
                  <div class="stat-info">
                    <div class="stat-label">Total Assets</div>
                    <div class="stat-value">${stats.assetCount}</div>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">📐</div>
                  <div class="stat-info">
                    <div class="stat-label">Total Size</div>
                    <div class="stat-value">${stats.totalSize} acres</div>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">✅</div>
                  <div class="stat-info">
                    <div class="stat-label">Verified</div>
                    <div class="stat-value">${stats.verifiedCount}</div>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">⏳</div>
                  <div class="stat-info">
                    <div class="stat-label">Pending</div>
                    <div class="stat-value">${stats.pendingCount}</div>
                  </div>
                </div>
              </div>
              <button class="view-district-btn" onclick="console.log('View district: ${districtName}')">
                View District Details
              </button>
            </div>
          </div>
        `)
        .openOn(layer._map);

        districtPopupRef.current = popup;
      },
      mouseout: () => {
        layer.setStyle({
          fillColor: baseColor,
          fillOpacity: 0.8,
          weight: 2,
          color: "#ffffff",
          dashArray: '3, 3'
        });

        if (districtPopupRef.current) {
          layer._map.closePopup(districtPopupRef.current);
          districtPopupRef.current = null;
        }
      }
    });
  };

  const MapEventHandler = () => {
    useMapEvents({
      click: () => {
        Object.values(popupRefs.current).forEach(p => p._map && p._map.closePopup(p));
        if (districtPopupRef.current) {
          districtPopupRef.current._map.closePopup(districtPopupRef.current);
          districtPopupRef.current = null;
        }
      }
    });
    return null;
  };

  return (
    <>
      <style>{`
        /* Enhanced map container */
        .leaflet-container {
       background: linear-gradient(135deg, #ffffff 0%, #ffe6f0 100%) !important;


          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* District styling */
        .district-hover { 
          transform: scale(1.02); 
          filter: drop-shadow(0 8px 20px rgba(255, 215, 0, 0.4)) brightness(1.1) saturate(1.2); 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }
        
        /* Enhanced custom markers */
        .custom-marker { 
          position: relative; 
          width: 28px; 
          height: 36px; 
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
          z-index: 500;
        }
        
        .custom-marker:hover { 
          transform: scale(1.4) translateY(-6px); 
          z-index: 1000; 
        }
        
        .marker-shadow {
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 16px;
          height: 6px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          transform: translateX(-50%);
          filter: blur(3px);
        }
        
        .marker-pin { 
          position: absolute; 
          top: 0; 
          left: 50%; 
          width: 22px; 
          height: 22px; 
          background: linear-gradient(135deg, var(--marker-color) 0%, color-mix(in srgb, var(--marker-color) 70%, black) 100%); 
          border-radius: 50% 50% 50% 0; 
          transform: translateX(-50%) rotate(-45deg); 
          border: 3px solid #ffffff; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.3);
        }
        
        .marker-pulse { 
          position: absolute; 
          top: 2px; 
          left: 50%; 
          width: 18px; 
          height: 18px; 
          background: var(--marker-color); 
          opacity: 0.6;
          border-radius: 50%; 
          animation: pulse 2s infinite; 
          transform: translateX(-50%); 
        }
        
        .marker-glow {
          position: absolute;
          top: -6px;
          left: 50%;
          width: 36px;
          height: 36px;
          background: radial-gradient(circle, var(--marker-color) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0.3;
          transform: translateX(-50%);
          animation: glow 3s infinite alternate;
        }
        
        @keyframes pulse { 
          0% { transform: translateX(-50%) scale(1); opacity: 0.6; } 
          50% { transform: translateX(-50%) scale(1.6); opacity: 0.2; } 
          100% { transform: translateX(-50%) scale(2.2); opacity: 0; } 
        }
        
        @keyframes glow {
          0% { opacity: 0.2; transform: translateX(-50%) scale(1); }
          100% { opacity: 0.4; transform: translateX(-50%) scale(1.1); }
        }
        
        /* Enhanced district popup */
        .district-hover-popup .leaflet-popup-content-wrapper {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 0 0 2px var(--district-color),
            0 0 15px var(--district-color);
          padding: 0;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: none;
          max-width: 280px;
        }
        
        .district-popup-content {
          padding: 0;
          margin: 0;
        }
        
        .popup-header {
          background: linear-gradient(135deg, var(--district-color) 0%, color-mix(in srgb, var(--district-color) 80%, white) 100%);
          padding: 16px;
          position: relative;
          overflow: hidden;
        }
        
        .popup-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }
        
        .district-name {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          text-align: center;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        
        .district-stats-brief {
          display: flex;
          justify-content: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }
        
        .stat-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .popup-body {
          padding: 16px;
          background: #ffffff;
        }
        
        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        
        .stat-icon {
          font-size: 14px;
          flex-shrink: 0;
        }
        
        .stat-info {
          flex: 1;
        }
        
        .stat-label {
          font-size: 10px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stat-value {
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
        }
        
        .view-district-btn {
          width: 100%;
          padding: 10px 16px;
          background: linear-gradient(135deg, var(--district-color) 0%, color-mix(in srgb, var(--district-color) 80%, black) 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .view-district-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        /* Compact marker popup */
 .marker-popup .leaflet-popup-content-wrapper {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 10px;
  box-shadow: 
    0 6px 15px rgba(0, 0, 0, 0.12),
    0 0 0 2px var(--marker-color),
    0 0 6px var(--marker-color);
  padding: 0;
  overflow: hidden;
  border: none;
  max-width: 200px; /* 🔹 smaller popup width */
  backdrop-filter: blur(6px);
}

.marker-popup-header {
  background: linear-gradient(
    135deg,
    var(--marker-color) 0%,
    color-mix(in srgb, var(--marker-color) 70%, black) 100%
  );
  padding: 8px 10px; /* 🔹 reduced padding */
  text-align: center;
  position: relative;
}

.survey-title {
  font-size: 12px; /* 🔹 smaller text */
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.marker-popup-body {
  padding: 8px 10px; /* 🔹 reduced padding */
  background: #ffffff;
}

.detail-grid {
  display: grid;
  gap: 6px;
  margin-bottom: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0; /* 🔹 tighter rows */
  border-bottom: 1px solid #f1f5f9;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 9px; /* 🔹 smaller labels */
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}

.detail-value {
  font-size: 10px; /* 🔹 smaller values */
  font-weight: 600;
  color: #1e293b;
  text-align: right;
}

.view-details-btn {
  width: 100%;
  padding: 6px 10px; /* 🔹 compact button */
  background: linear-gradient(
    135deg,
    var(--marker-color) 0%,
    color-mix(in srgb, var(--marker-color) 80%, black) 100%
  );
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
}
        
        .view-details-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .leaflet-popup-tip {
          background: var(--marker-color) !important;
          border: none !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
        }
        
        .leaflet-popup-close-button {
          display: none !important;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

   <div className="relative h-screen w-full">
  {/* Header */}
  <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-gray-200">
  <div className="w-12" /> {/* placeholder for left spacing */}
  <h1 className="text-lg font-semibold text-gray-800 text-center flex-1">view in interactiveMap</h1>
  <button
    onClick={() => window.history.back()}
    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>
</div>


  {/* Map container */}
  <MapContainer 
    center={center} 
    zoom={6} 
    style={{ height: '100%', width: '100%' }} 
    scrollWheelZoom={!isPreview}
    zoomControl={true}
    attributionControl={false}
  >
    <MapEventHandler />

    {/* Enhanced district polygons */}
    <GeoJSON
      data={apDistrictsGeoJson}
      style={feature => ({
        fillColor: getDistrictColor(getDistrictName(feature)),
        fillOpacity: 0.75,
        weight: 2,
        color: '#ffffff',
        dashArray: '3, 3',
        lineCap: 'round',
        lineJoin: 'round'
      })}
      onEachFeature={onEachDistrict}
    />

    {/* Compact land markers */}
    {landParcels.map(land => {
      const statusColor = getStatusColor(land.status);
      const popup = L.popup({
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
        className: "marker-popup",
        offset: [0, -40],
        maxWidth: 260,
        autoPan: false,
        keepInView: false
      }).setContent(`
        <div class="marker-popup-content" style="--marker-color: ${statusColor}">
          <div class="marker-popup-header">
            <div class="survey-title">${land.surveyNo}</div>
          </div>
          <div class="marker-popup-body">
            <div class="detail-grid">
              <div class="detail-row">
                <span class="detail-label">Asset Type</span>
                <span class="detail-value">${land.assetType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Size</span>
                <span class="detail-value">${land.size}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Village</span>
                <span class="detail-value">${land.village}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Mandal</span>
                <span class="detail-value">${land.mandal}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">District</span>
                <span class="detail-value">${land.district}</span>
              </div>
            </div>
          </div>
        </div>
      `);

      const goToLandDetails = () => navigate("/landdetails");

      return (
        <Marker
          key={land.id}
          position={land.position}
          icon={createCustomIcon(land.status)}
          eventHandlers={{
            mouseover: (e) => {
              if (districtPopupRef.current) {
                districtPopupRef.current._map.closePopup(districtPopupRef.current);
                districtPopupRef.current = null;
              }
              const map = e.target._map;
              const originalAutoPan = map.options.autoPan;
              map.options.autoPan = false;
              e.target.openPopup();
              setTimeout(() => { map.options.autoPan = originalAutoPan; }, 100);
            },
            mouseout: (e) => { e.target.closePopup(); },
            click: goToLandDetails, // Navigate on marker click
          }}
          ref={(ref) => {
            if (ref) {
              ref.bindPopup(popup);
              popupRefs.current[land.id] = popup;
            }
          }}
        />
      );
    })}
  </MapContainer>
</div>
    </>
  );
};

export default LandMap;