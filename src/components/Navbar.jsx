import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SlideMenu from './SlideMenu';
import logo from '../assets/ic_launcher_round.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlideMenu open={open} onClose={() => setOpen(false)} />

      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="mr-2 p-2 rounded hover:bg-gray-100">☰</button>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Travelplan" className="w-9 h-9 rounded-md object-cover" />
              <div>
                <div className="text-lg font-semibold text-gray-800">Travelplan</div>
                <div className="text-xs text-gray-500">Gestão de Viagens e Frotas</div>
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-android-blue font-medium">Início</Link>
            <Link to="/about" className="text-gray-700 hover:text-android-blue font-medium">Sobre</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
