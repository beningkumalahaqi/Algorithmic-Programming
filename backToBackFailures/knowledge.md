# Reusable Knowledge — Checking Adjacent Items

## Compare neighbors, not totals

When a requirement says values must be next to each other, inspect pairs of neighboring positions. Counting how many matching values occur anywhere would miss whether a different value separates them.

```text
FOR each position with a next position
    compare current item and next item
```

## Boundary rule

For an array of length `n`, valid neighboring-pair starts are indices `0` through `n - 2`. A loop with `i < n - 1` expresses this directly. Arrays shorter than two naturally perform zero comparisons.

In JavaScript, reading one past the end returns `undefined`, but explicit bounds are usually clearer and avoid depending on that behavior.

## Early return

If one qualifying pair is enough to answer `true`, return as soon as it is found. If the scan ends with no match, return the required not-found value, here `false`.

## Checklist

- Does the condition require adjacency, or only a count?
- Does the loop stop before a position with no neighbor?
- Does a separating value break the sequence?
- Does a longer run still contain a qualifying pair?
