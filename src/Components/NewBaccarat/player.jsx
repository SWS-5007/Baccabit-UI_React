import React from "react";

import playerText from "../../assets/player.png";
import hidden from "../../assets/cards/hidden.png";

export const Player = () => {
  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="player-text">
          <img src={playerText} alt="" />
        </div>

        <div className="player-cards">
          <div className="player-cards-placeholder">
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
          </div>
          <div id="playerfirstCard"></div>
          <div id="playersecondCard"></div>
          <div id="playerthirdCard"></div>
        </div>
      </div>
    </div>
  );
};
