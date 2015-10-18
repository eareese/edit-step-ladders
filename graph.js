'use strict'
var fs = require('fs')

function readDictFile (filename) {
  // return an array of words from the Unix Dict file
  return fs.readFileSync(filename, 'utf8').trim().split('\n').sort()
}

function getValidNextWords (word, array) {
  var nextWordsList = []
  var potentialMatches = []

  for (var i = 0; i <= word.length; i++) {
    // i can represent the newly inserted char's index
    var wordSubstring1 = word.substring(0, i)
    var wordSubstring2 = word.substring(i)

    potentialMatches.push(wordSubstring1.concat('.', wordSubstring2))
  }

  array.forEach(function (element, index, array) {
    // find any word in "remaining dictionary" that matches my regexp
    // if (new RegExp('\\b' + '.' + word + '\\b').test(element)) {
    if (new RegExp('\\b' + potentialMatches.join('\\b|\\b') + '\\b').test(element)) {
      nextWordsList.push(element)
    }
  })

  return nextWordsList
}

function printVertex (v) {
  console.log(v.word + ' : (' + v.edges + ')')
}

class Digraph {
  constructor (dictfile) {
    this.dictArray = readDictFile(dictfile)
    this.dictArray.forEach(function (element, index, array) {
      // for each word, get the array of valid next words and create the vertex.
      var nextWordsList = getValidNextWords(element, array.slice(index))
      var v = new Vertex(element, nextWordsList)
      printVertex(v)
    })
  }
}

class Vertex {
  constructor (word, nextWordsList) {
    this.word = word
    this.edges = nextWordsList
  }
}

var graph = new Digraph('unixdict.txt')

console.log(graph.dictArray.length)
