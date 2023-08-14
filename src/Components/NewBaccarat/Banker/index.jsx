import React from "react";

import bankerText from "../../../assets/banker.png";
import hidden from "../../../assets/cards/hidden.png";

import "./styles.css";

const Banker = () => {
  return (
    <div className="banker">
      <div className="banker-wrapper">
        <div className="player-text">
          <img src={bankerText} alt="" />
        </div>
        <div className="banker-cards" id="bankerHand">
          <div className="banker-cards-placeholder">
            <div id="bankerfirstCard">
              <img src={hidden} alt="" />
            </div>
            <div id="bankersecondCard">
              <img src={hidden} alt="" />
            </div>
            <div id="bankerthirdCard">
              <img src={hidden} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banker;
