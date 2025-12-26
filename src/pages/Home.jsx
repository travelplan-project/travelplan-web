import React, { useEffect, useState, useMemo, useRef } from 'react';
import api from '../services/api';
import VehicleCard from '../components/VehicleCard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const carouselRef = useRef(null);

  const fetchVehicles = () => {
    setLoading(true);
    setError(null);
    api.get('/vehicles')
      .then(response => {
        setVeiculos(response.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar veículos:', err);
        const normalized = {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        };
        setError(normalized);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return veiculos;
    return veiculos.filter(v => {
      const name = (v.name || '').toLowerCase();
      const plate = (v.license_plate || '').toLowerCase();
      return name.includes(q) || plate.includes(q);
    });
  }, [veiculos, query]);

  return (
    <div>
      <section className="rounded-lg p-4 mb-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Veículos</h2>
            <p className="text-sm text-gray-500">Total: <span className="font-medium">{veiculos.length}</span></p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nome ou placa..."
              className="w-full sm:w-80 px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            />
            <button onClick={fetchVehicles} className="px-3 py-2 bg-android-accent text-white rounded-md">Atualizar</button>
          </div>
        </div>
      </section>

      <section>
        {loading ? (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="carousel-item snap-center flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] h-28 bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Erro ao carregar veículos.</p>
            <button onClick={fetchVehicles} className="mt-3 px-3 py-2 bg-android-blue text-white rounded-md">Tentar novamente</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600">Nenhum veículo encontrado.</div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button aria-label="Anterior" onClick={() => {
                const el = carouselRef.current; if (!el) return; const item = el.querySelector('.carousel-item'); const step = (item?.offsetWidth || Math.floor(el.clientWidth/3)) + 16; el.scrollBy({ left: -step, behavior: 'smooth' });
              }} className="p-2 bg-white rounded-full shadow-md ml-2">‹</button>
            </div>

            <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-6 no-scrollbar">
              {filtered.map(v => (
                <div key={v.id} className="carousel-item snap-center flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]">
                  <VehicleCard vehicle={v} />
                </div>
              ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button aria-label="Próximo" onClick={() => {
                const el = carouselRef.current; if (!el) return; const item = el.querySelector('.carousel-item'); const step = (item?.offsetWidth || Math.floor(el.clientWidth/3)) + 16; el.scrollBy({ left: step, behavior: 'smooth' });
              }} className="p-2 bg-white rounded-full shadow-md mr-2">›</button>
            </div>
          </div>
        )}
      </section>

      <button onClick={() => navigate('/vehicles/new')} className="fixed bottom-6 right-6 w-14 h-14 bg-android-accent text-white rounded-full shadow-2xl text-3xl flex items-center justify-center hover:scale-110 transition-transform">
        +
      </button>
    </div>
  );
}
