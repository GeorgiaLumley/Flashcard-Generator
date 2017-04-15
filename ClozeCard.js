var ClozeCard = function(text, cloze) {
	var textWordsArr = text.split(" ");

	var clozeFound = false;

	for(var i = 0; i < textWordsArr.length; i++) {
		if(textWordsArr[i].toUpperCase() === cloze.toUpperCase()) {
			clozeFound = true;
		} else if(textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + "?") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ".") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + "!") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ",") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ";") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ":")) {
			clozeFound = true;
		}
	}

	if(clozeFound === false) {
		throw "The cloze deletion does not appear in the full text. Please try again.";
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
			return text.replace(cloze, "...");
		};
	}
};

module.exports = ClozeCard;