'use strict';
// This page will contain the constructors and methods/prototypes associated with them.

//--------------- CONSTRUCTORS ----------------

// Array of words

let wordsArr = [];

// word object constructor.

function Word(word, desc) {
  this.word = word;
  this.desc = desc;

  wordsArr.push(this);
}

// results object 

//--------------- CONSTRUCTOR METHODS --------------

//
