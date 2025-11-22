import { useState, useEffect } from "react";
import "../App.css";

const ITEMS_PER_PAGE = 8; // ajusta según tu diseño

function Eventos() {
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

        const eventosHoy = data
          .filter((e) => {
            const fechaEvento = new Date(e.starttime);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() === hoy.getTime();
          })
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

  // 🔁 Cambio de página automático cada 10 segundos
  useEffect(() => {
    const totalPaginas = Math.ceil(eventos.length / ITEMS_PER_PAGE);

    if (totalPaginas <= 1) return;

    const interval = setInterval(() => {
      setPagina(prev => (prev + 1) % totalPaginas);
    }, 20000);

    return () => clearInterval(interval);
  }, [eventos]);

  if (loading) return <p>Cargando eventos...</p>;

  // Eventos visibles según página
  const inicio = pagina * ITEMS_PER_PAGE;
  const eventosPaginados = eventos.slice(inicio, inicio + ITEMS_PER_PAGE);

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
          {eventosPaginados.map((e) => (
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

      <div className="pagination-indicator">
        Página {pagina + 1} / {Math.max(1, Math.ceil(eventos.length / ITEMS_PER_PAGE))}
      </div>
    </div>
  );
}

export default Eventos;
