# Reusable Knowledge — Checking Required Properties

## 1. Presence is different from truthiness

An object property may exist while holding a value that behaves as false in a condition. In JavaScript, `Object.hasOwn(object, key)` answers whether that key is an own property. Use it when the requirement is about presence and values like `0`, `false`, or `""` are valid.

## 2. “Every item” needs an all-pass result

When a task says every item must satisfy a condition, the overall answer starts true and changes to false when any item fails. A later success cannot cancel an earlier failure. This pattern appears in validation, permission checks, required fields, and constraint checking.

JavaScript's `Array.prototype.every` expresses this rule directly: it returns true for an empty array and stops when a callback first returns false. A loop can express the same idea by returning or stopping immediately on failure.

## 3. Beware overwriting an accumulated result

This loop shape is risky for an all-items check:

```text
for each item:
    result = whether this item passes
```

It leaves `result` equal to the last item's outcome. To reason about correctness, test a sequence where an early item fails and the final item passes.

## 4. Empty input and universal checks

For an “all items pass” condition, an empty collection usually yields true: there is no failing item. Initializing the result to true makes the empty case work without a special branch. Confirm this behavior against the problem statement each time.

## 5. Checklist

1. Is the requirement about a key's existence or the truthiness of its value?
2. Does the result mean “all pass” or “at least one passes”?
3. Can a later item accidentally overwrite an earlier failure?
4. What should an empty collection return?
5. Does the test set include failure-before-success and valid falsy values?
