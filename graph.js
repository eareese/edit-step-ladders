// TODO: deal with random chars: & ' 0-9 etc

'use strict'
var fs = require('fs')

// var FILENAME = 'unixdict.txt'
var FILENAME = 'basicdict.txt'

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

  var i, wordSubstring1, wordSubstring2
  var delCharMatches = []
  // [ 'at', 'ct', 'ca' ]
  for (i = 0; i < word.length; i++) {
    wordSubstring1 = word.substring(0, i)
    wordSubstring2 = word.substring(i + 1)
    delCharMatches.push(wordSubstring1 + wordSubstring2)
  }

  var addCharMatches = []
  // [ '.cat', 'c.at', 'ca.t', 'cat.' ]
  for (i = 0; i <= word.length; i++) {
    wordSubstring1 = word.substring(0, i)
    wordSubstring2 = word.substring(i)
    addCharMatches.push(wordSubstring1.concat('.', wordSubstring2))
  }

  var changeCharMatches = []
  // [ '.at', 'c.t', 'ca.' ]
  for (i = 0; i < word.length; i++) {
    wordSubstring1 = word.substr(0, i)
    wordSubstring2 = word.substring(i + 1)
    changeCharMatches.push(wordSubstring1.concat('.', wordSubstring2))
  }

  var potentialMatches = delCharMatches.concat(addCharMatches, changeCharMatches)
  nextWordsList = array.filter(isNextWordMatch(potentialMatches))
  return nextWordsList
}

function printVertex (v) {
  console.log(v.word + ' : (' + v.edges + ')')
}

class Graph {
  constructor () {
    this.wordList = []
    // this.nodes = this.initializeGraph(wordList)
    // this.nodes = this.words.map(initializeGraph)
    // this.words.forEach(function (element, index, array) {    }
  }

  initializeGraph (filename) {
    console.log('begin initialization...')
    this.wordList = readDictFile(filename)
    this.nodes = this.wordList.map(function (value, index, array) {
      // index + 1 here to search only "the rest" of the words array
      var nextWordsList = getValidNextWords(value, array.slice(index + 1))
      var v = new Vertex(value, nextWordsList)
      printVertex(v)
      // return new Vertex(value, nextWordsList)
      return v
    })
    console.log('initialization complete!')
    return this.nodes.length
  }
}

class Vertex {
  constructor (word, nextWordsList) {
    this.word = word
    this.edges = nextWordsList
  }
}

var graph = new Graph()
console.log(graph.initializeGraph(FILENAME))

