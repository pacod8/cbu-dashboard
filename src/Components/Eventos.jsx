import { useState, useEffect } from "react";

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
        });
  
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
    <div>
      <h2>Eventos de hoy</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Equipo</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Nombre</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Tipo</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Fecha</th>
    </tr>
  </thead>

  <tbody>
    {eventos.map((e) => (
      <tr key={e.event_id}>
        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.team_name}
        </td>

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.name}
        </td>

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.event_type}
        </td>

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {new Date(e.starttime).toLocaleString()}
        </td>

      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Eventos;
