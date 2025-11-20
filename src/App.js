import Sponsors from "./Components/Sponsors";
// en App.jsx o en index.js según tu proyecto
import "./App.css";
import Eventos from "./Components/Eventos"


function App() {
  return (
<div className="calendarTable">
    <div>
      <Eventos/>
    </div>
    <div>
      <Sponsors />
    </div>
    </div>
  );
}

export default App;
