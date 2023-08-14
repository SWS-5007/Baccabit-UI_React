import React, { useState, useEffect } from "react";
import $ from "jquery";
import _ from "lodash";

import Action from "./Action";
import Banker from "./Banker";
import Chat from "./Chat";
import Player from "./Player";
import Wallet from "./Wallet";

import "./styles.css";

import { initialBaccaratState } from "./Hooks/initialStates";
import { useBaccaratState } from "./Hooks/baccaratState";
import { getSelectAmount, shuffleDeck, getPos } from "./Hooks/actionHooks";
import { useGameRuleHooks } from "./Hooks/gameRuleHooks";

const cardOffsets = [];
const selectedWager = [];

export const NewBaccaratComponent = () => {
  const BaccaratHook = useBaccaratState();
  const GameRuleHook = useGameRuleHooks();

  const handleWindowResize = () => {
    const { innerWidth, innerHeight } = window;
    // Set your desired scaling and translation values here
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    const translateX = (innerWidth - 1920 * scale) / 2;
    const translateY = (innerHeight - 1080 * scale) / 2;

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      scale: scale,
      translateX: translateX,
      translateY: translateY,
    }));
  };

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);

  const handleSelectAmount = (type) => {
    const newType = getSelectAmount(type);

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      coinType: type,
      coinAmount: newType,
    }));
  };

  const animate = (offsets, divToAnimate) => {
    $(divToAnimate).animate({
      left: offsets.x + "px",
      top: offsets.y + "px",
      position: "absolute",
      zIndex: 99999,
      opacity: 1,
    });
  };
  const getPlayerHands = (n) => {
    var playerhand = BaccaratHook.baccaratState.player;
    var bankerhand = BaccaratHook.baccaratState.banker;
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
    const deck = shuffleDeck(BaccaratHook.baccaratState.deck);
    const playerhand = [];
    const bankerhand = [];
    playerhand.push(deck.pop());
    playerhand.push(deck.pop());

    bankerhand.push(deck.pop());
    bankerhand.push(deck.pop());

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      player: playerhand,
      banker: bankerhand,
      cardOffset: cardOffsets,
    }));

    openAllCards();
  };

  //=============Step 2=============
  const openAllCards = () => {
    const allOffset = BaccaratHook.baccaratState.cardOffset;
    var i = 0;
    for (var key in allOffset) {
      if (allOffset.hasOwnProperty(key)) {
        var obj = allOffset[key];
        openOneByOne(i++, obj);
      }
    }
  };

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
        BaccaratHook.setBaccaratState((prev) => ({
          ...prev,
          playerFinalScore: handScore(BaccaratHook.baccaratState.playerScore),
          bankerFinalScore: handScore(BaccaratHook.baccaratState.bankerScore),
        }));

        GameRuleHook.gameRules();
      }
    }, 500);
  };

  const updatePlayerScore = (n) => {
    var playerhand = BaccaratHook.baccaratState.player;
    var bankerhand = BaccaratHook.baccaratState.banker;
    var cardObj;
    var newPlayerscrore = BaccaratHook.baccaratState.playerScore;
    var newBankerscrore = BaccaratHook.baccaratState.bankerScore;

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

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      playerScore: newPlayerscrore,
      bankerScore: newBankerscrore,
    }));
  };

  const selectWager = (wagerType) => {
    if (wagerType === "player-coordinates") {
      var wagerCircleDiv = "playerDivPosition";
    } else if (wagerType === "tie-coordinates") {
      wagerCircleDiv = "tieDivPosition";
    } else if (wagerType === "banker-coordinates") {
      wagerCircleDiv = "bankerDivPosition";
    }

    const actionBgDiv = document.getElementById("action-bg");
    const actionBgDivRect = actionBgDiv && actionBgDiv.getBoundingClientRect();

    var itm = document.getElementById(BaccaratHook.baccaratState.coinType);
    const itmRect = itm && itm.getBoundingClientRect();

    const xOffset1 =
      (itmRect.left - actionBgDivRect.left) / BaccaratHook.baccaratState.scale;
    const yOffset1 =
      (itmRect.top - actionBgDivRect.top) / BaccaratHook.baccaratState.scale;

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      clearBtnShow: "show",
    }));

    var cln = itm.cloneNode(true); // creating clone
    cln.id = "";
    cln.style.position = "absolute";
    cln.style.opacity = 0.8;
    cln.style.left = xOffset1 + "px";
    cln.style.top = yOffset1 + "px";
    cln.style.zIndex = 99999;

    if (wagerType === "tie-coordinates") {
      cln.className =
        BaccaratHook.baccaratState.coinType + "-chip tiecurrency currency-btn1";
    } else if (wagerType === "player-coordinates") {
      cln.className =
        BaccaratHook.baccaratState.coinType + "-chip currency currency-btn2";
    } else {
      cln.className =
        BaccaratHook.baccaratState.coinType + "-chip currency currency-btn3";
    }

    var innerDiv = document.getElementById("coins-container");
    innerDiv.insertBefore(cln, innerDiv.firstChild);

    const targetDiv = document.getElementById(wagerCircleDiv);
    const targetRect = targetDiv.getBoundingClientRect();

    const xOffset2 =
      (targetRect.left - actionBgDivRect.left) /
      BaccaratHook.baccaratState.scale;
    const yOffset2 =
      (targetRect.top - actionBgDivRect.top) / BaccaratHook.baccaratState.scale;

    const newOffsets = {
      x: xOffset2,
      y: yOffset2,
    };

    animate(newOffsets, cln); // applying animate functionality

    if (wagerType === "player-coordinates") {
      BaccaratHook.setBaccaratState((prev) => ({
        ...prev,
        playeramount:
          BaccaratHook.baccaratState.playeramount +
          BaccaratHook.baccaratState.coinAmount,
      }));
    } else if (wagerType === "tie-coordinates") {
      BaccaratHook.setBaccaratState((prev) => ({
        ...prev,
        tieamount:
          BaccaratHook.baccaratState.tieamount +
          BaccaratHook.baccaratState.coinAmount,
      }));
    } else if (wagerType === "banker-coordinates") {
      BaccaratHook.setBaccaratState((prev) => ({
        ...prev,
        bankeramount:
          BaccaratHook.baccaratState.bankeramount +
          BaccaratHook.baccaratState.coinAmount,
      }));
    }

    var finalbet =
      parseInt(BaccaratHook.baccaratState.betamount, 10) +
      parseInt(BaccaratHook.baccaratState.coinAmount, 10);

    selectedWager[BaccaratHook.baccaratState.coinType] = wagerType;

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      betamount: finalbet,
    }));
  };

  const showAllCards = (i, thirdCardType = "both") => {
    const baccaratDiv = document.getElementById("newbaccarat");
    const baccaratDivRect = baccaratDiv.getBoundingClientRect();

    var divToMove = document.getElementById("firstCard");
    const cardOffset = divToMove.getBoundingClientRect();

    const xOffset1 =
      (cardOffset.left - baccaratDivRect.left) /
      BaccaratHook.baccaratState.scale;
    const yOffset1 =
      (cardOffset.top - baccaratDivRect.top) / BaccaratHook.baccaratState.scale;

    var cln = divToMove.cloneNode(true); // creating clone
    cln.id = "card-" + i;
    cln.style.position = "absolute";
    cln.style.opacity = 0.8;
    cln.style.left = xOffset1 + "px";
    cln.style.top = yOffset1 + "px";
    cln.style.zIndex = 99999;

    var innerDiv = document.getElementById("chip-container");
    innerDiv.insertBefore(cln, innerDiv.firstChild);
    var cardType = "";

    if (thirdCardType === "both") {
      if (i === 0) {
        cardType = "playerfirstCard";
      } else if (i === 1) {
        cardType = "bankerfirstCard";
      } else if (i === 2) {
        cardType = "playersecondCard";
      } else if (i === 3) {
        cardType = "bankersecondCard";
      }
    } else if (thirdCardType === "player") {
      cardType = "playerthirdCard";
    } else if (thirdCardType === "banker") {
      cardType = "bankerthirdCard";
    }

    const targetDiv = document.getElementById(cardType);
    const targetRect = targetDiv.getBoundingClientRect();

    const xOffset2 =
      (targetRect.left - baccaratDivRect.left) /
      BaccaratHook.baccaratState.scale;
    const yOffset2 =
      (targetRect.top - baccaratDivRect.top) / BaccaratHook.baccaratState.scale;

    const newOffsets = {
      x: xOffset2,
      y: yOffset2,
    };

    animate(newOffsets, cln); // applying animate functionality
    cardOffsets.push(newOffsets);
  };

  const deal = () => {
    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      dealBtnShow: "hide",
      rebetBtnShow: "hide",
    }));

    for (var i = 0; i < 4; i++) {
      showAllCards(i);
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
    BaccaratHook.setBaccaratState((prev) => ({
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

  return (
    <>
      <div className="newbaccarat-wrapper">
        <div
          id="newbaccarat"
          className="newbaccarat"
          // style={{
          //   position: "absolute",
          //   top: "50%",
          //   left: "50%",
          //   transform: `${`scale(${scale}) translate(-50%, -50%)`}`,
          // }}
        >
          <div id="chip-container"></div>
          <div className="newbaccarat-card-grid">
            <Player />
            <Banker />
          </div>

          <div className="newbaccarat-footer-grid">
            <Wallet />
            <Action
              baccaratState={BaccaratHook.baccaratState}
              selectAmount={handleSelectAmount}
              deal={deal}
              rebet={rebet}
              clearBet={clearBet}
              selectWager={selectWager}
            />
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};
