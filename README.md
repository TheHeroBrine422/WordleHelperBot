# WordleHelperBot
A Script to give suggestions for Wordle

This script comes with 4 word lists. This is set on line 4 in main.js.

If you don't know what wordlist to use, use words.json. (DEFAULT) (150kb of 5 letter words)

If you are on https://swag.github.io/evil-wordle/ use evilwords.json (125kb of 5 letter words)

If you are on https://www.powerlanguage.co.uk/wordle/ use powerwords.json (115kb of 5 letter words)

If you are on https://www.wordleunlimited.com/ use unlimitedwords.json (71kb of 5 letter words)


Basically how this script works is it uses a combination of word frequency probability by having the word list of the game, and then filtering based on the information you give it.
With this information it can make very good gusses to weed out lots of possible options, and can filter to a very small number of words in some cases.
For example with just the guess arose with it being yellow, green, yellow, grey, grey it filters the possible words from over 8 thousand to 4 words. At that point you are guaranteed to win.
Currently it works pretty well, but it's gusses will not make you win everytime. One limitation is that it always uses known letters so if you need lots of information and have 3 green characters it will have problems.

This script also gives some valuable insights even if not being used during a game.
For example, arose is the best starting word due to it containing the 5 most common letters.
If all of those letters are grey then you want to use until or unlit because they contain 5 out of the 6 most common letters left.

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

### Example Usage:

![picture of gameplay at https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/example.png](https://github.com/TheHeroBrine422/WordleHelperBot/blob/main/example.png?raw=true)

### combiner.js

This repo also contains a very simple combination script to combine the wordlists I have found into one large wordlist. Read the code if you want more information.

### TODO:
* Allow the script to recognize when there is supposed to be a character twice and filter against that. This could be very powerful in some cases but its a pain to implement and not needed in many games.
* Allow the script to realize there are lots of options and not many slots in the word and it needs to make a informational guess made of only unknown characters
* Allow for world lengths other then 5.
