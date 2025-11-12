import React from 'react';
import { landRecordsSample } from '../data/landRecordSamples';
import { 
  MapPin, FileText, Building, 
  CheckCircle, AlertTriangle, Clock, TrendingUp 
} from 'lucide-react';

const LandDashboard = () => {
  // Calculate statistics from sample data
  const stats = {
    totalLands: landRecordsSample.length,
    districtsCovered: new Set(landRecordsSample.map(l => l.district)).size,
    withAllotmentProceedings: landRecordsSample.filter(l => l.titleDocuments.hasAllotmentProceedings).length,
    withSubDivisionRecords: landRecordsSample.filter(l => l.titleDocuments.hasSubDivisionRecord).length,
    withBuildings: landRecordsSample.filter(l => l.buildingInfo.plinthArea > 0).length,
    activeLeases: landRecordsSample.filter(l => l.leases.leaseDeeds.length > 0).length,
    donatedLands: landRecordsSample.filter(l => l.titleDocuments.donationDetails).length,
  };

  const complianceRate = Math.round((stats.withAllotmentProceedings / stats.totalLands) * 100);
  const buildingRate = Math.round((stats.withBuildings / stats.totalLands) * 100);
  const leaseRate = Math.round((stats.activeLeases / stats.totalLands) * 100);

  // Recent activities
  const recentActivities = landRecordsSample
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 5);

  // District performance
  const districtPerformance = landRecordsSample.reduce((acc, land) => {
    if (!acc[land.district]) {
      acc[land.district] = { count: 0, withDocuments: 0, withBuildings: 0 };
    }
    acc[land.district].count++;
    if (land.titleDocuments.hasAllotmentProceedings) acc[land.district].withDocuments++;
    if (land.buildingInfo.plinthArea > 0) acc[land.district].withBuildings++;
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending Documents': return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="w-4 h-4" />;
      case 'Pending Documents': return <AlertTriangle className="w-4 h-4" />;
      case 'Under Review': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl shadow-lg border-b-4 border-orange-500 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-orange-400">
                <MapPin className="w-8 h-8 text-blue-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Land Management Dashboard</h1>
                <p className="text-blue-200">Comprehensive overview of AP Police land assets</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Last Updated</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Lands */}
          <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Land Parcels</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalLands}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Across {stats.districtsCovered} districts
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Document Compliance */}
          <div className="bg-white rounded-xl border border-green-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Document Compliance</p>
                <p className="text-3xl font-bold text-gray-900">{complianceRate}%</p>
                <p className="text-xs text-gray-600 mt-1">
                  {stats.withAllotmentProceedings}/{stats.totalLands} with title docs
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Building Infrastructure */}
          <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">With Buildings</p>
                <p className="text-3xl font-bold text-gray-900">{buildingRate}%</p>
                <p className="text-xs text-gray-600 mt-1">
                  {stats.withBuildings} parcels with structures
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Active Leases */}
          <div className="bg-white rounded-xl border border-orange-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Leases</p>
                <p className="text-3xl font-bold text-gray-900">{leaseRate}%</p>
                <p className="text-xs text-gray-600 mt-1">
                  {stats.activeLeases} generating revenue
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* District Performance */}
          <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-800">District Performance</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(districtPerformance).map(([district, data]) => {
                const docRate = Math.round((data.withDocuments / data.count) * 100);
                const buildingRate = Math.round((data.withBuildings / data.count) * 100);
                
                return (
                  <div key={district} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">{district}</span>
                        <span className="text-sm text-gray-500">{data.count} lands</span>
                      </div>
                      <div className="flex space-x-4 text-xs">
                        <div className="flex items-center">
                          <FileText className="w-3 h-3 text-green-500 mr-1" />
                          <span>{docRate}% docs</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-3 h-3 text-purple-500 mr-1" />
                          <span>{buildingRate}% buildings</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities & Alerts */}
          <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-800">Recent Activities & Alerts</h2>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((land) => (
                <div key={land.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className={`p-2 rounded-full ${getStatusColor(land.status).split(' ')[0]}`}>
                    {getStatusIcon(land.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">{land.surveyNo}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(land.status)}`}>
                        {land.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{land.village}, {land.district}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated: {new Date(land.lastUpdated).toLocaleDateString()}
                    </p>
                    
                    {/* Quick compliance indicators */}
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      {!land.titleDocuments.hasAllotmentProceedings && (
                        <span className="text-red-600 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Missing Title Docs
                        </span>
                      )}
                      {land.buildingInfo.plinthArea > 0 && (
                        <span className="text-purple-600 flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          Has Building
                        </span>
                      )}
                      {land.leases.leaseDeeds.length > 0 && (
                        <span className="text-green-600 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Active Lease
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Alerts */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="font-semibold text-red-800">Attention Required</h3>
              </div>
              <p className="text-sm text-red-600 mt-1">
                {stats.totalLands - stats.withAllotmentProceedings} land parcels are missing allotment proceedings
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Quick Access</h3>
          <p className="text-blue-200 text-sm mb-4">
            Navigate to detailed modules for comprehensive land management
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              🔍 Land Registry
            </button>
            <button className="bg-white hover:bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors">
              📊 Asset Management
            </button>
            <button className="bg-white hover:bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors">
              📄 Documents Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandDashboard;