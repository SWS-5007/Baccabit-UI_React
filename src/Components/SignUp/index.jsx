import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Countdown from "react-countdown";

import Form from "react-bootstrap/Form";

import "./styles.css";

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <div className="countdown-wrapper">
        <div>
          <span style={{ fontSize: "25px" }}>{days}</span>
          <span>DAYS</span>
        </div>
        <div>
          <span style={{ fontSize: "25px" }}>{hours}</span>
          <span>HOURS</span>
        </div>
        <div>
          <span style={{ fontSize: "25px" }}>{minutes}</span>
          <span>MINS</span>
        </div>
        <div>
          <span style={{ fontSize: "25px" }}>{seconds}</span>
          <span>SECONDS</span>
        </div>
      </div>
    );
  }
};

export const SignUpComponent = () => {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getFullYear(), 7, 20);

  return (
    <div className="signup-wrapper">
      <div className="signup-view">
        <Countdown date={targetDate} renderer={renderer} />

        <p style={{ marginTop: "40px", textAlign: "center" }}>
          💥 Exclusive first access to our new online baccarat game. Don't miss
          your spot!
        </p>

        <div className="signup-input-divs">
          <Form.Control
            id="firstName"
            aria-describedby="passwordHelpBlock"
            placeholder="First Name"
            className="signup-form"
          />

          <Form.Control
            id="email"
            aria-describedby="passwordHelpBlock"
            placeholder="Email"
            className="signup-form"
          />

          <Form.Control
            type="number"
            id="phoneNumber"
            aria-describedby="passwordHelpBlock"
            placeholder="Phone Number"
            className="signup-form"
          />
        </div>

        <Button variant="dark" className="signup-btn">
          SIGN UP NOW
        </Button>
      </div>
    </div>
  );
};
