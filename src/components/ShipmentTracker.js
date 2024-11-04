// src/components/ShipmentTracker.js
import React, { useEffect, useState } from "react";
import { useTranslation } from "../contexts/TranslationContext";

const ShipmentTracker = () => {
  const { translate, toggleLanguage } = useTranslation();
  const [shipmentData, setShipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackingNumbers = ["84043113", "3468570", "40106705"];

  useEffect(() => {
    const fetcheShipment = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tracking.bosta.co/shipments/track/${"84043113"}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data for tracking number ${"84043113"}`
          );
        }
        const data = await response.json();
        console.log(data);
        setShipmentData([data]); // Set the shipmentData to a single-item array for the new fetch
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
  return (
    <div className="shipment-tracker">
      <button onClick={toggleLanguage}>{translate("Switch Language")}</button>
      {loading ? (
        <p>{translate("Loading...")}</p>
      ) : (
        shipmentData.map((shipment, index) => (
          <div key={index} className="shipment">
            <h2>{translate("Shipment Details")}</h2>
            <p>
              {translate("Tracking Number")}: {shipment.TrackingNumber}
            </p>
            <p>
              {translate("Current Status")}:{" "}
              {translate(shipment.CurrentStatus.state)}
            </p>
            <p>
              {translate("Tracking URL")}:{" "}
              <a
                href={`https://${shipment.TrackingURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shipment.TrackingURL}
              </a>
            </p>
            <p>
              {translate("Support Phone Numbers")}:{" "}
              {shipment.SupportPhoneNumbers.join(", ")}
            </p>
            <h3>{translate("Transit Events")}</h3>
            {shipment.TransitEvents.map((event, eventIndex) => (
              <div key={eventIndex}>
                <p>
                  {translate(event.state)} -{" "}
                  {new Date(event.timestamp).toLocaleString()}
                </p>
                {event.hub && (
                  <p>
                    {translate("Hub")}: {event.hub}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ShipmentTracker;
