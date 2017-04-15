var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;

	// getter functions as this is best practice
	this.getFront = function() {
		return this.front;
	};
	this.getBack = function() {
		return this.back;
	};

	// method for printing card contents in command line
	this.printCard = function() {
		console.log("");
		console.log("    " + this.getFront() + "  |  " + this.getBack());
		console.log("");
	};
};

// for linking despite separation of files
module.exports = BasicCard;