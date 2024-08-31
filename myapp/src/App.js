import logo from "./logo.svg";
import "./App.css";
import Analytics from "./components/Analytics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddressPopup from "./components/AddressPopup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/AddressPopup" element={<AddressPopup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
