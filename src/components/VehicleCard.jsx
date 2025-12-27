import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import spinnerIcon from '../assets/spinner.svg';

const VehicleCard = ({ vehicle }) => {
  const sold = Boolean(vehicle?.dt_sale);
  const statusKey = sold ? 'vendido' : (vehicle?.status?.toLowerCase() || 'ativo');
  const statusLabel = sold
    ? `Vendido${vehicle?.dt_sale ? ` em ${new Date(vehicle.dt_sale).toLocaleDateString()}` : ''}`
    : (vehicle?.status ? vehicle.status : 'Ativo');

  let statusColor = 'bg-green-100 text-green-700';
  if (statusKey === 'vendido') statusColor = 'bg-red-100 text-red-700';
  else if (statusKey !== 'ativo') statusColor = 'bg-yellow-100 text-yellow-700';

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (ev) => {
    ev.preventDefault();
    if (!window.confirm('Deseja realmente excluir este veículo?')) return;
    setDeleting(true);
    try {
      await api.delete(`/vehicles/${vehicle?.id}`);
      window.location.reload();
    } catch (err) {
      console.error('Erro ao excluir veículo:', err);
      alert('Erro ao excluir veículo');
      setDeleting(false);
    }
  };

  return (
    <div className="block">
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

        <div className="mt-3 flex justify-end gap-2">
          <Link to={`/vehicles/${vehicle?.id}/edit`} className="px-3 py-1 bg-android-accent text-white rounded-md flex items-center justify-center" aria-label="Editar">
            <img src={editIcon} alt="Editar" className="h-4 w-4" />
          </Link>
          <button onClick={handleDelete} disabled={deleting} className="px-3 py-1 bg-red-600 text-white rounded-md flex items-center justify-center" aria-label="Excluir">
            {deleting ? (
              <img src={spinnerIcon} alt="Excluindo" className="h-4 w-4 animate-spin" />
            ) : (
              <img src={deleteIcon} alt="Excluir" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;