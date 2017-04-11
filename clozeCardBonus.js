var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

var cardIndex = 1;
var cardCount;
var cardsArr = [];
var quizIndex = 0;
var correctCount = 0;

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

			if(newCard !== undefined) {
				cardsArr.push(newCard);

				console.log("");
				console.log("    " + newCard.text.replace(cloze, "[" + cloze + "]"));
				console.log("");

				cardIndex++;

				createClozeCard();
			} else {
				createClozeCard();
			}
		});
	} else {
		console.log(" --- === QUIZ TIME === ---");
		quiz();
	}
};

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