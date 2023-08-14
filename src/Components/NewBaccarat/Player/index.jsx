import React from "react";

import playerText from "../../../assets/player.png";
import hidden from "../../../assets/cards/hidden.png";

import "./styles.css";

const Player = () => {
  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="player-text">
          <img src={playerText} alt="" />
        </div>

        <div className="player-cards">
          <div className="player-cards-placeholder">
            <div id="playerfirstCard">
              <img src={hidden} alt="" />
            </div>
            <div id="playersecondCard">
              <img src={hidden} alt="" />
            </div>
            <div id="playerthirdCard">
              <img src={hidden} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
