import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import styles from "../styles/shipmentStatusProgressBar.module.css";
import { FaCheckCircle } from "react-icons/fa";

function ShipmentStatusProgressBar({ color, status }) {
  const { translate, language } = useTranslation();

  const colors = {
    green: "#00AD21",
    yellow: "#FFB12B",
    red: "#FF071B",
  };

  const statusSteps = [
    translate("created"),
    translate("received"),
    translate("out_for_delivery"),
    translate("delivered"),
  ];

  return (
    <div className={styles.container}>
      <div
        className={styles.shipmentStatus}
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        {[...Array(statusSteps.length - 1)].map((step, index) => (
          <div
            key={index}
            style={{ color: index <= status ? color : "" }}
            className={`statusStep ${index <= status ? color : ""}`}
          ></div>
        ))}
      </div>
      <div
        className={styles.test}
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        {statusSteps.map((step, index) => (
          <div key={index}>
            <div
              className={styles.check}
              style={{ color: index <= status + 1 ? colors[color] : "#C8C8C8" }}
            >
              <FaCheckCircle />
            </div>
          </div>
        ))}
      </div>
      <div
        className={styles.test}
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        {statusSteps.map((step, index) => (
          <div key={index}>
            <div
              className={styles.stepName}
              style={{ color: index <= status + 1 ? "black" : "#C8C8C8" }}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShipmentStatusProgressBar;
