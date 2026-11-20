# swap — Swap Two Values Through a Temporary

> Solution record · Language: JavaScript · Verified with Node.js v24.22.1 · 2026-11-20

## 1. Problem Overview

`swap(a, b)` receives two values and returns them in reversed order as a two-element array. The original example describes a function that should turn `(100, 200)` into `[200, 100]` but returns `[100, 100]`: the first assignment overwrites the value the second assignment still needs.

```javascript
swap(a, b) // → [b, a]
```

| Call | Result | Why |
|---|---|---|
| `swap(100, 200)` | `[200, 100]` | The two values exchange positions |
| `swap(44, 33)` | `[33, 44]` | Order of the inputs does not matter |
| `swap(21, 12)` | `[12, 21]` | Same exchange, different values |
| `swap(7, 7)` | `[7, 7]` | Equal values are exchanged without visible change |

## 2. Requirements and Constraints

- Input: exactly two numbers `a`, `b`. The statement gives no range or integrality limits; its examples are positive integers, and the operation itself never inspects or combines the values.
- Output: a two-element array containing both input values in reversed order.
- The result is returned; nothing is mutated in place. Every call produces a new array.
- JavaScript numbers are primitives passed by value, so the function cannot change the caller's variables. The reversed pair leaves through the return value — which is exactly the shape the examples require.
- The snippet in the original statement (`a, b = swap(a, b)`, `print`) is language-neutral pseudocode, not executable JavaScript. The contract used here is the examples plus the required array output.

## 3. Problem Analysis

- The task is a **permutation of two values**: each input must appear exactly once in the output, in the opposite position. No arithmetic transformation is involved.
- Sequential assignment is destructive. After `a = b`, the original value of `a` is unreachable through `a`, so a later `b = a` cannot recover it. That is the source of the `[100, 100]` symptom.
- At least one original value must therefore be preserved while the writes happen — in a temporary variable, or in a fully evaluated array literal.
- The input size is fixed at two. There is no loop or general algorithm to choose; the only design decision is the order of writes and where the displaced value is kept.
- Equal, zero, negative, and fractional inputs do not change the logic, because values are only copied, never compared or combined.

## 4. Approach and Reasoning

**Main idea:** copy `a` into a temporary before overwriting `a`; then write `b` into `a` and the saved original into `b`.

**Why it works:** after `c = a`, both original values are still reachable — `c` holds the original `a`, `b` holds the original `b`, and `a` still holds its original value. Each later assignment reads a live source and writes a variable whose old value is no longer needed.

Trace with `(100, 200)`:

| Step | `c` | `a` | `b` |
|---|---|---|---|
| start | — | 100 | 200 |
| `c = a` | 100 | 100 | 200 |
| `a = b` | 100 | 200 | 200 |
| `b = c` | 100 | 200 | 100 |
| `return [a, b]` | 100 | 200 | 100 → `[200, 100]` |

**Tradeoffs:** the temporary swap costs one local and three assignments. JavaScript also offers `[a, b] = [b, a]` (no visible temporary), and because only the returned pair matters, `return [b, a]` avoids reassignment entirely. All three are correct and O(1); the choice is readability, not performance. Arithmetic or XOR swaps are not justified here: they couple swapping to numeric identities, fail on non-integers and special values, and are harder to verify.

**Fit with constraints:** no value bounds are needed. The function copies values without coercion, rounding, or arithmetic, so it is exact for any JavaScript number.

## 5. Logic Breakdown

1. Receive `a` and `b`.
2. Save the current value of `a` in a temporary `c`.
3. Overwrite `a` with the value of `b`.
4. Overwrite `b` with the saved value from `c`.
5. Return a new array built from the two variables, now in reversed order.

## 6. Pseudocode

```text
FUNCTION swap(a, b)
    temp ← a
    a ← b
    b ← temp
    RETURN [a, b]
END FUNCTION
```

The first assignment must precede `a ← b`; otherwise the value saved into `temp` is already the overwritten one. The return statement reads the two variables **after** all writes, which is what makes the result reversed relative to the inputs.

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Function parameters and return value | The pair enters as two arguments and leaves as one array. |
| Local variable | `c` holds the value displaced by the first overwrite. |
| Sequential execution | Each assignment is visible to every later statement; order is part of correctness. |
| Destructive assignment | Writing to `a` discards its previous contents. |
| Temporary variable (three-step swap) | The standard exchange pattern: save, overwrite, restore. |
| Array literal | `[a, b]` builds the fixed two-element result from current values. |
| Value semantics of primitives | Number arguments are copies; the caller's bindings cannot be changed from inside the function. |
| Fixed-size input | Two values in, two values out — no iteration, constant work. |

## 8. Implementation Notes

Implementation authored and submitted by the user, saved verbatim in [`solution.js`](./solution.js) (executed with Node.js — all 10 cases in section 10 passed):

```javascript
function swap(a, b) {
	let c
  c = a
  a = b
  b = c
	return [a, b]
}
```

Key points:

- The logic is **correct and order-sensitive**: `c = a` must come before `a = b`. Reversing those two statements reproduces the original bug — the original `a` is lost and both variables end up holding `b` (or `[100, 100]` for the example inputs).
- `[a, b]` allocates a new two-element array on every call; callers never receive a shared reference.
- The reassignment happens to local parameter copies only. The caller's variables are untouched, which is unavoidable for primitives — the reversed pair is communicated by the return value.
- `c` is a terse name for the saved value. `temp` (or `tmp`) states its role at the cost of three characters. *(Recommended; not yet applied.)*
- `let c` followed by `c = a` could be a single `const temp = a`, expressing both the value and the fact that the temporary is never reassigned. *(Recommended; not yet applied.)*
- The saved file keeps the submission's mixed indentation (a tab before `let c` and `return`, two spaces elsewhere); no reformatting was applied.

## 9. Complexity Analysis

**Time:** three assignments and construction of a two-element array, regardless of the values → O(1).
**Space:** one scalar local for the temporary. The returned array is the required output, not auxiliary state, and it has constant size 2 → O(1) auxiliary.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(1) | Constant number of assignments and one fixed-size array literal. |
| Space | O(1) | One scalar temporary; the output pair has constant size. |

## 10. Edge Cases

All rows were executed with Node.js v24.22.1 against the saved [`solution.js`](./solution.js) and produced the expected output (verified, 10/10 passed). A separate assertion confirmed that repeated calls return distinct arrays of length 2.

| Scenario | Input `(a, b)` | Expected | Handled |
|---|---|---|---|
| Provided example | `(100, 200)` | `[200, 100]` | ✓ |
| Provided example | `(44, 33)` | `[33, 44]` | ✓ |
| Provided example | `(21, 12)` | `[12, 21]` | ✓ |
| Equal values | `(5, 5)` | `[5, 5]` | ✓ |
| Both zero | `(0, 0)` | `[0, 0]` | ✓ |
| Zero and positive | `(0, 7)` | `[7, 0]` | ✓ |
| Mixed signs | `(-1, 3)` | `[3, -1]` | ✓ |
| Both negative | `(-4, -9)` | `[-9, -4]` | ✓ |
| Fractional values | `(1.5, -2.25)` | `[-2.25, 1.5]` | ✓ |
| Large and small | `(Number.MAX_SAFE_INTEGER, 1)` | `[1, Number.MAX_SAFE_INTEGER]` | ✓ |

## 11. Possible Improvements

1. **Return the pair directly.** The function's only obligation is the returned array, so no reassignment is needed:

   ```javascript
   function swap(a, b) {
     return [b, a];
   }
   ```

   Shortest correct form; it removes the temporary and the three writes. *(Recommended; not applied — the saved code is the user's verbatim submission.)*
2. **Use destructuring** if the exchange should happen in variables first. The right-hand array is fully evaluated before any assignment, so no value is clobbered:

   ```javascript
   [a, b] = [b, a];
   return [a, b];
   ```

   ES2015+; equivalent to the temporary swap without a named temporary. *(Recommended; not applied.)*
3. **Clarify the temporary.** `const temp = a` names the role and documents that the value is write-once. *(Recommended; not applied.)*
4. **Do not** replace the exchange with `a = a + b; b = a - b; a = a - b` or XOR tricks. They fail for fractional values, `Infinity`, `NaN`, and non-numeric types, and they hide a simple copy behind numeric identities.
5. Algorithmically there is nothing to improve: a fixed two-value input needs a constant number of operations, and every value must be copied at least once.

## 12. Key Takeaways

- Assignment **destroys** the previous value. When two values must exchange places through the same variables, one of them has to be saved first.
- The three-step swap `temp ← a; a ← b; b ← temp` works because each write reads a source that is still alive. Check that invariant, not just the statement order.
- JavaScript evaluates the right-hand array literal before destructuring, which is why `[a, b] = [b, a]` needs no explicit temporary.
- Primitives are passed by value: a function cannot swap the caller's variables. Swapping must be delivered through a return value (or a shared container).
- Match the solution to the contract. If only the returned pair matters, `return [b, a]` is not a shortcut — it is the most direct expression of the requirement.
- Equal inputs make a swap a no-op; zero, negative, and fractional values test that the exchange is pure copying with no accidental arithmetic.
