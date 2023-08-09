import React from "react"
// import card1 from "../../../public/assets/10.svg"
// import card2 from "../../../public/assets/back.svg"
import playerText from "../../../public/assets/player.png"
import hidden from "../../../public/assets/cards/hidden.png"

function Player() {
    return (
      <div className="player">
          <div className="player-wrapper">
            <div className="player-text"><img src={playerText} alt="" /></div>
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
  }
  
export default Player;