'use strict';
// This page will contain the constructors and methods/prototypes associated with them.

//--------------- CONSTRUCTORS ----------------

// Array of words

// var wordsArr = [];


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
new Word('array', 'an ordered list of values. Arrays can hold values of mixed types (example: an array storing elements with types number, string, and boolean)');

new Word('scope', 'Current context of code that determines accessibility of variables to JavaScript. There are local and global variables. Local variables are declared inside a black. Global variables are declares outside a block.');

new Word('const', 'Constants are block-scopes, similar to variables when they are declared using let keyword');

new Word('event', 'JavaScripts interaction with HTML is handled through events that occurs when the user or the browser manipulates a page.When a page loads, its called an event');

new Word('error', 'A statement indicating the program isn’t running properly. The tree main error types syntax errors, runtime errors, and logical errors');

new Word('float', 'Library that helps to use inline styles in React components. It doesnt convert styles to CSS or implement special features from CSS like pseudo - classes or media queries.It just helps to use plain inline styles and provides simple way to extend them.');

new Word('parse','Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run, for example the JavaScript engine inside browsers.');

new Word('color','Colors are typically expressed through hexadecimal codes, either prefixed using a pound sign (#) or 0x to denote base 16 values');

new Word('lists','');

new Word('links','A link (short for hyperlink) is an HTML object that allows you to jump to a new location when you click or tap it. Links are found on almost every webpage and provide a simple means of navigating between pages on the web. Links can be attached to text, images, or other HTML elements');

new Word('class','Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are not shared with ES5 class-like semantics.');

new Word('block','The block statement is often called compound statement in other languages. It allows you to use multiple statements where JavaScript expects only one statement. Combining statements into blocks is a common practice in JavaScript.');

new Word('image', 'The image object represents the HTML element.');

new Word('forms','When the page is loaded, JavaScript makes an array forms in which it puts all the forms that are on the page. The first form is forms[0] , the second is forms[1] etc. Each form has another array in which JavaScript puts all the elements in the form. The first elements is elements[0] , the second elements[1] etc');

new Word('fonts','Any design of type, including a full range of characters, as letters, numbers, and marks of punctuation, in all sizes. c. Also called typeface. the general style or appearance of type: broad or narrow face.');

new Word('icons','An icon is a glyph used to represent something else.');

new Word('align','The align attribute specifies the alignment of an <object> element according to the surrounding element. The <object> element is an inline element (it does not insert a new line on a page), meaning that text and other elements can wrap around it.');

new Word('units','Unit.js is an assertion library for Javascript, running on Node.js and the browser. It works with any test runner and unit testing framework');
