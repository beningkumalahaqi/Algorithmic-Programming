## What system/approach is used

This repository is a collection of small, self-contained JavaScript exercises with no runtime framework, no application layer, and no user-facing error surface. There is no centralized error type, no sentinel-error library, no middleware, and no `try`/`catch` or equivalent strategy. Errors are treated as input-constraint violations that are handled locally inside each exercise's solution function — typically by returning a default value, early-returning `false`, or selecting one of the provided arguments based on comparison rules.

The repo's own README states: "This is a learning archive, not a library or an application." That framing explains the absence of any cross-cutting error-handling infrastructure; each problem documents its expected behavior and edge cases in its `solution.md` / `review.md` files rather than in a shared error taxonomy.

## Key files and packages

No dedicated error module exists. The closest evidence of error-handling conventions appears in the individual exercise solutions:

- `fileFits/solution.js` — handles boundary conditions (e.g., zero capacity, exact-fit) via inclusive comparisons (`size <= capacity - used`) and boolean returns.
- `shouldRetry/solution.js` — uses boolean conjunction to gate retry logic, treating invalid combinations as non-retryable rather than throwing.
- `newerValue/solution.js` — compares timestamps with `first[0] >= second[0]` and indexes `[1]` for the payload, deliberately avoiding truthiness-based fallbacks so empty strings remain valid data values.

Each problem folder also contains `knowledge.md`, which distills reusable lessons about comparison rules and idiomatic patterns, but none of these files define error types or propagation helpers.

## Architecture and conventions

Observed patterns across the exercises:

1. **Local constraint handling over exceptions.** Solutions validate inputs against documented constraints and return a result directly instead of raising errors. Invalid or boundary cases produce a well-defined output (default value, `false`, or selection of one argument).
2. **Comparison-driven control flow.** Tie-breaking and boundary decisions use explicit numeric comparisons (`>=`) rather than truthiness checks, keeping falsy data values (empty string, `0`, `null`) valid payloads.
3. **Documentation-first verification.** Each exercise's `solution.md` enumerates verified edge cases and `review.md` calls out incorrect assumptions; there is no test harness in this snapshot.
4. **No shared error vocabulary.** There are no exported error constructors, no error codes, and no wrapper around `Error`. Error-related reasoning stays in prose documentation.

## Conventions and constraints

- The repository has no centralized error-handling system, framework, or shared error type; error handling is per-exercise and ad hoc.
- Solutions handle invalid/boundary inputs locally by returning a default or selecting among provided arguments, rather than propagating exceptions.
- Comparison logic prefers explicit numeric operators (e.g., `first[0] >= second[0]`) followed by direct indexing, avoiding truthiness-based fallbacks so falsy data remains valid.
- Edge-case expectations and their justification are recorded in each problem's `solution.md` and `review.md`; no automated tests exist in this snapshot.