import { Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import { Route } from "react-router";
import Header from "./components/Header";
import Asset from "./pages/Asset";
import AssetsProvider from "./contexts/AssetsProvider";
import { memo } from "react";

function App() {
  return (
    <AssetsProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full h-full">
          <Header />
          <main className="bg-layer-1 h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<Market />} />
              <Route path="/assets/:symbol" element={<Asset />} />
            </Routes>
          </main>
        </div>
      </div>
    </AssetsProvider>
  );
}

export default memo(App);
