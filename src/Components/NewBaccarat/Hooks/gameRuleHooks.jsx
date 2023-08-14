import { shuffleDeck, getPos } from "./actionHooks";
import { NewBaccaratComponent } from "..";

export const useGameRuleHooks = () => {
  const gameRules = (baccaratState, setBaccaratState) => {
    if (baccaratState.goBack) {
      return false;
    }

    setBaccaratState((prev) => ({
      ...prev,
      goBack: true,
    }));

    var playerDraw = false;
    var playerStand = false;
    var playerNaturalStand = false;
    var bankerDraw = false;
    var bankerStand = false;
    var bankerNaturalStand = false;
    var bankerCardDisplay = false;
    //=====================Player Rules========================
    if (
      baccaratState.playerFinalScore <= 5 ||
      baccaratState.playerFinalScore === 10
    ) {
      playerDraw = true;
    } else if (
      baccaratState.playerFinalScore <= 6 ||
      baccaratState.playerFinalScore === 7
    ) {
      playerStand = true;
    } else if (
      baccaratState.playerFinalScore <= 8 ||
      baccaratState.playerFinalScore === 9
    ) {
      playerNaturalStand = true;
      playerStand = true;
    }

    var i = 4;
    if (playerDraw) {
      var deck = shuffleDeck(baccaratState.deck);
      var playerhand = [];
      playerhand.push(deck.pop());

      setBaccaratState((prev) => ({
        ...prev,
        thirdPlayerHand: playerhand,
      }));

      showAllCards(i, baccaratState, "player");

      var cardObj;
      var playerCard = baccaratState.thirdPlayerHand;
      cardObj = playerCard[0];
      var playerThirCardValue = cardObj.v;
    }

    //=====================Banker Rules========================

    if (!playerNaturalStand) {
      var bankerScore = baccaratState.bankerFinalScore;

      if (bankerScore >= 0 && bankerScore <= 2) {
        bankerDraw = true;
      } else if (bankerScore === 3) {
        if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue <= 7) ||
          (playerDraw && playerThirCardValue === 9)
        ) {
          bankerDraw = true;
        } else if (playerDraw && playerThirCardValue === 8) {
          bankerStand = true;
        }
      } else if (bankerScore === 4) {
        if (
          playerDraw &&
          playerThirCardValue >= 2 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true;
        } else if (
          (playerDraw &&
            playerThirCardValue >= 8 &&
            playerThirCardValue >= 10) ||
          (playerDraw && playerThirCardValue <= 1)
        ) {
          bankerStand = true;
        }
      } else if (bankerScore === 5) {
        if (
          playerDraw &&
          playerThirCardValue >= 4 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true;
        } else if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue >= 3) ||
          (playerDraw && playerThirCardValue >= 8 && playerThirCardValue <= 9)
        ) {
          bankerStand = true;
        }
      } else if (bankerScore === 6) {
        if (
          playerDraw &&
          playerThirCardValue >= 6 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true;
        } else if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue <= 5) ||
          (playerDraw && playerThirCardValue >= 8 && playerThirCardValue <= 9)
        ) {
          bankerStand = true;
        }
      } else if (bankerScore === 7 && playerStand) {
        bankerDraw = true;
      } else if (
        playerStand &&
        playerNaturalStand &&
        bankerScore >= 8 &&
        bankerScore <= 9
      ) {
        bankerDraw = true;
      }

      if (bankerDraw) {
        i++;
        deck = shuffleDeck(baccaratState.deck);
        var bankerhand = [];
        bankerhand.push(deck.pop());

        setBaccaratState((prev) => ({
          ...prev,
          thirdBankerHand: bankerhand,
        }));

        showAllCards(i, baccaratState, "banker");
      }
    }

    if (playerDraw) {
      setTimeout(() => {
        openPlayerThirdCard(
          4,
          "player",
          playerDraw,
          bankerDraw,
          bankerCardDisplay,
          baccaratState,
          setBaccaratState
        );
      }, 800);
    }

    if (bankerDraw) {
      setTimeout(() => {
        openBankerThirdCard(
          5,
          "banker",
          playerDraw,
          bankerDraw,
          bankerCardDisplay,
          baccaratState,
          setBaccaratState
        );
      }, 1400);
    }

    if (!playerDraw && !bankerDraw) {
      calculateWinner(baccaratState, setBaccaratState); // calculating winner
    }
  };

  const calculateWinner = (baccaratState, setBaccaratState) => {
    setTimeout(() => {
      if (baccaratState.playerFinalScore > baccaratState.bankerFinalScore) {
        setBaccaratState((prev) => ({
          ...prev,
          playerWinner: "winner",
        }));
      } else if (
        baccaratState.playerFinalScore < baccaratState.bankerFinalScore
      ) {
        setBaccaratState((prev) => ({
          ...prev,
          bankerWinner: "winner",
        }));
      } else if (
        baccaratState.playerFinalScore === baccaratState.bankerFinalScore
      ) {
        setBaccaratState((prev) => ({
          ...prev,
          gameTied: "winner",
        }));
      }

      setBaccaratState((prev) => ({
        ...prev,
        rebetBtnShow: "show",
      }));
    }, 2000);
  };

  const openPlayerThirdCard = (
    i,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay,
    baccaratState,
    setBaccaratState
  ) => {
    var playerCard = baccaratState.thirdPlayerHand;

    var n = i;

    var cardObj = playerCard[0];
    var playerThirCardValue = cardObj.v;
    var dimensions = getPos(document.getElementById("playerthirdCard"));
    bankerCardDisplay = false;
    var allOffset = baccaratState.cardOffset;

    if (allOffset[4]) {
      var gobackOffset = allOffset[4];
    }

    createNewCard(
      n,
      cardObj,
      dimensions,
      playerThirCardValue,
      type,
      playerDraw,
      bankerDraw,
      bankerCardDisplay,
      gobackOffset,
      baccaratState,
      setBaccaratState
    );

    setBaccaratState((prev) => ({
      ...prev,
      playerThirCardValue: playerThirCardValue,
    }));
  };

  const openBankerThirdCard = (
    i,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay,
    baccaratState,
    setBaccaratState
  ) => {
    var bankerCard = baccaratState.thirdBankerHand;

    var n = i;
    bankerCardDisplay = true;
    var cardObj = bankerCard[0];
    var bankerThirCardValue = cardObj.v;
    var dimensions = getPos(document.getElementById("bankerthirdCard"));
    var allOffset = baccaratState.cardOffset;
    //console.log(allOffset);
    //console.log(allOffset[4]);
    if (allOffset[5]) {
      var gobackOffset = allOffset[5];
    } else {
      gobackOffset = allOffset[4];
    }
    createNewCard(
      n,
      cardObj,
      dimensions,
      bankerThirCardValue,
      type,
      playerDraw,
      bankerDraw,
      bankerCardDisplay,
      gobackOffset,
      baccaratState,
      setBaccaratState
    );

    setBaccaratState((prev) => ({
      ...prev,
      bankerThirCardValue: bankerThirCardValue,
    }));
  };

  const createNewCard = (
    n,
    cardObj,
    dimensions,
    thirdCardScore,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay,
    gobackOffset,
    baccaratState,
    setBaccaratState
  ) => {
    var cardImage = document.createElement("img");
    cardImage.style.position = "absolute";
    cardImage.style.left = dimensions.x + "px";
    cardImage.style.top = dimensions.y + "px";
    cardImage.style.zIndex = 100006;
    cardImage.setAttribute("src", "assets/cards/" + cardObj.f + ".png");
    cardImage.setAttribute("id", "orig-card-" + n);
    cardImage.setAttribute("height", "144px");
    cardImage.setAttribute("width", "96px");

    var hiddenImage = document.createElement("img");
    hiddenImage.style.position = "absolute";
    hiddenImage.style.left = dimensions.x + "px";
    hiddenImage.style.top = dimensions.y + "px";
    hiddenImage.style.zIndex = 100006;
    hiddenImage.setAttribute("src", "assets/cards/hidden.png");
    hiddenImage.setAttribute("id", "hidden-card-" + n);
    hiddenImage.setAttribute("height", "144px");
    hiddenImage.setAttribute("width", "96px");
    hiddenImage.addEventListener(
      "click",
      NewBaccaratComponent.flipCards(dimensions, cardImage, n)
    );

    var innerDiv = document.getElementById("chip-container");
    innerDiv.appendChild(cardImage);
    innerDiv.appendChild(hiddenImage);
    //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
    var offsets = getPos(document.getElementById("tieDivPosition"));

    // Comment this for stop animation
    // animate(offsets,hiddenImage); // applying animate functionality
    // animate(offsets,cardImage); // applying animate functionality

    if (type === "player") {
      var playerscrore = baccaratState.playerFinalScore;
      playerscrore += thirdCardScore;
      setBaccaratState((prev) => ({
        ...prev,
        playerFinalScore: handScore(playerscrore),
      }));
    } else {
      var bankerscrore = baccaratState.bankerFinalScore;
      bankerscrore += thirdCardScore;
      setBaccaratState((prev) => ({
        ...prev,
        bankerFinalScore: handScore(bankerscrore),
      }));
    }

    if (playerDraw && bankerDraw && bankerCardDisplay) {
      calculateWinner(baccaratState, setBaccaratState); // calculating winner
    } else if (!playerDraw && bankerDraw && bankerCardDisplay) {
      calculateWinner(baccaratState, setBaccaratState); // calculating winner
    }
    if (playerDraw && !bankerDraw) {
      calculateWinner(baccaratState, setBaccaratState); // calculating winner
    }
    goBack(gobackOffset, cardImage, n);
  };

  const handScore = (hand) => {
    if (hand >= 10) {
      var one = String(hand).charAt(1);
      return Number(one);
    }

    return hand;
  };

  return {
    gameRules,
    calculateWinner,
    openPlayerThirdCard,
    openBankerThirdCard,
    createNewCard,
    handScore,
  };
};
