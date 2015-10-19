// TODO: deal with random chars: & ' 0-9 etc
// TODO: finish!!!!

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
  var nextWordsList = array.filter(isNextWordMatch(potentialMatches))
  return nextWordsList
}

function Graph (filename) {
  this.nodes = []
  this.wordList = readDictFile(filename)
  console.log('--- graph instantiated. ---')
}
Graph.prototype.initializeGraph = function () {
  this.nodes = this.wordList.map(function (word, index, array) {
    // index + 1 here to search only "the rest" of the words array
    var nextWordsList = getValidNextWords(word, array.slice(index + 1))
    var v = new Vertex(index, word, nextWordsList)
    return v
  })
}
Graph.prototype.print = function () {
  this.nodes.forEach(function (element, index, array) {
    console.log('[' + index + '] ' + element.word + ': ' + element.edges)
  })
}
Graph.prototype.findByWord = function (word) {
  var result = -1
  this.nodes.forEach(function (element, index, array) {
    if (element.word === word) {
      result = index
    }
  })
  return result
}

function Vertex (index, word, nextWords) {
  this.index = index
  this.word = word
  this.edges = nextWords
  this.marked = false
}
Vertex.prototype.setMarked = function (newValue) {
  this.marked = newValue
}

function toposort (g) {
  var specialArray = new Array(g.nodes.length)
  specialArray.fill(0)
  console.log('test:')
  console.log(g.findByWord('log'))

  g.nodes.forEach(function (vertex, vindex, array) {
    console.log('[' + vindex + '] ' + vertex.word)

    vertex.edges.forEach(function (element, index, array) {
      var w = g.findByWord(element)
      var v = vindex
      console.log('[' + vindex + '] ' + '::' + element + '(' + w + ')')
      if (specialArray[w] <= specialArray[v]) {
        specialArray[w] = specialArray[v]
      }
    })
  })
  var max = Math.max.apply(Math, specialArray)
  return max
}

var graph = new Graph(FILENAME)
graph.initializeGraph()
graph.print()
var result = toposort(graph)
console.log(result)
