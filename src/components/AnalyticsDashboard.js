import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FiHome, FiShoppingBag, FiInfo, FiMail } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalyticsDashboard = () => {
  // Page views data
  const pageViewsData = {
    labels: ['Home', 'Product', 'About', 'Contact'],
    datasets: [{
      data: [4500, 2450, 1890, 1200],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Traffic sources data
  const trafficSourcesData = {
    labels: ['Direct', 'Organic', 'Social', 'Email'],
    datasets: [{
      label: 'Visitors',
      data: [1200, 1900, 800, 600],
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1
    }]
  };

  // Device breakdown data
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [35, 55, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(20, 184, 166, 0.7)'
      ]
    }]
  };

  // Age demographics data
  const ageData = {
    labels: ['15-24', '25-34', '35-44', '45+'],
    datasets: [{
      label: 'Percentage',
      data: [15, 35, 20, 30],
      backgroundColor: 'rgba(139, 92, 246, 0.7)'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">WEBSITE ANALYTICS REPORTS</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversion Rate Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Conversion Rate by Traffic Source</h2>
          
          <div className="space-y-6">
            {/* Page Views Chart */}
            <div>
              <h3 className="font-medium text-gray-600 mb-3 flex items-center gap-2">
                <FiHome className="text-blue-500" />
                Page Views by Page Type
              </h3>
              <div className="h-64">
                <Bar 
                  data={pageViewsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.parsed.y} views`
                        }
                      }
                    }
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Home has the highest value for Page Views by Page Type among the others
              </p>
            </div>

            {/* Contact Breakdown */}
            <div>
              <h3 className="font-medium text-gray-600 mb-3 flex items-center gap-2">
                <FiMail className="text-red-500" />
                Contact Conversions
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">IOS</p>
                  <p className="text-xl font-bold">200</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">SOD</p>
                  <p className="text-xl font-bold">400</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">SOD</p>
                  <p className="text-xl font-bold">500</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traffic Sources Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Traffic Sources</h2>
          
          <div className="space-y-6">
            {/* Source Rate Chart */}
            <div>
              <h3 className="font-medium text-gray-600 mb-3">Source Rate by Device</h3>
              <div className="h-64">
                <Bar 
                  data={trafficSourcesData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-600 mb-3">Device Distribution</h3>
                <div className="h-48">
                  <Pie 
                    data={deviceData}
                    options={{
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.parsed}%`
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Age Demographics */}
              <div>
                <h3 className="font-medium text-gray-600 mb-3">User Demographics</h3>
                <div className="h-48">
                  <Bar 
                    data={ageData}
                    options={{
                      indexAxis: 'y',
                      responsive: true,
                      scales: {
                        x: {
                          max: 100
                        }
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.parsed.x}%`
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;