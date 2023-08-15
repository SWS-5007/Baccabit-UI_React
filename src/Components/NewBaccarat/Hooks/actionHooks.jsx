import {
  initialBaccaratState,
  cardOffsets,
  selectedWager,
} from "./initialStates";
import { useGameRuleHooks } from "./gameRuleHooks";

export const getSelectAmount = (type) => {
  var coinValue;
  switch (type) {
    case "five":
      coinValue = 5;
      break;
    case "twenty-five":
      coinValue = 25;
      break;
    case "hundred":
      coinValue = 100;
      break;
    case "two-hundred-fifty":
      coinValue = 250;
      break;
    case "five-hundred":
      coinValue = 500;
      break;
    case "thousand":
      coinValue = 1000;
      break;
    default:
      coinValue = 0;
      break;
  }

  return coinValue;
};

export const shuffleDeck = (deck) => {
  return _.shuffle(_.shuffle(_.shuffle(_.shuffle(deck))));
};

export const getPos = (el) => {
  for (
    var lx = 0, ly = 0;
    el !== null;
    lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
  );
  return { x: lx, y: ly };
};

export const animate = (offsets, divToAnimate) => {
  $(divToAnimate).animate({
    left: offsets.x + "px",
    top: offsets.y + "px",
    position: "absolute",
    zIndex: 99999,
    opacity: 1,
  });
};

export const showAllCards = (i, baccaratState, thirdCardType = "both") => {
  const baccaratDiv = document.getElementById("newbaccarat");
  const baccaratDivRect = baccaratDiv.getBoundingClientRect();

  var divToMove = document.getElementById("firstCard");
  const cardOffset = divToMove.getBoundingClientRect();

  const xOffset1 =
    (cardOffset.left - baccaratDivRect.left) / baccaratState.scale;
  const yOffset1 = (cardOffset.top - baccaratDivRect.top) / baccaratState.scale;

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
    (targetRect.left - baccaratDivRect.left) / baccaratState.scale;
  const yOffset2 = (targetRect.top - baccaratDivRect.top) / baccaratState.scale;

  const newOffsets = {
    x: xOffset2,
    y: yOffset2,
  };

  animate(newOffsets, cln); // applying animate functionality
  cardOffsets.push(newOffsets);
};

export const selectWager = (wagerType, baccaratState, setBaccaratState) => {
  if (wagerType === "player-coordinates") {
    var wagerCircleDiv = "playerDivPosition";
  } else if (wagerType === "tie-coordinates") {
    wagerCircleDiv = "tieDivPosition";
  } else if (wagerType === "banker-coordinates") {
    wagerCircleDiv = "bankerDivPosition";
  }

  const actionBgDiv = document.getElementById("action-bg");
  const actionBgDivRect = actionBgDiv && actionBgDiv.getBoundingClientRect();

  var itm = document.getElementById(baccaratState.coinType);
  const itmRect = itm && itm.getBoundingClientRect();
  const xOffset1 = (itmRect.left - actionBgDivRect.left) / baccaratState.scale;
  const yOffset1 = (itmRect.top - actionBgDivRect.top) / baccaratState.scale;

  setBaccaratState((prev) => ({
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
    cln.className = baccaratState.coinType + "-chip tiecurrency currency-btn1";
  } else if (wagerType === "player-coordinates") {
    cln.className = baccaratState.coinType + "-chip currency currency-btn2";
  } else {
    cln.className = baccaratState.coinType + "-chip currency currency-btn3";
  }

  var innerDiv = document.getElementById("coins-container");
  innerDiv.insertBefore(cln, innerDiv.firstChild);

  const targetDiv = document.getElementById(wagerCircleDiv);
  const targetRect = targetDiv.getBoundingClientRect();

  const xOffset2 =
    (targetRect.left - actionBgDivRect.left) / baccaratState.scale;
  const yOffset2 = (targetRect.top - actionBgDivRect.top) / baccaratState.scale;

  const newOffsets = {
    x: xOffset2,
    y: yOffset2,
  };

  animate(newOffsets, cln); // applying animate functionality

  if (wagerType === "player-coordinates") {
    setBaccaratState((prev) => ({
      ...prev,
      playeramount: baccaratState.playeramount + baccaratState.coinAmount,
    }));
  } else if (wagerType === "tie-coordinates") {
    setBaccaratState((prev) => ({
      ...prev,
      tieamount: baccaratState.tieamount + baccaratState.coinAmount,
    }));
  } else if (wagerType === "banker-coordinates") {
    setBaccaratState((prev) => ({
      ...prev,
      bankeramount: baccaratState.bankeramount + baccaratState.coinAmount,
    }));
  }

  var finalbet =
    parseInt(baccaratState.betamount, 10) +
    parseInt(baccaratState.coinAmount, 10);

  selectedWager[baccaratState.coinType] = wagerType;

  setBaccaratState((prev) => ({
    ...prev,
    betamount: finalbet,
  }));
};

export const reset = (setBaccaratState) => {
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

//=============Step 1=============
export const shuffleCardsAndSetHands = (baccaratState, setBaccaratState) => {
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
    openAllCards(baccaratState, setBaccaratState)
  );
};

//=============Step 2=============
export const openAllCards = (baccaratState, setBaccaratState) => {
  const allOffset = cardOffsets;
  var i = 0;
  for (var key in allOffset) {
    if (allOffset.hasOwnProperty(key)) {
      var obj = allOffset[key];
      openOneByOne(i++, obj, baccaratState, setBaccaratState);
    }
  }
};

const getPlayerHands = (n, baccaratState) => {
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

// //=============Step 3=============
const openOneByOne = (n, obj, baccaratState, setBaccaratState) => {
  setTimeout(() => {
    var cardObj = getPlayerHands(n, baccaratState); // get player cards
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
    hiddenImage.addEventListener(
      "click",
      flipCards(obj, cardImage, n, baccaratState, setBaccaratState)
    );

    var innerDiv = document.getElementById("chip-container");
    innerDiv.appendChild(cardImage);
    innerDiv.appendChild(hiddenImage);

    goBack(obj, cardImage, n, baccaratState, setBaccaratState);

    updatePlayerScore(n, baccaratState, setBaccaratState);
  }, 800 * n);
};

const flipCards = (obj, cardImage, n, baccaratState, setBaccaratState) => {
  const hiddenCard = $("#hidden-card-" + n);
  const origCard = $("#orig-card-" + n);

  hiddenCard.addClass("hidden-flip-cards");

  setTimeout(() => {
    hiddenCard.remove();
    origCard.addClass("orig-flip-cards");
  }, 200);

  goBack(obj, cardImage, n, baccaratState, setBaccaratState);
};

const goBack = (obj, cardImage, n, baccaratState, setBaccaratState) => {
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

      useGameRuleHooks().gameRules(baccaratState, setBaccaratState);
    }
  }, 500);
};

const updatePlayerScore = (n, baccaratState, setBaccaratState) => {
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
