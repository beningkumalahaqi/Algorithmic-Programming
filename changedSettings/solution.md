# changedSettings — Count Changed Settings

> Solution record · Language: JavaScript · Reviewed: 2026-11-26

## 1. Problem Overview

Given two objects with the same setting names, return the number of names whose values differ in the updated object. The order of properties does not matter. The submitted function is in [`solution.js`](./solution.js).

```javascript
changedSettings({ volume: 5, speed: 2 }, { volume: 7, speed: 2 }) // 1
changedSettings({ a: 0, b: 1 }, { b: 1, a: 0 }) // 0
changedSettings({ a: 1, b: 2 }, { a: 2, b: 1 }) // 2
changedSettings({}, {}) // 0
```

## 2. Requirements and Constraints

- `old` and `updated` have the same setting names, though their properties may be in different orders.
- Each object has at most 8 entries.
- Setting names contain 1 to 20 lowercase English letters.
- Values are whole numbers from 0 to 100.
- Count a setting once when its old and updated values differ.
- Two empty objects produce zero changes.

## 3. Problem Analysis

The setting name is the link between the two objects. Comparing properties by their positions would be unreliable because object properties can be written in different orders. Instead, visit each name from one object and use that name to look up both values.

## 4. Approach and Reasoning

Keep a counter starting at zero. For each setting name in `old`, compare the corresponding value in `old` with the value under the same name in `updated`. Increase the counter when the values differ, then return it after checking all names.

## 5. Logic Breakdown

1. Initialize the number of changes to zero.
2. Visit each setting name in `old`.
3. Look up both objects using that name.
4. Add one when the values are not equal.
5. Return the final count.

## 6. Pseudocode

```text
changes = 0
for each setting name in the old object:
    compare the old and updated values for that name
    if they differ:
        add one to changes
return changes
```

## 7. Programming Concepts

| Concept | Role |
|---|---|
| Object property lookup | Retrieves a value using its setting name as the key. |
| `for...in` loop | Visits enumerable property names in the object. |
| Strict inequality (`!==`) | Detects values that are not equal without type coercion. |
| Counter | Accumulates the number of changed settings. |

## 8. Implementation Notes

The submitted function is preserved in [`solution.js`](./solution.js). In this loop, `settingValue` contains a property name (key), not the property's value. The expressions `old[settingValue]` and `updated[settingValue]` use that key to retrieve each object's value. The variable name could be clearer as `settingName`, but the current name does not affect the result.

## 9. Complexity Analysis

Let `n` be the number of settings.

- **Time:** O(n), since each name is checked once.
- **Auxiliary space:** O(1), since the function keeps only a counter and the current key.

## 10. Edge Cases

| Case | Expected result | Verification |
|---|---:|---|
| Both objects are empty | 0 | Executed: returned 0 |
| Same values with keys written in different orders | 0 | Executed: returned 0 |
| Exactly one value changes | 1 | Executed: returned 1 |
| Every value changes | Number of setting names | Executed with two settings: returned 2 |
| Values include the allowed endpoints 0 and 100 | Compare them normally | Inferred from strict numeric comparison; endpoint-specific case not separately executed |

## 11. Possible Improvements

For readability, rename `settingValue` to `settingName`, since the loop variable holds the key. The logic is correct for the stated inputs; no correctness change is required.

## 12. Key Takeaways

- When comparing objects whose key order may differ, match entries by key rather than by position.
- Bracket notation such as `object[key]` retrieves the value associated with a variable key.
- Count a difference during the traversal so each setting is processed once.
