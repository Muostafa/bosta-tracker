import React, { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [color, setColor] = useState();
  let { id } = useParams();
  const [shipmentData, setShipmentData] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchShipment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://tracking.bosta.co/shipments/track/${id}`
      );

      const data = await response.json();
      setShipmentData(data);
    } catch (error) {
      console.error(
        "Error fetching shipment data for single tracking number:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShipmentContext.Provider
      value={{ color, shipmentData, loading, setColor, fetchShipment, id }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => {
  return useContext(ShipmentContext);
};
