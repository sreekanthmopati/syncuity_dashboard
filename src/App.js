import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AssetPage from './components/AssetPage';
// import UnitDashboard from './UnitDashboard';
import DashboardLayout from './components/DashboardLayout';
import MapView from './components/MapView';
import AndhraPradeshLayout from './components/AndhraPradeshLayout';
import ApDashboard from './components/ApDashboard'
// import RevenuePieChart from './components/RevenuePieChart';




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
            
            <Route path="/" element={<Navigate to="/AP" replace />} />
            <Route path="/:id" element={<AssetPage setActiveAsset={setActiveAssetId}/>} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



