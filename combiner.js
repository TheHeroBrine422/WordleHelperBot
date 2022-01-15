const fs = require('fs')

files = ["evilwords.json", "powerwords.json", "unlimitedwords.json"]

let words = JSON.parse(fs.readFileSync(files[0]).toString())

for (var i = 1; i < files.length; i++) {
  words = words.concat(JSON.parse(fs.readFileSync(files[i]).toString()))
}

words = [...new Set(words)]; // remove dupes

fs.writeFileSync("words.json", JSON.stringify(words))
