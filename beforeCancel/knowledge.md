# Reusable Knowledge — Slicing an Array Before a Match

## 1. Find a prefix boundary

When a task asks for all entries before a target, find the target's first index and use that index as the exclusive end of the prefix. In JavaScript, `slice(0, end)` returns entries starting at index `0` and stops before `end`.

For example, if a target is at index `2`, slicing from `0` to `2` returns indices `0` and `1`.

## 2. Handle “not found” deliberately

`indexOf` returns `-1` when it cannot find a value. Do not use `-1` directly as a slice boundary if the desired behavior is to keep the whole array. Select a fallback boundary based on the task:

| Desired result when absent | Useful end boundary |
|---|---|
| Keep the entire array | `array.length` |
| Keep no items | `0` |

Because `slice` excludes the end index, `array.length` includes the final valid index (`length - 1`).

## 3. First match versus all matches

`indexOf` finds the first matching value. This fits tasks that stop at the first occurrence. If a task requires processing all occurrences, a single first index is not enough; choose a traversal or another method that handles every match.

## 4. `slice` preserves the input

`slice` creates a shallow copy of the selected range. It preserves order and does not remove entries from the original array. Use mutating methods only when the task explicitly requires changing the input.

## 5. Checklist for prefix-by-match problems

1. Confirm whether the first match or every match matters.
2. Identify the boundary as an index, not the item before it.
3. Remember that the `slice` end is excluded.
4. Decide what to return when the target is absent.
5. Check empty input and a target at index `0`.
6. Confirm whether the original array must remain unchanged.
