import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../contexts/TranslationContext";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/idSearch.module.css";

const IDForm = () => {
  const { translate } = useTranslation();
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim()) {
      navigate(`/${id}`);
    }
  };

  return (
    <div className={styles.idSearch}>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <div className={styles.labelHolder}>
            <label>{translate("Tracking ID")}</label>
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputField}
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <div onClick={handleSubmit} className={styles.submit}>
              <FaSearch
                style={{
                  backgroundColor: "#FF071B",
                  color: "white",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IDForm;
