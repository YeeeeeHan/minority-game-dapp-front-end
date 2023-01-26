import React, { useState, useEffect } from "react";
import styles from "../styles/Clock.module.css"

function Clock(props) {
  let dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  let timeOptions = { hour: "numeric", minute: "numeric", second: "numeric" };
  timeOptions.timeZoneName = "short";
  const [time, setTime] = useState(
    new Date().toLocaleString("en-GB", timeOptions)
  );

  const [date, setDate] = useState(
    new Date().toLocaleString("en-GB", dateOptions).split("/").join(" . ")
  );

  function tick() {
    setTime(new Date().toLocaleString("en-GB", timeOptions));
    setDate(
      new Date().toLocaleString("en-GB", dateOptions).split("/").join(" . ")
    );
  }
  /*
  useEffect to set time every second
  */
  useEffect(() => {
    setInterval(() => tick(), 1000);
  });

  return (
    <div className={styles.AppClock}>
      {date} <br></br>
      {time}.
    </div>
  );
}

export default Clock;
