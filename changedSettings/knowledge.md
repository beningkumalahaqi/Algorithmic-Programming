# Reusable Knowledge — Comparing Object Values by Key

## 1. Match entries by their keys

When two objects represent the same named settings, a property's position is not its identity. Use its key to retrieve the corresponding values from both objects. This also works when their properties were written in different orders.

## 2. Bracket notation uses a variable key

Dot notation is convenient when the property name is fixed in the code. Bracket notation is useful when the property name is stored in a variable: the variable's contents select the property. For example, `record[key]` reads the property named by `key`.

A common naming trap is calling the key variable `value`. During a `for...in` loop, the loop variable holds a property name; the property's value is retrieved separately through bracket notation.

## 3. Count while traversing

For a count of matching or differing entries, initialize a counter before the loop, update it only when the current entry meets the condition, and return it after the loop. This uses one pass and constant extra space.

## 4. Checklist

1. Is the relationship between objects based on keys or positions?
2. Does the loop variable hold a key or a value?
3. Are the two inputs guaranteed to share the same keys?
4. Does an empty input naturally leave the counter at its correct initial value?
