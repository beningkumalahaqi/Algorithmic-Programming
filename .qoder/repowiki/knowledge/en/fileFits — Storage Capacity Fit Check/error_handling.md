## What system/approach is used

This repository is a collection of small, self-contained JavaScript exercises with no runtime framework, no application layer, and no user-facing error surface. There is no centralized error type, no sentinel-error library, no middleware, and no `try`/`catch` or equivalent strategy. Errors are treated as input-constraint violations that are handled locally inside each exercise's solution function — typically by returning a default value, early-returning `false`, or selecting one of the provided arguments based on comparison rules.

The repo's own README states: "This is a learning archive, not a library or an application." That framing explains the absence of any cross-cutting error-handling infrastructure; each problem documents its expected behavior and edge cases in its `solution.md` / `review.md` files rather than in a shared error taxonomy.

## Key files and packages

No dedicated error module exists. The closest evidence of error-handling conventions appears across all individual exercise solutions:

- `fileFits/solution.js` — handles boundary conditions (e.g., zero capacity, exact-fit) via inclusive comparisons (`size <= capacity - used`) and boolean returns.
- `keepsOrder/solution.js` — treats the empty-array case explicitly (`scores.length === 0`) as a valid input returning `true`; otherwise compares the last element against `next_score` using `<=` to include equality.
- `meetingFits/solution.js` — checks interval containment via two-sided bounds (`available[0] <= meeting[0] && available[1] >= meeting[1]`), returning `true` when the meeting fits entirely within the window.
- `searchStep/solution.js` — uses three-way branching on `target == numbers[position]`, `<`, and `else` to return the string literals `"found"`, `"left"`, and `"right"` respectively — no exceptions for out-of-bounds or missing values.
- `swap/solution.js` — performs a local swap via a temporary variable and returns `[a, b]`; it does not validate argument types or lengths.
- `newerValue/solution.js` — compares timestamps with `first[0] >= second[0]` and indexes `[1]` for the payload, deliberately avoiding truthiness-based fallbacks so empty strings remain valid data values.

Each problem folder also contains `knowledge.md`, which distills reusable lessons about comparison rules and idiomatic patterns, but none of these files define error types or propagation helpers.

## Architecture and conventions

Observed patterns across the exercises:

1. **Local constraint handling over exceptions.** Solutions validate inputs against documented constraints and return a result directly instead of raising errors. Invalid or boundary cases produce a well-defined output (default value, `false`, or selection of one argument).
2. **Comparison-driven control flow.** Tie-breaking and boundary decisions use explicit numeric comparisons (`>=`, `<=`, `<`) rather than truthiness checks, keeping falsy data values (empty string, `0`, `null`) valid payloads.
3. **String-tagged return values.** Where multiple outcomes are possible beyond true/false, exercises like `searchStep` return tagged string literals (`"found"`, `"left"`, `"right"`) instead of throwing or using sentinel objects.
4. **Documentation-first verification.** Each exercise's `solution.md` enumerates verified edge cases and `review.md` calls out incorrect assumptions; there is no test harness in this snapshot.
5. **No shared error vocabulary.** There are no exported error constructors, no error codes, and no wrapper around `Error`. Error-related reasoning stays in prose documentation.

## Conventions and constraints

- The repository has no centralized error-handling system, framework, or shared error type; error handling is per-exercise and ad hoc.
- Solutions handle invalid/boundary inputs locally by returning a default or selecting among provided arguments, rather than propagating exceptions.
- Comparison logic prefers explicit numeric operators (e.g., `first[0] >= second[0]`, `scoresLastIndex <= next_score`, `available[0] <= meeting[0] && available[1] >= meeting[1]`) followed by direct indexing, avoiding truthiness-based fallbacks so falsy data remains valid.
- Multi-outcome functions (e.g., `searchStep`) use string-tagged literals rather than exception paths.
- Edge-case expectations and their justification are recorded in each problem's `solution.md` and `review.md`; no automated tests exist in this snapshot.