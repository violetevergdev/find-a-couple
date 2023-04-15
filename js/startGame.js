/** @format */

import { confetti } from "./confetti.js";
import { createGameCard } from "./gameCard.js";
import { createGameMenu } from "./gameMenu.js";
import { createIconsArray, dublicateArray, shuffle } from "./utiles.js";

export const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clicable = true;

  const gameSection = document.querySelector(".game-section__container");
  const gameTable = document.createElement("div");

  const cardsIcons = createIconsArray(difficult);
  const dublicatedCardsIcons = dublicateArray(cardsIcons);
  const restartBtn = document.createElement("button");

  gameSection.innerHTML = "";
  restartBtn.textContent = "Рестарт";
  gameTable.classList.add("game-table");
  restartBtn.classList.add("restart-btn");

  shuffle(dublicatedCardsIcons);

  dublicatedCardsIcons.forEach((icon) =>
    gameTable.append(createGameCard("question-circle", icon))
  );

  gameSection.append(gameTable, restartBtn);

  const cards = document.querySelectorAll(".game-card");

  restartBtn.addEventListener("click", createGameMenu);

  cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (clicable == true && !card.classList.contains("succsessfully")) {
        card.classList.add("flip");

        if (firstCard == null) {
          firstCard = index;
        } else {
          if (index != firstCard) {
            secondCard = index;
            clicable = false;
          }
        }

        if (firstCard != null && secondCard != null && firstCard != secondCard)
          if (
            cards[firstCard].firstElementChild.className ==
            cards[secondCard].firstElementChild.className
          ) {
            setTimeout(() => {
              cards[firstCard].classList.add("succsessfully");
              cards[secondCard].classList.add("succsessfully");

              firstCard = null;
              secondCard = null;
              clicable = true;
            }, 500);
          } else {
            setTimeout(() => {
              cards[firstCard].classList.remove("flip");
              cards[secondCard].classList.remove("flip");

              firstCard = null;
              secondCard = null;
              clicable = true;
            }, 500);
          }
      }

      if (Array.from(cards).every((card) => card.className.includes("flip"))) {
        document.querySelector(".confetti").innerHTML = confetti;
      }
    })
  );
};
