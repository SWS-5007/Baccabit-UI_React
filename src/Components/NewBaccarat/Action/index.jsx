import React from "react";

import coin5 from "../../../assets/coin-5.png";
import coin25 from "../../../assets/coin-25.png";
import coin100 from "../../../assets/coin-100.png";
import coin250 from "../../../assets/coin-250.png";
import coin500 from "../../../assets/coin-500.png";

import userplayer from "../../../assets/user-player.png";
import usertie from "../../../assets/user-tie.png";
import userbanker from "../../../assets/user-banker.png";

import "./styles.css";

const Action = (props) => {
  return (
    <div className="action">
      <div className="act-buttons-div">
        <div className={"deal-btn " + props.baccaratState.dealBtnShow}>
          <button type="button" onClick={props.deal}>
            Deal
          </button>
        </div>

        <div
          className={"deal-btn clear-bet " + props.baccaratState.clearBtnShow}
        >
          <button type="button" onClick={props.clearBet}>
            Clear Bet
          </button>
        </div>

        <div className={"deal-btn " + props.baccaratState.rebetBtnShow}>
          <button type="button" onClick={props.rebet}>
            Rebet
          </button>
        </div>
      </div>

      <div id="cardsLocation" className="cardsDiv">
        <div id="firstCard" className="cardHidden">
          <img
            src={"assets/cards/hidden.png"}
            className="img-responsive"
            role="presentation"
            height="144"
            style={{ width: "96px" }}
          />
        </div>

        <div id="secondCard" className="cardHidden">
          <img
            src={"assets/cards/hidden.png"}
            className="img-responsive"
            role="presentation"
            height="144"
            style={{ width: "96px" }}
          />
        </div>

        <div id="thirdCard" className="cardHidden">
          <img
            src={"assets/cards/hidden.png"}
            className="img-responsive"
            role="presentation"
            height="144"
            style={{ width: "96px" }}
          />
        </div>
      </div>

      <div className="action-wrapper">
        <div id="coins-container"></div>

        <div id="action-bg" className="action-bg">
          <button className="btn-1">
            <div className="single">
              <span>P PAIR</span>
              <span>11:1</span>
            </div>
          </button>

          <button
            className={"btn-2 " + props.baccaratState.playerWinner}
            onClick={() => props.handleSelectWager("player-coordinates")}
            style={{ background: props.baccaratState.playerWinner }}
          >
            <div className="stats">
              <span>$ 0.00</span>
              <span>
                <img src={userplayer} alt="" />{" "}
                {props.baccaratState.playerFinalScore}
              </span>
            </div>
            <p>PLAYER</p>
            <i id="playerDivPosition"></i>
            {props.baccaratState.playerWinner && <h3>Winner</h3>}
          </button>

          <button
            className={"btn-3 " + props.baccaratState.gameTied}
            onClick={() => props.handleSelectWager("tie-coordinates")}
            style={{ background: props.baccaratState.gameTied }}
          >
            <div className="stats">
              <span>$ 0.00</span>
              <span>
                <img src={usertie} alt="" /> 4
              </span>
            </div>
            <p>TIE 8:1</p>
            <i id="tieDivPosition"></i>
            {props.baccaratState.gameTied && <h3>Winner</h3>}
          </button>

          <button
            className={"btn-4 " + props.baccaratState.bankerWinner}
            onClick={() => props.handleSelectWager("banker-coordinates")}
            style={{ background: props.baccaratState.bankerWinner }}
          >
            <div className="stats">
              <span>$ 0.00</span>
              <span>
                {props.baccaratState.bankerFinalScore}{" "}
                <img src={userbanker} alt="" />
              </span>
            </div>
            <p>BANKER</p>
            <i id="bankerDivPosition"></i>
            {props.baccaratState.bankerWinner && <h3>Winner</h3>}
          </button>

          <button className="btn-5">
            <div className="single">
              <span>B PAIR</span>
              <span>11:1</span>
            </div>
          </button>
        </div>

        <div className="coins-bg">
          <div className="coins-grid">
            <button id="five" onClick={() => props.selectAmount("five")}>
              <img src={coin5} alt="" />
            </button>
            <button
              id="twenty-five"
              onClick={() => props.selectAmount("twenty-five")}
            >
              <img src={coin25} alt="" />
            </button>
            <button id="hundred" onClick={() => props.selectAmount("hundred")}>
              <img src={coin100} alt="" />
            </button>
            <button
              id="two-hundred-fifty"
              onClick={() => props.selectAmount("two-hundred-fifty")}
            >
              <img src={coin250} alt="" />
            </button>
            <button
              id="five-hundred"
              onClick={() => props.selectAmount("five-hundred")}
            >
              <img src={coin500} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;
