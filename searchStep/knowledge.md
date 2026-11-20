# Reusable Knowledge — Three-Way Comparison and Isolated Probe Steps

> Entry from solving `searchStep` (2026-11-20). Problem-agnostic; intended for reuse across projects.

## 1. Two values under a total order have exactly three relations

For integers, `a = b`, `a < b`, and `a > b` are mutually exclusive and exhaustive — exactly one holds. Encode that directly:

```text
IF a = b THEN ...
ELSE IF a < b THEN ...
ELSE ...            // provably a > b
```

Testing **equality first** keeps the hit case from being absorbed by a later comparison, and makes the final `else` derivable rather than another test.

Alternatives and their hazards:

| Formulation | Note |
|---|---|
| `(a > b) - (a < b)` | Compact sign function, but depends on booleans coercing to 0/1 — not universal. |
| `Math.sign(a - b)` | Only safe when subtraction is exact. Floating point loses the sign of tiny differences; fixed-width integers can overflow (`INT_MIN - 1`). |
| Direct comparisons | Portable, no arithmetic preconditions, easy to read. Default choice. |

## 2. A direction is not a feasibility check

"Target is smaller than this entry" and "there is an entry to the left" are different facts. A probe step reports the **relation**; the caller decides whether a move exists.

| Probe location | Target | Relation | Move possible? |
|---|---|---|---|
| index 0 | smaller | left | no — left half is empty |
| last index | larger | right | no — right half is empty |

A comparison helper must never return "not found" early because a move is impossible. In a binary search, an empty half simply ends the loop on the next bound update; the comparison stays honest.

## 3. One probe, one comparison — ordering belongs to the caller

A single-element check never reads a neighbor, so its correctness does not depend on the array being sorted. Ordering matters only when the returned direction is used to narrow a range. Consequences:

- The helper can be unit-tested independently of the search loop, even with unsorted data — isolating comparison bugs from loop bugs.
- Do not "help" the helper by looking ahead. That changes its contract and duplicates logic the caller already owns.

## 4. Duplicates do not change a single-probe answer

If the probed entry equals the target, the answer is a hit; copies elsewhere are irrelevant at this step. Duplicates only affect **where to continue** (first match, last match, any match). Do not add a scan to confirm them.

## 5. Test checklist for comparison / probe helpers

- Provided examples, one per outcome.
- First index and last index, with a target beyond the boundary.
- Single-element array: equal, smaller, larger.
- Duplicate at the probe and duplicates elsewhere (ensure no false hit).
- All-negative values and the domain limits (here `-100` and `100`).
- Absent target on both sides.
- A boundary direction where no move is possible — verifies the contract says "left"/"right", not "missing".

## 6. Strict equality in JavaScript

`a == b` over two numbers is safe, but `===` states intent and avoids coercion surprises when the contract later admits strings or `null`. Default to `===` / `!==` unless coercion is deliberately wanted. (See also `fileFits/knowledge.md` on returning expressions directly — the same preference for explicit types applies.)
