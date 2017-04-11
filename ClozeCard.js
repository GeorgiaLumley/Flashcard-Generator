var ClozeCard = function(text, cloze) {
	if(text.search(cloze) === -1) {
		console.log("The cloze deletion does not appear in the full text");
	} else {
		this.text = text;
		this.cloze = cloze;
		
		this.getFullText = function() {
			return this.text;
		};
		this.getCloze = function() {
			return this.cloze;
		};
		this.getPartial = function() {
			return this.text.replace(cloze, "...");
		};
	}
};

module.exports = ClozeCard;