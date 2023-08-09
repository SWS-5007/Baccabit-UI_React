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

        <span className="signin-titleword">Baccabit</span>
      </div>

      <p className="singin-betbwbword">
        Bet Bigger with <span style={{ color: "#FFB30E" }}>Baccabit.</span>
      </p>

      {/* <img
        src={process.env.PUBLIC_URL + "/assets/Bet-bigger-with-Baccabit.png"}
        width={200}
        alt="Bet bigger with Baccabit"
      /> */}

      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#090F10",
          color: "white",
          border: "5px solid #090D0E",
          borderRadius: "20px",
          fontSize: "12px",
          fontFamily: "Eight_Bit_Dragon",
          padding: "0px 20px",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/metamask.png"}
          width={20}
          alt="metamask icon"
        />
        Sign in with Metamask
      </button>

      <button
        onClick={() => navigateToBaccarat()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#090F10",
          color: "white",
          border: "5px solid #090D0E",
          borderRadius: "20px",
          fontFamily: "Eight_Bit_Dragon",
          fontSize: "12px",
          padding: "0px 20px",
        }}
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
