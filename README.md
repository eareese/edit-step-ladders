Edit Step Ladders
====

Usage
----
Use [Node.js](https://nodejs.org/en/) to run `edit-step-ladders.js` with no arguments to process the default test file, `basicdict.txt`:
```
# node edit-step-ladders.js
```

Or, include a filename as an argument to process those words instead:
```
node edit-step-ladders.js unixdict.txt
```

About
----
This program identifies the number of words in the longest path of edit steps, as described below in the problem statement. It takes optional user input in the form of a filename for a dictionary, which is also described in the problem statement. After reading and processing either the default dictionary or a user-supplied file, a modified depth-first search algorithm is performed to pick the longest path.

Problem statement
----
> Edit Step Ladders

> An edit step is a transformation from one word X to another word Y such that X and Y are words in the dictionary, and X can be transformed to Y by adding, deleting, or changing one letter.  The transformations from “dig" to “dog" and from “dog" to “do" are both edit steps. An edit step ladder is a lexicographically sorted set of words W1 , W2 , . . . , Wn such that the transformation from Wi to Wi+1 is an edit step for all i from 1 to n − 1.

> For a given dictionary, you are to compute the length of the longest edit step ladder.

> Input  
> The input to your program consists of the dictionary: a set of lowercase words sorted in lexicographic order at one word per line. No word exceeds 16 letters and there are at most 25,000 words in the dictionary.

> Output  
> The output consists of a single integer, the number of words in the longest edit step ladder.

> Sample Input  
> cat  
> dig  
> dog  
> fig  
> fin  
> fine  
> fog  
> log  
> wine  

> Expected Sample Output
> 5

Resources
----
[unixdict.txt](http://www.puzzlers.org/pub/wordlists/unixdict.txt)
