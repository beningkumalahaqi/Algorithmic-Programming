# Reusable Knowledge — Value Swapping and Assignment Order

> Entry from solving `swap` (2026-11-20). Problem-agnostic; intended for reuse across projects.

## 1. Assignment is destructive

`a = b` discards whatever `a` held. It does not "move" the old value anywhere. Any later statement that reads `a` expecting the original value will silently get `b` instead. The classic broken swap is exactly this:

```text
a ← b        // original a is now unreachable
b ← a        // both variables hold b
```

Diagnosing this class of bug starts with one question: **which read depends on a value that an earlier write destroyed?**

## 2. The invariant behind a correct swap

After each step, every original value must still be reachable from some variable. A constant-time two-value exchange is correct when the three assignments maintain that invariant:

```text
temp ← a     // a's original is now in temp
a    ← b     // a becomes b's original; b is still intact
b    ← temp  // b receives a's original from the preserved copy
```

The order is forced: saving must happen before the first overwrite, and the restore must happen after the read of `b`. Reordering any two steps breaks the invariant.

## 3. Exchange techniques in JavaScript

| Technique | Code | Notes |
|---|---|---|
| Temporary variable | `const t = a; a = b; b = t;` | Portable to every language; explicit and easy to trace. |
| Destructuring | `[a, b] = [b, a];` | ES2015+. The right-hand array is fully evaluated before assignment, so no value is lost. |
| Direct construction | `return [b, a];` | Use when the contract wants a swapped **result**, not reassigned variables. No mutation at all. |
| Arithmetic | `a = a + b; b = a - b; a = a - b;` | **Avoid.** Not exact for floating-point values; see section 5. |
| XOR | `a ^= b; b ^= a; a ^= b;` | **Avoid.** JS coerces to 32-bit integers; wrong for fractions, large values, and non-numbers. |

In Python the destructuring form is written `a, b = b, a`; the evaluation rule is the same — the right side is computed before the left side is bound.

## 4. Primitives are copied into functions

JavaScript number arguments are passed **by value**. Reassigning parameters inside a function only changes local copies:

```javascript
function brokenSwap(a, b) {
  [a, b] = [b, a];
}
let x = 1, y = 2;
brokenSwap(x, y);   // x and y are unchanged
```

Three ways to deliver a swap to the caller:

1. **Return the pair** — `[b, a]`, or an object `{ a: b, b: a }`. This is what the `swap` problem requires.
2. **Mutate a shared container** — for arrays, `[arr[0], arr[1]] = [arr[1], arr[0]]` is visible to the caller because the array reference is shared.
3. **Swap fields of an object** — `[obj.a, obj.b] = [obj.b, obj.a]`, equally visible.

The point is that the swap must happen in storage the caller can observe; a primitive local cannot be that storage.

## 5. Why arithmetic and XOR swaps are a bad trade

| Concern | Arithmetic swap | XOR swap |
|---|---|---|
| Fractional values | Precision loss, possible wrong results | Truncated to 32-bit integers |
| `Infinity` / `NaN` | Produces `NaN` or `Infinity` artifacts | Coerced to `0` |
| Large integers | Intermediate sum can exceed exact range | 32-bit truncation |
| Readability | Requires a proof to trust | Requires a proof to trust |

They save one variable and cost correctness on ordinary inputs. The temporary is cheaper than the risk.

## 6. Clarify the contract: in-place vs. returned

Before implementing, decide which operation is being asked for:

| Contract wording | Implementation |
|---|---|
| "Return the two numbers swapped" | `return [b, a];` — a new array is the deliverable |
| "Swap `a` and `b` in place" (variables/fields) | Destructuring or a temporary on the actual storage |
| "Swap the elements of an array" | Assign into the shared array; the caller sees the change |

Confusing these produces correct-looking code that fails the tests: reassigning parameters does nothing for the caller, and returning a new array does nothing to the caller's variables.

## 7. Test checklist for swap-style code

- The provided examples, in both argument orders.
- Equal values — proves the exchange does not hallucinate a change.
- Zero, negative, and mixed-sign values.
- Fractional values — rules out arithmetic tricks.
- Large values near `Number.MAX_SAFE_INTEGER`.
- Verify the result is a **new** array of the expected length, not a reference to shared state.
- Verify the input variables or array are unchanged when the contract says "return", and changed when it says "in place".
