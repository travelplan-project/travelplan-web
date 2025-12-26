import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateVehicle() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    license_plate: '',
    model: '',
    status: 'Ativo',
    dt_sale: '',
    km: '',
    last_maintenance: '',
    color: '',
    year: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare payload: convert numeric fields
    const payload = {
      ...form,
      km: form.km === '' ? null : Number(form.km),
      year: form.year === '' ? null : Number(form.year),
      dt_sale: form.dt_sale || null,
      last_maintenance: form.last_maintenance || null,
    };

    api.post('/vehicles', payload)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        setError(err.response?.data || err.message || 'Erro ao criar veículo');
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Novo Veículo</h2>

      {error && (
        <div className="mb-4 text-red-600">
          <pre className="text-sm">{typeof error === 'string' ? error : JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Placa</label>
          <input name="license_plate" value={form.license_plate} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <input name="model" value={form.model} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2">
            <option>Ativo</option>
            <option>Vendido</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Venda</label>
          <input type="date" name="dt_sale" value={form.dt_sale} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Km</label>
          <input type="number" name="km" value={form.km} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Última manutenção</label>
          <input type="date" name="last_maintenance" value={form.last_maintenance} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cor</label>
          <input name="color" value={form.color} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ano</label>
          <input type="number" name="year" value={form.year} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" rows={2} />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-android-accent text-white rounded">{loading ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </form>
    </div>
  );
}
