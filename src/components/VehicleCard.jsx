import React from 'react';

// Este componente recebe os dados do veículo via "props"
const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Círculo do Ícone */}
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xl">🚗</span>
        </div>
        
        {/* Informações do Veículo */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{vehicle.name || 'Veículo sem nome'}</h3>
          <p className="text-sm text-gray-500">
            {vehicle.license_plate || 'Sem placa'} • {vehicle.model || 'Modelo não informado'}
          </p>
        </div>
        
        {/* Tag de Status */}
        <div className="text-right">
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full uppercase">
            Ativo
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;