// src/App.js
import React from "react";
import { TranslationProvider } from "./contexts/TranslationContext";
import { ShipmentProvider } from "./contexts/ShipmentContext";
import ShipmentTracker from "./components/ShipmentTracker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Tracker from "./components/Tracker";
const App = () => {
  return (
    <div className="App">
      <TranslationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<>main</>} />
            <Route
              path="/:id"
              element={
                <ShipmentProvider>
                  <Tracker />
                </ShipmentProvider>
              }
            />
            <Route path="/tracking" element={<ShipmentTracker />} />
          </Routes>
        </Router>
      </TranslationProvider>
    </div>
  );
};

export default App;
