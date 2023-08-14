import React from "react";

import doller from "../../../assets/wallet-dollar-old.png";
import bicon from "../../../assets/b-icon.png";
import ticon from "../../../assets/t-icon.png";
import picon from "../../../assets/p-icon.png";

import "./styles.css";

const Wallet = (props) => {
  return (
    <div className="wallet">
      <div className="wallet-wrapper">
        <div className="recent-stats">
          <div className="recent-stats-bg">
            <div className="recent-stats-grid">
              <span className="banker-label">
                <img src={bicon} alt="" />
              </span>
              <span className="player-label">
                <img src={picon} alt="" />
              </span>
              <span className="banker-label">
                <img src={bicon} alt="" />
              </span>
              <span className="tie-label">
                <img src={ticon} alt="" />
              </span>
              <span className="banker-label">
                <img src={bicon} alt="" />
              </span>
              <span className="player-label">
                <img src={picon} alt="" />
              </span>
              <span className="tie-label">
                <img src={ticon} alt="" />
              </span>
              <span className="banker-label">
                <img src={bicon} alt="" />
              </span>
            </div>
          </div>
        </div>

        <div className="wallet-grid">
          <div className="wallet-doller">
            <img src={doller} alt="" />
          </div>
          <div className="wallet-bet">
            <h4>BALANCE</h4>
            <span>{props.playerOverAllbalance}</span>
          </div>
          <div className="wallet-bet">
            <h4>TOTAL BET</h4>
            <span>{props.totalbet}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
