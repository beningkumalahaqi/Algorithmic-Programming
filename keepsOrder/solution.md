# keepsOrder — Does Appending a Score Preserve Sorted Order

> Solution record · Language: JavaScript · Verified with Node.js v24.22.1 · 2026-11-20

## 1. Problem Overview

`scores` is already ordered from smallest to largest, and equal values are allowed. Given one new value `next_score`, decide whether appending it **at the end** leaves the array in that same non-decreasing order. Return a boolean — not the updated array. An empty array accepts any score.

```javascript
keepsOrder(scores, next_score) // → true | false
```

| Call | Result | Why |
|---|---|---|
| `keepsOrder([2, 5, 5], 4)` | `false` | 4 < 5, so it would be smaller than the last element |
| `keepsOrder([2, 5, 5], 5)` | `true` | 5 ≥ 5 — equal scores are allowed |
| `keepsOrder([], -3)` | `true` | An empty array is trivially ordered |

## 2. Requirements and Constraints

- `scores`: **0 to 20** integers, each in **[-100, 100]**, given in non-decreasing order; duplicates allowed.
- `next_score`: an integer in **[-100, 100]**.
- The value is appended to the **end** only — this is not an insertion into the middle.
- Output: `true` if the extended sequence is still non-decreasing, otherwise `false`.
- The returned value is a boolean; the array is not modified and no new array needs to be built.

## 3. Problem Analysis

- The prefix is already sorted, so appending one value can create only **one** potentially unordered pair: the old last element and the new one.
- If `next_score` is at least the old last element, then every earlier element is ≤ the old last ≤ `next_score`, so the whole sequence stays ordered. If it is smaller, that single pair already violates the order.
- Equality must be accepted, so the boundary comparison is **inclusive** (`<=`, or equivalently `>=` from the other side).
- An empty array has no boundary and no element to violate; it is ordered vacuously, so the answer is `true` regardless of the value.
- The empty case cannot share the comparison path: there is no last element, and `undefined` participates in no ordering — `undefined <= -3` evaluates to `false`, which would be the wrong answer.
- The 20-element limit would allow rescanning every adjacent pair, but the sorted-prefix invariant makes that work unnecessary.

## 4. Approach and Reasoning

**Main idea:** read the array's last element, handle the empty array separately, then answer with one inclusive comparison between that last element and `next_score`.

**Why it works:** let the prefix be `s₀ ≤ s₁ ≤ … ≤ sₖ₋₁`. After appending `n`, the only new relation to check is `sₖ₋₁ ≤ n`. If it holds, transitivity gives `sᵢ ≤ n` for every earlier `i`, so the sequence is non-decreasing. If it fails, the pair `(sₖ₋₁, n)` is itself a counterexample.

**Tradeoffs:** scanning the whole array and testing every adjacent pair is also correct but does O(n) work to rediscover an invariant you were given. Inserting the value at its sorted position would be a different operation — the contract fixes the position at the end.

**Fit with constraints:** one index read and one comparison; values are small integers well inside JavaScript's exact number range, so no precision or overflow concern.

## 5. Logic Breakdown

1. Receive `scores` and `next_score`.
2. Determine whether `scores` is empty.
3. If it is empty, answer `true` — there is no ordering to break.
4. Otherwise, take the last element and compare it with `next_score`.
5. Answer `true` when the last element is less than or equal to `next_score`; answer `false` otherwise.

## 6. Pseudocode

```text
FUNCTION keepsOrder(scores, next_score)
    IF scores is empty THEN
        RETURN true
    last ← last element of scores
    RETURN last ≤ next_score
END FUNCTION
```

The pseudocode checks emptiness before reading the last element. The saved implementation reads the last element first and only uses it in the non-empty branch; see section 8 for why that is still safe.

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Array `length` | Distinguishes the empty case and computes the last index. |
| Zero-based indexing | `scores[scores.length - 1]` reads the final element. |
| Sorted-order invariant | Only the new boundary pair needs checking; the prefix is trusted. |
| Inclusive comparison (`<=`) | Equal scores are legal, so a tie at the boundary must return `true`. |
| Vacuous truth | An empty array satisfies "non-decreasing" without any comparison. |
| `undefined` in comparisons | Reading past the end yields `undefined`, which makes every relational comparison `false`. |
| `if / else if / else` | Routes the three logical outcomes: empty, boundary satisfied, boundary violated. |
| Boolean-valued result | The answer is a predicate; no array construction or mutation is needed. |

## 8. Implementation Notes

Implementation authored and submitted by the user, saved verbatim in [`solution.js`](./solution.js) (executed with Node.js — all 19 test cases in section 10 passed):

```javascript
function keepsOrder(scores, next_score) {
  let returnVal

  let scoresLastIndex = scores[scores.length - 1]

  if (scores.length === 0){
    returnVal = true
  } else if (scoresLastIndex <= next_score){
    returnVal = true
  } else {
    returnVal = false
  }
  
  return returnVal;
}
```

Key points:

- The logic is **correct and complete**: the empty case returns `true`, the inclusive boundary returns `true`, and every remaining case returns `false`.
- `scoresLastIndex` is misleadingly named — it stores the last **element value**, not its index. A name such as `scoresLastValue` would describe it accurately. *(Recommended; not yet applied.)*
- The last element is read **before** the empty check. That is safe here only because the empty branch ignores the value: on an empty array the read produces `undefined`, and `undefined <= next_score` would be `false`. Branch order is what prevents that value from deciding the answer. Reading the value inside the non-empty branch would make the safety local rather than order-dependent. *(Recommended; not yet applied.)*
- Routing `true`/`false` through `returnVal` and a single final `return` is more ceremony than the problem needs: both the empty check and the comparison are already booleans and could be returned directly. *(Recommended; not yet applied.)*
- `<=` is the correct operator. A strict `<` would reject a value equal to the last element, contradicting the "equal scores are allowed" rule.
- The function is a pure predicate: it reads the input, returns a boolean, and never mutates `scores`.

## 9. Complexity Analysis

**Time:** one length check, at most one indexed read, and at most one comparison. Work does not depend on how many scores precede the last one → O(1).
**Space:** one scalar local and one index expression; no arrays, objects, or recursion → O(1) auxiliary.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(1) | Constant number of checks; only the last element is inspected. |
| Space | O(1) | Only scalar locals; the input array is not copied or modified. |

## 10. Edge Cases

All rows were executed with Node.js v24.22.1 against the saved [`solution.js`](./solution.js) and produced the expected output (verified, 19/19 passed).

| Scenario | Input `(scores, next_score)` | Expected | Handled |
|---|---|---|---|
| Provided example — smaller than last | `([2, 5, 5], 4)` | `false` | ✓ |
| Provided example — equal to last | `([2, 5, 5], 5)` | `true` | ✓ |
| Provided example — empty array | `([], -3)` | `true` | ✓ |
| Larger than last | `([2, 5, 5], 6)` | `true` | ✓ |
| Smaller than last | `([2, 5, 5], 3)` | `false` | ✓ |
| Single element — equal | `([5], 5)` | `true` | ✓ |
| Single element — smaller | `([5], 4)` | `false` | ✓ |
| Single element — larger | `([5], 6)` | `true` | ✓ |
| Lower domain bound — equal | `([-100], -100)` | `true` | ✓ |
| Duplicate run — new duplicate | `([-5, -5], -5)` | `true` | ✓ |
| Upper domain bound — equal | `([100], 100)` | `true` | ✓ |
| Upper domain bound — one less | `([100], 99)` | `false` | ✓ |
| Lower domain bound as new value | `([0], -100)` | `false` | ✓ |
| Upper domain bound as new value | `([0], 100)` | `true` | ✓ |
| All elements identical | `([-100, -100, -100], -100)` | `true` | ✓ |
| Five elements — equal to last | `([-100, -50, 0, 50, 100], 100)` | `true` | ✓ |
| Five elements — below last | `([-100, -50, 0, 50, 100], 99)` | `false` | ✓ |
| Five elements — far below last | `([-100, -50, 0, 50, 100], -100)` | `false` | ✓ |
| Five elements — middle value | `([-100, -50, 0, 50, 100], 50)` | `false` | ✓ |

## 11. Possible Improvements

1. **Return the predicate directly.** The empty check and the boundary comparison are already booleans:

   ```javascript
   function keepsOrder(scores, next_score) {
     if (scores.length === 0) return true;
     return scores[scores.length - 1] <= next_score;
   }
   ```

   One exit per case, no mutable `returnVal`, and the guard appears before any element access. *(Recommended; not applied — the saved code is the user's verbatim submission.)*
2. **Rename the local.** `scoresLastValue` (or simply `last`) matches what the variable holds. *(Recommended; not applied.)*
3. **Optional modern accessor.** `scores.at(-1)` reads the last element in one expression and needs no `length - 1` arithmetic. It returns `undefined` on an empty array, so the guard is still required. *(Recommended; not applied.)*
4. Algorithmically there is nothing to improve: one boundary comparison is the minimum work. Do not add a loop over the prefix or input validation — both contradict the stated guarantees and would create untested branches.

## 12. Key Takeaways

- When a sequence is already sorted and a value is appended at the end, only the **new boundary pair** can break the order. Check that pair, not the whole array.
- "Equal values are allowed" translates directly into an **inclusive** operator (`<=` / `>=`); a strict comparison silently rejects duplicates at the boundary.
- An empty sequence is ordered **vacuously** — it needs its own branch, because there is no element to compare against.
- `undefined` is unordered in JavaScript: `undefined <= x` and `undefined >= x` are both `false`. Any code that reads a possibly missing element must guard before the comparison decides the answer.
- Separating "read the value" from "use the value" makes the empty case easier to reason about: read first is safe only when the empty branch ignores what was read.
- A predicate should return a boolean expression directly rather than funnel `true`/`false` through a temporary variable.
- Name locals after what they hold: a last *value* is not a last *index*. Misleading names survive review longer than bugs.
