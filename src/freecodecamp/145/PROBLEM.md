# Problem 145

## Description

Given an integer n, return the nth number in the fibonacci sequence.

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. The first 10 numbers in the sequence are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.

## Notes

Added a caching mechanism to help speed up the process for higher n values, if the function has previously been run. Obviously, I could pre-populate the cache file and obviate most of this.
