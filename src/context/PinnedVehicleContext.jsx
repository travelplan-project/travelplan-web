import React, { createContext, useContext, useState, useEffect } from 'react';

const PinnedVehicleContext = createContext(null);

export function PinnedVehicleProvider({ children }) {
  const [pinnedId, setPinnedId] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pinnedVehicleId');
      if (stored) setPinnedId(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const setPinnedVehicleId = (id) => {
    try {
      if (id == null) {
        localStorage.removeItem('pinnedVehicleId');
        setPinnedId(null);
        window.dispatchEvent(new CustomEvent('vehiclePinned', { detail: { id: null } }));
      } else {
        localStorage.setItem('pinnedVehicleId', String(id));
        setPinnedId(String(id));
        window.dispatchEvent(new CustomEvent('vehiclePinned', { detail: { id } }));
      }
    } catch (e) {
      console.error('PinnedVehicleContext error:', e);
      setPinnedId(id == null ? null : String(id));
    }
  };

  return (
    <PinnedVehicleContext.Provider value={{ pinnedId, setPinnedVehicleId }}>
      {children}
    </PinnedVehicleContext.Provider>
  );
}

export function usePinnedVehicle() {
  const ctx = useContext(PinnedVehicleContext);
  if (!ctx) throw new Error('usePinnedVehicle must be used within PinnedVehicleProvider');
  return ctx;
}
