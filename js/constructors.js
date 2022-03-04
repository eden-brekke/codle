'use strict';
// This page will contain the constructors and methods/prototypes associated with them.

//--------------- CONSTRUCTORS ----------------

// Array of words

// word object constructor.

function Word(word, desc) {
  this.word = word;
  this.desc = desc;

  Word.wordsArr.push(this);
}

Word.wordsArr = [];

//--------------- CONSTRUCTOR METHODS --------------

// this method capitalizes only the first letter of a word. 
Word.prototype.capitalizeFirstLetter = function () {
  return this.word.charAt(0).toUpperCase() + this.word.slice(1);
};

//-------------- INSTANTIATE WORDS -----------------

// TODO: fill in descriptions of work objects as string.
// TODO: remove and replace any words that are too generic / not programming specific
new Word('array', 'an ordered list of values. Arrays can hold values of mixed types (example: an array storing elements with types number, string, and boolean).');

new Word('scope', 'Current context of code that determines accessibility of variables to JavaScript. There are local and global variables.');

new Word('const', 'Const sets a variable similar to let, however const variables remain constant and unchanged.');

new Word('event', 'JavaScripts interaction with HTML is handled through events that occurs when the user or the browser manipulates a page. When a page loads, its called an event.');

new Word('error', 'A statement indicating the program isn\'t running properly. The three main error types syntax errors, runtime errors, and logical errors.');

new Word('float', 'Float is a CSS Property that specifies whether an element should float to the left, right, or not at all.');

new Word('parse','In our context parse has been used to change the data type of property. Example parseInt will change a data type to a number.');

new Word('color','Colors are typically expressed in hex#, RGB (red green blue) or hsl(hue saturation and lightness)values.');

new Word('lists','An element in HTML denoted with either <ul> for unordered(bullet) lists, or <ol> for ordered(numbered) lists.');

new Word('links','A link (short for hyperlink) is an HTML object that allows you to jump to a new location when you click or tap it. Links are found on almost every webpage and provide a simple means of navigating between pages on the web. Links can be attached to text, images, or other HTML elements.');

new Word('class','class is an HTML attribute that is often used to point to a class name in a style sheet. It can also be used by JavaScript to access and manipulate elements with the specific class name.');

new Word('block','Block is an element level in HTML that always starts on a new line, and always takes up full width available. Two common examples of block-level elements are <p> and <div>.');

new Word('image', 'The image object represents the HTML element.');

new Word('forms','forms are an element in html that are used to create a form for the user to input. It can be a container for different types of input elements, such as text-fields, checkboxes, and submit buttons.');

new Word('fonts','Any design of type, including a full range of characters, as letters, numbers, and marks of punctuation, in all sizes. c. Also called typeface. the general style or appearance of type: broad or narrow face.');

new Word('icons','An icon is a glyph used to represent something else.');

new Word('align','The align attribute specifies the alignment of an <object> element according to the surrounding element. The <object> element is an inline element (it does not insert a new line on a page), meaning that text and other elements can wrap around it.');

new Word('units','units is a generic term used through CSS to adjust styles, it\'s also used in JavaScript to describe mathematic terms.');

new Word('loops','JavaScript loops are handy for if you want to run the same code over and over again, each time with a different value.');












































new Word('while', 'A while loop executes a block of code within its brackets as long as a specified condition evaluates true.');
new Word('split', 'The split method returns an array of the index characters in a string, without changing the original string.');
new Word('shift', 'The shift element removes the first item of an array, And returns it.');
new Word('slice', 'The slice method returns selected elements in an array, as a new array.');
new Word('false', 'A boolean value, opposite of true.');
new Word('index', 'An index is the position of a character with a dataset, like a string, or array. Remember, JavaScript is zero indexed, so the first character of any object is a zero.');
new Word('floor', 'A function of Math. that returns the largest integer less than or equal to a given number.');
new Word('round', 'A function of Math. that rounds a number to the nearest integer.');
new Word('break', 'A break statement will cause the interpreter to exit or break out of a loop.');
new Word('throw', 'The throw statement allows you to create a custom error message.');
new Word('catch', 'A catch statement defines a code block to handle any error.');
new Word('match', 'A string method that checks if the argument given to it is within a given string.');
new Word('input', 'Specifies an input field where the user can enter data, within HTML.');




