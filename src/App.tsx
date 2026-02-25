import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Discovery from "./pages/Discovery";
import ClassSaas from "./pages/ClassSaas";
import Circles from "./pages/Circles";
import Connections from "./pages/Connections";
import Profile from "./pages/Profile";
import { useState } from "react";
import { CONNECTIONS } from "./data/mockData";

function App() {
  // Global State for Connections
  const [globalConnections, setGlobalConnections] = useState(CONNECTIONS);

  const addConnection = (newConnection: any) => {
    setGlobalConnections(prev => [newConnection, ...prev]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Discovery />} />
          <Route path="/class" element={<ClassSaas onAddConnection={addConnection} />} />
          <Route path="/circles" element={<Circles />} />
          <Route path="/connections" element={<Connections connections={globalConnections} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;