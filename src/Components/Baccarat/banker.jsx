import React from "react"
// import card1 from "../../../public/assets/Q.svg"
// import card2 from "../../../public/assets/back.svg"
import bankerText from "../../../public/assets/banker.png"
import hidden from "../../../public/assets/cards/hidden.png"

function Banker() {
    return (
      <div className="banker">
          <div className="banker-wrapper">
          <div className="player-text"><img src={bankerText} alt="" /></div>
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
  }
  
export default Banker;