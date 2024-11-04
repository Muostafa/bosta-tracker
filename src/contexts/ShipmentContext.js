import React, { createContext, useContext, useState, useEffect } from "react";

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [color, setColor] = useState();
  const [language, setLanguage] = useState("en");
  let { id } = useParams();
  const [shipmentData, setShipmentData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcheShipment = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tracking.bosta.co/shipments/track/${id}`
        );

        const data = await response.json();
        setShipmentData(data); // Set the shipmentData to a single-item array for the new fetch
      } catch (error) {
        console.error(
          "Error fetching shipment data for single tracking number:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetcheShipment();
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  return (
    <ShipmentContext.Provider value={{ toggleLanguage, language }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => {
  return useContext(ShipmentContext);
};
