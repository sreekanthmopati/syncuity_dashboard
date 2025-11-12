import React, { useState,useRef, useEffect } from 'react';


import { Search, MapPin, Eye, Download, ChevronLeft, ChevronRight,  ArrowRight, Map, Grid, List, Bell, User, Square, RefreshCw, Bookmark, Share2,Tag } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import MapEmbed from './MapEmbed';

const LandManagementUI = () => {
const resultsRef = useRef(null);
    const navigate = useNavigate();

  const goToLandDetails = () => {
    navigate("/land-management/landdetails");
  };

  const goToLandmap = () => {
    navigate("/landmap");
  };
  const [selectedView, setSelectedView] = useState('grid');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    district: "all",
    mandal: "all",
    village: "all",
    assetCategory: "all",
  });

  const landRecords = [
    {
      id: 1,
      surveyNo: "SY-2024-001",
      village: "Machilipatnam",
      district: "Krishna",
      mandal: "Machilipatnam Mandal",
      area: "2.5",
      landType: "Commercial",
      type: "fuelstation",
      assetCategory: "Commercial",
      status: "Verified",
      lastUpdated: "2024-01-15",
      image: "/assets/fuelstation1.webp"
    },
    {
      id: 2,
      surveyNo: "SY-2024-002",
      village: "Tenali",
      district: "Guntur",
      mandal: "Tenali Mandal",
      area: "1.8",
      landType: "Residential",
      type: "playground",
      assetCategory: "Non-Commercial",
      status: "Pending",
      lastUpdated: "2024-01-14",
      image: "/assets/playground1.webp"
    },
    {
      id: 3,
      surveyNo: "SY-2024-003",
      village: "Kakinada",
      district: "East Godavari",
      mandal: "Kakinada Mandal",
      area: "3.2",
      landType: "Agricultural",
      type: "land",
      assetCategory: "Non-Commercial",
      status: "Under Review",
      lastUpdated: "2024-01-13",
     image: "/assets/land1.webp"
    },
    {
      id: 4,
      surveyNo: "SY-2024-004",
      village: "Eluru",
      district: "West Godavari",
      mandal: "Eluru Mandal",
      area: "0.8",
      landType: "Agricultural",
      type: "land",
      assetCategory: "Non-Commercial",
      status: "Verified",
      lastUpdated: "2024-01-12",
      image: "/assets/land2.webp"
    },
    {
      id: 5,
      surveyNo: "SY-2024-005",
      village: "Ongole",
      district: "Prakasam",
      mandal: "Ongole Mandal",
      area: "4.1",
      landType: "Residential",
      type: "playground",
      assetCategory: "Non-Commercial",
      status: "Rejected",
      lastUpdated: "2024-01-11",
      image: "/assets/playground2.webp"
    },
    {
      id: 6,
      surveyNo: "SY-2024-006",
      village: "Tirupati",
      district: "Chittoor",
      mandal: "Tirupati Mandal",
      area: "1.8",
      landType: "Residential",
      type: "kalyanmandapam",
      assetCategory: "Commercial",
      status: "Pending",
      lastUpdated: "2024-01-14",
       image: "/assets/kalyanmandapam1.jpg"
    }
  ];

  const districts = [
    { name: "Krishna", count: 1247, color: "bg-blue-600", icon: "🏛️" , image : "/assets/krishna.jpg"},
    { name: "Guntur", count: 892, color: "bg-green-600", icon: "🌾" , image : "/assets/guntur.jpeg"},
    { name: "East Godavari", count: 654, color: "bg-purple-600", icon: "🏞️", image : "/assets/eastgodavari.jpg" },
    { name: "West Godavari", count: 567, color: "bg-orange-600", icon: "🌊" , image : "/assets/westgodavari.jpg"},
    { name: "Prakasam", count: 445, color: "bg-pink-600", icon: "🏖️", image : "/assets/prakasam.jpg" },
    { name: "vijayawada", count: 389, color: "bg-indigo-600", icon: "⛰️" , image : "/assets/vijayawada.jpg"}
  ];

  const getStatusColor = (status) => {
    if (status === 'Verified') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'Pending') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status === 'Under Review') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status === 'Rejected') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getLandTypeIcon = (type) => {
    if (type === 'Agricultural') return '🌾';
    if (type === 'Residential') return '🏠';
    if (type === 'Commercial') return '🏢';
    return '📍';
  };

  const [filteredLands, setFilteredLands] = useState([]);


// const handleSearch = () => {
//   const results = landRecords.filter((land) => {
//     const matchesDistrict = selectedFilters.district === "all" || land.district === selectedFilters.district;
//     const matchesMandal = selectedFilters.mandal === "all" || land.mandal === selectedFilters.mandal;
//     const matchesVillage = selectedFilters.village === "all" || land.village === selectedFilters.village;
//     const matchesAssetType = selectedFilters.assetCategory === "all" || land.assetCategory === selectedFilters.assetCategory;
//     const matchesSearch = searchTerm === "" ||
//       land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       land.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       land.village.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesDistrict && matchesMandal && matchesVillage && matchesAssetType && matchesSearch;
//   });

//   setFilteredLands(results);
//   setHasSearched(true);
// };

const handleSearch = () => {
  const results = landRecords.filter((land) => {
    const matchesDistrict = selectedFilters.district === "all" || land.district === selectedFilters.district;
    const matchesMandal = selectedFilters.mandal === "all" || land.mandal === selectedFilters.mandal;
    const matchesVillage = selectedFilters.village === "all" || land.village === selectedFilters.village;
    const matchesAssetType = selectedFilters.assetCategory === "all" || land.assetCategory === selectedFilters.assetCategory;
    const matchesSearch = searchTerm === "" ||
      land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.village.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDistrict && matchesMandal && matchesVillage && matchesAssetType && matchesSearch;
  });

  setFilteredLands(results);
  setHasSearched(true);

  // Scroll immediately after updating state
  setTimeout(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 50); // slight delay to ensure DOM updated
};

 

  const handleReset = () => {
    setSelectedFilters({
      district: "all",
      mandal: "all",
      village: "all",
      assetCategory: "all",
    });
     setFilteredLands([]);
    setSearchTerm("");
    setHasSearched(false);
  };
const getActiveFilterCount = () => {
  if (!selectedFilters) return 0;
  let count = 0;
  if (selectedFilters.district !== 'all') count++;
  if (selectedFilters.mandal !== 'all') count++;
  if (selectedFilters.village !== 'all') count++;
  if (selectedFilters.assetCategory !== 'all') count++;
  if (searchTerm) count++;
  return count;
};


// useEffect(() => {
//   if (hasSearched && resultsRef.current) {
//     resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }
// }, [hasSearched]);
  return (
<div className="min-h-screen max-h-screen overflow-y-auto flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
  {/* Government Header */}
  <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 border-b-4 border-orange-500 sticky top-0 z-50 shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-3">
      <div className="flex items-center justify-between mb-2">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-400 overflow-hidden">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/e/ea/Appolice%28emblem%29.png" 
            alt="AP Police Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              AP Police Land Management
            </h1>
            <p className="text-sm text-blue-200">
              Police Department - Land Management Division
            </p>
          </div>
        </div>

        {/* Notifications & User */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <Bell className="w-4 h-4 text-white" />
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white rounded-lg px-4 py-2 border border-white/30">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Admin Officer</span>
          </div>
        </div>
      </div>
    </div>

    {/* Sub-header navigation */}
    <div className="bg-blue-800/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center space-x-6 text-sm text-blue-100">
          <span className="font-semibold text-white">Land Registry Portal</span>
          <span className="text-blue-300">|</span>
          <span>Asset Management</span>
          <span className="text-blue-300">|</span>
          <span>Documentation</span>
          <span className="text-blue-300">|</span>
          <span>Reports</span>
        </div>
      </div>
    </div>
  </header>

  {/* Main content fills remaining space */}
<main className="flex flex-col">
  <section
    className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4"
    style={{
      height: "calc(100vh - 120px)",
    }}
  >
    <div className="bg-white rounded-xl border-2 border-blue-100 shadow-lg p-4 sm:p-6 flex flex-col w-full h-full">
      {/* Section Header */}
      <div className="flex items-center mb-4 sm:mb-6 pb-3 border-b-2 border-orange-500">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Search Land Records</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Use filters below to find specific land parcels
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 flex-1 min-h-0">
        {/* Left Column - Search & Asset Type */}
        <div className="lg:w-2/5 flex flex-col space-y-3 sm:space-y-4">
          {/* Quick Search */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3 sm:p-4">
            <div className="flex items-center mb-2 sm:mb-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-blue-900">Quick Search</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Survey number, location, owner..."
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 sm:py-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-blue-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Asset Type */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3 sm:p-4">
            <div className="flex items-center mb-2 sm:mb-3">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-blue-900">Asset Type</h3>
            </div>
            <select
              value={selectedFilters?.assetCategory || "all"}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, assetCategory: e.target.value })
              }
              className="w-full py-2 px-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base cursor-pointer"
            >
              <option value="all">All Asset Types</option>
              {landRecords && landRecords.length > 0 ? (
                [...new Set(landRecords.map((land) => land.assetCategory).filter(Boolean))].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading types...</option>
              )}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 sm:space-x-3 mt-3 sm:mt-4">
            <button
              onClick={handleSearch}
              className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Column - Location Filters */}
        <div className="lg:flex-1 flex flex-col min-h-0">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3 sm:p-4 h-full flex flex-col">
            {/* Location Header */}
            <div className="flex items-center mb-3 sm:mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-blue-900">Location Filters</h3>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
              {/* District */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-800 mb-1 sm:mb-2">
                  District
                </label>
                <select
                  value={selectedFilters?.district || "all"}
                  onChange={(e) =>
                    setSelectedFilters({ ...selectedFilters, district: e.target.value })
                  }
                  className="w-full py-2 px-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="all">All Districts</option>
                  {landRecords && landRecords.length > 0 ? (
                    [...new Set(landRecords.map((land) => land.district).filter(Boolean))].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No districts available</option>
                  )}
                </select>
              </div>

              {/* Mandal */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-800 mb-1 sm:mb-2">
                  Mandal
                </label>
                <select
                  value={selectedFilters?.mandal || "all"}
                  onChange={(e) =>
                    setSelectedFilters({ ...selectedFilters, mandal: e.target.value })
                  }
                  className="w-full py-2 px-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="all">All Mandals</option>
                  {landRecords && landRecords.length > 0 ? (
                    [...new Set(landRecords.map((land) => land.mandal).filter(Boolean))].map((mandal) => (
                      <option key={mandal} value={mandal}>
                        {mandal}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No mandals available</option>
                  )}
                </select>
              </div>

              {/* Village */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-800 mb-1 sm:mb-2">
                  Village
                </label>
                <select
                  value={selectedFilters?.village || "all"}
                  onChange={(e) =>
                    setSelectedFilters({ ...selectedFilters, village: e.target.value })
                  }
                  className="w-full py-2 px-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="all">All Villages</option>
                  {landRecords && landRecords.length > 0 ? (
                    [...new Set(landRecords.map((land) => land.village).filter(Boolean))].map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No villages available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Results Status & View Toggle */}
            <div className="mt-auto pt-3 border-t border-blue-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${hasSearched ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-xs sm:text-sm font-medium text-blue-800">
                    {hasSearched ? `${filteredLands?.length || 0} records found` : "Ready to search"}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-medium text-blue-800">View:</span>
                  <div className="flex items-center space-x-1 bg-blue-100 rounded-lg p-1 border border-blue-300">
                    <button
                      onClick={() => setSelectedView("grid")}
                      className={`p-1.5 sm:p-2 rounded transition-all ${
                        selectedView === "grid" ? "bg-white shadow text-blue-600" : "text-blue-600"
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedView("list")}
                      className={`p-1.5 sm:p-2 rounded transition-all ${
                        selectedView === "list" ? "bg-white shadow text-blue-600" : "text-blue-600"
                      }`}
                    >
                      <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>



      {/* Land Cards Display */}
{hasSearched && (
<section ref={resultsRef} className="w-full px-6 mb-12">
  <div className="flex items-center mb-6">
    <div className="w-1 h-8 bg-gradient-to-b from-[#FF4500] to-[#FF3C3C] mr-4 rounded-full"></div>
    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1C1C1C] to-[#FF4500] bg-clip-text text-transparent">Search Results</h2>
  </div>
  
  <div className={`grid gap-8 ${
    selectedView === 'grid' 
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
      : 'grid-cols-1'
  }`}>
    {filteredLands.map((land) => (
      <div
        key={land.id}
        className={`group bg-gradient-to-br from-white/95 to-[#F8F9FA]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/60 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 relative ${
          selectedView === 'list' ? 'flex' : ''
        }`}
      >
        {/* Decorative gradient accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500]/80 via-[#FF3C3C]/80 to-[#FF4500]/80"></div>

        {/* Image container - different layout for list view */}
        <div className={`relative ${
          selectedView === 'list' 
            ? 'w-64 h-64 flex-shrink-0' 
            : 'h-56'
        } overflow-hidden`}>
          <img
            src={land.image}
            alt={land.village}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/50 via-[#1C1C1C]/20 to-transparent"></div>

      

          {/* Land type icon */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-[#E5E5E5]">
            <div className="text-[#1C1C1C] text-xl">
              {getLandTypeIcon(land.landType)}
            </div>
          </div>

          {/* Survey & Area info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-end">
              <h3 className="text-white font-bold text-lg drop-shadow-md tracking-wide">
                {land.surveyNo}
              </h3>
              <span className="text-white font-semibold bg-[#1C1C1C]/60 backdrop-blur-md px-3 py-1 rounded-lg text-sm shadow-sm">
                {land.area} acres
              </span>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className={`p-6 ${selectedView === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
          <div>
            <h4 className="text-[#1C1C1C] font-bold uppercase text-lg mb-1 truncate">
  {land.type}
</h4>
            <div className="flex items-center text-[#1C1C1C]/70 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1 text-[#FF4500]/80" />
              <span>
                {land.village}, {land.district}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#1C1C1C]/60 text-sm">
              <span className="font-medium capitalize">{land.landType}</span>
              <span className="italic">
                Updated: {new Date(land.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
         <div className="flex space-x-3 mt-4">
  <button 
    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-orange-500 hover:to-orange-600 text-white py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group/btn" 
    onClick={goToLandDetails}
  >
    <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
    <span className="font-medium">View Details</span>
  </button>
  <button 
    className="bg-white hover:bg-orange-50 border border-blue-200 hover:border-orange-300 text-blue-600 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md" 
    onClick={goToLandDetails}
  >
    <MapPin className="w-4 h-4" />
  </button>
</div>
        </div>
      </div>
    ))}
  </div>
</section>
)}

      {/* Districts and Map Side by Side */}
<section className="max-w-7xl mx-auto px-6 py-12">
  {/* Single cohesive card */}
  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-900/10 to-indigo-900/10 rounded-full -translate-y-24 translate-x-24"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

    {/* Header */}
    <div className="text-center mb-10 relative z-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
        Explore Districts & Map
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto text-lg">
        Discover lands across different regions with our interactive district map
      </p>
    </div>

    {/* Content - districts + map */}
    <div className="flex flex-col lg:flex-row gap-8 relative z-10">
      {/* Districts Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {districts.slice(0, 4).map((district) => (
            <div 
              key={district.name}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => setSelectedDistrict(district.name)}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-blue-800/5 to-indigo-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>

              {/* District header with image */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-orange-400/30">
                    <img 
                      src={district.image} 
                      alt={district.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-800 transition-colors duration-300">
                      {district.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{district.count} lands available</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                </div>
              </div>

              {/* Visual progress */}
              <div className="mb-4 relative z-10">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span className="font-medium">Land availability</span>
                  <span className="font-bold text-orange-500">
                    {Math.round((district.count / Math.max(...districts.map(d => d.count))) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-800 to-orange-500 transition-all duration-1000 ease-out shadow-inner"
                    style={{ width: `${Math.min((district.count / Math.max(...districts.map(d => d.count))) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Mini preview */}
              <div className="relative z-10">
                <div className="flex -space-x-2 mb-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-indigo-900/10 rounded-full border-2 border-white shadow-md overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                      <div className={`w-full h-full ${i === 1 ? 'bg-gradient-to-br from-blue-900/30 via-blue-800/30 to-indigo-900/30' : i === 2 ? 'bg-gradient-to-br from-blue-900/20 via-blue-800/20 to-indigo-900/20' : 'bg-gradient-to-br from-orange-500/30 to-orange-400/30'}`}></div>
                    </div>
                  ))}
                  {district.count > 3 && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-indigo-900/10 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs text-orange-500 font-bold transform group-hover:scale-110 transition-transform duration-300">
                      +{district.count - 3}
                    </div>
                  )}
                </div>
                <p className="text-slate-500 text-xs font-medium">Recent land listings in this area</p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 rounded-2xl border-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center space-x-3 bg-white hover:bg-gradient-to-r hover:from-blue-900 hover:via-blue-800 hover:to-indigo-900 border border-slate-300 hover:border-transparent text-slate-700 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
            <span>Explore All Districts</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Subtle vertical separator */}
      <div className="hidden lg:block w-px bg-gradient-to-b from-blue-900/20 via-blue-800/20 to-indigo-900/20"></div>

      {/* Map */}
      <div 
        className="flex-1 rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        onClick={goToLandmap}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 flex items-center justify-between z-10 relative">
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Map View</h2>
            <p className="text-sm text-blue-200">Click to explore land locations</p>
          </div>
          <button 
            className="flex items-center space-x-2 bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow z-10 relative group/btn"
            onClick={(e) => { e.stopPropagation(); goToLandmap(); }}
          >
            <Map className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            <span>Full Screen</span>
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <img
            src="https://www.nicepng.com/png/full/247-2479367_andhra-pradesh-map-andhra-pradesh-map-png.png"
            alt="Andhra Pradesh Map"
            className="max-w-full max-h-full object-contain filter drop-shadow-xl rounded-xl transition-transform duration-500 group-hover:scale-110"
          />

          {/* Enhanced Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 via-blue-800/0 to-indigo-900/0 group-hover:from-blue-900/10 group-hover:via-blue-800/10 group-hover:to-indigo-900/10 flex items-center justify-center rounded-xl pointer-events-none transition-all duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-3 border-2 border-orange-400/30">
              <Map className="w-6 h-6 text-orange-500" />
              <span className="text-blue-900 font-bold text-lg">
                Go to Map
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




      {/* Footer - Government style */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 border-t-4 border-orange-500 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-300 text-sm">
            <p className="mb-2">© 2024 Government of Andhra Pradesh - Police Department</p>
            <p className="text-xs text-gray-400">Land Management Division | All Rights Reserved</p>
          </div>
        </div>
      </footer>


{/* <MapEmbed lat={16.1859} lng={81.1389} zoom={13} /> */}


    </div>
  );
};

export default LandManagementUI;