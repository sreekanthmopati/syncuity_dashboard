
import React, { useState, useEffect, useRef  } from "react";
import { FaChevronDown, FaChevronUp, FaDollarSign, FaChartBar,   } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";
import { nelloreUnit } from "./Sidebar";
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { FiBarChart2,FiChevronRight } from 'react-icons/fi';
import {  FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { FaLandmark, FaWallet,  FaChartLine } from 'react-icons/fa';
import { FaBuilding, FaHome } from 'react-icons/fa';
import { 
  FaExchangeAlt,
  FaPiggyBank,
  FaCoins,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { configureChartDefaults } from './setupCharts';







Chart.register(...registerables);
configureChartDefaults();

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedSections, setExpandedSections] = useState({
    revenue: true,
    expenses: true,
    assets: true
  });
  const navigate = useNavigate();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const detailedRef = useRef(null);
  useEffect(() => {
    if (activeTab === 'detailed' && detailedRef.current) {
      detailedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab]);

    

  const handleSendMessage = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setMessage('');
      setTimeout(() => setSendSuccess(false), 3000);
    }, 1500);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Chart data configurations

  const assetLabels = [
    ...nelloreUnit.commercialAssets.map(asset => ({ id: asset.id, label: asset.id })),
    ...nelloreUnit.nonCommercialAssets.map(asset => ({ id: asset.id, label: asset.id }))
  ];

  const revenueChartData = {
    labels: assetLabels.map(a => a.label),
    datasets: [{
      label: "Revenue (₹)",
      data: [
        ...nelloreUnit.commercialAssets.map(asset => asset.financials.revenue),
        ...nelloreUnit.nonCommercialAssets.map(asset => asset.financials.revenue || 0)
      ],
      backgroundColor: [
        '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', 
        '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#1D4ED8'
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverBackgroundColor: [
        '#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185',
        '#34D399', '#2DD4BF', '#22D3EE', '#38BDF8', '#3B82F6'
      ],
      hoverBorderWidth: 3
    }]
  };

  // Click handler for chart
  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const assetId = assetLabels[index].id;
      
      navigate(`/${assetId}`);
    }
  };

  const expenseChartData = {
    labels: ["COGS", "Employee Wages", "Utilities", "Marketing", "Maintenance"],
    datasets: [{
      label: "Expenses (₹)",
      data: [
        nelloreUnit.financials.costOfGoodsSold,
        nelloreUnit.financials.employeeWages,
        nelloreUnit.financials.utilityBills,
        nelloreUnit.financials.marketingExpenses,
        nelloreUnit.financials.maintenanceExpenses
      ],
      backgroundColor: [
        '#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6'
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverBackgroundColor: [
        '#F87171', '#FB923C', '#FBBF24', '#34D399', '#60A5FA'
      ],
      hoverBorderWidth: 3
    }]
  };

  const profitChartData = {
    labels: ["Gross Profit", "Expenses", "Net Profit"],
    datasets: [{
      label: "Amount (₹)",
      data: [
        nelloreUnit.financials.grossProfit,
        nelloreUnit.financials.expenses,
        nelloreUnit.financials.netProfit
      ],
      backgroundColor: [
        "#10B981", "#EF4444", "#3B82F6"
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverBackgroundColor: [
        "#34D399", "#F87171", "#60A5FA"
      ],
      hoverBorderWidth: 3
    }]
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-3 bg-gray-50 min-h-screen max-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3"
      >
        <h1 className="text-lg md:text-xl font-bold text-gray-800">NELLORE DISTRICT FINANCIAL REPORTS</h1>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Message Button */}
          <motion.button
            onClick={() => setShowMessageForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-xs"
          >
            <FaPaperPlane className="mr-1" />
            Message RIs
          </motion.button>

          {/* Tab Buttons */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("summary")}
            className={`px-2 py-1 rounded-lg transition-all text-xs ${
              activeTab === "summary" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 shadow-md"
            }`}
          >
            Summary
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("detailed")}
            className={`px-2 py-1 rounded-lg transition-all text-xs ${
              activeTab === "detailed" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 shadow-md"
            }`}
          >
            Detailed
          </motion.button>
        </div>
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center p-3"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Message All RIs</h3>
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

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
                    <h4 className="text-lg font-bold text-gray-800 mb-1">Message Sent!</h4>
                    <p className="text-sm text-gray-600">All RIs will receive your message.</p>
                  </motion.div>
                ) : (
                  <>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32"
                      placeholder="Type your message to all RI'S..."
                    />
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => setShowMessageForm(false)}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSending}
                        className={`px-3 py-1 rounded-lg text-white flex items-center transition-all text-sm ${
                          !message.trim() || isSending
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isSending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

      {/* Main Dashboard Content */}
      <div className={`flex-1 ${activeTab === "detailed" ? "overflow-y-auto" : "overflow-hidden"} pb-3 custom-scrollbar`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[90vh]">
          {/* Left Column - Key Metrics */}
          <div className="lg:col-span-1 flex flex-col h-[90vh] gap-2">
  {/* Revenue Card */}
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.1 }}
    whileHover={{ y: -3 }}
    className="bg-white p-3 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center justify-between mb-2 pt-[2%]">
      <h3 className="text-xs font-semibold text-gray-700 ">Total Revenue</h3>
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaDollarSign className="text-blue-500 text-base" />
      </motion.div>
    </div>
    <p className="text-lg font-bold text-gray-800">
      ₹{new Intl.NumberFormat('en-IN').format(nelloreUnit.financials.revenue)}
    </p>
    <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '85%' }}
        transition={{ duration: 1.5 }}
        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
      />
    </div>
  </motion.div>

  {/* Profit Card */}
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{ y: -3 }}
    className="bg-white p-3 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xs font-semibold text-gray-700">Net Profit</h3>
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaChartBar className="text-green-500 text-base" />
      </motion.div>
    </div>
    <p className="text-lg font-bold text-gray-800">
      ₹{new Intl.NumberFormat('en-IN').format(nelloreUnit.financials.netProfit)}
    </p>
    <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '72%' }}
        transition={{ duration: 1.5 }}
        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
      />
    </div>
  </motion.div>

  {/* Assets Summary */}

<motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.3 }}
    className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
    style={{
      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-800">
        Assets Summary
      </h3>
      <motion.button 
        whileHover={{ scale: 1.2, backgroundColor: '#f3f4f6' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleSection("assets")}
        className="text-gray-400 hover:text-gray-600 p-1 rounded-full w-6 h-6 flex items-center justify-center"
      >
        {expandedSections.assets ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
      </motion.button>
    </div>

    {expandedSections.assets && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto space-y-4 pr-1"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#e5e7eb transparent',
        }}
      >
        <div className="bg-purple-50/30 p-3 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 p-1.5 rounded-lg">
              <FaBuilding className="text-purple-600 text-xs" />
            </div>
            <h4 className="text-xs font-semibold text-gray-700">
              Commercial Assets ({nelloreUnit.commercialAssets.length})
            </h4>
          </div>
          <div className="mt-2 space-y-2">
            {nelloreUnit.commercialAssets.map(asset => (
              <motion.div 
                key={asset.id} 
                whileHover={{ 
                  x: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-white/80 transition-all border border-purple-100 hover:border-purple-100 bg-white/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="truncate text-gray-700 font-medium">{asset.type}</span>
                <span className="font-semibold whitespace-nowrap ml-2 bg-purple-500/10 text-purple-700 px-2.5 py-1 rounded-full text-2xs">
                  ₹{new Intl.NumberFormat('en-IN').format(asset.financials.revenue)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50/30 p-3 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg">
              <FaHome className="text-blue-600 text-xs" />
            </div>
            <h4 className="text-xs font-semibold text-gray-700">
              Non-Commercial Assets ({nelloreUnit.nonCommercialAssets.length})
            </h4>
          </div>
          <div className="mt-2 space-y-2">
            {nelloreUnit.nonCommercialAssets.map(asset => (
              <motion.div 
                key={asset.id} 
                whileHover={{ 
                  x: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-white/80 transition-all border border-blue-100 hover:border-blue-100 bg-white/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 hover:shadow-xl"

              >
                <span className="truncate text-gray-700 font-medium">{asset.type}</span>
                <span className={`font-semibold whitespace-nowrap ml-2 px-2.5 py-1 rounded-full text-2xs ${
                  asset.financials.revenue 
                    ? 'bg-blue-500/10 text-blue-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {asset.financials.revenue 
                    ? `₹${new Intl.NumberFormat('en-IN').format(asset.financials.revenue)}`
                    : 'N/A'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )}
</motion.div>
</div>


          {/* Middle Column - Main Charts */}
          <div className="lg:col-span-2 flex flex-col h-[90vh] gap-2">
  {/* Revenue by Asset */}

  <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex-1 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between mb-2 pt-[2%]">
        <h3 className="text-xs font-semibold text-gray-700">Revenue by Asset</h3>
        <motion.button 
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleSection("revenue")}
          className="text-gray-500 hover:text-gray-700"
        >
          {expandedSections.revenue ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </motion.button>
      </div>

      {expandedSections.revenue && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Bar 
            data={revenueChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              onClick: handleBarClick,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    //  font: { size: 10 },
                      boxWidth: 10 }
                },
                tooltip: {
                  callbacks: {
                    label: context =>
                      ' ₹' + new Intl.NumberFormat('en-IN').format(context.raw)
                  },
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  // titleFont: { size: 11 },
                  // bodyFont: { size: 10 },
                  padding: 8,
                  displayColors: true
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => '₹' + new Intl.NumberFormat('en-IN').format(value),
                    // font: { size: 8 }
                  },
                  grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                  grid: { display: false },
                  ticks: {
                    // font: { size: 8 },
                    callback: function(value, index) {
                      return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                  }
                }
              },
              animation: {
                duration: 2000,
                easing: 'easeOutQuart'
              }
            }}
          />
        </motion.div>
      )}
    </motion.div>

  {/* Expenses Breakdown */}
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.5 }}
    className="flex-1 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
    style={{
      border: '1px solid #d1d5db', // light gray border (Tailwind's border-gray-300)
      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)', // soft gradient for highlight
      boxShadow: '4px 4px 10px #c5c5c5, -4px -4px 10px #ffffff', // dual shadows for 3D pop
    }}
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xs font-semibold text-gray-700">Expenses Breakdown</h3>
      <motion.button 
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleSection("expenses")}
        className="text-gray-500 hover:text-gray-700"
      >
        {expandedSections.expenses ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
      </motion.button>
    </div>

    {expandedSections.expenses && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        {/* Pie Chart */}
        <div className="h-full">
          <Pie 
            data={expenseChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    // font: { size: 8 },
                    padding: 6,
                    usePointStyle: true,
                    pointStyle: 'circle'
                  }
                },
                tooltip: {
                  callbacks: {
                    label: context => {
                      const total = context.dataset.data?.reduce((a, b) => a + b, 0) || 0;
                      const percentage = total ? Math.round((context.raw / total) * 100) : 0;
                      return ` ₹${new Intl.NumberFormat('en-IN').format(context.raw)} (${percentage}%)`;
                    }
                  },
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  // titleFont: { size: 10 },
                  // bodyFont: { size: 9 },
                  padding: 6,
                  displayColors: true,
                  usePointStyle: true
                }
              },
              animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000
              },
              cutout: '55%',
              radius: '80%'
            }}
          />
        </div>

        {/* Line Chart */}
        <div className="h-full">
          <Line 
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [{
                label: "Monthly Expenses",
                data: [1200000, 1500000, 1100000, 1300000, 1400000],
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderWidth: 2,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#EF4444",
                pointBorderWidth: 1.5,
                pointRadius: 4,
                pointHoverRadius: 5,
                tension: 0.3
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  callbacks: {
                    label: context => ' ₹' + new Intl.NumberFormat('en-IN').format(context.raw)
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => '₹' + new Intl.NumberFormat('en-IN').format(value),
                    // font: { size: 8 }
                  },
                  grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                  grid: { display: false },
                  // ticks: { font: { size: 8 } }
                }
              },
              animation: { duration: 2000 }
            }}
          />
        </div>
      </motion.div>
    )}
  </motion.div>
</div>

          {/* Right Column - Additional Metrics (Detailed View Only) */}
          {activeTab === "detailed" && (
            <div ref={detailedRef} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Profit Composition */}
             
<motion.div
  variants={{
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  }}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.4, delay: 0.6 }}
  whileHover={{
    y: -3,
    boxShadow: "0 8px 12px -4px rgba(79, 70, 229, 0.15), 0 4px 6px -2px rgba(79, 70, 229, 0.08)"
  }}
  className="bg-white p-3 rounded-lg shadow-sm transition-all duration-300 relative overflow-visible"
>
  {/* Header */}
  <div className="flex justify-between items-start mb-2">
    <div>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center">
        <FiBarChart2 className="mr-1.5 text-indigo-500" />
        Profit Composition
      </h3>
      <p className="text-xs text-gray-500 mt-0.5">Current fiscal year</p>
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-indigo-500 hover:text-indigo-700 overflow-visible"
      aria-label="View details"
    >
      <FiChevronRight className="text-lg" />
    </motion.button>
  </div>

  {/* Charts */}
  <div className="flex h-36 gap-3 overflow-visible">
    {/* Doughnut */}
    <div className="w-1/3 flex flex-col justify-center relative overflow-visible">
      <Doughnut
        data={{
          labels: profitChartData.labels,
          datasets: [{
            data: profitChartData.datasets[0].data,
            backgroundColor: [
              'rgba(99, 102, 241, 0.9)',
              'rgba(79, 70, 229, 0.9)',
              'rgba(67, 56, 202, 0.9)',
              'rgba(55, 48, 163, 0.9)'
            ],
            borderColor: 'white',
            borderWidth: 1.5,
            cutout: '70%',
            borderRadius: 6,
            hoverOffset: 8
          }]
        }}
        options={{
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
            easing: 'easeOutExpo'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((ctx.raw / total) * 100).toFixed(0);
                  return `₹${ctx.raw.toLocaleString('en-IN')} (${percentage}%)`;
                }
              },
              backgroundColor: 'rgba(31, 41, 55, 0.9)',
              // titleFont: { size: 10 },
              // bodyFont: { size: 10 },
              padding: 6,
              cornerRadius: 6,
              displayColors: false
            }
          }
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1.5">
        {profitChartData.labels.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="w-1.5 h-1.5 rounded-full border border-white"
            style={{
              backgroundColor: [
                'rgba(99, 102, 241)',
                'rgba(79, 70, 229)',
                'rgba(67, 56, 202)',
                'rgba(55, 48, 163)'
              ][i]
            }}
          />
        ))}
      </div>
    </div>

    {/* Bar */}
    <div className="w-2/3">
      <Bar
        data={{
          labels: profitChartData.labels.map(label => label.split(' ')[0]),
          datasets: [{
            ...profitChartData.datasets[0],
            backgroundColor: (ctx) => {
              const value = profitChartData.datasets[0].data[ctx.dataIndex];
              const maxValue = Math.max(...profitChartData.datasets[0].data);
              const ratio = value / maxValue;
              return `rgba(79, 70, 229, ${0.5 + (ratio * 0.5)})`;
            },
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          animation: {
            duration: 1000,
            easing: 'easeOutCubic'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `₹${ctx.raw.toLocaleString('en-IN')}`
              },
              // bodyFont: { size: 11 },
              displayColors: false
            }
          },
          scales: {
            x: {
              grid: {
                display: true,
                color: 'rgba(0,0,0,0.03)'
              },
              ticks: {
                callback: (val) =>
                  '₹' + (val > 1000 ? `${(val / 1000).toFixed(0)}k` : val),
                // font: { size: 9 }
              }
            },
            y: {
              grid: { display: false },
              ticks: {
                font: {
                  // size: 10,
                  weight: '500',
                  family: "'Inter', sans-serif"
                },
                padding: 6
              }
            }
          }
        }}
      />
    </div>
  </div>

  {/* Summary */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="mt-2 flex justify-between items-center"
  >
    <div className="flex items-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5"
      />
      <span className="text-xs font-medium text-gray-600">
        Total: ₹{(profitChartData.datasets[0].data.reduce((a, b) => a + b, 0) / 1000).toFixed(1)}k
      </span>
    </div>
    <motion.div
      initial={{ opacity: 0, x: 6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1 }}
      className="text-xs text-gray-500"
    >
      Hover for details
    </motion.div>
  </motion.div>
</motion.div>


              {/* Cash Flow */}
              

<motion.div
  variants={{
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5, delay: 0.7 }}
  whileHover={{ y: -3 }}
  className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 relative"
>
  {/* Subtle bank pattern */}
  <div className="absolute top-0 right-0 w-12 h-12 bg-green-50 rounded-bl-full opacity-20"></div>

  <div className="flex items-center justify-between mb-3 relative z-10">
    <h3 className="text-sm font-semibold text-gray-700 tracking-wide">CASH FLOW</h3>
    
    <motion.div
      animate={{ 
        rotate: [0, 8, -8, 0],
        scale: [1, 1.03, 1]
      }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="p-1 bg-green-100 rounded-full"
    >
      <FaLandmark className="text-green-600 text-sm" />
    </motion.div>
  </div>

  <div className="space-y-2">
    {[
      { 
        label: "Available Balance", 
        value: nelloreUnit.financials.cashAndBank,
        color: "text-green-600",
        icon: <FaWallet className="text-green-500 mr-1 text-xs" />,
        type: "credit"
      },
      { 
        label: "Incoming", 
        value: nelloreUnit.financials.receivables,
        color: "text-blue-600", 
        icon: <FaArrowCircleDown className="text-blue-400 mr-1 text-xs" />,
        type: "credit"
      },
      { 
        label: "Outstanding", 
        value: nelloreUnit.financials.payables,
        color: "text-red-500",
        icon: <FaArrowCircleUp className="text-red-400 mr-1 text-xs" />,
        type: "debit"
      }
    ].map((item, index) => (
      <motion.div 
        key={index}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="flex justify-between items-center p-1.5 rounded hover:bg-green-50"
      >
        <div className="flex items-center">
          {item.icon}
          <div>
            <h4 className="text-xs font-medium text-gray-600 leading-tight">{item.label}</h4>
            <p className="text-[0.6rem] text-gray-400 leading-tight mt-0.5">
              {item.type === "credit" ? "CREDIT" : "DEBIT"}
            </p>
          </div>
        </div>
        <span className={`text-xs font-semibold ${item.color}`}>
          {item.type === "debit" ? "-" : ""}₹{new Intl.NumberFormat('en-IN').format(item.value)}
        </span>
      </motion.div>
    ))}
  </div>

  {/* Cashflow Summary Footer */}
  <div className="mt-3 pt-2 border-t border-green-100 flex items-center justify-between">
    <div className="flex items-center space-x-1">
      <FaChartLine className="text-green-500 text-sm" />
      <span className="text-sm font-semibold text-gray-700">
        Net Flow:
      </span>
    </div>
    <span className="text-sm font-semibold text-gray-800">
      ₹{new Intl.NumberFormat('en-IN').format(
        nelloreUnit.financials.cashAndBank +
        nelloreUnit.financials.receivables -
        nelloreUnit.financials.payables
      )}
    </span>
  </div>
</motion.div>

              

              {/* Employee Metrics */}
              
<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5, delay: 0.7 }}
  whileHover={{ y: -3 }}
  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 relative overflow-hidden"
>
  {/* Subtle background pattern */}
  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full opacity-30"></div>
  
  <div className="flex items-center justify-between mb-3 relative z-10">
    <h3 className="text-sm font-semibold text-gray-700 tracking-wide">INVESTMENTS</h3>
    <motion.div
      animate={{ 
        rotate: [0, 20, -20, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="p-2 bg-blue-100 rounded-full"
    >
      <FaExchangeAlt className="text-blue-600 text-lg" />
    </motion.div>
  </div>

  <div className="space-y-3 relative z-10">
    {/* Main Investment Summary - Compact version to match height */}
    <motion.div 
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-b border-blue-50"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaPiggyBank className="text-blue-500 mr-2 text-sm" />
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Investments</h4>
        </div>
        <div className="text-right">
          <p className="text-red-500 text-sm font-medium">Dr ₹525,000.00</p>
          <p className="text-green-600 text-sm font-medium">Cr ₹587,500.00</p>
        </div>
      </div>
    </motion.div>

    {/* Gold Investment - Compact version */}
    <motion.div 
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-b border-blue-50"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaCoins className="text-yellow-500 mr-2 text-sm" />
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gold</h4>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Dr ₹0.00</p>
          <p className="text-green-600 text-sm font-medium">Cr ₹587,500.00</p>
        </div>
      </div>
    </motion.div>

    {/* Other Investments - Compact version */}
    <motion.div 
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaChartLine className="text-blue-400 mr-2 text-sm" />
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Other Investments</h4>
        </div>
        <div className="text-right">
          <p className="text-red-500 text-sm font-medium">Dr ₹525,000.00</p>
          <p className="text-gray-400 text-sm">Cr ₹0.00</p>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Glow effect */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    transition={{ delay: 1 }}
    className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300 rounded-full filter blur-xl"
  />
</motion.div>

           

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;



















