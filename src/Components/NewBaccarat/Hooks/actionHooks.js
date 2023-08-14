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
