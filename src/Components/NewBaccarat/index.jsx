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

  const handleSelectAmount = (type) => {
    const newType = getSelectAmount(type);
    setBaccaratState((prev) => ({
      ...prev,
      coinType: type,
      coinAmount: newType,
    }));
  };

  const getPlayerHands = (n) => {
    var playerhand = baccaratState.player;
    var bankerhand = baccaratState.banker;
    var cardObj;

    if (n === 0) {
      cardObj = playerhand[0];
    } else if (n === 1) {
      cardObj = bankerhand[0];
    } else if (n === 2) {
      cardObj = playerhand[1];
    } else if (n === 3) {
      cardObj = bankerhand[1];
    }
    return cardObj;
  };

  //=============Step 1=============
  const shuffleCardsAndSetHands = () => {
    const deck = shuffleDeck(baccaratState.deck);
    const playerhand = [];
    const bankerhand = [];
    playerhand.push(deck.pop());
    playerhand.push(deck.pop());

    bankerhand.push(deck.pop());
    bankerhand.push(deck.pop());

    setBaccaratState(
      (prev) => ({
        ...prev,
        player: playerhand,
        banker: bankerhand,
        cardOffset: cardOffsets,
      }),
      openAllCards()
    );
  };

  //=============Step 2=============
  const openAllCards = () => {
    const allOffset = cardOffsets;
    var i = 0;
    for (var key in allOffset) {
      if (allOffset.hasOwnProperty(key)) {
        var obj = allOffset[key];
        openOneByOne(i++, obj);
      }
    }
  };

  useEffect(() => {
    openAllCards();
  }, [baccaratState.player, baccaratState.banker]);

  // //=============Step 3=============
  const openOneByOne = (n, obj) => {
    setTimeout(() => {
      var cardObj = getPlayerHands(n); // get player cards
      if (typeof cardObj === "undefined") {
        return false;
      }
      var cardImage = document.createElement("img");
      cardImage.style.position = "absolute";
      cardImage.style.left = obj.x + "px";
      cardImage.style.top = obj.y + "px";
      cardImage.style.zIndex = 100006;
      cardImage.setAttribute("src", "assets/cards/" + cardObj.f + ".png");
      cardImage.setAttribute("id", "orig-card-" + n);
      cardImage.setAttribute("height", "144px");
      cardImage.setAttribute("width", "96px");

      var hiddenImage = document.createElement("img");
      hiddenImage.style.position = "absolute";
      hiddenImage.style.left = obj.x + "px";
      hiddenImage.style.top = obj.y + "px";
      hiddenImage.style.zIndex = 100006;
      hiddenImage.setAttribute("src", "assets/cards/hidden.png");
      hiddenImage.setAttribute("id", "hidden-card-" + n);
      hiddenImage.setAttribute("height", "144px");
      hiddenImage.setAttribute("width", "96px");
      hiddenImage.addEventListener("click", flipCards(obj, cardImage, n));

      var innerDiv = document.getElementById("chip-container");
      innerDiv.appendChild(cardImage);
      innerDiv.appendChild(hiddenImage);
      //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
      var offsets = getPos(document.getElementById("tieDivPosition"));

      // Comment this for stop animation
      // animate(offsets,hiddenImage); // applying animate functionality
      // animate(offsets,cardImage); // applying animate functionality

      goBack(obj, cardImage, n);

      updatePlayerScore(n); // update player score
    }, 800 * n);
  };

  const flipCards = (obj, cardImage, n) => {
    const hiddenCard = $("#hidden-card-" + n);
    const origCard = $("#orig-card-" + n);

    hiddenCard.addClass("hidden-flip-cards");

    setTimeout(() => {
      hiddenCard.remove();
      origCard.addClass("orig-flip-cards");
    }, 200);

    goBack(obj, cardImage, n);
  };

  const goBack = (obj, cardImage, n) => {
    setTimeout(() => {
      $("#card-" + n).remove(); // remove old cards
      $("#hidden-card-" + n).remove(); // remove old cards
      animate(obj, cardImage);

      if (n === 3) {
        setBaccaratState((prev) => ({
          ...prev,
          playerFinalScore: handScore(baccaratState.playerScore),
          bankerFinalScore: handScore(baccaratState.bankerScore),
        }));

        GameRuleHook.gameRules(baccaratState, setBaccaratState);
      }
    }, 500);
  };

  const updatePlayerScore = (n) => {
    var playerhand = baccaratState.player;
    var bankerhand = baccaratState.banker;
    var cardObj;
    var newPlayerscrore = baccaratState.playerScore;
    var newBankerscrore = baccaratState.bankerScore;

    if (n === 0) {
      cardObj = playerhand[0];
      newPlayerscrore += cardObj.v;
    } else if (n === 1) {
      cardObj = bankerhand[0];
      newBankerscrore += cardObj.v;
    } else if (n === 2) {
      cardObj = playerhand[1];
      newPlayerscrore += cardObj.v;
    } else if (n === 3) {
      cardObj = bankerhand[1];
      newBankerscrore += cardObj.v;
    }

    setBaccaratState((prev) => ({
      ...prev,
      playerScore: newPlayerscrore,
      bankerScore: newBankerscrore,
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
      shuffleCardsAndSetHands();
    }, 600);
  };

  const clearBet = () => {
    var innerDiv = document.getElementById("coins-container");
    innerDiv.innerHTML = "";
  };

  const reset = () => {
    setBaccaratState((prev) => ({
      ...prev,
      playerScore: initialBaccaratState.playerScore,
      bankerScore: initialBaccaratState.bankerScore,
      playerFinalScore: initialBaccaratState.playerFinalScore,
      bankerFinalScore: initialBaccaratState.bankerFinalScore,
      deck: initialBaccaratState.deck,
      cardOffset: initialBaccaratState.cardOffset,
      playerOverAllbalance: initialBaccaratState.playerOverAllbalance,
      dealBtnShow: initialBaccaratState.dealBtnShow,
      rebetBtnShow: initialBaccaratState.rebetBtnShow,
      goBack: initialBaccaratState.goBack,
      playerWinner: initialBaccaratState.playerWinner,
      bankerWinner: initialBaccaratState.bankerWinner,
      gameTied: initialBaccaratState.gameTied,
    }));

    cardOffsets.length = 0;
  };

  const rebet = () => {
    $("#chip-container").html("");
    reset();
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
