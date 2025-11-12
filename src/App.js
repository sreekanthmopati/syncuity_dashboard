import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AssetPage from './components/AssetPage';
// import UnitDashboard from './UnitDashboard';
import DashboardLayout from './components/DashboardLayout';
import MapView from './components/MapView';
import AndhraPradeshLayout from './components/AndhraPradeshLayout';
import ApDashboard from './components/ApDashboard'
import LandManagementUI from './components/LandUi';
import LandMap from './components/LandMap';
import LandDetails from './components/Landdetails';
import LandDashboard from './components/LandDasboard';
import LandAssetManagement from './components/LandAssetManangement';




function App() {
  const [activeAssetId, setActiveAssetId] = useState(null);
  return (
    <Router>
      <div className="flex">
        <Sidebar activeAssetId={activeAssetId} setActiveAssetId={setActiveAssetId}/>
        <div  
           className="flex-1">
          <Routes>
            
            <Route path="/map/districts" element={<MapView/>} />
            <Route path="/Apdashboard" element={<ApDashboard />} />
            <Route path="/NelloreUnit" element={<DashboardLayout />} />
            <Route path="/AP" element={<AndhraPradeshLayout />} />
            <Route path="/" element={<Navigate to="/Apdashboard" replace />} />
            <Route path="/:id" element={<AssetPage setActiveAsset={setActiveAssetId}/>} />
           

           
             <Route path="/land" element={<LandManagementUI />} />
             <Route path="/landmap" element={<LandMap />} />
             <Route path="/landdetails" element={<LandDetails />} />
             <Route path="/landdashboard" element={<LandDashboard />} />
             <Route path="/landasset" element={<LandAssetManagement />} />


            <Route path="/land-management" element={<Navigate to="/land-management/dashboard" replace />} />
            <Route path="/land-management/dashboard" element={<LandDashboard />} />
            <Route path="/land-management/registry" element={<LandManagementUI />} />
            <Route path="/land-management/asset-management" element={<LandAssetManagement />} />
            <Route path="/land-management/map" element={<LandMap />} />
            <Route path="/land-management/landdetails" element={<LandDetails />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



