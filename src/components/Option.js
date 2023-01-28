import React, { useState, useEffect } from "react";
import styles from "../styles/Question.module.css"

function Option({ submitVote, optionTitle, value }) {
  // Handling voting function
  async function handleClick(e) {
    e.preventDefault();
    if (
      window.confirm(
        'Are you sure you want to vote for "' + optionTitle + '" for 0.01 ETH?'
      ) === false
    ) {
      return;
    }
    submitVote(value);
  }
  return (
    <div>
      <h3
        className={styles.option}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {optionTitle}
      </h3>
    </div>
  );
}

export default Option;
