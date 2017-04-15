// required modules for constructor and inquirer package
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

// global variables
var cardIndex = 1;
var cardCount;
var cardsArr = [];
var quizIndex = 0;
var correctCount = 0;

// initial inquiry of number of cards to create
var init = function() {
	inquirer.prompt([
		{
			type: "input",
			message: "How many Cloze-Deleted Flashcards would you like to make today?",
			name: "quantity"
		}
	]).then(function(answers) {
		if(isNaN(answers.quantity) === false) {
			cardCount = answers.quantity;
			console.log("");
			console.log(" --- ===  CREATE CARDS  === ---");
			createClozeCard();
		} else {
			console.log("Sorry, you must enter a number.");
			console.log("");
			init();
		}
	});
};

// main card-creation function
var createClozeCard = function() {
	if(cardsArr.length < cardCount) {
		inquirer.prompt([
			{
				type: "input",
				message: "     Full Text of Card #" + cardIndex + ":",
				name: "text"
			},
			{
				type: "input",
				message: "Cloze Deletion of Card #" + cardIndex + ":",
				name: "cloze"
			}
		]).then(function(answers) {
			var newCard = new ClozeCard(answers.text, answers.cloze);

			cardsArr.push(newCard);

			var clozeStartIndex = newCard.getFullText().toUpperCase().indexOf(newCard.getCloze().toUpperCase());
			var clozeLength = newCard.getCloze().length;
			// console.log(clozeStartIndex, clozeLength);

			console.log("");
			console.log("    " + newCard.getFullText().replace(newCard.getFullText().substring(clozeStartIndex, clozeStartIndex + clozeLength), "[" + newCard.getFullText().substring(clozeStartIndex, clozeStartIndex + clozeLength) + "]"));
			console.log("");

			cardIndex++;

			createClozeCard();
		// catches error thrown if promise is unhandled
		}).catch(function(err) {
			console.log("");
			console.log("     " + err);
			console.log("");

			createClozeCard();
		});
	} else {
		console.log(" --- === QUIZ TIME === ---");
		quiz();
	}
};

// quiz user after cards have been created
var quiz = function() {
	if(quizIndex < cardCount) {
		inquirer.prompt([
			{
				type: "input",
				message: cardsArr[quizIndex].getPartial(),
				name: "cloze"
			}
		]).then(function(answers) {

			if(answers.cloze.toUpperCase() === cardsArr[quizIndex].getCloze().toUpperCase()) {
				correctCount++;
				console.log("");
				console.log("    Correct!");
				console.log("");
			} else {
				console.log("");
				console.log("    Incorrect!");
				console.log("");
			}

			quizIndex++;

			quiz();
		});
	} else {
		console.log(" --- ===  RESULTS  === ---");
		console.log("Correct: " + correctCount + "  |  " + "Incorrect: " + (cardCount - correctCount));
		console.log("");
	}
};

console.log("");
console.log(" --- ===  WELCOME  === ---");

init();