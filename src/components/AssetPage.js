// import { useParams } from 'react-router-dom';
// import { nelloreUnit, formatCurrency } from './Sidebar';

// const AssetPage = ({ setActiveAsset }) => {
   
//   const { id } = useParams();
//   setActiveAsset(id);
//   const assetId = id;

//   // Validate assetType
 

//   const assetArray = [...nelloreUnit.commercialAssets,...nelloreUnit.nonCommercialAssets]
    
     
//   const asset = assetArray.find(
//     (a) => a.id == assetId || a.id.toLowerCase() == assetId?.toLowerCase()
    
//   );

//   if (!asset) {
//     return (
//       <div className="p-6 text-red-500">
//         <h2 className="text-xl font-bold mb-2">Asset not found: {assetId}</h2>
//         <p className="mb-4">Available  assets:</p>
//         <ul className="list-disc pl-5 space-y-1">
//           {assetArray.map((a) => (
//             <li key={a.id}>
//               <span className="font-medium">{a.type}</span> - ID: {a.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   const financials = asset.financials || {};
//   const revenue = financials.revenue || 0;
//   const expenses = financials.expenses || 0;
//   const net = revenue - expenses;

//   return (
//     <div className="p-6">
//       <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
//         <h1 className="text-2xl font-bold text-blue-800">
//           {asset.type}{' '}
//           <span className="text-blue-600 font-mono">({asset.id})</span>
//         </h1>
//         <div className="flex flex-wrap gap-4 mt-3">
//           <div className="bg-white px-3 py-1 rounded-full shadow-sm">
//             <span className="font-medium">PAN:</span> {asset.pan || 'N/A'}
//           </div>
//           <div className="bg-white px-3 py-1 rounded-full shadow-sm">
//             <span className="font-medium">GST:</span> {asset.gst || 'N/A'}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Basic Info */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
//             Basic Information
//           </h2>
//           <div className="space-y-3">
//             <div>
//               <h3 className="font-medium text-gray-700">Asset Type</h3>
//               <p>{asset.type}</p>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-700">Asset ID</h3>
//               <p className="font-mono">{asset.id}</p>
//             </div>
//           </div>
//         </div>


//         {/* Financial Summary */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
//             Financial Summary
//           </h2>
//           <div className="space-y-3">
//             <div>
//               <h3 className="font-medium text-gray-700">Revenue</h3>
//               <p className="text-green-600 font-bold">
//                 {formatCurrency(revenue)}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-700">Expenses</h3>
//               <p className="text-red-600 font-bold">
//                 {formatCurrency(expenses)}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-700">Net</h3>
//               <p
//                 className={
//                   net >= 0
//                     ? 'text-green-600 font-bold'
//                     : 'text-red-600 font-bold'
//                 }
//               >
//                 {formatCurrency(net)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Detailed Financials */}
//         <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
//           <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
//             Detailed Financials
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-medium text-blue-700 mb-2">Income & Assets</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Cash & Bank</span>
//                   <span>{formatCurrency(financials.cashAndBank || 0)}</span>
//                 </div>
//                 {financials.receivables !== undefined && (
//                   <div className="flex justify-between">
//                     <span>Receivables</span>
//                     <span>{formatCurrency(financials.receivables)}</span>
//                   </div>
//                 )}
//                 {financials.payables !== undefined && (
//                   <div className="flex justify-between">
//                     <span>Payables</span>
//                     <span>{formatCurrency(financials.payables)}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <h3 className="font-medium text-red-700 mb-2">Expenses</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Employee Wages</span>
//                   <span>{formatCurrency(financials.employeeWages || 0)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Utility Bills</span>
//                   <span>{formatCurrency(financials.utilityBills || 0)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Maintenance</span>
//                   <span>{formatCurrency(financials.maintenanceExpenses || 0)}</span>
//                 </div>
//                 {financials.marketingExpenses !== undefined && (
//                   <div className="flex justify-between">
//                     <span>Marketing</span>
//                     <span>{formatCurrency(financials.marketingExpenses)}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetPage;




// import { useParams } from 'react-router-dom';
// import { nelloreUnit, formatCurrency } from './Sidebar';
// import { Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, registerables } from 'chart.js';
// import { motion } from 'framer-motion';
// import RevenuePieChart from './RevenuePieChart';
// ChartJS.register(...registerables);

// const AssetPage = ({ setActiveAsset }) => {
//   const { id } = useParams();
//   setActiveAsset(id);
//   const assetId = id;

//   const assetArray = [...nelloreUnit.commercialAssets, ...nelloreUnit.nonCommercialAssets];
//   const asset = assetArray.find(
//     (a) => a.id == assetId || a.id.toLowerCase() == assetId?.toLowerCase()
//   );

//   if (!asset) {
//     return (
//       <div className="p-6 text-red-500">
//         <h2 className="text-xl font-bold mb-2">Asset not found: {assetId}</h2>
//         <p className="mb-4">Available assets:</p>
//         <ul className="list-disc pl-5 space-y-1">
//           {assetArray.map((a) => (
//             <li key={a.id}>
//               <span className="font-medium">{a.type}</span> - ID: {a.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   const financials = asset.financials || {};
//   const revenue = financials.revenue || 0;
//   const expenses = financials.expenses || 0;
//   const net = revenue - expenses;

//   const tableData = [
//     { label: '🏢 Asset Type', value: asset.type, bg: 'from-purple-100 to-purple-50' },
//     { label: '🆔 Asset ID', value: asset.id, bg: 'from-blue-100 to-blue-50' },
//     { label: '📜 PAN Number', value: asset.pan || 'N/A', bg: 'from-green-100 to-green-50' },
//     { label: '🏷️ GST Number', value: asset.gst || 'N/A', bg: 'from-yellow-100 to-yellow-50' },
//     { label: '💰 Cash Balance', value: formatCurrency(financials.cashAndBank || 0), bg: 'from-emerald-100 to-emerald-50' },
//     { label: '📩 Receivables', value: formatCurrency(financials.receivables || 0), bg: 'from-indigo-100 to-indigo-50' },
//     { label: '📤 Payables', value: formatCurrency(financials.payables || 0), bg: 'from-rose-100 to-rose-50' }
//   ];

//   const barChartData = {
//     labels: ['Revenue', 'Expenses', 'Net Profit'],
//     datasets: [{
//       label: 'Amount (₹)',
//       data: [revenue, expenses, net],
//       backgroundColor: [
//         'rgba(74, 222, 128, 0.8)',
//         'rgba(248, 113, 113, 0.8)',
//         net >= 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(251, 146, 60, 0.8)'
//       ],
//       borderColor: [
//         'rgba(74, 222, 128, 1)',
//         'rgba(248, 113, 113, 1)',
//         net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
//       ],
//       borderWidth: 2,
//       borderRadius: 6,
//       hoverBackgroundColor: [
//         'rgba(74, 222, 128, 1)',
//         'rgba(248, 113, 113, 1)',
//         net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
//       ],
//       hoverBorderWidth: 3
//     }]
//   };

//   const incomeAssetsData = {
//     labels: ['Cash & Bank', 'Receivables', 'Other Assets'],
//     datasets: [{
//       data: [
//         financials.cashAndBank || 0,
//         financials.receivables || 0,
//         financials.otherAssets || 0
//       ],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.8)',   // Bright Red
//         'rgba(54, 162, 235, 0.8)',   // Bright Blue
//         'rgba(255, 159, 64, 0.8)',   // Orange
       
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',     // Bright Red
//         'rgba(54, 162, 235, 1)',     // Bright Blue
//         'rgba(255, 159, 64, 1)',     // Orange
       
//       ]
//       ,
//       borderWidth: 2,
//       hoverOffset: 20
//     }]
//   };

//   const expensesData = {
//     labels: ['Employee Wages', 'Utility Bills', 'Maintenance', 'Marketing'],
//     datasets: [{
//       data: [
//         financials.employeeWages || 0,
//         financials.utilityBills || 0,
//         financials.maintenanceExpenses || 0,
//         financials.marketingExpenses || 0
//       ],
//       backgroundColor: [
//         'rgba(248, 113, 113, 0.8)',
//         'rgba(251, 191, 36, 0.8)',
//         'rgba(52, 211, 153, 0.8)',
//         'rgba(167, 139, 250, 0.8)'
//       ],
//       borderColor: [
//         'rgba(248, 113, 113, 1)',
//         'rgba(251, 191, 36, 1)',
//         'rgba(52, 211, 153, 1)',
//         'rgba(167, 139, 250, 1)'
//       ],
//       borderWidth: 2,
//       hoverOffset: 20,
//       spacing: 2
//     }]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           boxWidth: 12,
//           padding: 12,
//           font: { size: 12 },
//           usePointStyle: true
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
//         },
//         displayColors: true,
//         usePointStyle: true,
//         padding: 12,
//         bodyFont: { size: 12 }
//       }
//     },
//     animation: {
//       duration: 2000,
//       animateScale: true,
//       animateRotate: true
//     },
//     elements: {
//       arc: { borderJoinStyle: 'round' },
//       bar: { borderSkipped: false }
//     }
//   };

//   return (
//     <div className="p-1 h-screen flex flex-col bg-grey overflow-hidden">
//   <motion.div
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg mb-4 shadow-lg"
//   >
//     <h1 className="text-xl font-bold text-white">
//       {asset.type} <span className="text-blue-100 font-mono">({asset.id})</span>
//     </h1>
//     <div className="flex flex-wrap gap-2 mt-2">
//       <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
//         <span className="font-medium">PAN:</span> {asset.pan || 'N/A'}
//       </div>
//       <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
//         <span className="font-medium">GST:</span> {asset.gst || 'N/A'}
//       </div>
//     </div>
//   </motion.div>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
//   {/* <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[minmax(0,_1fr)_minmax(0,_1.15fr)] gap-3 flex-1 overflow-hidden"> */}

 

//     {/* Asset Table */}
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col"
//     >
//       <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📋 Asset Details</h2>
//       <div className="overflow-y-auto custom-scrollbar flex-1">
//         <table className="w-full">
//           <tbody>
//             {tableData.map((row, index) => (
//               <motion.tr
//                 key={index}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 whileHover={{ scale: 1.02 }}
//                 className={`bg-gradient-to-r ${row.bg} hover:shadow-md transition-all duration-200`}
//               >
//                 <td className="py-2 px-3 font-medium text-gray-700">{row.label}</td>
//                 <td className="py-2 px-3 text-right font-mono">{row.value}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>

//     {/* Financial Summary Chart */}
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="bg-white rounded-lg  overflow-hidden flex flex-col"
//     >
//       <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📊 Financial Summary</h2>
//       <div className="flex-1 p-1">
//         <Bar data={barChartData} options={{
//           ...chartOptions,
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: {
//                 callback: (value) => formatCurrency(value).replace('₹', ''),
//                 font: { size: 10 }
//               },
//               grid: { drawTicks: false }
//             },
//             x: {
//               grid: { display: false },
//               ticks: { font: { size: 10 } }
//             }
//           }
//         }} />
//       </div>
//     </motion.div>

//     {/* Pie Chart */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.4 }}
//       className="flex flex-col  rounded-lg shadow-none overflow-hidden" // Remove shadow, same background
//     >
//       <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">💰 Income & Assets</h2>
//       <div className="flex-1 p-1 bg-white"> {/* Added bg-white for uniform background */}
//         <Pie data={incomeAssetsData} options={{
//           ...chartOptions,
//           plugins: {
//             ...chartOptions.plugins,
//             tooltip: {
//               ...chartOptions.plugins.tooltip,
//               callbacks: {
//                 label: (context) => {
//                   const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                   const percentage = Math.round((context.raw / total) * 100);
//                   return `${context.label}: ${formatCurrency(context.raw)} (${percentage}%)`;
//                 }
//               }
//             }
//           }
//         }} />
//       </div>
//     </motion.div>

//     {/* Doughnut Chart */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className="flex flex-col bg-white rounded-lg shadow-none overflow-hidden" // Remove shadow, same background
//     >
//       <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">💸 Expenses Breakdown</h2>
//       <div className="flex-1 p-1 bg-white"> {/* Added bg-white for uniform background */}
//         <Doughnut data={expensesData} options={{
//           ...chartOptions,
//           cutout: '65%',
//           plugins: {
//             ...chartOptions.plugins,
//             tooltip: {
//               ...chartOptions.plugins.tooltip,
//               callbacks: {
//                 label: (context) => {
//                   const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                   const percentage = Math.round((context.raw / total) * 100);
//                   return `${context.label}: ${formatCurrency(context.raw)} (${percentage}%)`;
//                 }
//               }
//             }
//           }
//         }} />
//       </div>
//     </motion.div>
//   </div>



// </div>

//   );
// };


// export default AssetPage;















// import { useParams } from 'react-router-dom';
// import { nelloreUnit, formatCurrency } from './Sidebar';
// import { Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, registerables } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaEnvelope, FaTimes, FaPaperPlane,  } from 'react-icons/fa';
// import { useState } from 'react';
// ChartJS.register(...registerables);

// const AssetPage = ({ setActiveAsset }) => {
//   const { id } = useParams();
//   setActiveAsset(id);
//   const assetId = id;
//   const [showMessageForm, setShowMessageForm] = useState(false);
//   const [message, setMessage] = useState('');
//   const [isSending, setIsSending] = useState(false);
//   const [sendSuccess, setSendSuccess] = useState(false);

//   const assetArray = [...nelloreUnit.commercialAssets, ...nelloreUnit.nonCommercialAssets];
//   const asset = assetArray.find(
//     (a) => a.id == assetId || a.id.toLowerCase() == assetId?.toLowerCase()
//   );

//   const handleSendMessage = () => {
//     setIsSending(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsSending(false);
//       setSendSuccess(true);
//       setMessage('');
//       setTimeout(() => setSendSuccess(false), 3000);
//     }, 1500);
//   };

//   if (!asset) {
//     return (
//       <div className="p-6 text-red-500">
//         <h2 className="text-xl font-bold mb-2">Asset not found: {assetId}</h2>
//         <p className="mb-4">Available assets:</p>
//         <ul className="list-disc pl-5 space-y-1">
//           {assetArray.map((a) => (
//             <li key={a.id}>
//               <span className="font-medium">{a.type}</span> - ID: {a.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   const financials = asset.financials || {};
//   const revenue = financials.revenue || 0;
//   const expenses = financials.expenses || 0;
//   const net = revenue - expenses;

//   const tableData = [
//     { label: '🏢 Asset Type', value: asset.type, bg: 'from-purple-100 to-purple-50' },
//     { label: '🆔 Asset ID', value: asset.id, bg: 'from-blue-100 to-blue-50' },
//     { label: '📜 PAN Number', value: asset.pan || 'N/A', bg: 'from-green-100 to-green-50' },
//     { label: '🏷️ GST Number', value: asset.gst || 'N/A', bg: 'from-yellow-100 to-yellow-50' },
//     { label: '💰 Cash Balance', value: formatCurrency(financials.cashAndBank || 0), bg: 'from-emerald-100 to-emerald-50' },
//     { label: '📩 Receivables', value: formatCurrency(financials.receivables || 0), bg: 'from-indigo-100 to-indigo-50' },
//     { label: '📤 Payables', value: formatCurrency(financials.payables || 0), bg: 'from-rose-100 to-rose-50' }
//   ];

//   const barChartData = {
//     labels: ['Revenue', 'Expenses', 'Net Profit'],
//     datasets: [{
//       label: 'Amount (₹)',
//       data: [revenue, expenses, net],
//       backgroundColor: [
//         'rgba(74, 222, 128, 0.8)',
//         'rgba(248, 113, 113, 0.8)',
//         net >= 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(251, 146, 60, 0.8)'
//       ],
//       borderColor: [
//         'rgba(74, 222, 128, 1)',
//         'rgba(248, 113, 113, 1)',
//         net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
//       ],
//       borderWidth: 2,
//       borderRadius: 6,
//       hoverBackgroundColor: [
//         'rgba(74, 222, 128, 1)',
//         'rgba(248, 113, 113, 1)',
//         net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
//       ],
//       hoverBorderWidth: 3
//     }]
//   };

//   const incomeAssetsData = {
//     labels: ['Cash & Bank', 'Receivables', 'Other Assets'],
//     datasets: [{
//       data: [
//         financials.cashAndBank || 0,
//         financials.receivables || 0,
//         financials.otherAssets || 0
//       ],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.8)',
//         'rgba(54, 162, 235, 0.8)',
//         'rgba(255, 159, 64, 0.8)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 2,
//       hoverOffset: 20
//     }]
//   };

//   const expensesData = {
//     labels: ['Employee Wages', 'Utility Bills', 'Maintenance', 'Marketing'],
//     datasets: [{
//       data: [
//         financials.employeeWages || 0,
//         financials.utilityBills || 0,
//         financials.maintenanceExpenses || 0,
//         financials.marketingExpenses || 0
//       ],
//       backgroundColor: [
//         'rgba(248, 113, 113, 0.8)',
//         'rgba(251, 191, 36, 0.8)',
//         'rgba(52, 211, 153, 0.8)',
//         'rgba(167, 139, 250, 0.8)'
//       ],
//       borderColor: [
//         'rgba(248, 113, 113, 1)',
//         'rgba(251, 191, 36, 1)',
//         'rgba(52, 211, 153, 1)',
//         'rgba(167, 139, 250, 1)'
//       ],
//       borderWidth: 2,
//       hoverOffset: 20,
//       spacing: 2
//     }]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           boxWidth: 12,
//           padding: 12,
//           font: { size: 12 },
//           usePointStyle: true
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
//         },
//         displayColors: true,
//         usePointStyle: true,
//         padding: 12,
//         bodyFont: { size: 12 }
//       }
//     },
//     animation: {
//       duration: 2000,
//       animateScale: true,
//       animateRotate: true
//     },
//     elements: {
//       arc: { borderJoinStyle: 'round' },
//       bar: { borderSkipped: false }
//     }
//   };

//   return (
//     <div className="p-1 h-screen flex flex-col bg-grey overflow-hidden relative">
//       {/* Floating Message Button */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-6 z-20"
//       >
//         <button
//           onClick={() => setShowMessageForm(true)}
//           className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
//         >
//           <FaPaperPlane className="text-lg mr-2" />
//           <span className="font-medium">Message Owner</span>
//         </button>
//       </motion.div>

//       {/* Message Modal */}
//       <AnimatePresence>
//         {showMessageForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4"
//             onClick={() => setShowMessageForm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25 }}
//               className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-bold">Message {asset.type} Owner</h3>
//                   <button 
//                     onClick={() => setShowMessageForm(false)}
//                     className="p-1 rounded-full hover:bg-white/20 transition-colors"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-5">
//                 {sendSuccess ? (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-center py-8"
//                   >
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FaPaperPlane className="text-green-600 text-2xl" />
//                     </div>
//                     <h4 className="text-xl font-bold text-gray-800 mb-1">Message Sent!</h4>
//                     <p className="text-gray-600">The asset owner will respond soon.</p>
//                   </motion.div>
//                 ) : (
//                   <>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-40"
//                       placeholder="Type your message here..."
//                     />
//                     <div className="mt-4 flex justify-end space-x-3">
//                       <button
//                         onClick={() => setShowMessageForm(false)}
//                         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleSendMessage}
//                         disabled={!message.trim() || isSending}
//                         className={`px-4 py-2 rounded-lg text-white flex items-center transition-all ${
//                           !message.trim() || isSending
//                             ? 'bg-blue-400 cursor-not-allowed'
//                             : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
//                         }`}
//                       >
//                         {isSending ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Sending...
//                           </>
//                         ) : (
//                           <>
//                             <FaPaperPlane className="mr-2" />
//                             Send Message
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Rest of your existing component */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg mb-4 shadow-lg"
//       >
//         <h1 className="text-xl font-bold text-white">
//           {asset.type} <span className="text-blue-100 font-mono">({asset.id})</span>
//         </h1>
//         <div className="flex flex-wrap gap-2 mt-2">
//           <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
//             <span className="font-medium">PAN:</span> {asset.pan || 'N/A'}
//           </div>
//           <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
//             <span className="font-medium">GST:</span> {asset.gst || 'N/A'}
//           </div>
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
//         {/* Asset Table */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col"
//         >
//           <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📋 Asset Details</h2>
//           <div className="overflow-y-auto custom-scrollbar flex-1">
//             <table className="w-full">
//               <tbody>
//                 {tableData.map((row, index) => (
//                   <motion.tr
//                     key={index}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     whileHover={{ scale: 1.02 }}
//                     className={`bg-gradient-to-r ${row.bg} hover:shadow-md transition-all duration-200`}
//                   >
//                     <td className="py-2 px-3 font-medium text-gray-700">{row.label}</td>
//                     <td className="py-2 px-3 text-right font-mono">{row.value}</td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* Financial Summary Chart */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-lg overflow-hidden flex flex-col"
//         >
//           <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📊 Financial Summary</h2>
//           <div className="flex-1 p-1">
//             <Bar data={barChartData} options={{
//               ...chartOptions,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   ticks: {
//                     callback: (value) => formatCurrency(value).replace('₹', ''),
//                     font: { size: 10 }
//                   },
//                   grid: { drawTicks: false }
//                 },
//                 x: {
//                   grid: { display: false },
//                   ticks: { font: { size: 10 } }
//                 }
//               }
//             }} />
//           </div>
//         </motion.div>

//         {/* Pie Chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="flex flex-col rounded-lg shadow-none overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">💰 Income & Assets</h2>
//           <div className="flex-1 p-1 bg-white">
//             <Pie data={incomeAssetsData} options={{
//               ...chartOptions,
//               plugins: {
//                 ...chartOptions.plugins,
//                 tooltip: {
//                   ...chartOptions.plugins.tooltip,
//                   callbacks: {
//                     label: (context) => {
//                       const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                       const percentage = Math.round((context.raw / total) * 100);
//                       return `${context.label}: ${formatCurrency(context.raw)} (${percentage}%)`;
//                     }
//                   }
//                 }
//               }
//             }} />
//           </div>
//         </motion.div>

//         {/* Doughnut Chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="flex flex-col bg-white rounded-lg shadow-none overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">💸 Expenses Breakdown</h2>
//           <div className="flex-1 p-1 bg-white">
//             <Doughnut data={expensesData} options={{
//               ...chartOptions,
//               cutout: '65%',
//               plugins: {
//                 ...chartOptions.plugins,
//                 tooltip: {
//                   ...chartOptions.plugins.tooltip,
//                   callbacks: {
//                     label: (context) => {
//                       const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                       const percentage = Math.round((context.raw / total) * 100);
//                       return `${context.label}: ${formatCurrency(context.raw)} (${percentage}%)`;
//                     }
//                   }
//                 }
//               }
//             }} />
//           </div>
//         </motion.div>
  

//       </div>
//     </div>
//   );
// };

// export default AssetPage;



import { useParams } from 'react-router-dom';
import { nelloreUnit, formatCurrency } from './Sidebar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import {  FaTimes, FaPaperPlane } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { useState } from 'react';
ChartJS.register(...registerables);

const AssetPage = ({ setActiveAsset }) => {
  const { id } = useParams();
  setActiveAsset(id);
  const assetId = id;
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const assetArray = [...nelloreUnit.commercialAssets, ...nelloreUnit.nonCommercialAssets];
  const asset = assetArray.find(
    (a) => a.id === assetId || a.id.toLowerCase() === assetId?.toLowerCase()
  );

  const handleSendMessage = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setMessage('');
      setTimeout(() => setSendSuccess(false), 3000);
    }, 1500);
  };

  if (!asset) {
    return (
      <div className="p-6 text-red-500">
        <h2 className="text-xl font-bold mb-2">Asset not found: {assetId}</h2>
        <p className="mb-4">Available assets:</p>
        <ul className="list-disc pl-5 space-y-1">
          {assetArray.map((a) => (
            <li key={a.id}>
              <span className="font-medium">{a.type}</span> - ID: {a.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const financials = asset.financials || {};
  const revenue = financials.revenue || 0;
  const expenses = financials.expenses || 0;
  const net = revenue - expenses;

  const tableData = [
    { label: '🏢 Asset Type', value: asset.type, bg: 'from-purple-100 to-purple-50' },
    { label: '🆔 Asset ID', value: asset.id, bg: 'from-blue-100 to-blue-50' },
    { label: '📜 PAN Number', value: asset.pan || 'N/A', bg: 'from-green-100 to-green-50' },
    { label: '🏷️ GST Number', value: asset.gst || 'N/A', bg: 'from-yellow-100 to-yellow-50' },
    { label: '💰 Cash Balance', value: formatCurrency(financials.cashAndBank || 0), bg: 'from-emerald-100 to-emerald-50' },
    { label: '📩 Receivables', value: formatCurrency(financials.receivables || 0), bg: 'from-indigo-100 to-indigo-50' },
    { label: '📤 Payables', value: formatCurrency(financials.payables || 0), bg: 'from-rose-100 to-rose-50' }
  ];

  const barChartData = {
    labels: ['Revenue', 'Expenses', 'Net Profit'],
    datasets: [{
      label: 'Amount (₹)',
      data: [revenue, expenses, net],
      backgroundColor: [
        'rgba(74, 222, 128, 0.8)',
        'rgba(248, 113, 113, 0.8)',
        net >= 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(251, 146, 60, 0.8)'
      ],
      borderColor: [
        'rgba(74, 222, 128, 1)',
        'rgba(248, 113, 113, 1)',
        net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
      ],
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: [
        'rgba(74, 222, 128, 1)',
        'rgba(248, 113, 113, 1)',
        net >= 0 ? 'rgba(96, 165, 250, 1)' : 'rgba(251, 146, 60, 1)'
      ],
      hoverBorderWidth: 3
    }]
  };

  const incomeAssetsData = {
    labels: ['Cash & Bank', 'Receivables', 'Other Assets'],
    datasets: [{
      data: [
        financials.cashAndBank || 0,
        financials.receivables || 0,
        financials.otherAssets || 0
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
      hoverOffset: 20
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 12,
          font: { size: 12 },
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
        },
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        bodyFont: { size: 12 }
      }
    },
    animation: {
      duration: 2000,
      animateScale: true,
      animateRotate: true
    },
    elements: {
      arc: { borderJoinStyle: 'round' },
      bar: { borderSkipped: false }
    }
  };
  const lastUpdatedDate = '12/05/2025';

  return (
    <div className="p-1 h-screen flex flex-col bg-grey overflow-hidden relative">
      {/* Asset Header with Message Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg mb-4 shadow-lg flex justify-between items-start"
      >
        <div>
          <h1 className="text-xl font-bold text-white">
            {asset.type}{' '}
            <span className="text-blue-100 font-mono">({asset.id})</span>
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
              <span className="font-medium">PAN:</span> {asset.pan || 'N/A'}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
              <span className="font-medium">GST:</span> {asset.gst || 'N/A'}
            </div>
            {lastUpdatedDate && (
              <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-white text-sm">
                <span className="font-medium">Last Updated:</span>{' '}
                <span className="font-mono">{lastUpdatedDate}</span>
              </div>
            )}
          </div>
        </div>

        <motion.button
          onClick={() => setShowMessageForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300 shadow-md"
        >
          <FaPaperPlane className="text-sm mr-2" />
          <span className="text-sm font-medium">Message RI</span>
        </motion.button>
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Message {asset.type} RI</h3>
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="p-5">
                {sendSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPaperPlane className="text-green-600 text-2xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      Message Sent!
                    </h4>
                    <p className="text-gray-600">The asset owner will respond soon.</p>
                  </motion.div>
                ) : (
                  <>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-40"
                      placeholder="Type your message here..."
                    />
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => setShowMessageForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSending}
                        className={`px-4 py-2 rounded-lg text-white flex items-center transition-all ${
                          !message.trim() || isSending
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isSending ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                            <FaPaperPlane className="mr-2" />
                            Send Message
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
        {/* Asset Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col"
        >
          <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📋 Asset Details</h2>
          <div className="overflow-y-auto overflow-x-hidden custom-scrollbar flex-1">
            <table className="w-full">
              <tbody>
                {tableData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-r ${row.bg} hover:shadow-md transition-all duration-200`}
                  >
                    <td className="py-2 px-3 font-medium text-gray-700">{row.label}</td>
                    <td className="py-2 px-3 text-right font-mono">{row.value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Financial Summary Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg overflow-hidden flex flex-col"
        >
          <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📊 Financial Summary</h2>
          <div className="flex-1 p-1">
            <Bar data={barChartData} options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value).replace('₹', ''),
                    font: { size: 10 }
                  },
                  grid: { drawTicks: false }
                },
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 10 } }
                }
              }
            }} />
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col rounded-lg shadow-none overflow-hidden"
        >
          <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">💰 Income & Assets</h2>
          <div className="flex-1 p-1 bg-white">
            <Pie data={incomeAssetsData} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    label: (context) => {
                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                      const percentage = Math.round((context.raw / total) * 100);
                      return `${context.label}: ${formatCurrency(context.raw)} (${percentage}%)`;
                    }
                  }
                }
              }
            }} />
          </div>
        </motion.div>

        {/* Inventory Table */}
        {/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="flex flex-col bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
>
  <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📦 Inventory Details</h2>
  <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
    {asset.inventory && asset.inventory.length > 0 ? (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-1 text-sm font-medium text-gray-500">Item</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Quantity</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Value</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {asset.inventory.map((item, index) => (
            <tr 
              key={index} 
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-1 text-sm font-medium text-gray-700">{item.name}</td>
              <td className="py-2 px-1 text-right text-sm text-gray-600">{item.quantity} {item.unit}</td>
              <td className="py-2 px-1 text-right text-sm font-mono text-gray-600">
                {formatCurrency(item.value)}
              </td>
              <td className="py-2 px-1 text-right text-xs text-gray-500">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="py-2 px-1 text-sm font-bold text-gray-700">Total</td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {formatCurrency(
                asset.inventory.reduce((sum, item) => sum + item.value, 0)
              )}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FiPackage className="text-4xl mb-2" />
        <p>No inventory data available</p>
      </div>
    )}
  </div>
</motion.div> */}
{/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="flex flex-col bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
>
  <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📦 Inventory Details</h2>
  <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
    {asset.inventory && asset.inventory.length > 0 ? (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-1 text-sm font-medium text-gray-500">Item</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Current Qty</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500"> Current Value</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Receivables (Qty)</th>
           
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Receivable Date</th>
          </tr>
        </thead>
        <tbody>
          {asset.inventory.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-1 text-sm font-medium text-gray-700">{item.name}</td>
              <td className="py-2 px-1 text-right text-sm text-gray-600">
                {item.quantity} {item.unit}
              </td>
              <td className="py-2 px-1 text-right text-sm font-mono text-gray-600">
                {formatCurrency(item.currentValue)}
              </td>
              <td className="py-2 px-1 text-right text-sm text-gray-600">
                {item.receivable?.quantity || 0}
              </td>
              
              <td className="py-2 px-1 text-right text-xs text-gray-500">
                {item.receivable?.expectedDate
                  ? new Date(item.receivable.expectedDate).toLocaleDateString()
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="py-2 px-1 text-sm font-bold text-gray-700">Total</td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
            {asset.inventory.reduce((sum, item) => sum + (item.currentValue || 0), 0)}
            </td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + (item.receivable?.quantity || 0), 0)}
            </td>
           
            <td></td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FiPackage className="text-4xl mb-2" />
        <p>No inventory data available</p>
      </div>
    )}
  </div>
</motion.div> */}

<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="flex flex-col bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
>
  <h2 className="text-lg font-semibold p-3 text-gray-800 border-b">📦 Inventory Details</h2>
  <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
    {asset.inventory && asset.inventory.length > 0 ? (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-1 text-sm font-medium text-gray-500">Item</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Current Qty</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Current Value</th>
            <th className="text-right py-2 px-1 text-sm font-medium text-gray-500">Receivables (Qty)</th>
          </tr>
        </thead>
        <tbody>
          {asset.inventory.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-1 text-sm font-medium text-gray-700">{item.name}</td>
              <td className="py-2 px-1 text-right text-sm text-gray-600">
                {item.quantity} {item.unit}
              </td>
              <td className="py-2 px-1 text-right text-sm font-mono text-gray-600">
                {formatCurrency(item.currentValue)}
              </td>
              <td className="py-2 px-1 text-right text-sm text-gray-600">
                {item.receivable?.quantity || 0}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="py-2 px-1 text-sm font-bold text-gray-700">Total</td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + (item.currentValue || 0), 0)}
            </td>
            <td className="py-2 px-1 text-right text-sm font-bold text-gray-700">
              {asset.inventory.reduce((sum, item) => sum + (item.receivable?.quantity || 0), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FiPackage className="text-4xl mb-2" />
        <p>No inventory data available</p>
      </div>
    )}
  </div>
</motion.div>



      </div>
    </div>
  );
};

export default AssetPage;
