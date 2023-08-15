import React, { useState, useEffect } from "react";
import $ from "jquery";
import _ from "lodash";

import Action from "./Action";
import Banker from "./Banker";
import Chat from "./Chat";
import Player from "./Player";
import Wallet from "./Wallet";

import "./styles.css";

import { initialBaccaratState, cardOffsets } from "./Hooks/initialStates";
import {
  animate,
  getPos,
  getSelectAmount,
  shuffleDeck,
  selectWager,
  showAllCards,
  reset,
  shuffleCardsAndSetHands,
  openAllCards,
} from "./Hooks/actionHooks";

import { useGameRuleHooks } from "./Hooks/gameRuleHooks";

export const NewBaccaratComponent = () => {
  const [baccaratState, setBaccaratState] = useState(initialBaccaratState);
  const GameRuleHook = useGameRuleHooks();

  useEffect(() => {
    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      // Set your desired scaling and translation values here
      const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
      const scaleX = innerWidth / 1920;
      const scaleY = innerWidth / 1080;
      const translateX = (innerWidth - 1920 * scale) / 2;
      const translateY = (innerHeight - 1080 * scale) / 2;
      console.log("Calculating the Scale", scaleX, scaleY);

      setBaccaratState((prev) => ({
        ...prev,
        scale: scale,
        scaleX: scaleX,
        scaleY: scaleY,
        translateX: translateX,
        translateY: translateY,
      }));
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    openAllCards(baccaratState, setBaccaratState);
  }, [baccaratState.player, baccaratState.banker]);

  const handleSelectAmount = (type) => {
    const newType = getSelectAmount(type);
    setBaccaratState((prev) => ({
      ...prev,
      coinType: type,
      coinAmount: newType,
    }));
  };

  const deal = () => {
    setBaccaratState((prev) => ({
      ...prev,
      dealBtnShow: "hide",
      rebetBtnShow: "hide",
    }));

    for (var i = 0; i < 4; i++) {
      showAllCards(i, baccaratState);
    }

    setTimeout(() => {
      shuffleCardsAndSetHands(baccaratState, setBaccaratState);
    }, 600);
  };

  const clearBet = () => {
    var innerDiv = document.getElementById("coins-container");
    innerDiv.innerHTML = "";
  };

  const rebet = () => {
    $("#chip-container").html("");
    reset(setBaccaratState);
    deal();
  };

  const handleSelectWager = (wagerType) => {
    selectWager(wagerType, baccaratState, setBaccaratState);
  };

  return (
    <div className="newbaccarat-wrapper">
      <div
        id="newbaccarat"
        className="newbaccarat"
        style={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: `${`scale(${baccaratState.scale}) translate(-50%, -50%)`}`,
          transform: `${`scale(${baccaratState.scale})`}`,
          // transform: `${`scale(${baccaratState.scaleX}, ${baccaratState.scaleY})`}`,
        }}
      >
        <div className="newbaccarat-view">
          <div className="newbaccarat-deposit-withdraw-btn-wrapper">
            <button className="newbaccarat-deposit-btn">Deposit</button>
            <button className="newbaccarat-withdraw-btn">Withdraw</button>
          </div>

          <div id="chip-container"></div>
          <div className="newbaccarat-card-grid">
            <Player />
            <Banker />
          </div>

          <div className="newbaccarat-footer-grid">
            <Wallet
              totalbet={baccaratState.betamount}
              playerOverAllbalance={baccaratState.playerOverAllbalance}
            />
            <Action
              baccaratState={baccaratState}
              selectAmount={handleSelectAmount}
              deal={deal}
              rebet={rebet}
              clearBet={clearBet}
              handleSelectWager={handleSelectWager}
            />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};
