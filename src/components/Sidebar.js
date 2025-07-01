















// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-toastify";
// import { FaChevronDown, FaChevronUp, FaTimes, FaSignOutAlt, FaBuilding } from "react-icons/fa";

// const assetsData = [
//     {
//       id: 1,
//       unitName: "Srikakulam",
//       commercialAssets: [
//         {
//           type: "Fuel Station",
//           count: 1,
//           pan: "AAAGS2682F",
//           gst: "37AAAGS2682F1Z5"
//         },
//         {
//           type: "Shopping complex",
//           count: 4,
//           pan: "",
//           gst: ""
//         }
//       ],
//       nonCommercialAssets: [
//         {
//           type: "Guest House",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Kalyanamandapam",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "CPC",
//           count: 1,
//           pan: "AAFAP2024H",
//           gst: "37AAFAP2024H1ZR"
//         },
//         {
//           type: "Gas",
//           count: 1,
//           pan: "AATAS9326H",
//           gst: "37AATAS9326H1ZR"
//         },
//         {
//           type: "Hospital",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Mineral Water Plant",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Tailoring centre",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Fruit garden",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Computer centre",
//           count: 1,
//           pan: "",
//           gst: ""
//         },
//         {
//           type: "Club",
//           count: 1,
//           pan: "",
//           gst: ""
//         }
//       ]
//     },
//     {
//       id: 2,
//       unitName: "Vizianagaram",
//       commercialAssets: [
//         {
//           type: "Fuel Station",
//           count: 1,
//           pan: "AABGS4129Q",
//           gst: "37AABGS4129Q1ZN"
//         },
//         {
//           type: "Shopping complex",
//           count: 2,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Provision store",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         }
//       ],
//       nonCommercialAssets: [
//         {
//           type: "Guest House",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Kalyanamandapam",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "CPC",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Gas",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Hospital",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "EM School",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Mineral Water Plant",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         },
//         {
//           type: "Tailoring centre",
//           count: 1,
//           pan: "AABAP3829J",
//           gst: "37AABAP3829J1ZB"
//         }
//       ]
//     },
//     {
//       id: 3,
//       unitName: "Manyam",
//       commercialAssets: [
//         {
//           type: "Shopping complex",
//           count: 1,
//           pan: "",
//           gst: ""
//         }
//       ],
//       nonCommercialAssets: []
//     },
//     {
//       id: 4,
//       unitName: "ASR",
//       commercialAssets: [
//         {
//           type: "Fuel Station",
//           count: 1,
//           pan: "AAAGP1984R",
//           gst: ""
//         }
//       ],
//       nonCommercialAssets: []
//     }]

// const Sidebar = () => {
//   const [openUnits, setOpenUnits] = useState(false);
//   const [openUnitItems, setOpenUnitItems] = useState({});
//   const [openAssetCategories, setOpenAssetCategories] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce search input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(searchQuery);
//     }, 400);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   const toggleUnits = () => setOpenUnits(!openUnits);

//   const toggleUnit = (unitId) => {
//     setOpenUnitItems(prev => ({
//       ...prev,
//       [unitId]: !prev[unitId]
//     }));
//   };

//   const toggleAssetCategory = (unitId, category) => {
//     setOpenAssetCategories(prev => ({
//       ...prev,
//       [`${unitId}-${category}`]: !prev[`${unitId}-${category}`]
//     }));
//   };

//   const clearSearch = () => setSearchQuery("");

//   const filteredUnits = useMemo(() => {
//     if (!debouncedQuery.trim()) return assetsData;

//     return assetsData.filter(unit => {
//       const unitMatch = unit.unitName.toLowerCase().includes(debouncedQuery.toLowerCase());
//       const commercialMatch = unit.commercialAssets.some(asset =>
//         asset.type.toLowerCase().includes(debouncedQuery.toLowerCase())
//       );
//       const nonCommercialMatch = unit.nonCommercialAssets.some(asset =>
//         asset.type.toLowerCase().includes(debouncedQuery.toLowerCase())
//       );

//       return unitMatch || commercialMatch || nonCommercialMatch;
//     });
//   }, [debouncedQuery]);

//   return (
//     <div className="w-64 bg-gradient-to-r from-blue-900 to-green-900 text-white p-5 flex flex-col h-screen">
//       {/* Logo */}
    //   <div className="flex justify-center items-center mb-4 px-4 py-2">
    //     <img
    //       src="/company logo.jpeg"
    //       alt="Company Logo"
    //       className="w-full max-w-[180px] h-auto object-contain"
    //     />
    //   </div>

//       {/* Search Bar */}
//       <div className="relative mb-4">
//   <input
//     type="text"
//     placeholder="Search units or assets..."
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//     className="w-full p-2 pl-4 pr-10 rounded bg-green-800 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//   />
//   {searchQuery && (
//     <button
//       onClick={clearSearch}
//       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
//     >
//       <FaTimes />
//     </button>
//   )}
// </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
//         {/* Units Parent Menu */}
//         <div
//           className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition duration-300 ${
//             openUnits ? "bg-blue-700" : "hover:bg-blue-700"
//           }`}
//           onClick={toggleUnits}
//         >
//           <div className="flex items-center gap-3">
//             <FaBuilding />
//             <span>Units</span>
//           </div>
//           {openUnits ? <FaChevronUp /> : <FaChevronDown />}
//         </div>

//         {openUnits && (
//           <div className="ml-6 space-y-2">
//             {filteredUnits.map((unit) => (
//               <div key={unit.id}>
//                 {/* Unit Item */}
//                 <div
//                   className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition duration-300 ${
//                     openUnitItems[unit.id] ? "bg-blue-700" : "hover:bg-blue-700"
//                   }`}
//                   onClick={() => toggleUnit(unit.id)}
//                 >
//                   <span className="font-semibold text-lg">{unit.unitName}</span>
//                   {openUnitItems[unit.id] ? <FaChevronUp /> : <FaChevronDown />}
//                 </div>

//                 {/* Unit Content */}
//                 {openUnitItems[unit.id] && (
//                   <div className="ml-4 space-y-2">
//                     {/* Commercial Assets */}
//                     <div
//                       className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition duration-300 ${
//                         openAssetCategories[`${unit.id}-commercial`] ? "bg-blue-700" : "hover:bg-blue-700"
//                       }`}
//                       onClick={() => toggleAssetCategory(unit.id, "commercial")}
//                     >
//                       <span className="font-medium">Commercial Assets ({unit.commercialAssets.length})</span>
//                       {openAssetCategories[`${unit.id}-commercial`] ? <FaChevronUp /> : <FaChevronDown />}
//                     </div>

//                     {openAssetCategories[`${unit.id}-commercial`] && (
//                       <div className="ml-4 space-y-1">
//                         {unit.commercialAssets.map((asset, index) => (
//                           <div
//                             key={`commercial-${unit.id}-${index}`}
//                             className="p-2 text-sm rounded hover:bg-blue-600 flex justify-between items-center"
//                           >
//                             <span>{asset.type}</span>
//                             <span className="text-green-400 font-semibold">{asset.count}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Non-Commercial Assets */}
//                     <div
//                       className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition duration-300 ${
//                         openAssetCategories[`${unit.id}-nonCommercial`] ? "bg-blue-700" : "hover:bg-blue-700"
//                       }`}
//                       onClick={() => toggleAssetCategory(unit.id, "nonCommercial")}
//                     >
//                       <span className="font-medium">Non-Commercial Assets ({unit.nonCommercialAssets.length})</span>
//                       {openAssetCategories[`${unit.id}-nonCommercial`] ? <FaChevronUp /> : <FaChevronDown />}
//                     </div>

//                     {openAssetCategories[`${unit.id}-nonCommercial`] && (
//                       <div className="ml-4 space-y-1">
//                         {unit.nonCommercialAssets.map((asset, index) => (
//                           <div
//                             key={`nonCommercial-${unit.id}-${index}`}
//                             className="p-2 text-sm rounded hover:bg-blue-600 flex justify-between items-center"
//                           >
//                             <span>{asset.type}</span>
//                             <span className="text-green-400 font-semibold">{asset.count}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </nav>

//       {/* Logout */}
//       <div
//         className="flex items-center gap-3 p-3 mt-auto rounded-lg cursor-pointer hover:bg-red-500 transition duration-300"
//         onClick={() => {
//           localStorage.removeItem("token");
//           toast.success("Logged out");
//         }}
//       >
//         <FaSignOutAlt />
//         <span>Logout</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaTimes, 
//   FaSignOutAlt, 
//   FaBuilding,
//   FaGasPump,
//   FaHome,
//   FaChartLine,
//   FaMoneyBillWave,
//   FaWallet,
//   FaFileInvoiceDollar
// } from "react-icons/fa";
// import { GiCash, GiPayMoney, GiReceiveMoney } from "react-icons/gi";


// export const nelloreUnit = {
//     unitId: 1,
//     unitName: "Nellore",
//     financials: {
//       revenue: 18200000, // Increased from original 12,500,000
//       costOfGoodsSold: 11200000, // Increased from original 8,500,000
//       grossProfit: 7000000, // Increased from original 4,000,000
//       expenses: 1800000, // Increased from original 1,200,000
//       netProfit: 5200000, // Increased from original 2,800,000
//       cashAndBank: 1500000, // Increased from original 950,000
//       receivables: 650000, // Increased from original 400,000
//       payables: 500000, // Increased from original 350,000
//       shortTermLoans: 500000,
//       otherAssets: 300000, // Increased from original 200,000
//       utilityBills: 250000, // Increased from original 180,000
//       employeeWages: 1200000, // Increased from original 700,000
//       marketingExpenses: 250000, // Increased from original 150,000
//       maintenanceExpenses: 200000 // Increased from original 120,000
//     },
//     commercialAssets: [
//       // Existing Fuel Stations (3)
//       {
//         type: "Fuel Station",
//         id: "fuelStation#1",
//         pan: "AAAFN1234K",
//         gst: "37AAAFN1234K1ZP",
//         financials: {
//           revenue: 3000000,
//           costOfGoodsSold: 2000000,
//           cashAndBank: 250000,
//           receivables: 100000,
//           payables: 80000,
//           expenses: 120000,
//           employeeWages: 250000,
//           utilityBills: 60000,
//           maintenanceExpenses: 40000,
//           marketingExpenses: 50000
//         }
//       },
//       {
//         type: "Fuel Station",
//         id: "fuelStation#2",
//         pan: "AAAFN2234K",
//         gst: "37AAAFN2234K1ZR",
//         financials: {
//           revenue: 2800000,
//           costOfGoodsSold: 1900000,
//           cashAndBank: 230000,
//           receivables: 90000,
//           payables: 70000,
//           expenses: 100000,
//           employeeWages: 240000,
//           utilityBills: 50000,
//           maintenanceExpenses: 30000,
//           marketingExpenses: 60000
//         }
//       },
//       {
//         type: "Fuel Station",
//         id: "fuelStation#3",
//         pan: "AAAFN3234K",
//         gst: "37AAAFN3234K1ZT",
//         financials: {
//           revenue: 3200000,
//           costOfGoodsSold: 2100000,
//           cashAndBank: 270000,
//           receivables: 110000,
//           payables: 90000,
//           expenses: 150000,
//           employeeWages: 260000,
//           utilityBills: 70000,
//           maintenanceExpenses: 35000,
//           marketingExpenses: 40000
//         }
//       },
//       // New Commercial Assets
//       {
//         type: "Shopping Complex",
//         id: "shoppingComplex#1",
//         pan: "AAASC5678M",
//         gst: "37AAASC5678M1ZQ",
//         financials: {
//           revenue: 1500000,
//           costOfGoodsSold: 800000,
//           cashAndBank: 200000,
//           receivables: 75000,
//           payables: 60000,
//           expenses: 120000,
//           employeeWages: 180000,
//           utilityBills: 40000,
//           maintenanceExpenses: 30000,
//           marketingExpenses: 20000
//         }
//       },
//       {
//         type: "Provision Store",
//         id: "provisionStore#1",
//         pan: "AAAPS9012N",
//         gst: "37AAAPS9012N1ZS",
//         financials: {
//           revenue: 800000,
//           costOfGoodsSold: 500000,
//           cashAndBank: 120000,
//           receivables: 40000,
//           payables: 30000,
//           expenses: 80000,
//           employeeWages: 100000,
//           utilityBills: 20000,
//           maintenanceExpenses: 15000,
//           marketingExpenses: 10000
//         }
//       },
//       {
//         type: "Cricket Ground",
//         id: "cricketGround#1",
//         pan: "AAACG3456P",
//         gst: "37AAACG3456P1ZT",
//         financials: {
//           revenue: 500000, // From events and bookings
//           expenses: 200000,
//           cashAndBank: 100000,
//           receivables: 30000,
//           payables: 25000,
//           employeeWages: 80000,
//           utilityBills: 30000,
//           maintenanceExpenses: 40000,
//           marketingExpenses: 15000
//         }
//       },
//       {
//         type: "Land leased for CNG Station",
//         id: "cngLand#1",
//         pan: "AAACN7890R",
//         gst: "37AAACN7890R1ZU",
//         financials: {
//           revenue: 600000, // Lease income
//           expenses: 50000, // Property tax/maintenance
//           cashAndBank: 150000,
//           payables: 10000,
//           maintenanceExpenses: 20000
//         }
//       }
//     ],
//     nonCommercialAssets: [
//       // Existing Kalyanamandapam
//       {
//         type: "Kalyanamandapam",
//         id: "kalyanamandapam#1",
//         pan: "AAAKM1234Q",
//         gst: "37AAAKM1234Q1ZV",
//         financials: {
//           revenue: 600000,
//           expenses: 200000,
//           cashAndBank: 80000,
//           payables: 30000,
//           utilityBills: 20000,
//           employeeWages: 100000,
//           maintenanceExpenses: 30000,
//           marketingExpenses: 15000
//         }
//       },
//       // New Non-Commercial Assets
//       {
//         type: "CPC",
//         id: "cpc#1",
//         pan: "AAACP4567S",
//         gst: "37AAACP4567S1ZW",
//         financials: {
//           revenue: 400000, // Community services
//           expenses: 250000,
//           cashAndBank: 60000,
//           payables: 20000,
//           utilityBills: 30000,
//           employeeWages: 120000,
//           maintenanceExpenses: 25000,
//           marketingExpenses: 10000
//         }
//       },
//       {
//         type: "Gas",
//         id: "gas#1",
//         pan: "AAAGG8912T",
//         gst: "37AAAGG8912T1ZX",
//         financials: {
//           revenue: 300000, // Subsidized services
//           expenses: 180000,
//           cashAndBank: 50000,
//           payables: 15000,
//           utilityBills: 25000,
//           employeeWages: 80000,
//           maintenanceExpenses: 20000
//         }
//       },
//       {
//         type: "Mineral Water Plant",
//         id: "waterPlant#1",
//         pan: "AAAMW2345U",
//         gst: "37AAAMW2345U1ZY",
//         financials: {
//           revenue: 350000, // Mostly internal usage
//           expenses: 150000,
//           cashAndBank: 70000,
//           payables: 18000,
//           utilityBills: 35000,
//           employeeWages: 60000,
//           maintenanceExpenses: 22000
//         }
//       },
//       {
//         type: "Hospital",
//         id: "hospital#1",
//         pan: "AAAHM6789V",
//         gst: "37AAAHM6789V1ZZ",
//         financials: {
//           revenue: 800000, // Charitable services
//           expenses: 500000,
//           cashAndBank: 120000,
//           payables: 40000,
//           utilityBills: 60000,
//           employeeWages: 300000,
//           maintenanceExpenses: 50000,
//           marketingExpenses: 10000
//         }
//       },
//       {
//         type: "Guest House",
//         id: "guestHouse#1",
//         pan: "AAAGH0123W",
//         gst: "37AAAGH0123W1Z1",
//         financials: {
//           revenue: 450000,
//           expenses: 180000,
//           cashAndBank: 90000,
//           payables: 25000,
//           utilityBills: 30000,
//           employeeWages: 80000,
//           maintenanceExpenses: 25000
//         }
//       },
//       {
//         type: "Guest House",
//         id: "guestHouse#2",
//         pan: "AAAGH4567X",
//         gst: "37AAAGH4567X1Z2",
//         financials: {
//           revenue: 500000,
//           expenses: 200000,
//           cashAndBank: 100000,
//           payables: 30000,
//           utilityBills: 35000,
//           employeeWages: 90000,
//           maintenanceExpenses: 30000
//         }
//       },
//       {
//         type: "EM School",
//         id: "school#1",
//         pan: "AAAES8901Y",
//         gst: "37AAAES8901Y1Z3",
//         financials: {
//           revenue: 200000, // Mostly grants
//           expenses: 300000, // Subsidized education
//           cashAndBank: 50000,
//           payables: 20000,
//           utilityBills: 25000,
//           employeeWages: 200000,
//           maintenanceExpenses: 35000
//         }
//       }
//     ]
//   };
  

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0
//   }).format(amount);
// };

// const Sidebar = () => {
//   const [openUnits, setOpenUnits] = useState(true);
//   const [openUnitDetails, setOpenUnitDetails] = useState(true);
//   const [openFinancials, setOpenFinancials] = useState(false);
//   const [openCommercialAssets, setOpenCommercialAssets] = useState(false);
//   const [openNonCommercialAssets, setOpenNonCommercialAssets] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const toggleUnits = () => setOpenUnits(!openUnits);
//   const toggleUnitDetails = () => setOpenUnitDetails(!openUnitDetails);
//   const toggleFinancials = () => setOpenFinancials(!openFinancials);
//   const toggleCommercialAssets = () => setOpenCommercialAssets(!openCommercialAssets);
//   const toggleNonCommercialAssets = () => setOpenNonCommercialAssets(!openNonCommercialAssets);
  
//   const clearSearch = () => setSearchQuery("");

//   return (
//     <div className="w-80 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white p-5 flex flex-col h-screen border-r border-blue-700 shadow-xl">
//       {/* Logo Section */}
//       {/* <div className="flex justify-center items-center mb-6 px-4 py-3 bg-blue-800 rounded-lg shadow-md">
//         <img
//           src="/company logo.jpeg"
//           alt="Company Logo"
//           className="w-full max-w-[160px] h-auto object-contain filter brightness-0 invert"
//         />
//       </div> */}
//     <div className="flex justify-center items-center mb-4 px-4 py-2">
//         <img
//           src="/company logo.jpeg"
//           alt="Company Logo"
//           className="w-full max-w-[180px] h-auto object-contain"
//         />
//       </div>
      
      

//       {/* Search Bar */}
//       <div className="relative mb-6">
//         <input
//           type="text"
//           placeholder="Search assets or metrics..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full p-3 pl-4 pr-10 rounded-lg bg-blue-700 bg-opacity-50 backdrop-blur-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-600 transition-all duration-300"
//         />
//         {searchQuery && (
//           <button
//             onClick={clearSearch}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors duration-200"
//           >
//             <FaTimes />
//           </button>
//         )}
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
//         {/* Units Section */}
//         <div className="space-y-3">
//           {/* Units Header */}
//           <div
//             className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${
//               openUnits ? "bg-blue-700 shadow-inner" : "bg-blue-800"
//             }`}
//             onClick={toggleUnits}
//           >
//             <div className="flex items-center gap-3">
//               <FaBuilding className="text-blue-300 text-lg" />
//               <span className="font-medium text-lg">Nellore Unit</span>
//             </div>
//             {openUnits ? (
//               <FaChevronUp className="text-blue-300" />
//             ) : (
//               <FaChevronDown className="text-blue-300" />
//             )}
//           </div>

//           {openUnits && (
//             <div className="ml-2 space-y-3 pl-4 border-l-2 border-blue-700">
//               {/* Unit Financial Summary */}
//               <div
//                 className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${
//                   openUnitDetails ? "bg-blue-700 bg-opacity-50" : "bg-blue-800 bg-opacity-30"
//                 }`}
//                 onClick={toggleUnitDetails}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaChartLine className="text-green-300" />
//                     <span className="font-medium">Financial Summary</span>
//                   </div>
//                   {openUnitDetails ? (
//                     <FaChevronUp className="text-blue-300 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-300 text-sm" />
//                   )}
//                 </div>
                
//                 {openUnitDetails && (
//                   <div className="mt-3 space-y-2 pl-2">
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-blue-200">Revenue:</span>
//                       <span className="font-semibold text-green-300">{formatCurrency(nelloreUnit.financials.revenue)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-blue-200">Net Profit:</span>
//                       <span className="font-semibold text-green-300">{formatCurrency(nelloreUnit.financials.netProfit)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-blue-200">Cash Balance:</span>
//                       <span className="font-semibold text-green-300">{formatCurrency(nelloreUnit.financials.cashAndBank)}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Detailed Financials */}
//               {/* <div
//                 className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${
//                   openFinancials ? "bg-blue-700 bg-opacity-50" : "bg-blue-800 bg-opacity-30"
//                 }`}
//                 onClick={toggleFinancials}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaMoneyBillWave className="text-yellow-300" />
//                     <span className="font-medium">Detailed Financials</span>
//                   </div>
//                   {openFinancials ? (
//                     <FaChevronUp className="text-blue-300 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-300 text-sm" />
//                   )}
//                 </div>
                
//                 {openFinancials && (
//                   <div className="mt-3 space-y-2 pl-2">
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="flex items-center gap-1 text-blue-200">
//                         <GiCash className="text-amber-300" /> Gross Profit:
//                       </span>
//                       <span className="font-semibold text-green-300">{formatCurrency(nelloreUnit.financials.grossProfit)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="flex items-center gap-1 text-blue-200">
//                         <GiPayMoney className="text-red-300" /> Expenses:
//                       </span>
//                       <span className="font-semibold text-red-300">{formatCurrency(nelloreUnit.financials.expenses)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="flex items-center gap-1 text-blue-200">
//                         <GiReceiveMoney className="text-blue-300" /> Receivables:
//                       </span>
//                       <span className="font-semibold text-blue-300">{formatCurrency(nelloreUnit.financials.receivables)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="flex items-center gap-1 text-blue-200">
//                         <FaFileInvoiceDollar className="text-purple-300" /> Payables:
//                       </span>
//                       <span className="font-semibold text-purple-300">{formatCurrency(nelloreUnit.financials.payables)}</span>
//                     </div>
//                   </div>
//                 )}
//               </div> */}

//               {/* Commercial Assets */}
//               <div
//                 className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${
//                   openCommercialAssets ? "bg-blue-700 bg-opacity-50" : "bg-blue-800 bg-opacity-30"
//                 }`}
//                 onClick={toggleCommercialAssets}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaGasPump className="text-orange-300" />
//                     <span className="font-medium">Commercial Assets ({nelloreUnit.commercialAssets.length})</span>
//                   </div>
//                   {openCommercialAssets ? (
//                     <FaChevronUp className="text-blue-300 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-300 text-sm" />
//                   )}
//                 </div>
                
//                 {openCommercialAssets && (
//                   <div className="mt-3 space-y-3 pl-2">
//                     {nelloreUnit.commercialAssets.map((asset, index) => (
//                       <div key={`commercial-${index}`} className="p-2 bg-blue-900 bg-opacity-30 rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-sm">{asset.type} #{index + 1}</span>
//                           <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">{formatCurrency(asset.financials.revenue)}</span>
//                         </div>
//                         <div className="mt-1 flex justify-between text-xs text-blue-200">
//                           <span>PAN: {asset.pan || 'N/A'}</span>
//                           <span>GST: {asset.gst || 'N/A'}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Non-Commercial Assets */}
//               <div
//                 className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${
//                   openNonCommercialAssets ? "bg-blue-700 bg-opacity-50" : "bg-blue-800 bg-opacity-30"
//                 }`}
//                 onClick={toggleNonCommercialAssets}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaHome className="text-teal-300" />
//                     <span className="font-medium">Non-Commercial Assets ({nelloreUnit.nonCommercialAssets.length})</span>
//                   </div>
//                   {openNonCommercialAssets ? (
//                     <FaChevronUp className="text-blue-300 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-300 text-sm" />
//                   )}
//                 </div>
                
//                 {openNonCommercialAssets && (
//                   <div className="mt-3 space-y-3 pl-2">
//                     {nelloreUnit.nonCommercialAssets.map((asset, index) => (
//                       <div key={`non-commercial-${index}`} className="p-2 bg-blue-900 bg-opacity-30 rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-sm">{asset.type}</span>
//                           <span className="text-xs bg-teal-600 px-2 py-1 rounded-full">{formatCurrency(asset.financials.revenue)}</span>
//                         </div>
//                         <div className="mt-1 flex justify-between text-xs text-blue-200">
//                           <span>PAN: {asset.pan || 'N/A'}</span>
//                           <span>GST: {asset.gst || 'N/A'}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Logout Section */}
//       <div className="mt-auto pt-4 border-t border-blue-700">
//         <div
//           className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-600 hover:bg-opacity-80 transition-all duration-300"
//           onClick={() => {
//             localStorage.removeItem("token");
//             toast.success("Logged out successfully");
//           }}
//         >
//           <FaSignOutAlt className="text-red-300" />
//           <span className="font-medium">Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





















import React, { useState, useEffect } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import { 
  FiChevronDown, FiChevronRight, FiX, FiSearch,
  FiPieChart, FiHome, FiDollarSign,
  FiUser, FiBarChart2, FiDatabase
} from 'react-icons/fi';

import { motion, AnimatePresence } from 'framer-motion';






export const nelloreUnit = {
  unitId: 1,
  unitName: "Nellore",
  financials: {
    revenue: 18200000,
    costOfGoodsSold: 11200000,
    grossProfit: 7000000,
    expenses: 1800000,
    netProfit: 5200000,
    cashAndBank: 1500000,
    receivables: 650000,
    payables: 500000,
    shortTermLoans: 500000,
    otherAssets: 300000,
    utilityBills: 250000,
    employeeWages: 1200000,
    marketingExpenses: 250000,
    maintenanceExpenses: 200000
  },
  commercialAssets: [
    // Fuel Station 1
    {
      type: "Fuel Station",
      id: "fuelStation1",
      pan: "AAAFN1234K",
      gst: "37AAAFN1234K1ZP",
      financials: {
        revenue: 3000000,
        costOfGoodsSold: 2000000,
        cashAndBank: 250000,
        receivables: 100000,
        payables: 80000,
        expenses: 120000,
        employeeWages: 250000,
        utilityBills: 60000,
        maintenanceExpenses: 40000,
        marketingExpenses: 50000
      },
      inventory: [
        {
          name: "Diesel",
          quantity: 5000,
          unit: "liters",
          currentValue: 450000,
          receivable: {
            quantity: 2000,
            expectedDate: "2023-06-01",
            expectedValue: 180000
          },
          lastUpdated: "2023-05-15"
        },
        {
          name: "Petrol",
          quantity: 3000,
          unit: "liters",
          currentValue: 330000,
          receivable: {
            quantity: 1500,
            expectedDate: "2023-05-25",
            expectedValue: 165000
          },
          lastUpdated: "2023-05-12"
        }
      ]
    },
    // Fuel Station 2
    {
      type: "Fuel Station",
      id: "fuelStation2",
      pan: "AAAFN2234K",
      gst: "37AAAFN2234K1ZR",
      financials: {
        revenue: 2800000,
        costOfGoodsSold: 1900000,
        cashAndBank: 230000,
        receivables: 90000,
        payables: 70000,
        expenses: 100000,
        employeeWages: 240000,
        utilityBills: 50000,
        maintenanceExpenses: 30000,
        marketingExpenses: 60000
      },
      inventory: [
        {
          name: "Diesel",
          quantity: 4000,
          unit: "liters",
          currentValue: 360000,
          receivable: {
            quantity: 2500,
            expectedDate: "2023-05-28",
            expectedValue: 225000
          },
          lastUpdated: "2023-05-10"
        },
        {
          name: "Lubricants",
          quantity: 150,
          unit: "liters",
          currentValue: 75000,
          receivable: {
            quantity: 50,
            expectedDate: "2023-05-22",
            expectedValue: 25000
          },
          lastUpdated: "2023-05-05"
        }
      ]
    },
    // Fuel Station 3
    {
      type: "Fuel Station",
      id: "fuelStation3",
      pan: "AAAFN3234K",
      gst: "37AAAFN3234K1ZT",
      financials: {
        revenue: 3200000,
        costOfGoodsSold: 2100000,
        cashAndBank: 270000,
        receivables: 110000,
        payables: 90000,
        expenses: 150000,
        employeeWages: 260000,
        utilityBills: 70000,
        maintenanceExpenses: 35000,
        marketingExpenses: 40000
      },
      inventory: [
        {
          name: "Diesel",
          quantity: 6000,
          unit: "liters",
          currentValue: 540000,
          receivable: {
            quantity: 3000,
            expectedDate: "2023-05-30",
            expectedValue: 270000
          },
          lastUpdated: "2023-05-18"
        },
        {
          name: "Gasoline",
          quantity: 2500,
          unit: "liters",
          currentValue: 275000,
          receivable: {
            quantity: 1000,
            expectedDate: "2023-05-24",
            expectedValue: 110000
          },
          lastUpdated: "2023-05-14"
        }
      ]
    },
    // Shopping Complex
    {
      type: "Shopping Complex",
      id: "shoppingComplex1",
      pan: "AAASC5678M",
      gst: "37AAASC5678M1ZQ",
      financials: {
        revenue: 1500000,
        costOfGoodsSold: 800000,
        cashAndBank: 200000,
        receivables: 75000,
        payables: 60000,
        expenses: 120000,
        employeeWages: 180000,
        utilityBills: 40000,
        maintenanceExpenses: 30000,
        marketingExpenses: 20000
      },
      inventory: [
        {
          name: "Office Furniture",
          quantity: 50,
          unit: "sets",
          currentValue: 100000,
          receivable: {
            quantity: 10,
            expectedDate: "2023-06-05",
            expectedValue: 20000
          },
          lastUpdated: "2023-05-20"
        },
        {
          name: "Cleaning Supplies",
          quantity: 200,
          unit: "units",
          currentValue: 10000,
          receivable: {
            quantity: 50,
            expectedDate: "2023-05-27",
            expectedValue: 2500
          },
          lastUpdated: "2023-05-16"
        }
      ]
    },
    // Provision Store
    {
      type: "Provision Store",
      id: "provisionStore1",
      pan: "AAAPS9012N",
      gst: "37AAAPS9012N1ZS",
      financials: {
        revenue: 800000,
        costOfGoodsSold: 500000,
        cashAndBank: 120000,
        receivables: 40000,
        payables: 30000,
        expenses: 80000,
        employeeWages: 100000,
        utilityBills: 20000,
        maintenanceExpenses: 15000,
        marketingExpenses: 10000
      },
      inventory: [
        {
          name: "Rice",
          quantity: 10000,
          unit: "kg",
          currentValue: 200000,
          receivable: {
            quantity: 5000,
            expectedDate: "2023-05-29",
            expectedValue: 100000
          },
          lastUpdated: "2023-05-11"
        },
        {
          name: "Sugar",
          quantity: 5000,
          unit: "kg",
          currentValue: 50000,
          receivable: {
            quantity: 2000,
            expectedDate: "2023-05-23",
            expectedValue: 20000
          },
          lastUpdated: "2023-05-07"
        }
      ]
    },
    // Cricket Ground
    {
      type: "Cricket Ground",
      id: "cricketGround1",
      pan: "AAACG3456P",
      gst: "37AAACG3456P1ZT",
      financials: {
        revenue: 500000,
        expenses: 200000,
        cashAndBank: 100000,
        receivables: 30000,
        payables: 25000,
        employeeWages: 80000,
        utilityBills: 30000,
        maintenanceExpenses: 40000,
        marketingExpenses: 15000
      },
      inventory: [
        {
          name: "Cricket Balls",
          quantity: 100,
          unit: "pieces",
          currentValue: 10000,
          receivable: {
            quantity: 20,
            expectedDate: "2023-05-26",
            expectedValue: 2000
          },
          lastUpdated: "2023-05-17"
        },
        {
          name: "Batting Gear",
          quantity: 30,
          unit: "sets",
          currentValue: 20000,
          receivable: {
            quantity: 5,
            expectedDate: "2023-06-02",
            expectedValue: 3500
          },
          lastUpdated: "2023-05-12"
        }
      ]
    },
    // CNG Station Land
    {
      type: "Land leased for CNG Station",
      id: "cngLand1",
      pan: "AAACN7890R",
      gst: "37AAACN7890R1ZU",
      financials: {
        revenue: 600000,
        expenses: 50000,
        cashAndBank: 150000,
        payables: 10000,
        maintenanceExpenses: 20000
      },
      inventory: []
    }
  ],
  nonCommercialAssets: [
    // Kalyanamandapam
    {
      type: "mandapam",
      id: "mandapam1",
      pan: "AAAKM1234Q",
      gst: "37AAAKM1234Q1ZV",
      financials: {
        revenue: 600000,
        expenses: 200000,
        cashAndBank: 80000,
        payables: 30000,
        utilityBills: 20000,
        employeeWages: 100000,
        maintenanceExpenses: 30000,
        marketingExpenses: 15000
      },
      inventory: [
        {
          name: "Chairs",
          quantity: 500,
          unit: "pieces",
          currentValue: 25000,
          receivable: {
            quantity: 100,
            expectedDate: "2023-05-30",
            expectedValue: 5000
          },
          lastUpdated: "2023-05-10"
        },
        {
          name: "Tablecloths",
          quantity: 100,
          unit: "pieces",
          currentValue: 5000,
          receivable: {
            quantity: 50,
            expectedDate: "2023-05-25",
            expectedValue: 2500
          },
          lastUpdated: "2023-05-15"
        }
      ]
    },
    // CPC
    {
      type: "CPC",
      id: "cpc1",
      pan: "AAACP4567S",
      gst: "37AAACP4567S1ZW",
      financials: {
        revenue: 400000,
        expenses: 250000,
        cashAndBank: 60000,
        payables: 20000,
        utilityBills: 30000,
        employeeWages: 120000,
        maintenanceExpenses: 25000,
        marketingExpenses: 10000
      },
      inventory: [
        {
          name: "Books",
          quantity: 2000,
          unit: "pieces",
          currentValue: 20000,
          receivable: {
            quantity: 500,
            expectedDate: "2023-06-10",
            expectedValue: 5000
          },
          lastUpdated: "2023-05-09"
        },
        {
          name: "Stationery",
          quantity: 500,
          unit: "sets",
          currentValue: 3000,
          receivable: {
            quantity: 200,
            expectedDate: "2023-05-28",
            expectedValue: 1200
          },
          lastUpdated: "2023-05-04"
        }
      ]
    },
    // Gas
    {
      type: "Gas",
      id: "gas1",
      pan: "AAAGG8912T",
      gst: "37AAAGG8912T1ZX",
      financials: {
        revenue: 300000,
        expenses: 180000,
        cashAndBank: 50000,
        payables: 15000,
        utilityBills: 25000,
        employeeWages: 80000,
        maintenanceExpenses: 20000
      },
      inventory: []
    },
    // Mineral Water Plant
    {
      type: "Mineral Water Plant",
      id: "waterPlant1",
      pan: "AAAMW2345U",
      gst: "37AAAMW2345U1ZY",
      financials: {
        revenue: 350000,
        expenses: 150000,
        cashAndBank: 70000,
        payables: 18000,
        utilityBills: 35000,
        employeeWages: 60000,
        maintenanceExpenses: 22000
      },
      inventory: [
        {
          name: "Water Bottles",
          quantity: 5000,
          unit: "units",
          currentValue: 25000,
          receivable: {
            quantity: 2000,
            expectedDate: "2023-05-31",
            expectedValue: 10000
          },
          lastUpdated: "2023-05-16"
        }
      ]
    },
    // Hospital
    {
      type: "Hospital",
      id: "hospital1",
      pan: "AAAHM6789V",
      gst: "37AAAHM6789V1ZZ",
      financials: {
        revenue: 800000,
        expenses: 500000,
        cashAndBank: 120000,
        payables: 40000,
        utilityBills: 60000,
        employeeWages: 300000,
        maintenanceExpenses: 50000,
        marketingExpenses: 10000
      },
      inventory: [
        {
          name: "Medical Supplies",
          quantity: 1000,
          unit: "sets",
          currentValue: 50000,
          receivable: {
            quantity: 300,
            expectedDate: "2023-05-27",
            expectedValue: 15000
          },
          lastUpdated: "2023-05-14"
        }
      ]
    },
    // Guest House
    {
      type: "Guest House",
      id: "guestHouse1",
      pan: "AAAGH0123W",
      gst: "37AAAGH0123W1ZG",
      financials: {
        revenue: 250000,
        expenses: 120000,
        cashAndBank: 40000,
        payables: 15000,
        utilityBills: 15000,
        employeeWages: 30000,
        maintenanceExpenses: 12000,
        marketingExpenses: 5000
      },
      inventory: [
        {
          name: "Furniture",
          quantity: 20,
          unit: "sets",
          currentValue: 10000,
          receivable: {
            quantity: 5,
            expectedDate: "2023-06-15",
            expectedValue: 2500
          },
          lastUpdated: "2023-05-08"
        },
        {
          name: "Bedding",
          quantity: 30,
          unit: "sets",
          currentValue: 5000,
          receivable: {
            quantity: 10,
            expectedDate: "2023-05-29",
            expectedValue: 1700
          },
          lastUpdated: "2023-05-05"
        }
      ]
    }
  ]
};

  

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// const Sidebar = ({ activeAssetId }) => {
//   const navigate = useNavigate();
//   const { assetId, unitId } = useParams();

//   const [openSections, setOpenSections] = useState({
//     units: true,
//     commercialAssets: false,
//     nonCommercialAssets: false
//   });

//   const [searchQuery, setSearchQuery] = useState("");

//   const navigateToAsset = (assetId) => {
//     const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
//     setOpenSections(prev => ({
//       ...prev,
//       units: true,
//       commercialAssets: isCommercial,
//       nonCommercialAssets: !isCommercial
//     }));
//     navigate(`/${assetId}`);
//   };

//   const navigateToUnit = () => {
//     setOpenSections(prev => ({
//       ...prev,
//       commercialAssets: false,
//       nonCommercialAssets: false
//     }));
//     navigate("/NelloreUnit");
//   };

//   const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
//   const isAssetActive = (id) => activeAssetId === id;
//   const isUnitActive = () => unitId === "NelloreUnit";
//   const clearSearch = () => setSearchQuery("");

//   useEffect(() => {
//     if (assetId) {
//       const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
//       setOpenSections({
//         units: true,
//         commercialAssets: isCommercial,
//         nonCommercialAssets: !isCommercial
//       });
//     }
//   }, [assetId]);

//   return (
//     <div className="w-full max-w-xs bg-gradient-to-b from-blue-900 to-blue-800 text-white p-3 flex flex-col h-screen border-r border-blue-700 shadow-xl">
//       <div className="flex justify-center mb-3">
//         <img src="/company logo.jpeg" alt="Company Logo" className="w-32 h-auto object-contain" />
//       </div>

//       <div className="relative mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-3 py-1.5 pr-10 rounded-md bg-blue-700 bg-opacity-50 placeholder-blue-200 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-600"
//         />
//         {searchQuery && (
//           <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200">
//             <FaTimes />
//           </button>
//         )}
//       </div>

//       <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1 text-sm">
//         <div className="space-y-2">
//           <div
//             className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
//               isUnitActive() ? 'bg-blue-600 shadow-inner' : 'bg-blue-800 hover:bg-blue-700'
//             }`}
//             onClick={() => {
//               toggleSection('units');
//               navigateToUnit();
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <FaBuilding className="text-blue-300 text-base" />
//               <span className="font-medium">Nellore Unit</span>
//             </div>
//             {openSections.units ? <FaChevronUp className="text-blue-300" /> : <FaChevronDown className="text-blue-300" />}
//           </div>

//           {openSections.units && (
//             <div className="ml-1 space-y-2 pl-3 border-l border-blue-700">
//               {[{
//                 key: 'commercialAssets',
//                 label: 'Commercial Assets',
//                 icon: <FaGasPump className="text-orange-300" />,
//                 items: nelloreUnit.commercialAssets,
//                 color: 'bg-blue-600'
//               }, {
//                 key: 'nonCommercialAssets',
//                 label: 'Non-Commercial Assets',
//                 icon: <FaHome className="text-teal-300" />,
//                 items: nelloreUnit.nonCommercialAssets,
//                 color: 'bg-blue-600'
//               }].map(({ key, label, icon, items, color }) => (
//                 <div
//                   key={key}
//                   className={`p-2 rounded-md cursor-pointer ${openSections[key] ? "bg-blue-700 bg-opacity-50" : "bg-blue-800 hover:bg-blue-700"}`}
//                   onClick={() => toggleSection(key)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       {icon}
//                       <span className="font-medium">{label} ({items.length})</span>
//                     </div>
//                     {openSections[key] ? <FaChevronUp className="text-blue-300" /> : <FaChevronDown className="text-blue-300" />}
//                   </div>

//                   {openSections[key] && (
//                     <div className="mt-2 space-y-2 pl-2">
//                       {items.map(asset => (
//                         <div
//                           key={`${key}-${asset.id}`}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigateToAsset(asset.id);
//                           }}
//                           className={`p-2 rounded-md cursor-pointer ${isAssetActive(asset.id) ? 'bg-blue-600 text-white shadow' : 'bg-blue-900 hover:bg-blue-700'}`}
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="font-medium truncate w-[60%]">{asset.type}</span>
//                             <span className={`text-xs ${color} px-2 py-0.5 rounded-full whitespace-nowrap`}>
//                               {formatCurrency(asset.financials.revenue)}
//                             </span>
//                           </div>
//                           <div className="mt-1 flex justify-between text-xs text-blue-200">
//                             <span>PAN: {asset.pan || 'N/A'}</span>
//                             <span>GST: {asset.gst || 'N/A'}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


//2nd version------------------------------------------------------------------------

// const Sidebar = ({ activeAssetId }) => {
//   const navigate = useNavigate();
//   const { assetId, unitId } = useParams();

//   const [openSections, setOpenSections] = useState({
//     units: true,
//     commercialAssets: false,
//     nonCommercialAssets: false
//   });

//   const [searchQuery, setSearchQuery] = useState("");

  // // Navigation handlers
  // const navigateToAsset = (assetId) => {
  //   const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
  //   setOpenSections(prev => ({
  //     ...prev,
  //     units: true,
  //     commercialAssets: isCommercial,
  //     nonCommercialAssets: !isCommercial
  //   }));
  //   navigate(`/${assetId}`);
  // };

  // const navigateToUnit = () => {
  //   setOpenSections(prev => ({
  //     ...prev,
  //     commercialAssets: false,
  //     nonCommercialAssets: false
  //   }));
  //   navigate("/NelloreUnit");
  // };

  // const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  // const isAssetActive = (id) => activeAssetId === id;
  // const isUnitActive = () => unitId === "NelloreUnit";
  // const clearSearch = () => setSearchQuery("");

  // useEffect(() => {
  //   if (assetId) {
  //     const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
  //     setOpenSections({
  //       units: true,
  //       commercialAssets: isCommercial,
  //       nonCommercialAssets: !isCommercial
  //     });
  //   }
  // }, [assetId]);

//   return (
//     <div className="w-72 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white p-4 flex flex-col h-screen border-r border-indigo-700 shadow-2xl">
//       {/* Logo Section */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-indigo-600 rounded-lg shadow">
//             <FaChartLine className="text-white text-xl" />
//           </div>
//           <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
//             AssetInsight
//           </h1>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="relative mb-6 group">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FaSearch className="text-indigo-300 group-hover:text-indigo-100 transition-colors" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search assets..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full pl-10 pr-8 py-2.5 rounded-lg bg-indigo-800/60 backdrop-blur-sm 
//                     placeholder-indigo-300 text-white text-sm focus:outline-none 
//                     focus:ring-2 focus:ring-indigo-500 border border-indigo-700/50 
//                     hover:border-indigo-500 transition-all duration-200"
//         />
//         {searchQuery && (
//           <button 
//             onClick={clearSearch} 
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 
//                       text-indigo-300 hover:text-white transition-colors"
//           >
//             <FaTimes className="text-sm" />
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
//         {/* Dashboard Link */}
//         <div 
//           className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all
//                     ${isUnitActive() ? 'bg-indigo-600/80 shadow-md' : 'hover:bg-indigo-800/60'}`}
//           onClick={navigateToUnit}
//         >
//           <div className="p-2 bg-indigo-500/20 rounded-lg">
//             <FaRegChartBar className="text-indigo-200" />
//           </div>
//           <span className="font-medium">Dashboard Overview</span>
//         </div>

//         {/* Unit Section */}
//         <div className="space-y-1 mt-4">
//           <div
//             className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all
//                       ${isUnitActive() ? 'bg-indigo-600/80 shadow-md' : 'bg-indigo-800/30 hover:bg-indigo-800/60'}`}
//             onClick={() => toggleSection('units')}
//           >
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-indigo-500/20 rounded-lg">
//                 <FaBuilding className="text-indigo-200" />
//               </div>
//               <span className="font-medium">Nellore Unit</span>
//             </div>
//             {openSections.units ? (
//               <FaChevronUp className="text-indigo-300 text-xs" />
//             ) : (
//               <FaChevronDown className="text-indigo-300 text-xs" />
//             )}
//           </div>

//           {openSections.units && (
//             <div className="ml-2 space-y-1 pl-4 border-l-2 border-indigo-700/50">
//               {[{
//                 key: 'commercialAssets',
//                 label: 'Commercial Assets',
//                 icon: <FaGasPump className="text-amber-300" />,
//                 items: nelloreUnit.commercialAssets,
//                 color: 'bg-gradient-to-r from-amber-500 to-amber-600'
//               }, {
//                 key: 'nonCommercialAssets',
//                 label: 'Non-Commercial Assets',
//                 icon: <FaHome className="text-emerald-300" />,
//                 items: nelloreUnit.nonCommercialAssets,
//                 color: 'bg-gradient-to-r from-emerald-500 to-emerald-600'
//               }].map(({ key, label, icon, items, color }) => (
//                 <div key={key} className="space-y-1">
//                   <div
//                     className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
//                               ${openSections[key] ? 'bg-indigo-700/30' : 'hover:bg-indigo-800/40'}`}
//                     onClick={() => toggleSection(key)}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="p-1.5 bg-indigo-500/10 rounded-md">
//                         {icon}
//                       </div>
//                       <div>
//                         <span className="font-medium">{label}</span>
//                         <span className="ml-2 text-xs bg-indigo-900/50 px-2 py-0.5 rounded-full">
//                           {items.length}
//                         </span>
//                       </div>
//                     </div>
//                     {openSections[key] ? (
//                       <FaChevronUp className="text-indigo-300 text-xs" />
//                     ) : (
//                       <FaChevronDown className="text-indigo-300 text-xs" />
//                     )}
//                   </div>

//                   {openSections[key] && (
//                     <div className="ml-2 space-y-1 pl-3 border-l-2 border-indigo-700/30">
//                       {items.map(asset => (
//                         <div
//                           key={`${key}-${asset.id}`}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigateToAsset(asset.id);
//                           }}
//                           className={`p-3 rounded-lg cursor-pointer transition-all flex flex-col
//                                     ${isAssetActive(asset.id) 
//                                       ? 'bg-indigo-600/80 shadow-md' 
//                                       : 'hover:bg-indigo-800/40'}`}
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="font-medium truncate">{asset.type}</span>
//                             <span className={`text-xs ${color} px-2.5 py-1 rounded-full whitespace-nowrap text-white shadow-sm`}>
//                               {formatCurrency(asset.financials.revenue)}
//                             </span>
//                           </div>
//                           <div className="mt-1.5 flex justify-between text-xs text-indigo-300">
//                             <span>PAN: {asset.pan || 'N/A'}</span>
//                             <span>GST: {asset.gst || 'N/A'}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Additional Menu Items */}
//         <div className="mt-6 space-y-1">
//           <div className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:bg-indigo-800/60 transition-all">
//             <div className="p-2 bg-indigo-500/20 rounded-lg">
//               <FaRegBuilding className="text-indigo-200" />
//             </div>
//             <span className="font-medium">All Units</span>
//           </div>
//           <div className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:bg-indigo-800/60 transition-all">
//             <div className="p-2 bg-indigo-500/20 rounded-lg">
//               <FaCog className="text-indigo-200" />
//             </div>
//             <span className="font-medium">Settings</span>
//           </div>
//         </div>
//       </nav>

//       {/* User Profile */}
//       <div className="mt-auto pt-4 border-t border-indigo-700/50">
//         <div className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer hover:bg-indigo-800/60 transition-all">
//           <div className="p-2 bg-indigo-500/20 rounded-lg">
//             <FaUserCircle className="text-indigo-200 text-xl" />
//           </div>
//           <div>
//             <p className="font-medium">Admin User</p>
//             <p className="text-xs text-indigo-300">admin@assetinsight.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



const Sidebar = ({ activeAssetId, setActiveAssetId }) => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  

  const [openSections, setOpenSections] = useState({
    units: false,
    commercialAssets: false,
    nonCommercialAssets: false
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const scrollbarStyle = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(30, 41, 59, 0.3);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(100, 116, 139, 0.6);
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(148, 163, 184, 0.8);
    }
  `;


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateToAsset = (assetId) => {
    setActiveAssetId(assetId);
    const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
    setOpenSections({
      units: true,
      commercialAssets: isCommercial,
      nonCommercialAssets: !isCommercial
    });
    navigate(`/${assetId}`);
    if (isMobile) setSidebarOpen(false);
  };

  const navigateToAPDashboard = () => {
    setActiveAssetId(null);
    setOpenSections({
      units: false,
      commercialAssets: false,
      nonCommercialAssets: false
    });
    navigate("/AP");
    if (isMobile) setSidebarOpen(false);
  };

  const navigateToNelloreUnit = () => {
    // Check if the Nellore unit is already active
    const isAlreadyActive = activeAssetId === "NelloreUnit" && openSections.units;
    
    if (isAlreadyActive) {
      // If already active, close the units section
      setOpenSections(prev => ({
        ...prev,
        units: false
      }));
    } else {
      // If not active, navigate and open the units section
      setActiveAssetId("NelloreUnit");
      setOpenSections({
        units: true,
        commercialAssets: false,
        nonCommercialAssets: false
      });
      navigate("/NelloreUnit");
      if (isMobile) setSidebarOpen(false);
    }
  };

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  
  const isAPDashboardActive = () => {
    return window.location.pathname === '/' || window.location.pathname === '/AP';
  };

  const isNelloreUnitActive = () => {
    return window.location.pathname === '/NelloreUnit';
  };

  const isAssetActive = (id) => {
    return window.location.pathname === `/${id}`;
  };

  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/AP') {
      setOpenSections({
        units: false,
        commercialAssets: false,
        nonCommercialAssets: false
      });
    } else if (path === '/NelloreUnit') {
      setOpenSections({
        units: true,
        commercialAssets: false,
        nonCommercialAssets: false
      });
    } else if (assetId) {
      const isCommercial = nelloreUnit.commercialAssets.some(a => a.id === assetId);
      setOpenSections({
        units: true,
        commercialAssets: isCommercial,
        nonCommercialAssets: !isCommercial
      });
    }
  }, [assetId]);

  if (!sidebarOpen && isMobile) {
    return (
      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed z-40 left-0 top-4 ml-2 p-2 rounded-r-lg bg-slate-800/90 shadow-lg border border-slate-700"
      >
        <FiChevronRight className="text-white" />
      </button>
    );
  }

  return (
    <>
      <style>{scrollbarStyle}</style>
      <div className={`fixed md:relative z-50 w-64 h-screen flex flex-col bg-slate-900 border-r border-slate-700 shadow-xl transition-all duration-300 ${sidebarOpen ? 'left-0' : '-left-64'}`}>
        {isMobile && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="absolute right-0 top-0 mr-2 mt-2 p-1 rounded-full bg-slate-800/50 hover:bg-slate-700"
          >
            <FiX className="text-slate-300" />
          </button>
        )}

        <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow">
              <FiBarChart2 className="text-white text-lg" />
            </div>
            <h1 className="text-lg font-semibold text-white tracking-tight">SYNCUITY</h1>
          </div>
        </div>

        <div className="p-3 border-b border-slate-700">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-7 py-2 text-sm bg-slate-800 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        <nav  className="flex-1 overflow-y-auto overflow-x-hidden py-1 px-2 custom-scrollbar space-y-1">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all
                      ${isAPDashboardActive() ? 'bg-blue-600/90 text-white shadow-md' : 'hover:bg-slate-800/70 text-slate-200'}`}
            onClick={navigateToAPDashboard}
          >
            <FiPieChart className="text-lg" />
            <span className="ml-3 text-sm font-medium">Dashboard</span>
            {isAPDashboardActive() && <FiChevronRight className="ml-auto text-sm" />}
          </motion.div>

          <div className="space-y-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition-all border-l-4 border-b
                ${isNelloreUnitActive() ? 
                  'bg-blue-900/40 border-blue-400 border-b-blue-500 shadow-md' : 
                  'hover:bg-slate-800/50 border-slate-700/70 border-b-slate-700/50 text-slate-200'}`}
              
              onClick={navigateToNelloreUnit}
            >
              <div className={`p-1.5 rounded-md ${
                isNelloreUnitActive() ? 
                'bg-blue-500 text-white shadow-sm' : 
                'bg-slate-700/60 text-slate-300'
              }`}>
                <FiDatabase className="text-lg" />
              </div>
              <div className="ml-3">
                <span className={`text-sm font-medium ${
                  isNelloreUnitActive() ? 'text-white' : 'text-slate-200'
                }`}>
                  Nellore Unit
                </span>
                <span className={`block text-xs ${
                  isNelloreUnitActive() ? 'text-blue-200' : 'text-slate-400'
                } mt-0.5`}>
                  {nelloreUnit.commercialAssets.length + nelloreUnit.nonCommercialAssets.length} assets
                </span>
              </div>
              <div className="ml-auto">
                {openSections.units ? (
                  <FiChevronDown className={`text-sm ${
                    isNelloreUnitActive() ? 'text-blue-300' : 'text-slate-400'
                  }`} />
                ) : (
                  <FiChevronRight className={`text-sm ${
                    isNelloreUnitActive() ? 'text-blue-300' : 'text-slate-400'
                  }`} />
                )}
              </div>
            </motion.div>

            <AnimatePresence>
              {openSections.units && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2 pl-3 border-l border-slate-700/50 space-y-1"
                >
                  {[{
                    key: 'commercialAssets',
                    label: 'Commercial',
                    icon: <FiDollarSign className="text-blue-400" />,
                    items: nelloreUnit.commercialAssets,
                    activeColor: 'bg-blue-900/30',
                    borderColor: 'border-blue-500',
                    textColor: 'text-blue-100'
                  }, {
                    key: 'nonCommercialAssets',
                    label: 'Non-Commercial',
                    icon: <FiHome className="text-indigo-400" />,
                    items: nelloreUnit.nonCommercialAssets,
                    activeColor: 'bg-indigo-900/30',
                    borderColor: 'border-indigo-500',
                    textColor: 'text-indigo-100'
                  }].map(({ key, label, icon, items, activeColor, borderColor, textColor }) => (
                    <div key={key} className="space-y-1">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all
                                  ${openSections[key] ? `${activeColor} border-l-2 ${borderColor} shadow-sm` : 'hover:bg-slate-800/40'}`}
                        onClick={() => toggleSection(key)}
                      >
                        <div className={`p-1 rounded-md ${openSections[key] ? 'bg-slate-700/30' : 'bg-slate-700/50'}`}>
                          {icon}
                        </div>
                        <span className={`ml-2 text-sm ${openSections[key] ? `font-semibold ${textColor}` : 'text-slate-300'}`}>
                          {label}
                        </span>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                          {items.length}
                        </span>
                      </motion.div>

                      <AnimatePresence>
                        {openSections[key] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2 pl-3 border-l border-slate-700/30 space-y-1"
                          >
                            {items.map(asset => (
                              <motion.div
                                key={`${key}-${asset.id}`}
                                whileHover={{ scale: 1.01 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateToAsset(asset.id);
                                }}
                                className={`p-2 rounded-lg cursor-pointer transition-all flex flex-col 
                                  border ${isAssetActive(asset.id) 
                                    ? `border-slate-700 ${activeColor} border-l-2 ${borderColor} font-medium ${textColor} shadow-inner` 
                                    : 'border-slate-700/50 hover:bg-slate-800/30 text-slate-200 hover:border-slate-600'}`}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{asset.type}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${isAssetActive(asset.id) ? 'bg-blue-600/30 text-blue-100' : 'bg-slate-700/50 text-slate-300'}`}>
                                    {formatCurrency(asset.financials.revenue)}
                                  </span>
                                </div>
                                <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
                                  <span>PAN: {asset.pan || 'N/A'}</span>
                                  <span>GST: {asset.gst || 'N/A'}</span>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
  whileHover={{ scale: 1.02 }}
  className={`flex items-center p-2 rounded-lg cursor-pointer transition-all border-l-4 border-b 
    hover:bg-slate-800/50 border-slate-700/70 border-b-slate-700/50 text-slate-200`}
>
  <div className="p-1.5 rounded-md bg-slate-700/60 text-slate-300">
    <FiDatabase className="text-lg" />
  </div>
  <div className="ml-3">
    <span className="text-sm font-medium text-slate-200">Srikakulam Unit</span>
    <span className="block text-xs text-slate-400 mt-0.5">Data loading soon...</span>
  </div>
  <div className="ml-auto">
    <FiChevronRight className="text-sm text-slate-400" />
  </div>
</motion.div>

        </nav>

        <div className="mt-auto p-3 border-t border-slate-700 bg-gradient-to-t from-slate-800/70 to-slate-900/50">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-1.5 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="p-1.5 bg-blue-600 rounded-md shadow">
              <FiUser className="text-white text-sm" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">admin@analtica.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

