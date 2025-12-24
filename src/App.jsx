import React, { useEffect, useState } from 'react';
import api from './services/api';
import VehicleCard from './components/VehicleCard';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados da sua API Java
    api.get('/vehicles') // Altere para o seu endpoint real (ex: /vehicles)
      .then(response => {
        setVeiculos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar veículos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-android-blue shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-white text-xl font-bold">Meus Veículos</h1>
      </header>

      <main className="p-4 max-w-2xl mx-auto flex flex-col gap-3">
        {loading ? (
          <p className="text-center mt-10 text-gray-500 italic">Carregando seus dados...</p>
        ) : (
          veiculos.map(v => (
            <VehicleCard key={v.id} vehicle={v} />
          ))
        )}
        
        {/* Botão Flutuante (FAB) */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-android-blue text-white rounded-full shadow-2xl text-3xl flex items-center justify-center hover:scale-110 transition-transform">
          +
        </button>
      </main>
    </div>
  );
}

export default App;