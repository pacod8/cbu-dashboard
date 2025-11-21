import { useEffect, useState } from "react";
import logo from "../assets/escudo.jpeg";

function Header() {
  const [weather, setWeather] = useState(null);
  const [now, setNow] = useState(new Date());
  const lat = 37.1856;   // coordenadas de Utrera
  const lon = -5.7809;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error cargando tiempo:", err);
      }
    }
    fetchWeather();
  }, []);

  const fecha = now.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const hora = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  function getRainEmoji(precip) {
    if (precip === 0) return "☀️";  // sin lluvia
    if (precip < 1) return "🌦️";     // lluvia ligera
    return "🌧️";                     // lluvia más fuerte
  }

  return (
    <div className="header-bar">
      <div className="header-left">
        <img src={logo} alt="Escudo" className="club-logo" />
        <h1>Club Baloncesto Utrera</h1>
      </div>

      <div className="header-right">
        <div className="header-time">
          <span>{fecha} </span>
          <span>{hora}</span>
        </div>

        {weather && (
          <div className="header-weather">
            { /* Obtenemos la precipitación de la hora actual */ }
            {weather.hourly && (
              <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                {getRainEmoji(weather.hourly.precipitation[0])}
              </span>
            )}
            <span>{weather.current_weather.temperature}°C   </span>
            <span>{weather.current_weather.windspeed}km/h</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
