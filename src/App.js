import Sponsors from "./Components/Sponsors";
import Eventos from "./Components/Eventos";
import Header from "./Components/Header";
import Partidos from "./Components/Partidos";
import PantallaSportmember from "./Components/PantallaSportmember";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <div className="layout">
        <div className="left-column">
          <Eventos />
          <Partidos />
        </div>

        <div className="right-column">
          <PantallaSportmember />
        </div>
      </div>

      <Sponsors />
    </>
  );
}

export default App;
