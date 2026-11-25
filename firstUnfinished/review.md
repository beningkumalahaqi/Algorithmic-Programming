# Solution Review — firstUnfinished

> Reviewed: 2026-11-25 · Language: JavaScript · Verification: saved `solution.js` executed with Node.js v24.14.0 against 10 cases, all passed (verified).

## Overall Assessment

Correct, and the simplest reasonable shape. The forward loop gives array order, the `return` inside it stops at the first match, and the trailing `return null` covers both "all done" and the empty list. There is no bug to fix and no missing case. The only findings are stylistic: an explicit `=== false` that is stricter than it needs to be (which is a good thing here), and two minor formatting inconsistencies. No behavioral defect.

## 1. Critical Issues

None found.

## 2. Correctness Improvements

None needed. The pieces that matter are all right:

- **Order.** `for (let i = 0; i < tasks.length; i++)` visits indices in ascending order, so the first match returned is the earliest unfinished task — verified by `[["x",false],["y",false]] → "x"` and the provided `"test"` example, which returns before `"ship"`.
- **Early exit.** Returning from inside the loop means later unfinished tasks are never consulted. That is exactly what "first" requires; an implementation that kept going would need a flag and could return the wrong entry.
- **The right field.** `tasks[i][1]` is the `done` flag and `tasks[i][0]` is the name. The two indices are not swapped — verified by all 10 cases, including single-task rows where a swap would produce `true`/`false` instead of a name or `null`.
- **The not-found answer.** The trailing `return null` runs only when no iteration returned. On `[]` the loop body never executes, so the empty case takes that path without a special branch — verified.
- **Unreached trailing return.** If `tasks` is non-empty and every flag is `true`, the loop completes and falls through to `null` — verified with `[["wash",true],["dry",true]]` and `[["a",true]]`.

**One observation, not a defect.** `tasks[i][1] === false` is stricter than `!tasks[i][1]`. Under the stated contract the field is always a boolean, so the two are equivalent here, and the explicit form is the better choice: it says which value triggers the return instead of relying on falsiness. If the contract ever loosened, `!` would silently treat `undefined`, `0`, and `""` as unfinished while `=== false` would not. No change recommended.

## 3. Edge Cases

Every row below was executed against the saved file and matched the expected value.

| Test case | Expected | Result |
|---|---|---|
| `[["write",true],["test",false],["ship",false]]` — provided example | `"test"` | `"test"` ✓ |
| `[["wash",true],["dry",true]]` — provided example, all done | `null` | `null` ✓ |
| `[["read",false],["read",false]]` — provided example, duplicate names | `"read"` | `"read"` ✓ |
| `[]` — empty list | `null` | `null` ✓ |
| `[["a",true]]` — single task, done | `null` | `null` ✓ |
| `[["a",false]]` — single task, unfinished | `"a"` | `"a"` ✓ |
| `[["a",true],["b",false]]` — only the second unfinished | `"b"` | `"b"` ✓ |
| `[["x",false],["y",false]]` — two unfinished, first must win | `"x"` | `"x"` ✓ |
| `[["x",true],["x",false]]` — same name, done then not | `"x"` | `"x"` ✓ |
| `[["x",true],["q",true],["z",false]]` — unfinished at the end | `"z"` | `"z"` ✓ |
| 20 tasks, only index 19 unfinished — maximum size | `"t19"` | `"t19"` ✓ |

The discriminating rows are `[["x",false],["y",false]]` (proves first-match, not last-match), the empty list (proves the trailing return is reached), and the 20-task case (proves the bound works at the constraint limit).

## 4. Performance Analysis

- **Time: O(n) worst case, O(1) best case.** At most one visit per task, each visit a constant number of operations: one array index, one pair index, one comparison. The best case is the first task unfinished; the worst is all tasks done. The 20-task cap makes the difference irrelevant in practice.
- **Space: O(1).** One loop counter; no array allocated, no recursion, no accumulator. The input is neither copied nor mutated.

Optimal for the stated contract. A collect-all-then-pick approach would be O(n) time with O(n) space, and a reverse scan would answer the wrong question.

## 5. Code Quality

- **Good:** the loop bound reads `tasks.length` on every iteration, which is fine here — the input is not mutated inside the body, so the length cannot change and no caching is needed.
- **Good:** the explicit `=== false` documents the trigger value, as noted in section 2.
- **Minor:** `return tasks[i][0]` lacks the semicolon that `return null;` uses. No semantic effect; pick one style.
- **Minor:** the loop and the `if` are nested two deep for a single condition. A `for...of` with destructuring would flatten the field roles into names:

  ```javascript
  for (const [name, done] of tasks) {
    if (done === false) return name;
  }
  return null;
  ```

  Same O(n)/O(1) behavior, no `[i][1]` index arithmetic, and the two field roles are stated once. Optional.
- **Considered and rejected:** `tasks.find(t => !t[1])?.[0] ?? null`. Shorter, but it leans on optional chaining plus `??` to turn "not found" into `null`, and it hides both the early exit and the fallback behind helper and operator conventions. The explicit loop teaches the pattern more directly for a learning archive.
- **Formatting:** the file is otherwise consistent with the archive's submissions.

## 6. Recommended Changes

1. **Nothing required.** The solution is correct and readable as submitted.
2. **Optional: destructure the pair** to remove index arithmetic (shown in section 5). Why: `[name, done]` states which slot is which, so a future reader cannot swap them by accident.
3. **Optional: add the missing semicolon** on the in-loop return. Why: consistent statement termination, no behavioral effect.
4. **Do not** replace `=== false` with a truthiness test, and **do not** add handling for malformed pairs or names longer than 20 characters — both contradict the stated guarantees and create untested branches.

## 7. Final Assessment

Correct, efficient, and idiomatic enough for the problem: one pass, immediate return, one fallback exit. Nothing needs fixing before this can be considered solved. The only even slightly interesting decision — `=== false` rather than `!` — is already made in the safer direction. The optional destructuring would improve readability, but declining it costs nothing.
