// import logo from "./logo.svg";
// import "./App.css";
// import Analytics from "./components/Analytics";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddressPopup from "./components/AddressPopup";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Analytics />} />
//           <Route path="/AddressPopup" element={<AddressPopup />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddressProvider } from "./components/AddressContext";
import Analytics from "./components/Analytics";
import AddressPopup from "./components/AddressPopup";

function App() {
  return (
    <AddressProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/AddressPopup" element={<AddressPopup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AddressProvider>
  );
}

export default App;
