# Reusable Knowledge — Conditional Accumulation

> General pattern: sum values from entries that meet a condition.

## 1. The accumulator pattern

An accumulator is a variable that holds a result as a loop processes items. For a sum, start at zero, then add each qualifying value.

```text
total ← 0
FOR each item
    IF item meets the condition
        total ← total + item's value
RETURN total
```

This pattern works for totals such as successful transfers, paid invoices, passing scores, or inventory that matches a category.

## 2. Why the starting value matters

For addition, zero is the identity value: adding zero does not change a sum. Starting at zero also gives a useful result when the input is empty or no item qualifies.

| Operation | Common starting value |
|---|---:|
| Sum | `0` |
| Product | `1` |
| Count | `0` |
| Largest value | First item, or a justified lower bound |

Choose a starting value that makes the empty-input behavior correct for the task.

## 3. Process entries, not distinct values

If each array entry represents a separate event, process every entry even when two entries contain the same value. Deduplication changes a sum whenever repeated qualifying entries should each count.

Before using a set or removing duplicates, ask: does the requirement count distinct values, or does it count occurrences?

## 4. Read nested array fields deliberately

For a pair such as `[size, succeeded]`, document or remember the field positions:

| Index | Meaning |
|---:|---|
| `0` | Size |
| `1` | Success flag |

When indexing nested arrays, distinguish the outer index (which entry) from the inner index (which field). For example, `items[i][1]` means field 1 of entry `i`.

## 5. Common mistakes

- Adding every value before checking the condition.
- Checking the wrong field index.
- Starting a sum at an unrelated value such as the first item's size, which can fail on empty input.
- Deduplicating when every occurrence should count.
- Returning inside the loop before all entries have been inspected.

## 6. Checklist

1. What value is being accumulated?
2. What condition makes an item qualify?
3. What should the result be when no item qualifies?
4. Should repeated entries count separately?
5. Does each indexed field refer to the intended part of the data?
6. Does the loop visit every item exactly once?

For a single pass with constant work per item, time is O(n). If the algorithm keeps only an accumulator and loop state, auxiliary space is O(1).
