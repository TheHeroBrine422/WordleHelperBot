const fs = require('fs')
const rl = require('readline-sync')

let words = JSON.parse(fs.readFileSync("unlimitedwords.json").toString())
let charset = "abcdefghijklmnopqrstuvwxyz"
let validWords = []
let freq = {}
let selectedGuess = ""
let values = ""
let badChars = ""
let yellowChars = ""
let greenChars = ["","","","",""]
let allowDouble = false
let yellowPositions = [] // ["char", column]
let debug = false

function compareSecondColumn(a, b) { // https://stackoverflow.com/a/16097058/5038158
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}

Object.defineProperties(Array.prototype, { // https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
    count: {
        value: function(query) {
            /*
               Counts number of occurrences of query in array, an integer >= 0
               Uses the javascript == notion of equality.
            */
            var count = 0;
            for(let i=0; i<this.length; i++)
                if (this[i]==query)
                    count++;
            return count;
        }
    }
});

temp = []

for (var i = 0; i < words.length; i++) {
  if (words[i].length == 5) {
    temp.push(words[i])
  }
}

words = temp

function getValidWords() {
  validWords = []
  yellowChars += greenChars.join('')
  for (var i = 0; i < words.length; i++) {
    valid = true
    for (var j = 0; j < greenChars.length; j++) {
      if (!(greenChars[j] == "" || greenChars[j] == words[i].charAt(j))) {
        valid = false
        break
      }
    }

    if (!valid) {continue}

    for (var j = 0; j < badChars.length; j++) {
      if (words[i].indexOf(badChars[j]) > -1) {
        valid = false
        break
      }
    }

    if (!valid) {continue}

    for (var j = 0; j < yellowChars.length; j++) {
      if (words[i].indexOf(yellowChars[j]) < 0) {
        valid = false
        break
      }
    }

    if (!valid) {continue}

    if (!allowDouble) {
      for (var j = 0; j < words[i].length; j++) {
        for (var k = j+1; k < words[i].length; k++) {
          if (words[i].charAt(j) == words[i].charAt(k)) {
            valid = false
            break
          }
        }
      }

      if (!valid) {continue}
    }

    for (var j = 0; j < yellowPositions.length; j++) {
      if (words[i].charAt(yellowPositions[j][1]) == yellowPositions[j][0]) {
        valid = false
        break
      }
    }

    if (!valid) {continue}

    if (valid) {
      validWords.push(words[i])
    }
  }

  for (var i = 0; i < charset.length; i++) { // create freq sorted 2d array
    freq[charset.charAt(i)] = 0
  }

  for (var i = 0; i < validWords.length; i++) {
    for (var j = 0; j < validWords[i].length; j++) {
      freq[validWords[i].charAt(j)]++
    }
  }

  scoredValidWords = []

  for (var i = 0; i < validWords.length; i++) {
    score = 0
    for (var j = 0; j < validWords[i].length; j++) {
      score += freq[validWords[i].charAt(j)]
    }
    scoredValidWords.push([validWords[i],score])
  }

  validWords = JSON.parse(JSON.stringify(scoredValidWords)) // making sure its fully pass by value

  validWords.sort(compareSecondColumn);
}

function getInput() {
  process.stdout.write("Enter your selected guess: ")
  selectedGuess = rl.question().toLowerCase()
  process.stdout.write("Enter the values of your guess: ")
  values = rl.question()
  if (selectedGuess.length != 5 || values.length != 5 || !/[a-z]/.test(selectedGuess) || !/[0-9]/.test(values)) {
    console.log("Invalid Input. Please try again.\n")
    getInput()
  } else {
    selectedGuess = selectedGuess.split('')
    values = values.split('')
  }
}

console.log("Wordle Helper:\n\nExample for entering guesses:\n\nEnter your selected guess: arose\nEnter the values of your guess: 12100\n\nThat means that AO are yellow, R is green, and SE are grey.\n")

for (var j = 0; j < 10; j++) {
  getValidWords()
  if (validWords.length < 15 && !allowDouble) {
    console.log("Allowing Doubles")
    allowDouble = true
    getValidWords()
  }
  for (var i = Math.min(25, validWords.length)-1; i > -1; i--) {
    console.log(validWords[i])
  }
  console.log("Possible Words: "+validWords.length)
  getInput()
  for (var i = 0; i < selectedGuess.length; i++) {
    if (values[i] == '2') {
      greenChars[i] = selectedGuess[i]
    } else if (values[i] == '1') {
      yellowChars += selectedGuess[i]
      yellowPositions.push([selectedGuess[i], i])
    } else if (values[i] == '0') {
      if (selectedGuess.count(selectedGuess[i]) > 1) { // if there is more then one of the character in the array check to make sure none of the other characters are good so it doesnt get added to badChars
        valid = true
        for (var k = 0; k < selectedGuess.length; k++) {
          if (k != i) {
            if (selectedGuess[k] == selectedGuess[i] && values[k] != '0') {
              valid = false
              break
            }
          }
        }
        if (valid) {
          badChars += selectedGuess[i]
        }
      } else {
        badChars += selectedGuess[i]
      }
    }
  }

  if (debug) {
    console.log(badChars)
    console.log(yellowChars)
    console.log(greenChars)
    console.log(yellowPositions)
  }
}
