import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const sold = Boolean(vehicle?.dt_sale);
  const statusKey = sold ? 'vendido' : (vehicle?.status?.toLowerCase() || 'ativo');
  const statusLabel = sold
    ? `Vendido${vehicle?.dt_sale ? ` em ${new Date(vehicle.dt_sale).toLocaleDateString()}` : ''}`
    : (vehicle?.status ? vehicle.status : 'Ativo');

  let statusColor = 'bg-green-100 text-green-700';
  if (statusKey === 'vendido') statusColor = 'bg-red-100 text-red-700';
  else if (statusKey !== 'ativo') statusColor = 'bg-yellow-100 text-yellow-700';

  return (
    <Link to={`/vehicles/${vehicle?.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center text-2xl">🚗</div>

          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{vehicle?.name || 'Veículo sem nome'}</h3>
            <p className="text-sm text-gray-500">{vehicle?.license_plate || 'Sem placa'}</p>
            <p className="text-sm text-gray-400 mt-1">{vehicle?.model || 'Modelo não informado'}</p>
          </div>

          <div className="text-right">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${statusColor}`}>
              {statusKey}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;