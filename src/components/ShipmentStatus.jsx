import React, { useEffect, useState } from "react";
import styles from "../styles/shipmentStatus.module.css";
import ShipmentStatusProgressBar from "./ShipmentStatusProgressBar";
import { useTranslation } from "../contexts/TranslationContext";
import { useShipment } from "../contexts/ShipmentContext";
function ShipmentStatus() {
  const { shipmentData, color, setColor, id } = useShipment();
  const [state, setState] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [promisedDate, setPromisedDate] = useState("");
  const [status, setStatus] = useState(0);

  const { language, translate } = useTranslation();
  const colors = {
    green: "#00AD21",
    yellow: "#FFB12B",
    red: "#FF071B",
  };

  function formatTimestamp(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    if (language === "ar") return date.toLocaleDateString("ar-EG", options);
    return date.toLocaleDateString("en-US", options);
  }

  function formatTimestampDateOnly(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    if (language === "ar") return date.toLocaleDateString("ar-EG", options);
    return date.toLocaleDateString("en-US", options);
  }

  function getColor(x) {
    if (!x) return "yellow";
    switch (x.toUpperCase()) {
      case "DELIVERED":
        return "green";
      case "DELIVERED_TO_SENDER":
        return "yellow";
      case "CANCELLED":
        return "red";
      default:
        return "yellow";
    }
  }

  function getState(x) {
    if (!x) return "";
    switch (x.toUpperCase()) {
      case "DELIVERED":
        setStatus(2);
        return "The shipment has been delivered";
      case "DELIVERED_TO_SENDER":
        setStatus(1);
        return "The shipment is on its way";
      case "CANCELLED":
        setStatus(1);
        return "The shipment has been cancelled";
      default:
        return "yellow";
    }
  }

  useEffect(() => {
    setColor(getColor(shipmentData?.CurrentStatus?.state));
    setState(getState(shipmentData?.CurrentStatus?.state));
    setLastUpdated(formatTimestamp(shipmentData?.CurrentStatus?.timestamp));
    setPromisedDate(formatTimestampDateOnly(shipmentData?.PromisedDate));
  }, [shipmentData, language]);

  if (!id) {
    <div>provide id</div>;
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.details}
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        <div>
          <h4>
            {translate("Shipment number")} {id}
          </h4>
          <h3 className={styles.status} style={{ color: colors[color] }}>
            {translate(state)}
          </h3>
        </div>
        <div>
          <h4>{translate("Latest update")}</h4>
          <h3>{translate(lastUpdated)}</h3>
        </div>
        <div>
          <h4>{translate("Merchant name")}</h4>
          <h3>{translate(shipmentData?.provider)}</h3>
        </div>
        <div>
          <h4>{translate("Delivery time")}</h4>
          <h3>{translate(promisedDate)}</h3>
        </div>
      </div>
      <ShipmentStatusProgressBar status={status} color={color} />
    </div>
  );
}

export default ShipmentStatus;
