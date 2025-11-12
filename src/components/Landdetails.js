// import React, { useState } from 'react';
// import { 
//   ArrowLeft,
//   FileText, 
//   MapPin, 
//   User, 
//   Calendar, 
//   Ruler, 
//   Shield, 
//   Download,
//   Eye,
//   Home,
//   Building,
//   Trees,
//   Factory,
//   X
// } from 'lucide-react';
// import LandMap from './LandMap';

// const LandDetails = ({ landId = 1 }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedDocument, setSelectedDocument] = useState(null);

//   // Mock data - replace with actual data fetching based on landId
//   const landData = {
//     id: 1,
//     surveyNo: "SY-2024-001",
//     village: "Machilipatnam",
//     district: "Krishna",
//     mandal: "Machilipatnam Mandal",
//     state: "Andhra Pradesh",
//     pincode: "521001",
//     area: "2.5",
//     landType: "Agricultural",
//     owner: {
//       name: "Rajesh Kumar",
//       fatherName: "Ramesh Kumar",
//       aadhaar: "XXXX-XXXX-1234",
//       phone: "+91 98765 43210",
//       address: "123, MG Road, Machilipatnam, Krishna - 521001"
//     },
//     registrationDate: "2023-05-15",
//     lastUpdated: "2024-01-15",
//     marketValue: "₹1,25,00,000",
//     propertyTax: "₹15,000",
//     coordinates: {
//       latitude: "16.1860° N",
//       longitude: "81.1300° E"
//     },
//     documents: [
//       {
//         id: 1,
//         name: "Sale Deed",
//         type: "Primary",
//         uploadDate: "2023-05-15",
//         size: "2.3 MB",
//         url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
//       },
//       {
//         id: 2,
//         name: "Survey Settlement",
//         type: "Secondary",
//         uploadDate: "2023-05-16",
//         size: "1.8 MB",
//         url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
//       },
//       {
//         id: 3,
//         name: "Property Tax Receipt",
//         type: "Supporting",
//         uploadDate: "2024-01-10",
//         size: "0.9 MB",
//         url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
//       },
//       {
//         id: 4,
//         name: "Khata Certificate",
//         type: "Primary",
//         uploadDate: "2023-05-17",
//         size: "1.5 MB",
//         url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
//       }
//     ],
//     boundaries: {
//       north: "Survey No. 45 - Ram Prasad",
//       south: "Survey No. 47 - Canal Road",
//       east: "Survey No. 46 - Gita Devi",
//       west: "Survey No. 44 - Municipal Land"
//     },
//     images: [
//       "/assets/fuelstation2.jpg",
//       "/assets/fuelstation1.webp",
//       "/assets/fuelstation3.avif"
//     ]
//   };

//   const getLandTypeIcon = (type) => {
//     switch (type) {
//       case 'Residential': return <Home className="w-5 h-5" />;
//       case 'Commercial': return <Building className="w-5 h-5" />;
//       case 'Agricultural': return <Trees className="w-5 h-5" />;
//       case 'Industrial': return <Factory className="w-5 h-5" />;
//       default: return <MapPin className="w-5 h-5" />;
//     }
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
//     { id: 'documents', label: 'Documents', icon: <Shield className="w-4 h-4" /> },
//     { id: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
//     { id: 'owner', label: 'Owner Details', icon: <User className="w-4 h-4" /> }
//   ];

//   const handleViewDocument = (document) => {
//     setSelectedDocument(document);
//   };

//   const handleCloseDocument = () => {
//     setSelectedDocument(null);
//   };




//   return (
//     <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
//       {/* Document Viewer Modal */}
// {selectedDocument && (
//   <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">
//           {selectedDocument.name}
//         </h3>
//         <button
//           onClick={handleCloseDocument}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <X className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>

//       {/* Content (scrollable only here) */}
//       <div className="flex-1 p-4 overflow-auto">
//         <img
//           src={selectedDocument.url}
//           alt={selectedDocument.name}
//           className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg mx-auto"
//         />
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
//         <span className="text-sm text-gray-600">
//           {selectedDocument.type} Document • {selectedDocument.size}
//         </span>
//         <button
//           onClick={() => window.open(selectedDocument.url, "_blank")}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Download className="w-4 h-4" />
//           <span>Download</span>
//         </button>
//       </div>
//     </div>
//   </div>
// )}


//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-lg shadow-lg border-b-4 border-orange-500 p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-orange-400">
//                 {getLandTypeIcon(landData.landType)}
//                 <span className="text-blue-900 font-bold text-sm ml-1">
//                   {landData.landType.charAt(0)}
//                 </span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">
//                   Survey No: {landData.surveyNo}
//                 </h1>
//                 <p className="text-blue-200">
//                   {landData.village}, {landData.district}
//                 </p>
//               </div>
//             </div>
//             <div className="mb-4">
//               <button
//                 onClick={() => window.history.back()}
//                 className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 border-2 border-orange-400"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back to Dashboard</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white rounded-lg shadow-lg border border-blue-200 mb-6">
//           <div className="border-b border-blue-100">
//             <nav className="flex space-x-8 px-6">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-blue-600 hover:text-blue-800 hover:border-blue-300'
//                   }`}
//                 >
//                   {tab.icon}
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === 'overview' && (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Land Images */}
//                 <div className="lg:col-span-2">
//                   <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg overflow-hidden mb-6 border-2 border-blue-200">
//                     <img
//                       src={landData.images[0]}
//                       alt="Land view"
//                       className="w-full h-80 object-cover"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     {landData.images.slice(1).map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`Land view ${index + 2}`}
//                         className="w-full h-32 object-cover rounded-lg border-2 border-blue-200"
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Key Information */}
//                 <div className="space-y-6">
//                   <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-lg p-6 border-2 border-orange-400 shadow-lg">
//                     <h3 className="text-lg font-semibold text-white mb-4">Land Details</h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-blue-200">Area</span>
//                         <span className="font-semibold text-white">{landData.area} acres</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-blue-200">Type</span>
//                         <span className="font-semibold text-white">{landData.landType}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-blue-200">Market Value</span>
//                         <span className="font-semibold text-orange-400">{landData.marketValue}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-blue-200">Property Tax</span>
//                         <span className="font-semibold text-white">{landData.propertyTax}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
//                     <h3 className="text-lg font-semibold text-blue-900 mb-4">Boundaries</h3>
//                     <div className="space-y-3 text-sm">
//                       <div>
//                         <span className="font-medium text-blue-800">North:</span>
//                         <p className="text-blue-700 mt-1">{landData.boundaries.north}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-blue-800">South:</span>
//                         <p className="text-blue-700 mt-1">{landData.boundaries.south}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-blue-800">East:</span>
//                         <p className="text-blue-700 mt-1">{landData.boundaries.east}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-blue-800">West:</span>
//                         <p className="text-blue-700 mt-1">{landData.boundaries.west}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'documents' && (
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-blue-900">Land Documents</h3>
//                   <span className="text-sm text-blue-600">{landData.documents.length} documents</span>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {landData.documents.map((doc) => (
//                     <div key={doc.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-orange-300">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-start space-x-3">
//                           <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                             <FileText className="w-5 h-5 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-blue-900">{doc.name}</h4>
//                             <p className="text-sm text-blue-700">{doc.type} Document</p>
//                             <p className="text-xs text-blue-600 mt-1">
//                               Uploaded: {doc.uploadDate} • {doc.size}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2 mt-4">
//                         <button 
//                           onClick={() => handleViewDocument(doc)}
//                           className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
//                         >
//                           <Eye className="w-4 h-4" />
//                           <span>View</span>
//                         </button>
//                         <button className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
//                           <Download className="w-4 h-4" />
//                           <span>Download</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'location' && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="space-y-6">
//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
//                     <h3 className="text-lg font-semibold text-blue-900 mb-4">Address Details</h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-3">
//                         <MapPin className="w-5 h-5 text-orange-500" />
//                         <div>
//                           <p className="font-medium text-blue-900">{landData.village}</p>
//                           <p className="text-sm text-blue-700">{landData.mandal}, {landData.district}</p>
//                           <p className="text-sm text-blue-700">{landData.state} - {landData.pincode}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
//                     <h3 className="text-lg font-semibold text-blue-900 mb-4">Coordinates</h3>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-blue-700">Latitude:</span>
//                         <span className="font-medium text-blue-900">{landData.coordinates.latitude}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-blue-700">Longitude:</span>
//                         <span className="font-medium text-blue-900">{landData.coordinates.longitude}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Google Maps iframe */}
//                 <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg h-96 flex items-center justify-center overflow-hidden relative border-2 border-blue-200">
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41270.31425265445!2d81.1307194!3d16.185790649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a49e7bb8e2c3e69%3A0x7f88ffaeefbbd4b!2sMachilipatnam%2C%20Andhra%20Pradesh!5e1!3m2!1sen!2sin!4v1759079524233!5m2!1sen!2sin"
//                     title="Land Location"
//                     className="w-full h-full rounded-lg border-0"
//                     allowFullScreen
//                     loading="lazy"
//                   />
                 

//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <p className="text-blue-800 bg-white/80 px-3 py-1 rounded border border-blue-200">Map Preview</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'owner' && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-blue-900 mb-4">Owner Information</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
//                         <User className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-blue-900">{landData.owner.name}</p>
//                         <p className="text-sm text-blue-700">S/o {landData.owner.fatherName}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3 pt-4 border-t border-blue-200">
//                       <div className="flex justify-between">
//                         <span className="text-blue-700">Aadhaar:</span>
//                         <span className="font-medium text-blue-900">{landData.owner.aadhaar}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-blue-700">Phone:</span>
//                         <span className="font-medium text-blue-900">{landData.owner.phone}</span>
//                       </div>
//                       <div>
//                         <span className="text-blue-700">Address:</span>
//                         <p className="font-medium text-blue-900 mt-1">{landData.owner.address}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-blue-900 mb-4">Registration Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-blue-700">Registration Date:</span>
//                       <span className="font-medium text-blue-900">{landData.registrationDate}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-blue-700">Last Updated:</span>
//                       <span className="font-medium text-blue-900">{landData.lastUpdated}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-blue-700">Survey Number:</span>
//                       <span className="font-medium text-blue-900">{landData.surveyNo}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandDetails;


import React, { useState } from 'react';
import { landRecordsSample } from '../data/landRecordSamples';
import { 
  MapPin, FileText, Building, Contract, Home, Ruler, 
  Calendar, Landmark, CheckCircle, AlertTriangle, Clock,
  ChevronDown, ChevronUp, Search, Filter, Eye, Download, X
} from 'lucide-react';

const LandAssetManagement = () => {
  const [selectedLand, setSelectedLand] = useState(landRecordsSample[0]);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    documents: true,
    building: true,
    lease: true
  });

  // Filter lands based on search and district
  const filteredLands = landRecordsSample.filter(land => {
    const matchesSearch = land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = filterDistrict === 'all' || land.district === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  const districts = [...new Set(landRecordsSample.map(land => land.district))];

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: MapPin },
    { id: 'documents', label: 'Title Documents', icon: FileText },
    { id: 'building', label: 'Building Infrastructure', icon: Building },
    { id: 'lease', label: 'Lease Management', icon: CheckCircle },
  ];

  // Mock document data for viewing
  const documentTypes = [
    {
      id: 1,
      name: "Allotment Proceedings",
      type: "Primary",
      available: selectedLand.titleDocuments.hasAllotmentProceedings,
      details: selectedLand.titleDocuments.proceedingsDetails,
      url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
    },
    {
      id: 2,
      name: "Sub-Division Record",
      type: "Secondary", 
      available: selectedLand.titleDocuments.hasSubDivisionRecord,
      details: null,
      url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
    },
    {
      id: 3,
      name: "Donation Registration",
      type: "Primary",
      available: selectedLand.titleDocuments.donationDetails !== null,
      details: selectedLand.titleDocuments.donationDetails,
      url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
    },
    {
      id: 4,
      name: "Building Plan Approval",
      type: "Secondary",
      available: selectedLand.buildingInfo.approvedPlans !== null,
      details: selectedLand.buildingInfo.approvedPlans,
      url: "https://www.amttided.org/Images/ContentPages/LANDDEED2.jpg"
    }
  ];

  const handleViewDocument = (doc) => {
    if (doc.available) {
      setSelectedDocument(doc);
    }
  };

  const handleCloseDocument = () => {
    setSelectedDocument(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending Documents': return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDocumentStatus = (hasDocuments) => 
    hasDocuments ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      {/* Document Viewer Modal - FIXED */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDocument.name}
              </h3>
              <button
                onClick={handleCloseDocument}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <img
                src={selectedDocument.url}
                alt={selectedDocument.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-600">
                {selectedDocument.type} Document • {selectedDocument.details ? selectedDocument.details.number : 'Sample Document'}
              </span>
              <button
                onClick={() => window.open(selectedDocument.url, "_blank")}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl shadow-lg border-b-4 border-orange-500 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-orange-400">
              <Building className="w-8 h-8 text-blue-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Asset Management</h1>
              <p className="text-blue-200">Comprehensive land asset details and documentation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Panel */}
      <div className="bg-white rounded-xl border border-blue-200 shadow-lg">
        {/* Tab Navigation */}
        <div className="border-b border-blue-100">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-blue-600 hover:text-blue-800 hover:border-blue-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Basic Land Information</h2>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedLand.status)}`}>
                  {selectedLand.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">District:</span>
                        <span className="font-medium">{selectedLand.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Mandal:</span>
                        <span className="font-medium">{selectedLand.mandal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Village:</span>
                        <span className="font-medium">{selectedLand.village}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Survey No:</span>
                        <span className="font-medium">{selectedLand.surveyNo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                      <Ruler className="w-4 h-4 mr-2" />
                      Land Extent
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Acres:</span>
                        <span className="font-medium">{selectedLand.extent.acres}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Sq. Meters:</span>
                        <span className="font-medium">{selectedLand.extent.sqMeters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Sq. Yards:</span>
                        <span className="font-medium">{selectedLand.extent.sqYards}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Timeline Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Last Updated:</span>
                        <span className="font-medium">{selectedLand.lastUpdated}</span>
                      </div>
                      {selectedLand.titleDocuments.proceedingsDetails && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Allotment Date:</span>
                          <span className="font-medium">{selectedLand.titleDocuments.proceedingsDetails.date}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Compliance Status */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-3">Compliance Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Allotment Proceedings:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getDocumentStatus(selectedLand.titleDocuments.hasAllotmentProceedings)}`}>
                          {selectedLand.titleDocuments.hasAllotmentProceedings ? 'Available' : 'Missing'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sub-Division Record:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getDocumentStatus(selectedLand.titleDocuments.hasSubDivisionRecord)}`}>
                          {selectedLand.titleDocuments.hasSubDivisionRecord ? 'Available' : 'Missing'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Building Plans:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getDocumentStatus(selectedLand.buildingInfo.approvedPlans !== null)}`}>
                          {selectedLand.buildingInfo.approvedPlans ? 'Approved' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Title Documents Tab - Documents will now work */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Title Documents & Compliance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentTypes.map((doc) => (
                  <div key={doc.id} className={`rounded-lg p-4 border-2 ${
                    doc.available
                      ? 'bg-green-50 border-green-300 hover:border-green-400 cursor-pointer'
                      : 'bg-red-50 border-red-300'
                  } transition-colors`}
                  onClick={() => doc.available && handleViewDocument(doc)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          doc.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doc.available ? 'Available' : 'Missing'}
                        </span>
                        {doc.available && (
                          <Eye className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    
                    {doc.available ? (
                      <div className="space-y-2 text-sm">
                        {doc.details && (
                          <>
                            {doc.details.number && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Document No:</span>
                                <span className="font-medium">{doc.details.number}</span>
                              </div>
                            )}
                            {doc.details.date && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{doc.details.date}</span>
                              </div>
                            )}
                            {doc.details.authority && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Authority:</span>
                                <span className="font-medium text-right">{doc.details.authority}</span>
                              </div>
                            )}
                            {doc.details.office && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Office:</span>
                                <span className="font-medium text-right">{doc.details.office}</span>
                              </div>
                            )}
                          </>
                        )}
                        <div className="pt-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDocument(doc);
                            }}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Document</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <p className="text-red-600 mb-2">{doc.name} are not available</p>
                        {selectedLand.titleDocuments.effortsForMissingDocs && (
                          <div className="bg-white rounded p-3 border">
                            <h4 className="font-medium mb-2 text-xs">Efforts Made:</h4>
                            <p className="text-xs text-gray-600 whitespace-pre-line">
                              {selectedLand.titleDocuments.effortsForMissingDocs}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Efforts Timeline for Missing Documents */}
              {!selectedLand.titleDocuments.hasAllotmentProceedings && selectedLand.titleDocuments.effortsForMissingDocs && (
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-6">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Efforts Timeline for Missing Documents
                  </h3>
                  <div className="bg-white rounded p-4 border">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {selectedLand.titleDocuments.effortsForMissingDocs}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Building Infrastructure Tab */}
          {activeTab === 'building' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Building Infrastructure</h2>
              
              {selectedLand.buildingInfo.plinthArea > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Building Details */}
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      Building Specifications
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Building Use:</span>
                        <span className="font-medium text-right">{selectedLand.buildingInfo.buildingUse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Number of Floors:</span>
                        <span className="font-medium">{selectedLand.buildingInfo.floors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Plinth Area:</span>
                        <span className="font-medium">{selectedLand.buildingInfo.plinthArea} sq. feet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Building Area:</span>
                        <span className="font-medium">{selectedLand.buildingInfo.buildingArea.acres} acres</span>
                      </div>
                    </div>
                  </div>

                  {/* Approved Plans */}
                  {selectedLand.buildingInfo.approvedPlans && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Approved Building Plans
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Plan No:</span>
                          <span className="font-medium">{selectedLand.buildingInfo.approvedPlans.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Approval Date:</span>
                          <span className="font-medium">{selectedLand.buildingInfo.approvedPlans.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Local Body:</span>
                          <span className="font-medium text-right">{selectedLand.buildingInfo.approvedPlans.localBody}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Building Infrastructure</h3>
                  <p className="text-gray-600">This land parcel does not have any buildings or structures.</p>
                </div>
              )}
            </div>
          )}

          {/* Lease Management Tab */}
          {activeTab === 'lease' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Lease Management</h2>
              
              {selectedLand.leases.leaseDeeds.length > 0 ? (
                <div className="space-y-6">
                  {/* Lease Summary */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Lease Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-orange-700">Land Leased:</span>
                        <p className="font-medium">{selectedLand.leases.landLeased.acres} acres</p>
                      </div>
                      <div>
                        <span className="text-orange-700">Building Leased:</span>
                        <p className="font-medium">{selectedLand.leases.buildingLeased || 'None'}</p>
                      </div>
                      <div>
                        <span className="text-orange-700">Monthly Rent:</span>
                        <p className="font-medium">₹{selectedLand.leases.monthlyRent.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Lease Deeds */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Lease Deeds & Registrations</h3>
                    <div className="space-y-4">
                      {selectedLand.leases.leaseDeeds.map((deed, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">Lease Deed #{index + 1}</h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {deed.period}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Registration No:</span>
                              <p className="font-medium">{deed.registrationNo}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <p className="font-medium">{deed.date}</p>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-gray-600">Sub-Registrar Office:</span>
                              <p className="font-medium">{deed.office}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Leases</h3>
                  <p className="text-gray-600">This land parcel is not currently leased to any third parties.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandAssetManagement;