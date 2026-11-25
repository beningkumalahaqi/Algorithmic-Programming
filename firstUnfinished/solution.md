# firstUnfinished — Find the First Unfinished Task

> Solution record · Language: JavaScript · Verified with Node.js v24.14.0 · 2026-11-25

## 1. Problem Overview

`tasks` is an ordered list of tasks, each written as a pair `[name, done]`. `name` is a nonempty string of up to 20 characters and may repeat; `done` is `true` for a completed task and `false` otherwise. Return the **name of the first task, in array order, whose `done` is `false`**. If every task is done — including the case of an empty list — return `null`.

```javascript
firstUnfinished(tasks) // → name of first unfinished task, or null
```

| Call | Result | Why |
|---|---|---|
| `firstUnfinished([["write",true],["test",false],["ship",false]])` | `"test"` | `"test"` is the earliest unfinished task; `"ship"` is never reached |
| `firstUnfinished([["wash",true],["dry",true]])` | `null` | Every task is done |
| `firstUnfinished([["read",false],["read",false]])` | `"read"` | The first unfinished entry is returned; the duplicate name is irrelevant |

## 2. Requirements and Constraints

- `tasks`: **0 to 20** pairs. Each pair is `[name, done]`.
- `name`: a nonempty string of at most 20 characters; names **may repeat**.
- `done`: a boolean — `true` finished, `false` unfinished.
- Output: the **name** (string) of the earliest unfinished task, in array order; `null` when none is unfinished.
- Return the **name**, not the pair, not the index, not the count.
- "First" means smallest index, so the scan must stop at the first match — later unfinished tasks must not affect the answer.

## 3. Problem Analysis

- The decision for one task depends on exactly one field: the boolean in the second slot. The name is only the payload to return once that field says "unfinished".
- Order matters: `[["write",false],["test",false]]` answers `"write"`. Any approach that collects all unfinished names and takes the first one immediately would be wrong; taking `[0]` of the collected list happens to give the same answer, but the collection is wasted work.
- Early exit is the whole point of the problem. Once a `false` is found, the remaining tasks cannot change the result, so continuing is unnecessary work.
- An empty list has no task to inspect, so there is nothing unfinished: the answer is `null`. The "all done" case reaches the same result, and a loop that only returns from inside its body reaches `null` after the loop for both cases — no special branch needed.
- Duplicate names are a trap for a different implementation style: since names repeat, a returned name does not identify a unique task. The output is still the name, so duplicates need no handling, but they do mean "the first unfinished name" and "the name of the first unfinished task" can coincide even when the matched entries differ.
- The 20-task limit makes an O(n²) or collecting approach harmless, but a single pass with immediate return expresses the requirement directly.

## 4. Approach and Reasoning

**Main idea:** scan the pairs in order, test the `done` field of each, and return the name of the first pair whose `done` is `false`. If the scan finishes without a match, return `null`.

**Why it works:** array order is the definition of "first", and a forward loop visits indices `0, 1, …, n−1` in exactly that order. Every task before a returned index has already been tested and found done, so the returned task is unfinished and nothing earlier is — which is precisely the requirement. If the loop ends, every index was tested and none was unfinished, so `null` is the only correct answer; the empty list takes that path without a separate check.

**Why not alternatives:** collecting all unfinished names and reading the first allocates an array for a value you already hold at the moment of discovery. Scanning backwards finds the *last* unfinished task. Filtering or mapping calls the visitor on tasks after the answer, doing work that cannot change the result.

**Tradeoffs:** `return` inside the loop is the clearest early exit and costs nothing. The cost is that the loop has two exits (the match, and the trailing `null`), which is more exits than a helper such as `.find()` needs — but `.find()` returns the **pair**, so the name still has to be extracted.

**Fit with constraints:** one visit per task at most, one field read per visit, a single string returned; no allocation proportional to input, no mutation.

## 5. Logic Breakdown

1. Receive `tasks`.
2. Start at index `0` and move forward while the index is less than `tasks.length`.
3. At each index, read the pair and look at its second element, the `done` flag.
4. If it is `false`, return the pair's first element — the name — immediately.
5. If it is `true`, continue with the next index.
6. If the loop completes, no task was unfinished, so return `null`.

## 6. Pseudocode

```text
FUNCTION firstUnfinished(tasks)
    FOR EACH index i FROM 0 TO length(tasks) - 1
        pair ← tasks[i]
        IF the done field of pair is exactly false THEN
            RETURN the name field of pair
        END IF
    END FOR
    RETURN null
END FUNCTION
```

The trailing `RETURN null` serves both the "all done" and "empty list" cases, because a loop over zero tasks performs no iterations.

## 7. Programming Concepts

| Concept | Role here |
|---|---|
| Linear scan | Visiting elements in index order until a condition holds. |
| Early exit (`return` inside a loop) | Stops work the moment the answer is known. |
| Nested array access | `tasks[i][1]` reads the flag; `tasks[i][0]` reads the name. |
| Array `length` | Bounds the loop; `0` for an empty list, producing no iterations. |
| Strict equality `=== false` | Tests the boolean without type coercion. |
| Default return after a loop | Serves as the "not found" answer when no iteration matched. |
| Predicate + payload separation | The boolean decides *whether* to stop; the name is what gets returned. |
| Order sensitivity | "First" is defined by position, so both direction and stopping matter. |

## 8. Implementation Notes

Implementation authored and submitted by the user, saved verbatim in [`solution.js`](./solution.js) (executed with Node.js v24.14.0 — all 9 cases in section 10 plus a full-size case passed):

```javascript
function firstUnfinished(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][1] === false) {
      return tasks[i][0]
    }
  }
  return null;
}
```

Key points:

- **Correct on every case tested.** The forward loop gives array order; the immediate `return` gives the first match; the trailing `return null` covers all-done and empty input.
- `tasks[i][1] === false` is stricter than `!tasks[i][1]`. Both work under the stated contract (the field is always a boolean), but the explicit form states exactly which value counts as unfinished. `!` would also accept `undefined`, `0`, `""`, and `null` — values the contract excludes, so the looseness is latent rather than active.
- No special case for an empty list is needed: `tasks.length` is `0`, the loop body never runs, and the trailing `return null` answers. That is the same reasoning that makes the "all done" case work — one exit covers both.
- Duplicate names need no handling because the requirement is the name, and the first match wins by construction.
- The function is a pure query: it reads `tasks`, returns a string or `null`, and never mutates or reorders the input.
- A missing semicolon after `return tasks[i][0]` is inconsistent with the final `return null;` but has no semantic effect.
- An equivalent one-liner shape exists — `tasks.find(t => !t[1])?.[0] ?? null` — but it depends on optional chaining and `??` to express "found → name, not found → null". The explicit loop shows the early exit and the fallback more directly, which is why no change is recommended here.

## 9. Complexity Analysis

**Time:** at most one visit per task, and the visit is a constant amount of work (one pair access, one field comparison). Worst case is every task done, giving **O(n)**; best case is the first task unfinished, giving **O(1)**.
**Space:** one loop counter; no arrays, objects, or recursion → **O(1)** auxiliary, regardless of input size.

| Metric | Complexity | Explanation |
|---|---|---|
| Time | O(n) worst, O(1) best | Stops at the first unfinished task; n tasks maximum. |
| Space | O(1) | Only the loop index; the input is read, not copied. |

At the 20-task limit the difference between O(n) and O(1) is imperceptible; the single pass is optimal in the general case anyway.

## 10. Edge Cases

All rows were executed with Node.js v24.14.0 against the saved [`solution.js`](./solution.js) and produced the expected output (verified, 10/10 passed).

| Scenario | Input `tasks` | Expected | Handled |
|---|---|---|---|
| Provided example — middle task unfinished | `[["write",true],["test",false],["ship",false]]` | `"test"` | ✓ |
| Provided example — all done | `[["wash",true],["dry",true]]` | `null` | ✓ |
| Provided example — duplicate unfinished names | `[["read",false],["read",false]]` | `"read"` | ✓ |
| Empty list | `[]` | `null` | ✓ |
| Single task, done | `[["a",true]]` | `null` | ✓ |
| Single task, unfinished | `[["a",false]]` | `"a"` | ✓ |
| Two tasks, second unfinished | `[["a",true],["b",false]]` | `"b"` | ✓ |
| Two distinct unfinished — first wins | `[["x",false],["y",false]]` | `"x"` | ✓ |
| Same name, done then unfinished | `[["x",true],["x",false]]` | `"x"` | ✓ |
| Unfinished at the end | `[["x",true],["q",true],["z",false]]` | `"z"` | ✓ |
| Maximum size (20), only the last unfinished | 20 pairs, `true` for indices 0–18, `false` for 19 | `"t19"` | ✓ |

The "two distinct unfinished" row is the one that separates a first-match scan from a last-match or collect-then-pick-later approach. The empty and all-done rows both exercise the trailing `return null`, confirming one exit covers both.

## 11. Possible Improvements

The logic needs no change. Only readability options exist, and none is required:

1. **Optional: extract the pair with a destructure** to make the field roles readable:

   ```javascript
   for (const [name, done] of tasks) {
     if (done === false) return name;
   }
   return null;
   ```

   Why: names the two fields once, removes index arithmetic and the repeated `tasks[i]`. Functionally identical.

2. **Optional: `done === false` → `!done`** only if the contract's boolean guarantee were dropped. Under the stated contract, keep the explicit comparison: it documents which value is the trigger.

3. **Optional: `=== false` → `done === false` reads better than `tasks[i][1] === false`** in inline form, for the same reason as #1.

4. Keep the trailing `return null` inside the function. Don't convert it to `|| null` on a `find()` result — `.find()` returning `undefined` and switching to `null` via `??` is a terser spelling of the same behavior, but the loop makes the fallback visible without knowing the helper's not-found convention.

Algorithmically, one forward pass with immediate return is optimal. Do not add filtering, sorting, or a reverse scan.

## 12. Key Takeaways

- "First X in order" means a forward scan that **stops** at the first match. Direction and early exit are both part of the requirement, not performance polish.
- When each item is a pair of *condition* and *payload*, test the condition and return the payload — don't split the work into collect, then pick.
- A trailing `return` after a loop is the natural "not found" answer and covers the empty input too; the empty case rarely needs its own branch.
- Explicit comparison against the documented sentinel (`=== false`) is safer than a truthiness test when the contract says the value's type. Truthiness would silently accept `undefined`, `0`, and `""`.
- Duplicate keys/names are harmless when the answer is the key itself; they only become a problem when the answer must *identify* a specific entry.
- Reading and testing on the same visit keeps the predicate and payload in sync; separating them invites an index mismatch.
