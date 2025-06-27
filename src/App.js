import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AssetPage from './components/AssetPage';
// import UnitDashboard from './UnitDashboard';
import DashboardLayout from './components/DashboardLayout';
import AndhraPradeshLayout from './components/AndhraPradeshLayout';
// import RevenuePieChart from './components/RevenuePieChart';




function App() {
  const [activeAssetId, setActiveAssetId] = useState(null);
  return (
    <Router>
      <div className="flex">
        <Sidebar activeAssetId={activeAssetId} />
        <div className="flex-1">
          <Routes>
            {/* <Route path="/unit/:unitId" element={<UnitDashboard />} /> */}
            <Route path="/:id" element={<AssetPage setActiveAsset={setActiveAssetId}/>} />
            <Route path="/NelloreUnit" element={<DashboardLayout />} />
            <Route path="/AP" element={<AndhraPradeshLayout />} />
            {/* <Route path="/rp" element={<RevenuePieChart />} /> */}
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



