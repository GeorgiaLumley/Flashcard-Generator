var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

var cardIndex = 1;
var cardCount;
var cardsArr = [];

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
	}
};

inquirer.prompt([
	{
		type: "input",
		message: "How many Basic Flashcards would you like to make today?",
		name: "quantity"
	}
]).then(function(answers) {
	cardCount = answers.quantity;
	createBasicCard();
});