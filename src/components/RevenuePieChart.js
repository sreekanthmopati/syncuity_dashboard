import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const RevenuePieChart = () => {
    const data = {
        labels: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [125000, 98000, 87000, 76000, 65000],
            backgroundColor: [
              '#00ffcc',
              '#33ccff',
              '#ff66cc',
              '#ffcc00',
              '#66ff66',
            ],
            borderColor: '#1f2937',
            borderWidth: 2,
            hoverOffset: 30,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#4ade80',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#22d3ee',
            bodyColor: '#fff',
            borderColor: '#4ade80',
            borderWidth: 2,
            padding: 10,
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1500,
          easing: 'easeOutBounce',
        },
        hover: {
          mode: 'nearest',
          onHover: (event, chartElement) => {
            if (chartElement.length) {
              event.native.target.style.cursor = 'pointer';
            } else {
              event.native.target.style.cursor = 'default';
            }
          },
        },
      };
    
      return (
        <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-2xl hover:shadow-green-500 transition-all duration-500 ease-in-out">
          <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
            Branch Revenue Breakdown
          </h2>
          <Pie data={data} options={options} />
        </div>
      );
    };
export default RevenuePieChart;
