# Problem 1813

## Description

You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
You should be as efficient with time and space as possible.

## Considerations

1. Data Structure Choice

Circular buffer / Ring buffer is the classic solution here
Fixed size array of N elements
Keep track of the current position with a pointer
When full, wrap around and overwrite oldest entries

2. Time Complexity Goals

record(order_id): Should be O(1) - just write to current position
get_last(i): Should be O(1) - calculate the index and return

3. Space Complexity

Fixed O(N) space - no growing arrays needed
This is the "efficient with space" requirement

4. Tricky Parts

Index calculation for get_last(i): When i=1, you want the most recent. When i=N, you want the oldest still in the buffer
Need to handle the wraparound correctly: (current_position - i + N) % N
Edge cases before buffer is full: If you've only recorded 5 items but N=100, get_last(10) shouldn't work (or should it return undefined?)
Do indices start at 0 or 1? The problem says "ith last element" which sounds like 1-indexed

5. Implementation Details

Use an array of fixed size N
Track current write position
Track how many items have been written (to handle partial fills)
Consider what get_last(i) returns if buffer isn't full yet

6. Alternative Approaches (less optimal)

Array with shift/push: O(n) for record if you maintain order
Linked list: O(n) for get_last
Deque: Could work but more complex than needed

Questions to Clarify

Is get_last(1) the most recent or is it 0-indexed?
What should get_last(i) return if fewer than i items have been recorded?
Can order_id be any type or just numbers/strings?
