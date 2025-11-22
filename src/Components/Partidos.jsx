import { useState, useEffect } from "react";
import "../App.css";

const ITEMS_PER_PAGE = 6; // ajusta según altura

function Partidos() {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(0);
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
          .filter(e => e.event_type?.toLowerCase() === "partido")
          .filter(e => {
            const fechaEvento = new Date(e.starttime);
            return fechaEvento >= hoy && fechaEvento <= dentroDe7Dias;
          })
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

  // Cambio automático cada 10 segundos
  useEffect(() => {
    const totalPaginas = Math.ceil(eventos.length / ITEMS_PER_PAGE);

    if (totalPaginas <= 1) return;

    const interval = setInterval(() => {
      setPagina(prev => (prev + 1) % totalPaginas);
    }, 20000);

    return () => clearInterval(interval);
  }, [eventos]);

  if (loading) return <p>Cargando partidos...</p>;

  const inicio = pagina * ITEMS_PER_PAGE;
  const partidosPagina = eventos.slice(inicio, inicio + ITEMS_PER_PAGE);

  return (
    <div className="eventos-box">
      <h2>Partidos de la semana</h2>

      <table className="eventos-table">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Partido</th>
            <th>Fecha</th>
            <th>Lugar</th>
          </tr>
        </thead>

        <tbody>
          {partidosPagina.map((e) => (
            <tr key={e.event_id}>
              <td>{e.team_name}</td>
              <td>{e.name}</td>
              <td>
                {new Date(e.starttime).toLocaleString("es-ES", {
                  weekday: "short",
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

      <div className="pagination-indicator">
        Página {pagina + 1} / {Math.max(1, Math.ceil(eventos.length / ITEMS_PER_PAGE))}
      </div>
    </div>
  );
}

export default Partidos;
