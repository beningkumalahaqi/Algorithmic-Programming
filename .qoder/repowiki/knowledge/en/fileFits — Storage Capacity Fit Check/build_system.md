# Build System

This repository is a personal learning archive of standalone JavaScript exercises — not a library or application. It has no build system, no dependency manifest, no packaging step, and no CI pipeline.

## What is used

- **Language/runtime:** plain JavaScript executed directly by Node.js. The README documents the runtime as "Node.js (solutions verified with Node.js v24.22.1)".
- **Invocation:** each problem lives in its own directory under the repository root, and solutions are run one at a time from the repo root:
  ```bash
  node fileFits/solution.js
  ```
- There are no `package.json`, `Makefile`, `Dockerfile`, `.github/workflows`, shell scripts, bundlers, linters, or test runners present in the repository.

## Key files

- `README.md` — the only project-level configuration; it declares the layout, lists solved problems, documents how to run them, and pins the Node.js version used for verification.

## Architecture and conventions

- One problem per folder (`<problemName>/solution.js`, `solution.md`, `review.md`, `knowledge.md`).
- Solutions are self-contained: they have no dependencies and are meant to be invoked directly with `node <problem>/solution.js`.
- Execution is manual and ad-hoc — there is no aggregate script that discovers or runs all solutions.

## Conventions and constraints

- **No automated build/test/release flow exists.** The repository contains no Makefiles, Dockerfiles, CI configuration, versioning strategy, or cross-compilation setup.
- **Runtime constraint:** solutions are intended to run on Node.js (verified against v24.22.1 per the README).