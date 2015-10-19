'use strict'
var fs = require('fs')

function readDictFile (filename) {
  var words = fs.readFileSync(filename, 'utf8').trim().split('\n').sort()
  // filter out any word containing non-alpha characters
  return words.filter(function (item) {
    return /^([a-z]+)$/.test(item)
  })
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
  // var expExample = /^at$|^ct$|^ca$|.../
  var expBegin = /^/
  var expMiddle = potentialMatches.join('$|^')
  var expEnd = /$/

  var matchRe = new RegExp(expBegin.source + expMiddle + expEnd.source)
  var nextWordsList = array.filter(RegExp.prototype.test.bind(matchRe))
  return nextWordsList
}

function Graph (filename) {
  this.nodes = []
  this.wordList = readDictFile(filename)
}
Graph.prototype.initializeGraph = function () {
  this.nodes = this.wordList.map(function (word, index, array) {
    // index + 1 here to search only "the rest" of the words array
    var nextWordsList = getValidNextWords(word, array.slice(index + 1))
    var v = new Vertex(index, word, nextWordsList)
    return v
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
  var pathLengths = new Array(g.nodes.length)
  pathLengths.fill(0)

  g.nodes.forEach(function (vertex, vindex, array) {
    vertex.edges.forEach(function (element, index, array) {
      var w = g.findByWord(element)
      var v = vindex
      if (pathLengths[w] <= pathLengths[v] + 1) {
        pathLengths[w] = pathLengths[v] + 1
      }
    })
  })
  var max = Math.max.apply(Math, pathLengths)
  return max
}

// default filename to use
var filename = 'basicdict.txt'

// use first input arg as filename, if such a file exists
var inputArgs = process.argv.slice(2)
if (inputArgs.length > 0) {
  var stats = fs.statSync(inputArgs[0])
  if (stats.isFile()) {
    filename = inputArgs[0]
  }
}

var graph = new Graph(filename)
graph.initializeGraph()
// toposort will return the length of the longest PATH, but we want
// to return the number of nodes or words in the longest path.
var result = toposort(graph) + 1
console.log(result)
