import React from "react";
import { TranslationProvider } from "./contexts/TranslationContext";
import { ShipmentProvider } from "./contexts/ShipmentContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import IdSearch from "./components/IdSearch";
import Tracker from "./components/Tracker";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <TranslationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<IdSearch />} />
            <Route
              path="/:id"
              element={
                <ShipmentProvider>
                  <Tracker />
                </ShipmentProvider>
              }
            />
          </Routes>
        </Router>
      </TranslationProvider>
    </div>
  );
};

export default App;
