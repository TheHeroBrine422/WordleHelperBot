# WordleHelperBot
A Script to give suggestions for Wordle

This script comes with 4 word lists. This is set on line 4 in main.js.

If you don't know what wordlist to use, use words.json. (150kb of 5 letter words)

If you are on https://swag.github.io/evil-wordle/ use evilwords.json (125kb of 5 letter words)

If you are on https://www.powerlanguage.co.uk/wordle/ use powerwords.json (115kb of 5 letter words)

If you are on https://www.wordleunlimited.com/ use unlimitedwords.json (71kb of 5 letter words)


Basically how this script works is it uses a combination of word frequency probability by having the word list of the game, and then filtering based on the information you give it.
With this information it can make very good gusses to weed out lots of possible options, and can filter to a very small number of words in some cases.
For example with just the guess arose with it being yellow, green, yellow, grey, grey it filters the possible words from over 8 thousand to 4 words. At that point you are guaranteed to win.
Currently it works pretty well, but it's gusses will not make you win everytime. One limitation is that it always uses known letters so if you need lots of information and have 3+ green characters it will have problems.
An example of this is if you get that the last 4 characters are ared, there are 8 words that end in ared and it has no clue how to help you with this. What it/you need to do is find a word that has most of the first letters that you don't know in it to get more information. Currently there is a 2nd script that can generate good words for checking things like this but it has to be done manually. For more information look at the usage information and pictures below.

This script also gives some valuable insights even if not being used during a game.
For example, arose is the one best starting word due to it typically containing the 5 most common letters.
If all of those letters are grey then you want to use until or unlit because they typically contain 5 out of the 6 most common letters left.

These stats vary a bit based on the wordlist and the game you are playing.

It also gives this frequency chart for knowing how likely a character is to show up: (This is actually a bit out of date but it is good enough.)

```
[
  [ 's', 4649 ],
  [ 'e', 4586 ],
  [ 'a', 3991 ],
  [ 'o', 2986 ],
  [ 'r', 2918 ],
  [ 'i', 2638 ],
  [ 'l', 2442 ],
  [ 't', 2321 ],
  [ 'n', 2033 ],
  [ 'd', 1730 ],
  [ 'u', 1699 ],
  [ 'c', 1485 ],
  [ 'y', 1403 ],
  [ 'p', 1393 ],
  [ 'm', 1342 ],
  [ 'h', 1217 ],
  [ 'g', 1115 ],
  [ 'b', 1097 ],
  [ 'k', 961 ],
  [ 'f', 791 ],
  [ 'w', 693 ],
  [ 'v', 476 ],
  [ 'z', 249 ],
  [ 'x', 210 ],
  [ 'j', 186 ],
  [ 'q', 79 ]
]
```

### Installation:

1. Install a recent version of Node/NPM
  * I am using node v16.13.0 and npm v8.1.0
2. Run `npm i`

### Usage:

1. Set the wordlist based on the above information
1. Run `node main.js`
1. Follow the instructions given in the terminal.
1. If you get stuck in a situation where you have __ing and have few gusses left and many options, use lowLetterInfo.js to generate good words for knocking out many options.

##### lowLetterInfo.js Usage:

1. set wordlist to same wordlist as main.js on line 3 of lowLetterInfo.js
1. List the letters that you need to check in wantedLetters on line 4.
1. Run `node lowLetterInfo.js`

### Example Usage:

Main.js:
![picture of gameplay at https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/example.png](https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/example.png?raw=true)

lowLetterInfo.js:
![picture of lowLetterInfo at https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/lowLetterExample.png](https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/lowLetterExample.png?raw=true)


### combiner.js

This repo also contains a very simple combination script to combine the wordlists I have found into one large wordlist. Read the code if you want more information.

### TODO:
* Allow the script to recognize when there is supposed to be a character twice and filter against that. This could be very powerful in some cases but its a pain to implement and not needed in many games.
* Allow the script to realize there are lots of options and not many slots in the word and it needs to make a informational guess made of only unknown characters
* Allow for world lengths other then 5.
* Make it use current letter frequency rather then global in late game
