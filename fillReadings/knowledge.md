# Reusable Knowledge — Replacing Missing Values in Arrays

> Problem-agnostic notes from `fillReadings` · JavaScript

## 1. Match the missing-value check to the contract

When zero, `false`, or an empty string is valid data, do not use a truthiness check to detect missing entries. Test for the specific marker named by the problem.

| Missing marker in the input | Intent-revealing check |
|---|---|
| `null` only | `value === null` |
| `undefined` only | `value === undefined` |
| Either `null` or `undefined` | `value == null` |

Loose equality is sometimes a concise nullish check, but it intentionally matches two values. Use it only when both are considered missing.

## 2. Choose between editing and creating

Two functions can return arrays with identical contents but different effects:

- **In-place:** update the existing array and return it. This uses O(1) extra space, but changes data held by the caller.
- **New array:** produce a separate transformed array. This uses O(n) output space and leaves the input intact.

Follow the problem's stated mutation policy. If it is unspecified, recognize that either choice may matter to callers and make the behavior clear.

## 3. One-pass transformation pattern

When each output item depends only on the corresponding input item, a single left-to-right pass is sufficient. The loop preserves order by handling indices in sequence. Its running time is O(n); auxiliary space depends on whether the original array is updated or a new array is created.

## 4. Checklist

1. Identify the exact marker that means “missing.”
2. Confirm that valid falsy values such as `0` remain unchanged.
3. Decide whether the input may be modified.
4. Visit every index exactly once and preserve order.
5. Check empty input, all-missing input, and a mixture of missing and falsy values.
