import React from 'react';

function App() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      {/* Card Principal */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Barra de Título (Simulando Toolbar do Android) */}
        <div className="bg-android-blue p-4">
          <h2 className="text-white font-bold text-lg">TravelPlan Web</h2>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-android-dark mb-2">
            Bem-vindo ao seu painel
          </h1>
          <p className="text-gray-600 mb-6">
            O Tailwind v4 está ativo! Agora podemos criar seus Cards de Veículos.
          </p>

          <button className="w-full bg-android-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg">
            Ver Meus Veículos
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;