import { useState, useEffect } from "react";
import '../App.css'
function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await fetch("https://cbu-dashboard.pacodominguezg.workers.dev/");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        
        const data = await res.json();
  
        // ---- FILTRAR EVENTOS DE HOY ----
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
  
        const eventosHoy = data.filter((e) => {
          const fechaEvento = new Date(e.starttime);
          fechaEvento.setHours(0, 0, 0, 0);
          return fechaEvento.getTime() === hoy.getTime();
        })
                // Ordenar por hora (de más temprano a más tarde)
                .sort((a, b) => new Date(a.starttime) - new Date(b.starttime));
  
        setEventos(eventosHoy);
  
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchEventos();
  }, []);
  

  if (loading) return <p>Cargando eventos...</p>;

  return (
    <div className="eventos-box">
      <h2>Eventos de hoy</h2>
  
      <table className="eventos-table">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Hora</th>
          </tr>
        </thead>
  
        <tbody>
          {eventos.map((e) => (
            <tr key={e.event_id}>
              <td>{e.team_name}</td>
              <td>{e.name}</td>
              <td>{e.event_type}</td>
              <td>
                {new Date(e.starttime).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default Eventos;
