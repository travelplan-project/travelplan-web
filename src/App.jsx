import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import CreateVehicle from './pages/CreateVehicle';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vehicles/new" element={<CreateVehicle />} />
            <Route path="/vehicles/:id/edit" element={<CreateVehicle />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;