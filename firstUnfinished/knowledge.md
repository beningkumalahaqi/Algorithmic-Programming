# Reusable Knowledge — First-Match Scans and Not-Found Answers

> Entry from solving `firstUnfinished` (2026-11-25). Problem-agnostic; intended for reuse across projects.

## 1. "First X in order" is a direction *and* a stopping rule

Two decisions define a first-match search, and both are part of correctness, not optimization:

| Decision | Correct choice | What breaks otherwise |
|---|---|---|
| Traversal direction | Forward, from index 0 | A reverse scan returns the **last** match |
| Stopping | Stop at the first hit | Continuing, then returning a stored value, can return a later match |

The clearest way to encode both is a forward loop whose body returns the answer as soon as it is known. If you find yourself needing a "found" flag and a value variable, the loop is probably visiting more elements than the question requires.

## 2. Condition and payload should be handled on the same visit

Many problems give each item two roles: a **predicate field** (decides whether this item is the answer) and a **payload field** (the value to return). These belong to the same element, so read and return them together:

```text
FOR EACH item
    IF predicate(item) THEN
        RETURN payload(item)
```

The collect-then-pick alternative —

```text
matches ← ALL items where predicate holds
RETURN payload of first element of matches
```

— is correct but allocates a list to hold a value that was already available at the moment of discovery, and it invites an index mismatch (filter index vs. original index). Reach for it only when you genuinely need more than the first match.

## 3. The answer after the loop is the not-found answer

A trailing `return` after a scan serves every case where no element matched:

- no element satisfies the predicate;
- **zero elements were examined at all** (empty input).

Both fall out of the same statement because a loop over an empty collection performs no iterations. This is why "empty input" often needs no special branch in a search. Compare with `keepsOrder`, where the empty input *did* need one — because a comparison there reads an element that does not exist. In a search, nothing is read if nothing is visited.

**Checklist before adding an empty-input branch:** does the loop body execute at all on empty input, and does the trailing return already express the right answer? If yes to both, the branch is redundant.

## 4. Compare against the documented sentinel, not truthiness

When a contract states a field's type and sentinel values, compare explicitly:

| Contract says | Prefer | Avoid |
|---|---|---|
| `done` is `true`/`false` | `done === false` | `!done` |
| `count` is a positive integer, 0 means none | `count === 0` | `!count` |
| `name` is a nonempty string | `name === ""` | `!name` |

Truthiness accepts a wider set of values than the contract permits: `undefined`, `null`, `0`, `NaN`, `""`. That is harmless while the contract holds and a silent wrong answer if it lapses. The explicit comparison also documents *which* value triggers the branch, which `!` does not.

The reverse advice applies too: do not write `=== true` / `=== false` merely for symmetry when the field is already a boolean and the logic reads better naturally. Explicit sentinels win when they carry meaning; not as decoration.

## 5. Repeated names are only a problem if the answer must identify an entry

If names (or keys) can repeat, ask what the output must distinguish:

| Requirement | Duplicates matter? |
|---|---|
| Return the first matching **name** | No — the string is the same either way |
| Return the **entry** or its **index** | Yes — the name no longer identifies it uniquely |

The trap is answering a "first name" question with an index, or a "first entry" question with a name. Decide which the problem asks before choosing the return type.

## 6. Handling pairs: index arithmetic vs. destructuring

| Idiom | When it reads better |
|---|---|
| `tasks[i][0]` / `tasks[i][1]` | Very short bodies; when indices are computed (e.g., stepping by 2) |
| `for (const [name, done] of tasks)` | Whenever both slots are used in the body — names the roles once |
| `arr.find(p)?.[0] ?? fallback` | Terse, but hides the early exit and the not-found convention |

Destructuring is the default for readability: `[name, done]` cannot be mis-remembered the way `[0]` and `[1]` can. It changes nothing about complexity.

## 7. Search patterns and their costs

| Pattern | Time | Space | Notes |
|---|---|---|---|
| Forward scan, return on match | O(n) worst, O(1) best | O(1) | Stops as early as possible |
| Reverse scan | O(n) worst | O(1) | Same asymptotic cost, different answer — answers "last" |
| `find` / `filter()[0]` / `indexOf` | O(n) | O(1) / O(n) | `filter` allocates; `find` and `indexOf` do not |
| Sort, then search | O(n log n) | O(n) or O(1) | Rarely needed; only when order is required for other reasons |

For a first-match question, a single forward pass that returns immediately is the floor. Before reaching for the array helpers, check whether they return the *thing* you need — `find` returns the element, not a field of it, and not the index.

## 8. Test checklist for first-match searches

- Each provided example, including the all-done / no-match case.
- Empty input — confirm the trailing return is what answers it.
- Single element: matches, and does not match.
- **Two or more matches, distinct payloads** — proves first-match and not last-match.
- A match at the very last position — proves the loop bound is `< length`.
- Maximum input size — proves the bound at the constraint limit.
- Duplicate payloads with different match positions — proves you return the payload, not an index.
- Confirm the input is unmodified afterwards, if the function is reused.

The "two distinct matches" row is the highest-value test: it is the only one that distinguishes a correct first-match scan from a plausible last-match one.
