import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import MapView from './MapView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const DashboardComponent = () => {
  const salesOverview = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Sep', 'Oct', 'Dec'],
    datasets: [
      {
        label: '2023',
        data: [30, 45, 32, 60, 40, 50, 48, 56, 63],
        borderColor: '#2563eb',
        fill: false,
        tension: 0.4
      },
      {
        label: '2024',
        data: [20, 35, 42, 55, 60, 70, 75, 80, 95],
        borderColor: '#f97316',
        fill: false,
        tension: 0.4
      }
    ]
  };

  const doughnutData = {
    labels: ['Order Value'],
    datasets: [
      {
        data: [250, 750],
        backgroundColor: ['#3b82f6', '#e5e7eb'],
        borderWidth: 0,
      }
    ]
  };

  const profitMargin = {
    labels: ['A', 'B', 'C', 'A', 'B', 'C', 'E'],
    datasets: [
      {
        label: 'North',
        data: [1, 2, 1, 2, 1, 2, 2],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'South',
        data: [2, 1, 2, 1, 2, 1, 3],
        backgroundColor: '#f97316',
      },
      {
        label: 'East',
        data: [2, 3, 4, 2, 4, 3, 4],
        backgroundColor: '#10b981',
      }
    ]
  };

  const revenueByProduct = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'North',
        data: [30, 40, 20, 10],
        backgroundColor: '#3b82f6',
        stack: 'Stack 0'
      },
      {
        label: 'South',
        data: [20, 30, 10, 15],
        backgroundColor: '#f97316',
        stack: 'Stack 0'
      },
      {
        label: 'East',
        data: [25, 10, 30, 20],
        backgroundColor: '#10b981',
        stack: 'Stack 0'
      },
      {
        label: 'West',
        data: [15, 20, 40, 30],
        backgroundColor: '#6b7280',
        stack: 'Stack 0'
      }
    ]
  };

  return (
<div className="h-screen w-full bg-white text-gray-800 p-4 overflow-hidden">
  <div className="h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" style={{ gridAutoRows: "minmax(200px, 1fr)" }}>
    {/* Sales Overview Card */}
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <h2 className="font-bold text-lg mb-2">Sales Overview</h2>
      <div className="flex-1 min-h-0">
        <Line 
          data={salesOverview} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } } 
          }} 
        />
      </div>
    </div>

    {/* Revenue Card */}
   {/* Revenue Card */}
{/* Revenue Card */}
<div className="bg-white p-4 rounded-lg shadow flex flex-col">
  <div className="text-center">
    <h2 className="text-sm font-semibold">Total Revenue</h2>
    <p className="text-2xl font-bold">$450,000</p>
  </div>
  <div className="flex-1 flex justify-center items-center py-1 min-h-0">
    <div className="w-full h-[70%] aspect-square">
      <Doughnut 
        data={doughnutData} 
        options={{ 
          cutout: '70%', 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { legend: { display: false } } 
        }} 
      />
    </div>
  </div>
  <div className="text-center">
    <h2 className="text-sm font-semibold">Avg. Order Value</h2>
    <p className="text-lg font-bold">$250</p>
  </div>
</div>


{/* Conversion Rate Card */}
<div className="bg-white p-4 rounded-lg shadow flex flex-col">
  <div>
    <h2 className="text-sm font-semibold">Conversion Rate</h2>
    <p className="text-xl font-bold">3.8%</p>
  </div>
  <div className="flex-1 flex flex-col justify-center min-h-0 space-y-1 px-4">
    <div className="w-full h-[8%] sm:h-[10%] bg-green-100 rounded" />
    <div className="text-xs text-center">3.5%</div>
    <div className="w-full h-[6%] sm:h-[8%] bg-blue-100 rounded" />
  </div>
</div>


    {/* Revenue by District Card */}
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <h2 className="font-bold text-lg mb-2">Revenue by district</h2>
      <div className="flex-1 min-h-0">
        <Bar
          data={revenueByProduct}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
              x: { stacked: true, beginAtZero: true }, 
              y: { stacked: true } 
            }
          }}
        />
      </div>
      <div className="flex flex-wrap justify-around text-xs mt-1 gap-1">
        <span className="text-blue-500">■ North</span>
        <span className="text-orange-500">■ South</span>
        <span className="text-green-500">■ East</span>
        <span className="text-gray-500">■ West</span>
      </div>
    </div>

    {/* Profit Margin Card */}
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <h2 className="font-bold text-lg mb-2">Profit Margin</h2>
      <div className="flex-1 min-h-0">
        <Bar 
          data={profitMargin} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true } }
          }} 
        />
      </div>
    </div>

    {/* Sales by Region Card */}
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
  <h2 className="font-bold text-lg mb-2">Sales by Region</h2>
  
  {/* Give more space to the map */}
  <div className="flex-1 min-h-0 mb-2">
    <MapView />
  </div>

  {/* Shrink and de-emphasize labels */}
  <div className="flex flex-wrap justify-around text-[0.65rem] gap-1">
    <span className="bg-blue-100 px-1.5 py-0.5 rounded-full">North: 4,500</span>
    <span className="bg-orange-100 px-1.5 py-0.5 rounded-full">South: 6,600</span>
    <span className="bg-green-100 px-1.5 py-0.5 rounded-full">East: 7,200</span>
    <span className="bg-gray-100 px-1.5 py-0.5 rounded-full">West: 3,100</span>
  </div>
</div>

  </div>
</div>
  );
};

export default DashboardComponent;


