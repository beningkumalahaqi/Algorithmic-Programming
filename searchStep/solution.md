# searchStep — One Step of a Binary Search

> Solution record · Language: JavaScript · Verified with Node.js v24.22.1 · 2026-11-20

## 1. Problem Overview

`numbers` is sorted from smallest to largest. Given a valid index `position`, inspect **only** `numbers[position]` and report where `target` lies relative to that entry:

- equal → `"found"`
- target smaller → `"left"`
- target larger → `"right"`

The target does not need to be located; one comparison against one entry is the whole task.

```javascript
searchStep(numbers, position, target) // → "found" | "left" | "right"
```

| Call | Result | Why |
|---|---|---|
| `searchStep([2, 5, 8], 1, 5)` | `"found"` | `numbers[1] === 5` |
| `searchStep([2, 5, 8], 1, 3)` | `"left"` | 3 < 5, so the target belongs to the left side |
| `searchStep([2, 5, 8], 1, 9)` | `"right"` | 9 > 5, so the target belongs to the right side |

## 2. Requirements and Constraints

- `numbers`: **1 to 20** integers, each in **[-100, 100]**, sorted ascending; equal values are allowed.
- `position`: a **guaranteed valid** zero-based index into `numbers` — no bounds checking is required.
- `target`: an integer in **[-100, 100]**, possibly absent from the array.
- Output: exactly one of `"found"`, `"left"`, `"right"`.
- Only the supplied entry may be compared — no scanning, `includes`, or `indexOf`.
- No mutation of the input is required.

## 3. Problem Analysis

- The task is a **three-way comparison**: `target` relative to `numbers[position]`. Equality, less-than, and greater-than are **mutually exclusive and exhaustive** for integers, so exactly one of the three outputs applies.
- The array is sorted, but correctness does not depend on that: the function never looks at a neighboring element. Sorting matters to the *caller* — it is what makes the returned direction meaningful for narrowing a range.
- A direction is not a feasibility check. At `position === 0` with a smaller target, there is no left side to move into, yet the contract still says `"left"`. The function reports the relation, not whether a next step exists.
- Duplicates are irrelevant to this step: if `numbers[position] === target`, the answer is `"found"` regardless of other copies. Duplicates only affect how a surrounding search would narrow.
- No iteration, accumulation, or data structure is involved. The valid-position guarantee removes the only defensive branch one might otherwise add.

## 4. Approach and Reasoning

**Main idea:** read the probe once, then branch on its relation to the target in the order equality → less-than → else.

**Why it works:** integer comparisons form a total order, so the three cases cover every input without overlap. Testing equality first makes the hit explicit and prevents it from being absorbed by a later comparison. The second test isolates the smaller case; the remaining case must then be the larger one, so no third comparison is needed.

**Tradeoffs:** an arithmetic formulation (`Math.sign(probe - target)`) is possible here because the values are tiny, but it maps an integer to a string through an extra level of indirection and, in languages with fixed-width integers, subtraction can overflow. Direct comparisons are simpler and portable. A ternary chain is shorter than the `if/else if/else` but no clearer for three outcomes.

**Fit with constraints:** one array access and at most two comparisons, independent of array length. Nothing can be cheaper.

## 5. Logic Breakdown

1. Receive `numbers`, `position`, `target`.
2. Read the supplied entry: `probe = numbers[position]`.
3. Compare `target` with `probe`:
   - equal → answer `"found"`;
   - otherwise, `target < probe` → `"left"`;
   - otherwise → `"right"`.
4. Return the selected string.

## 6. Pseudocode

```text
FUNCTION searchStep(numbers, position, target)
    probe ← numbers[position]
    IF target = probe THEN RETURN "found"
    ELSE IF target < probe THEN RETURN "left"
    ELSE RETURN "right"
END FUNCTION
```

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Zero-based array indexing | `position` directly addresses the single entry to inspect. |
| Three-way comparison | Equality, less-than, greater-than over a total order partition all inputs. |
| `if / else if / else` | Maps the three disjoint cases to three string results. |
| Branch ordering | Checking equality first keeps the hit case from being swallowed by `<` or the final `else`. |
| Domain invariant | A valid `position` removes the need for bounds handling. |
| Constant-time operation | One index access; result independent of `numbers.length`. |

## 8. Implementation Notes

Implementation authored and submitted by the user, saved verbatim in [`solution.js`](./solution.js) (executed against the cases in section 10 — all passed):

```javascript
function searchStep(numbers, position, target) {
  let returnVal
  if ( target == numbers[position]){
    returnVal = "found"
  } else if (target < numbers[position]){
    returnVal = "left"
  } else {
    returnVal = "right"
  }
  return returnVal;
}
```

Key points:

- The branch structure is **correct and complete**: every path assigns `returnVal`, and the cases are exhaustive, so no uninitialized value can be returned.
- `numbers[position]` is read up to three times. The array is not mutated, so the result is identical each time; a `const probe = numbers[position]` would name the value and remove the repetition. *(Recommended; not yet applied.)*
- Assigning to `returnVal` and returning it at the end is unnecessary — each branch could return its string directly. *(Recommended; not yet applied.)*
- `==` is harmless here because both operands are numbers, but `===` is the safer default in JavaScript and expresses "same value, no coercion" exactly. *(Recommended; not yet applied.)*
- No special case for the ends of the array is needed: the contract asks for a direction even when no move in that direction is possible.

## 9. Complexity Analysis

**Time:** one indexed read plus at most two integer comparisons, regardless of `numbers.length` → O(1).
**Space:** no arrays, objects, or recursion; a single scalar local → O(1) auxiliary.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(1) | Constant number of accesses and comparisons; input size does not affect cost. |
| Space | O(1) | Only one scalar local; no auxiliary structures. |

## 10. Edge Cases

All rows were executed with Node.js v24.22.1 and produced the expected output (verified).

| Scenario | Input `(numbers, position, target)` | Expected | Handled |
|---|---|---|---|
| Provided example — hit | `([2, 5, 8], 1, 5)` | `"found"` | ✓ |
| Provided example — smaller | `([2, 5, 8], 1, 3)` | `"left"` | ✓ |
| Provided example — larger | `([2, 5, 8], 1, 9)` | `"right"` | ✓ |
| First position, smaller target | `([10, 20], 0, 5)` | `"left"` | ✓ |
| Last position, larger target | `([10, 20], 1, 99)` | `"right"` | ✓ |
| Single-element array — hit | `([7], 0, 7)` | `"found"` | ✓ |
| Single-element array — smaller | `([7], 0, 6)` | `"left"` | ✓ |
| Single-element array — larger | `([7], 0, 8)` | `"right"` | ✓ |
| Duplicate at a different index — hit at probe | `([2, 2, 5], 0, 2)` | `"found"` | ✓ |
| Duplicate at the probe itself | `([2, 2, 5], 1, 2)` | `"found"` | ✓ |
| Duplicates elsewhere do not force a hit | `([2, 2, 5], 2, 2)` | `"left"` | ✓ |
| All-negative array — hit | `([-5, -1, 0], 1, -1)` | `"found"` | ✓ |
| All-negative array — smaller | `([-5, -1, 0], 1, -5)` | `"left"` | ✓ |
| All-negative array — larger | `([-5, -1, 0], 0, -100)` | `"right"` | ✓ |
| Lower bound value | `([-100], 0, -100)` | `"found"` | ✓ |
| Upper bound value | `([100], 0, 100)` | `"found"` | ✓ |
| One above lower bound | `([-100], 0, -99)` | `"right"` | ✓ |
| One below upper bound | `([100], 0, 99)` | `"left"` | ✓ |

## 11. Possible Improvements

1. **Return directly from each branch.** Replace `returnVal = "..."` plus the final `return` with `return "found";`, etc. Same logic, no mutable local, fewer lines. *(Not applied — the saved code is the user's verbatim submission.)*
2. **Cache the probe.** `const probe = numbers[position];` once at the top makes the value under test explicit and avoids repeated lookups. *(Not applied.)*
3. **Use `===`.** No behavior change for number operands, but it keeps the equality check strict if the function is later reused with mixed types. *(Not applied.)*
4. Algorithmically there is nothing to improve: a single probe compared against the target is the minimum possible work for this contract. Do not add bounds checks or "not found" outputs — both contradict the guarantees.

## 12. Key Takeaways

- Two integers have exactly three possible relations; encode them as three mutually exclusive branches, equality first.
- Separate "where is the target relative to this entry" from "can the search move there" — at the array ends the direction is still defined.
- A sorted array adds no work to a single-probe function; the ordering only gains meaning when the caller uses the direction to shrink a range.
- This function is the body of a binary-search iteration. Isolating it makes the comparison logic testable without the loop.
- Trust valid-input guarantees: no bounds check for `position`, no "missing" output. Extra defensive branches would be untested paths that contradict the contract.
- In JavaScript, prefer `===` for primitive comparisons even when `==` happens to be safe.
