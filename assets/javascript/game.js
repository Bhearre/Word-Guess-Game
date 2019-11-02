//   variables

//word bank
var words = ["batter", "pitcher", "catcher", "ball", "outfielder", "shortstop", "bullpen", "lineup", "manager", "pitch", "plate", "steal", "strike", "curveball", "knuckleball","fastball", "doubleheader", "inning", "hardball"];

var wrongGuesses = [];  //letters already guessed
var wins = 0;           //number of wins
var losses = 0;          //number of losses
var numGuesses = 9;     //number of guesses remaining
var currentWord = "";   //randomly selected word from word bank
var displayCharacters = [];     //array used to hold correctly guessed letters or empty spaces
var letterPressed = "";         //letter pressed by user as guess
var message = "";               //feedback to user
var winAudio = new Audio("assets/audio/crack_bat.mp3");
var youLoseAudio = new Audio("assets/audio/wrong_sound.mp3");


//for display in webpage
var currentWordText = document.getElementById("currentWord");
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var numGuessesText = document.getElementById("numGuesses");
var wrongGuessesText = document.getElementById("wrongGuesses");
var messageText = document.getElementById("message");

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
    message = "Press any letter to play a new game!";
    // Refresh the rest of the display items
    winsText.textContent = wins;
    lossesText.textContent = losses;
    numGuessesText.textContent = numGuesses;
    wrongGuessesText.textContent = wrongGuesses;
    messageText.textContent = message;


}

startUp();  //run startUp function at launch

// receives feedback from user selected keys when key is released
document.onkeyup = function (event) {

    //capture key pressed and store it in variable letterPressed
    letterPressed = event.key;

    //make sure letterPressed is a-z
    if (letterPressed.match(/[a-zA-Z]/)) {

        //check if letter has already been guessed
        if (displayCharacters.includes(event.key) || wrongGuesses.includes(event.key)) {
            message = "You already guessed that letter.  Try another one.";
        }
        //letter hasn't been guessed already
        else {

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
                    message.textContent = "";
                    wins++;
                    refresh();
                    youWin();
                }//closes if checkWord = currentWord
                else {
                    message = "Good guess!  Try another letter.";
                    numGuesses--;

                    if (numGuesses === 0) {
                        losses++;
                        youLose();
                    }

                    else {
                        //refresh the page
                        refresh();
                    }
                }
            }//closes if letterPressed is in currentWord

            //if letterPressed is NOT in currentWord
            else {
                //add letterPressed to array for Letters Already Guessed
                wrongGuesses.push(letterPressed);
                message = "Sorry, try another letter.";

                //reduce the Number of Guesses Remaining by 1
                numGuesses--;

                //check to see if there are no remaining guesses and, if so, run startUp for new game
                if (numGuesses === 0) {
                    losses++;
                    youLose();
                }

                else {
                    //refresh the page
                    refresh();
                }

            }//close else       
        } //closes else letterPressed is new
    } //closes if letterPressed is a-z
}//close onkeyup

var youWin = function () {
    winAudio.play();
    alert("You hit a home run! The word was " + currentWord + ". Press any key to play again.");
    startUp();
}


var youLose = function () {
    youLoseAudio.play();
    alert("No peanuts for you!  Press any key to play again.");
    startUp();
}

//refresh the page
var refresh = function () {
    winsText.textContent = wins;
    numGuessesText.textContent = numGuesses;
    wrongGuessesText.textContent = wrongGuesses.join(' ');
    currentWordText.textContent = displayCharacters.join(' ');
    messageText.textContent = message;

}
