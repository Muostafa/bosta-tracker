import React, { useEffect, useState } from "react";
import ShipmentDetails from "./ShipmentDetails";
import ShipmentStatus from "./ShipmentStatus";
import { useParams } from "react-router-dom";

export default function Tracker() {
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

  if (shipmentData.error && shipmentData.error === "Invalid tracking number!")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        Invalid tracking number!
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="main">
          <ShipmentStatus shipmentData={shipmentData} />
          <ShipmentDetails shipmentData={shipmentData} />
        </div>
      )}
    </div>
  );
}
