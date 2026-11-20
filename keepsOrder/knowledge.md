# Reusable Knowledge — Append-to-Sorted Checks and Missing-Element Semantics

> Entry from solving `keepsOrder` (2026-11-20). Problem-agnostic; intended for reuse across projects.

## 1. Appending to a sorted sequence: test only the new boundary

A sequence `s₀ ≤ s₁ ≤ … ≤ sₖ₋₁` stays non-decreasing after appending `n` **iff** `sₖ₋₁ ≤ n`. The prefix is already ordered, so the single pair `(sₖ₋₁, n)` is the only one that can fail. Transitivity covers the rest: `sᵢ ≤ sₖ₋₁ ≤ n` for every `i`.

| Task | Work needed |
|---|---|
| Append at the end of a known-sorted sequence | O(1) — one boundary comparison |
| Insert into the middle of a sorted sequence | O(n) — find the position, then shift |
| Verify an arbitrary sequence is sorted | O(n) — every adjacent pair |

Do not re-verify a precondition you were given. If the contract says the input is already sorted, a full scan adds work, not safety.

## 2. Inclusive vs. strict operators at a boundary

The operator is a correctness decision, not a style choice:

| Rule | Operator at the appended boundary |
|---|---|
| Equal values allowed (non-decreasing) | `last ≤ n` |
| Values must strictly increase | `last < n` |

Off-by-one thinking at a boundary starts with the question "is equality allowed here?" Answer it before writing the comparison. A single duplicate case (`[5, 5]`) distinguishes the two rules immediately.

## 3. The empty sequence is ordered vacuously

An empty sequence satisfies "non-decreasing" without any comparison, so an append check must return `true`. This is a genuine branch, not a defensive extra:

- there is no last element to read;
- there is no pair that could be out of order;
- any value is acceptable.

Zero-length input is a distinct logical case in every "does this sequence still satisfy X?" predicate.

## 4. JavaScript: `undefined` is unordered

Reading past the end of an array yields `undefined`, and JavaScript relational comparison is defined in terms of numeric conversion. `Number(undefined)` is `NaN`, so every comparison with `undefined` is `false`:

| Expression | Result |
|---|---|
| `undefined <= 5` | `false` |
| `undefined >= 5` | `false` |
| `undefined === undefined` | `true` |

The dangerous shape is "guard after use": if the comparison runs first, an empty array silently takes the `false` branch, which may be the wrong contract answer. Keep the emptiness guard **before** the comparison whenever the comparison's result can reach the return value.

Reading the element early is safe only when the empty branch ignores it — and that safety is easy to lose in a later edit. Prefer placing the guard first.

## 5. Reading the last element without mutation

| Idiom | Notes |
|---|---|
| `arr[arr.length - 1]` | Portable, explicit index arithmetic; `undefined` when empty. |
| `arr.at(-1)` | ES2022; reads from the end, handles negative offsets; `undefined` when empty. |
| `arr.pop()` | **Avoid** in predicates — removes the element and mutates the input. |
| `arr.slice(-1)[0]` | Correct but allocates a new array; unnecessary. |

`at(-1)` is direct indexing with a normalized offset — O(1), not a reverse search. Neither indexing form throws on an empty array, so neither replaces the empty check.

## 6. Double-ended ordering checks

The mirror condition is equally valid:

```text
last ≤ n        // "new value is at least the last"
n ≥ last        // "last is at most the new value"
```

Choose the spelling that reads as the rule ("nothing may decrease") and keep it. Both forms must remain inclusive under a non-decreasing contract.

## 7. Naming: index vs. value

A local holding `arr[arr.length - 1]` holds a **value**, not an index. Naming it `...Index` misleads the next reader into expecting an integer position. Name the variable after what it contains (`lastValue`, `last`), and derive the index only when it is actually needed.

## 8. Test checklist for append / boundary predicates

- Each provided example, including the empty-array case.
- Single-element array: new value smaller, equal, larger than the last.
- Duplicate equal to the last element (proves the operator is inclusive).
- Duplicate run — all elements identical.
- Empty array with a value below, equal to, and above the rest of the domain.
- Domain endpoints as both the last element and the new value.
- A previously valid middle value that is now below the last (proves only the boundary matters).
- Confirm the input is not mutated: the same array can be reused in later assertions.

Compare with `fileFits/knowledge.md` (inclusive boundary comparison) and `meetingFits/knowledge.md` (boundary contact counts as fitting) — the same inclusiveness rule appears at every "does it just fit?" boundary.
