import { useState, useEffect } from "react";
import '../App.css'
function Partidos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await fetch("https://cbu-dashboard.pacodominguezg.workers.dev/");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
  
        const data = await res.json();
  
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
  
        const dentroDe7Dias = new Date();
        dentroDe7Dias.setDate(hoy.getDate() + 7);
        dentroDe7Dias.setHours(23, 59, 59, 999);
  
        const eventosProximos = data
          // Solo partidos
          .filter(e => e.event_type?.toLowerCase() === "partido")
  
          // Entre hoy y +7 días
          .filter(e => {
            const fechaEvento = new Date(e.starttime);
            return fechaEvento >= hoy && fechaEvento <= dentroDe7Dias;
          })
  
          // Ordenarlos por fecha y hora
          .sort((a, b) => new Date(a.starttime) - new Date(b.starttime));
  
        setEventos(eventosProximos);
  
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
      <h2>Partidos de la semana</h2>
  
      <table className="eventos-table">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Partido</th>
            <th>Hora</th>
            <th>Lugar</th>
          </tr>
        </thead>
  
        <tbody>
          {eventos.map((e) => (
            <tr key={e.event_id}>
              <td>{e.team_name}</td>
              <td>{e.name}</td>
              <td>
  {new Date(e.starttime).toLocaleString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })}
</td>

                <td>{e.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default Partidos;
