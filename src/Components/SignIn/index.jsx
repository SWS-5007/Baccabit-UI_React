import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [datas, setDatas] = useState([]);

  const navigateToBaccarat = () => {
    const navigate = useNavigate();
    navigate("/baccarat");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        height: "100vh",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/home-logo.png"}
        width={400}
        alt="Home Logo"
      />

      <img
        src={process.env.PUBLIC_URL + "/assets/Bet-bigger-with-Baccabit.png"}
        width={150}
        alt="Bet bigger with Baccabit"
      />

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
