require("../styles/index.scss");
const IMG_BASE_URL = "http://localhost:8111/public/img/";
class Game {
  constructor() {
    // Query all the cards
    this.cards = document.querySelectorAll(".card");
    // Get score placeholders
    this.scoreElement = document.getElementById("score-placeholder");
    this.addedScoreElement = document.getElementById("addedScore-placeholder");
    this.firstCard = null;
    this.secondCard = null;
    this.flippedCards = [];
    this.canFlip = true;
    this.score = {
      added: 0,
      current: 0,
    };
  }

  // Resets the value of the flipped cards
  resetCards() {
    this.firstCard = null;
    this.secondCard = null;
  }

  // Adds flipped matching cards id to an Array then resets
  // the value of the two flipped cards
  addToFlippedCards(card) {
    this.flippedCards.push(card.dataset.id);
    this.resetCards();
  }

  // Unflips the cards then resets then resets
  // the value of the two flipped cards
  hideCards() {
    // Setting "canFlip" to false prevents the player
    // to flip cards before the cards are hidden
    this.canFlip = false;
    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");
      this.resetCards();
      // With "canFlip" set to true the player can flip again
      this.canFlip = true;
    }, 1000);
  }

  // Will check if the cards flipped match or not
  checkMatch() {
    return this.firstCard.dataset.id === this.secondCard.dataset.id;
  }

  // Shows the score to the player
  showScore(currentScore) {
    this.scoreElement.innerHTML = currentScore;
  }

  // Controls the color of the added score
  addedScoreColor(addedScore) {
    if (addedScore > 0) return "green";
    return "red";
  }

  // Shows the added score to the player
  showAddedScore(addedScore) {
    this.addedScoreElement.style.color = this.addedScoreColor(addedScore);
    this.addedScoreElement.innerHTML = addedScore;
    this.addedScoreElement.classList.add("fade-out");

    setTimeout(() => {
      this.addedScoreElement.classList.remove("fade-out");
    }, 1000);
  }

  // Controls how many points will be added
  winningScore() {
    if (this.score.added <= 0) return 100;
    return this.score.added * 2;
  }

  // Controls how many points will be substrated
  losingScore() {
    return -100;
  }

  // Flips the card
  flipCard(card) {
    // Exit the funtion if the player is not allowed to flip
    if (!this.canFlip) return;
    // Exit the function if the chosen card is already flipped
    if (this.flippedCards.includes(card.dataset.id) || card === this.firstCard)
      return;

    // Adding "flip" class will flip the card
    card.classList.add("flip");

    // If no card have been chosen save the value
    // of the card element to "firstCard" then exit the function
    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    // Save the card element to "secondCard"
    this.secondCard = card;

    const isMatch = this.checkMatch();

    // If the cards match add the card id to "flippedCards" array
    // If not, unflip the cards
    isMatch ? this.addToFlippedCards(card) : this.hideCards();
    // Save the added score
    this.score.added = isMatch ? this.winningScore() : this.losingScore();
    // Saves the new score
    this.score.current = this.score.current + this.score.added;

    // Shows the score to the player
    this.showScore(this.score.current);
    this.showAddedScore(this.score.added);
  }

  // Randomly set the order of cards
  shuffle() {
    this.cards.forEach((card) => {
      const random = Math.floor(Math.random() * 99);
      card.style.order = random;
    });
  }

  // Resets the score values
  resetScore() {
    this.score.added = 0;
    this.score.current = 0;
    this.showScore(0);
  }

  // Resets the game
  newGame() {
    // Unflip all the cards
    this.cards.forEach((card) => {
      card.classList.remove("flip");
    });

    this.resetCards();
    this.resetScore();
    this.shuffle();

    this.flippedCards = [];

    this.canFlip = true;
  }

  // Initialises the game
  initilize() {
    this.cards.forEach((card) => {
      card.addEventListener("click", () => this.flipCard(card));
      card
        .getElementsByClassName("front-face")[0]
        .setAttribute("src", IMG_BASE_URL + card.dataset.id + ".png");
      card
        .getElementsByClassName("back-face")[0]
        .setAttribute("src", IMG_BASE_URL + "card_back.png");
    });
    this.shuffle();
  }
}

const game = new Game();
game.initilize();

const newGameElement = document.getElementById("newGame");
// Set "newGame" funtion to the click
newGameElement.addEventListener("click", () => game.newGame());
