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
        setEventos(data);
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
      <h2>Eventos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Equipo</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Nombre</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Tipo</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Fecha</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Hora fin</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Lugar</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Asistentes</th>
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

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.endtime ? new Date(e.endtime).toLocaleTimeString() : "-"}
        </td>

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.place || "No especificado"}
        </td>

        <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
          {e.attendees_count}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Eventos;
