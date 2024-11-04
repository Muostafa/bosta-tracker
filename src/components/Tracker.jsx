import React, { useEffect } from "react";
import ShipmentDetails from "./ShipmentDetails";
import ShipmentStatus from "./ShipmentStatus";
import { useShipment } from "../contexts/ShipmentContext";

export default function Tracker() {
  const { shipmentData, loading, fetchShipment } = useShipment();

  useEffect(() => {
    fetchShipment();
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
          <ShipmentStatus />
          <ShipmentDetails />
        </div>
      )}
    </div>
  );
}
