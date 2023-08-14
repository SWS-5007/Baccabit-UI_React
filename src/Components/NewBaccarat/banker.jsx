import React from "react";

import bankerText from "../../assets/banker.png";
import hidden from "../../assets/cards/hidden.png";

export const Banker = () => {
  return (
    <div className="banker">
      <div className="banker-wrapper">
        <div className="player-text">
          <img src={bankerText} alt="" />
        </div>
        <div className="banker-cards" id="bankerHand">
          <div className="player-cards-placeholder">
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
          </div>
          <div id="bankerfirstCard"></div>
          <div id="bankersecondCard"></div>
          <div id="bankerthirdCard"></div>
        </div>
      </div>
    </div>
  );
};
