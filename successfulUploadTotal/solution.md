# successfulUploadTotal — Total the Successful Uploads

> Solution record · Language: JavaScript · Verified with Node.js · 2026-11-22

## 1. Problem Overview

Given a list of uploads, add the sizes of the uploads whose success flag is `true`. Each upload is represented as `[size, succeeded]`. Failed uploads contribute nothing. Return `0` when no upload succeeded.

```javascript
successfulUploadTotal([[4, true], [9, false], [2, true]]) // → 6
```

| Input | Result | Reason |
|---|---:|---|
| `[[4, true], [9, false], [2, true]]` | `6` | Add 4 and 2; skip 9. |
| `[[5, false], [2, false]]` | `0` | No upload succeeded. |
| `[[3, true], [3, true]]` | `6` | Count both successful uploads, including the repeated size. |

## 2. Requirements and Constraints

- `uploads` contains 0 to 20 entries.
- Each entry has a whole-number size from 0 to 100 megabytes and a boolean success flag.
- Add the size of every successful entry exactly once.
- Ignore failed entries, even if their size is nonzero.
- Return zero when the list is empty or contains no successful entries.
- Repeated sizes still represent separate uploads and must each count.

## 3. Problem Analysis

This is a collection traversal with a running total. Each entry can be handled independently: inspect its flag, and add its size only when the flag is true. Since sizes can repeat and every successful upload counts, deduplicating or sorting the entries would change the required result.

The accumulator starts at zero. That initial value naturally handles an empty list and a list where all uploads failed.

## 4. Approach and Reasoning

Visit each upload once. For each pair, check the boolean at index 1. If it is `true`, add the size at index 0 to the running total. After the final entry, return the total.

**Why it works:** every upload is examined once, so no successful item is missed. The conditional adds a size only for a successful upload, so failed items never affect the result. Starting at zero gives the required answer when there are no successful items.

## 5. Logic Breakdown

1. Set a running total to zero.
2. Move through the upload list by index.
3. Read the current entry's success flag.
4. If the flag is true, add that entry's size to the total.
5. Return the total after all entries have been checked.

## 6. Pseudocode

```text
FUNCTION successfulUploadTotal(uploads)
    total ← 0
    FOR each upload in uploads
        IF upload succeeded
            add its size to total
    RETURN total
END FUNCTION
```

## 7. Programming Concepts

| Concept | Role |
|---|---|
| Array traversal | Visits every upload once. |
| Nested array indexing | Reads the success flag and size from each `[size, succeeded]` pair. |
| Conditional | Keeps failed uploads out of the total. |
| Accumulator | Stores the sum built so far. |
| Strict equality | `=== true` checks the specified boolean flag without type coercion. |

## 8. Implementation Notes

The submitted implementation is saved verbatim in [`solution.js`](./solution.js).

- `globalTotalDownload` starts at zero and is updated only when the current upload's flag is `true`.
- `uploads[i][1]` is the success flag; `uploads[i][0]` is the size. The two-dimensional indexing correctly selects a field from the current upload.
- The code uses a `for` loop and a mutable accumulator. This is appropriate for a small beginner exercise and follows the required logic directly.
- The name `globalTotalDownload` is longer than necessary and says “download” even though the problem totals uploads. A name such as `total` would better describe its role. This is a readability suggestion only; the current name does not affect correctness.
- Spacing and semicolons are inconsistent around the addition. Consistent formatting would make the code easier to scan, but no behavior change is needed.

## 9. Complexity Analysis

Let `n` be the number of uploads.

| Measure | Complexity | Reason |
|---|---|---|
| Time | O(n) | Each upload is checked once, with constant work per entry. |
| Auxiliary space | O(1) | The function keeps only the loop index and running total; it does not build another collection. |

## 10. Edge Cases

The implementation was executed with Node.js against the three provided examples and three additional boundary cases. All six returned the expected totals.

| Case | Input | Expected | Observed |
|---|---|---:|---:|
| Provided mixed outcomes | `[[4, true], [9, false], [2, true]]` | `6` | `6` |
| Provided, all failed | `[[5, false], [2, false]]` | `0` | `0` |
| Provided repeated sizes | `[[3, true], [3, true]]` | `6` | `6` |
| Empty list | `[]` | `0` | `0` |
| Successful zero-size upload | `[[0, true]]` | `0` | `0` |
| Two maximum-size successes | `[[100, true], [100, true]]` | `200` | `200` |

## 11. Possible Improvements

1. Rename `globalTotalDownload` to `total` or `successfulTotal`. The variable is local to the function, and the shorter name describes the value being accumulated.
2. Apply one consistent spacing and semicolon style. This is a formatting improvement, not a correction required for the stated inputs.

The algorithm already does the necessary work in one pass. Sorting, filtering into a second array, or removing duplicate sizes would add work or violate the requirement to count every successful upload.

## 12. Key Takeaways

- For a sum over selected items, use an accumulator that starts at the additive identity, zero.
- Check each item's property before adding its value when only qualifying items count.
- Preserve duplicates when each list entry represents a separate event or item.
- If a list may be empty, an accumulator initialized to zero often handles that boundary naturally.
