const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLrft = 30;
let gameInterval;
/* #colors array: This array holds distinct color values in
strings, representing the colors for the cards in the memory
match game. These colors create pairs for the game. 
#cards array: Initialized by shuffling and attaching the
'colors' array, this 'cards' array holds the color values for
the cards in the game. The shuffle function employs the
Fisher-Yates algorithm to randomize the order of the colors
and then duplicates these colors to create pairs, forming the
set of cards for gameplay.
#selectedCards: This variable acts as a temporary storage for
the currently selected cards during the game. When a player
clicks on a card, it gets added to this array to enable match
comparisons.
#score: This variable tracks the player's score throughout the
game. The score gets incremented whenever the player matches
a pair of cards successfully. It's updated and displayed to
reflect the player's progress and performance.
#timeLeft: It represents the time remaining for the player to
complete the game. Initially set to a specific duration, it
counts down as the game progresses. When it reaches zero, the
game ends.
#gameInterval: This variable manages the game timer. It's
utilized to control the countdown mechanism for the game's
duration. The interval continuously decrements the 'timeLeft'
variable, updating the displayed time and triggering the
game's end when the time expires
 */
// DOM element selection
const startbtn = document.getElementById("startbtn");
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Create and call functions to start the game
function generateCards() {
    // It utilizes a 'for...of' loop to iterate over each
    // element(color) in the 'cards' array. 
    // For each color in the 'cards' array: 
    for (const color of cards) {
        // inside the loop, we create a new HTML div element
        // This 'div' element represents a card in the game.
        const card = document.createElement('div');
        card.classList.add('card'); // it adds a class 'card' to the newly created element.
        card.dataset.color = color; //sets 'dataset.color' attribute of the card element to the current color value from the 'cards' array. This icon represents the card's hidden color until the player clicks it.
        card.textContent = '?';
        gameContainer.appendChild(card);
        /* #The text content of each is initially set to a
        question mark("?") using the card.textContent = '?'
        This represents that the color of the card is hidden
        until it's clicked by the player.
        # Finally, the newly created card element is attached
        to the 'gameContainer' element as a child.
        This action adds each card element to the game
        interface within the designated container. */
    }
}

// The shuffle() Function is responsible for shuffling the
// elements of an array in random order. It uses the
// Fisher-Yates shuffle algorithm, a common method for
// randomizing the order of elements in an array. Include
// given code after generateCards() function.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    /*#Array parameter: It takes an array as an argument, which contains yet to be shuffled elements.

Shuffling process using loop through the array: The function starts by initiating a 'for' loop that iterates backward through the array starting from the last index (let i = array.length - 1; i > 0; i–).

Random index selection: Within each iteration, it generates a random index 'j' using Math.floor(Math.random() * (i + 1)). This 'j' represents a random index within the array.

Swapping elements: It then swaps the elements at the 'i' and 'j' indices using array destructuring assignment: [array[i], array[j]] = [array[j], array[i]]. This line efficiently swaps the values at positions 'i' and 'j' without requiring a temporary variable.

Continuing the loop: The loop continues until it finishes iterating through the entire array, shuffling elements along the way.

Returning the shuffled array: Once the loop is complete, the function returns the array with its elements rearranged into a random order.

  */
}
/* The handleCardClick(event) function manages the logic when 
a user clicks the card in the memory match game. */
function handleCardClick(event) {
    const card = event.target;
    // This 'if' statement checks whether the clicked element
    // is a card and if it's already matched.
    if (!card.classList.contains('card') || card.classList.contains('matched')) {
        return;
        // If either condition is true, the function returns early,
        // preventing further execution for that click event.
    }
    // Revealing the card:
    card.textContent = card.dataset.color;  //  It sets the text content of the clicked card to the value stored in its 'dataset.color'. This action reveals the card's color by changing the text content to the color value.
    card.style.backgroundColor = card.dataset.color; // Changes the card's background color to match the revealed color.
    // Handling selected cards:
    selectedCards.push(card); //Adds the clicked card to the 'selectedCards' array, indicating that it's one of the cards currently chosen by the player.
    // Checking for matches:
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
    /* #Checks if two cards have been selected. If two cards
    have been chosen, it uses 'setTimeout()' to delay the
    execution of the 'checkMatch()' function by 500 milliseconds.
    This brief delay allows the player to see both selected
    cards before their comparison briefly. */
}
// The checkMatch() function evaluates whether the two
// selected cards match each other in the memory match game.
// Include given code after handleCardClick() function.
function checkMatch() {
    const [card1, card2] = selectedCards; // It uses array destructuring to assign the two selected cards from the 'selectedCards' array to 'card1' and 'card2' variables for easier reference.
    // This checks if the color value stored in the 'dataset.color'
    // attribute of 'card1' matches the color value of 'card2'.
    if (card1.dataset.color === card2.dataset.color) {
        // If the colors match; it adds the class 'matched'
        // to both cards using '.classList.add('matched')',
        // marking them as matched pairs in the game.
        card1.classList.add('matched'); 
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else { // Hndling non-matching cards; if the colors of the
        // two selected cards don't match: it resets the text content
        // of both cards to a quesiton mark, hiding their true colors again.
        card1.textContent = "?";
        card2.textContent = "?";
        card1.style.backgroundColor = "#ddd"; // Sets the background color of both cards to a default color.
        card2.style.backgroundColor = "#ddd";
    }
    // Reseting selection
    // It clears the 'selectedCards' array to reset it for the
    // next set of card selections. This action ensures the player
    // can select two new cards after the comparison.
    selectedCards = []; 
}
// The startGame() Function is a pivotal part of initializing
// and starting the memory match game.
function startGame() {
    let timeLeft = 30;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors)); //
    selectedCards = [];
    gameContainer.innerHTML = "";
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}
/*Here's a summary of its functionalities:

Setting initial game state:

let timeLeft = 30;: Initializes the 'timeLeft' variable to 30 seconds, setting the duration for the game.

startbtn.disabled = true;: Disables the 'startbtn' button to prevent multiple game initiations simultaneously, ensuring one game is in progress at a time.

score = 0;: Resets the 'score' variable to zero, initializing it for the new game.

scoreElement.textContent = Score: ${score};: Updates the displayed score to show that it's reset to zero for the new game.

Starting the game timer:

startGameTimer(timeLeft);: Initiates the game timer, counting down from the specified 'timeLeft' duration.
Preparing cards and game elements:

cards = shuffle(colors.concat(colors));: Shuffles the 'colors' array and duplicates it to create pairs for the game cards.

selectedCards = [];: Clears the 'selectedCards' array to prepare for new card selections in the upcoming game.

gameContainer.innerHTML = '';: Clears the game container, removing any existing cards from previous games.

generateCards();: Generates a new set of cards within the game container by calling the 'generateCards()' function, creating a fresh game layout for the player.

Enabling card click event:

gameContainer.addEventListener('click', handleCardClick);: Adds an event listener to the game container, enabling card clicks and triggering the 'handleCardClick()' function to manage the gameplay when cards are clicked. */

/**The startGameTimer(timeLeft) function manages the game
 * timer, updating the displayed time and handling the end
 * of the game when the timer reaches zero. */
function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `TimeLeft: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
    /** Here's a detailed explanation of its workings:

Initial display:

timerElement.textContent = Time Left: ${timeLeft};: Sets the initial display of the timer to show the 'timeLeft' value, indicating the starting time remaining for the game.
Interval setup:

gameInterval = setInterval(() => { ... }, 1000);: Initiates an interval that triggers a function every second (1000 milliseconds) to update the timer.
Countdown:

timeLeft--;: Decrements the 'timeLeft' variable every second within the interval, simulating the countdown by reducing the remaining time.
Updating displayed time:

timerElement.textContent = Time Left: ${timeLeft};: Updates the displayed time on the HTML element ('timerElement') to reflect the updated 'timeLeft' value after each decrement.
End of game:

if (timeLeft === 0) { ... }: Checks if the remaining time reaches zero.
If 'timeLeft' equals zero:

clearInterval(gameInterval);: Stops the interval, effectively ending the timer from counting down further.

let timeLeft = 30;: This line is redundant as it re-declares 'timeLeft' within the scope of this block, resetting it to 30, but it does not affect the 'timeLeft' used in the interval.

alert('Game Over!');: Displays an alert indicating that the game is over because the time limit has been reached.

startbtn.disabled = false;: Re-enables the 'startbtn' button, allowing the player to start a new game after the current one has ended.*/
}
// Event listener for the start button
startbtn.addEventListener('click', startGame);