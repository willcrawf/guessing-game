//*------Constants------*//


//*------Variables------*//
let secretNum, isWinner, currentGuess, guessList;
//*------Cached Element References------*//
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton')
const resetBtn = document.getElementById('resetButton')
const guessInput = document.getElementById('guessInput');

//*------Event Listeners------*//
init();
//*------Functions------*//

//Init function sets all state vars for a new game
function init(){
    //Easy way to remove all appended children from element:
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a guess between 1 and 100!';
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random() * 100 + 1);
    messageEl.className = '';
}

resetBtn.addEventListener('click', function(){
    init();
})

guessBtn.addEventListener('click', function(){
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'

    } if (isWinner === false) {
        checkGuess(parseInt(guessInput.value))
        guessInput.value = '';
    }
})

function checkGuess(guess){
    if (guess < 1 || guess > 100){
        messageEl.innerText = 'Woah... The number is between 1 and a 100, dummy.'
    } else if (guess === secretNum) {
        isWinner = true;
        messageEl.className = 'winner';
        messageEl.innerText = `Congrats! You guessed the number in only ${guessList.length + 1} guesses!`;
        
    } else if (guess < secretNum){
        messageEl.className = 'low';
        messageEl.innerText = `Your guess of ${guess} is too low.`
        guessList.push(guess);
        render(guess);
    } else {
        messageEl.className = 'high';
        messageEl.innerText = `Your guess of ${guess} is too high.`
        guessList.push(guess);
        render(guess);  
    }
}

function render(guess) {
    //Append a child to guessesEl div based on whether our guess is higher or lower than secretNum
    if (guess > secretNum){
        let div = document.createElement('div');
        div.innerText = guess
        div.className = 'high'
        guessesEl.appendChild(div);
    } else {
        let div = document.createElement('div');
        div.innerText = guess
        div.className = 'low'
        guessesEl.appendChild(div);
    }
}