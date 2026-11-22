# Reusable Knowledge — Removing the First Item Without Mutation

## 1. Read a prefix and keep an ordered suffix

When a task asks for the first item and the remaining items in their original order, treat these as two parts of the same array:

- The first item is at index `0`.
- The suffix after the first item starts at index `1`.

In JavaScript, `slice(1)` returns a new array containing that suffix. It does not change the source array.

## 2. `slice` versus `shift`

| Operation | Effect | Use when |
|---|---|---|
| `arr.slice(1)` | Returns a shallow copy of entries after index 0; source is unchanged. | The caller needs the original array preserved. |
| `arr.shift()` | Removes and returns the first entry; source is changed. | The task explicitly calls for mutating/removing from the same array. |

Check the problem contract before choosing a destructive operation. A returned remainder can be made without altering the input.

## 3. Duplicates are about positions

If a queue may contain duplicate values and the task says to remove or serve one position, operate by index or position. Filtering by value can accidentally remove every matching occurrence. For example, serving the first `"Ada"` from `["Ada", "Ada", "Bo"]` should leave `["Ada", "Bo"]`.

## 4. Empty input needs a defined result

Before reading index `0`, determine what the function should return when the array has no elements. Many tasks specify a sentinel such as `null`, an empty array, `false`, or `-1`. Keep that behavior explicit so an out-of-range read does not silently become the result.

## 5. Cost of returning the remainder

Copying a suffix of an array with `slice` takes time and space proportional to the number of copied entries: O(n). If the task asks for a new remainder array, that output-sized cost is expected. A reference to the original array would avoid copying but would not represent an independent remainder.

## 6. Checklist for first-item queue tasks

1. Confirm the empty-array output.
2. Select only position zero.
3. Preserve the suffix order.
4. Check whether the input may be mutated.
5. Include duplicate values in a test so value-based filtering mistakes are visible.
6. Account for the cost of constructing the returned remainder.
