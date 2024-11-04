import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import styles from "../styles/shipmentDetails.module.css";
function ShipmentDetails({ shipmentData, color }) {
  const { language, translate } = useTranslation();

  const details = shipmentData?.TransitEvents;

  function formatDate(isoString) {
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

  function formatTime(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };

    if (language === "ar") return date.toLocaleTimeString("ar-EG", options);
    return date.toLocaleTimeString("en-US", options);
  }
  return (
    <div
      className={styles.container}
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      <table className={styles.shipmentDetails}>
        <thead>
          <tr>
            <th>{translate("branch")}</th>
            <th>{translate("time")}</th>
            <th>{translate("date")}</th>
            <th>{translate("details")}</th>
          </tr>
        </thead>
        <tbody>
          {details &&
            details.map((detail, index) => (
              <tr key={index}>
                <td>{translate(detail.hub)}</td>
                <td>{formatTime(detail.timestamp)}</td>
                <td>{formatDate(detail.timestamp)}</td>
                <td>{translate(detail.state)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentDetails;
