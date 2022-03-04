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
new Word('array', 'an ordered list of values. Arrays can hold values of mixed types (example: an array storing elements with types number, string, and boolean)');

new Word('scope', 'Current context of code that determines accessibility of variables to JavaScript. There are local and global variables.');

new Word('const', 'Const sets a variable similar to let, however const variables remain constant and unchanged.');

new Word('event', 'JavaScripts interaction with HTML is handled through events that occurs when the user or the browser manipulates a page. When a page loads, its called an event');

new Word('error', 'A statement indicating the program isn\'t running properly. The three main error types syntax errors, runtime errors, and logical errors');

new Word('float', 'Float is a CSS Property that specifies whether an element should float to the left, right, or not at all.');

new Word('parse','In our context parse has been used to change the data type of property. Example parseInt will change a data type to a number.');

new Word('color','Colors are typically expressed in hex#, RGB (red green blue) or hsl(hue saturation and lightness)values');

new Word('lists','An element in HTML denoted with either <ul> for unordered(bullet) lists, or <ol> for ordered(numbered) lists');

new Word('links','A link (short for hyperlink) is an HTML object that allows you to jump to a new location when you click or tap it. Links are found on almost every webpage and provide a simple means of navigating between pages on the web. Links can be attached to text, images, or other HTML elements');

new Word('class','class is an HTML attribute that is often used to point to a class name in a style sheet. It can also be used by JavaScript to access and manipulate elements with the specific class name.');

new Word('block','Block is an element level in HTML that always starts on a new line, and always takes up full width available. Two common examples of block-level elements are <p> and <div>.');

new Word('image', 'The image object represents the HTML element.');

new Word('forms','forms are an element in html that are used to create a form for the user to input. It can be a container for different types of input elements, such as text-fields, checkboxes, and submit buttons.');

new Word('fonts','Any design of type, including a full range of characters, as letters, numbers, and marks of punctuation, in all sizes. c. Also called typeface. the general style or appearance of type: broad or narrow face.');

new Word('icons','An icon is a glyph used to represent something else.');

new Word('align','The align attribute specifies the alignment of an <object> element according to the surrounding element. The <object> element is an inline element (it does not insert a new line on a page), meaning that text and other elements can wrap around it.');

new Word('units','units is a generic term used through CSS to adjust styles, it\'s also used in JavaScript to describe mathematic terms');

new Word('loops', 'JavaScript loops are handy for if you want to run the same code over and over again, each time with a different value.');

new Word('thead', 'The <thead> tag is used to group header content in an HTML table The <thead> element is used in conjunction with the <tbody> and <tfoot> elements to specify each part of a table (header, body, footer).');

new Word('embed', 'The <embed> tag defines a container for an external resource, such as a web page, a picture, a media player, or a plug-in application.');

new Word('aside', 'The <aside> tag defines some content aside from the content it is placed in. The aside content should be indirectly related to the surrounding content.');

new Word('right', 'The right property affects the horizontal position of a positioned element. This property has no effect on non-positioned elements.');

new Word('order', 'The order property specifies the order of a flexible item relative to the rest of the flexible items inside the same container.');

new Word('width', 'set a width of an element in CSS');

new Word('clear', 'The clear property controls the flow next to floated elements. The clear property specifies what should happen with the element that is next to a floating element.');

new Word('title', 'he <title> tag defines the title of the document. The title must be text-only, and it is shown in the browser\'s title bar or in the page\'s tab. The <title> tag is required in HTML documents!');

new Word('tfoot', 'The <tfoot> tag is used to group footer content in an HTML table. The <tfoot> element is used in conjunction with the <thead> and <tbody> elements to specify each part of a table (footer, header, body).');

new Word('tbody', 'The <tbody> tag is used to group the body content in an HTML table. The <tbody> element is used in conjunction with the <thead> and <tfoot> elements to specify each part of a table (body, header, footer).');

new Word('table', 'The <table> tag defines an HTML table. An HTML table consists of one <table> element and one or more <tr>, <th>, and <td> elements. You can use <tr> for the table row, use <th> for a table header, and use <td> for a table cell.');

new Word('style', 'The <style> tag is used to define style information (CSS) for a document.');

new Word('label', 'The <label> HTML element represents a caption for an item in a user interface, primarily used for screen readers. The for attribute of <label> must be equal to the id attribute of the related element to bind them together. A label can also be bound to an element by placing the element inside the <label> element.');
