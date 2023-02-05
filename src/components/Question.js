import React, { useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
function Question({ participants, content }) {
  return (
    <div>
      <div className={styles.question}>{content}</div>
      <div className={styles.subtext}>
        Number of votes casted: {participants}
      </div>
      <div className={styles.subtext}>
        Prize pool:{" "}
        {(
          participants *
          process.env.NEXT_PUBLIC_TICKET_PRICE_GWEI *
          0.000000001
        ).toFixed(2)}{" "}
        Eth
      </div>
    </div>
  );
}

export default Question;
