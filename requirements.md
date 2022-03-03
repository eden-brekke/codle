# What is the vision of this product?

Programming based wordl recreation stores game data locally and functions as a terminology study guide

# What pain point does this project solve?

Creating engaging study enviornment for learning programming terminology

# Why should we care about your product?

This will help people with a variety of learning abilities retain information through a gamified study tool (good dopamine response!)

# Scope

## In what will your product do?

The app will pull a word from an array, and the user will guess letters to spell the word

The game will check the users guess against the word and provide feedback on correct letters and letter position in word

The game will store previous user data in local storage and display them in the results page

The game will include an "About Me" page which introduces all involved developers

## Out what will your product not do?

Wont include a majority of programming terms

Wont include any database integration

# Minimum viable product

Playable guessing game should tell user if the guessed letter is in word

Should store users past game play data (data meaning rounds played, win percentage, current win streak, best win streak)

A populated about me page with information about the developers

Game displays description of word on correct guess (alert or pop up box)

# Stretch goals

Chart js integration for game play data

Compatability with longer or shorter words or terms

Better pop up for results

Making nav bar display button information on hover

Keyboard typing functionality

# Functional requirements

1. User can input letters to form a guess word

2. User can view previous data on results page

3. User revieves feedback on guess to make a more informed follow up guess

# Data flow

User opens the web page and is greeted by a blank game board

- Render draws empty board game
- Game selects iniial word

User inputs first guess

- Game compares users guess against initial word
- Game re-renders board game with users guess
- Returns information on correct letters and letters at correct index location
- Game prepared for users next guess
- Game loops until correct guess or out of guesses

Game play finished

- Stores results into local storage
- If guessed correctly it would have an alert to give term definition
  - Display option to play again
- Renders results to results.html
