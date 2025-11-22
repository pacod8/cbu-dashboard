import React from "react";
// en App.jsx o en index.js según tu proyecto

/**
 * Importa todas las imágenes de la carpeta /src/assets/sponsors
 * Ajusta la ruta si tu carpeta es distinta.
 */
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context("../assets/sponsors", false, /\.(png|jpe?g|svg)$/));

export default function Sponsors({ duration = 20, height = 50 }) {
  // duplicamos la lista para crear la pista "doble"
  const doubled = [...images, ...images,...images];

  return (
    <div
      className="marquee-wrapper"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((src, i) => (
          <div className="marquee-item" key={i}>
            <img src={src} alt={`logo-${i}`} draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}
