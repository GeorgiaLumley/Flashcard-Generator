var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

var cardIndex = 1;
var cardCount;
var cardsArr = [];
var quizIndex = 0;
var correctCount = 0;

var createBasicCard = function() {
	if(cardsArr.length < cardCount) {
		inquirer.prompt([
			{
				type: "input",
				message: "Front Side of Card #" + cardIndex + ":",
				name: "front"
			},
			{
				type: "input",
				message: " Back Side of Card #" + cardIndex + ":",
				name: "back"
			}
		]).then(function(answers) {
			var newCard = new BasicCard(answers.front, answers.back);
			cardsArr.push(newCard);

			newCard.printCard();

			cardIndex++;

			createBasicCard();
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
				message: cardsArr[quizIndex].getFront(),
				name: "back"
			}
		]).then(function(answers) {

			if(answers.back.toUpperCase() === cardsArr[quizIndex].getBack().toUpperCase()) {
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

inquirer.prompt([
	{
		type: "input",
		message: "How many Basic Flashcards would you like to make today?",
		name: "quantity"
	}
]).then(function(answers) {
	cardCount = answers.quantity;
	console.log("");
	console.log(" --- ===  CREATE CARDS  === ---");
	createBasicCard();
});