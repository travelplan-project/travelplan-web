import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [resumo, setResumo] = useState([]);

  useEffect(() => {
    // Busca o DTO que criamos no repositório
    api.get('/achievements/resume')
      .then(response => setResumo(response.data))
      .catch(err => console.error("Erro na API: ", err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Dashboard TravelPlan</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {resumo.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{item.state} - {item.country}</h3>
            <p>Conquistas: {item.vl_conquered} / {item.vl_total}</p>
            <div style={{ background: '#eee', height: '10px', borderRadius: '5px' }}>
              <div style={{ 
                background: 'green', 
                width: `${item.perc_conquered}%`, 
                height: '100%', 
                borderRadius: '5px' 
              }}></div>
            </div>
            <span>{item.perc_conquered.toFixed(1)}% Completo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;