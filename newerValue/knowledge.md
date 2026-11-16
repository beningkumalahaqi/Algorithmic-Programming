# Reusable Knowledge — Selection Problems, Ties, and Payload Extraction

> Entry from solving `newerValue` (2026-11-16). Problem-agnostic; intended for reuse across projects.

## 1. Positional order is not domain order

"Return the first update's value" means the **first argument**, not the chronologically first record. Before coding, separate three orders that problems routinely mix:

| Order | Meaning | Example |
|---|---|---|
| Positional | Where the value sits in the signature | `first`, `second` parameters |
| Temporal / logical | Which event happened later or ranks higher | larger timestamp = newer |
| Traversal | Which element a loop visits first | array index order |

Any function where these can disagree needs a test case that proves the code follows the *domain* rule, not the parameter order.

## 2. Select the record, then extract the field

When each item carries a comparison key plus a payload, the problem is two steps:

```text
winner = compare(items) ? itemA : itemB
result = winner.payload
```

Do not try to compress this into "return the max payload" — the comparison is on a different field than the returned one. Mixing the indices is the classic defect: compare `[0]`, return `[1]`, and verify each access belongs to the right job.

## 3. Ties fix the operator

For a two-way choice, the operator and the operand order jointly encode the tie rule:

| Requirement | Expression | Tie goes to |
|---|---|---|
| Newer wins, ties → first | `a.key >= b.key ? a : b` | first |
| Newer wins, ties → second | `a.key > b.key ? a : b` | second |
| Newer wins, ties → second (from the other side) | `b.key > a.key ? b : a` | first (else branch) |

Probe the equality case (`a.key === b.key`) — it is the only input that separates `>=` from `>`. Write that probe down before claiming the tie rule is implemented.

## 4. "Newer", "maximum", "best" — take the record, not the extremum

`Math.max(a[0], b[0])` yields a number. It answers "what is the largest timestamp", not "which update is newer". The moment the answer requires the associated data (value, index, object), the extremum functions are the wrong primitive; selection is.

## 5. Empty string is data, not absence

`""` is a valid string and may be a valid answer. Any pattern of the form `a || b`, `if (value)`, or `value ? value : fallback` silently replaces it. When the problem states that an empty string is allowed, return the stored value directly and let the emptiness be meaningful.

## 6. Returning an input element is not a copy

A selection function that returns `record[1]` (or the record itself) creates no new storage. That is safe as long as the contract is read-only; it becomes a bug only if either side mutates afterwards. Copying for "safety" adds cost and usually hides a missing immutability convention.

## 7. Checklist for two-candidate comparison problems

1. Identify the comparison key and the returned payload — confirm they are different fields.
2. Write the tie rule in words, then pick the operator/operand order that implements it.
3. Add the equality probe as a test.
4. Check for truthiness shortcuts on the payload (especially strings and numbers).
5. Confirm the inputs arrive in either order and handle both.
