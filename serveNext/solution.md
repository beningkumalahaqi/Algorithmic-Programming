# serveNext — Serve the Next Customer

> Solution record · Language: JavaScript · Verified with Node.js v24.14.0 · 2026-11-22

## 1. Problem Overview

`waiting` contains customer names ordered from first to last in line. Return a pair containing the first name and an array of everyone still waiting, keeping their order. For an empty line, return `[null, []]`.

```javascript
serveNext(["Ada", "Bo", "Cal"]) // → ["Ada", ["Bo", "Cal"]]
```

## 2. Requirements and Constraints

- `waiting` contains 0 to 20 nonempty names, each up to 20 characters.
- Names may repeat; serve only the first entry, not every matching name.
- Return `[served, remaining]`, with remaining customers in their original order.
- Empty input returns `[null, []]`.
- The input is read without mutation.

## 3. Problem Analysis

The array position determines who is first. The solution needs the item at index `0` and all items after it. `slice(1)` creates a new array starting at index 1, so it preserves the order and leaves the original `waiting` array unchanged. Repeated names do not need special handling because the function selects by position, not by name value.

The empty case must be handled separately because there is no first name. The initialized result `[null, []]` already represents the required empty-line output.

## 4. Approach and Reasoning

Start with the empty-line result. If the array has at least one element, replace that result with a two-element array: the first name and a slice containing all later names. Return the result.

This works because index `0` is exactly the first customer, and the slice beginning at index `1` contains each remaining customer once and in the same order.

## 5. Logic Breakdown

1. Initialize the result as `[null, []]`.
2. Check whether `waiting` contains at least one customer.
3. If so, set the served name to the first element and the remaining line to a slice beginning at index `1`.
4. Return the pair.

## 6. Pseudocode

```text
FUNCTION serveNext(waiting)
    result ← [null, empty list]
    IF waiting is not empty THEN
        result ← [first item, all items after the first]
    RETURN result
END FUNCTION
```

## 7. Programming Concepts

| Concept | Use |
|---|---|
| Array indexing | Reads the first name at index `0`. |
| `length` check | Distinguishes an empty line from a nonempty one. |
| `slice(1)` | Makes an ordered copy of the items after the first. |
| Conditional branching | Keeps the required empty result for an empty array. |
| Nested arrays | Represents the two outputs as `[served, remaining]`. |

## 8. Implementation Notes

The submitted implementation is saved unchanged in [`solution.js`](./solution.js).

- The nonempty branch constructs the required pair as `[waiting[0], waiting.slice(1)]`.
- `slice` does not remove elements from the source array, so `waiting` remains unchanged.
- A duplicate name later in the line remains in `remaining`; only index `0` is served.
- The result is initialized for the empty case, so the function returns `[null, []]` when `waiting.length` is zero.

## 9. Complexity Analysis

Let `n` be the number of waiting customers. `slice(1)` copies the remaining `n - 1` elements.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(n) | Creating the remaining array copies up to `n - 1` references. |
| Auxiliary space | O(n) | The returned remaining array holds up to `n - 1` references. |

## 10. Edge Cases

The examples and edge cases below were executed against the saved `solution.js` using Node.js v24.14.0; all 5 passed.

| Input | Expected output | Result |
|---|---|---|
| `["Ada", "Bo", "Cal"]` | `["Ada", ["Bo", "Cal"]]` | Passed |
| `["Ada"]` | `["Ada", []]` | Passed |
| `[]` | `[null, []]` | Passed |
| `["Ada", "Ada", "Bo"]` | `["Ada", ["Ada", "Bo"]]` | Passed |
| 20 names | First name plus the remaining 19 in order | Passed |

## 11. Possible Improvements

- `returnVal` could be declared with `const` if the empty and nonempty results were returned directly from their respective branches, or if the result were built once. In the current code it is reassigned, so `let` is appropriate.
- The condition can be formatted as `if (waiting.length > 0) {` for consistency with common JavaScript spacing. This is style only.
- No loop is needed: `slice` expresses the contiguous remainder directly and its cost is linear in the output size.

## 12. Key Takeaways

- Use an array's position when the requirement says to handle the first item, even when values can repeat.
- `slice(start)` is useful for making an ordered copy of a suffix without changing the original array.
- Account for empty input explicitly when the output has a special empty-case value.
- Returning a remainder array requires copying its elements, so account for the output-sized time and space.
