import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

export const SignIn = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  const navigateToBaccarat = () => {
    navigate("/baccarat");
  };

  return (
    <div
      className="signin-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <img
          src={process.env.PUBLIC_URL + "/assets/coin_logo.png"}
          alt="coin_logo Logo"
          width={70}
        />

        <span className="signin-titleword robotoFF">Baccabit</span>
      </div>

      <p className="singin-betbwbword robotoFF">
        Bet Bigger with <span style={{ color: "#FFB30E" }}>Baccabit.</span>
      </p>

      <button className="signin-mmbutton robotoFF">
        <img
          src={process.env.PUBLIC_URL + "/assets/metamask.png"}
          width={20}
          alt="metamask icon"
        />
        Sign in with Metamask
      </button>

      <button
        className="signin-glbutton robotoFF"
        onClick={() => navigateToBaccarat()}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/google.png"}
          width={20}
          alt="google icon"
        />
        Sign in with Gmail
      </button>
    </div>
  );
};
