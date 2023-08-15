import { cardOffsets, selectedWager } from "./initialStates";
import { NewBaccaratComponent } from "..";

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
  console.log("@@@@@@@@@@", xOffset1, yOffset1);
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
  console.log("!!!!!!!!!!!!!!", xOffset2, yOffset2);

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
