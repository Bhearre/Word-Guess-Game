//   variables

var words = ["cat", "dog", "mouse", "ball"];  //word bank

var wrongGuesses = [];  //letters already guessed
var wins = 0;           //number of wins
var numGuesses = 9;     //number of guesses remaining
var currentWord = "";   //randomly selected word from word bank
var displayCharacters = [];     //array used to hold correctly guessed letters or empty spaces
var letterPressed = "";         //letter pressed by user as guess
var message = "";               //feedback to user

//for display in webpage
var currentWordText = document.getElementById("currentWord");
var winsText = document.getElementById("wins");
var numGuessesText = document.getElementById("numGuesses");
var wrongGuessesText = document.getElementById("wrongGuesses");
var message = document.getElementById("message");

//execute when page is launched
var startUp = function () {
    currentWord = "";
    displayCharacters = []; 
    numGuesses = 9; 
    wrongGuesses = []; 

    // select word at random from word bank
    currentWord = words[Math.floor(Math.random() * words.length)];
    console.log(currentWord);

    //Build an array with the same length as the current word and fill it with underscores 
    for (var i = 0; i < currentWord.length; i++) {
        displayCharacters.push("_");
    }

    //Display the current word with underscores separated by spaces
    currentWordText.textContent = displayCharacters.join(' ');

    // Refresh the rest of the display items
    winsText.textContent = wins;
    numGuessesText.textContent = numGuesses;
    wrongGuessesText.textContent = wrongGuesses;
    message.textContent = "Press any key to start!";
}

startUp();  //run startUp function at launch

// receives feedback from user selected keys when key is released
document.onkeyup = function (event) {

    //capture key pressed and store it in variable letterPressed
    letterPressed = event.key;

    //make sure letterPressed is a-z
    if (letterPressed.match(/^[a-zA-Z]+$/)) {

        //check if letterPressed is in currentWord
        if (currentWord.includes(event.key)) {

            //if letterPressed is in currentWord, reflect that in displayCharacters array in the appropriate place
            for (var j = 0; j < currentWord.length; j++) {
                if (currentWord[j] === letterPressed) {
                    displayCharacters[j] = letterPressed;
                }//closes if
            }//closes for

            //check to see if displayCharacters has the complete currentWord
            var checkWord = displayCharacters.join('');
            if (checkWord === currentWord) {
                message.textContent = "Congratulations!  You did it!";
                wins++;
                startUp();
            }//closes if checkWord = currentWord
            else {
                numGuesses--;
                refresh();

            }
        }//closes if letterPressed is in currentWord

        //if letterPressed is NOT in currentWord
        else {
            //add letterPressed to array for Letters Already Guessed
            wrongGuesses.push(letterPressed);
            message.textContent = "Sorry, try another letter.";
            numGuesses--;
            refresh();

        }//close else
    } //closes if letterPressed is a-z

    //reduce the Number of Guesses Remaining by 1
   if (numGuesses === 0) {
        startUp();
   }

    //refresh the page

}//close onkeyup




//refresh the page
refresh = function () {

    winsText.textContent = wins;
    numGuessesText.textContent = numGuesses;
    wrongGuessesText.textContent = wrongGuesses.join(' ');
    currentWordText.textContent = displayCharacters.join(' ');
    // message.textContent = message;

}
