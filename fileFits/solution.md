# fileFits — Does a File Fit in Remaining Drive Space

> Solution record · Language: JavaScript · Verified with Node.js v24.22.1 · 2026-11-16

## 1. Problem Overview

A drive has a total `capacity` in megabytes, of which `used` megabytes are already taken. Given a file of `size` megabytes, decide whether the file can be stored on the drive. The drive may be filled **exactly** — the file fits if the resulting total equals capacity.

```javascript
fileFits(capacity, used, size) // → true | false
```

| Call | Result | Why |
|---|---|---|
| `fileFits(100, 70, 20)` | `true` | 70 + 20 = 90 ≤ 100 |
| `fileFits(100, 70, 30)` | `true` | 70 + 30 = 100 — exact fill is allowed |
| `fileFits(100, 70, 31)` | `false` | 70 + 31 = 101 > 100 |

## 2. Requirements and Constraints

- Inputs: three whole numbers `capacity`, `used`, `size`, each in **[0, 1000]**.
- Invariant: `used ≤ capacity` — the drive is never over-committed before the write.
- Output: `true` if the file fits, otherwise `false`.
- Exact fill counts as fitting.
- A zero-size file needs no extra space and always fits.

## 3. Problem Analysis

- The decision depends only on the **free space**: `free = capacity - used`.
- The file fits iff `size ≤ free`, equivalently `used + size ≤ capacity`.
- "Filling the drive exactly is allowed" fixes the comparison as **inclusive** (`≤`, not `<`).
- Single decision, no iteration, no state — no data structures needed.
- The zero-size rule needs no special case: since `used ≤ capacity`, free space is `≥ 0`, so `0 ≤ free` always holds.

## 4. Approach and Reasoning

**Main idea:** reduce the problem to one arithmetic condition and return it.

**Why it works:** writing the file changes the used amount from `used` to `used + size`. The write is legal iff the new amount does not exceed capacity — that is exactly the comparison, and the inclusive form accepts the exact-fill boundary.

**Tradeoffs:** the two equivalent forms (`size ≤ capacity - used` vs `used + size ≤ capacity`) are interchangeable here. All values are ≤ 1000, so JavaScript's number semantics introduce no overflow or precision concern.

**Fit with constraints:** an O(1) comparison is optimal — every input value can change the answer, so no algorithm can do less than one comparison.

## 5. Logic Breakdown

1. Receive `capacity`, `used`, `size`.
2. Compute the remaining free space `capacity - used` (or the post-write total `used + size`).
3. Compare the file size against free space with an inclusive bound.
4. Return the result of that comparison as the boolean answer.

## 6. Pseudocode

```text
FUNCTION fileFits(capacity, used, size)
    RETURN size ≤ capacity - used
END FUNCTION
```

Equivalent formulation:

```text
FUNCTION fileFits(capacity, used, size)
    RETURN used + size ≤ capacity
END FUNCTION
```

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Arithmetic expression | `capacity - used` derives the free space from two inputs. |
| Relational comparison | `≤` encodes the fit condition, including the exact-fill boundary. |
| Boolean-valued expression | In JavaScript a comparison **is** a boolean value, so it can be returned directly. |
| Inclusive vs. strict bounds | Choosing `≤` instead of `<` is the core correctness decision. |
| Invariant exploitation | The guaranteed `used ≤ capacity` makes the zero-size rule automatic — no defensive branch. |

## 8. Implementation Notes

Implementation authored and submitted by the user, saved verbatim in [`solution.js`](./solution.js) (reviewed and executed — all cases passed):

```javascript
function fileFits(capacity, used, size) {
  let returnVar 
  
  if (size <= capacity - used){
    returnVar = true
  } else {
    returnVar = false
  }
  return returnVar;
}
```

Key points:

- The condition `size <= capacity - used` is **correct**, including the exact-fill boundary.
- The `if/else` that assigns `true`/`false` to `returnVar` is redundant — the comparison already evaluates to a boolean. The body can be a single `return` of the comparison. *(Recommended in review; not yet applied as of this record.)*
- No branch is needed for `size === 0`: it follows from the invariant `used ≤ capacity`.
- No overflow handling is needed: all inputs are ≤ 1000.

## 9. Complexity Analysis

**Time:** a fixed subtraction and comparison, independent of input values → O(1).
**Space:** one scalar local variable (and none in the simplified form) → O(1), auxiliary.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(1) | Constant number of arithmetic/relational operations. |
| Space | O(1) | No collections or recursion; at most one scalar local. |

## 10. Edge Cases

All rows were executed with Node.js and produced the expected output (verified).

| Scenario | Input `(capacity, used, size)` | Expected | Handled |
|---|---|---|---|
| One of the examples | `(100, 70, 20)` | `true` | ✓ |
| Exact fill | `(100, 70, 30)` | `true` | ✓ |
| One over capacity | `(100, 70, 31)` | `false` | ✓ |
| Full drive, empty file | `(100, 100, 0)` | `true` | ✓ |
| Full drive, non-empty file | `(100, 100, 1)` | `false` | ✓ |
| Empty drive, empty file (min bounds) | `(0, 0, 0)` | `true` | ✓ |
| Max bounds, exact fill | `(1000, 0, 1000)` | `true` | ✓ |
| Max bounds, full drive | `(1000, 1000, 1000)` | `false` | ✓ |
| No usage, empty file | `(100, 0, 0)` | `true` | ✓ |

## 11. Possible Improvements

1. **Return the comparison directly** — replace the `if/else` + `returnVar` with `return size <= capacity - used;`. Same logic, fewer moving parts, no mutable state. This is a simplification of the user's own condition, not a different algorithm.
2. Algorithmically there is nothing to improve: the operation is already the minimum possible O(1) work. Do not add defensive checks for `used > capacity` or negative values — the problem guarantees they cannot occur.

## 12. Key Takeaways

- Translate requirement wording into the comparison operator: "exactly allowed" ⇒ `≤`.
- In JavaScript, a comparison returns a boolean — return it directly instead of laundering it through `if/else`.
- Use guaranteed invariants (`used ≤ capacity`) to eliminate special cases (zero-size file) instead of writing branches for them.
- When free space is the decision variable, compute it once (`capacity - used`) rather than tracking totals.
