# Algorithmic Programming: Agent Instructions

This repository is a personal learning archive for algorithmic programming. The goal is to help the user build problem-solving skill, preserve their original submissions, and record reusable lessons—not to optimize for immediately producing a judge-ready answer.

## 1. When the user presents a problem

Teach the approach without giving away the complete solution.

- Start by restating the problem in plain language: inputs, required output, constraints, and the important boundary conditions.
- Explain how to reason from the requirements to an approach. Identify the relevant pattern, such as a direct comparison, a loop, conditional branching, collection traversal, sorting, counting, or two pointers. Name language-specific constructs only after the user chooses a language.
- Give progressively stronger hints. Begin with the key observation, then outline the steps, then offer high-level pseudocode if helpful.
- Use questions to keep the user engaged, for example: “What must be true for this case to succeed?” or “Which value changes as you inspect each item?”
- Point out edge cases and suggest test cases, especially minimum/maximum values, equality boundaries, empty inputs, and one-off cases where relevant.
- Explain time and space complexity at the level appropriate to the problem.

Do **not** provide a copy-pasteable final implementation, the exact final condition/expression, or a fully solved answer unless the user explicitly changes this learning-focused constraint. Pseudocode must describe the algorithm without becoming a direct translation into the submitted language when that would reveal the whole solution.

## 2. When the user asks to review a solution

Review the submitted solution as written before suggesting alternatives.

- Check correctness against the stated requirements and constraints.
- Trace the logic and verify meaningful edge cases; run the solution when practical and clearly distinguish executed results from reasoning-based conclusions.
- Assess time and auxiliary-space complexity.
- Call out bugs, risky assumptions, unclear names, unnecessary state or branches, language-idiomatic improvements, and simpler equivalent approaches.
- Separate required corrections from optional readability or style improvements. Explain why each recommendation matters.
- Offer an alternative only when it is genuinely clearer, safer, or more efficient for the stated constraints.
- Preserve the user's submitted solution file verbatim. Do not rewrite or “clean up” it unless the user explicitly asks for a code change.

Keep the review constructive: acknowledge what is correct, identify the highest-value learning opportunity, and avoid inventing requirements that the problem constraints exclude.

## 3. When the user asks to document a solution

Follow the repository’s per-problem layout and existing Markdown conventions. Each problem belongs in its own `<problemName>/` directory:

```text
<problemName>/
├── solution.<extension>  # User-authored submission, kept verbatim
├── solution.md     # Problem explanation and solution record
├── review.md       # Evidence-based review of the submission
└── knowledge.md    # Reusable, problem-agnostic lessons
```

Use the file extension and run command appropriate to the language selected by the user (for example, `.js`, `.py`, `.cpp`, `.java`, `.go`, or `.rs`). Do not alter the submitted solution file while documenting it. Use the actual problem statement, constraints, submitted code, and verification results; never fabricate tests, execution results, dates, or requirements.

### `solution.md`

Use the established numbered sections, adapting only when a section genuinely does not apply:

1. Problem Overview
2. Requirements and Constraints
3. Problem Analysis
4. Approach and Reasoning
5. Logic Breakdown
6. Pseudocode
7. Programming Concepts
8. Implementation Notes
9. Complexity Analysis
10. Edge Cases
11. Possible Improvements
12. Key Takeaways

Include concise examples, explain *why* the approach works, state complexity precisely, and label verified behavior accurately. Link to the submitted solution file using its actual filename, for example `[`solution.py`](./solution.py)`.

### `review.md`

Write a specific, constructive review with these sections:

1. Overall Assessment
2. Critical Issues
3. Correctness Improvements
4. Edge Cases
5. Performance Analysis
6. Code Quality
7. Recommended Changes
8. Final Assessment

State whether claims are verified by execution or inferred from inspection. Keep the focus on the user’s code and the problem’s actual constraints.

### `knowledge.md`

Extract reusable lessons rather than re-documenting the individual problem. Explain the general pattern, when to use it, common mistakes, language idioms where relevant, and a short checklist or examples that transfer to future problems.

## 4. Repository conventions

- The programming language is chosen by the user. Match their choice for terminology, pseudocode, idioms, filename extension, build/run command, and verification method. If they have not chosen a language, ask before giving language-specific guidance or code.
- Keep prose beginner-friendly, concrete, and direct. Define jargon when first used.
- Favor small Markdown tables for examples, edge cases, complexity, and comparisons when they clarify the material.
- Update the root `README.md` only when the user asks to register a new completed problem in its index.
- Do not modify unrelated files or existing user changes.
- When the user asks to commit and push, use a concise, single-line commit message with no body.
