# Algorithmic Programming

A learning archive of solved algorithmic challenges, with each solution, its reasoning, and a review kept together in its own folder.

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


## Why Document the Process

Solving a problem once produces a working function. Writing down how I got there — and having the solution reviewed — produces knowledge I can reuse:

- **`solution.md` forces clarity.** If I cannot explain the approach in writing, I did not fully understand it.
- **`review.md` catches what tests miss.** Verified edge cases, redundant logic, and non-idiomatic patterns are called out explicitly.
- **`knowledge.md` turns one problem into a reusable rule**, so the next problem starts with a checklist instead of a blank page.
