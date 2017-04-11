var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
	this.printCard = function() {
		console.log("");
		console.log("    " + this.front + "  |  " + this.back);
		console.log("");
	};
};

module.exports = BasicCard;