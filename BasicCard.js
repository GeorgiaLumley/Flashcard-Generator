var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
	this.printCard = function() {
		console.log("    " + this.front + "  |  " + this.back); 
	};
};

module.exports = BasicCard;