# Reusable Knowledge — Operand Ordering in Interval Containment Checks

> Entry from solving `meetingFits` (2026-11-20). Problem-agnostic; reusable for any "does A fit inside B" interval or range check.

## 1. The containment predicate

To test whether interval `INNER` lies inside interval `OUTER`, compare **like edges with like**:

```text
OUTER.start ≤ INNER.start   AND   INNER.end ≤ OUTER.end
```

- Never compare a start against an end — that mixes two different quantities.
- Both comparisons place the **smaller-side** value on the left and the **larger-side** value on the right.
- In a valid interval (`start < end`), the inner interval's start is `≥` the outer's start, and its end is `≤` the outer's end. If your condition has the inner start on the right of the start comparison, check which interval you are actually testing.

## 2. `A ⊆ B` is not the "reverse" of `B ⊆ A`

Writing `B.start <= A.start && A.end <= B.end` and then mechanically flipping the operators produces
`B.start >= A.start && A.end >= B.end` — still a containment statement, just about the opposite nesting.
Both versions are valid predicates; they answer **different questions**:

| Condition | Means |
|---|---|
| `outer[0] <= inner[0] && inner[1] <= outer[1]` | `inner ⊆ outer` |
| `inner[0] >= outer[0] && outer[1] <= inner[1]` | `outer ⊆ inner` (same predicate, operands swapped) |
| `inner[0] <= outer[0] && inner[1] >= outer[1]` | `inner ⊇ outer` — the reverse containment, **not** the negation of the first |

A common mistake is to swap operands when the task says "meeting inside block" and keep `>=`/`<=` in place — that quietly turns the check into "block inside meeting". On symmetric inputs (both intervals equal) it can still pass, so a single happy-path test is not enough.

## 3. Diagnose an operand-order mistake with one asymmetric case

Take a pair where the container is clearly larger on one side only, e.g. block `[9, 12]`, meeting `[8, 12]`.

- Correct (`meeting ⊆ block`): `9 <= 8` is `false` → answer `false`.
- Reversed (`block ⊆ meeting`): `9 >= 8 && 12 <= 12` → `true`, wrong.

Pick an example where exactly one edge is violated. If both edges are violated, or neither, both conditions can agree and hide the bug.

## 4. Boundary wording sets the operator

| Statement wording | Operator |
|---|---|
| "may start/end exactly at the boundary", "fits", "at most" | inclusive: `<=`, `>=` |
| "strictly inside", "must leave room" | strict: `<`, `>` |

State the boundary behavior explicitly in tests: equal intervals, start-on-start, end-on-end.

## 5. Idiomatic return (JavaScript / TypeScript / C# / Java)

```javascript
// redundant
let result;
if (a <= b && c >= d) { result = true; } else { result = false; }
return result;

// idiomatic
return a <= b && c >= d;
```

A comparison expression already produces a boolean; a conjunction of comparisons does too. Avoid `return x = false;`-style assignment expressions — they are legal but obscure intent.

## 6. Checklist for containment problems

1. Name the container and the contained interval explicitly before writing any comparison.
2. Write the two edge comparisons in the same "small side ≤ large side" shape.
3. Test with: equal intervals, one edge violated, both edges violated, full-range bounds.
4. Only then simplify the code (direct boolean return, destructured names).
