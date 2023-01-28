import React, { useEffect, useState } from "react";
import styles from "../styles/Question.module.css";

function IndividualHistoricalQuestion({ question, color }) {
  const [clickedReveal, setClickedReveal] = useState(false);
  const [colorChoice, setColorChoice] = useState();

  // Handling clicking of historical option
  function handleClick(e) {
    e.preventDefault();
    setClickedReveal(true);
  }

  useEffect(() => {
    setColorChoice(color);
  }, []);

  return (
      <div className={`${styles.dailyContainer} ${styles[colorChoice]}`}>
        <h1>
          <div className={styles.question}>{question.question}</div>
        </h1>
        <div className={styles.dailyOption}>
          <div>
            <h3
              className={`${styles.option} noselect`}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {question.option0}
            </h3>
            {clickedReveal ? (
              <div className={styles.revealResult}>
                <div>{question.result}%</div>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div>
            <h3
              className={`${styles.option} noselect`}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {question.option1}
            </h3>
            {clickedReveal ? (
              <div className={styles.revealResult}>
                <div>{100 - question.result}%</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        {clickedReveal ? (
          <div />
        ) : (
          <div className={styles.subtext}>
            Vote to reveal how you would have fared
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
      </div>
  );
}

export default IndividualHistoricalQuestion;
