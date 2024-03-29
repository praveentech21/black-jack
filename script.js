let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let balance = 1000;
let bet = 0;

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

function createDeck() {
  for (let suit of suits) {
    for (let value of values) {
      let card = { suit: suit, value: value };
      deck.push(card);
    }
  }
}

function shuffleDeck() {
  deck.sort(() => Math.random() - 0.5);
}

function dealInitialHands() {
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
}

function calculateScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let card of hand) {
    if (card.value === "Ace") {
      hasAce = true;
    }
    if (
      card.value === "Jack" ||
      card.value === "Queen" ||
      card.value === "King"
    ) {
      score += 10;
    } else if (card.value !== "Ace") {
      score += parseInt(card.value);
    }
  }
  if (hasAce && score + 11 <= 21) {
    score += 11;
  } else if (hasAce) {
    score += 1;
  }
  return score;
}

function checkBlackjack() {
  if (playerHand.length === 2 && playerScore === 21) {
    balance += bet * 1.5; // Blackjack payout
    endRound("Blackjack! You win!");
  } else if (dealerHand.length === 2 && dealerScore === 21) {
    endRound("Dealer has Blackjack. You lose.");
  }
}

function hit() {
  playerHand.push(deck.pop());
  playerScore = calculateScore(playerHand);
  if (playerScore > 21) {
    endRound("Bust! You lose.");
  }
}

function stand() {
  while (dealerScore < 17) {
    dealerHand.push(deck.pop());
    dealerScore = calculateScore(dealerHand);
  }
  if (dealerScore > 21 || dealerScore < playerScore) {
    balance += bet * 2; // Player wins
    endRound("You win!");
  } else if (dealerScore > playerScore) {
    endRound("You lose.");
  } else {
    balance += bet; // Push
    endRound("Push. It's a tie.");
  }
}

function endRound(message) {
  alert(message);
  resetGame();
}

function resetGame() {
  deck = [];
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  createDeck();
  shuffleDeck();
  dealInitialHands();
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  checkBlackjack();
}

createDeck();
shuffleDeck();
dealInitialHands();
playerScore = calculateScore(playerHand);
dealerScore = calculateScore(dealerHand);
checkBlackjack();
