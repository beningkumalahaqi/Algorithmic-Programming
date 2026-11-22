# Solution Review — fillReadings

> Language: JavaScript · Verification: saved `solution.js` executed with Node.js v24.14.0 against 5 cases; all passed.

## 1. Overall Assessment

The solution produces the required readings for the stated input constraints. It scans the array in order, replaces nullish entries with the fallback, preserves zero, and handles an empty array. Execution verified the examples and two additional boundary cases.

## 2. Critical Issues

None found for the stated constraints.

## 3. Correctness Improvements

- `readings[i] == null` replaces both `null` and `undefined` because of JavaScript's loose equality rules. The constraints allow `null` but exclude `undefined`, so this works for valid inputs. Prefer `readings[i] === null` to encode the exact rule and avoid broadening behavior unexpectedly.
- The function mutates its argument and returns that same array. This is not prohibited by the prompt, so it is not a correctness defect, but callers should know that their original array changes.
- The condition correctly avoids a truthiness check. A check such as `if (!readings[i])` would mistakenly replace zero.

## 4. Edge Cases

| Case | Expected | Executed result |
|---|---|---|
| Example with a missing value and zero | `[12, 5, 0]` | Passed |
| All entries missing | `[-1, -1]` | Passed |
| No missing values, including zero and a negative | `[4, 0, -2]` | Passed |
| Empty array | `[]` | Passed |
| One missing value with zero fallback | `[0]` | Passed |

## 5. Performance Analysis

- **Time: O(n)** — every array entry is inspected once.
- **Auxiliary space: O(1)** — the array is modified in place; no additional collection is allocated.

The loop is appropriate for the maximum length of 20 and also scales linearly for larger arrays.

## 6. Code Quality

- `returnVal` is initialized to an empty array, then overwritten with `readings`. The initial array is unused, and the extra variable adds no value.
- `returnVal` can be replaced with a direct return of `readings` if in-place mutation is intended.
- The equality check is valid for the constraints, but strict equality (`=== null`) communicates the intended missing marker more clearly.
- Spacing in `if (readings[i] == null){` is slightly inconsistent with common JavaScript formatting.
- The loop bounds and index progression are correct, and the code preserves order.

## 7. Recommended Changes

1. **Use a strict null check** to align the implementation with the stated allowed values.
2. **Remove `returnVal`** and return `readings` directly, or construct a new output array if callers should retain the original input unchanged. The prompt does not specify mutation policy, so choose deliberately.
3. Keep the indexed loop if practicing loops; it is clear and correct for this task.

Example of the small cleanup while keeping the current in-place behavior:

```javascript
function fillReadings(readings, fallback) {
  for (let i = 0; i < readings.length; i++) {
    if (readings[i] === null) {
      readings[i] = fallback;
    }
  }
  return readings;
}
```

This is a review suggestion only; the saved submission remains unchanged.

## 8. Final Assessment

Correct for the stated constraints and verified on all three examples plus empty and single-element cases. The main learning point is to check specifically for the missing marker so that zero remains a valid reading. The only behavior to make explicit to future callers is that the function edits the input array.
