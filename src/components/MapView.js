import {
    MapContainer,
    GeoJSON,
    Marker,
    Popup,
    useMapEvents,
  } from "react-leaflet";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  import L from "leaflet";
  import apDistrictsGeoJson from "../data/andhra-pradesh.json";
  import { demoDistricts } from "../data/demoDistricts";
  import "leaflet/dist/leaflet.css";
  import { FcFactory } from "react-icons/fc";
  import ReactDOMServer from "react-dom/server";
  
  // Create random position near district center
  const getRandomPositionNear = ([lat, lng], radius = 0.2) => [
    lat + (Math.random() - 0.5) * radius,
    lng + (Math.random() - 0.5) * radius,
  ];
  
  // Custom icon using FcFactory rendered as HTML
  const getFactoryIcon = () =>
    L.divIcon({
      html: ReactDOMServer.renderToString(<FcFactory size={32} />),
      iconSize: [32, 32],
      className: "custom-icon",
    });
  
  const MapView = () => {
    const [zoomLevel, setZoomLevel] = useState(7);
    const [hoveredDistrict, setHoveredDistrict] = useState(null);
    const navigate = useNavigate();
  
    const ZoomWatcher = () => {
      useMapEvents({
        zoomend: (e) => setZoomLevel(e.target.getZoom()),
      });
      return null;
    };
  
    const enrichedGeoJson = {
      ...apDistrictsGeoJson,
      features: apDistrictsGeoJson.features.map((feature) => {
        const districtName = feature.properties.district;
        const match = demoDistricts.find(
          (d) => d.name.toLowerCase() === districtName.toLowerCase()
        );
  
        return {
          ...feature,
          properties: {
            ...feature.properties,
            id: match?.id || null,
            revenue: match?.revenue || 0,
            center: match?.center || [0, 0],
            assets: match
              ? Array.from({ length: 3 }, (_, i) => ({
                  id: `${match.id}-asset-${i}`,
                  name: `Asset ${i + 1}`,
                  coordinates: getRandomPositionNear(match.center),
                }))
              : [],
          },
        };
      }),
    };
  
    const getFillColor = (revenue) => {
      if (revenue > 20000000) return "#16a34a";
      if (revenue > 15000000) return "#22c55e";
      return "#f59e0b";
    };
  
    const andhraBounds = L.geoJSON(enrichedGeoJson).getBounds();
    const paddedBounds = andhraBounds.pad(0.2);
  
    return (
      <>
        {/* Embedded CSS Styles */}
        <style>
          {`
            .district-tooltip {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              transition: all 0.3s ease;
              background: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              padding: 0.75rem;
              border: 1px solid rgba(209, 213, 219, 0.5);
            }
            
            .custom-tooltip {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
            
            .custom-tooltip .leaflet-tooltip-top:before {
              border-top-color: white !important;
            }
            
            .leaflet-interactive {
              transition: all 0.3s ease;
            }
            
            .leaflet-interactive:hover {
              filter: drop-shadow(0 0 8px rgba(30, 58, 138, 0.3));
              transform: translateY(-2px);
            }
            
            .custom-popup .leaflet-popup-content-wrapper {
              border-radius: 8px !important;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
              border: 1px solid rgba(0,0,0,0.1) !important;
              padding: 0 !important;
            }
            
            .custom-popup .leaflet-popup-content {
              margin: 0 !important;
            }
            
            .custom-popup .leaflet-popup-tip {
              background: white !important;
            }
          `}
        </style>
  
        <MapContainer
        
        attributionControl={false}
          bounds={andhraBounds}
          maxBounds={paddedBounds}
          maxBoundsViscosity={0.7}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          dragging={true}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#f9fafb",
            zIndex: 0,
          }}
          zoomControl={true}
        >
          <ZoomWatcher />
  
          {/* District Polygons with enhanced hover effects */}
          <GeoJSON
            data={enrichedGeoJson}
            style={(feature) => ({
              fillColor: getFillColor(feature.properties.revenue),
              weight: hoveredDistrict === feature.properties.district ? 2.5 : 1.5,
              color: hoveredDistrict === feature.properties.district 
                ? "#1e3a8a" 
                : "#1e40af",
              fillOpacity: hoveredDistrict === feature.properties.district ? 0.8 : 0.5,
            })}
            onEachFeature={(feature, layer) => {
              const { district, revenue, id } = feature.properties;
              
              layer.bindTooltip(
                `<div class="district-tooltip">
                  <h3 class="text-lg font-bold text-blue-800 mb-1">${district}</h3>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 rounded-full mr-2" 
                          style="background-color: ${getFillColor(revenue)}"></span>
                    <span class="text-green-700 font-medium">₹${revenue.toLocaleString()}</span>
                  </div>
                </div>`,
                {
                  sticky: true,
                  direction: "top",
                  className: "custom-tooltip",
                }
              );
              
              layer.on({
                click: () => id && navigate(`/districts/${id}`),
                mouseover: () => {
                  setHoveredDistrict(district);
                  layer.setStyle({
                    weight: 2.5,
                    color: "#1e3a8a",
                    fillOpacity: 0.8
                  });
                  layer.bringToFront();
                },
                mouseout: () => {
                  setHoveredDistrict(null);
                  layer.setStyle({
                    weight: 1.5,
                    color: "#1e40af",
                    fillOpacity: 0.5
                  });
                }
              });
            }}
          />
  
          {/* Custom Asset Markers */}
          {zoomLevel >= 8 &&
            enrichedGeoJson.features.flatMap((feature) =>
              feature.properties.assets.map((asset) => (
                <Marker
                  key={asset.id}
                  position={asset.coordinates}
                  icon={getFactoryIcon()}
                  eventHandlers={{
                    click: () => navigate(`/assets/${asset.id}`),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-3">
                      <h3 className="font-bold text-blue-800">{asset.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.properties.district}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
        </MapContainer>
      </>
    );
  };
  
  export default MapView;
  
  
  
  
  
  