import Sponsors from "./Components/Sponsors";
import Eventos from "./Components/Eventos";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Área principal: dos columnas (izquierda = tabla, derecha = contenido) */}
      <div className="content">
        <div className="left-column">
          <Eventos />
        </div>

        <div className="right-column">
          {/* Aquí pondrás lo que quieras más adelante */}
        </div>
      </div>

      {/* Tira de sponsors en la parte inferior, siempre visible */}
      <div className="sponsors-strip">
        <Sponsors />
      </div>
    </div>
  );
}

export default App;
