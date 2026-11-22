# beforeCancel — Stop at Cancel

> Solution record · Language: JavaScript · Verified with Node.js · 2026-11-22

## 1. Problem Overview

Given an array of action names, return the actions that appear before the first `"cancel"`. Keep their order, and exclude `"cancel"` and everything after it. If there is no `"cancel"`, return all actions.

```javascript
beforeCancel(["save", "send", "cancel", "print"]) // → ["save", "send"]
```

## 2. Requirements and Constraints

- `actions` contains 0 to 20 nonempty strings of lowercase English letters, each at most 20 characters.
- Action names may repeat.
- Stop at the **first** exact `"cancel"` entry.
- Preserve the order of earlier actions.
- If `"cancel"` is absent, include every action; empty input returns `[]`.
- The function returns a new array and does not need to mutate the input.

## 3. Problem Analysis

The key boundary is the index of the first `"cancel"`. JavaScript's `indexOf` returns that index, or `-1` when there is no match. `slice(start, end)` copies entries from `start` up to, but not including, `end`. Therefore, using the cancel index as the end keeps exactly the actions before it. When no match exists, the end must be the array's length so the last item is included.

Repeated action names do not change the rule: `indexOf` identifies the first `"cancel"`, and other repeated names remain according to their positions.

## 4. Approach and Reasoning

Find the first cancel position. Choose that position as the slice boundary; if the search returns `-1`, choose the array length instead. Slice from index zero to that boundary.

This works because `slice` excludes its end index. The cancel action itself is therefore omitted, and when there is no cancel, the length boundary includes all valid indices from zero through the final index.

## 5. Logic Breakdown

1. Search for the first `"cancel"` and save its index.
2. If found, use that index as the exclusive end boundary.
3. Otherwise, use `actions.length` as the exclusive end boundary.
4. Return a slice from index `0` to that boundary.

## 6. Pseudocode

```text
FUNCTION beforeCancel(actions)
    position ← index of the first "cancel", or -1 if absent
    IF position exists
        boundary ← position
    ELSE
        boundary ← number of actions
    RETURN the items from the beginning up to boundary, excluding boundary
END FUNCTION
```

## 7. Programming Concepts

| Concept | Use |
|---|---|
| Array search | Finds the first matching action. |
| Sentinel value | `-1` signals that the search found no match. |
| Exclusive end boundary | `slice(0, end)` excludes the entry at `end`. |
| Conditional expression | Selects either the cancel position or the full array length. |
| Non-mutating array method | `slice` returns a new array and leaves `actions` unchanged. |

## 8. Implementation Notes

The submitted implementation is saved unchanged in [`solution.js`](./solution.js).

- `cancelIndex` stores the first matching position returned by `indexOf`.
- When the value is `-1`, `endIndex` becomes `actions.length`; using `length - 1` would omit the final action because `slice` excludes its end boundary.
- When a match exists, using its index as the end excludes `"cancel"` and all following entries.
- `returnVal` is assigned the result of `slice` and then returned. This is correct; directly returning the slice would be a shorter optional style change.
- The comparison uses `!=`. Since `indexOf` returns a number, strict comparison (`!==`) is a common JavaScript style improvement, but no coercion issue arises with this numeric value.

## 9. Complexity Analysis

Let `n` be the number of actions.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(n) | `indexOf` may inspect all actions; `slice` copies the returned prefix, which is also at most `n` entries. |
| Auxiliary space | O(n) | The returned slice may contain up to all `n` actions. |

## 10. Edge Cases

The examples and boundary cases below were executed against the saved `solution.js` with Node.js; all passed.

| Input | Expected output | Result |
|---|---|---|
| `["save", "send", "cancel", "print"]` | `["save", "send"]` | Passed |
| `["cancel", "save"]` | `[]` | Passed |
| `["save", "print"]` | `["save", "print"]` | Passed |
| `[]` | `[]` | Passed |
| `["save", "cancel", "cancel"]` | `["save"]` | Passed |
| `["save"]` | `["save"]` | Passed |

## 11. Possible Improvements

- Use strict inequality (`!==`) to follow JavaScript's usual comparison style.
- Return `actions.slice(0, endIndex)` directly and remove the temporary `returnVal`. These are readability choices; neither is needed for correctness.
- The search result can be stored once, as the current implementation does, avoiding a repeated `indexOf` call.

## 12. Key Takeaways

- For `slice(start, end)`, the `end` index is excluded.
- A search API's “not found” sentinel must be translated into a boundary that matches the desired fallback behavior.
- For a prefix before a matching element, that element's index is the natural exclusive end boundary.
- `slice` preserves order and does not modify the source array.
