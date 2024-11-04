import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useShipment } from "../contexts/ShipmentContext";
import styles from "../styles/shipmentDetails.module.css";
import Accordion from "./Accordion";
const colors = {
  green: "#00AD21",
  yellow: "#FFB12B",
  red: "#FF071B",
};
function ShipmentDetails() {
  const { language, translate } = useTranslation();
  const { shipmentData, color } = useShipment();
  const details = shipmentData?.TransitEvents;

  let detail = "";
  if (details)
    detail = details.map((x, index) => (
      <Accordion
        key={index}
        state={x.state}
        time={x.timestamp}
        reason={x.reason}
        hub={x.hub}
      />
    ));

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
      <h3>{translate("Shipment Details")}</h3>
      <div className={styles.box}>
        <div className={styles.screen}>
          <table className={styles.shipmentDetails}>
            <thead>
              <tr>
                <th>{translate("branch")}</th>
                <th className={styles.screen}>{translate("date")}</th>
                <th className={styles.screen}>{translate("time")}</th>
                <th>{translate("details")}</th>
              </tr>
            </thead>
            <tbody>
              {details &&
                details.map((detail, index) => (
                  <tr key={index}>
                    <td>{translate(detail.hub)}</td>
                    <td className={styles.screen}>
                      {formatDate(detail.timestamp)}
                    </td>
                    <td className={styles.screen}>
                      {formatTime(detail.timestamp)}
                    </td>
                    <td style={{ width: "3%" }}>
                      <div className={styles.reason}>
                        <div>{translate(detail.state)}</div>
                        {detail.reason && (
                          <div style={{ color: colors[color] }}>
                            {translate(detail.reason)}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.mobile}>{detail}</div>
      </div>
    </div>
  );
}

export default ShipmentDetails;
