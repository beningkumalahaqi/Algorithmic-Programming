# Reusable Knowledge — Boundary Comparisons and Boolean Returns in JavaScript

> Entry from solving `fileFits` (2026-11-16). Problem-agnostic; intended for reuse across projects.

## 1. Translate wording into the comparison operator

| Wording in the statement | Operator | Example |
|---|---|---|
| "fits", "at most", "filling exactly is allowed" | `<=` | `size <= capacity - used` |
| "strictly less", "must leave room" | `<` | `size < capacity - used` |
| "at least", "no fewer than" | `>=` | `count >= minimum` |

The exact-fill style sentence ("filling the drive exactly is allowed") exists precisely to pin down `<=` vs `<`. When a problem includes it, check the boundary case explicitly in tests.

## 2. Do not launder booleans through if/else (JavaScript, also C#, Java, TS)

Non-idiomatic:

```javascript
let result;
if (a <= b) {
  result = true;
} else {
  result = false;
}
return result;
```

Idiomatic:

```javascript
return a <= b;
```

A comparison expression **is** a boolean in these languages; assigning `true`/`false` from a condition is redundant control flow and an extra mutable variable. Same applies to `return cond ? true : false;` — just `return cond;`.

Caveat: ternary is still appropriate when you must return non-boolean values, e.g. `return a <= b ? "fits" : "too big";`.

## 3. Let guaranteed invariants remove special cases

If the statement guarantees an invariant (`used <= capacity`), derive consequences instead of branching:

- Free space `capacity - used >= 0`, therefore a zero-size file trivially fits — no `if (size === 0)` branch needed.
- Defensive checks for states the constraints exclude (`used > capacity`, negatives) are noise; they hide the real logic and add untested paths.

## 4. Decision checklist for "does X fit / can X be added" problems

1. Compute the resource state after the change (`used + size`) or the remaining budget (`capacity - used`) — pick one, not both.
2. Pick the inclusive/strict operator from the wording.
3. Verify with three boundary probes: exactly at the limit, one unit over, zero request.
