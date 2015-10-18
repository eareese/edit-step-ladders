// TODO: deal with random chars: & ' 0-9 etc

'use strict'
var fs = require('fs')

function readDictFile (filename) {
  // return an array of words from the Unix Dict file
  return fs.readFileSync(filename, 'utf8').trim().split('\n').sort()
}

function isNextWordMatch (matchString) {
  var nextWordMatcher = new RegExp('\\b' + matchString.join('\\b|\\b') + '\\b')
  return function (element) {
    return nextWordMatcher.test(element)
  }
}

function getValidNextWords (word, array) {
  var nextWordsList = []
  // TODO: find all matches
  var potentialMatches = []

  for (var i = 0; i <= word.length; i++) {
    // i can represent the newly inserted char's index
    var wordSubstring1 = word.substring(0, i)
    var wordSubstring2 = word.substring(i)

    potentialMatches.push(wordSubstring1.concat('.', wordSubstring2))
  }

  nextWordsList = array.filter(isNextWordMatch(potentialMatches))

  return nextWordsList
}

function printVertex (v) {
  console.log(v.word + ' : (' + v.edges + ')')
}

class Digraph {
  constructor (dictfile) {
    this.words = readDictFile(dictfile)

    // this.nodes = this.words.map(initializeGraph)

    this.words.forEach(function (element, index, array) {
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

console.log(graph.words.length)
