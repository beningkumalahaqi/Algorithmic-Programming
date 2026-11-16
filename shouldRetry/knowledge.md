# Reusable Knowledge — Conjunctive Predicates and Retry Gating

> Entry from solving `shouldRetry` (2026-11-16). Problem-agnostic; intended for reuse across projects.

## 1. "Only when A and B" means conjunction

| Wording | Operator | Reads as |
|---|---|---|
| "true only when A and B" | `A && B` | both prerequisites must hold |
| "true when A or B" | `A \|\| B` | either one suffices |
| "true unless A" | `!A` | single negation |

The word *only* restricts the true region; it is the strongest hint that the conditions combine with AND. Before writing code, write the truth table for the two conditions and check every row against the statement — the examples usually cover only a subset.

## 2. Predicates return expressions, not branches

A function whose contract is "return the truth of P" should be `return P;`. Any `if (P) return true; return false;` shape is `return P;` with extra steps, and it invites inverted-condition bugs when edited later. This is the same idea as the boolean-laundering entry in `fileFits/knowledge.md`, applied to two conditions instead of one.

## 3. Boundary words decide strict vs. inclusive

| Phrase in the statement | Operator |
|---|---|
| "reaching the limit means stop" | `count < limit` |
| "allowed up to and including the limit" | `count <= limit` |
| "more than N attempts" | `count > N` |

The stop boundary always belongs to the *outside* of the allowed region. Verify with the equality probe `count === limit` — it is the only test that distinguishes `<` from `<=`.

## 4. Know whether a count is before or after the event

"Attempts already made" includes the attempt that just failed. "Next attempt number" would be `attempts + 1`. Mixing these up produces a silent off-by-one that still passes the happy-path examples. Read the noun phrase, not the variable name.

## 5. Short-circuit order carries meaning

`A && B` skips `B` when `A` is false. Use that deliberately:

- Put the cheap, cheap-to-reason-about, or safety-critical condition first (`failed && attempts < limit` — no point asking about budget after a success).
- Never rely on short-circuiting to hide a bug; it changes evaluation, not truth value.
- In JavaScript, `&&` returns a boolean when both operands are booleans — safe to return directly. If an operand can be a non-boolean truthy value, the expression can leak that value instead of `false`; force a boolean with `Boolean(...)` or `!!` in that case.

## 6. Retry-loop integration pattern

The predicate is usually a loop guard, not an endpoint:

```text
attempts = 1
failed = perform(request)
WHILE shouldRetry(failed, attempts, limit)
    attempts = attempts + 1
    failed = perform(request)
END WHILE
```

Keeping the decision in a named predicate separates policy ("may we retry?") from mechanism ("perform the request"), which makes the policy testable without network calls.
