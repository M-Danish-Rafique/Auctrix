import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  ArrowUpRight 
} from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Assuming the Sidebar component you shared

// Quick Stats Card Component
const QuickStatCard = ({ icon: Icon, title, value, change, positive }) => (
  <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="text-blue-600" size={24} />
      </div>
      <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}%
      </span>
    </div>
    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

// Recent Auctions Component
const RecentAuctions = () => {
  const auctions = [
    { 
      id: 1, 
      title: 'Vintage Leather Jacket', 
      status: 'Active', 
      currentBid: '$450', 
      endDate: '12/20/2024' 
    },
    { 
      id: 2, 
      title: 'Classic Motorcycle', 
      status: 'Pending', 
      currentBid: '$2,500', 
      endDate: '12/25/2024' 
    },
    { 
      id: 3, 
      title: 'Rare Coin Collection', 
      status: 'Completed', 
      currentBid: '$1,200', 
      endDate: '12/10/2024' 
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Auctions</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm">View All</button>
      </div>
      <div className="space-y-4">
        {auctions.map((auction) => (
          <div 
            key={auction.id} 
            className="flex justify-between items-center border-b pb-3 last:border-b-0"
          >
            <div>
              <h3 className="font-medium text-gray-700">{auction.title}</h3>
              <span 
                className={`
                  text-xs px-2 py-1 rounded-full 
                  ${auction.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    auction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}
                `}
              >
                {auction.status}
              </span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{auction.currentBid}</p>
              <p className="text-sm text-gray-500">Ends {auction.endDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Performance Overview Chart (Placeholder for actual chart implementation)
const PerformanceChart = () => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Performance Overview</h2>
      <select className="text-sm text-gray-600 border rounded px-2 py-1">
        <option>Last 6 Months</option>
        <option>Last Year</option>
      </select>
    </div>
    <div className="h-64 flex items-center justify-center text-gray-500">
      Chart Placeholder
    </div>
  </div>
);

// Main Seller Dashboard Component
const SellerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar selectedItem="SellerDashboard" />
      <div className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickStatCard 
              icon={Briefcase} 
              title="Total Auctions" 
              value="24" 
              change={15} 
              positive 
            />
            <QuickStatCard 
              icon={DollarSign} 
              title="Total Revenue" 
              value="$45,670" 
              change={8.5} 
              positive 
            />
            <QuickStatCard 
              icon={ShoppingCart} 
              title="Active Listings" 
              value="12" 
              change={-3.2} 
              positive={false} 
            />
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentAuctions />
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;