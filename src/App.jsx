import React, { useState } from 'react';
import './App.css';
import './deliverable.css';
import Header from './components/Header.jsx';
import IslandMap from './components/IslandMap.jsx';
import ReportView from './components/ReportView.jsx';
import FullIntelView from './components/FullIntelView.jsx';
import { brands, defaultBrand } from './data/index.js';

export default function App() {
  const [view, setView] = useState('map');
  const [activeBrand, setActiveBrand] = useState(defaultBrand);

  const brandData = brands[activeBrand];

  return (
    <div className="app">
      <Header
        view={view}
        onViewChange={setView}
        brandMeta={brandData?.meta}
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
        brandKeys={Object.keys(brands)}
      />
      <main className="app-main">
        {view === 'map' && <IslandMap brandData={brandData} />}
        {view === 'report' && <ReportView brandData={brandData} />}
        {view === 'intel' && <FullIntelView brandData={brandData} />}
      </main>
    </div>
  );
}
