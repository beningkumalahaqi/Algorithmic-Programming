# Algorithmic Programming

A personal collection of algorithmic programming challenges I have solved, each documented together with the reasoning behind the solution and an AI review of it.

This is a learning archive, not a library or an application. Every problem lives in its own folder so the code and the thinking behind it stay together.

## Repository Layout

Each problem gets one folder, named after the problem:

```text
<problemName>/
├── solution.js     # My submitted solution, kept verbatim
├── solution.md     # Full write-up: problem, analysis, approach, complexity, edge cases
├── review.md       # AI review: correctness, edge cases, performance, code quality
└── knowledge.md    # Reusable, problem-agnostic lessons distilled from the problem
```

| File | Purpose |
|---|---|
| `solution.js` | The solution exactly as I wrote it. No cleanup pass — the point is to preserve what I actually produced. |
| `solution.md` | Structured documentation: problem overview, constraints, analysis, approach, pseudocode, implementation notes, complexity, verified edge cases, and takeaways. |
| `review.md` | An AI critique of the solution: what is correct, what can be improved, edge-case verification results, and an overall assessment. |
| `knowledge.md` | Generalizable techniques worth remembering beyond this one problem — patterns, comparison rules, language idioms. |

## Problems Solved

| Problem | Topic | Language | Documentation |
|---|---|---|---|
| `fileFits` | Boundary comparison, boolean expressions | JavaScript | [solution](./fileFits/solution.md) · [review](./fileFits/review.md) · [knowledge](./fileFits/knowledge.md) |

## Why Document the Process

Solving a problem once produces a working function. Writing down how I got there — and having the solution reviewed — produces knowledge I can reuse:

- **`solution.md` forces clarity.** If I cannot explain the approach in writing, I did not fully understand it.
- **`review.md` catches what tests miss.** Verified edge cases, redundant logic, and non-idiomatic patterns are called out explicitly.
- **`knowledge.md` turns one problem into a reusable rule**, so the next problem starts with a checklist instead of a blank page.

## Running a Solution

Everything here is plain JavaScript with no dependencies. From the repository root:

```bash
node fileFits/solution.js
```

Individual solutions may not print anything on their own; the expected behavior and test cases are documented in the corresponding `solution.md` and `review.md`.

## Environment

- Language: JavaScript
- Runtime: Node.js (solutions verified with Node.js v24.22.1)
