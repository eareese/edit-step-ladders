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
> ...

Resources
----
[unixdict.txt](http://www.puzzlers.org/pub/wordlists/unixdict.txt)
