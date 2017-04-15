# ![pageres](media/logo.png)

Use the command line to create flashcards. You can either create basic flashcards with a simple front and back, or you can opt for cloze-deleted flashcards. After creating your flashcards, the program will then quiz you. Perfect for studying!


## Usage

If you want to create basic flashcards (front and back), then simply run basicCardBonus.js by typing into the command line,

```
$ node basicCardBonus.js
```

For cloze-deleted flashcards,

```
$ node clozeCardBonus.js
```

Also, make sure to install `inquirer` before executing. You can do this by typing this into the command line before execution;

```
$ npm install
```

After execution, you will guided by the command line to begin creating your flashcards. Enjoy!

## Requirements

- Constructors for `BasicCard` (basic flashcards) and `ClozeCard` (cloze-deleted flashcards) with appropriate properties and methods
- `BasicCard` has `front` and `back` properties and appropriate methods
- `ClozeCard` has `text` and `cloze` properties, built-in validation for when the cloze-deletion is not found in the full text, and appropriate methods
- Executables for `BasicCard` (basic flashcards) and `ClozeCard` (cloze-deleted flashcards)
- Upon execution, get user input via the `inquirer` npm package for number of cards to be created, and then recursively prompt user for flashcard values
- After creation of cards is complete, quiz the user, e.g., show `front` value and the user has to type in `back` value

## Technologies Used

- JavaScript
- node.js
- `inquirer` npm package

## Code Explanation
- `BasicCard` and `ClozeCard` constructors are similar in that they have 2 main properties each; however, the `ClozeCard` constructor is more complex in that `cloze` property must be found in the full text (`text` property)
- We are modularizing our command-line app by separating the files: the logic is that each constructor is contained in its own JavaScript file, and so is each executable
- By exporting (using `module.exports`), we can link separate files
- Recursion and promises were essential to this program as it required the calling of functions but only after the user had completed certain steps, e.g. wait for user to finish input of flashcard contents

Big a-ha moment was using catching the unhandled promise rejections when the `ClozeCard` constructor failed to get created (because the cloze-deletion was not found in the full text). See below:

```js
	// catches error thrown if promise is unhandled
	then({ promise }).catch(function(err) {
		console.log("");
		console.log("     " + err);
		console.log("");

		createClozeCard();
	});
```