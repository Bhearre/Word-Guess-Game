var letterChoices = [];
var letterSelected = [];
var words = ["apple", "orange"];
var wins = 0;
var numGuesses = 9;
var currentWord = "";
var displayCharacters = [];

var currentWordText = document.getElementById("currentWord");
document.onkeyup = function (event) {
    // alert("I just pressed" + currentWord)
    currentWordText.textContent = event.key
}

var startup = function () {
    currentWord = words[Math.floor(Math.random() * words.length)];

    // randomize user options pick a random word from the array
    for (var i = 0; i < currentWord.length; i++) {
        displayCharacters.push("_")

    }
}
startup();