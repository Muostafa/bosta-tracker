import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import styles from "../styles/accordion.module.css";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "../contexts/TranslationContext";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  ".MuiAccordionSummary-expandIconWrapper": { transform: "rotate(90deg)" },
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(1),
  },
}));

function Accordion({ state, reason, hub, time }) {
  const [expanded, setExpanded] = useState(false);
  const { translate, language } = useTranslation();
  function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    if (language === "ar") return date.toLocaleDateString("ar-EG", options);
    return date.toLocaleDateString("en-US", options);
  }
  const handleChange = (panel) => (event, newExpanded) => {
    if (newExpanded) setExpanded((expanded) => !expanded);
    else setExpanded(false);
  };

  return (
    <MuiAccordion
      className={styles.accordion}
      disableGutters
      elevation={0}
      square
      expanded={expanded}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        className={styles.summary}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <h3 className={styles.title}>{translate(state)}</h3>
      </AccordionSummary>
      <MuiAccordionDetails className={styles.infoContainer}>
        <div>
          {hub && <div>{translate(hub)}</div>}
          <div>{formatDate(time)}</div>
          {reason && <div>{translate(reason)}</div>}
        </div>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}

export default Accordion;
