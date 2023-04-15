/** @format */

export const createGameCard = (defIcon, flipIcon) => {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const notFlippedCardI = document.createElement("i");
  const flippedCardI = document.createElement("i");

  notFlippedCardI.classList.add("fa", `fa-${defIcon}`);
  flippedCardI.classList.add("fa", `fa-${flipIcon}`);

  card.append(flippedCardI, notFlippedCardI);

  return card;
};
