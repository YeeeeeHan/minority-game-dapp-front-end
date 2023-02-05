import React, { useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
import { useWeb3React } from "@web3-react/core";
import Router from "next/router";
import { toast } from "react-toastify";

function Option({ submitVote, optionTitle, value }) {
  const { active } = useWeb3React();

  // Handling voting function
  async function handleClick(e) {
    if (!active) {
      await Router.push("/connectwallet");
      toast.info("Please connect a wallet before voting");
      return;
    }
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
