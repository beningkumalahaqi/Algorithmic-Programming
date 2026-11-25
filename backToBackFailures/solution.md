# Two Failures in a Row

> Solution record · Language: JavaScript

## 1. Problem Overview

Given `results`, an array of `"pass"` and `"fail"` strings, return `true` if any two adjacent entries are both `"fail"`; otherwise return `false`.

## 2. Requirements and Constraints

- `results` contains 0 to 20 entries.
- Fewer than two entries cannot contain an adjacent pair.
- Failures separated by a pass do not count; a run of three failures does count.

## 3. Problem Analysis

The answer depends on neighboring entries, so inspect each entry together with the one immediately after it. A lone failure is insufficient; the pair must match the condition.

## 4. Approach and Reasoning

Scan from left to right. If the current and next entries are both failures, return `true` immediately. If no pair qualifies, return `false` after the loop. The loop could stop one position earlier to avoid reading beyond the last valid index; in JavaScript, the current code's final comparison with `undefined` is safe and simply evaluates false.

## 5. Logic Breakdown

1. Visit each array index.
2. Check whether that entry and the next entry are both `"fail"`.
3. Return `true` when such a pair is found.
4. After checking all positions, return `false`.

## 6. Pseudocode

```text
FOR each position that has a following entry
    IF current entry and following entry are both failures
        RETURN true
    END IF
END FOR
RETURN false
```

## 7. Programming Concepts

| Concept | Role |
|---|---|
| Linear scan | Visits entries in order. |
| Neighbor comparison | Checks the current value against the next value. |
| Early return | Stops once a qualifying pair is found. |
| Short-circuit condition (`&&`) | Requires both comparisons to be true. |

## 8. Implementation Notes

The user's submitted function is saved verbatim in [`solution.js`](./solution.js). It compares `results[i]` and `results[i + 1]`. At the final index, `results[i + 1]` is `undefined`; because the input entries are only `"pass"` or `"fail"`, this cannot create a false match. An alternative loop bound of `i < results.length - 1` would express that only positions with a neighbor need checking, but is not required for correctness.

## 9. Complexity Analysis

- **Time:** O(n) worst case, where `n` is the number of entries; an early match can finish sooner.
- **Space:** O(1), using only the loop index.

## 10. Edge Cases

| Scenario | Expected | Reason |
|---|---:|---|
| Empty array | `false` | No entries to compare. |
| One failure | `false` | No neighbor exists. |
| Failure then failure | `true` | The adjacent pair qualifies. |
| Failures with a pass between | `false` | They are not adjacent. |
| Three failures in a row | `true` | The first two already qualify. |
| Pair at the end | `true` | The scan reaches the final valid pair. |

These cases were executed against the saved function with Node.js; see [`review.md`](./review.md).

## 11. Possible Improvements

Optional readability improvement: change the loop condition to stop at `i < results.length - 1`, since the last array element has no next neighbor. This makes the boundary explicit but does not change the result for valid inputs.

## 12. Key Takeaways

- For an adjacency condition, compare neighboring positions rather than merely counting matching values.
- A pass between two failures breaks the pair.
- Returning immediately is appropriate once the required pair is found.
