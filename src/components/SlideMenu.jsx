import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideMenu({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />

      <aside className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Gestão de Viagens e Frotas</div>
            <div className="text-xs text-gray-500">3.0</div>
          </div>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col">
            <li className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Principal</li>
            <li><Link to="/" className="block px-3 py-2 rounded hover:bg-gray-50">Home Veículos</Link></li>

            <li className="my-3 border-t" />

            <li className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Gestão de Frotas</li>
            <li><Link to="/vehicles" className="block px-3 py-2 rounded hover:bg-gray-50">Veículos</Link></li>
            <li><Link to="/fuel_supplies" className="block px-3 py-2 rounded hover:bg-gray-50">Abastecimentos</Link></li>
            <li><Link to="/maintenances" className="block px-3 py-2 rounded hover:bg-gray-50">Manutenções</Link></li>
            <li><Link to="/pending_vehicles" className="block px-3 py-2 rounded hover:bg-gray-50">Pendencias nos Veículos</Link></li>
            
            <li className="my-3 border-t" />

            <li className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Viagens</li>
            <li><Link to="/travels" className="block px-3 py-2 rounded hover:bg-gray-50">Viagens</Link></li>
            <li><Link to="/itineraries" className="block px-3 py-2 rounded hover:bg-gray-50">Itinerários</Link></li>
            
            <li className="my-3 border-t" />

            <li className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Gerais</li>
            <li><Link to="/accounts" className="block px-3 py-2 rounded hover:bg-gray-50">Contas</Link></li>
            <li><Link to="/persons" className="block px-3 py-2 rounded hover:bg-gray-50">Pessoas</Link></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
