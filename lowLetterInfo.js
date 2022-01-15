const fs = require('fs')

let words = JSON.parse(fs.readFileSync("unlimitedwords.json").toString())
let wantedLetters = "bghzmw"
let scoredWords = []

function removeDuplicateCharacters(string) { // https://grabthiscode.com/javascript/javascript-remove-duplicate-letters-in-a-string
  return string
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
}

wantedLetters = removeDuplicateCharacters(wantedLetters)

function compareSecondColumn(a, b) { // https://stackoverflow.com/a/16097058/5038158
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}

temp = []

for (var i = 0; i < words.length; i++) {
  if (words[i].length == 5) {
    temp.push(words[i])
  }
}

words = temp

for (var i = 0; i < words.length; i++) {
  score = 0
  for (var j = 0; j < wantedLetters.length; j++) {
    if (words[i].indexOf(wantedLetters.charAt(j)) > -1) {
      score++
    }
  }
  scoredWords.push([words[i], score])
}

scoredWords.sort(compareSecondColumn);

for (var i = Math.min(25, scoredWords.length)-1; i > -1; i--) {
  console.log(scoredWords[i])
}
