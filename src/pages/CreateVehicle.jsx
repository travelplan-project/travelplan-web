import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function CreateVehicle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name: '',
    short_name: '',
    brand: '',
    model: '',
    vehicle_type: '',
    fuel_type: '',
    year_model: '',
    year_manufacture: '',
    license_plate: '',
    color: '',
    color_code: '',
    vin: '',
    licence_number: '',
    state: '',
    city: '',
    dt_acquisition: '',
    odometer_acquisition: '',
    dt_sale: '',
    doors: '',
    capacity: '',
    power: '',
    estimated_value: '',
    full_capacity: '',
    avg_consumption: '',
    avg_cost_litre: '',
    dt_odometer: '',
    odometer: '',
    dt_last_fueling: '',
    last_supply_reason_type: '',
    accumulated_number_liters: '',
    accumulated_supply_value: '',
    vehicle_owner: null,
    image: null,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({ persons: null });

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const candidates = ['/VehicleType'];
      const absoluteBase = 'http://localhost:8081';
      for (const url of candidates) {
        try {
          const res = await api.get(url);
          const body = res.data;
          let list = null;
          if (Array.isArray(body)) list = body;
          else if (Array.isArray(body.data)) list = body.data;
          else if (Array.isArray(body.items)) list = body.items;
          else if (Array.isArray(body.content)) list = body.content;
          if (Array.isArray(list)) {
            setOptions(prev => ({ ...prev, vehicle_types: list }));
            return;
          }
        } catch (e) {
          // try absolute
        }

        try {
          const r2 = await fetch(`${absoluteBase}${url}`);
          if (r2.ok) {
            const body2 = await r2.json();
            let list2 = null;
            if (Array.isArray(body2)) list2 = body2;
            else if (Array.isArray(body2.data)) list2 = body2.data;
            else if (Array.isArray(body2.items)) list2 = body2.items;
            else if (Array.isArray(body2.content)) list2 = body2.content;
            if (Array.isArray(list2)) {
              setOptions(prev => ({ ...prev, vehicle_types: list2 }));
              return;
            }
          }
        } catch (e) {
          // continue
        }
      }
      setOptions(prev => ({ ...prev, vehicle_types: null }));
    };
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    const fetchPersons = async () => {
      const candidates = [ '/persons'];
      const absoluteBase = 'http://localhost:8081';
      for (const url of candidates) {
        // try using api instance (which may prefix /api)
        try {
          const res = await api.get(url);
          const body = res.data;
          let list = null;
          if (Array.isArray(body)) list = body;
          else if (Array.isArray(body.data)) list = body.data;
          else if (Array.isArray(body.items)) list = body.items;
          else if (Array.isArray(body.content)) list = body.content;

          if (Array.isArray(list)) {
            setOptions(prev => ({ ...prev, persons: list }));
            return;
          }
        } catch (e) {
          // try absolute path next
        }

        // try absolute backend URL (no /api prefix)
        try {
          const r2 = await fetch(`${absoluteBase}${url}`);
          if (r2.ok) {
            const body2 = await r2.json();
            let list2 = null;
            if (Array.isArray(body2)) list2 = body2;
            else if (Array.isArray(body2.data)) list2 = body2.data;
            else if (Array.isArray(body2.items)) list2 = body2.items;
            else if (Array.isArray(body2.content)) list2 = body2.content;
            if (Array.isArray(list2)) {
              setOptions({ persons: list2 });
              return;
            }
          }
        } catch (e) {
          // continue
        }
      }
      setOptions(prev => ({ ...prev, persons: null }));
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api.get(`/vehicles/${id}`)
      .then(res => {
        const v = res.data || {};
        const mapped = {
          name: v.name ?? '',
          short_name: v.short_name ?? '',
          brand: v.brand ?? '',
          model: v.model ?? '',
          vehicle_type: v.vehicle_type?.id ?? v.vehicle_type ?? v.vehicleType ?? v.vehicle_type_id ?? v.vehicle_type ?? '',
          fuel_type: v.fuel_type?.id ?? v.fuel_type ?? '',
          year_model: v.year_model ?? '',
          year_manufacture: v.year_manufacture ?? '',
          license_plate: v.license_plate ?? '',
          color: v.color ?? '',
          color_code: v.color_code ?? '',
          vin: v.vin ?? '',
          licence_number: v.licence_number ?? '',
          state: v.state ?? '',
          city: v.city ?? '',
          dt_acquisition: v.dt_acquisition ?? '',
          odometer_acquisition: v.odometer_acquisition ?? '',
          dt_sale: v.dt_sale ?? '',
          doors: v.doors ?? '',
          capacity: v.capacity ?? '',
          power: v.power ?? '',
          estimated_value: v.estimated_value ?? '',
          full_capacity: v.full_capacity ?? '',
          avg_consumption: v.avg_consumption ?? '',
          avg_cost_litre: v.avg_cost_litre ?? '',
          dt_odometer: v.dt_odometer ?? '',
          odometer: v.odometer ?? '',
          dt_last_fueling: v.dt_last_fueling ?? '',
          last_supply_reason_type: v.last_supply_reason_type ?? '',
          accumulated_number_liters: v.accumulated_number_liters ?? '',
          accumulated_supply_value: v.accumulated_supply_value ?? '',
          vehicle_owner: v.vehicle_owner?.id ?? v.vehicle_owner ?? null,
          image: null,
          notes: v.notes ?? ''
        };
        setForm(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar veículo para edição:', err);
        setError(err);
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') return setForm(prev => ({ ...prev, [name]: files?.[0] || null }));
    let newValue = value;
    if (name === 'vehicle_owner') {
      newValue = value === '' ? '' : Number(value);
    }
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare payload: convert numeric fields and empty strings to nulls where appropriate
    const payload = {
      ...form,
      vehicle_type: form.vehicle_type === '' ? null : Number(form.vehicle_type),
      fuel_type: form.fuel_type === '' ? null : Number(form.fuel_type),
      year_model: form.year_model || null,
      year_manufacture: form.year_manufacture || null,
      color_code: form.color_code === '' ? null : Number(form.color_code),
      odometer_acquisition: form.odometer_acquisition === '' ? null : Number(form.odometer_acquisition),
      doors: form.doors === '' ? null : Number(form.doors),
      capacity: form.capacity === '' ? null : Number(form.capacity),
      power: form.power === '' ? null : Number(form.power),
      estimated_value: form.estimated_value === '' ? null : Number(form.estimated_value),
      full_capacity: form.full_capacity === '' ? null : Number(form.full_capacity),
      avg_consumption: form.avg_consumption === '' ? null : Number(form.avg_consumption),
      avg_cost_litre: form.avg_cost_litre === '' ? null : Number(form.avg_cost_litre),
      odometer: form.odometer === '' ? null : Number(form.odometer),
      last_supply_reason_type: form.last_supply_reason_type === '' ? null : Number(form.last_supply_reason_type),
      accumulated_number_liters: form.accumulated_number_liters === '' ? null : Number(form.accumulated_number_liters),
      accumulated_supply_value: form.accumulated_supply_value === '' ? null : Number(form.accumulated_supply_value),
      dt_acquisition: form.dt_acquisition || null,
      dt_sale: form.dt_sale || null,
      dt_odometer: form.dt_odometer || null,
      dt_last_fueling: form.dt_last_fueling || null,
      vehicle_owner: (form.vehicle_owner === '' || form.vehicle_owner == null) ? null : { id: Number(form.vehicle_owner) },
      image: form.image || null,
    };

    // If image file provided, send multipart/form-data
    if (form.image instanceof File) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (typeof v === 'object' && !(v instanceof File)) fd.append(k, JSON.stringify(v));
        else fd.append(k, String(v));
      });
      fd.append('image', form.image);

      const req = isEdit
        ? api.put(`/vehicles/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        : api.post('/vehicles', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

      req
        .then(() => { setLoading(false); navigate('/'); })
        .catch(err => { setLoading(false); setError(err.response?.data || err.message || (isEdit ? 'Erro ao atualizar veículo' : 'Erro ao criar veículo')); });
    } else {
      const req = isEdit
        ? api.put(`/vehicles/${id}`, payload)
        : api.post('/vehicles', payload);

      req
        .then(() => { setLoading(false); navigate('/'); })
        .catch(err => { setLoading(false); setError(err.response?.data || err.message || (isEdit ? 'Erro ao atualizar veículo' : 'Erro ao criar veículo')); });
    }
  };

  

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Editar Veículo' : 'Novo Veículo'}</h2>

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
          <label className="block text-sm font-medium text-gray-700">Nome Curto</label>
          <input name="short_name" value={form.short_name} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <input name="brand" value={form.brand} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <input name="model" value={form.model} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <input name="vehicle_type" value={form.vehicle_type} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Combustível (ID)</label>
          <input name="fuel_type" value={form.fuel_type} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ano do Modelo</label>
          <input name="year_model" value={form.year_model} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ano Fabricação</label>
          <input name="year_manufacture" value={form.year_manufacture} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Placa</label>
          <input name="license_plate" value={form.license_plate} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cor</label>
          <input name="color" value={form.color} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Código da Cor</label>
          <input name="color_code" value={form.color_code} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">VIN</label>
          <input name="vin" value={form.vin} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número da Licença</label>
          <input name="licence_number" value={form.licence_number} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input name="state" value={form.state} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input name="city" value={form.city} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Aquisição</label>
          <input type="date" name="dt_acquisition" value={form.dt_acquisition} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Odômetro na Aquisição</label>
          <input type="number" name="odometer_acquisition" value={form.odometer_acquisition} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Venda</label>
          <input type="date" name="dt_sale" value={form.dt_sale} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portas</label>
          <input type="number" name="doors" value={form.doors} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacidade</label>
          <input type="number" name="capacity" value={form.capacity} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Potência</label>
          <input type="number" name="power" value={form.power} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor Estimado</label>
          <input type="number" step="0.01" name="estimated_value" value={form.estimated_value} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacidade Total</label>
          <input type="number" name="full_capacity" value={form.full_capacity} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Consumo Médio</label>
          <input type="number" step="0.01" name="avg_consumption" value={form.avg_consumption} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Custo Médio por Litro</label>
          <input type="number" step="0.01" name="avg_cost_litre" value={form.avg_cost_litre} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data Odômetro</label>
          <input type="date" name="dt_odometer" value={form.dt_odometer} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Odômetro</label>
          <input type="number" name="odometer" value={form.odometer} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data Último Abastecimento</label>
          <input type="date" name="dt_last_fueling" value={form.dt_last_fueling} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo Último Abastecimento (ID)</label>
          <input type="number" name="last_supply_reason_type" value={form.last_supply_reason_type} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Litros Acumulados</label>
          <input type="number" step="0.01" name="accumulated_number_liters" value={form.accumulated_number_liters} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor Abastecido Acumulado</label>
          <input type="number" step="0.01" name="accumulated_supply_value" value={form.accumulated_supply_value} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Proprietário</label>
          {options.persons ? (
            <select name="vehicle_owner" value={form.vehicle_owner ?? ''} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="">-- selecione --</option>
              {options.persons.map(p => (
                <option key={p.id ?? p.code ?? String(p)} value={p.id ?? (p.code ? Number(p.code) : '')}>
                  {p.name || p.full_name || `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() || String(p)}
                </option>
              ))}
            </select>
          ) : (
            <input name="vehicle_owner" value={form.vehicle_owner || ''} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Imagem</label>
          <input type="file" name="image" onChange={handleChange} className="mt-1 block w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" rows={3} />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-android-blue text-white rounded">{loading ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </form>
    </div>
  );
}
