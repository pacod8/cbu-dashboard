import Sponsors from "./Components/Sponsors";
import Eventos from "./Components/Eventos";
import Header from "./Components/Header";
import Partidos from "./Components/Partidos";
import "./App.css";

function App() {
  return (
  <>
      <Header />

      <div className="layout">
        <div className="left-column">
          <Eventos />
        </div>

        <div className="right-column">
          <Partidos/>
        </div>
      </div>

      <Sponsors />
    </>
  );
}

export default App;
