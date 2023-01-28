import React, { useState, useEffect } from "react";
import styles from "../styles/Question.module.css"
function Question({ participants, content }) {
  return (
    <div>
      <div className={styles.question}>{content}</div>
      <div className={styles.subtext}>
        Number of votes casted: {participants}
      </div>
    </div>
  );
}

export default Question;
