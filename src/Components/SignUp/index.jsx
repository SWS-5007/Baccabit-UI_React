import React, { useState, useEffect, useCallback } from "react";
import Countdown from "react-countdown";

import "./styles.css";

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <span>
        {days} {hours} {minutes} {seconds}
      </span>
    );
  }
};

export const SignUpComponent = () => {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getFullYear(), 7, 20);

  return (
    <div className="signup-wrapper">
      <Countdown date={targetDate} renderer={renderer} />
    </div>
  );
};
