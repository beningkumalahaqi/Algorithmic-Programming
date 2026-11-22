# fillReadings — Fill Missing Readings

> Solution record · Language: JavaScript · Verified with Node.js v24.14.0

## 1. Problem Overview

Given an array of integer readings that may contain `null`, return the readings in the same order with each missing entry replaced by `fallback`. Zero is a real reading and must remain zero.

```javascript
fillReadings([12, null, 0], 5) // → [12, 5, 0]
```

## 2. Requirements and Constraints

- `readings` has 0 to 20 entries; each entry is an integer from -100 to 100 or `null`.
- `fallback` is an integer from -100 to 100.
- Preserve the order and all non-null readings, including zero.
- An empty input returns an empty array.
- The statement does not specify whether the input array may be mutated.

## 3. Problem Analysis

Each input position maps to one output position. The decision is whether that position contains the missing marker. A truthiness check would be wrong because JavaScript treats `0` as falsy. The check must distinguish `null` from numeric values.

## 4. Approach and Reasoning

Scan the array from its first index to its last. For each entry, replace it with the fallback only when it is `null`. Because each position is handled in place, the original order is preserved. The empty array naturally performs zero loop iterations.

## 5. Logic Breakdown

1. Start the index at zero.
2. Continue while the index is less than the array length.
3. If the current entry is `null`, assign the fallback at that position.
4. Return the readings array.

## 6. Pseudocode

```text
FUNCTION fillReadings(readings, fallback)
    FOR each position from first to last
        IF the reading at that position is null
            replace it with fallback
    RETURN readings
END FUNCTION
```

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Indexed `for` loop | Visits every position in order. |
| Array length | Sets the loop's stopping boundary. |
| Null check | Identifies the missing marker without treating zero as missing. |
| In-place update | Replaces the missing value in the existing array. |

## 8. Implementation Notes

The submitted code is preserved verbatim in [`solution.js`](./solution.js). It was run with Node.js v24.14.0 against the three examples, an empty array, and a single missing value; all 5 cases produced the expected arrays.

The implementation mutates `readings` and returns the same array reference. That matches the requested output values; mutation is not addressed by the problem statement. The condition `== null` matches both `null` and `undefined` in JavaScript, while the input constraints promise only integers or `null`. A strict `=== null` check would express the stated contract more precisely.

## 9. Complexity Analysis

**Time: O(n)** — the loop visits each of the `n` entries once.
**Auxiliary space: O(1)** — only the loop index and a reference are used; the existing array is updated rather than copied.

## 10. Edge Cases

The cases below were executed against the saved function.

| Input | Expected | Result |
|---|---|---|
| `[12, null, 0]`, fallback `5` | `[12, 5, 0]` | Passed |
| `[null, null]`, fallback `-1` | `[-1, -1]` | Passed |
| `[4, 0, -2]`, fallback `9` | `[4, 0, -2]` | Passed |
| `[]`, fallback `7` | `[]` | Passed |
| `[null]`, fallback `0` | `[0]` | Passed |

## 11. Possible Improvements

- Use `readings[i] === null` to match the allowed missing value exactly.
- `returnVal` is unnecessary because the function can return `readings` directly. This does not change the in-place behavior.
- If callers should keep their original input unchanged, build and return a new array instead. The problem statement does not require either mutation policy, so this is a design choice rather than a correctness fix.

## 12. Key Takeaways

- Use an explicit missing-value check when zero is valid data; truthiness does not distinguish zero from absence.
- A single forward pass is enough when each output depends only on the corresponding input entry.
- Be aware whether a function edits its input or creates a new result; both can produce the same values while having different side effects.
