const playerHand = document.querySelector(".player-hand");
const dealerHand = document.querySelector(".dealer-hand");
const dealerName = document.getElementById("dealer-name");
const playerName = document.getElementById("player-name");
const statusDisplay = document.getElementById("status");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const dealBtn = document.getElementById("deal-btn");

let playerCards = [];
let dealerCards = [];
let dealerFirstCardHidden = true; // Track if dealer's first card is hidden

function deal() {
  // Clear previous hands
  playerHand.innerHTML = "";
  dealerHand.innerHTML = "";
  playerCards = [];
  dealerCards = [];
  dealerFirstCardHidden = true;

  // Deal initial cards
  playerCards.push(getCard());
  dealerCards.push(getCard());
  playerCards.push(getCard());
  dealerCards.push(getCard());

  // Display cards
  renderCards(playerHand, playerCards);
  renderDealerCards(dealerHand, dealerCards);

  // Reset dealer's hidden card
  dealerFirstCardHidden = true;

  // Enable/disable buttons
  hitBtn.disabled = false;
  standBtn.disabled = false;
  dealBtn.disabled = true;

  var audio = new Audio('assets/sounds/cardsshuffle.mp3');
  audio.play();

  // Update status
  statusDisplay.textContent = "Status: Start Playing player";
}
function hit() {

  var audio = new Audio('assets/sounds/takeacard.mp3');
  audio.play();

  playerCards.push(getCard());
  renderCards(playerHand, playerCards);

  // Check if player busts
  if (getHandValue(playerCards) > 21) {
    endGame("Ravi you lost Delear win");
    var audio = new Audio('assets/sounds/claps.mp3');
    audio.play();
  }
}

function stand() {
  // Reveal dealer's first card
  dealerFirstCardHidden = false;
  renderDealerCards(dealerHand, dealerCards);

  // Dealer's turn
  while (getHandValue(dealerCards) < 17) {
    dealerCards.push(getCard());
    renderCards(dealerHand, dealerCards);
  }

  // Determine winner
  const playerScore = getHandValue(playerCards);
  const dealerScore = getHandValue(dealerCards);

  if (dealerScore > 21 || playerScore > dealerScore) {
    endGame("Ravi you win the game!");
    audio = new Audio('assets/sounds/ipl.mp3');
    audio.play();
  } else if (playerScore < dealerScore) {
    endGame("Ho Ravi you loss the game! Congratulations Delear you won the game");
    audio = new Audio('assets/sounds/claps.mp3');
    audio.play();
  } else {
    endGame("It's a Tie!");
    audio = new Audio('assets/sounds/winner.mp3');
    audio.play();
  }
}

function endGame(message) {
  hitBtn.disabled = true;
  standBtn.disabled = true;
  dealBtn.disabled = false;
  statusDisplay.textContent = "Status: " + message;
}

function getCard() {
  // Dummy function to get a random card value
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  return cards[Math.floor(Math.random() * cards.length)];
}

function renderCards(container, cards) {
  container.innerHTML = "";
  cards.forEach((card) => {
    console.log(card);
    const div = document.createElement("img");
    div.classList.add("card");
    div.src = `assets/cards/${card}.png`;
    container.appendChild(div);
  });
}

function renderDealerCards(container, cards) {
  container.innerHTML = "";
  cards.forEach((card, index) => {
    console.log(card);
    const div = document.createElement("img");
    div.classList.add("card");
    if (index === 0 && dealerFirstCardHidden) {
      div.src = "assets/cards/joker.png";
    } else {
      div.src = `assets/cards/${card}.png`;
    }
    container.appendChild(div);
  });
}

function getHandValue(cards) {
  let sum = 0;
  let numAces = 0;

  cards.forEach((card) => {
    if (card === "A") {
      numAces++;
      sum += 11;
    } else if (card === "J" || card === "Q" || card === "K") {
      sum += 10;
    } else {
      sum += parseInt(card);
    }
  });

  while (sum > 21 && numAces > 0) {
    sum -= 10;
    numAces--;
  }

  return sum;
}
