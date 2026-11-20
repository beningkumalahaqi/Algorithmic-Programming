# Solution Review — swap

> Reviewed: 2026-11-20 · Language: JavaScript · Verification: saved `solution.js` executed with Node.js v24.22.1 against 12 cases, all passed (verified). Additional assertions confirmed repeated calls return distinct arrays and the input variables are untouched.

## Overall Assessment

Correct. The temporary-variable exchange follows the only forced order — save before the first overwrite, restore after the read of `b` — and the returned array is built after all writes, so it is `[b, a]` with respect to the inputs. The findings are naming, declaration style, and indentation; there is also a contract question worth being explicit about (return vs. in-place), because it decides whether this approach is even the right one.

## 1. Critical Issues

None found.

**One assumption that matters outside this judge:** the contract here is "return the swapped pair". The reassignment does not swap anything the caller can observe, because JavaScript numbers are primitives passed by value. If a later problem says "swap `a` and `b` in place", this function would pass the examples and still be wrong. The return value is what does the work here, not the reassignment.

## 2. Correctness Improvements

None needed. The logic is right:

- `c = a` runs before `a = b`, so the original `a` remains reachable while `a` is overwritten. Reversing those two statements reproduces the `[100, 100]` symptom from the statement.
- `b = c` restores the saved original into `b`, and `return [a, b]` reads the variables only after all writes, so the pair leaves reversed.
- The function is exact for every JavaScript number: it only copies, never compares, coerces, or combines. Equal, zero, negative, fractional, and `MAX_SAFE_INTEGER` inputs are all covered by the tests below.
- A new two-element array is allocated per call (verified: two calls with the same inputs returned distinct arrays), so callers never share mutable state.
- `-0` is preserved as `-0` through the copies (verified via `Object.is`); no arithmetic is involved that could normalize it.

## 3. Edge Cases

| Test case | Expected | Result |
|---|---|---|
| `swap(100, 200)` — example | `[200, 100]` | `[200, 100]` ✓ |
| `swap(44, 33)` — example | `[33, 44]` | `[33, 44]` ✓ |
| `swap(21, 12)` — example | `[12, 21]` | `[12, 21]` ✓ |
| `swap(5, 5)` — equal values | `[5, 5]` | `[5, 5]` ✓ |
| `swap(0, 0)` / `(0, 7)` — zeros | `[0, 0]` / `[7, 0]` | ✓ |
| `swap(-1, 3)` / `(-4, -9)` — mixed and negative | `[3, -1]` / `[-9, -4]` | ✓ |
| `swap(1.5, -2.25)` — fractional | `[-2.25, 1.5]` | `[-2.25, 1.5]` ✓ |
| `swap(Number.MAX_SAFE_INTEGER, 1)` — large | `[1, MAX_SAFE_INTEGER]` | ✓ |
| `swap(0, -0)` — signed zero | `[-0, 0]` | `[-0, 0]` ✓ |
| `swap("a", "b")` — non-numbers, copy-only contract | `["b", "a"]` | `["b", "a"]` ✓ |

The equality rows prove the exchange does not hallucinate a change; the fractional and `-0` rows rule out arithmetic tricks; the large-value row rules out any overflow-prone formulation.

## 4. Performance Analysis

- **Time: O(1)** — three assignments and one two-element array literal.
- **Space: O(1)** auxiliary — one scalar temporary. The returned array is the required output, not auxiliary state.

Optimal. Every input value must be copied at least once, and the output has fixed size.

## 5. Code Quality

- **Indentation is mixed.** Lines 2 and 6 (`let c`, `return [a, b]`) start with a tab; lines 3–5 use two spaces (verified with `cat -et`). The file is the verbatim submission, which is the right call for the archive, but this is the kind of drift an editor reformat would erase in one pass.
- **`let c` followed by `c = a` is two statements for one fact.** `const temp = a` declares the value and states that it is never reassigned. The name `c` is a placeholder; `temp`/`tmp` says why the variable exists.
- **The reassignment is unnecessary for this contract.** Since only the returned pair matters, `return [b, a]` produces the same result with no parameter mutation. The three-step version is the correct general pattern and worth having written once — but when the answer is the pair itself, the direct construction is the more honest expression of the requirement.
- **Parameter reassignment is legal but mildly surprising.** `a` and `b` no longer mean what the caller passed by the end of the function. Harmless at seven lines; a habit to notice in longer functions.
- **Good decisions worth keeping:** no arithmetic or XOR trick, no mutation of the actual inputs, and a fresh array per call.

## 6. Recommended Changes

1. **`const temp = a`** instead of `let c` + `c = a`. Why: one statement, truthfully immutable, self-documenting name.
2. **If only the returned pair matters, return it directly.** `return [b, a];` — Why: removes the temporary and three writes, and avoids reassigning parameters that the caller cannot observe anyway. Keep the temporary version if the intent is to demonstrate the generalized in-place exchange.
3. **Normalize indentation.** Why: mixed tabs and spaces survive edits badly and make diffs noisy. Do it in a separate commit from logic changes.
4. **Do not** replace the exchange with `a = a + b; b = a - b; a = a - b` or XOR — both break on fractions, `Infinity`/`NaN`, and 32-bit truncation respectively, and cost more to trust than a copy.
5. Nothing else. There is no algorithm to improve on a fixed two-value input.

## 7. Final Assessment

Correct for the stated contract, O(1), and safe on every value type tested. Applying #1 and #3 is pure hygiene; #2 is a design choice about whether the exercise is "swap the variables" or "return the reversed pair". One standing assumption: the contract is delivery by return value — an in-place swap of the caller's variables is impossible for primitives and would need a shared container.
