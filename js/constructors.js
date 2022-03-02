'use strict';
// This page will contain the constructors and methods/prototypes associated with them.

//--------------- CONSTRUCTORS ----------------

// Array of words

var wordsArr = [];

// word object constructor.

function Word(word, desc) {
  this.word = word;
  this.desc = desc;

  wordsArr.push(this);
}

//--------------- CONSTRUCTOR METHODS --------------

// this method capitalizes only the first letter of a word. 
Word.prototype.capitalizeFirstLetter = function() {
  return this.word.charAt(0).toUpperCase() + this.word.slice(1);
};

//-------------- INSTANTIATE WORDS -----------------

// TODO: fill in descriptions of work objects as string.
// TODO: remove and replace any words that are too generic / not programming specific
new Word('array',);
new Word('scope',);
new Word('const',);
new Word('event',);
new Word('error',);
new Word('float',);
new Word('parse',);
new Word('color',);
new Word('lists',);
new Word('links',);
new Word('class',);
new Word('block',);
new Word('image',);
new Word('forms',);
new Word('fonts',);
new Word('icons',);
new Word('align',);
new Word('units',);
