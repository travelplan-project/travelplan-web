import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`/vehicles/${id}`)
      .then(res => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar veículo:', err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-gray-500">Carregando...</div>;
  if (error) return (
    <div className="text-center text-red-600">
      <p>Erro ao carregar detalhes.</p>
      <Link to="/" className="mt-3 inline-block px-3 py-2 bg-android-blue text-white rounded-md">Voltar</Link>
    </div>
  );

  if (!vehicle) return <div className="text-center text-gray-600">Veículo não encontrado.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">🚗</div>
        <div>
          <h2 className="text-2xl font-bold">{vehicle.name || '—'}</h2>
          <p className="text-sm text-gray-500">Placa: {vehicle.license_plate || '—'}</p>
          <p className="text-sm text-gray-500">Modelo: {vehicle.model || '—'}</p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Informações</h3>
        <div className="mt-2 text-sm text-gray-700">
          <p>Status: <span className="font-medium">{vehicle.status || '—'}</span></p>
          <p>Kilometragem: <span className="font-medium">{vehicle.odometer ?? '—'}</span></p>
          <p>Cor: <span className="font-medium">{vehicle.color || '—'}</span></p>
        </div>
      </section>

      <div className="mt-6 flex gap-3">
        <Link to="/" className="px-3 py-2 bg-gray-200 rounded-md">Voltar</Link>
        <button className="px-3 py-2 bg-android-accent text-white rounded-md">Editar</button>
      </div>
    </div>
  );
}
